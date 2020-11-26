module.exports = {

    publicPath: './',
    // 配置开发服务器
    devServer: {
      // 配置端口号
      port: 8080,
      // 配置服务器自动打开浏览器
      open: true,
      // 是否开启https协议
      https:false,
      // 设置主机名
      host: "localhost",

    },
    // 关闭eslint
    lintOnSave: false
  }