# 组件契约：从外观到行为
本页为原创工程指南。每种组件同时定义用途、状态、输入、反馈与降级；具体平台实现以对应平台文档为准。
目录：公共契约 → 按钮 → 字段 → 选择 → 列表 → 导航 → 浮层 → 反馈 → 材质 → 评审。

## 1. 公共契约
一个圆角矩形不是完整组件。交付时至少能回答：
1. 它代表动作、值、位置还是状态？
2. 接收什么输入，哪些输入被拒绝？
3. 默认、hover、pressed、focus、disabled、busy、error、selected 中哪些适用？
4. 键盘和触摸如何完成同一目标？
5. 辅助技术读出什么名称、角色、值和关系？
6. 异步结果、失败与取消怎么处理？
7. 大字、长文、高对比、低透明度时还保留哪些信息？
8. 是否复用共享组件，是否通过真实调用者验收？

不适用的状态明确写 N/A。例如非交互 badge 不需要 hover，普通按钮不需要 selected。

## 2. Button / IconButton
### 用途与层级
Primary：当前容器里最重要且非危险的提交动作。
Secondary：同任务的替代行动。Ghost：低强调但仍可发现的命令。
Destructive：表达危险后果，不是“红色的主按钮”。
在一组按钮中让主次由填充、边界与位置一致表达，不依靠把主按钮做大两倍。

### 状态表
| 状态 | 视觉 | 行为/语义 |
| --- | --- | --- |
| 默认 | 清楚标签，命中区域完整 | 可点击，默认 type=button |
| hover | 轻背景或边界变化 | 不作为唯一入口 |
| pressed | 短而稳定的反馈 | 不让布局跳动；减少动效下不缩放 |
| focus-visible | 有对比的连续轮廓 | 与 selected 不混淆 |
| disabled | 弱化但仍能辨认 | 不执行；有必要时在附近解释原因 |
| busy | “保存中…”或稳定进度提示 | 防止重复提交，aria-busy 反映实际状态 |
| destructive | 危险语义色与具体文案 | 不默认聚焦不可逆动作 |

IconButton 的名称描述动作，例如“关闭任务详情”，不是“叉号”；装饰图标从读屏树排除。Tooltip 只补发现性，不补救一个没有名称的按钮。
按钮内不能嵌另一个按钮或链接。对象行中“打开”和“完成”是同级独立目标。
长按钮标签应该换行；固定高度需改为 min-height。只有空间狭小且确有展开路径时才允许省略。
进度图标出现时预留空间，避免保存按钮在指针下移动。

原创示例：
```html
<button type="submit" aria-busy="false">
  保存更改
</button>
<button type="button" aria-label="关闭任务详情">
  <span aria-hidden="true">×</span>
</button>
```
保存期间更新按钮内容和 disabled。不要把 aria-busy 当作防重逻辑。

## 3. Field / TextInput / Textarea
Label 告诉人“输入什么”；hint 告诉人格式或作用；error 告诉人为何未接受与如何修复。placeholder 只是临时提示，不替代 label。
readonly 可聚焦、复制但不可编辑；disabled 通常不可聚焦且不参与原生表单提交，二者不可混用。

原创关系示例：
```html
<label for="task-title">任务标题</label>
<input id="task-title" name="title" required maxlength="120"
       aria-describedby="title-hint title-error">
<p id="title-hint">用一句话描述这次要完成的事。</p>
<p id="title-error" hidden></p>
```
校验失败时设置 aria-invalid=true，填入错误并显示；通过后清除无效态。不要每次输入都把焦点拉回。
多个错误时给摘要和字段链接；摘要数量必须与实际错误一致。
密码使用安全输入，URL/邮箱根据语义配置键盘；inputmode 只是键盘提示，不代替校验。

### Vue 封装容易遗漏的边界
Vue 的非 props 属性默认透传到根元素。根是 div 时，required、min、aria-label、inputmode 等可能错误落在 div。
自定义 Field 应明确：
- class/style 属于外部布局还是实际 input；
- id 是否调用者可覆盖，与 label.for 同步；
- attrs 和事件传给实际交互目标；
- value 与 update:modelValue 的职责，不把父层模型直接改写；
- 中文组合事件由浏览器/框架正常处理。

