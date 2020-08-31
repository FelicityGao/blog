module.exports = {
  base: '/',
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
          { text: 'Vue', link: '/Vue/Vue基础/插槽' },
          { text: 'React', link: '/React/umiJs' },
          { text: 'Vscode', link: '/Vscode/主题及配色' },
          { text: '数据结构与算法', link: '/数据结构与算法/' }
        ]
      },
      {
        text: '延伸拓展', items: [
          { text: '交互设计', link: '/交互设计/' },
        ]
      },
      { text: 'GitHub', link: 'https://github.com/Felicity-Gao' },
      { text: '简书主页', link: 'https://www.jianshu.com/u/56e563067653' }
    ],
    sidebar: {
      '/Js/': [
        {
          title: 'JS基础',   // 必要的
          sidebarDepth: 0,    // 可选的, 默认值是 1
          children: [
            '',
            '数组操作方法',
            '节点操作',
            '知识杂记'
          ]
        },
        {
          title: '深入学习',   // 必要的
          sidebarDepth: 0,    // 可选的, 默认值是 1
          children: [
            '防抖与节流',
            '设计模式',
            '高阶函数'
          ]
        }
      ],
      '/React/': [
        {
          title: 'React',   // 必要的
          sidebarDepth: 0,    // 可选的, 默认值是 1
          children: [
            'ref', /* /React/ref.html */
            'umiJs',   /* /React/umiJs.html */
            'Hook'
          ]
        }

      ],
      '/Vue/': [
        {
          title: 'Vue基础',   // 必要的
          sidebarDepth: 1,    // 可选的, 默认值是 1
          children: [
            ['Vue基础/插槽', '插槽'],
            ['Vue基础/父子组件', '父子组件'],
            ['Vue基础/计算属性', '计算属性'],
          ]
        },
        {
          title: '源码解析',   // 必要的
          sidebarDepth: 0,    // 可选的, 默认值是 1
          children: [
            ['源码解析/入口文件及编译实现', '入口文件及编译实现'],  // [link, text]
          ]
        }

      ],
      '/Vscode/': [
        '插件',
        '主题及配色'
      ],
      '/数据结构与算法/': [
        {
          title: '数据结构与算法',   // 必要的
          sidebarDepth: 0,    // 可选的, 默认值是 1
          children: [
            '',    /* /数据结构与算法/ */
            '栈',
            '队列',
            '链表',
            '字典',
            '散列',
            '集合'
          ]
        }

      ],
      '/': [
        ''        /* / */
      ]
    }
  }
}