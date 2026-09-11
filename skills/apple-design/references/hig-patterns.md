# 用户流程与状态
2026-09-11 官方提炼。每项包含适用原则；工程实现需结合产品的实际能力。

## 进入与理解
- [Launching](https://developer.apple.com/design/human-interface-guidelines/launching)：尽快呈现应用并恢复之前状态。启动画面接近首屏，弱化品牌曝光；启动不是展示广告的时机。
- [Onboarding](https://developer.apple.com/design/human-interface-guidelines/onboarding)：通过操作教学、按情境提示；必要的前置流程简短，非必要设置延后。不要先让人背诵操作步骤。首次必需权限可在相关引导中请求。
- [Offering help](https://developer.apple.com/design/human-interface-guidelines/offering-help)：依据任务提供一致、包容的帮助。小提示解决简单功能发现，短而可操作；不重复解释标准控件。tooltip 说明当前控件的动作，避免只有重复名称。
- [Writing](https://developer.apple.com/design/human-interface-guidelines/writing)：空白屏指明下一步；错误可理解、可行动。工程映射：区别无数据、筛选无结果、未配置、无权限、离线和加载失败，不能全部写“暂无内容”。

## 输入、等待、反馈
- [Entering data](https://developer.apple.com/design/human-interface-guidelines/entering-data)：少要求重复输入；可用选择、系统已知信息、粘贴和拖入，清楚表示必需信息并动态校验。安全字段使用安全输入；不能预填密码。
- [Loading](https://developer.apple.com/design/human-interface-guidelines/loading)：先显示可用内容，等待时尽量允许其它操作。真实进度可测量时显示进度，不可测量时说明正在处理。大型资源避免阻塞首次体验。
- [Feedback](https://developer.apple.com/design/human-interface-guidelines/feedback)：反馈靠近受影响对象，所有反馈可访问。仅关键且最好可行动的信息使用警告框。意外且不可逆的数据损失应预警，不能执行的命令应说明原因。
- [Undo and redo](https://developer.apple.com/design/human-interface-guidelines/undo-and-redo)：说明将撤销什么并显示结果，适合时支持连续撤销。尊重系统快捷键和手势。工程映射：不能把“已点击”视为“已保存”；失败保留输入、明确重试，避免重复提交。

## 浏览、搜索与设置
- [Searching](https://developer.apple.com/design/human-interface-guidelines/searching)：重要搜索有主要入口，尽量统一搜索位置，范围显式可见。建议可以减少输入，但展示历史需考虑隐私。系统搜索集成只在产品支持时采用。
- [Settings](https://developer.apple.com/design/human-interface-guidelines/settings)：提供好默认值，减少设置数量；当前任务选项靠近任务，全局低频选项放设置。尊重系统偏好。macOS 提供菜单入口、显示当前面板并恢复它。
- [Modality](https://developer.apple.com/design/human-interface-guidelines/modality)：只有有明确收益才中断当前工作。模态任务短、单一、可辨识，明确退出；可能丢失工作时确认。复杂长期流程考虑普通页面或更大容器，不逐层堆模态。
- [Multitasking](https://developer.apple.com/design/human-interface-guidelines/multitasking)：切走时妥善处理中断，继续适合的用户任务，尽量少发通知，回来能继续。媒体恢复要根据用户意图和音频环境判断。
- [Going full screen](https://developer.apple.com/design/human-interface-guidelines/going-full-screen)：由用户选择进出，保留关键功能与恢复位置；使用平台全屏体验。

## 文件、账号与分享
- [File management](https://developer.apple.com/design/human-interface-guidelines/file-management)：适配系统文件交互，可靠保存，让人知道工作被保留。支持合适的预览、保存位置和格式；关闭自动保存时需体现未保存状态与保护。
- [Managing accounts](https://developer.apple.com/design/human-interface-guidelines/managing-accounts)：解释账户带来的价值，尽量延迟登录。使用可用的系统认证，提供清晰的删除入口、过程和完成说明，并解释订阅处理。不能把应用账号与设备解锁码混称。
- [Privacy](https://developer.apple.com/design/human-interface-guidelines/privacy)：只索取实际需要的数据，尽可能端侧处理，在功能需要时请求权限，说明用途。保护敏感凭据；自定义权限前置说明不能诱导或模拟系统授权。
- [Collaboration and sharing](https://developer.apple.com/design/human-interface-guidelines/collaboration-and-sharing)：分享入口易发现，权限名称短而具体，协作开始后显示状态和管理入口。工程映射：只对真实接收者、范围和结果给确认；不因参考规范而给本地产品增加协作。
- [Drag and drop](https://developer.apple.com/design/human-interface-guidelines/drag-and-drop)：说明复制或移动、提供预览及目标可接受状态。失败有反馈，可行时可撤销；提供等价替代操作。保留合理选择状态，长目标区域支持滚动。

## 通知
[Managing notifications](https://developer.apple.com/design/human-interface-guidelines/managing-notifications)：真实表达紧急程度，Time Sensitive 只用于当下时效事件，不用于营销；尊重 Focus。推广通知有用户许可和管理入口。
[Notifications](https://developer.apple.com/design/human-interface-guidelines/notifications)：内容简洁不重复轰炸，锁屏避免泄露私密内容，前台妥善处理。动作必须有意义，优先非破坏行为，未读计数及时更新。工程映射：产品自己的学习提醒和系统时效等级需要区分；不承诺未验证的退出后投递。

## 图表和媒体
- [Charting data](https://developer.apple.com/design/human-interface-guidelines/charting-data)：为一个明确的数据问题选常见图表，标题和说明解释含义；同一数据的颜色、单位、比例和交互保持连续。可访问性和原始数据替代同样重要。
- [Playing audio](https://developer.apple.com/design/human-interface-guidelines/playing-audio)：尊重静音、音量、耳机和路由意图。音频类别与用途匹配，不劫持系统音量；妥善处理打断及恢复。
- [Playing video](https://developer.apple.com/design/human-interface-guidelines/playing-video)：优先系统播放控件，保留原比例、正确恢复位置、控制和退出。空间播放兼顾舒适，避免未经选择进入全沉浸。
- [Playing haptics](https://developer.apple.com/design/human-interface-guidelines/playing-haptics)：系统触觉保持原语义；短、离散、节制、可关闭，与其它反馈互补。
- [Live-viewing apps](https://developer.apple.com/design/human-interface-guidelines/live-viewing-apps)：直播入口直接，表现出实时性，切台即时反馈，节目表浏览与当前播放衔接。
- [Printing](https://developer.apple.com/design/human-interface-guidelines/printing)：只有可打印时提供入口，选项相关、可预览；常用与高级选项分层。
- [Ratings and reviews](https://developer.apple.com/design/human-interface-guidelines/ratings-and-reviews)：真正使用后再请求，避免打断任务和重复催促，优先系统提示。
- [Workouts](https://developer.apple.com/design/human-interface-guidelines/workouts)：运动中核心数值和控制醒目，保持简明并显示会话状态，结束给总结，缺传感器数据时解释。Activity rings 有特定语义，不能改成通用学习装饰。

