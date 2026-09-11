# 跨平台实现手册
这是原创平台映射与工程决策，不是把 Apple 规则强加给所有系统。阅读路线：不变量 → 容器 → 字体与命中 → 材质 → 状态 → 实现例 → 验证。

## 1. 共享什么，不共享什么
| 层 | 适合共享 | 应允许不同 |
| --- | --- | --- |
| 领域 | 对象 ID、字段意义、完成规则、撤销语义 | 不因平台改写事实 |
| 应用 | 命令接口、权限判断、错误分类 | 原生能力适配器 |
| 信息 | 术语、状态含义、主要动作优先级 | 导航容器与显示密度 |
| 设计 | 语义色、层级意图、品牌特征 | 实际字体、控件尺度、材料 |
| 交互 | 创建/编辑/保存/恢复的目标 | 返回方式、快捷键、手势 |
| 验收 | 可操作、数据可靠、状态真实 | Web、桌面壳、模拟器、真机证据 |

“一个代码库”不是“一个像素布局”。设计 token 也不应该把所有平台固定在同一组 px。

## 2. 同一个列表—详情流程
### iPhone / 窄窗口
列表到详情可使用栈式导航；返回保留列表状态。编辑为短任务时可以 sheet，长表单应有足够空间。
底部导航只放顶层目的地，创建按钮不是一个目的地。
如果输入键盘占据屏幕，主要字段和保存/退出必须可到达，不以固定 100vh 假设所有空间可见。

### iPad / 可调整窗口
不要按“平板”名称强制双栏；分屏或大字下窗口仍可能很窄。
在可读宽度足够时并列列表与详情，否则保留 selectedId 并折叠成栈。重新展开后恢复同一对象，不新建另一份详情状态。
键盘和指针应能完成主要流程；触控操作不能退化为依赖 hover。

### macOS / Windows
侧栏、列表和检查器可并列，支持窗口变窄、合理的列宽限制与键盘导航。
macOS 使用相应菜单和 Command 习惯；Windows 使用其 Ctrl、窗口控制和无障碍惯例。不要用自绘 macOS 红黄绿灯替代 Windows 的窗口系统。
窗口缩到最小尺寸时，关闭/返回/保存仍可到达。一个窗口中尽量避免同向嵌套滚动。

### Android
共享任务语义，不照搬 iOS 返回手势、Sheet 外观或 SF 图标。适配系统返回、软键盘、字体缩放与大屏窗口变化。
原生 Compose 项目可参考官方 list-detail adaptive layout；WebView 实现必须验证具体容器和系统版本，不可把响应式截图叫作原生验收。

### Web
地址、历史、刷新、标准链接、文本选择、浏览器缩放是平台能力。除有明确理由，不阻断它们。
可安装 Web 应用、普通浏览器和桌面 WebView 的权限/存储/后台能力不同，分别说明。

## 3. 布局断点从内容推导
原创计算例，而非官方数值：
- 导航希望保留约 14rem；
- 列表至少 22rem 才能读清标题；
- 详情至少 24rem 才能编辑；
- 还要加分隔与外边距。
三栏需要约 60rem 以上的可用空间。若字体放大或本地化，实际需求会更大。
这是起点，不是 magic number；用实际最长内容测试，并给用户可收起的辅助栏。

实施时：
1. 记录当前 selectedId、draftId、filter 和 scroll anchor。
2. 根据可用宽度选择容器，不重新获取另一套对象。
3. 切换断点避免焦点落在已隐藏元素上。
4. 聚焦输入时不要因轻微窗口变化卸载表单。
5. 浮层正在退出时保留退出前宿主和 placement，避免 Teleport/Portal 跨根闪动。

## 4. 字体、尺寸与图标
- 原生 Apple 用语义文本样式与 Dynamic Type；固定数字只用于理解基线，不替代适配。
- Android 用其文字缩放机制与 sp 语义；不要把 CSS rem 宣称为等价的原生实现。
- Windows/Web 可以使用系统字体栈和相对单位，保留中文回退与行高。
- pt、dp、sp、CSS px 与设备像素不同；标注截图中的测量单位。
- 字号放大后优先换行、增长控件高度、减少并列信息，不裁掉按钮标签。
- 图标绘制 18px 不表示命中区只有 18px。为触摸和精确指针分别选择舒适目标；引用数值时保留平台条件。
- SF 字体和 SF Symbols 的许可另行适用。跨平台演示不分发它们，使用系统栈、文字或有明确许可的资产。

## 5. 语义 token 到平台材料
```text
surface.content → 稳定内容背景
surface.chrome  → 导航 / 工具栏功能面
surface.overlay → 临时任务容器
text.primary    → 主要内容
text.secondary  → 补充说明
action.primary  → 主动作
focus.visible   → 键盘当前目标
status.error    → 真实错误，不用于装饰
```

