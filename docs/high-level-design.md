# **Phân tích và thiết kế hệ thống phần mềm quản lý bất động sản cho thuê thông minh: Kiến trúc, tính năng và quy trình vận hành toàn diện**

Thị trường bất động sản cho thuê tại Việt Nam đang trải qua một giai đoạn chuyển đổi số mạnh mẽ, dịch chuyển từ các phương thức quản lý truyền thống dựa trên sổ sách và bảng tính sang các hệ thống quản lý tích hợp đa nền tảng. Sự gia tăng nhanh chóng của các mô hình lưu trú như chung cư mini, căn hộ dịch vụ, ký túc xá (dormitory) và nhà trọ sinh viên đã tạo ra áp lực lớn lên các chủ đầu tư và đơn vị vận hành trong việc tối ưu hóa quy trình.1 Một hệ thống phần mềm quản lý phòng trọ hiện đại không chỉ đóng vai trò là một công cụ lưu trữ dữ liệu đơn thuần mà còn phải là một hệ sinh thái kết nối chặt chẽ giữa chủ nhà, người quản lý, khách thuê và các cơ quan quản lý nhà nước thông qua các giải pháp công nghệ như IoT, Fintech và các cổng dịch vụ công trực tuyến.3 Việc thiết kế một hệ thống như vậy đòi hỏi sự hiểu biết sâu sắc về các nghiệp vụ đặc thù tại Việt Nam, từ quy trình tính tiền điện nước lũy tiến, quản lý tạm trú cho đến việc tự động hóa gạch nợ qua ngân hàng.4

## **Kiến trúc tổng thể và mô hình thực thể quan hệ cho trí tuệ nhân tạo**

Để một hệ thống trí tuệ nhân tạo có thể hiểu và tham gia vào quá trình phát triển hoặc vận hành phần mềm, cấu trúc dữ liệu nền tảng phải được thiết kế theo các tiêu chuẩn chuẩn hóa cơ sở dữ liệu (Database Normalization). Kiến trúc của hệ thống quản lý bất động sản cho thuê thường dựa trên mô hình đa thực thể, trong đó các mối quan hệ được định nghĩa chặt chẽ để đảm bảo tính toàn vẹn dữ liệu và khả năng truy vấn tài chính phức tạp.7

### **Mô hình thực thể và các thuộc tính dữ liệu cốt lõi**

Cấu trúc cơ sở dữ liệu cần phản ánh chính xác phân cấp của bất động sản và các dòng tiền vào/ra (Revenue/Expense). 10

| Thực thể (Entity) | Thuộc tính chính (Attributes) | Định dạng & Ràng buộc (Constraints) |
| :---- | :---- | :---- |
| **Building (Tòa nhà)** | ID, Name, Address, TotalFloors, ManagerID, UtilityCycleDay | Khóa chính, Không rỗng, Ngày chốt điện nước từ 1-31 |
| **Room (Phòng)** | ID, BuildingID, RoomNumber, Floor, Area, BasePrice, Status | Khóa ngoại, Trạng thái: Trống/Đã thuê/Đang sửa chữa 9 |
| **Tenant (Khách thuê)** | ID, FullName, Phone, Email, IDCard (CCCD), VehiclePlate, Image | Duy nhất cho số điện thoại và CCCD 10 |
| **Contract (Hợp đồng)** | ID, RoomID, TenantID, StartDate, EndDate, Deposit, Cycle | Ngày kết thúc \> Ngày bắt đầu, Tiền cọc \>= 0 7 |
| **UtilityIndex (Chỉ số)** | ID, RoomID, Type (Elec/Water), OldValue, NewValue, Month | NewValue \>= OldValue, Liên kết theo phòng và tháng 5 |
| **Invoice (Hóa đơn thu)** | ID, ContractID, TotalAmount, PaymentStatus, DueDate | Doanh thu từ khách thuê (phòng, điện, nước, rác...) 23 |
| **SupplierBill (Hóa đơn chi)** | ID, BuildingID, SupplierName, Type (Elec/Water/Trash/Repair), Amount, Date | Chi phí trả cho đơn vị cung cấp (EVN, Cấp nước...) 10 |
| **Expense (Chi phí khác)** | ID, BuildingID, Category, Amount, Description, ReceiptImage | Các chi phí phát sinh như bảo trì, quảng cáo, lương nhân viên 10 |

### **Phân tích nghiệp vụ dữ liệu cho AI hiểu**

