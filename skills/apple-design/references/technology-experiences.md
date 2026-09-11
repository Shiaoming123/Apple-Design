# 系统技术与特定领域的体验
2026-09-11 核对官方目录与指导提纲。下列是设计决策摘要；真正接入某项技术前读取对应完整页及开发文档。存在于 HIG 不代表应加入当前产品。

## AI 与推荐
[Generative AI](https://developer.apple.com/design/human-interface-guidelines/generative-ai)：说明何处使用 AI、能力与限制，保留用户控制；不使用或不可用时仍有良好基础体验。个人信息使用须有许可并说明储存处理。帮助用户输入，降低幻觉风险；结果可修改、撤回或选择替代；高影响执行需适当确认。等待时间、失败建议、反馈和包容性测试属于体验设计。
[Machine learning](https://developer.apple.com/design/human-interface-guidelines/machine-learning)：先确定它是核心还是辅助、主动还是被动、公开还是私人。纠错有即时作用且可再改，显式反馈自愿；不以用户纠错弥补低质量。置信度用人能理解且可行动的方式表达，归因客观，校准简短且可取消。
工程映射：建议、预览、用户确认、实际执行、结果是不同状态；任务事实不可由生成文字冒充。AI 无网络或无配置时，已存在的本地任务操作继续可用。

## 系统动作与连续体验
- [Siri](https://developer.apple.com/design/human-interface-guidelines/siri)：高频动作和熟悉名词，回应简短同时可听可看，错误可理解，不能把响应当广告。
- [iCloud](https://developer.apple.com/design/human-interface-guidelines/icloud)：保持内容及时与可搜索，不可用时合理退化，冲突解决直接，删除后果明确。规范不要求所有本地应用接入。
- [SharePlay](https://developer.apple.com/design/human-interface-guidelines/shareplay)：用于实时共享活动，易加入离开，保持参与者位置感与各自舒适偏好；空间转场尽量由人发起。
- [AirPlay](https://developer.apple.com/design/human-interface-guidelines/airplay)：只传人预期的内容，保留遥控与后台播放，系统媒体控件优先。
- [Always On](https://developer.apple.com/design/human-interface-guidelines/always-on)：隐藏敏感信息，保持关键内容可扫读和布局连续，非必要内容变暗，动效自然停下。
- [App Clips](https://developer.apple.com/design/human-interface-guidelines/app-clips)：立即完成一个真实任务，体积轻、路径短，不强制先注册或下载完整应用；通知和隐私最少化。
- [Mac Catalyst](https://developer.apple.com/design/human-interface-guidelines/mac-catalyst)：检查字体、密度、图像、菜单、窗口、拖放与键盘；平台移植需要重新验收，不是仅重新编译。

## 交易与身份
- [Apple Pay](https://developer.apple.com/design/human-interface-guidelines/apple-pay)：使用官方支付按钮/标识及支付表单，提前收齐规格与配送条件，清楚列总额、额外费用及周期；就地显示授权与处理结果。
- [In-app purchase](https://developer.apple.com/design/human-interface-guidelines/in-app-purchase)：名称与总价清楚，先让人体验价值；试用、续订、家庭共享、恢复、退款与取消入口可理解。
- [Sign in with Apple](https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple)：登录换取明确价值，支持现有账号关联，尊重 private relay，不再索取密码或强迫个人邮箱。
- [ID Verifier](https://developer.apple.com/design/human-interface-guidelines/id-verifier)：区分只展示与数据传输，只要求必需字段，通过明确入口发起。
- [Tap to Pay on iPhone](https://developer.apple.com/design/human-interface-guidelines/tap-to-pay-on-iphone)：商户准备与实际收款分开，先确定金额，处理中和结果清楚，失败有可行替代。
- [Wallet](https://developer.apple.com/design/human-interface-guidelines/wallet)：票证易识别、保持更新和有效期，添加入口使用规范样式；身份资料在需要时请求，保留目的及时间透明。
这些设计指导不是支付、隐私或发布法律意见。实现相应功能时另核对当前平台规则和资源条款。

## 健康、家居与驾驶
- [HealthKit](https://developer.apple.com/design/human-interface-guidelines/healthkit)：解释健康数据用途，按需权限，用系统管理共享。Activity rings 只表达规定活动含义，不能挪用成品牌。
- [CareKit](https://developer.apple.com/design/human-interface-guidelines/carekit)：任务样式匹配单步、多步或日志，图表单位清晰，健康数据和通知克制。
- [ResearchKit](https://developer.apple.com/design/human-interface-guidelines/researchkit)：介绍、资格、知情同意、数据权限顺序明确；参与者先理解研究，再同意；问卷与任务易理解。
- [HomeKit](https://developer.apple.com/design/human-interface-guidelines/homekit)：遵循家、房间、设备、场景的系统模型与设置；尊重既有命名和权限，真实设备状态不能由本地 UI 猜测。
- [CarPlay](https://developer.apple.com/design/human-interface-guidelines/carplay)：驾驶可扫读，减少分心，在车载界面处理问题，不要求解锁手机才能继续；真实车内光照和输入需验证。

## 图像、空间与娱乐
- [Augmented reality](https://developer.apple.com/design/human-interface-guidelines/augmented-reality)：指导放置和恢复定位，保持文字可读，让用户重置或取消，追踪失败有反馈。
- [Maps](https://developer.apple.com/design/human-interface-guidelines/maps)：选择明显，聚合重叠点，地点详情保留地图上下文，维护署名和法律链接可见。
- [NFC](https://developer.apple.com/design/human-interface-guidelines/nfc)：扫描说明简明，不鼓励碰撞实物，按能力支持后台与应用内读取。
- [Photo editing](https://developer.apple.com/design/human-interface-guidelines/photo-editing)：可预览，取消保护未保存编辑，扩展遵循系统容器。
- [Live Photos](https://developer.apple.com/design/human-interface-guidelines/live-photos)：保留各帧与原内容，下载/可播放状态可辨，不支持环境显示静态照片。
- [ShazamKit](https://developer.apple.com/design/human-interface-guidelines/shazamkit)：尽快停止录音；保存识别结果到个人库由用户选择。
- [iMessage apps and stickers](https://developer.apple.com/design/human-interface-guidelines/imessage-apps-and-stickers)：集中一个主要体验，紧凑态保留核心功能，文字编辑适合展开态，贴纸提供本地化替代说明。
- [Game Center](https://developer.apple.com/design/human-interface-guidelines/game-center)：成就、排行榜与挑战状态清楚，系统入口不与关键控件拥挤，挑战可直接进入；不把游戏体系添加到不需要它的产品。
- [VoiceOver](https://developer.apple.com/design/human-interface-guidelines/voiceover)：见输入参考，实际辅助技术验收独立记录。

