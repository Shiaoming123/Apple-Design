# 产品原则与平台适配
核对日期：2026-09-11。以下为官方提炼；跨平台应用方式另标为工程映射。

## 设计上层入口

[Apple Design](https://developer.apple.com/design/) 将 HIG、设计资源、Icon Composer、SF Symbols、设计视频和案例串成设计入口。[Design Pathway](https://developer.apple.com/design/get-started/) 建议从设计原则出发，逐渐进入基础、模式、组件、输入与技术，再利用官方工具和原型迭代。它覆盖体验、决策与交互，不只覆盖表面样式。

[Apple Design Resources](https://developer.apple.com/design/resources/) 提供平台模板、设计套件与素材。使用时核对平台、系统版本及资源自己的使用条件；设计资源可用不等于任意发行物可嵌入。设计奖与开发者案例可以提供启发，不能替代组件规范或本产品用户证据。

## 八项设计原则

来源：[Design principles](https://developer.apple.com/design/human-interface-guidelines/design-principles)。

| 原则 | 产品决策 | 审查问题 |
| --- | --- | --- |
| Purpose 目的 | 解决真实需要，集中在产品最能提供价值的任务 | 这项内容帮助用户完成什么？ |
| Agency 自主 | 允许按自己的方式操作、探索、恢复错误 | 用户能取消、修改、撤销吗？ |
| Responsibility 责任 | 如实解释能力与数据使用，保护人的利益 | 结果、成本、权限和限制是否透明？ |
| Familiarity 熟悉 | 使用已知概念、一致交互和明确反馈 | 同一动作在不同入口是否一致？ |
| Flexibility 灵活 | 适应人、情境、输入和平台，保留上下文 | 放大、旋转、切换设备后还能继续吗？ |
| Simplicity 简洁 | 去掉不必要内容，建立层级，表达直接 | 用户是否能发现主要行动？ |
| Craft 工艺 | 细节质量、持续试验和维护 | 边界状态是否像默认状态一样完整？ |
| Delight 愉悦 | 让产品有合适的情绪和有意义的亮点 | 动效与文案带来帮助还是负担？ |

工程映射：不要把“简洁”理解为隐藏必要功能，也不要把“愉悦”理解为增加装饰。每个设计选择应改善完成效率、理解或舒适性。

## 平台的体验基线

| 平台与来源 | 官方指导的重点 | 具体映射 |
| --- | --- | --- |
| [iOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-ios) | 手持、触摸、频繁切换与短时任务；适应方向、字号及外观 | 主要操作易触达，返回可预测，次要内容渐进展开，恢复工作上下文 |
| [iPadOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-ipados) | 大屏、多窗口、多输入方式，减少不必要模态与全屏切换 | 按可用窗口宽度切换分栏；兼容键盘、指针、Pencil，不做放大的手机 |
| [macOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-macos) | 长时间高密度工作、精确输入、菜单栏、可调整窗口 | 常用命令可发现，快捷键可用；合理的分栏、窗口和自定义工具栏 |
| [tvOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-tvos) | 远距离观看、遥控与焦点导航、共享环境 | 放大可读元素，焦点清楚，媒体优先，减少文字输入；检查真实电视 |
| [watchOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-watchos) | 可扫读、短操作、Digital Crown、通知和小组件 | 主信息优先，减少层级与输入，以短操作完成任务；避免持续等待界面 |
| [visionOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-visionos) | 空间、眼手输入、现实环境、舒适与包容 | 熟悉任务优先窗口；沉浸由用户控制，重要信息居中，避免强迫身体运动 |
| [游戏](https://developer.apple.com/design/human-interface-guidelines/designing-for-games) | 快速进入游戏、通过游玩学习、每平台默认输入与辅助能力 | 分辨率无关图形、易用菜单、可自定义控制；不强迫外接手柄 |
| [iPhone Duo](https://developer.apple.com/design/human-interface-guidelines/designing-for-iphone-duo) | 多显示状态、折叠区域与动态布局 | 保持功能和上下文；遵循系统保留区域与栏位，不按设备姿态突然改换导航 |

iPhone Duo 是核对日期官方目录中已出现的专门指南；实现前重读其正文及 SDK 可用性，不把文档存在视为当前项目已支持。

## 从产品目标到界面

工程映射：列出主任务、对象、主要操作及上下文；把任务流程拆成入口、编辑、提交、等待、成功、失败、撤销与恢复。优先用用户已有的术语命名目的地。对象详情、工具选项和全局设置应有不同容器，避免每个动作都开启独立模态。

跨平台共享品牌、领域词汇、信息意义与操作结果；平台决定布局密度、导航容器、输入尺寸和系统反馈。Apple 规范不会要求 Windows 使用 Cmd，也不会要求 Android 模仿 iOS 返回。不要以统一视觉为由移除已授权的产品功能。