Để AI có thể tự động hóa các tác vụ, nó cần hiểu các logic chuyển đổi trạng thái. Ví dụ, khi một hợp đồng mới được ký kết, trạng thái của Room phải tự động chuyển từ "Trống" sang "Đã thuê".9

Đặc biệt, AI cần xử lý logic **Đối soát chi phí (Expense Reconciliation)**. Khi chủ nhà nhập một SupplierBill cho tiền điện tổng của tòa nhà, hệ thống phải tự động tính tổng UtilityIndex (loại điện) của tất cả các phòng trong cùng kỳ để so sánh.26 Sự chênh lệch này giúp nhận diện thất thoát hoặc sai số giữa đồng hồ tổng và đồng hồ con.

## **Thiết kế hệ thống tính năng chuyên sâu và quy trình vận hành**

### **Quản lý danh mục bất động sản và sơ đồ phòng thông minh**

Tính năng này cho phép chủ nhà quản lý nhiều tòa nhà tại các địa điểm khác nhau trên một tài khoản duy nhất.2 Sơ đồ phòng nên được hiển thị dưới dạng lưới (Grid View) để người dùng có cái nhìn tổng quan tức thì về hiệu suất lấp đầy.3

### **Quản lý khách thuê và hồ sơ định danh điện tử**

Hệ thống tích hợp công nghệ OCR (Optical Character Recognition) để quét thông tin từ ảnh chụp CCCD, tự động điền vào các trường dữ liệu và lưu trữ bản sao số hóa của giấy tờ tùy thân.14 Việc quản lý thông tin phương tiện (biển số xe, loại xe) cũng cực kỳ quan trọng để quản lý an ninh bãi giữ xe.12

### **Chu kỳ tài chính và thuật toán tính toán hóa đơn**

Công thức tính tiền điện theo bậc thang lũy tiến tại Việt Nam được áp dụng cho khách thuê:

![][image1]  
Trong đó ![][image2] là lượng điện năng tiêu thụ thuộc bậc ![][image3], ![][image4] là đơn giá tương ứng của bậc đó, và ![][image5] là thuế suất giá trị gia tăng.5

### **MỚI: Quản lý chi phí và Đối soát nhà cung cấp**

Đây là phân hệ giúp theo dõi toàn bộ hóa đơn đầu vào từ các đơn vị cung cấp dịch vụ công (Điện, Nước, Rác, Internet). 10

* **Ghi nhận hóa đơn đầu vào:** Cho phép chủ nhà chụp ảnh và lưu trữ hóa đơn nhận được từ EVN hoặc đơn vị cấp nước. Các thông tin cần lưu bao gồm: kỳ thanh toán, tổng số tiền, chỉ số tổng trên công tơ nhà nước. 27  
* **Module Đối soát (Comparison Module):** Hệ thống tự động tổng hợp số tiền thu được từ khách thuê ở các hạng mục tương ứng và so sánh với hóa đơn của nhà cung cấp.  
  * *Ví dụ:* Tổng tiền điện thu từ 10 phòng là 5.000.000đ. Hóa đơn điện tổng trả cho EVN là 4.500.000đ. Hệ thống báo cáo lãi dịch vụ điện là 500.000đ.  
* **Quản lý chi phí vận hành:** Theo dõi các khoản chi ngoài dịch vụ như phí thu gom rác tổng, tiền vệ sinh chung, và các chi phí bảo trì hỏng hóc phát sinh. 10

## **Hệ thống màn hình giao diện (UI/UX) và luồng người dùng**

### **Màn hình Dashboard: Trung tâm điều hành chiến lược**

Dashboard không chỉ là nơi hiển thị tỷ lệ lấp đầy mà còn là công cụ phân tích lợi nhuận ròng. 28

* **Thống kê Lợi nhuận dịch vụ:** Biểu đồ so sánh giữa "Mức thu từ phòng trọ" và "Hóa đơn nhà cung cấp" cho từng hạng mục (Điện, Nước, Rác). 10  
* **Dòng tiền (Cash Flow):** Tổng thu thực tế từ hóa đơn khách thuê trừ đi tổng chi trả cho nhà cung cấp và chi phí vận hành. 18  
* **Cảnh báo thất thoát:** Tự động cảnh báo khi tổng lượng tiêu thụ tại các phòng con vượt quá hoặc thấp hơn bất thường so với công tơ tổng của tòa nhà. 3

### **Màn hình Quản lý Chi phí và Phiếu chi**

