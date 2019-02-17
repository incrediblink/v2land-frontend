import config from './const';

const title = '浪潮 - 你的社会事件追踪工具';
const description = '浪潮是一个社会事件追踪工具。我们帮助你跟进社会事件的最新动态。你也可参与到信息整合的过程中，与社区成员一起添加社会事件与相关资讯，协助他人追踪事件进展。';

const plugins = [
  '~/plugins/element.js',
  '~/plugins/components.js',
  '~/plugins/clipboard.js',
  '~/plugins/lazyload.js',
  '~/plugins/polyfills.js',
  '~/plugins/gaDirective.js',
  '~/plugins/enderpearl.js',
  { src: '~/plugins/statusHandler', ssr: false },
  { src: '~/plugins/ga', ssr: false },
];

if (config.justfont) plugins.push({ src: '~/plugins/justfont', ssr: false });
else if (config.typekit) plugins.push({ src: '~/plugins/typekit', ssr: false });

export default {
  srcDir: __dirname,
  dev: true,
  /*
   ** Headers of the page
   */
  head: {
    title,
    meta: [
      { charset: 'utf-8' },
      { 'name': 'viewport', 'content': 'width=device-width, initial-scale=1.0, shrink-to-fit=no, maximum-scale=1.0, user-scalable=no, viewport-fit=cover' },
      { name: 'lang', property: 'lang', content: 'zh-hans' },
      { name: 'keywords', content: '浪潮,社会事件,事件,中国,追踪,社会,关注,langchao,v2land' },
      { hid: 'description', name: 'description', content: description },
      { hid: 't:card', name: 'twitter:card', content: 'summary' },
      { hid: 't:site', name: 'twitter:site', content: '@Wave2Land' },
      { hid: 't:title', name: 'twitter:title', content: title },
      { hid: 't:description', name: 'twitter:description', content: description },
      { hid: 't:image', name: 'twitter:image', content: 'https://assets.v2land.net/twitter-icon.png' },
      { hid: 'og:title', property: 'og:title', content: title },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:description', property: 'og:description', content: description },
      { hid: 'og:image', name: 'og:image', content: 'https://assets.v2land.net/twitter-icon.png' },
      { hid: 'og:site_name', name: 'og:site_name', content: '浪潮' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.ico' },
    ],
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: '#19B5FE' },
  /*
   ** Build configuration
   */
  build: {
    vendor: [
      'postman-url-encoder',
      'js-cookie',
      '~/const',
    ],
    publicPath: config.publicPath,
  },

  css: [
    '~/assets/common.scss',
    '~/assets/EventAction.scss',
    '~/assets/icon.css',
    '~/static/element/tooltip.css',
    '~/static/element/base.css',
    '~/static/element/icon.css',
    '~/static/element/form.css',
    '~/static/element/form-item.css',
    '~/static/element/col.css',
    '~/static/element/input.css',
    '~/static/element/input-number.css',
    '~/static/element/select.css',
    '~/static/element/select-dropdown.css',
    '~/static/element/button.css',
    '~/static/element/button-group.css',
    '~/static/element/spinner.css',
    '~/static/element/scrollbar.css',
    '~/static/element/message.css',
    '~/static/element/popover.css',
    '~/static/element/dropdown.css',
    '~/static/element/dropdown-menu.css',
    '~/static/element/dropdown-item.css',
    '~/static/element/dialog.css',
    '~/static/element/loading.css',
    '~/static/element/tag.css',
    '~/static/element/switch.css',
  ],

  plugins,

  router: {
    middleware: ['auth', 'checkEvent', 'permission', 'countRedirect'],
    linkExactActiveClass: 'exact-active-link',
  },

  serverMiddleware: [
    '~/serverMiddleware/redirect',
  ],

  modules: [
    '@nuxtjs/router',
    '@nuxtjs/axios',
    ['@nuxtjs/google-analytics', {
      id: config.ga,
    }],
  ],

  axios: {
    baseURL: config.api,
    credentials: true,
  },
};
