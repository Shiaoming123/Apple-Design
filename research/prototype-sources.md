# 桌面 Web 前端案例原型来源调研

核对日期：2026-09-12（Asia/Shanghai）

范围：商品详情与购买流程、数据分析/运营仪表盘、内容编辑器/CMS；手机日程规划器作为项目原创补充场景

来源边界：只采用项目所属组织的 GitHub 仓库、仓库内 LICENSE/README/源码，以及项目官方 Demo 或文档。

> 本文是工程选型记录，不是法律意见。仓库许可证通常覆盖仓库代码，不当然覆盖在线 Demo 中的商品照片、头像、品牌、商标、字体或第三方服务内容；真正纳入本仓库前仍需保存许可证和版权声明，并对所用资源逐项复核。

## 结论摘要

三类桌面场景都有可用的现成开源原型。手机场景只需要验证任务层级与交互状态，因此采用内置 Easy Wireframe 手机模板制作原创流程，不引入另一套应用依赖。

### 本仓库落地决策

下表的“直接复用”表示上游在许可证、页面完整度和可运行性上可作为原型母版，不表示本仓库已经复制其应用代码。Apple-Design 是可独立安装的轻量 Skill；直接打包 Spree 后端、shadcn 页面依赖和 Puck React 依赖会显著扩大安装面，还需逐项处理第三方资产与传递依赖许可。因此首批实现固定这些原型的任务结构与版本，使用虚构数据和项目自制 HTML/CSS/JavaScript 生成本地 Before，再以同数据生成 After。上游完整应用仍通过下列仓库和 Demo 直接查阅，不随 Skill 再分发。

