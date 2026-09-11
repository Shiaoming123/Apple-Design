# 组件选择与状态
2026-09-11 官方提炼。尺寸与形态随平台变化；不要把示意尺寸写成通用硬约束。

## 导航与工作区

| 来源 | 何时使用与检查 |
| --- | --- |
| [Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars) | 顶层目的地导航，不能充当创建或提交按钮。保持入口稳定，有标签，避免溢出和隐藏未就绪目的地；空数据在目的地说明。数量按信息架构和空间决定。 |
| [Sidebars](https://developer.apple.com/design/human-interface-guidelines/sidebars) | 显示较多目的地及浅层分类。适合时可隐藏和定制；层级不要过深，分组标题简短。macOS 关键内容不要只放侧栏底部。 |
| [Split views](https://developer.apple.com/design/human-interface-guidelines/split-views) | 导航、内容与详情的并列关系；父级选择持续可见。窄窗口适应分栏，设置合理最小最大宽度，可隐藏栏位有重新打开入口。 |
| [Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars) | 当前任务的常用动作，导航与提交分组清楚，次要动作进入 More。标题描述当前内容，减少底板和彩色控件。macOS 工具栏动作也有菜单命令。 |
| [Search fields](https://developer.apple.com/design/human-interface-guidelines/search-fields) | 检索入口，清楚表示范围和当前查询；输入、清除、结果与取消保持连续。入口位置按全局或局部范围选择。 |
| [Path controls](https://developer.apple.com/design/human-interface-guidelines/path-controls) | 层级路径定位；保留可理解的父级路径，不能替代全部应用导航。 |
| [Tab views](https://developer.apple.com/design/human-interface-guidelines/tab-views) | 同一容器的不同面板；与顶层 tab bar 和局部 segmented control 区分。 |

## 内容与组织

[Lists and tables](https://developer.apple.com/design/human-interface-guidelines/lists-and-tables)：文本主导内容优先列表，行样式适配实际信息，清楚表示选择。文字保持简明，长文本有阅读方式。多列表头描述内容；macOS 适合提供排序和列宽调整。层级内容用 outline。
[Collections](https://developer.apple.com/design/human-interface-guidelines/collections)、[Column views](https://developer.apple.com/design/human-interface-guidelines/column-views)、[Outline views](https://developer.apple.com/design/human-interface-guidelines/outline-views)：分别用于图像或空间化内容、层级逐列浏览、可展开树；实施前读相应页面。
[Disclosure controls](https://developer.apple.com/design/human-interface-guidelines/disclosure-controls)、[Boxes](https://developer.apple.com/design/human-interface-guidelines/boxes)、[Labels](https://developer.apple.com/design/human-interface-guidelines/labels)：表达展开、分组与名称；不要用每项厚容器替代信息组织。
[Charts](https://developer.apple.com/design/human-interface-guidelines/charts)、[Image views](https://developer.apple.com/design/human-interface-guidelines/image-views)、[Text views](https://developer.apple.com/design/human-interface-guidelines/text-views)、[Web views](https://developer.apple.com/design/human-interface-guidelines/web-views)：根据内容选容器；文本可读、图像比例合理、图表可理解，网页载入和失败保持明确。技术容器的存在不决定产品层级。
[Lockups](https://developer.apple.com/design/human-interface-guidelines/lockups) 是特定平台的内容组合模式，按平台阅读，不套用成通用卡片。

## 按钮与命令

[Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)：同时确定外观、内容、角色。用样式表达主次而非无规则放大；图标不如短文清晰时用文字。自定义按钮必须有按压态。primary 是最可能的非破坏动作，destructive 不设为默认主操作；非即时动作提供进行中反馈。

[Menus](https://developer.apple.com/design/human-interface-guidelines/menus)：名称简短明确，按逻辑与频率分组；不可用项状态清楚，子菜单短且浅。需要更多输入才能完成的动作可用省略号。选中属性用勾选。图标同组统一，不为每项强加装饰。
[Context menus](https://developer.apple.com/design/human-interface-guidelines/context-menus) 提供对象相关快捷操作；工程映射需有可发现的等价入口，不能只靠长按或右键。
[Edit menus](https://developer.apple.com/design/human-interface-guidelines/edit-menus)、[The menu bar](https://developer.apple.com/design/human-interface-guidelines/the-menu-bar)、[Dock menus](https://developer.apple.com/design/human-interface-guidelines/dock-menus)、[Home Screen quick actions](https://developer.apple.com/design/human-interface-guidelines/home-screen-quick-actions) 是平台命令入口，按各自任务与惯例实现。
[Pop-up buttons](https://developer.apple.com/design/human-interface-guidelines/pop-up-buttons) 表达选项选择；[Pull-down buttons](https://developer.apple.com/design/human-interface-guidelines/pull-down-buttons) 表达动作集合；不要用相同外观混淆状态与命令。
[Activity views](https://developer.apple.com/design/human-interface-guidelines/activity-views) 提供系统分享/动作；[Ornaments](https://developer.apple.com/design/human-interface-guidelines/ornaments) 是空间附属控制，不能当作任意信息浮窗。

## 弹层与呈现

- [Alerts](https://developer.apple.com/design/human-interface-guidelines/alerts)：重要且需注意的情况才中断，不因每次可撤销动作弹警告。标题讲清情况，正文只补必要信息，按钮描述具体动作；危险选择有明确取消。
- [Action sheets](https://developer.apple.com/design/human-interface-guidelines/action-sheets)：承接用户主动发起动作后的相关选择。不要和错误告警混用。
- [Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets)：短且明确的模态任务。主界面一次呈现一张 sheet；iPhone 可用中等高度渐进展开，可调整时有 grabber。长流程、反复调节并观察主视图时考虑普通页面或 panel。
- [Popovers](https://developer.apple.com/design/human-interface-guidelines/popovers)：锚定到相关控件的小量信息或工具；只出现一个，不再在其上叠新视图。自动关闭时保护工作；compact 环境改用合适呈现。
- [Panels](https://developer.apple.com/design/human-interface-guidelines/panels)：持续辅助当前任务的工具或检查器，适合反复操作。与阻塞主任务的 sheet 区分。
- [Windows](https://developer.apple.com/design/human-interface-guidelines/windows)：根据任务打开、适应大小、多窗口和系统控制。不要以定制边框破坏熟悉操作。visionOS 保留系统窗口背景及舒适深度。
- [Scroll views](https://developer.apple.com/design/human-interface-guidelines/scroll-views)：保留标准滚动与键盘操作，显示可滚动性，避免同方向嵌套。scroll edge 只在浮动控件覆盖滚动内容时使用，每视图一处相应效果，不给静态容器叠渐变。
- [Page controls](https://developer.apple.com/design/human-interface-guidelines/page-controls)：有限连续页的位置提示，应与真实分页行为一致。

## 选择和输入

| 来源 | 决策 |
| --- | --- |
| [Text fields](https://developer.apple.com/design/human-interface-guidelines/text-fields) | 少量单行输入；合适键盘、hint、清除、安全输入和校验。Tab 顺序自然，字段宽度匹配预期内容。多行内容用文本区域。 |
| [Pickers](https://developer.apple.com/design/human-interface-guidelines/pickers) | 中长选择列表，值顺序可预测；日期精度符合任务，不为简单选择跳转新页面。 |
| [Toggles](https://developer.apple.com/design/human-interface-guidelines/toggles) | 两个对立状态，有清楚标签与可辨状态。iOS switch 用于列表行；macOS checkbox 适合独立或层级多选，radio 用于互斥项。 |
| [Segmented controls](https://developer.apple.com/design/human-interface-guidelines/segmented-controls) | 少量紧密相关的局部选择，内容类型与宽度协调，名称使用名词或短语。不要承担整个应用导航。 |
| [Sliders](https://developer.apple.com/design/human-interface-guidelines/sliders) | 连续范围选择，当前值和端点明确；精确输入需要另一入口。 |
| [Steppers](https://developer.apple.com/design/human-interface-guidelines/steppers) | 少量离散增减，与当前数值相邻，边界和禁用状态明确。 |
| [Combo boxes](https://developer.apple.com/design/human-interface-guidelines/combo-boxes) / [Token fields](https://developer.apple.com/design/human-interface-guidelines/token-fields) | 自由输入配预设选择 / 可独立操作的结构化项；检查键盘编辑、删除和提交。 |
| [Color wells](https://developer.apple.com/design/human-interface-guidelines/color-wells) / [Image wells](https://developer.apple.com/design/human-interface-guidelines/image-wells) | 颜色或图像的实际选择入口；预览应对应真实值。 |
| [Digit entry views](https://developer.apple.com/design/human-interface-guidelines/digit-entry-views) / [Virtual keyboards](https://developer.apple.com/design/human-interface-guidelines/virtual-keyboards) | 特定输入环境；尽量降低输入负担，兼容粘贴与平台输入方式。 |

工程映射：checkbox、radio、switch、menu、listbox、tab 的 HTML/ARIA 角色不同，不能只靠 CSS 模仿。错误关联到字段，弹层有标题与焦点恢复，触发器状态与可见内容一致。

## 进度与系统表面

[Progress indicators](https://developer.apple.com/design/human-interface-guidelines/progress-indicators)：能量化时用真实进度，未知时不能伪造百分比；位置稳定，可行时允许停止并说明影响。
[Gauges](https://developer.apple.com/design/human-interface-guidelines/gauges)、[Rating indicators](https://developer.apple.com/design/human-interface-guidelines/rating-indicators)、[Activity rings](https://developer.apple.com/design/human-interface-guidelines/activity-rings)：分别表达范围值、评价和 Apple 活动语义，不能互相替代。

[Widgets](https://developer.apple.com/design/human-interface-guidelines/widgets)：一个清晰可扫读用途，内容及时更新，简单交互进入正确位置；支持系统着色和占位/预览，不把完整应用压进小组件。
[Live Activities](https://developer.apple.com/design/human-interface-guidelines/live-activities)、[Controls](https://developer.apple.com/design/human-interface-guidelines/controls)、[App Shortcuts](https://developer.apple.com/design/human-interface-guidelines/app-shortcuts)、[Snippets](https://developer.apple.com/design/human-interface-guidelines/snippets)：按即时状态、快捷控制与系统动作各自语义实现。
[Complications](https://developer.apple.com/design/human-interface-guidelines/complications)、[Watch faces](https://developer.apple.com/design/human-interface-guidelines/watch-faces)、[Top Shelf](https://developer.apple.com/design/human-interface-guidelines/top-shelf)、[Status bars](https://developer.apple.com/design/human-interface-guidelines/status-bars)：平台专属表面，实施时阅读最新叶子页。目录覆盖不代表所有细则已穷尽。

