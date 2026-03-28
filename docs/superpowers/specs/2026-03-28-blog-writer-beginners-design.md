# Design Spec: 20 Beginner-Focused Mutual Fund Blog Posts

## Mục tiêu (Objective)
Tạo ra 20 bài viết blog chuẩn SEO nhằm giúp "người mới" (đặc biệt là Sinh viên IT/Lập trình viên) vượt qua rào cản tâm lý khi tiếp cận đầu tư chứng chỉ quỹ. 

## Nguyên tắc cốt lõi (Core Principles)
1. **Focus vào Lỗ Hổng Tâm Lý (Beginner Anxieties):** Giải quyết các nỗi sợ điển hình: Sợ lừa đảo, Sợ giam vốn, Rối não vì thuật ngữ, Sợ đu đỉnh.
2. **Ngôn ngữ Lập Trình Viên (IT/Dev Analogies):** Sử dụng các khái niệm quen thuộc trong ngành IT (Open Source, Malware, Backup, Server Crash, Unit Test, Cron Job, Tech Debt) để giải thích tài chính.
3. **CTA Xuyên Suốt:** Mọi bài viết đều phải liên kết (cross-link) về bài viết "hub" chính yếu là `/blog/fmarket` và dẫn dắt người dùng thực hiện hành động tải app qua link Affiliate.
4. **Data Visualization:** Ít nhất 2-3 chart (Python/Matplotlib) với số liệu thật để chứng minh toán học (đều đặn, không bị cảm xúc chi phối).

## Danh sách 20 chủ đề (The Content Plan)

### Nhóm 1: Nỗi lo "Bị Lừa" & An toàn vốn (Trust & Scams)
1. Quỹ mở có lừa đảo không? Phân biệt Fmarket và các "app rác" đa cấp.
2. Nhỡ VinaCapital, Dragon Capital phá sản thì sao? Dữ liệu "tiền" của bạn lưu ở đâu?
3. Thị trường chứng khoán "sập": Đầu tư quỹ mở có bị cháy sạch tài khoản không?
4. VESAF, DCDS là ai mà tôi phải giao tiền mồ hôi nước mắt cho họ?
5. Đọc bảng phí quỹ trên Fmarket sao cho không bị hớ?

### Nhóm 2: Nỗi lo "Giam vốn" & Cầm cự (Liquidity & Cashflow)
6. Bán chứng chỉ quỹ rút tiền về bank mất bao lâu? (Test quy trình T+2.5 trên Fmarket).
7. Đang dồn tiền mua Macbook, có nên dừng lệnh đầu tư quỹ mở giữa chừng?
8. Chỉ có dư 500k đến 1 triệu/tháng, mua quỹ mở có "bõ dính răng" không?
9. Quỹ Cổ Phiếu vs Quỹ Trái Phiếu: Dev mới nên chọn "Tech stack" nào?
10. Quỹ mở vs Gửi Tiết kiệm qua App Ngân Hàng: Gửi ở đâu ngon hơn?

### Nhóm 3: Nỗi lo "Rối Não" & Không biết bắt đầu
11. Từ điển Quỹ Mở cho dân IT: NAV, SIP, T+2 dịch sang ngôn ngữ dev là gì?
12. Hướng dẫn UX/UI mua quỹ trên Fmarket: Setup trong 5 phút.
13. Fmarket có hơn 50+ quỹ: Trải chiếu mới thì nhắm mắt chọn quỹ nào?
14. Bận Code SML: Tính năng Đầu tư tự động (SIP) cứu rỗi bạn ra sao?
15. Hồ sơ rủi ro là gì? Tại sao app lại "cấm" tôi mua quỹ cổ phiếu?

### Nhóm 4: Nỗi lo "Đu Đỉnh" & Áp lực lợi nhuận
16. "Tôi mua DCDS nay mở app báo âm 5%" - Hướng dẫn sơ cứu tâm lý gồng lỗ.
17. Tại sao đồng nghiệp mua VESAF lãi 15%, mình mua lại đang lỗ?
18. Mua một cục (Lump sum) hay chia nhỏ DCA: Toán học chi phối thế nào?
19. Kỳ vọng lợi nhuận quỹ cổ phiếu 1 năm là bao nhiêu? (Đập tan ảo tưởng x5).
20. Tại sao 90% "người mới" xóa app Fmarket sau 6 tháng? (Technical Debt tâm lý).

## Triển khai (Implementation Flow)
Được định hướng sẽ dùng qua kỹ năng `blog-writer` và xuất bản theo tiêu chuẩn của repository Behivest:
1. Tạo thư mục/kịch bản Python cho biểu đồ sinh ảnh minh họa thực tế.
2. Viết nội dung file `.mdx` tập trung cao độ, dùng emoji và các thành phần định dạng Markdown chuẩn xác.
3. Trỏ Call To Action (điều hướng) về bài Review Fmarket (`/blog/fmarket`) ở mọi bài viết ở những vị trí chiến lược (sau phần trình bày số liệu hoặc cuối bài).
