# 输入与可访问性
2026-09-11 官方提炼与工程验收映射。

## 目标尺寸与字体

[Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility) 的默认/最小控制尺寸，单位 pt：

| 平台 | 默认 | 最小 |
| --- | --- | --- |
| iOS/iPadOS | 44×44 | 28×28 |
| macOS | 28×28 | 20×20 |
| tvOS | 66×66 | 56×56 |
| visionOS | 60×60 | 28×28 |
| watchOS | 44×44 | 28×28 |

默认尺寸是舒适基准，不能据最小值批量压小控件。相邻控件的间距同样影响可操作性。工程映射：Web 项目按目标设备检验实际 hit region；图标绘制尺寸不等于命中尺寸。Windows/Android 用项目对应平台标准，不能把 pt 数字无条件复制过去。

可访问性需同时考虑视觉、听觉、运动、言语和认知差异。信息多通道表达；不依赖颜色、声音或动效单一信号。可放大文字、足够对比、清楚焦点、简单手势、可替代操作和可控媒体是基础。

## 键盘与焦点
[Keyboards](https://developer.apple.com/design/human-interface-guidelines/keyboards)：支持键盘完成任务，保留标准快捷键，仅给常用自定义命令定义新组合，遵循修饰键及本地化惯例。
[Focus and selection](https://developer.apple.com/design/human-interface-guidelines/focus-and-selection)：焦点代表当前操作目标，选择代表对象状态；二者不能混同。避免未经用户交互突然移动焦点。输入框焦点环、列表高亮应符合平台习惯。

工程验收：Tab/Shift+Tab 顺序按视觉流程；Enter/Space 用语义控件默认行为；菜单/选项的方向键符合角色；Escape 只关闭最上层。关闭浮层后回到触发器，触发器已消失时移到合理邻近对象。输入法组合、文本编辑时不触发全局单键快捷键。不能清除 outline 而无替代。

## 指针、触摸与手势
[Pointing devices](https://developer.apple.com/design/human-interface-guidelines/pointing-devices)：点击、修饰键、鼠标和触控板保持一致；系统指针和效果优先，定制只为明确用途。
[Gestures](https://developer.apple.com/design/human-interface-guidelines/gestures)：标准手势按标准意义响应，及时反馈，定制手势只作补充，避免与系统导航冲突。
[Drag and drop](https://developer.apple.com/design/human-interface-guidelines/drag-and-drop)：显示预览、合法落点、动作结果及失败；有等价入口。
工程验收：hover 不能是唯一入口；触摸可发现并命中。拖动日历同时有编辑时间或键盘途径；菜单有可见触发器。滑动与滚动不抢占彼此。

## 朗读与信息关系
[VoiceOver](https://developer.apple.com/design/human-interface-guidelines/voiceover)：关键元素有替代名称，有意义图像和图表可描述，装饰图从朗读中排除。标题、分组、顺序和关联帮助导航；动态变化向辅助技术传达。
工程映射：label、description、error、expanded、selected、checked 与 busy 属性对应真实状态；表格有表头。异步结果按紧迫性通知，计时器不能每秒打断朗读。图表有文字或数据表替代。必须实际测试阅读顺序，语义快照不等于真实读屏已验收。

## 对比与缩放
Apple Accessibility 页面给出自身的字号/字重对比指导；Web 实现若声称 WCAG 2.2 AA，必须独立遵守 WCAG 的 large-text 定义，不能把 Apple 简表中的“bold”泛化为所有 Web 小字只需 3:1。
工程基线：普通文字 4.5:1，合格大字 3:1，必要 UI 边界及图形 3:1；分别检查各主题。不得仅因透明色变量的数值通过就宣布最终合成通过。
200% 字号/缩放测试应区分 CSS zoom、浏览器缩放、系统字体/原生 Dynamic Type。每种结果按实际手段记录。布局可换行增长，焦点和主要操作保持可达。

## 动效、时间与感官
[Motion](https://developer.apple.com/design/human-interface-guidelines/motion) 与 [Playing haptics](https://developer.apple.com/design/human-interface-guidelines/playing-haptics)：减少动效时替代不必要移动；触觉短且可选，与视觉并用。认知体验要减少严格限时消息，允许控制播放，谨慎闪烁。
工程验收：减少动效、减少透明度、提高对比和 forced-colors 独立检查。撤销入口不能只存在于快速消失的提示。去掉持续动画后，加载状态仍有文字或图形语义。

## 特定输入
- [Apple Pencil and Scribble](https://developer.apple.com/design/human-interface-guidelines/apple-pencil-and-scribble)：落笔即响应，左右手可用，hover 预测不执行，书写时字段保持稳定；遵循用户双击/挤压偏好。
- [Action button](https://developer.apple.com/design/human-interface-guidelines/action-button)：高价值简短动作，标签具体，尽量保留当前上下文。
- [Camera Control](https://developer.apple.com/design/human-interface-guidelines/camera-control)：控制与拍摄模式相关，取景器为覆盖层预留空间，数值有单位。
- [Digital Crown](https://developer.apple.com/design/human-interface-guidelines/digital-crown)：转动与导航/数值变化同步反馈，不劫持系统职责。
- [Eyes](https://developer.apple.com/design/human-interface-guidelines/eyes)：充分间距与舒适距离，整体可高亮的形状，避免过度视觉干扰，提供其它输入途径。
- [Remotes](https://developer.apple.com/design/human-interface-guidelines/remotes)：焦点清晰，Back 通常返回父级，播放暂停符合预期，区分误触与按压。
- [Game controls](https://developer.apple.com/design/human-interface-guidelines/game-controls)：支持平台默认输入，发现手柄后正确映射图标与按键；允许适当定制。
- [Gyroscope and accelerometer](https://developer.apple.com/design/human-interface-guidelines/gyro-and-accelerometer)：只有真实收益才使用运动信息，游戏外避免用它直接操纵界面。
- [Nearby interactions](https://developer.apple.com/design/human-interface-guidelines/nearby-interactions)：结合距离方向与情境，连续反馈并解释障碍物影响，不能作为唯一操作方式。

