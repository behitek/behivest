# FAQ Wiki Page — Design Spec

**Date:** 2026-03-27  
**Status:** Approved

## Goal

Tạo trang wiki `/faq` chứa các câu hỏi thường gặp về đầu tư quỹ mở, sắp xếp theo bảng chữ cái A–Z, chia thành 2 nhóm (Cơ bản → Nâng cao). Đồng thời cập nhật trang chủ và menu để tăng khả năng khám phá trang này.

---

## 1. Nội dung FAQ

### Nhóm cơ bản (người mới)
Sắp xếp A–Z, bao gồm:
- Các câu hỏi thực tế: Bắt đầu với bao nhiêu tiền? Khi nào nên bán?
- Thuật ngữ cơ bản: CCQ, NAV, Quỹ cổ phiếu, Quỹ trái phiếu, Quỹ cân bằng, Lãi kép, Đa dạng hóa, Phí mua/bán, Phí quản lý, TER

### Nhóm nâng cao (đã quen đầu tư)
Sắp xếp A–Z, bao gồm:
- Thuật ngữ phân tích: Alpha, Beta, Sharpe Ratio, Sortino Ratio, Drawdown, Volatility
- Chiến lược: DCA, Rebalancing, Tactical Asset Allocation

---

## 2. Trang /faq

**Route:** `src/pages/faq.astro`

**Layout:**
- Hero section: tiêu đề + mô tả ngắn
- Thanh tìm kiếm (client-side, lọc theo từ khóa)
- 2 nhóm Accordion sắp xếp A–Z:
  - 📗 **Kiến thức cơ bản** — mở sẵn mặc định
  - 📘 **Kiến thức nâng cao** — thu gọn mặc định
- Mỗi mục trong accordion: câu hỏi (click mở) → câu trả lời ngắn gọn

**Data source:** File Markdown/MDX riêng tại `src/content/faq/` hoặc hardcode trong file `.astro` nếu nội dung ít thay đổi.  
→ Chọn **Astro Content Collections** (`src/content/faq/`) để dễ thêm/sửa sau này.

**Màu sắc:** Theo design system hiện tại:
- Primary: amber `#f59300`
- Secondary: green `#22c55e`
- Light mode mặc định, hỗ trợ dark mode

---

## 3. Cập nhật Header (Navigation)

**Thay đổi:** Gộp "Blog" và "FAQ" vào dropdown **"Học đầu tư ▾"**

```
Trang chủ | Học đầu tư ▾ | Công cụ | Hiệu suất quỹ | Giới thiệu | Liên hệ
                ├── Blog
                └── Từ điển FAQ
```

- Desktop: hover/click dropdown menu
- Mobile: expand inline trong mobile menu

---

## 4. Cập nhật Trang chủ (index.astro)

Thêm section mới **"Từ điển đầu tư quỹ mở"** (đặt giữa tools section và CTA section):
- Tiêu đề + mô tả
- Grid 3 cột preview ~6 khái niệm nổi bật (hardcode)
- Nút CTA "Xem tất cả từ điển →" trỏ đến `/faq`

---

## 5. Footer

Thêm link "Từ điển FAQ" vào phần footer (nếu có cột navigation).

---

## Out of Scope

- Search toàn site
- Comment / rating cho từng FAQ
- Đa ngôn ngữ
