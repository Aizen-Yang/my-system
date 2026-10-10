# Aizen Yang 的个人网站

网站：https://aizen-yang.github.io/my-system/

发布入口：https://aizen-yang.github.io/my-system/publish/

直接上传：https://github.com/Aizen-Yang/my-system/upload/master/inbox

上传一个或多个 Markdown 文件，提交到 master 后 GitHub Actions 自动构建和发布。标题优先使用 Markdown 的一级标题，日期取文件首次上传提交日期，摘要自动从正文提取。同名文件可更新；draft: true 不发布。手工元数据优先。

首页和栏目配置在 site.yaml。原有仓库内容已按用户要求替换，Git 历史保留。构建生成的文章不提交至仓库，输入文件保留在 inbox/。

本地开发：npm ci，然后 node scripts/import-markdown.mjs，再 npm run dev。构建：node scripts/import-markdown.mjs && npm run build。

字体由用户提供，不适用项目 MIT 许可。
