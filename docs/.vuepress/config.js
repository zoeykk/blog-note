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
        text: "Guide",
        link: "/",
        children: [
          {
            text: "github",
            link: "/guide/",
          },
        ],
      },
    ],
  }),
});