Apple 原生材质由系统实现；CSS backdrop-filter 只是视觉近似。
先画不透明基本层，再在支持的环境增强。材料透明化后要测最终合成背景上的文字，而不只测 token。
环境回退优先于品牌装饰；高对比与低透明度不应被 dark 类或用户自定义颜色覆盖。
Web 的 prefers-reduced-transparency 支持情况并不在所有容器相同；已有产品可提供同一语义的手动偏好。不能承诺未实测的操作系统联动。

## 6. 状态归属决定跨端可靠性
下面是架构示意，不要求项目新建这几个文件：
```text
原生 View / Web Component
          ↓ 用户意图
应用命令：renameTask(id, title, expectedRevision)
          ↓ 校验 / 权限 / 幂等
领域与存储：唯一已提交事实
          ↓ 结果
界面：成功更新，失败保留草稿
```

不要让桌面快捷键直接改数据库，而按钮经过命令服务；二者应走同一行为入口。
UI 草稿不是已提交事实。缩放、主题、分栏变化不能触发保存。
后台操作完成时不要把新界面的草稿覆盖成旧请求结果；以对象 ID 和请求归属判断。
离线/同步不是材质问题：必须显示本地已保存、待同步、同步失败的差别；本地保存失败绝不能显示“已同步”。

## 7. 原生与 Web 实现路线
### SwiftUI 路线
用 NavigationSplitView 表达列表—详情意图，窄布局的导航行为仍须设计；用语义 Text 样式和系统表单控件承接平台能力。
实际最低系统版本、selection 的数据类型和导航 API 以当前工程及官方文档核对。本 Skill 不提供未经编译的 SwiftUI 大段代码来伪装原生样例。

### Android Compose 路线
使用官方自适应布局作为候选，不按设备型号判定列数。检查系统 Back 行为和状态恢复。
本项目给映射决策，不声称已有可运行的 Android 工程。

### WinUI / Tauri 路线
WinUI 用窗口可用宽度和布局系统适应；Tauri 仍需处理 WebView 的焦点、原生窗口控制和平台能力边界。
浏览器构建通过只能说明 Web 层；原生菜单、窗口缩放、系统高对比和输入法仍须在壳里测试。

### Vue / React 路线
复用既有共享组件，语义 token 与状态入口保持统一。
Vue 特别检查 wrapper 的 fallthrough attrs；React 特别检查 props 是否传到实际 input/button、稳定 id 与列表 key。
应用已有 OverlayManager 时继续复用；示例原生 dialog 是没有该系统时的最小候选，不要求替换现有成熟实现。

## 8. 原创可运行示例
查看 [交互示例说明](../examples/interaction-lab/README.md)。离线 HTML 展示：
- 同一个对象从列表进入编辑；
- 原生 dialog 的模态与焦点恢复；
- 必填/长度校验、可见错误、模拟失败后重试；
- 深浅色、材料回退和长文字重排；
- 宽窄布局不丢输入。

它使用内存演示数据，不包含持久化、网络、原生平台代码或生产安全保证。用户刷新后回到初始内容，是已声明的示例限制，不是保存成功的产品实现。

## 9. 验证分层
| 证据 | 能说明什么 | 不能说明什么 |
| --- | --- | --- |
| 结构/类型测试 | API 与部分规则一致 | 画面可读、键盘可用 |
| 浏览器交互测试 | 当前引擎中的真实 DOM 行为 | 所有 WebView 或原生平台 |
| 固定视口截图 | 该窗口/字号/主题的布局 | 焦点、保存可靠性 |
| 原生壳测试 | 具体壳的集成 | 其它操作系统或机型 |
| 真机与读屏 | 指定设备和技术的体验 | 所有用户的可访问性认证 |

案例验收次序：常规流程 → 失败保留 → 键盘 → 宽窄与长文 → 主题偏好 → 目标壳。
记录软件版本、视口、语言、字号方式及未跑项。不要用“测试通过”概括没有执行的平台。

## 10. 官方实现入口
- [SwiftUI NavigationSplitView](https://developer.apple.com/documentation/swiftui/navigationsplitview)
- [Android adaptive list-detail](https://developer.android.com/develop/ui/compose/layouts/adaptive/list-detail)
- [Windows responsive layout](https://learn.microsoft.com/en-us/windows/apps/develop/ui/layouts-with-xaml)
- [Vue attributes](https://vuejs.org/guide/components/attrs.html)
- [HTML dialog](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element)
- [W3C media preferences](https://www.w3.org/TR/mediaqueries-5/)