Màn hình này liệt kê tất cả các khoản chi trong tháng, phân loại theo nhóm: Dịch vụ công (điện/nước/rác), Bảo trì, Lương nhân viên, Thuế. 10 Chủ nhà có thể lọc báo cáo theo từng tòa nhà để xem nơi nào đang có chi phí vận hành cao bất thường.

### **Ứng dụng dành cho khách thuê (Tenant Mobile App)**

Giao diện cho người thuê minh bạch hóa các khoản phí. Khách thuê có thể xem biểu phí dịch vụ mà chủ nhà áp dụng và đối soát với chỉ số công tơ của phòng mình trực tiếp trên ứng dụng.

## **Nghiệp vụ pháp lý, Quản lý tạm trú và Tuân thủ**

Phần mềm hỗ trợ khai báo cư trú qua VNeID và Cổng dịch vụ công quốc gia bằng cách tự động điền dữ liệu vào mẫu CT01 (Tờ khai thay đổi thông tin cư trú).18 Việc này giúp chủ nhà tuân thủ Nghị định 96/2016/NĐ-CP về an ninh trật tự.15

## **Phân tích quản trị và Hệ thống báo cáo đa chiều**

Hệ thống cung cấp các loại báo cáo chuyên sâu giúp phân tích hiệu quả kinh doanh thực tế. 10

| Loại báo cáo | Nội dung cung cấp | Ý nghĩa quản trị |
| :---- | :---- | :---- |
| **Báo cáo Lợi nhuận dịch vụ** | Thu từ khách (Điện/Nước/Rác) vs Chi cho nhà cung cấp | Phát hiện thất thoát năng lượng hoặc sai số đồng hồ 10 |
| **Báo cáo Lãi/Lỗ (P\&L)** | Tổng thu (Phòng \+ Dịch vụ) \- Tổng chi (Vận hành \+ Sửa chữa) | Đánh giá lợi nhuận ròng của từng tòa nhà 25 |
| **Báo cáo Nợ quá hạn** | Danh sách phòng nợ tiền, số ngày quá hạn | Kiểm soát rủi ro dòng tiền 3 |
| **Báo cáo Hiệu suất phòng** | Tỷ lệ phòng trống, thời gian trống trung bình | Tối ưu hóa giá thuê và chiến lược tìm khách 10 |

## **Kết luận và Khuyến nghị cho quá trình phát triển**

Việc bổ sung phân hệ **Quản lý chi phí và Đối soát** là bước đi tất yếu để nâng cấp phần mềm từ một công cụ quản lý vận hành lên một hệ thống quản trị tài chính chuyên nghiệp. Các nhà phát triển nên tập trung vào việc trực quan hóa sự chênh lệch giữa hóa đơn đầu vào và đầu ra trên Dashboard, giúp chủ nhà có cái nhìn tức thì về "sức khỏe" tài chính của từng khu trọ. Việc tích hợp sâu với các kênh thanh toán VietQR và thông báo Zalo ZNS sẽ hoàn thiện hệ sinh thái, giảm thiểu 50-70% khối lượng công việc hành chính và đảm bảo tính minh bạch tuyệt đối trong kinh doanh cho thuê. 3

## **Phụ lục triển khai frontend: Chuẩn hóa UI tái sử dụng**

- Danh sách/list pages chuẩn hóa theo shared shell:
  - header thống nhất (`ListPageHeader`),
  - grid/table switch thống nhất (`GridTableSwitch`),
  - table stack thống nhất (`DataTableToolbar`, `DataTableView`, `DataTablePagination`).
- Card item liên feature ưu tiên base chung `EntityListCard` + action dropdown chung `EntityActionMenu`.
- Detail pages chuẩn hóa khung điều hướng và bố cục section qua `DetailPageShell` + `InfoCard`.
- Các màn hình KPI/summary ưu tiên dùng `SummaryCard` variants để đảm bảo đồng bộ visual language.

#### **Nguồn trích dẫn**

