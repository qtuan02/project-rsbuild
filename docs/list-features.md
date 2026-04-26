# Danh sách tính năng dự án (đã tích hợp)

Tài liệu này liệt kê các tính năng đang có trong codebase frontend theo module nghiệp vụ, kèm phạm vi chức năng chính và các màn hình liên quan.

## 1) Xác thực và phân quyền truy cập

- Đăng nhập bằng email/mật khẩu.
- Đăng ký tài khoản mới và chọn vai trò (`admin`, `manager`, `tenant`).
- Guard bảo vệ route dashboard khi chưa xác thực.
- Điều hướng sau xác thực:
  - `admin` đi onboarding.
  - vai trò khác vào trang tổng quan.
- Lưu trạng thái người dùng và role trong store để dùng xuyên suốt ứng dụng.

## 2) Onboarding khởi tạo hệ thống

- Wizard onboarding nhiều bước:
  - tạo tòa nhà đầu tiên,
  - thêm phòng ban đầu,
  - mời quản lý/thành viên.
- Cho phép bỏ qua một số bước để vào hệ thống nhanh.

## 3) Tổng quan vận hành (Dashboard)

- Cụm thẻ KPI: phòng, lấp đầy, doanh thu, chi phí.
- Biểu đồ doanh thu theo thời gian.
- Biểu đồ thu/chi (cash flow).
- Biểu đồ donut tỷ lệ lấp đầy.
- Danh sách việc cần làm và hoạt động gần đây.

## 4) Quản lý tòa nhà (Buildings)

- Danh sách tòa nhà dạng card.
- Hiển thị các chỉ số vận hành theo tòa:
  - tổng phòng,
  - phòng trống,
  - tỷ lệ lấp đầy.
- Dialog tạo mới tòa nhà với các trường:
  - tên,
  - địa chỉ,
  - số tầng,
  - ngày chốt điện nước,
  - ghi chú.

## 5) Quản lý phòng (Rooms)

- Danh sách phòng, lọc theo ngữ cảnh quản trị.
- Room grid theo tầng (group by floor).
- Màu trạng thái phòng (trống/đang thuê/bảo trì/đặt trước).
- Quick detail sheet cho thao tác nhanh trên phòng.
- Trang chi tiết phòng.
- Form tạo/sửa phòng:
  - thông tin cơ bản (tòa, tên, tầng, diện tích, giá, trạng thái, loại phòng),
  - cấu hình dịch vụ theo phòng (điện/nước/rác/internet/giữ xe).

## 6) Quản lý khách thuê (Tenants)

- Danh sách khách thuê.
- Trang chi tiết khách thuê.
- Trang tạo khách thuê mới (full page flow).
- Hỗ trợ nhập liệu thông tin định danh và dữ liệu hồ sơ phục vụ lưu trú.

## 7) Quản lý hợp đồng (Contracts)

- Danh sách hợp đồng.
- Trang chi tiết hợp đồng.
- Tạo hợp đồng mới theo luồng wizard nhiều bước.
- Gia hạn hợp đồng:
  - nhập ngày kết thúc mới,
  - cập nhật tiền thuê,
  - ghi chú,
  - màn xác nhận trước khi lưu.
- Thanh lý hợp đồng.

## 8) Quản lý hóa đơn khách thuê (Invoices)

- Danh sách hóa đơn.
- Trang chi tiết hóa đơn.
- Form tạo/sửa hóa đơn với dữ liệu tenant/room và trạng thái thanh toán.
- Tạo hóa đơn hàng loạt:
  - chọn nhiều phòng/hóa đơn,
  - xem trước breakdown chi phí,
  - thao tác gửi hàng loạt.

## 9) Tiện ích điện nước (Utilities)

- Danh sách kỳ/chỉ số tiện ích.
- Trang chi tiết tiện ích.
- Màn nhập chỉ số điện nước theo từng phòng cho kỳ hiện tại.
- Chuẩn bị dữ liệu cho bước tính hóa đơn theo chỉ số mới.

