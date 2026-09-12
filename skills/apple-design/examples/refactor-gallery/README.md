# Web 重构案例画廊

这是一个零业务依赖的浏览器示例，用相同核心数据比较三类桌面 Web 页面：商品详情、数据仪表盘与内容编辑器。顶部可切换场景及 `Before` / `After`；查询参数可固定状态，例如 `?case=dashboard&view=before`。

三类案例先从公开原型中选取任务母版，再换成虚构品牌、固定数据和本地 CSS 图形制作可重复基线：

- 商品详情：[Spree Storefront](https://github.com/spree/storefront)（MIT，研究快照 `2ad6ad5bd1bc`）
- 数据仪表盘：[shadcn/ui `dashboard-01`](https://ui.shadcn.com/blocks)（MIT，研究快照 `3ba91b1cc83e`）
- 内容编辑器：[Puck](https://github.com/puckeditor/puck)（MIT，研究快照 `b0d5b49fa190`）

这些上游仓库和在线 Demo 是原型来源，不是本目录代码的直接来源。完整应用、品牌素材和外部数据均未复制进 Skill；本目录的 HTML、CSS、JavaScript 和截图是项目自制的轻量适配与重构实现。

从仓库根目录启动静态服务器：

```sh
python -m http.server 18543 --bind 127.0.0.1 --directory skills/apple-design/examples/refactor-gallery
```

然后打开 <http://127.0.0.1:18543>。示例包含规格选择、购物袋反馈、时间范围、异常选择、编辑自动保存、预览与发布确认；所有数据只存在于当前页面，刷新即重置，不会产生订单、发布内容或调用外部服务。

案例的“重构前”是依据上述任务母版制作的本地基线，不是上游项目原样截图；“重构后”应用本 Skill 的页面合同、层级、组件状态、反馈、键盘与响应式规则。截图只能证明对应 Web 视口的可见状态，不能替代原生平台、读屏或生产业务验证。
