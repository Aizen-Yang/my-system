import type { UIStrings } from "../types";

export default {
  nav: {
    home: "首页",
    posts: "文章",
    tags: "标签",
    about: "关于",
    archives: "归档",
    search: "搜索",
  },
  post: {
    publishedAt: "发布于",
    updatedAt: "更新于",
    sharePostIntro: "Share this post:",
    sharePostOn: "Share this post on {{platform}}",
    sharePostViaEmail: "Share this post via email",
    tagLabel: "标签",
    backToTop: "回到顶部",
    goBack: "返回",
    editPage: "Edit page",
    previousPost: "上一篇",
    nextPost: "下一篇",
  },
  pagination: {
    prev: "上一页",
    next: "下一页",
    page: "页",
  },
  home: {
    socialLinks: "Social Links",
    featured: "精选文章",
    recentPosts: "最近文章",
    allPosts: "所有文章",
  },
  footer: {
    copyright: "Aizen Yang",
    allRightsReserved: "保留所有权利。",
  },
  pages: {
    tagTitle: "Tag",
    tagDesc: "All the articles with the tag",

    tagsTitle: "标签",
    tagsDesc: "按标签浏览文章。",

    postsTitle: "文章",
    postsDesc: "按时间浏览全部文章。",

    archivesTitle: "归档",
    archivesDesc: "浏览文章归档。",

    searchTitle: "搜索",
    searchDesc: "搜索文章内容……",
  },
  a11y: {
    skipToContent: "跳至正文",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    toggleTheme: "切换主题",
    searchPlaceholder: "搜索文章……",
    noResults: "没有找到结果",
    goToPreviousPage: "Go to previous page",
    goToNextPage: "Go to next page",
  },
  notFound: {
    title: "404 Not Found",
    message: "页面不存在",
    goHome: "返回首页",
  },
} satisfies UIStrings;
