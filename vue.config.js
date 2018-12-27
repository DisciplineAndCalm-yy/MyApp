module.exports = {
  assetsDir: 'public',
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/scss/base.scss";'
      }
    }
  },
  pages: {
    index: {
      entry: 'src/index/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    admin: {
      entry: 'src/admin/main.js',
      template: 'public/admin.html',
      filename: 'admin.html',
    }
  },
  devServer: {
    proxy: {
      '/': {
        // 目标 API 地址
        // target: 'http://47.105.92.46',
        // target: 'http://47.105.145.225:8080/',
        // target: 'http://127.0.0.1:7001',
        target: 'http://www.hterobot.com/',
        //  target:"http://192.168.0.124:7001/", //node接口测试代理
        // 如果要代理 websockets
        ws: false,
        // 将主机标头的原点更改为目标URL
        changeOrigin: true
      }
    }
  }
}