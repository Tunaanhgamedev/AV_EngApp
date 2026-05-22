# Hướng Dẫn Triển Khai Lên Internet & Tích Hợp CI/CD Tự Động (EngBot)

Tài liệu này hướng dẫn chi tiết từng bước cách đưa toàn bộ hệ thống **EngBot** (bao gồm Express Backend, Next.js Frontend, Prisma & Supabase PostgreSQL) lên internet hoàn toàn miễn phí và cấu hình **Continuous Deployment (CD)** để mỗi lần bạn `git push` code lên GitHub, hệ thống sẽ tự động cập nhật.

---

## 🏗️ Kiến Trúc Triển Khai (Production Architecture)

```mermaid
graph TD
    subgraph GitHub Repository
        A[Git Push / Commit] -->|Trigger CD| B(Express Server Code)
        A -->|Trigger CD| C(Next.js Client Code)
    end

    subgraph Cloud Deployment
        B -->|Auto-Deploy| D[Render / Railway]
        C -->|Auto-Deploy| E[Vercel]
    end

    subgraph Database & AI
        D -->|Prisma ORM| F[Supabase PostgreSQL]
        D -->|API Queries| G[Gemini API]
        E -->|API Requests| D
    end
```

---

## 🟢 Bước 1: Chuẩn Bị Kho Mã Nguồn GitHub (GitHub Repository)

Hệ thống CI/CD hoạt động dựa trên các thay đổi trên kho mã nguồn của bạn. Nếu chưa đưa code lên GitHub, hãy thực hiện các lệnh sau tại thư mục gốc:

1. **Khởi tạo và commit code:**
   ```bash
   git init
   git add .
   git commit -m "feat: complete settings page and layout responsiveness"
   ```
2. **Tạo Repository mới trên GitHub** và liên kết code của bạn:
   ```bash
   git remote add origin https://github.com/TaikhoanCuaBan/AV_EngApp.git
   git branch -M main
   git push -u origin main
   ```

---

## 🔵 Bước 2: Triển Khai Express Backend Lên Render

