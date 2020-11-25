module.exports = {

    publicPath: './',
    // 配置开发服务器
    devServer: {
      // 配置端口号
      port: 8000,
      // 配置服务器自动打开浏览器
      open: true,
      // 是否开启https协议
      https:false,
      // 设置主机名
      host: "localhost",
      proxy: {
        [process.env.VUE_APP_BASE_API]: { // 代理的地址
  
          target: process.env.VUE_APP_SERVICE_URL,
          // ws: true,
          changeOrigin: true, // 开启代理
          pathRewrite: { // 重写路径
            ['^' + process.env.VUE_APP_BASE_API]: ''
          }
        },
  
      },
      
  
    },
    // 关闭eslint
    lintOnSave: false
  }