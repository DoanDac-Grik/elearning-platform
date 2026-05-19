# ELearn Platform

> Dòng commit đầu tiên vào ngày 10/05/2021. Ngày 19/05/2026, Đoàn Đắc sử dụng AI agent để refactor toàn bộ sang TypeScript, cập nhật packages lên phiên bản mới nhất và redesign UI.

---

**ĐỒ ÁN CUỐI KÌ MÔN:** _KĨ THUẬT PHÁT TRIỂN HỆ THỐNG WEB_

**GIẢNG VIÊN HƯỚNG DẪN:** _VÕ NGỌC TÂN_

**SINH VIÊN THỰC HIỆN:** _Đoàn Văn Đắc · Lê Tuấn Anh_

---

## Giới thiệu

Website học online cho phép người dùng xem các video bài giảng. Admin có thể quản lí khóa học (CRUD), xác thực và phân quyền người dùng.

## Tech Stack

| Layer | Công nghệ |
|---|---|
| Runtime | Node.js |
| Framework | Express 5 + TypeScript 5 |
| Database | MongoDB + Mongoose 8 |
| Template Engine | express-handlebars 8 |
| Auth | JWT (jsonwebtoken 9) + bcryptjs 3 |
| UI | Bootstrap 5.3 + Custom SCSS |
| Dev Tools | tsx, nodemon, dart sass |

## Tính năng

- Đăng ký / đăng nhập với JWT (lưu cookie)
- Xem danh sách và xem chi tiết video khóa học
- Tìm kiếm khóa học theo tên
- **Admin:** Tạo, sửa, xóa mềm, khôi phục, xóa vĩnh viễn khóa học
- **Admin:** Thùng rác với bulk actions (chọn nhiều, khôi phục / xóa hàng loạt)
- Phân quyền: `user` chỉ xem, `admin` quản lí toàn bộ

## Cài đặt

```bash
# Clone và cài dependencies
git clone <repo-url>
cd elearning-platform
npm install

# Biên dịch SCSS
npm run watch:css

# Chạy development server
npm run dev
```

Yêu cầu: MongoDB đang chạy trên `mongodb://127.0.0.1:27017/blog_course_dev`

Có thể cấu hình qua biến môi trường:

```
MONGO_URI=mongodb://...
JWT_SECRET=your_secret
PORT=3000
```

## Scripts

| Lệnh | Mô tả |
|---|---|
| `npm run dev` | Chạy dev server với hot-reload (tsx + nodemon) |
| `npm run build` | Biên dịch TypeScript sang `dist/` |
| `npm start` | Chạy bản production từ `dist/` |
| `npm run watch:css` | Watch và compile SCSS |
| `npm run typecheck` | Kiểm tra TypeScript không build |
| `npm run format` | Format code với Prettier |

## Cấu trúc thư mục

```
src/
├── index.ts                  # Entry point
├── app/
│   ├── controllers/          # AuthController, CourseController, ...
│   └── models/               # User, Course, Role (Mongoose)
├── config/
│   ├── auth/config.ts        # JWT config
│   └── db/index.ts           # MongoDB connection
├── middleware/
│   ├── authJwt.ts            # Verify token, isAdmin
│   ├── displayUser.ts        # Inject user vào res.locals
│   └── verifySignUp.ts       # Validate đăng ký
├── resources/
│   ├── routes/               # Express routers
│   ├── views/                # Handlebars templates
│   └── scss/app.scss         # Custom SCSS design system
├── types/                    # TypeScript declarations
│   ├── express/              # Extend Request.userId
│   └── vendor/               # Shims cho mongoose plugins
└── util/mongoose.ts          # Helper chuyển Mongoose doc → object
```