[Render](https://render.com) là nền tảng tối ưu nhất hiện nay để triển khai Node.js backend miễn phí, hỗ trợ tự động build và deploy từ GitHub.

### 1. Tạo Dịch Vụ Mới Trên Render
1. Truy cập [Render Dashboard](https://dashboard.render.com) và đăng nhập bằng tài khoản GitHub của bạn.
2. Nhấp vào nút **New +** và chọn **Web Service**.
3. Kết nối với kho mã nguồn GitHub `AV_EngApp` của bạn.

### 2. Cấu Hình Thông Tin Build & Deploy
Cấu hình các trường thông tin chính xác như sau để Render định vị được thư mục `/server` trong monorepo:

*   **Name:** `engbot-backend` (hoặc tên tùy chọn của bạn)
*   **Region:** Chọn khu vực gần Việt Nam nhất (ví dụ: `Singapore` hoặc `Oregon`).
*   **Branch:** `main`
*   **Root Directory:** `server` *(Rất quan trọng! Điều này chỉ định Render chạy trong thư mục server)*
*   **Runtime:** `Node`
*   **Build Command:**
    ```bash
    npm install && npx prisma generate && npm run build
    ```
*   **Start Command:**
    ```bash
    npm start
    ```
*   **Instance Type:** Chọn gói **Free** ($0/month).

### 3. Thiết Lập Biến Môi Trường (Environment Variables)
Nhấp vào tab **Environment** trên Render và thêm các biến môi trường sau:

| Tên Biến | Giá Trị | Ghi Chú |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Chế độ chạy Production |
| `PORT` | `10000` | Cổng dịch vụ của Render |
| `DATABASE_URL` | `postgresql://...` | Đường dẫn kết nối **Session (Port 5432)** của Supabase |
| `DIRECT_URL` | `postgresql://...` | Đường dẫn kết nối trực tiếp của Supabase (dành cho di chuyển schema) |
| `GEMINI_API_KEY` | `AIzaSy...` | Khóa API Gemini của bạn |
| `JWT_SECRET` | `ChuoiKyTuBaoMatCuaBan` | Chuỗi khóa bí mật dùng mã hóa dữ liệu phiên đăng nhập |

---

## 🟡 Bước 3: Triển Khai Next.js Frontend Lên Vercel

[Vercel](https://vercel.com) là "cha đẻ" của Next.js, cung cấp dịch vụ hosting đỉnh cao, tối ưu hóa tốc độ tải trang toàn cầu và tích hợp CI/CD tự động chỉ trong vài giây.

### 1. Tạo Project Mới Trên Vercel
1. Truy cập [Vercel Dashboard](https://vercel.com) và đăng nhập bằng tài khoản GitHub.
2. Nhấp vào **Add New...** -> **Project**.
3. Tìm kho mã nguồn `AV_EngApp` và nhấp vào nút **Import**.

### 2. Cấu Hình Thư Mục Monorepo
*   **Framework Preset:** `Next.js`
*   **Root Directory:** Nhấp vào **Edit** và chọn thư mục `client`. Vercel sẽ tự động hiểu đây là dự án Next.js nằm trong thư mục con!
*   **Build and Output Settings:** Giữ mặc định (Vercel sẽ tự động chạy `npm run build` thích hợp).

### 3. Thiết Lập Biến Môi Trường (Environment Variables)
Mở rộng phần **Environment Variables** và cấu hình biến liên kết đến Backend vừa deploy:

| Tên Biến | Giá Trị | Ghi Chú |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | `https://engbot-backend.onrender.com/api` | Đường dẫn API Backend của bạn trên Render |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSy...` | Firebase config của bạn |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `...` | Firebase config của bạn |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `...` | Firebase config của bạn |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `...` | Firebase config của bạn |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `...` | Firebase config của bạn |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `...` | Firebase config của bạn |

Nhấp vào nút **Deploy**. Vercel sẽ tiến hành biên dịch ứng dụng Next.js chỉ trong vòng 1-2 phút và cấp cho bạn một tên miền miễn phí dạng `https://engbot-client.vercel.app`.

---

## ⚙️ Bước 4: Cấu Hình CORS Trên Server (Cho Phép Frontend Gọi API)

Để Frontend trên Vercel có thể gọi API đến Backend trên Render thành công mà không bị lỗi bảo mật **CORS (Cross-Origin Resource Sharing)**, chúng ta cần cấu hình cho phép tên miền của Vercel truy cập.

Hãy mở file [server/src/app.ts](file:///e:/AV_EngApp/server/src/app.ts) và tinh chỉnh cấu hình CORS như sau:

```typescript
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'https://ten-mien-cua-ban.vercel.app' // Thay bằng tên miền thực tế Vercel cấp cho bạn
  ],
  credentials: true
}));
```

---

## 🔄 Quy Trình Tự Động Hóa CI/CD Khi Sửa Code

Sau khi hoàn thành 3 bước trên, mỗi lần bạn muốn cập nhật tính năng mới:

1. **Thực hiện thay đổi code** ở máy cá nhân (Local).
2. **Commit và Push lên GitHub:**
   ```bash
   git add .
   git commit -m "style: optimize spacing on mobile settings page"
   git push origin main
   ```
3. **CI/CD Tự Động Chạy:**
   *   **Render** sẽ nhận biết sự kiện push mới ở thư mục `server`, tự động kéo code về, biên dịch TypeScript (`tsc`) và khởi động lại API.
   *   **Vercel** sẽ nhận biết sự kiện push ở thư mục `client`, tự động build tĩnh lại Next.js và cập nhật tức thì đến người dùng toàn cầu mà **không gây gián đoạn dịch vụ** (Zero-downtime deployment).

---
