# 网站内容更新指南（Eleventy）

本仓库是使用 Eleventy（11ty）构建的静态网站。所有内容源文件都在 `src/` 下，构建产物在 `_site/`（不要手动编辑 `_site/`）。下面是按“常见更新场景”整理的详细操作指南。

## 1. 目录结构速览

- `src/`：内容源文件（主要编辑这里）
  - `index.md`：主页
  - `about.md`、`research.md`、`publications.md`、`lab-members.md`、`alumni.md`、`conferences.md`、`openings.md`、`contact.md`：各栏目页面
  - `news/`：新闻列表与新闻详情
  - `_data/site.json`：站点名称、导航菜单
  - `_includes/layouts/`：页面布局模板
  - `assets/`：样式、脚本等静态资源（会原样拷贝到站点）
  - `uploads/`：图片与附件（会原样拷贝到站点）
- `_site/`：构建输出目录（自动生成，勿手改）
- `.github/workflows/pages.yml`：GitHub Pages 自动部署配置

## 2. 常见页面更新（首页/研究/成员/出版物/招生等）

这些页面都是“Markdown + HTML 混排”，直接修改对应的 `.md` 文件即可。

- 首页：`src/index.md`
- 研究：`src/research.md`
- 论文：`src/publications.md`
- 成员：`src/lab-members.md`
- 校友：`src/alumni.md`
- 会议：`src/conferences.md`
- 招生：`src/openings.md`
- 联系：`src/contact.md`
- 关于：`src/about.md`

每个页面头部都有 Front Matter，格式类似：

```yaml
---
title: "Publications"
permalink: "/publications/"
layout: layouts/page.njk
---
```

通常只需要修改正文内容；除非要调整 URL 或布局，否则不要改 `permalink` 和 `layout`。

## 3. 新闻（News）更新

新闻在 `src/news/` 目录下，每条新闻是一个 `.md` 文件。

### 3.1 新增一条新闻

1. 在 `src/news/` 新建一个文件，文件名建议：
   - `年-月-简短标题.md` 或 `数字-简短标题.md`
   - 例：`2026-01-new-paper-accepted.md`
2. 写入 Front Matter（必填）：

```yaml
---
title: "2026/01 - 新论文被接受"
date: 2026-01-15
tags: [news]
layout: layouts/news-item.njk
permalink: "/news/2026-01-new-paper-accepted/"
---
```

3. 在正文里写内容（可用 Markdown 或 HTML）。

> 注意：新闻列表是按 `date` 字段倒序排列的，所以一定要写正确日期。

### 3.2 修改或删除新闻

- 修改：直接编辑对应的 `.md` 文件。
- 删除：删除该文件即可。

新闻列表页：`src/news/index.md`（一般不需要改）

## 4. 图片/附件更新（uploads）

图片和附件放在 `src/uploads/` 下，构建时会原样复制到 `/uploads/`。

### 推荐做法

- 按年份/月份建立文件夹，例如：`src/uploads/2026/01/`。
- 文件名尽量简洁、英文/数字、用短横线连接。

### 在页面里引用图片

- 绝对路径引用：

```html
<img src="/uploads/2026/01/lab-photo.jpg" alt="Lab Photo" />
```

- Markdown 语法也可：

```markdown
![Lab Photo](/uploads/2026/01/lab-photo.jpg)
```

> 如果需要和现有风格一致，可以参考 `lab-members.md` 和 `index.md` 里已有的 HTML 图片标签写法。

## 5. 修改导航菜单（顶部菜单）

导航菜单配置在 `src/_data/site.json`：

```json
"nav": [
  { "label": "Home", "url": "/" },
  { "label": "Research", "url": "/research/" }
]
```

- 要新增页面到菜单：在 `nav` 数组中加一项。
- 要改菜单顺序：调整数组顺序。
- 要隐藏页面：删除该项即可（不影响页面本身）。

## 6. 本地预览与构建

> 第一次使用请先安装依赖。

```bash
npm install
npm run serve
```

- `npm run serve` 会启动本地开发服务器，修改文件后会自动刷新。
- 生产构建：

```bash
npm run build
```

输出在 `_site/`。

## 7. 发布到线上（GitHub Pages）

该仓库使用 GitHub Actions 自动部署（见 `.github/workflows/pages.yml`）。

发布步骤：
1. 本地完成修改并预览确认。
2. 提交并推送到 `main` 分支：

```bash
git add -A
git commit -m "Update site content"
git push origin main
```

3. 推送后 GitHub Actions 会自动构建并部署到 Pages。

## 8. 常见问题与提示

- **不要手改 `_site/`**：它是构建产物，会被重新生成。
- **日期格式**：新闻 `date` 使用 `YYYY-MM-DD`。
- **编码问题**：若看到 `Â`、`â€™` 等乱码，说明原文本编码或粘贴来源有问题，建议清理后重新粘贴。
- **链接检查**：更新后建议在本地预览并点一下新增链接，确认路径正确。
- **大文件/图片**：尽量压缩后再放入 `uploads/`，避免仓库过大、加载慢。

## 9. 快速操作清单（TL;DR）

- 改页面：编辑 `src/*.md`
- 加新闻：新增 `src/news/*.md`（含 front matter）
- 加图片：放到 `src/uploads/` 并用 `/uploads/...` 引用
- 改菜单：编辑 `src/_data/site.json`
- 本地预览：`npm run serve`
- 发布上线：`git add/commit/push` 到 `main`