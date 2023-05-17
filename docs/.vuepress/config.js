import { defineUserConfig, defaultTheme } from "vuepress";

export default defineUserConfig({
  lang: "en-US",
  title: "Hello VuePress",
  description: "Just playing around",
  theme: defaultTheme({
    // default theme config
    navbar: [
      {
        text: "Home",
        link: "/",
      },
    ],
    sidebar: [
      // SidebarItem
      {
        text: "首页",
        link: "/",
      },
      {
        text: "git",
        link: "/git/",
      },
    ],
  }),
});
