# FAQ Wiki Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tạo trang `/faq` wiki về đầu tư quỹ mở (A–Z, accordion theo nhóm cơ bản/nâng cao), đồng thời cập nhật Header (dropdown "Học đầu tư") và Trang chủ (section preview FAQ).

**Architecture:** Dùng Astro Content Collections cho FAQ data (`src/content/faq/`), trang `faq.astro` render accordion client-side với search. Header được refactor để hỗ trợ dropdown. Trang chủ thêm 1 section hardcoded preview.

**Tech Stack:** Astro, Tailwind CSS (cùng design system hiện tại — primary amber `#f59300`, secondary green `#22c55e`), Vanilla JS cho accordion/search.

---

## File Structure

| Action | File | Mô tả |
|--------|------|-------|
| Create | `src/content/faq/basic.json` | Nội dung FAQ cơ bản (15 mục A–Z) |
| Create | `src/content/faq/advanced.json` | Nội dung FAQ nâng cao (14 mục A–Z) |
| Update | `src/content/config.ts` | Thêm FAQ collection schema |
| Create | `src/pages/faq.astro` | Trang FAQ chính |
| Modify | `src/components/Header.astro` | Thêm dropdown "Học đầu tư" |
| Modify | `src/components/Footer.astro` | Thêm link "Từ điển FAQ" |
| Modify | `src/pages/index.astro` | Thêm section preview FAQ |

---

## Task 1: Định nghĩa Content Collection cho FAQ

**Files:**
- Modify: `src/content/config.ts` (tạo mới nếu chưa có)

- [ ] **Step 1: Kiểm tra file config hiện tại**

  ```bash
  ls src/content/
  ```

  Nếu chưa có `config.ts`, tạo mới. Nếu đã có, thêm vào.

- [ ] **Step 2: Tạo/cập nhật `src/content/config.ts`**

  ```typescript
  import { defineCollection, z } from 'astro:content';

  const blog = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.string().optional(),
    }),
  });

  const faqItem = z.object({
    term: z.string(),         // Thuật ngữ / câu hỏi ngắn (dùng làm key A-Z)
    question: z.string(),     // Câu hỏi đầy đủ
    answer: z.string(),       // Câu trả lời ngắn gọn
  });

  const faq = defineCollection({
    type: 'data',
    schema: z.object({
      group: z.string(),        // "Kiến thức cơ bản" | "Kiến thức nâng cao"
      groupSlug: z.string(),    // "basic" | "advanced"
      icon: z.string(),         // emoji icon
      order: z.number(),        // thứ tự hiển thị (1 = cơ bản trước)
      items: z.array(faqItem),
    }),
  });

  export const collections = { blog, faq };
  ```

  > **Lưu ý:** Nếu `config.ts` đã tồn tại và có `blog` collection, chỉ thêm phần `faqItem`, `faq`, và merge vào `export const collections`.

- [ ] **Step 3: Commit**

  ```bash
  git add src/content/config.ts
  git commit -m "feat(faq): add FAQ content collection schema"
  ```

---

## Task 2: Tạo dữ liệu FAQ Content

**Files:**
- Create: `src/content/faq/basic.json`
- Create: `src/content/faq/advanced.json`

> Dùng `.json` vì collection type là `data` (không phải `content`).

