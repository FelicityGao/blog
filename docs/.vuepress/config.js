module.exports = {
  base: '/Blog_view/',
  title: "Felicity的笔记本",
  description: '旧书不厌百回读，熟读深思子自知',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  markdown: {
    lineNumbers: true   // 代码块显示行号
  },
  themeConfig: {
    logo: '/avatar.png',  // 左上角logo
    displayAllHeaders: true,
    lastUpdated: '上次更新时间', // string | boolean
    nav: [ // 导航栏配置
      {
        text: '分类指引', items: [
          { text: 'Js', link: '/Js/' },
          { text: 'Vue', link: '/Vue/' },
          { text: 'React', link: '/React/' },
          { text: 'Vscode', link: '/Vscode/' }
        ]
      },
      { text: 'GitHub', link: 'https://github.com/Felicity-Gao' },
      { text: '简书主页', link: 'https://www.jianshu.com/u/56e563067653' }
    ],
    sidebar: {
      '/Js/': [
        {
          title: 'JS基础',   // 必要的
          sidebarDepth: 1,    // 可选的, 默认值是 1
          children: [
            '',
            '数组操作方法',
            '节点操作'
          ]
        },
        {
          title: '深入学习',   // 必要的
          sidebarDepth: 1,    // 可选的, 默认值是 1
          children: [
            '防抖与节流'
          ]
        }
      ],
      '/React/': [
        {
          title: 'React',   // 必要的
          sidebarDepth: 1,    // 可选的, 默认值是 1
          children: [
            '',      /* /React/ */
            'ref', /* /React/ref.html */
            'umiJs'   /* /React/umiJs.html */
          ]
        }

      ],

      // fallback
      '/': [
        ''        /* / */
      ]
    }
  }
}