const path = require("path");

module.exports = {
    // 站点配置
    base: "/axios-client/",
    lang: "zh-CN",
    title: "AxiosClient",
    description: "Axios 易用性封装",
    head: [["link", { rel: "icon", href: "/logo.png" }]],
    // 主题和它的配置
    theme: "@vuepress/theme-default",
    themeConfig: {
        logo: "/logo.png",
        repo: "cn-src/axios-client",
        editLink: false,
        navbar: [
            {
                text: "jany",
                link: "http://106.15.203.228/",
            },
            {
                text: "gitee",
                link: "https://gitee.com/cn-src/axios-client",
            },
        ],
    },
    markdown: {
        code: {
            lineNumbers: false,
        },
    },
    bundlerConfig: {
        build: {},
    },
    plugins: [
        [
            "@vuepress/container",
            {
                type: "right",
                defaultTitle: "",
            },
        ],
        [
            "@vuepress/container",
            {
                type: "theorem",
                before: (info) => `<div class="custom-container theorem"><p class="title">${info}</p>`,
                after: () => "</div>\n",
            },
        ],
        [
            "@vuepress/plugin-search",
            {
                locales: {
                    "/": {
                        placeholder: "搜索",
                    },
                },
            },
        ],
    ],
};