- [ ] **Step 1: Tạo `src/content/faq/basic.json`**

  ```json
  {
    "group": "Kiến thức cơ bản",
    "groupSlug": "basic",
    "icon": "📗",
    "order": 1,
    "items": [
      {
        "term": "Bắt đầu",
        "question": "Bắt đầu đầu tư quỹ mở cần bao nhiêu tiền?",
        "answer": "Hầu hết các quỹ mở tại Việt Nam cho phép bắt đầu với chỉ 200.000–500.000 đồng. Trên Fmarket, mức tối thiểu phổ biến là 500.000 đồng/lần mua."
      },
      {
        "term": "CCQ",
        "question": "CCQ (Chứng chỉ quỹ) là gì?",
        "answer": "CCQ là đơn vị đầu tư nhỏ nhất của một quỹ mở, tương tự như 1 cổ phiếu. Khi bạn mua CCQ, bạn sở hữu một phần của danh mục đầu tư do công ty quản lý quỹ điều hành."
      },
      {
        "term": "Danh mục",
        "question": "Danh mục đầu tư của quỹ là gì?",
        "answer": "Là tập hợp tất cả các tài sản mà quỹ đang nắm giữ (cổ phiếu, trái phiếu, tiền mặt...). Bạn có thể xem cơ cấu danh mục trong báo cáo định kỳ của quỹ."
      },
      {
        "term": "Đa dạng hóa",
        "question": "Đa dạng hóa danh mục nghĩa là gì?",
        "answer": "Là chiến lược phân bổ vốn vào nhiều loại tài sản khác nhau để giảm rủi ro. 'Không bỏ tất cả trứng vào một rổ.' Quỹ mở giúp bạn tự động đa dạng hóa chỉ với một khoản đầu tư nhỏ."
      },
      {
        "term": "Fmarket",
        "question": "Fmarket là gì?",
        "answer": "Fmarket là sàn phân phối chứng chỉ quỹ trực tuyến lớn nhất Việt Nam, cho phép mua bán CCQ của nhiều công ty quản lý quỹ khác nhau tại một nơi, hoàn toàn miễn phí phí giao dịch."
      },
      {
        "term": "Khi nào bán",
        "question": "Khi nào nên bán (rút) quỹ mở?",
        "answer": "Nên bán khi: (1) đã đạt mục tiêu tài chính, (2) cần tiền mặt cho mục đích cụ thể, hoặc (3) chiến lược đầu tư thay đổi. Không nên bán vì hoảng loạn khi thị trường giảm ngắn hạn."
      },
      {
        "term": "Lãi kép",
        "question": "Lãi kép trong đầu tư quỹ hoạt động thế nào?",
        "answer": "Lợi nhuận từ quỹ được tái đầu tư tự động, tạo ra lợi nhuận trên lợi nhuận theo thời gian. Càng đầu tư dài hạn, hiệu ứng lãi kép càng mạnh — đây là lý do 'thời gian là người bạn của nhà đầu tư'."
      },
      {
        "term": "NAV",
        "question": "NAV (Net Asset Value) là gì?",
        "answer": "NAV là giá trị tài sản ròng của một CCQ, tính bằng: (Tổng tài sản quỹ - Nợ phải trả) ÷ Số CCQ đang lưu hành. NAV được tính và công bố mỗi ngày giao dịch."
      },
      {
        "term": "Phí quản lý",
        "question": "Phí quản lý quỹ là bao nhiêu?",
        "answer": "Phí quản lý thường từ 1–2%/năm tính trên tổng tài sản quỹ, được trích trực tiếp từ NAV (không thu thêm từ nhà đầu tư). Xem phí chính xác trong bản cáo bạch của từng quỹ."
      },
      {
        "term": "Phí mua bán",
        "question": "Phí mua và bán CCQ là bao nhiêu?",
        "answer": "Phí mua thường 0–1%, phí bán (redemption fee) thường 0–2% tùy quỹ và thời gian nắm giữ. Nhiều quỹ miễn phí mua nếu nắm giữ đủ thời gian. Giao dịch qua Fmarket thường không tốn phí nền tảng."
      },
      {
        "term": "Quỹ cân bằng",
        "question": "Quỹ cân bằng (Balanced Fund) là gì?",
        "answer": "Là quỹ đầu tư vào cả cổ phiếu lẫn trái phiếu, thường tỷ lệ 50/50 hoặc 60/40. Rủi ro và lợi nhuận ở mức trung bình, phù hợp nhà đầu tư muốn cân bằng giữa tăng trưởng và ổn định."
      },
      {
        "term": "Quỹ cổ phiếu",
        "question": "Quỹ cổ phiếu (Equity Fund) là gì?",
        "answer": "Là quỹ đầu tư chủ yếu vào cổ phiếu (thường >80%). Tiềm năng lợi nhuận cao hơn nhưng rủi ro cũng cao hơn quỹ trái phiếu. Phù hợp với mục tiêu dài hạn (5+ năm)."
      },
      {
        "term": "Quỹ trái phiếu",
        "question": "Quỹ trái phiếu (Bond Fund) là gì?",
        "answer": "Là quỹ đầu tư chủ yếu vào trái phiếu. Rủi ro thấp hơn quỹ cổ phiếu, lợi nhuận ổn định hơn (thường 6–10%/năm). Phù hợp mục tiêu ngắn đến trung hạn (1–3 năm)."
      },
      {
        "term": "Rủi ro",
        "question": "Đầu tư quỹ mở có rủi ro gì?",
        "answer": "Rủi ro chính: (1) Rủi ro thị trường — NAV có thể giảm khi thị trường xấu; (2) Rủi ro thanh khoản — T+3 đến T+5 mới nhận tiền sau khi bán; (3) Rủi ro quản lý — phụ thuộc năng lực fund manager."
      },
      {
        "term": "TER",
        "question": "TER (Total Expense Ratio) là gì?",
        "answer": "Tỷ lệ chi phí toàn phần — tổng hợp tất cả chi phí vận hành quỹ trong một năm (phí quản lý, phí lưu ký, phí kiểm toán...) tính trên NAV. TER thấp = quỹ hiệu quả chi phí hơn."
      }
    ]
  }
  ```

