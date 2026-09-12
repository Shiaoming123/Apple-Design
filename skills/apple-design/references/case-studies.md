# 案例索引

案例用于回答“哪种信息关系已经在真实产品中工作”，不是可直接套用的皮肤，也不代表 Apple 官方认可。只读取与当前任务相近的案例；实施前仍需检查目标产品的真实流程、组件、平台和可访问性状态。

## 使用规则

- 区分仓库截图、实时网页、概念图和目标平台证据。它们不能互相替代。
- 保留来源网址、获取日期、提交或视口、主题、页面状态和文件哈希；实时网页未证明对应某个仓库提交时，不建立这种关联。
- 提炼信息层级、任务流和状态表达，不复制品牌、色值、圆角、模糊或具体内容。
- 截图只能证明可见状态。键盘、缩放、错误恢复、减少透明度和原生平台行为必须另行验证。

## Tokens Counter：高密度桌面工作台

- 项目：[Shiaoming123/Tokens-Counter](https://github.com/Shiaoming123/Tokens-Counter)
- 在线体验：[tokens-counter.vercel.app](https://tokens-counter.vercel.app/)
- 场景：在一个桌面 Web 工作台中选择多个模型、配置估算参数、输入内容并比较结果。
- 核验日期：2026-09-12（Asia/Shanghai）

### 证据

| 文件 | 类型与状态 | 来源/环境 | SHA-256 |
| --- | --- | --- | --- |
| [`repository/readme-screenshot.png`](../assets/case-studies/tokens-counter/repository/readme-screenshot.png) | 仓库 README 截图；英文、有结果 | 提交 [`758d686`](https://github.com/Shiaoming123/Tokens-Counter/tree/758d6867fdeb58c1bad028382560912f8ca0b76c)，2048×1074 px | `fc9f81f061690c450c106db526dcb82a6e6d8cc83f1682fa623e9a2800547acf` |

在线地址用于复核当前版本，但本案例只保存仓库原始截图，不重复收录视觉差异不明显的实时页面截图。截图只证明可见状态，不替代交互、性能或可访问性验收。

仓库 README 状态：

![Tokens Counter 仓库 README 截图](../assets/case-studies/tokens-counter/repository/readme-screenshot.png)

### 问题—决策—效果—边界

- 问题：模型、参数、输入和结果都需要较高信息密度，但主要任务不能被统计或装饰抢走。
- 决策：把模型选择、估算输入、结果/历史放在稳定三栏中；顶部摘要只承载当前选择与计算结果；本地/官方来源用文字标签表达。
- 可见效果：选择范围、输入上下文和比较结果能在同一视野中往返查看；空结果仍保留下一步入口。
- 边界：这是桌面 Web 工作台的可见证据，不是移动端或原生 Apple 平台证据，也不是可用性研究结论。

### 可复用模式

- 先固定“选择 → 配置与输入 → 结果”的任务关系，再决定材质和装饰。
- 用稳定列和邻近反馈支持频繁比较；窄窗口应改为分层导航，不能机械压缩三栏。
- 可信边界既有独立入口，也在模型条目附近用文字说明，避免只靠颜色或图标。
- 主题、语言和帮助入口在桌面工具栏可见，但视觉权重低于主任务。

### 使用前复核

重新打开在线体验并检查当前布局；若要引用具体行为，应再读对应代码。对浅色渐变、透明材质、细边框和密集顶部导航检查对比度、200% 文字、键盘焦点、减少透明度及较窄桌面窗口。不要把项目自述的“Apple 风格”写成 HIG 合规或 Apple 认证。

## Web 重构画廊：三类页面基线

- 可运行示例：[Web 重构案例画廊](../examples/refactor-gallery/README.md)
- 场景：商品详情与购买、运营仪表盘、内容编辑器。
- 原型来源：[Spree Storefront](https://github.com/spree/storefront)、[shadcn/ui `dashboard-01`](https://ui.shadcn.com/blocks)、[Puck](https://github.com/puckeditor/puck)。三者核验时均以 MIT 许可发布。
- 核验日期：2026-09-12（Asia/Shanghai）

### 证据

以下六张图片由同一个本地 HTML/CSS/JavaScript 示例在 1440×1000 CSS px、浅色模式、Windows Edge Chromium 153.0.4234.32 中生成。每张图片截取同尺寸页面原型区域；前后使用相同核心数据。

| 场景 | Before SHA-256 | After SHA-256 |
| --- | --- | --- |
| [商品详情](../assets/case-studies/refactor-gallery/commerce/before.png) | `c1cba1cba55cbe66de58a060b1827d10e6d4ca81cb9122b3f79a3539c44abba8` | [`d8714409ee9ff2ed81a715fffe530feb625d23770c7f0ecfebdd4eb4880f0509`](../assets/case-studies/refactor-gallery/commerce/after.png) |
| [数据仪表盘](../assets/case-studies/refactor-gallery/dashboard/before.png) | `07001e3f35ac168599ce9e576e7b601c487e11a6411ff419aff5a16fe65c8f7c` | [`f35e146c932333ef23ae82fc266c8fb20f2dd3347c22bb6acff9d8c7abd532fd`](../assets/case-studies/refactor-gallery/dashboard/after.png) |
| [内容编辑器](../assets/case-studies/refactor-gallery/editor/before.png) | `249fcef03d3186d046d10714b3b8fd4d3487c5d732d8a661586da800b84fffd5` | [`2565faabc17dfe4667eca018618a33bf916553859e633c30581a0a90ffc7e70c`](../assets/case-studies/refactor-gallery/editor/after.png) |

### 重构关系

- 商品详情：从促销和通用导航抢占注意力，改为“商品 → 价格 → 规格 → 履约 → 加入购物袋”的连续购买路径。
- 数据仪表盘：从同权重指标与图表堆叠，改为带更新时间、比较口径、异常优先级和下钻入口的运营决策页。
- 内容编辑器：从字段表单与发布侧栏，改为持续可见的文档上下文、保存状态、编辑画布和发布边界。

### 来源与边界

开源原型用于选择真实任务结构，未把上游应用、商标、图片或在线数据复制进本 Skill。Before 是项目制作的本地适配基线，不是第三方页面原样截图；After 是应用本 Skill 规则后的实际 Web 实现，也不是 Apple 官方设计或原生平台验证。自动检查覆盖 URL 状态、规格选择、购物袋反馈、时间筛选、异常选择、自动保存、发布对话框、焦点恢复、390 px 窄屏、200% CSS 文字以及浏览器控制台错误；未覆盖真实支付、生产数据、持久化、读屏器、Safari、原生壳或设备。