1. Top 10 phần mềm quản lý nhà trọ hiệu quả nhất năm 2026 (so sánh chi tiết) \- Resident, truy cập vào tháng 4 22, 2026, [https://resident.vn/top-10-phan-mem-quan-ly-nha-tro/](https://resident.vn/top-10-phan-mem-quan-ly-nha-tro/)  
2. Top 12 Phần Mềm Quản Lý Nhà Trọ Hiệu Quả Và Phổ Biến Nhất \- Magenest, truy cập vào tháng 4 22, 2026, [https://magenest.com/vi/phan-mem-quan-ly-nha-tro/](https://magenest.com/vi/phan-mem-quan-ly-nha-tro/)  
3. So Sánh Chi Tiết 10 Phần Mềm Quản Lý Phòng Trọ, Ưu Nhược ..., truy cập vào tháng 4 22, 2026, [https://resident.vn/so-sanh-phan-mem-quan-ly-phong-tro/](https://resident.vn/so-sanh-phan-mem-quan-ly-phong-tro/)  
4. Giải pháp 5 phút tính tiền điện nước với Tính năng Quản lý Chỉ số điện nước của App Trọ Mới Host, truy cập vào tháng 4 22, 2026, [https://host.tromoi.com/blog/tin-tro-moi/giai-phap-5-phut-tinh-tien-dien-nuoc-voi-tinh-nang-quan-ly-chi-so-dien-nuoc-cua-app-tro-moi-host](https://host.tromoi.com/blog/tin-tro-moi/giai-phap-5-phut-tinh-tien-dien-nuoc-voi-tinh-nang-quan-ly-chi-so-dien-nuoc-cua-app-tro-moi-host)  
5. Cách tính tiền điện sinh hoạt đơn giản, chính xác nhất 2025 \- Zalopay, truy cập vào tháng 4 22, 2026, [https://zalopay.vn/cach-tinh-tien-dien-2655](https://zalopay.vn/cach-tinh-tien-dien-2655)  
6. Mở TK VietQR và liên kết, truy cập vào tháng 4 22, 2026, [https://api.vietqr.vn/vi/mo-tk-vietqr-va-lien-ket](https://api.vietqr.vn/vi/mo-tk-vietqr-va-lien-ket)  
7. 1010sb/DataMart\_SQL: This project offers a DataMart rental service similar to AirBNB, but specifically designed for MySQL Relational Database Management System (RDBMS). \- GitHub, truy cập vào tháng 4 22, 2026, [https://github.com/1010sb/DataMart\_SQL](https://github.com/1010sb/DataMart_SQL)  
8. ER Diagram for a Hotel Management System: Guide with Examples | Creately, truy cập vào tháng 4 22, 2026, [https://creately.com/guides/er-diagram-for-hotel-management-system/](https://creately.com/guides/er-diagram-for-hotel-management-system/)  
9. MotelManager SRS: Hệ Thống Quản Lý Nhà Trọ Sinh Viên V1.0 \- Studocu, truy cập vào tháng 4 22, 2026, [https://www.studocu.vn/vn/document/dai-hoc-studocu-viet-nam/hanh-chinh-van-phong/srs-xay-dung-he-thong-quan-ly-phong-tro-cho-sinh-vien/98090910](https://www.studocu.vn/vn/document/dai-hoc-studocu-viet-nam/hanh-chinh-van-phong/srs-xay-dung-he-thong-quan-ly-phong-tro-cho-sinh-vien/98090910)  
10. 5+ Mẫu File Excel quản lý phòng trọ hiệu quả, truy cập vào tháng 4 22, 2026, [https://blog.slimcrm.vn/quan-tri/mau-file-excel-quan-ly-phong-tro](https://blog.slimcrm.vn/quan-tri/mau-file-excel-quan-ly-phong-tro)  
11. SRS \- Yêu Cầu Phần Mềm cho Website Quản Lý Đặt Phòng Khách Sạn \- Studocu Vietnam, truy cập vào tháng 4 22, 2026, [https://www.studocu.vn/vn/document/vietnam-national-university/cong-nghe/srs-example/88918560](https://www.studocu.vn/vn/document/vietnam-national-university/cong-nghe/srs-example/88918560)  
12. CÁC BƯỚC KHỞI TẠO DỮ LIỆU NHÀ TRỌ TẠI PHẦN MỀM ITRO TRÊN MÁY TÍNH, truy cập vào tháng 4 22, 2026, [https://quanlynhatro.com/blog/cac-buoc-khoi-tao-du-lieu-nha-tro-tai-phan-mem-itro-tren-may-tinh-97](https://quanlynhatro.com/blog/cac-buoc-khoi-tao-du-lieu-nha-tro-tai-phan-mem-itro-tren-may-tinh-97)  
13. Top 15 phần mềm quản lý nhà trọ miễn phí tốt nhất hiện nay \- POS365, truy cập vào tháng 4 22, 2026, [https://www.pos365.vn/phan-mem-quan-ly-nha-tro-6790.html](https://www.pos365.vn/phan-mem-quan-ly-nha-tro-6790.html)  
14. Demo App Quản Lý Phòng Trọ | Appsheet | Nghia IT 40 \- YouTube, truy cập vào tháng 4 22, 2026, [https://www.youtube.com/watch?v=28Tvdq9IeEA](https://www.youtube.com/watch?v=28Tvdq9IeEA)  
15. Quản lý khách lưu trú trên phần mềm KiotViet: Scan nhanh hàng loạt giấy tờ, khai báo lưu trú online dễ dàng, truy cập vào tháng 4 22, 2026, [https://www.kiotviet.vn/quan-ly-khach-luu-tru-tren-phan-mem-kiotviet-scan-nhanh-hang-loat-giay-to-khai-bao-luu-tru-online-de-dang/](https://www.kiotviet.vn/quan-ly-khach-luu-tru-tren-phan-mem-kiotviet-scan-nhanh-hang-loat-giay-to-khai-bao-luu-tru-online-de-dang/)  
16. Cách tính tiền điện & thanh toán tiền điện sinh hoạt đơn giản 2026 \- Techcombank, truy cập vào tháng 4 22, 2026, [https://techcombank.com/thong-tin/blog/cach-tinh-tien-dien-sinh-hoat](https://techcombank.com/thong-tin/blog/cach-tinh-tien-dien-sinh-hoat)  
17. Cách tính tiền điện sinh hoạt, phòng trọ trong 1 tháng mới nhất 2025 \- Phong Vũ, truy cập vào tháng 4 22, 2026, [https://phongvu.vn/cong-nghe/cach-tinh-tien-dien-sinh-hoat-2025/](https://phongvu.vn/cong-nghe/cach-tinh-tien-dien-sinh-hoat-2025/)  
18. 2 cách đăng ký tạm trú online NHANH CHÓNG \- CHÍNH XÁC \- MISA meInvoice, truy cập vào tháng 4 22, 2026, [https://www.meinvoice.vn/tin-tuc/26823/dang-ky-tam-tru-online/](https://www.meinvoice.vn/tin-tuc/26823/dang-ky-tam-tru-online/)  
19. thủ tục: Đăng ký tạm trú \- Cổng Dịch vụ công Quốc gia, truy cập vào tháng 4 22, 2026, [https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-nganh-doc.html?ma\_thu\_tuc=1.004194](https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-nganh-doc.html?ma_thu_tuc=1.004194)  
20. Cách đăng ký tạm trú online cho người thuê nhà mới nhất năm 2025 \- Bách hóa XANH, truy cập vào tháng 4 22, 2026, [https://www.bachhoaxanh.com/kinh-nghiem-hay/cach-dang-ky-tam-tru-online-1584293](https://www.bachhoaxanh.com/kinh-nghiem-hay/cach-dang-ky-tam-tru-online-1584293)  
21. Hướng dẫn sử dụng tính năng gửi tin nhắn Zalo ZNS \- KiotViet, truy cập vào tháng 4 22, 2026, [https://www.kiotviet.vn/huong-dan-su-dung-kiotviet/khach-hang-web-fnb/gui-tin-nhan-zns/](https://www.kiotviet.vn/huong-dan-su-dung-kiotviet/khach-hang-web-fnb/gui-tin-nhan-zns/)  
22. Thanh lý hợp đồng thuê nhà và những điều quan trọng cần biết \- RESIDENT, truy cập vào tháng 4 22, 2026, [https://resident.vn/thanh-ly-hop-dong-thue-nha-va-nhung-dieu-quan-trong-can-biet/](https://resident.vn/thanh-ly-hop-dong-thue-nha-va-nhung-dieu-quan-trong-can-biet/)  
23. Phiếu Thu Tiền Phòng Trọ: Mẫu chuẩn và hướng dẫn chi tiết \- Resident, truy cập vào tháng 4 22, 2026, [https://resident.vn/phieu-thu-tien-phong-tro-mau-chuan-va-huong-dan-chi-tiet/](https://resident.vn/phieu-thu-tien-phong-tro-mau-chuan-va-huong-dan-chi-tiet/)  
24. Rental Management DB Schema \- Laracasts, truy cập vào tháng 4 22, 2026, [https://laracasts.com/discuss/channels/general-discussion/rental-management-db-schema](https://laracasts.com/discuss/channels/general-discussion/rental-management-db-schema)  
25. PHẦN MỀM QUẢN LÝ NHÀ TRỌ, CHUNG CƯ MINI, CĂN HỘ, truy cập vào tháng 4 22, 2026, [https://phanmemnhatro.com/](https://phanmemnhatro.com/)  
26. Dashboard là gì? Ứng dụng và 5 bước xây dựng dashboard nhanh chóng \- Vieclam24h, truy cập vào tháng 4 22, 2026, [https://vieclam24h.vn/nghe-nghiep/tram-sac-ky-nang/dashboard-la-gi](https://vieclam24h.vn/nghe-nghiep/tram-sac-ky-nang/dashboard-la-gi)  
27. Mẫu biên bản thanh lý hợp đồng thuê nhà chuẩn nhất 2024 \- Chothuenha.com.vn, truy cập vào tháng 4 22, 2026, [https://chothuenha.com.vn/mau-bien-ban-thanh-ly-hop-dong-thue-nha-chuan-nhat-2024](https://chothuenha.com.vn/mau-bien-ban-thanh-ly-hop-dong-thue-nha-chuan-nhat-2024)  
28. Dashboard là gì? Hướng dẫn toàn diện, lợi ích và cách xây dựng hiệu quả | Lark Blog, truy cập vào tháng 4 22, 2026, [https://www.larksuite.com/vi\_vn/blog/what-is-dashboard](https://www.larksuite.com/vi_vn/blog/what-is-dashboard)  
29. Cách Xây Dựng Hệ Thống Báo Cáo Hiệu Quả Bằng KPI Và Dashboard, truy cập vào tháng 4 22, 2026, [https://www.mcivietnam.com/blog-detail/cach-xay-dung-he-thong-bao-cao-hieu-qua-bang-kpi-va-dashboard-C185AB/](https://www.mcivietnam.com/blog-detail/cach-xay-dung-he-thong-bao-cao-hieu-qua-bang-kpi-va-dashboard-C185AB/)

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAA2CAYAAAB6H8WdAAAIlElEQVR4Xu3daYgsVxmH8VdcUIxbDCbuiQgiBhKRKG4fFJe4IkaioohRVASVIBhRUEdFcMElLrgjCqJGJR/iEqOYEcEPJmAimoRE8Sa4gCKioKjB5TyeOvTbZ6q7q+90z8yV5weH6a6qrqqu7sv53/dUVUdIkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJknQgLi7ttaV9prT7dfMkSZJ0BJxb2hWl3aa0V3XzJEmSdARcUtqzh3Z2aefPz5YkSdJhu7K0M6IGtjeWdrf52ZIkSZIkSZIkSZIkSZIk7Ru37fjP0G5Z0P6Vlmnto7xYkiRJB6MFsvP6GQvcNerykiRJOiDvjBrAbuxnLPH80k7tJxZ37CccIdu60nVb6922E3W/JUlHwMti75Bcaz9Ny+0HFaV1bwb74NJ+20/8P/LwqKHtoqg3y50id/j8GgK3Aul9rrTrS3teaX8u7XXzszfmdzEbrv398PdDc0tE3LO0b3XT9uN2pX2sn1g8pZ9whH2itNv3EyVJWoUO/k7DYzrh3eHxvUv74vB4kVNK+3A/cQTLsOw6flbarVE76cP0pNL+2U/ckE9FDToErHXdUNqZ3bS/x3z443O9PMYrc/t1l9J+GPPr3o16vDJC5gu6aceL9/Ka9PxRpT096n3rpnhaP+EQcCx+1E+UJGkVbtTaEB7eNTx+UGnvT/PGnFPai/qJI66K9YLXSaU9ubSbh8eH6c1Rg+w23CtmVap1qy7fjPnh0IeVdll63nw+9oaoHiFvrMp3535C8tDS/hjznyuf8+PS8+ZrMf753z/2vu9l27wp6nazR8T0wPasfsIh4N/VL/qJkiRNRUdJMKFD6XH+FJ0M1QGqHCxLZe4Pw1+GvsDwHgHuAzF/fhaVsnVQ2SOo7Uat9IEhwPeW9vOowYSq3bGoYYAfTWdfGkLANVH35dqoYeTSqOHrIcMyhFGqP7z2HaXtRD237CXDPF7zwdL+XdrVpb3yf6/aPI4Zge1PpT2ym7cIxySHj0eX9o/Ye44U74FjOSWovK+0NwyPCUUEwmU4/vlzZdv5M8h+HTXc99g/KmYttJ0Wy48B4bO3qcDG9+2TUff141HXyS9PbAPvYywgS5K0EpW2Vl3L6BAJMq2DaR0kHfDf2kLD9J3hMcNkbaj0HlFD1VQMc9GBU5HhdawXb4kauDhfClSNODcO940a3vDcNB100hdEXeeXogaLs0r7yzD/hVHD4HuG51StvhezSs+iELtJD4xZpW1KR84xaccFBABe22OZv8YsyPG3D3UZx+jTUfdnFapr340aHmmt2sf6X90WGlApXVaJJbQRwpeFNQLVWDBbFth4P23/aITx9pjqZsY+870ghPIZPDPqd+C6od0h6nvgPyLPGV7TcO5e+7fDun8cdTn+08Dj/nQA9pd/F5IkrY0OJw+PNgSvPMxFUKLD4SICOu0mL8ffti6qNVMvOOCcKzruFl5oeTiPqk+r/LAPbagyn2fG/DyEybYJbVRLqJ6Ajpcg0/D6th2Wa50vIaQfetyWdquP+/QzRowFthyem52YD3IEklVDzFzoMSU0sl4CdI9t9PeMI7C9vpuWMTT6hdg7PJodT2B7TNTzBFu7Ij2+OC2XUcHNuG8eVUpQSaYa26M62qp/XOzB8WN4mO8Zwawf5mV/+U+NJElrI+SMdeZUm9p0qhJcDECwomOjM6MTo/PZjdoxtcrYyaU9IGYXHHCO1SqXxHzlg44td/SEmnbi+LGYBavro4YEhkx/GbPOk20yTEcHyroIDqAzpRNmGLCFsrbvrQrH1bOEuLY9hk4zln9G1A56rPXnWq1CRWZZhSmj4pdPoGeougUzPp/vR30PrLNVy6gKLbti8+zSvjM8fmvMhkfHcMHBsaiVzYzjzDZYV0YIXHTCP9VN3jevfWksDm18NnzfessCW2/ZkCjG/nNBxbaFuFfE3jDLcWX7u1H3sR0TvmOENf6t9Pje9iFOkqRJxobUkKsBDI0SCEB1jQrChVE7MQITwe68qMGKShVhjsBHp7xsKA50YG/rpp0f851xHp7M4Y2rIwlXnHtGp855dvhyad8eHhP8WoWN17Jetse+tekMZxHqCI2sh86b7bHvU4YJjxfr5rhNRQDOwYLjTvXoCVEDz5mlfb2009MyHKuxiljzjZi9R9ZBaOvDScP6xyqPBB62sdNNJ0SPBViOPdtt2N5H0vPe2DYJbMveV7YqsBHOcjUZfK/Yf44J3+ce3yPWS0BreB+Lrp5mXqvYSZK0UXePvUM4dDx9B5arY7lax+tBaMhDVLR3p/mr5M46B0A6U0JMw7715yjhtlG3lfedafl8Iubl7bCeRVWfTeA8sIv6iRNwblR/HtTpUat7hAzm8fyCYR4XJrCtbWMb+bOh6rSTnu8HtzLpA9U6VgW2PgyCUEmIHxvSpYJLyH9q1FDXECLHAir4HKgIS5KkEwRBbVXlMcuBg3MEv5qeZ4RrKqasv1XJqD5SvVpUNdsUttGGj9nW24e/m0B4urKfuGVUfqle9n5S2m+Gx3wOVG0fG3V4+lelfTbGh4GpOG+zWitJkjaIEPODfuISVPnOTc95PeeZjYUhplG9pHqYp3Hu2baxjbZPj4/1rhCegvPd1gm5m7Cp48ZnyLCrJEk6ARA6uCBgCkLXE2PxOYaSJEnaMIbDCF/rtnYhhSRJkraMiwL6Cy+mtLHzoSRJkiRJkiRJkiRJkiRJOl5jP7WU8TNZ10W9OaskSZIOGHfsn3IhwTVhYJMkSTpw/NzVi0v7SmlnRb1lx27XuGs+DGySJEmH5Iyhcfd7fkqKUJZb+11LA5skSdIheXlpb+ondvjpqVtj8z/vJEmSpInyb31KkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkib7L/qdbJO8/v9UAAAAAElFTkSuQmCC>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAABk0lEQVR4Xu2UvytGURjHH2EQkoiUkcGPRCEKg0EpBkURFoPIaJDtlQwGBinFH2AymAwkxSAzE0LJophMCt+v55yc+7y/rv391Kf3vfd7z7nnnOecK5IjAxVwAI7CBpgfjeOTB/vgFTyCk85TeAc7/h6NRyFchw+S3JjZLnyHbSZLCxvtwDfYaTJPs2in26Izysoc/HK/6aiBT/AGVposiTr4Aq9hlclCfKeU/zOSgN/uNxO18FlidFoCz+An7IlGSTDnc+ew1GQR/jOlJUk9oxY4LkHxfKfZ3l4GL+ErbDLZPJwNb7CKrOY9rA4Dw5To7li0QSoK4L7o/uM+5H5dFT09G+6a+5Y5Nz+vPcVwBe6JziQCT4hvNAHH3P1puAAf4SYscvc9I7BV9Dh3m+wXHstb0equiZ73Q9ER94sWgR+UcKT1sAsew/LgfgQ2aBf9Kg2LLj5f4BlyeUjCGZsZ+CFanC14INElYJEvREfLZbLLk5JB0X1Jueb2Q8Pv7YloYXtNlhZWd1l0lI0m83DJ+FwO5QcldkkN6TqZRgAAAABJRU5ErkJggg==>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAXCAYAAADHhFVIAAAAlUlEQVR4XmNgGHjADcSFQKyGLgECRUD8H4jT0SVAQASIHYCYFU0cN2AGYmMgtoGy4QBkxAQgrgXi00DciyzpCsQ1QMwHxAeAeCUDku5MINYHYksg/gbEETAJGAC58ioQTwFiRjQ5Bg8g/gXELkCsDsQNyJIzGCCOEWaABATIHXDgB8RPgHgDEBcwYDGaB4gF0AWHDgAAPfUSVNIdKk0AAAAASUVORK5CYII=>

[image4]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAYCAYAAAD3Va0xAAABMUlEQVR4Xu2TvUoDQRRGr2Bh4Q82EVFMLQSUYCNoIdhoIb6DlUUaGyFVXiAgaiWCWNjZaqEWgo3gMwimUVASGxsR1HOdHZi9s8ZsrAQPHHbZb2Z29t5ZkX/ysoAP+BHYwsfk/gW3cNBP+Il9fMM587wsbtEz7DdZxABe4S2OmEwnX+I7LqajmEls4jH2mmwYbyR7txEr4uqxYQOYxVe8xiGTRWxL9ht14gU+4YzJInwN9K1HuJd4iPd4gON+cDt8fc6xiKOBfcE4RXe4nlwjfH2qNshgCnflm2Og9emote3w5+cOx9JRih5cxVOcNtkXJXzGE4nrEaJ1XBL3+bUwmMeGxP/XWjgooIAT4nZkj0hu9GBqZzM7lgdtyiYuiytJ19RxByviit81Olm7/KtF/gifT5k5dVpTL2EAAAAASUVORK5CYII=>

[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAYCAYAAABnRtT+AAAB9ElEQVR4Xu2VTyhlYRjGn4kR+ZdITUZSNrKYpGzMwkIxRUkWiq2YZqcks7qUBTMLZiOaSRZW7JUsSFmMmmHBgqSZTFaTspXyPN5znO8czp2JW3dzfvXr3Pud95zv/b73vd8FEhISEhL+hxL6jlZ733XtpK/uI7JMEV2gE/ScfqHzdIwe0dogNHt00CH6hl7RJVpGN+lfWh+EPplCPHOx72EJ9tBr+pa+gJVbC9AEc7BdlTM07+5JoJ8e0++02xuLonfN0ilnTG20C3tuG/aOfbrljela4cWGUJkPEXOTfKUrsEl9yukkrGXiaKaXdNkZ66V9sHepanuwBQt9/wzbnBDFdAcPk3BRj24hSEhxw7TRD3iEApqin+gazfUcpaVeTBM9QdBWSnLE+xxCAeo/9WYcagd3pxvoIOIXJdQCrQgvUElWBSF3O6idVHJCC6sJbge4/RhHGz2lr+lLOg4rdxyVsOQU24VwIj5aoH6oarV/kqIHSD+pyvLbu/o7FIcmV8k+wvpvmv7Cw3M32o9pyUf65hfaQU2kPlQCKlscaoUPsKRkO6wK0eMs2o/PRr2onvxB6yL3XFTeFKzcPm4VXPQbeKwNnoyOhA06EL3hoL/Wn/QP7JwV2qVVekPXaQvs+FmkZ/SCfoM9mxF0VOVEBxMSMsgtJzdQsHo9EQYAAAAASUVORK5CYII=>