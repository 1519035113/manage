module.exports = {

  publicPath: './',
  // 配置开发服务器
  devServer: {
    // 配置端口号
    port: 8080,
    // 配置服务器自动打开浏览器
    open: true,
    // 是否开启https协议
    https: false,
    // 设置主机名
    host: "localhost",

  },
  // 关闭eslint
  lintOnSave: false,
  productionSourceMap: false,
  // 自定义打包入口
  chainWebpack: config => {
    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev')

      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })

    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod')

      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        lodash: '_',
        echarts: 'echarts',
        nprogress: 'NProgress',
        'vue-quill-editor': 'VueQuillEditor'
      })
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })
  }
}