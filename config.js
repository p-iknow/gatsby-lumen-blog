'use strict';

module.exports = {
  url: 'https://p-iknow.netlify.com/',
  title: "p-iknow's devlog",
  subtitle: '잘하기 위해 자랍니다.',
  copyright: '© All rights reserved.',
  disqusShortname: 'p-iknows-devlog',
  utterancesConfig: {
    src: 'https://utteranc.es/client.js',
    repo: 'P-iknow/p-iknow-devlog-comment',
    issueTerm: 'title',
    label: 'comment',
    theme: 'github-light',
    crossorigin: 'anonymous',
    async: true,
  },
  postsPerPage: 6,
  googleAnalyticsId: 'UA-110581115-1',
  menu: [
    {
      label: 'Articles',
      path: '/',
    },
    {
      label: 'About me',
      path: '/pages/about',
    },
    {
      label: 'Log',
      path: '/tag/log',
    },
    {
      label: 'Algorithm',
      path: '/category/algorithm',
    },
    {
      label: 'Category',
      path: '/categories',
    },
  ],
  author: {
    name: 'P-iknow(피아노)',
    photo: '/profile.jpg',
    bio: '잘하기 위해 자랍니다.',
    contacts: {
      email: 'apricotsoul@gmail.com',
      twitter: 'iknow_p',
      github: 'P-iknow',
      rss: '#',
      facebook: 'devpiknow',
    },
  },
};