- [ ] **Step 2: Tạo `src/content/faq/advanced.json`**

  ```json
  {
    "group": "Kiến thức nâng cao",
    "groupSlug": "advanced",
    "icon": "📘",
    "order": 2,
    "items": [
      {
        "term": "Alpha",
        "question": "Alpha trong đánh giá quỹ nghĩa là gì?",
        "answer": "Alpha đo lường lợi nhuận vượt trội của quỹ so với benchmark sau khi điều chỉnh rủi ro. Alpha > 0: fund manager tạo thêm giá trị; Alpha < 0: kém hơn benchmark."
      },
      {
        "term": "Benchmark",
        "question": "Benchmark (chỉ số tham chiếu) là gì?",
        "answer": "Chỉ số dùng để so sánh hiệu suất quỹ. Ví dụ: quỹ cổ phiếu VN thường dùng VN-Index làm benchmark. Nếu quỹ đạt 15%/năm trong khi VN-Index tăng 12%, quỹ đã 'beat the market'."
      },
      {
        "term": "Beta",
        "question": "Beta trong đầu tư là gì?",
        "answer": "Beta đo mức độ biến động của quỹ so với thị trường. Beta = 1: dao động bằng thị trường; Beta > 1: dao động mạnh hơn (rủi ro cao hơn); Beta < 1: dao động ít hơn (ổn định hơn)."
      },
      {
        "term": "DCA",
        "question": "DCA (Dollar-Cost Averaging) là chiến lược gì?",
        "answer": "Đầu tư một khoản cố định định kỳ (ví dụ: 2 triệu/tháng) bất kể NAV cao hay thấp. Khi NAV thấp, mua được nhiều CCQ hơn; khi cao, mua ít hơn. Trung bình giá theo thời gian, giảm rủi ro timing."
      },
      {
        "term": "Drawdown",
        "question": "Maximum Drawdown là gì?",
        "answer": "Mức sụt giảm tối đa từ đỉnh xuống đáy trong một khoảng thời gian. Ví dụ: drawdown -30% nghĩa là NAV từng giảm 30% từ mức cao nhất. Chỉ số này cho thấy rủi ro tệ nhất bạn có thể gặp."
      },
      {
        "term": "Expense Ratio",
        "question": "Expense Ratio khác TER thế nào?",
        "answer": "Về cơ bản tương đương nhau — cả hai đều đo tổng chi phí hàng năm của quỹ. TER là thuật ngữ phổ biến hơn ở châu Âu và Việt Nam, trong khi Expense Ratio thường dùng tại Mỹ."
      },
      {
        "term": "Fund Manager",
        "question": "Fund Manager (Quản lý quỹ) ảnh hưởng thế nào đến hiệu suất?",
        "answer": "Fund manager quyết định danh mục đầu tư và chiến lược. Đối với quỹ chủ động (active), kỹ năng của fund manager ảnh hưởng lớn đến alpha. Đối với quỹ thụ động (passive/ETF), ảnh hưởng ít hơn."
      },
      {
        "term": "Information Ratio",
        "question": "Information Ratio đo lường gì?",
        "answer": "Tỷ lệ lợi nhuận vượt trội so với benchmark chia cho tracking error. IR cao nghĩa là fund manager tạo ra alpha ổn định, không chỉ may mắn ngắn hạn."
      },
      {
        "term": "Quỹ chủ động vs thụ động",
        "question": "Quỹ chủ động (Active) và thụ động (Passive/ETF) khác nhau thế nào?",
        "answer": "Quỹ chủ động: fund manager chọn cổ phiếu với mục tiêu 'beat the market', phí cao hơn (TER ~1.5–2%). Quỹ thụ động/ETF: theo dõi chỉ số (VN30, VNIndex), phí thấp hơn (~0.3–0.8%)."
      },
      {
        "term": "Rebalancing",
        "question": "Rebalancing (Tái cân bằng danh mục) là gì?",
        "answer": "Điều chỉnh lại tỷ trọng các tài sản về mức mục tiêu ban đầu. Ví dụ: nếu ban đầu muốn 70% quỹ cổ phiếu / 30% trái phiếu, nhưng sau 1 năm thành 80/20, cần bán bớt cổ phiếu và mua thêm trái phiếu."
      },
      {
        "term": "Sharpe Ratio",
        "question": "Sharpe Ratio đo lường gì?",
        "answer": "Sharpe Ratio = (Lợi nhuận quỹ - Lãi suất phi rủi ro) ÷ Độ lệch chuẩn. Đo lợi nhuận nhận được trên mỗi đơn vị rủi ro chấp nhận. Sharpe > 1: tốt; > 2: rất tốt. Dùng để so sánh giữa các quỹ."
      },
      {
        "term": "Sortino Ratio",
        "question": "Sortino Ratio khác Sharpe Ratio thế nào?",
        "answer": "Sortino chỉ tính rủi ro downside (biến động âm), trong khi Sharpe tính cả biến động lên lẫn xuống. Sortino phản ánh chính xác hơn rủi ro mà nhà đầu tư thực sự lo ngại (thua lỗ)."
      },
      {
        "term": "Tracking Error",
        "question": "Tracking Error là gì?",
        "answer": "Độ lệch giữa hiệu suất quỹ và benchmark theo thời gian. Với quỹ thụ động (ETF/index fund), tracking error thấp là tốt (bám sát chỉ số). Với quỹ chủ động, tracking error cao có thể là dấu hiệu chiến lược tích cực."
      },
      {
        "term": "Volatility",
        "question": "Volatility (Độ biến động) trong quỹ mở là gì?",
        "answer": "Đo mức độ dao động của NAV theo thời gian, thường tính bằng độ lệch chuẩn của lợi nhuận hàng ngày/hàng tháng. Volatility cao = rủi ro cao hơn nhưng tiềm năng lợi nhuận cũng cao hơn."
      }
    ]
  }
  ```