| 场景 | 首选原型 | 结论 | 为什么适合做前后对比 |
| --- | --- | --- | --- |
| 商品详情与购买 | [Spree Storefront](https://github.com/spree/storefront) | **直接复用** | 官方 Demo 与 商品详情、购物车和单页结账；源码允许修改，流程完整 |
| 数据分析/运营仪表盘 | [shadcn/ui `dashboard-01`](https://ui.shadcn.com/blocks) | **直接复用** | 官方把它作为可复制的页面 block，包含侧栏、指标卡、趋势图和数据表，示例数据可控 |
| 内容编辑器/CMS | [Puck](https://github.com/puckeditor/puck) | **直接复用** | 官方 Demo 和最小 React 接入同时存在；三栏页面编排、拖放、属性编辑和发布动作足够形成完整案例 |

推荐的实施边界：固定各上游版本，保留许可证；用虚构数据和自有/生成占位图替换外部 Demo 资源；先保存未经 Apple-Design 重构的 baseline，再在相同数据、相同视口、相同任务路径下重构并截图。

## 判断口径

- **直接复用**：当前许可证宽松，官方已有可运行且适合截图的页面，按官方方式启动后即可成为 baseline；仍允许做必要的本地配置、固定数据与资源替换。
- **仅作参考**：流程或页面有研究价值，但本地启动依赖外部后台/账号，或抽取成本、维护风险、第三方授权复核成本不适合首批案例。不会复制其代码和资产。
- **不采用**：当前授权或工程边界不适合作为本仓库首批可再分发案例，即使界面本身有参考价值。

“复用成本”是针对本仓库制作可重复 before/after 截图的工程判断，不等于原项目自身质量评价。

## 1. 商品详情与购买流程

### 首选：Spree Storefront — 直接复用

**事实**

- 官方仓库：[spree/storefront](https://github.com/spree/storefront)，本次核对快照为 [`2ad6ad5bd1bc`](https://github.com/spree/storefront/tree/2ad6ad5bd1bc)；根目录 [LICENSE](https://github.com/spree/storefront/blob/main/LICENSE) 为 MIT。
- 官方 [README](https://github.com/spree/storefront/blob/main/README.md) 将其描述为基于 Next.js 16、React 19、TypeScript、Tailwind CSS 4 和 Spree SDK/REST API 的 production-ready storefront，并列出商品目录、商品详情、购物车、单页结账、账户和订单能力。
- 官方 Demo 可直接访问：[商品详情](https://demo.spreecommerce.org/us/en/products/digital-air-fryer-6l)、[购物车](https://demo.spreecommerce.org/us/en/cart)；2026-09-12 的 HTTP 读取均返回 200。商品详情当前包含图片画廊、库存、价格、规格、加入购物车、描述与属性，适合桌面截图。
- 官方 [Quickstart](https://spreecommerce.org/docs/developer/storefront/nextjs/quickstart) 和 README 说明：本地运行前端需要 Spree 5.4+ 后台及 `SPREE_API_URL`、`SPREE_PUBLISHABLE_KEY`；`create-spree-app` 可同时建立后台和 storefront。

**判断**

- 结论：**直接复用，首选**。
- 复用成本：**中等**。优点是“发现商品 → 查看详情 → 选择/加入购物车 → 结账”路径齐全；代价是不能只启动一个静态前端，需配套 Spree API。
- 截图策略：以商品详情为主截图，以购物车/结账为交互证据；固定一个测试商品和库存，禁用真实支付，仅使用测试流程。
- 风险：MIT 代码可改不代表 Demo 商品图或 Spree 商标可以随案例再分发。应替换品牌、商品照片和文案，并随衍生代码保留 MIT 声明。

### 备选：Vendure Next.js Storefront Starter — 直接复用

**事实**

- 官方仓库：[vendurehq/nextjs-starter-vendure](https://github.com/vendurehq/nextjs-starter-vendure)，快照 [`7d06ae00e096`](https://github.com/vendurehq/nextjs-starter-vendure/tree/7d06ae00e096)，[LICENSE](https://github.com/vendurehq/nextjs-starter-vendure/blob/main/LICENSE) 为 MIT。
- 官方 [README](https://github.com/vendurehq/nextjs-starter-vendure/blob/main/README.md) 和 [package.json](https://github.com/vendurehq/nextjs-starter-vendure/blob/main/package.json) 显示主要栈为 Next.js 16、React 19、TypeScript、Tailwind CSS 4、GraphQL/gql.tada、next-intl，并列出商品详情、变体与图库、购物车、多步骤结账、账户和订单页。
- 官方 Demo：[商品详情](https://next.vendure.io/en/product/guardian-lion-statue)、[购物车](https://next.vendure.io/en/cart)；2026-09-12 的 HTTP 读取均返回 200。
- README 明确本地运行需要可访问的 Vendure Shop API 及环境配置。

**判断**

- 结论：**直接复用，备选**。
- 复用成本：**中等**。与 Spree 相同，购买流程完整但必须接后台；其多步骤结账很适合后续单独比较“步骤感、错误恢复和返回修改”。
- 首批只选一个电商原型即可，避免为了同一设计问题维护两套 commerce 后台。Spree 的单页结账更适合作为第一轮紧凑案例，Vendure 留作多步骤流程扩展。

### Vercel Commerce — 仅作参考

**事实**

- 官方仓库：[vercel/commerce](https://github.com/vercel/commerce)，快照 [`3761e52e60df`](https://github.com/vercel/commerce/tree/3761e52e60df)，[license.md](https://github.com/vercel/commerce/blob/main/license.md) 为 MIT。
- 官方 [README](https://github.com/vercel/commerce/blob/main/README.md) 和 [package.json](https://github.com/vercel/commerce/blob/main/package.json) 显示其为 Next.js App Router、React 19、TypeScript、Tailwind CSS 4 应用，使用 Server Components、Server Actions、Suspense 与 optimistic UI。
- 官方 Demo：[目录](https://demo.vercel.store)、[商品详情](https://demo.vercel.store/product/acme-geometric-circles-t-shirt)。商品页具备画廊、颜色/尺码选择、价格、加入购物车和关联商品；[对应源码](https://github.com/vercel/commerce/blob/main/app/product/%5Bhandle%5D/page.tsx) 清楚分离 gallery 与 description。
- README 明确 Vercel 只主动维护 Shopify provider，本地运行需要 Shopify 环境变量和店铺数据。

**判断**

- 结论：**仅作参考**。
- 其商品详情层级很干净，适合研究“媒体—选项—购买动作”的关系；但 Shopify 凭据与外部店铺数据会增加可重复截图和离线验收成本，不如 Spree/Vendure 适合完整购买流程基线。

### Saleor Storefront — 不采用当前主分支代码

**事实**

- 官方仓库：[saleor/storefront](https://github.com/saleor/storefront)，快照 [`a2013699703c`](https://github.com/saleor/storefront/tree/a2013699703c)。
- 当前根目录 [LICENSE](https://github.com/saleor/storefront/blob/main/LICENSE) 不是 MIT/BSD/Apache-2.0，而是 `FSL-1.1-ALv2`：许可文本排除 competing use，并为每个版本设置发布两周年后的 Apache-2.0 future license。
- 官方 [Demo 商品页](https://storefront.saleor.io/en/default/products/blue-plimsolls) 展示完整规格、配送/退货、图片画廊、变体和加入购物袋，确实具有设计参考价值。

**判断**

- 结论：**不采用当前主分支代码**。本仓库目标是可公开复制、修改、再分发的示例，没必要为首批案例引入 FSL 的使用范围与版本生效日期判断。
- 可只观察公开 Demo 的信息层级；不要复制当前主分支代码、照片或品牌资产。

## 2. 数据分析 / 运营仪表盘

### 首选：shadcn/ui `dashboard-01` — 直接复用

**事实**

- 官方仓库：[shadcn-ui/ui](https://github.com/shadcn-ui/ui)，快照 [`3ba91b1cc83e`](https://github.com/shadcn-ui/ui/tree/3ba91b1cc83e)，[LICENSE.md](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md) 为 MIT。
- 官方 [Blocks 页面](https://ui.shadcn.com/blocks) 将 `dashboard-01` 描述为“sidebar, charts and data table”，直接提供预览、源码、文件清单与 `npx shadcn add dashboard-01`；页面级源文件位于 [`dashboard-01/page.tsx`](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/bases/base/blocks/dashboard-01/page.tsx)。
- 官方 registry 声明该 block 使用 React/TypeScript、shadcn 组件、TanStack Table、Zod、dnd-kit，并由图表组件使用 Recharts；官方 [Chart 文档](https://ui.shadcn.com/docs/components/chart) 也明确其 chart 基于 Recharts。
- 现成页面包含可折叠侧栏、页头、指标卡、交互趋势图、标签、可拖动数据表和详情 sheet，静态 `data.json` 可使截图结果稳定。

**判断**

- 结论：**直接复用，首选**。
- 复用成本：**低到中等**。它本来就是按页面复制的 block，无外部数据或账户前置条件；主要成本是安装其声明的组件依赖。
- 它适合做“视觉不错但运营决策关系仍泛化”的 before：Apple-Design 重构时不应只换色，而应补足时间范围、指标定义、异常/目标、筛选归属、数据新鲜度、加载/空/部分失败和下钻路径。
- 风险：示例数据本身不是业务模型。重构前先固定一个虚构运营语境和指标口径，否则前后只会成为不同风格的 dashboard。

### Tremor Dashboard OSS — 仅作参考

**事实**

- 官方仓库：[tremorlabs/template-dashboard-oss](https://github.com/tremorlabs/template-dashboard-oss)，快照 [`a20f619680e4`](https://github.com/tremorlabs/template-dashboard-oss/tree/a20f619680e4)，[LICENSE.md](https://github.com/tremorlabs/template-dashboard-oss/blob/main/LICENSE.md) 为 Apache-2.0。
- 官方 [README](https://github.com/tremorlabs/template-dashboard-oss/blob/main/README.md) 和 [package.json](https://github.com/tremorlabs/template-dashboard-oss/blob/main/package.json) 显示它使用 Next.js 14、React 18、TypeScript、Tailwind、Tremor Raw、Radix 和 Recharts，提供 SaaS overview 模板。
- README 指向 [OSS Preview](https://dashboard-oss.tremor.so/overview) 与 [Full Preview](https://dashboard.tremor.so/overview)。本次核对时 Full Preview 可访问，但 OSS Preview 的 HTTPS/HTTP 探测失败；最近快照提交时间也早于其它首选候选。

**判断**

- 结论：**仅作参考**。
- 其日期范围、KPI、成本/容量等运营语义比通用组件演示更真实；但 OSS 预览当前不可稳定访问，且栈版本较旧，不应优先于仍在更新、页面代码可直接获取的 `dashboard-01`。

### Tabler — 仅作参考，不复制捆绑图表

**事实**

- 官方仓库：[tabler/tabler](https://github.com/tabler/tabler)，快照 [`ede09742feef`](https://github.com/tabler/tabler/tree/ede09742feef)，项目 [LICENSE](https://github.com/tabler/tabler/blob/dev/LICENSE) 为 MIT。
- 官方 [README](https://github.com/tabler/tabler/blob/dev/README.md) 说明它是 Bootstrap 5、HTML/CSS/Sass/TypeScript dashboard kit，官方 [Preview](https://preview.tabler.io/) 有 120+ demo pages；当前首页包含销售 KPI、趋势、流量、位置、任务和发票，适合观察高密度布局。
- 同一 README 的 License 段明确：`dist/libs` 中第三方库保留各自许可证；ApexCharts 从 v5 起不再是 MIT，超过其社区许可阈值或需要 redistribution 时有额外授权要求。

**判断**

- 结论：**仅作参考**。
- 不复制 `dist/libs` 或基于 ApexCharts 的 demo 图表，避免把“Tabler 本体 MIT”误写成“整个分发包均为 MIT”。若未来只复用不含第三方插件的 HTML/CSS 组件，仍需重新做依赖级许可证清单。

### Ant Design Pro — 不作为首批案例

**事实**

- 官方仓库：[ant-design/ant-design-pro](https://github.com/ant-design/ant-design-pro)，快照 [`adfd44085738`](https://github.com/ant-design/ant-design-pro/tree/adfd44085738)，[LICENSE](https://github.com/ant-design/ant-design-pro/blob/master/LICENSE) 为 MIT。
- 官方 [README](https://github.com/ant-design/ant-design-pro/blob/master/README.md) 将其定义为企业应用 React boilerplate，当前栈包括 React 19、Umi Max 4、Ant Design 6、Tailwind 4，并内置 Analysis、Monitor、Workplace、表单、列表、profile、账户和 AI Assistant 等大量模板；官方 [Preview](https://preview.pro.ant.design/dashboard/analysis/) 可直接截图。

**判断**

- 结论：**不作为首批案例**，原因是工程范围而非许可证。
- 它适合真实企业后台，但对单一 dashboard before/after 来说抽取和升级面过大，也容易把案例变成 Ant Design Pro 的整体换肤。等需要“平台级导航 + 多页工作流”案例时再采用。

## 3. 内容编辑器 / CMS

### 首选：Puck — 直接复用

**事实**

- 官方仓库：[puckeditor/puck](https://github.com/puckeditor/puck)，快照 [`b0d5b49fa190`](https://github.com/puckeditor/puck/tree/b0d5b49fa190)，[LICENSE](https://github.com/puckeditor/puck/blob/main/LICENSE) 为 MIT。
- 官方 [README](https://github.com/puckeditor/puck/blob/main/README.md) 将 Puck 定义为 React 的模块化、开源可视化编辑器，并提供 [在线编辑 Demo](https://demo.puckeditor.com/edit)、动图、最小 `Puck`/`Render` 示例以及 Next.js、React Router recipes。
- 官方 [`@puckeditor/core` package.json](https://github.com/puckeditor/puck/blob/main/packages/core/package.json) 显示核心包支持 React 18/19，包含 dnd-kit、Radix Popover、TanStack Virtual、Tiptap、Zustand 等依赖；2026-09-12 对官方 Demo 的 HTTP 读取返回 200。
- Demo 已具备适合截图的三栏结构：组件/大纲、中央画布、属性检查器，以及预览/发布动作。最小示例把数据保存责任明确留给宿主应用的 `onPublish` 回调。

**判断**

- 结论：**直接复用，首选**。
- 复用成本：**低到中等**。作为一个 React 组件接入比完整 CMS 简洁，且编辑器状态足够丰富，可以集中展示导航层级、选择状态、拖放反馈、属性校验、预览和发布确认。
- 边界：Puck 是 visual editor，不是带数据库、权限、版本历史的完整 CMS。首批案例只做“页面编排与发布”前端原型；数据保存在本地 fixture 或内存，不声称生产持久化。
- 资源风险：替换 Demo 品牌、图片和示例内容；保留 MIT 声明并单独记录新增素材来源。

### Payload Website Template — 仅作参考

**事实**

- 官方仓库：[payloadcms/payload](https://github.com/payloadcms/payload)，快照 [`06f05f7db3db`](https://github.com/payloadcms/payload/tree/06f05f7db3db)，根目录 [LICENSE.md](https://github.com/payloadcms/payload/blob/main/LICENSE.md) 为 MIT。
- 官方 [Website Template README](https://github.com/payloadcms/payload/blob/main/templates/website/README.md) 明确提供完整 backend、admin panel、页面/文章/媒体集合、区块布局、草稿、live preview、按需 revalidation、SEO、搜索和定时发布。
- 官方 [Admin 文档](https://payloadcms.com/docs/admin/overview) 与 [Rich Text 文档](https://payloadcms.com/docs/rich-text/overview) 展示其管理界面和 Lexical 编辑能力；[template package.json](https://github.com/payloadcms/payload/blob/main/templates/website/package.json) 显示主要栈为 Next.js、React、TypeScript、Payload、Lexical rich text 和 Tailwind。
- Template 需要环境变量、数据库、首次创建管理员和登录；当前模板还要求 Node 24.15+。

**判断**

- 结论：**仅作参考**。
- Payload 是研究“草稿—预览—发布、权限、版本、媒体与内容模型”的最好候选之一，但为一组 README 截图运行整套 CMS 成本过高。先从中提炼工作流和失败/恢复状态，不复制完整后台。

### Decap CMS — 仅作参考，适合后续 Git 内容案例

**事实**

- 官方仓库：[decaporg/decap-cms](https://github.com/decaporg/decap-cms)，快照 [`97f788a185c8`](https://github.com/decaporg/decap-cms/tree/97f788a185c8)，[LICENSE](https://github.com/decaporg/decap-cms/blob/main/LICENSE) 为 MIT。
- 官方 [README](https://github.com/decaporg/decap-cms/blob/main/README.md) 将其描述为静态站点生成器使用的 Git-based CMS：`/admin` 单页应用、YAML 内容模型、登录后编辑 Git 仓库内容；官方 [Quick Start](https://www.decapcms.org/docs/quick-start/) 支持单 HTML + 配置文件的 CDN 接入。

**判断**

- 结论：**仅作参考**。
- 它比 Puck 更接近真实内容库，但可靠演示需要 Git backend/auth 或本地代理配置，首批截图的可重复性较差。后续若增加“Git 内容审阅与提交”场景，可单独采用。

### Novel — 不作为首批案例

**事实**

- 官方仓库：[steven-tey/novel](https://github.com/steven-tey/novel)，快照 [`fa95098e6647`](https://github.com/steven-tey/novel/tree/fa95098e6647)，[LICENSE](https://github.com/steven-tey/novel/blob/main/LICENSE) 为 Apache-2.0。
- 官方 [README](https://github.com/steven-tey/novel/blob/main/README.md) 将其定义为 Notion 风格 WYSIWYG 编辑器，使用 Next.js、Tiptap、OpenAI/Vercel AI SDK 和 Tailwind；完整 web app 本地配置需要 OpenAI key 与 Vercel Blob token。
- 官方仓库不是 archived，但本次核对的默认分支最近提交为 2025-01-18，明显早于其它首选候选。

**判断**

- 结论：**不作为首批案例**，原因是维护与外部服务成本，而非 Apache-2.0 许可证。
- 若以后只需要“长文 WYSIWYG + slash command”案例，可以重新评估其 headless package；当前 Puck 的维护活跃度、可视化页面编排和无后端最小接入更匹配本项目。

## 建议的首批案例合同

### A. 商品详情与购买

- Baseline：Spree Storefront 固定版本、固定商品与测试库存。
- 主任务：查看关键信息 → 选择规格 → 加入购物车 → 确认订单条件。
- 重构重点：购买信息优先级、规格不可用/缺货、价格与配送透明度、加入购物车反馈、购物车恢复、结账错误后保留输入。
- 最少截图：商品详情 before/after；可再附一张购物车或结账错误状态。

### B. 数据分析/运营仪表盘

- Baseline：shadcn/ui `dashboard-01` 固定 registry 快照与静态 JSON。
- 主任务：识别异常 → 理解原因 → 调整时间/筛选 → 下钻到对象。
- 重构重点：指标定义与新鲜度、比较基线、异常突出、筛选归属、图表与表格关联、空/加载/部分失败、键盘和窄屏路径。
- 最少截图：默认 dashboard before/after；可再附一个部分失败或数据为空状态。

### C. 内容编辑器/CMS

- Baseline：Puck 固定版本、固定组件清单和本地页面 JSON。
- 主任务：选择区块 → 编辑属性/内容 → 预览 → 发布或处理校验失败。
- 重构重点：画布与检查器焦点、拖放反馈、自动保存/未保存状态、验证、撤销、预览/发布边界、失败保留输入、退出保护。
- 最少截图：编辑器默认态 before/after；可再附一个未保存或发布失败状态。

## 复用与截图清单

1. 记录每个上游仓库、固定 SHA、许可证和实际复制文件。
2. 将对应 MIT/Apache-2.0 文本与版权声明随案例保存；不要只在 README 口头写“开源”。
3. 对依赖执行单独许可证清单；仓库根许可证不覆盖所有打包依赖。
4. 替换品牌名、Logo、商品照、头像、真实人名和在线 Demo 数据；使用自有或明确可再分发的资源。
5. 禁止真实支付、真实账户、生产 API key 和用户数据进入案例。
6. before/after 使用相同内容、视口、缩放和浏览器；否则比较不成立。
7. README 将“原型来源”“Apple-Design 重构”“实际验证环境”分开陈述，不把 Web 截图表述为 Apple 官方设计或原生平台验证。
