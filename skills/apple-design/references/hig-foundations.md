# 视觉基础：语义、层级与可读性
2026-09-11 官方提炼。所列链接是各节来源；具体工程验收见实现参考。

## 布局
[Layout](https://developer.apple.com/design/human-interface-guidelines/layout)：重要内容按阅读顺序组织，利用对齐、缩进、相关分组和渐进展示建立层级。控件与内容应可分辨。窗口大小、文字大小、语言及方向变化后保持熟悉的结构和相同功能。使用 size class、safe area、margin 和系统布局指导；不要按设备名称或横竖屏硬编码布局。macOS 窗口底部可能被移出屏幕，不把关键操作只放在那里。

工程映射：用最小内容宽度、可伸缩列和局部滚动处理空间。先调整分栏和换行，再考虑截断。布局断点由内容需求验证，8px 网格和某个固定圆角都不是 HIG 的通用强制值。

## 材质与 Liquid Glass
[Materials](https://developer.apple.com/design/human-interface-guidelines/materials)：Liquid Glass 表达导航与控件的功能层，标准材质表达内容内部层次。限制自定义玻璃的使用；内容层不铺 Liquid Glass，短暂激活的滑块等交互部位可例外。regular 适合文字较多或底图复杂的控件；clear 面向照片、视频等丰富背景。亮背景下可考虑 35% 暗化，已有暗化或足够暗时不重复叠加。标准材质越厚通常越利于精细文字，越薄越保留背景上下文。选择依据是用途，不是取样颜色。

iOS/iPadOS 标准材质含 ultraThin/thin/regular/thick；这与 Liquid Glass 的 regular/clear 不同。macOS 需选择视窗内或视窗后混合。visionOS 的窗口 glass 有独立规则并随环境亮度适应，不具有单独 Dark Mode。watchOS 模态材质帮助保留位置感。

工程映射：CSS blur 只是近似效果。先提供可靠的不透明底色，再做透明增强；减少透明度、高对比和不支持 backdrop-filter 时保留对比与边界。

## 色彩
[Color](https://developer.apple.com/design/human-interface-guidelines/color)：按语义使用动态系统色，不重定义系统色的意义或硬编码其当前值。同色不表达相冲突的意义；关键信息不能仅靠颜色。浅色、深色、高对比、不同光照、不同屏幕及周围图像都影响结果。玻璃上的颜色要克制，避免控件标签与内容背景同色而消失。图像带正确色彩配置，广色域资源按设备能力适配。

工程映射：品牌强调、选中、危险、成功、次要文字分别有语义 token。不要机械限制整个应用只有一种色，也不要把每个带颜色的非交互状态视为违规。测试最终合成表面，不能只测透明层自身 RGB。

## 深色
[Dark Mode](https://developer.apple.com/design/human-interface-guidelines/dark-mode)：跟随系统外观，分别设计并检查两种模式；使用适应性的前景和背景，白底内容适当柔化。必要时提供深浅图标资产。特殊沉浸体验才考虑单一深色。官方倾向避免重复的应用内外观设置。

工程映射：既有产品若已经授权主题覆盖，保留并明确“跟随系统”行为。暗色不是整体反相；检查禁用、选中、placeholder、图片边缘和所有弹层。不要宣称纯白文字或纯黑背景在所有情境下都被禁止。

## 字体与文本
[Typography](https://developer.apple.com/design/human-interface-guidelines/typography)：优先语义文字样式，用大小、字重与色彩表达关系，限制字体种类。较细字重应谨慎，尤其小字。自定义字体同样必须支持可访问性。字号增大时让重要图标、行高和布局同步适应；尽量减少截断，维护层级。

[Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility) 的正文默认/最小字号参考，单位 pt：iOS/iPadOS 17/11，macOS 13/10，tvOS 29/23，visionOS 17/12，watchOS 16/12。最小值不等于推荐全页正文大小。可放大目标通常至少 200%，watchOS 至少 140%。控件表见输入参考。

iOS 默认 Large Dynamic Type 常用角色：Large Title 34/41、Title 1 28/34、Title 2 22/28、Title 3 20/25、Headline 与 Body 17/22、Callout 16/21、Subheadline 15/20、Footnote 13/18、Caption 1 12/16、Caption 2 11/13；尺寸/行距均为 pt。发布前用当前官方 Typography 表核对目标类别，不能把此表铺到全部平台。

工程映射：CSS 用 rem/语义 token；时间和数值可用 tabular-nums。不要给普通文字一律等宽。系统字体用平台栈；自带字体需核对许可证与中文回退，不能把 SF 字体复制进非 Apple 发行物。

## 图标与 SF Symbols
[Icons](https://developer.apple.com/design/human-interface-guidelines/icons)：优先熟悉、简化、可识别的形状；保持同一视觉体系，字重与相邻文字协调，光学对齐可以用留白修正。必要时才做选中变体；自定义图标有替代标签，优先矢量。不可用含义不清的图标节省必要文字。

[SF Symbols](https://developer.apple.com/design/human-interface-guidelines/sf-symbols)：渲染可选择 monochrome、hierarchical、palette、multicolor；在各背景验证。变量颜色表达变化，动画服务语义，不能持续吸引注意。自定义 symbol 使用官方模板并测试动画。工程映射：按平台和许可选择已有图标库，SF Symbols 的可见存在不等于有权跨平台嵌入。

## App 图标
[App icons](https://developer.apple.com/design/human-interface-guidelines/app-icons)：用一个清晰概念，跨平台保持识别特征。前景边界明确、分层有深度，背景衬托主要形状；优先矢量与居中主体。系统施加遮罩和效果，因此母版不预切圆角或烘焙系统高光。只在必要时带文字，避免照片、UI 复制和 Apple 硬件复制。不同外观保持同一主体，测试暗色与着色。具体画布、层及安全区域依平台最新 Specifications 和 Icon Composer。

## 图像
[Images](https://developer.apple.com/design/human-interface-guidelines/images)：为目标分辨率提供足够清晰的资源，附带色彩配置，在真实设备验证。空间与分层图像注意视觉舒适、安全区和性能。保留有意义的图像说明；用真实资产尺寸与裁剪区域检查，不以占位图证明视觉完成。

## 品牌与包容
[Branding](https://developer.apple.com/design/human-interface-guidelines/branding)：品牌通过声音、字体、克制的强调和熟悉组件表达；服从内容，不重复铺满标志，不把启动页变广告。
[Inclusion](https://developer.apple.com/design/human-interface-guidelines/inclusion)：用直白友好的语言，考虑不同能力、身份、文化和家庭情境，避免刻板印象、难懂俚语和冒犯性的幽默。内容中的人物和称谓同样属于设计。

## 动效
[Motion](https://developer.apple.com/design/human-interface-guidelines/motion)：有明确用途、简短精确、符合输入与预期，允许取消和减少。高频操作通常不再添加额外动效。空间环境尤其避免周边持续移动、大物体突然移动、旋转世界和持续震荡。工程映射：优先 opacity/小位移；别用整体页面淡出导致操作暂时消失。固定弹簧参数不是 Apple 官方统一标准。

## 文案
[Writing](https://developer.apple.com/design/human-interface-guidelines/writing)：稳定的产品声音，随情境调整语气；每屏有明确目的，动作词具体，步骤术语一致。错误解释问题并给出下一步，空白界面提供可行入口，字段 hint 补充格式而非代替名称。大小写依组件与语言统一，不能给中文机械套英文 Title Case。

## 从右到左
[Right to left](https://developer.apple.com/design/human-interface-guidelines/right-to-left)：段落按自身语言对齐；导航、进度和阅读方向的符号相应镜像。数字本身、照片、商标、真实方向及通用标志通常不镜像。工程映射：使用逻辑边距与方向属性，混合文本和数字单独验证。

## 空间设计
[Spatial layout](https://developer.apple.com/design/human-interface-guidelines/spatial-layout) 与 [Immersive experiences](https://developer.apple.com/design/human-interface-guidelines/immersive-experiences)：关键内容居中，深度只在提供价值时使用，避免给文字加不必要立体效果。让用户选择进入和退出沉浸，提供可预测过渡、现实环境参照与舒适距离，避免要求大量身体运动。该指导用于 visionOS 空间体验，不用于给普通工作区增加 3D 装饰。

