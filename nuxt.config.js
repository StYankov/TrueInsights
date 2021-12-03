export default {
  server: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
    timing: {
      total: true
    }
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'true-insights',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;0,700;0,800;1,300&display=swap' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' }

    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/styles/global.scss'
  ],
  styleResources: {
    scss: [
      '@/assets/styles/_variables.scss',
      '~/node_modules/bootstrap/scss/_functions.scss',
      '~/node_modules/bootstrap/scss/_variables.scss',
      '~/node_modules/bootstrap/scss/_mixins.scss'

    ]
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.js',
    { src: '~/plugins/vue-sweetalert2.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    ['nuxt-fontawesome', {
      component: 'fa', //customize component name
      imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['faSearch', 'faChevronDown', 'faChevronUp', 'faFileInvoiceDollar', 'faUsers', 'faNetworkWired',
              'faSignOutAlt', 'faHome', 'faChartLine', 'faCog', 'faTrash', 'faStar', 'faTimes']
          },
          {
            set: '@fortawesome/free-regular-svg-icons',
            icons: ['faBell']
          }
      ]
   }],
   '@nuxtjs/style-resources'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    icons: false
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_URL + '/api/v1',
    credentials: true
  },
  auth: {
    redirect: {
      home: '/',
      login: '/auth/login',
      logout: '/auth/login'
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          maxAge: 0
        },
        user: {
          property: false
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'token' },
          user: { url: '/user', method: 'get', property: false },
          logout: { url: '/auth/logout', method: 'post' }
        }
      }
    }
  },
  router: {
    middleware: ['auth']
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      compact: true,
      plugins: [
        ["@babel/plugin-proposal-private-methods", { "loose": true }]
      ]
    }
  },
  env: {
    baseURL: process.env.BASE_URL || 'http://stoil.com:8000',
    keywordsLimit: 10
  }
}