来源：[Vue Fallthrough Attributes](https://vuejs.org/guide/components/attrs.html)。
不能把这个示例直接推广到所有多根组件；属性归属由组件 API 决定。

## 4. Checkbox / Switch / Radio / Select
| 需求 | 优先考虑 | 不要误用 |
| --- | --- | --- |
| 多个互相独立选项 | Checkbox | 用单选强迫只选一个 |
| 即时启停一个设置 | Switch | 用开关打开下一页或执行删除 |
| 一组互斥选项 | Radio 或合适的 Select | 多个互相矛盾的开关 |
| 在有限值中选择 | 原生 Select / 平台 Picker | 所有值都伪装成菜单命令 |
| 执行一组命令 | Menu / 动作列表 | 选值后不显示当前值 |

Switch 标签保持稳定，例如“启用提醒”，状态用开/关表达；不要在关时把名称改成“开启提醒”，在开时改成另一句。
Checkbox 混合态不是第三个用户选项，常表示子项部分选中。提交语义必须明确。
原生表单控件更容易继承键盘与语义，但仍要把可见部分按产品主题整合；“原生优先”不等于暴露不一致的浏览器默认 UI。

自定义 Listbox 需要完整方向键、Home/End、选择和关闭策略。普通弹出列表不自动等于 combobox；只有具备相应模式时才声明角色。
先查 [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/)，不要根据控件长得像什么猜角色。

## 5. List / Row / Table
列表适合单对象连续浏览；表格适合跨对象按相同字段比较。不为视觉整齐把复杂对象强塞表格。
行结构：主要标题、必要次要信息、状态、常用动作。不要把每个元数据都变成同等重量的 badge。
空白区域点击打开对象时，Checkbox、链接和菜单不应冒泡触发打开。

选中与焦点：
- selectedId 表示当前查看对象；
- focusedId 表示键盘定位；
- checkedIds 表示批量操作集合；
- completed 是业务状态。
四者不能共用一个 selected 布尔值。

长列表虚拟化要保留可访问名称、焦点对象与滚动定位；渲染性能优化不能让键盘焦点对象突然卸载。
表格隐藏列时仍提供关键操作；不能藏掉状态或对象名称。筛选/排序变化要说明当前结果范围。

## 6. Navigation / Tabs / Toolbar
目的地用导航语义；动作使用 button。Web 中可分享页面优先有真实地址与历史返回。
Tabs 表达一组关联面板；主应用导航不必伪装 role=tablist。
只有真正的 tabs 才采用对应方向键与 aria-selected 行为；aria-current 用于当前导航目的地。

工具栏按动作关系分组，隐藏次要动作时仍有可发现入口。
在窄屏把工具条变成局部横滚是一个选择，但不能让整个页面横滚，也不能让主动作永远处在屏外。
快捷键在 tooltip/菜单中展示；不覆盖平台剪贴板、文本选择和输入法。Ctrl 与 Command 按运行平台映射。

## 7. Dialog / Sheet / Popover / Inspector
### 先定是否模态
需要暂停背景完成短任务：模态。反复调整并查看背景：非模态面板。
外观像抽屉不代表 aria-modal=true。大屏侧边检查器通常不需要隔离整个应用。

### 模态契约
- 有清楚标题和可访问名称；
- 初始焦点按内容选择：短表单首字段、长说明可聚焦标题、危险确认优先安全动作；
- Tab 不进入背景；Escape 遵守草稿保护策略；
- 关闭后回到触发器，触发器不再存在时选择合理后继；
- 键盘、遮罩、按钮关闭共用同一退出逻辑；
- 忙碌时不把未完成请求伪装为取消成功；
- 浮层栈只有顶层响应 Escape，tooltip 不夺取输入焦点。

Web 可以优先用原生 dialog.showModal() 获得顶层与背景隔离，再补名称、布局和数据保护。
不要手写半套 focus trap 再遗漏动态控件。已有 OverlayManager 时也不应另起并行系统。
参考：[HTML dialog](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element)、[APG modal dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)。

### 空间与滚动
标题/动作若固定，正文成为唯一滚动区；最后一行字段要能滚到动作栏上方。
软键盘出现后依然能看到输入与错误。使用动态可用高度与安全区，但必须在目标容器验证。
锚定 Popover 在边缘翻转或避让，不覆盖触发器到无法理解来源；窄屏可转换为 sheet，保留草稿与所选值。

## 8. Feedback / Empty / Error / Progress
| 情形 | 反馈位置与语气 | 恢复 |
| --- | --- | --- |
| 字段格式错误 | 字段附近具体说明 | 保留输入，直接修正 |
| 保存失败 | 表单内明显但不惊吓 | 重试/复制草稿；不自动退出 |
| 可撤销完成 | 对象更新 + 温和确认 | 可发现的撤销路径 |
| 全局服务不可用 | 页面级状态 | 解释受影响范围 |
| 危险不可逆动作 | 预先确认后果 | 默认提供安全退出 |
| 初次无数据 | 当前页面上下文 | 合理第一步 |
| 筛选无结果 | 保留筛选条件 | 调整/清除 |

role=status 用于不紧急的结果；role=alert 用于需要及时关注的错误，不把每个加载百分比都当警报。
能测量才显示百分比；否则显示正在做什么。骨架形状应接近真实结构，不虚构内容。
toast 的时限不能成为完成关键操作的唯一窗口，尤其撤销或错误修复。用户正在聚焦或交互时不消失。

## 9. Material / Focus / Motion
材质按功能层应用，不按“所有卡片都高级”应用。内容表面先提供稳定底色，再用玻璃增强导航。
回退需要同时解决背景、滤镜、边界与焦点。仅 backdrop-filter:none 可能留下透明底。
深色选择器常比 :root 更具体，回退规则要在深色下也实际生效。
forced-colors 会改变阴影与颜色表现，焦点用实体轮廓；不能全局 forced-color-adjust:none。
关闭动效后仍保留状态反馈。删除动效可能依赖布局容器的寿命，不要承诺未实现的跨列表动画。

## 10. 单组件评审记录
```text
组件：TaskField
调用者：创建任务、编辑任务、搜索过滤
问题：required 落在 wrapper，原生校验失效
选择：透传到 input，布局 class 留在 wrapper
证明：空值 checkValidity=false；名称关联正确；父事件仅触发一次
边界：未改变后端业务校验；没有声称全部浏览器已通过
```
后续设计工作应留下这种可复查证据，而不只是“采用 Apple 风格”。

