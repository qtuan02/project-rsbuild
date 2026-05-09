# Danh sách tính năng

Tài liệu này liệt kê các tính năng đang có trong frontend theo module nghiệp vụ, bám theo route và code hiện tại.

## 1) Auth và onboarding

- Đăng nhập và đăng ký tài khoản.
- Guard route cho khu vực dashboard.
- Onboarding wizard cho tài khoản mới.

## 2) Dashboard vận hành

- KPI tổng quan vận hành.
- Biểu đồ doanh thu, thu/chi, tỷ lệ lấp đầy.
- Danh sách công việc và hoạt động gần đây.

## 3) Buildings

- Danh sách tòa nhà.
- Xem chi tiết từng tòa nhà.
- Tạo mới/chỉnh sửa thông tin tòa nhà.

## 4) Rooms

- Danh sách phòng và bộ lọc.
- Hiển thị dạng lưới theo tầng.
- Xem nhanh thông tin phòng và trang chi tiết phòng.
- Tạo/sửa phòng với cấu hình dịch vụ theo phòng.

## 5) Tenants

- Danh sách khách thuê.
- Tạo khách thuê mới (full page flow).
- Xem chi tiết khách thuê.

## 6) Contracts

- Danh sách hợp đồng.
- Tạo hợp đồng mới.
- Xem chi tiết hợp đồng.
- Gia hạn hợp đồng.
- Thanh lý hợp đồng.

## 7) Invoices

- Danh sách hóa đơn.
- Xem chi tiết hóa đơn.
- Tạo/sửa hóa đơn.
- Tạo hóa đơn hàng loạt.
- Hỗ trợ luồng QR thanh toán ở mức UI.

## 8) Utilities

- Danh sách kỳ/chỉ số tiện ích.
- Màn nhập chỉ số điện nước theo kỳ.
- Trang chi tiết tiện ích.

## 9) Supplier Bills

- Danh sách hóa đơn nhà cung cấp.
- Trang chi tiết hóa đơn nhà cung cấp.
- Theo dõi trạng thái thanh toán và phân loại dịch vụ.

## 10) Expenses

- Danh sách chi phí vận hành.
- Trang chi tiết khoản chi.
- Tổng hợp nhanh tổng chi và phân loại khoản chi.

## 11) Reconciliation

- Màn đối soát thu/chi theo tòa nhà và kỳ.
- So sánh doanh thu khách thuê với chi phí đầu vào.

## 12) Reports

- Trang tổng quan báo cáo.
- Bộ lọc dữ liệu báo cáo theo ngữ cảnh vận hành.

## 13) Tasks

- Trung tâm nhiệm vụ vận hành.
- Quản lý mức ưu tiên, trạng thái và hạn xử lý.

## 14) Communications

- Quản lý mẫu thông báo.
- Nhật ký gửi thông báo.
- Bộ lọc theo kênh, trạng thái và người nhận.

## 15) Compliance

- Dashboard tuân thủ hồ sơ cư trú/an toàn.
- Theo dõi checklist tuân thủ.

## 16) Settings

- Cài đặt hệ thống theo nhóm cấu hình.
- Cấu hình điện bậc thang và tham số liên quan.

## 17) Nền tảng dùng chung

- Route manifest tập trung tại `src/config/routes.ts`.
- Layout chuẩn: auth layout, dashboard layout, protected route.
- Store dùng chung: auth store, building selector store.
- Shared components cho list/table/filter/pagination/dialog/panel/card/detail shell.
