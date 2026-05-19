import path from 'path';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import { engine } from 'express-handlebars';
import { connect } from './config/db';
import route from './resources/routes';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Database
connect();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(morgan('combined'));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Template engine — must be configured BEFORE route()
app.engine(
  'handlebars',
  engine({
    helpers: {
      sum: (a: number, b: number): number => a + b,
    },
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'resources/views/layouts'),
    partialsDir: path.join(__dirname, 'resources/views/partials'),
  }),
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'));

// Routes
route(app);

// Global error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send(`<h1>500 - Server Error</h1><pre>${err.message}</pre>`);
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
