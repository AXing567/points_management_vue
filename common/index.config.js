const CONFIG = {
    // 开发环境配置
    development: {
		assetsPath: '/static', // 静态资源路径
		baseUrl: 'https://w204882q59.zicp.fun', // 后台接口请求地址
		hostUrl: '', // H5地址(前端运行地址)
		weixinAppId: '', // 微信公众号appid
		WebUrl: 'https://w204882q59.zicp.fun' // 后台地址
    },
    // 生产环境配置
    production: {
        assetsPath: '/static', // 静态资源路径
        baseUrl: 'https://w204882q59.zicp.fun', // 后台接口请求地址
        hostUrl: '', // H5地址(前端运行地址)
        weixinAppId: '', // 微信公众号appid
        WebUrl: 'https://w204882q59.zicp.fun' // 后台地址

    }

};
export default CONFIG[process.env.NODE_ENV];