## 10) Hóa đơn nhà cung cấp (Supplier Bills)

- Danh sách hóa đơn nhà cung cấp theo tòa nhà.
- Trang chi tiết hóa đơn nhà cung cấp theo từng bill (`/supplier-bills/:billId`).
- Thống kê nhanh:
  - tổng chi,
  - khoản chờ thanh toán,
  - số lượng hóa đơn.
- Bảng theo dõi chi tiết theo loại dịch vụ, nhà cung cấp, kỳ, trạng thái.
- Từ bảng danh sách có thể bấm trực tiếp vào từng dòng để xem chi tiết hóa đơn.

## 11) Chi phí vận hành (Expenses)

- Danh sách chi phí vận hành (`/expenses`) với số liệu tổng quan:
  - tổng chi,
  - số phiếu chi,
  - chi trung bình trên mỗi khoản.
- Bảng chi phí theo danh mục, ngày chi, mô tả và số tiền.
- Trang chi tiết chi phí (`/expenses/:expenseId`) hiển thị đầy đủ metadata khoản chi.

## 12) Đối soát chi phí (Reconciliation)

- Màn đối soát thu/chi theo tòa nhà và kỳ.
- So sánh doanh thu từ khách thuê với chi phí đầu vào.
- Hiển thị chênh lệch phục vụ kiểm soát lãi/lỗ.

## 13) Báo cáo (Reports)

- Dashboard báo cáo tổng quan.
- Bộ lọc báo cáo theo tòa, tầng, trạng thái.
- Các bảng/chỉ số phục vụ theo dõi tài chính và vận hành.

## 14) Trung tâm nhiệm vụ (Tasks)

- Danh sách việc cần xử lý.
- Theo dõi mức ưu tiên và hạn xử lý.
- Gom các tác vụ vận hành ở một nơi.

## 15) Liên lạc (Communications)

- Quản lý mẫu thông báo đa kênh (Zalo/SMS/Email/In-app).
- Nhật ký gửi thông báo:
  - lọc theo kênh,
  - lọc theo trạng thái,
  - tìm kiếm theo tenant.
- Khối cấu hình thông báo tự động.

## 16) Tuân thủ (Compliance)

- Dashboard tuân thủ hồ sơ cư trú/an toàn.
- Theo dõi checklist các đầu mục cần hoàn thiện.

## 17) Cài đặt hệ thống (Settings)

- Các tab cấu hình hệ thống quản lý vận hành.
- Cấu hình điện bậc thang:
  - khai báo các bậc từ/đến kWh,
  - đơn giá từng bậc,
  - bật/tắt VAT.

## 18) Nền tảng dùng chung (Shared platform capabilities)

- Hệ route manifest tập trung, quản lý menu + metadata trang.
- Hệ layout chuẩn: Auth layout, Dashboard layout, Protected route.
- Store dùng chung:
  - auth store,
  - building selector store.
- Bộ shared components dùng lại nhiều nơi:
  - filters/toolbar,
  - pagination/data table,
  - list shell (`ListPageHeader`, `GridTableSwitch`, `ListPageShell`),
  - entity card/action patterns (`EntityListCard`, `EntityActionMenu`),
  - detail shell (`DetailPageShell`),
  - panels trạng thái (loading/error/empty),
  - cards/info rows,
  - dialog/sheet/confirm patterns.
- Chuẩn form:
  - dùng `react-hook-form` + `zod`,
  - dùng shadcn form primitives (`Form`, `FormField`, `FormItem`, `FormControl`, `FormMessage`).

## 19) Tuyến nghiệp vụ chính (end-to-end)

- Luồng cơ bản của người quản trị:
  1. đăng nhập/đăng ký,
  2. onboarding tạo dữ liệu nền,
  3. quản lý tòa nhà/phòng/khách thuê/hợp đồng,
  4. nhập điện nước và phát hành hóa đơn,
  5. theo dõi chi phí nhà cung cấp + đối soát,
  6. theo dõi báo cáo và nhiệm vụ,
  7. cấu hình thông báo và thiết lập hệ thống.