- [ ] **Step 3: Commit**

  ```bash
  git add src/content/faq/
  git commit -m "feat(faq): add FAQ content data (basic 15 + advanced 14 items)"
  ```

---

## Task 3: Tạo trang faq.astro

**Files:**
- Create: `src/pages/faq.astro`

- [ ] **Step 1: Tạo `src/pages/faq.astro`**

  ```astro
  ---
  import { getCollection } from 'astro:content';
  import Layout from '@layouts/Layout.astro';

  const allFaq = await getCollection('faq');
  const sortedGroups = allFaq.sort((a, b) => a.data.order - b.data.order);
  ---

  <Layout
    title="Từ điển đầu tư quỹ mở A–Z"
    description="Giải đáp từ A–Z các thuật ngữ và câu hỏi thường gặp về đầu tư quỹ mở tại Việt Nam. Chia theo nhóm cơ bản và nâng cao."
  >
    <!-- Hero -->
    <section class="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 py-16 text-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-3xl text-center">
          <div class="mb-4 text-5xl">❓</div>
          <h1 class="text-4xl font-bold md:text-5xl">Từ điển đầu tư quỹ mở</h1>
          <p class="mt-4 text-lg text-primary-100">
            Giải đáp từ A–Z những thuật ngữ và câu hỏi thường gặp khi đầu tư quỹ mở tại Việt Nam
          </p>
        </div>
      </div>
    </section>

    <!-- Search + Content -->
    <section class="py-12">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-3xl">

          <!-- Search bar -->
          <div class="relative mb-8">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <input
              id="faq-search"
              type="text"
              placeholder="Tìm thuật ngữ hoặc câu hỏi..."
              class="w-full rounded-xl border border-gray-200 bg-white py-4 pl-12 pr-4 text-gray-900 shadow-sm transition-all focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-primary-600"
            />
          </div>

          <!-- No results message -->
          <div id="faq-no-results" class="hidden py-12 text-center text-gray-500 dark:text-gray-400">
            <div class="mb-2 text-4xl">🔍</div>
            <p>Không tìm thấy kết quả. Thử từ khóa khác nhé.</p>
          </div>

          <!-- Groups -->
          {sortedGroups.map((group, groupIndex) => (
            <div
              class="faq-group mb-6 overflow-hidden rounded-xl border border-gray-200 shadow-sm dark:border-gray-700"
              data-group={group.data.groupSlug}
            >
              <!-- Group header toggle -->
              <button
                class={`faq-group-toggle w-full px-6 py-4 text-left flex items-center justify-between font-semibold text-white transition-colors ${
                  group.data.groupSlug === 'basic'
                    ? 'bg-primary-500 hover:bg-primary-600'
                    : 'bg-secondary-600 hover:bg-secondary-700'
                }`}
                data-target={`faq-group-body-${groupIndex}`}
                aria-expanded={groupIndex === 0 ? 'true' : 'false'}
              >
                <span class="flex items-center gap-3">
                  <span class="text-xl">{group.data.icon}</span>
                  <span>{group.data.group}</span>
                  <span class="rounded-full bg-white/20 px-3 py-0.5 text-xs font-medium">
                    {group.data.items.length} mục
                  </span>
                </span>
                <svg
                  class={`faq-chevron h-5 w-5 transition-transform duration-200 ${groupIndex === 0 ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              <!-- Group body -->
              <div
                id={`faq-group-body-${groupIndex}`}
                class={`faq-group-body divide-y divide-gray-100 bg-white dark:divide-gray-800 dark:bg-gray-900 ${groupIndex !== 0 ? 'hidden' : ''}`}
              >
                {group.data.items
                  .sort((a, b) => a.term.localeCompare(b.term, 'vi'))
                  .map((item, itemIndex) => (
                    <div
                      class="faq-item"
                      data-term={item.term.toLowerCase()}
                      data-question={item.question.toLowerCase()}
                      data-answer={item.answer.toLowerCase()}
                    >
                      <button
                        class="faq-item-toggle w-full px-6 py-4 text-left"
                        data-target={`faq-answer-${groupIndex}-${itemIndex}`}
                        aria-expanded="false"
                      >
                        <div class="flex items-start justify-between gap-4">
                          <div class="flex items-start gap-3">
                            <span class={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                              group.data.groupSlug === 'basic' ? 'bg-primary-500' : 'bg-secondary-600'
                            }`}>
                              {item.term.charAt(0).toLocaleUpperCase('vi')}
                            </span>
                            <div>
                              <span class={`text-xs font-medium ${
                                group.data.groupSlug === 'basic'
                                  ? 'text-primary-600 dark:text-primary-400'
                                  : 'text-secondary-600 dark:text-secondary-400'
                              }`}>
                                {item.term}
                              </span>
                              <p class="mt-0.5 font-medium text-gray-900 dark:text-white">{item.question}</p>
                            </div>
                          </div>
                          <svg
                            class="faq-chevron mt-1 h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                          >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                          </svg>
                        </div>
                      </button>
                      <div
                        id={`faq-answer-${groupIndex}-${itemIndex}`}
                        class="faq-answer hidden px-6 pb-5 pl-[3.75rem]"
                      >
                        <p class="text-gray-600 dark:text-gray-300">{item.answer}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>

  <script>
    // Group accordion toggle
    document.querySelectorAll('.faq-group-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = (btn as HTMLElement).dataset.target!;
        const body = document.getElementById(targetId)!;
        const chevron = btn.querySelector('.faq-chevron')!;
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', (!isOpen).toString());
        body.classList.toggle('hidden', isOpen);
        chevron.classList.toggle('rotate-180', !isOpen);
      });
    });

    // Item accordion toggle
    document.querySelectorAll('.faq-item-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = (btn as HTMLElement).dataset.target!;
        const answer = document.getElementById(targetId)!;
        const chevron = btn.querySelector('.faq-chevron')!;
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', (!isOpen).toString());
        answer.classList.toggle('hidden', isOpen);
        chevron.classList.toggle('rotate-180', !isOpen);
      });
    });

    // Client-side search
    const searchInput = document.getElementById('faq-search') as HTMLInputElement;
    const noResults = document.getElementById('faq-no-results')!;

    searchInput?.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      let visibleCount = 0;

      document.querySelectorAll<HTMLElement>('.faq-group').forEach(group => {
        const items = group.querySelectorAll<HTMLElement>('.faq-item');
        let groupVisible = 0;

        items.forEach(item => {
          const term = item.dataset.term ?? '';
          const question = item.dataset.question ?? '';
          const answer = item.dataset.answer ?? '';
          const match = !query || term.includes(query) || question.includes(query) || answer.includes(query);
          item.style.display = match ? '' : 'none';
          if (match) groupVisible++;
        });

        group.style.display = groupVisible > 0 ? '' : 'none';

        // Auto-open groups with matches during search
        if (query && groupVisible > 0) {
          const body = group.querySelector<HTMLElement>('.faq-group-body');
          body?.classList.remove('hidden');
        }

        visibleCount += groupVisible;
      });

      noResults.classList.toggle('hidden', visibleCount > 0 || !query);
    });
  </script>
  ```

- [ ] **Step 2: Kiểm tra build thành công**

  ```bash
  npm run build 2>&1 | tail -20
  ```

  Expected: không có lỗi TypeScript hay build error.

- [ ] **Step 3: Commit**

  ```bash
  git add src/pages/faq.astro
  git commit -m "feat(faq): add FAQ wiki page with accordion groups and search"
  ```

---

## Task 4: Cập nhật Header — Dropdown "Học đầu tư"

**Files:**
- Modify: `src/components/Header.astro`

- [ ] **Step 1: Thêm biến `isLearnActive` vào frontmatter**

  Sau dòng `const currentPath = Astro.url.pathname;` (dòng 4), thêm:

  ```astro
  const isLearnActive =
    currentPath.startsWith('/blog') ||
    currentPath.startsWith(`${import.meta.env.BASE_URL}blog`) ||
    currentPath === '/faq' ||
    currentPath === `${import.meta.env.BASE_URL}faq`;
  ```

- [ ] **Step 2: Thay link Blog trong Desktop menu bằng dropdown**

  Tìm và thay thế toàn bộ khối `<a href={...blog...}>Blog</a>` trong desktop menu (dòng 62–72) bằng:

  ```astro
  <!-- Dropdown: Học đầu tư -->
  <div class="relative" id="learn-dropdown-wrapper">
    <button
      id="learn-dropdown-btn"
      type="button"
      class={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
        isLearnActive
          ? 'text-primary-600 dark:text-primary-400'
          : 'text-gray-700 dark:text-gray-300'
      }`}
      aria-expanded="false"
      aria-haspopup="true"
    >
      Học đầu tư
      <svg class="h-4 w-4 transition-transform duration-200" id="learn-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
    <div
      id="learn-dropdown-menu"
      class="absolute left-0 top-full z-50 mt-2 hidden w-44 rounded-xl border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-900"
    >
      <a
        href={`${import.meta.env.BASE_URL}blog`}
        class="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-primary-400"
      >
        📝 Blog
      </a>
      <a
        href={`${import.meta.env.BASE_URL}faq`}
        class="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-primary-400"
      >
        ❓ Từ điển FAQ
      </a>
    </div>
  </div>
  ```

- [ ] **Step 3: Thay link Blog trong Mobile menu**

  Tìm khối link Blog trong mobile menu (dòng 132–137) và thay bằng 2 link riêng:

  ```astro
  <a
    href={`${import.meta.env.BASE_URL}blog`}
    class="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
  >
    📝 Blog
  </a>
  <a
    href={`${import.meta.env.BASE_URL}faq`}
    class="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
  >
    ❓ Từ điển FAQ
  </a>
  ```

- [ ] **Step 4: Thêm JS dropdown vào `<script>` block**

  Trong `<script>` block cuối file, thêm sau code mobile menu toggle:

  ```javascript
  // Dropdown: Học đầu tư
  const learnBtn = document.getElementById('learn-dropdown-btn');
  const learnMenu = document.getElementById('learn-dropdown-menu');
  const learnChevron = document.getElementById('learn-chevron');

  learnBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = learnBtn.getAttribute('aria-expanded') === 'true';
    learnBtn.setAttribute('aria-expanded', (!isOpen).toString());
    learnMenu?.classList.toggle('hidden', isOpen);
    learnChevron?.classList.toggle('rotate-180', !isOpen);
  });

  document.addEventListener('click', () => {
    learnBtn?.setAttribute('aria-expanded', 'false');
    learnMenu?.classList.add('hidden');
    learnChevron?.classList.remove('rotate-180');
  });
  ```

- [ ] **Step 5: Build và kiểm tra**

  ```bash
  npm run build 2>&1 | tail -20
  ```

- [ ] **Step 6: Commit**

  ```bash
  git add src/components/Header.astro
  git commit -m "feat(faq): update header with Học đầu tư dropdown"
  ```

---

## Task 5: Thêm section FAQ Preview vào Trang chủ

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Chèn section FAQ Preview**

  Trong `index.astro`, thêm section mới **sau** `<!-- Tools Section -->` (sau thẻ đóng `</section>` của Tools, trước `<!-- CTA Section -->`):

  ```astro
  <!-- FAQ Preview Section -->
  <section class="py-16">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-10 text-center">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          Từ điển đầu tư quỹ mở
        </h2>
        <p class="mt-4 text-gray-600 dark:text-gray-300">
          Giải đáp từ A–Z những thuật ngữ và câu hỏi bạn cần biết
        </p>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { term: 'CCQ', question: 'Chứng chỉ quỹ là gì?' },
          { term: 'NAV', question: 'Giá trị tài sản ròng tính thế nào?' },
          { term: 'Phí quản lý', question: 'Mỗi năm mất bao nhiêu %?' },
          { term: 'DCA', question: 'Đầu tư định kỳ hiệu quả thật sự?' },
          { term: 'Sharpe Ratio', question: 'Quỹ nào hiệu quả hơn sau rủi ro?' },
          { term: 'Drawdown', question: 'Mức sụt giảm tối đa là gì?' },
        ].map(({ term, question }) => (
          <a
            href={`${import.meta.env.BASE_URL}faq`}
            class="card group flex items-start gap-4 transition-all hover:border-primary-300 hover:shadow-md dark:hover:border-primary-700"
          >
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
              {term.charAt(0)}
            </div>
            <div>
              <div class="text-xs font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400">{term}</div>
              <p class="mt-0.5 text-sm font-medium text-gray-800 group-hover:text-primary-600 dark:text-gray-200 dark:group-hover:text-primary-400">{question}</p>
            </div>
          </a>
        ))}
      </div>

      <div class="mt-10 text-center">
        <a href={`${import.meta.env.BASE_URL}faq`} class="btn-secondary">
          Xem tất cả từ điển A–Z →
        </a>
      </div>
    </div>
  </section>
  ```

- [ ] **Step 2: Build và kiểm tra**

  ```bash
  npm run build 2>&1 | tail -20
  ```

- [ ] **Step 3: Commit**

  ```bash
  git add src/pages/index.astro
  git commit -m "feat(faq): add FAQ preview section to homepage"
  ```

---

## Task 6: Cập nhật Footer

**Files:**
- Modify: `src/components/Footer.astro`

- [ ] **Step 1: Thêm link vào cột "Liên kết"**

  Trong cột "Liên kết" (Quick Links), thêm sau `<li>Blog</li>`:

  ```astro
  <li>
    <a
      href={`${import.meta.env.BASE_URL}faq`}
      class="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
    >
      Từ điển FAQ
    </a>
  </li>
  ```

- [ ] **Step 2: Commit**

  ```bash
  git add src/components/Footer.astro
  git commit -m "feat(faq): add FAQ link to footer"
  ```

---

## Task 7: Kiểm tra toàn bộ

- [ ] **Step 1: Chạy dev server**

  ```bash
  npm run dev
  ```

  Checklist thủ công:
  - [ ] `/faq` hiển thị đúng, hero amber gradient, 2 nhóm accordion
  - [ ] Nhóm "Cơ bản" mở sẵn, "Nâng cao" thu gọn bởi mặc định
  - [ ] Click tiêu đề nhóm → mở/đóng đúng
  - [ ] Click từng mục → hiện câu trả lời, chevron xoay
  - [ ] Gõ "NAV" vào ô tìm kiếm → chỉ hiện mục NAV
  - [ ] Gõ "xyz123" → hiện thông báo "Không tìm thấy kết quả"
  - [ ] Desktop header → click "Học đầu tư" → dropdown xuất hiện; click ngoài → đóng
  - [ ] Mobile header → mở menu → thấy cả "📝 Blog" và "❓ Từ điển FAQ"
  - [ ] Trang chủ → section FAQ preview hiển thị đúng, click card → đến `/faq`
  - [ ] Footer → link "Từ điển FAQ" trỏ đúng `/faq`

- [ ] **Step 2: Production build**

  ```bash
  npm run build && npm run preview
  ```

  Expected: build thành công, không có lỗi TypeScript.

- [ ] **Step 3: Commit tổng kết**

  ```bash
  git add -A
  git commit -m "feat(faq): complete FAQ wiki page — all tasks done"
  ```
