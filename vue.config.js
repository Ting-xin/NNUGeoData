module.exports = {
    lintOnSave:false,//关闭ESLint代码检验

    devServer: {
        open:true,//run启动的时候是否弹出页面
        host:'localhost',//本机地址
        port:'8080',//端口号
        https:false,
        hotOnly:false,
        proxy: {
            // 配置跨域
            '/api':{
                // target:'http://172.21.212.143:8999',
                target:'http://127.0.0.1:8999',
                ws:true,
                timeout:3600000,
                changOrigin:true,
                pathRewrite:{
                    '^/api':'',
                }
            },
            '/api2':{
                target:'http://geomodeling.njnu.edu.cn/',
                ws:true,
                timeout:3600000,
                changOrigin:true,
                pathRewrite:{
                    '^/api2':'',
                }
            },
        }
    }
}
