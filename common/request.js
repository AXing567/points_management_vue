import con from './index.config.js'
import util from './util.js'
import cache from './cache.js'

module.exports = {
	get: function (url, data, options = {}) {
		return this.request({
			url,
			data,
			method: 'GET',
			...options
		});
	},
	post: function (url, data, options = {}) {
		return this.request({
			url,
			data,
			method: 'POST',
			...options
		});	
	},
	/**
	 * @Function
	 * @param {Object} options - 请求配置项
	 * @prop {String} options.url - 请求路径
	 * @prop {Object} options.data - 请求参数
	 * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - 响应的数据类型
	 * @prop {Object} [options.dataType = config.dataType] - 如果设为 json，会尝试对返回的数据做一次 JSON.parse
	 * @prop {Object} [options.header = config.header] - 请求header
	 * @prop {Object} [options.method = config.method] - 请求方法
	 * @returns {Promise<unknown>}
	 */
	request:function (options = {}) {
		options.header = options.header || "application/json";
		options.url = options.url || '';
		options.data = options.data || {};
		// options.data.token = cache.get('token');
		options.method = options.method || 'POST';
		// 该方法里进行封装服务端接口需要的检验数据，以及一些常规的流程封装，如下（根据自己逻辑进行封装)
		//options.data.token = 'xxxxx'
		//console.log(options.data)
		return new Promise((resolve, reject) => {
			uni.request({
				url: con.baseUrl + options.url,
				data: options.data,
				method: options.method,
				header: {
					"content-type": options.header,
					//"token": 'xxxxx',
					//"timestamp": new Date().getTime(),
					//"APPUUID": APPUUID
				},
				success: function (result) {
					/* if (result.data.code == -1) {
						util.showToast(result.data.msg);
						setTimeout(function(){
							cache.clear();
							uni.clearStorageSync();
							uni.reLaunch({
								url: '/pages/login/login'
							});
						},1000);
					} */
					//console.log(result);
					resolve(result.data)
					/* let errorcode = result.data.errorcode
					if (errorcode == 0) {
						// resolve调用后，即可传递到调用方使用then或者async+await同步方式进行处理逻辑
						//console.log(result.data);
						resolve(result.data)
					}else{
						util.showToast(res.data.message)
					} */
				},
				fail: function (e) {
					console.log('error in...')
					// reject调用后，即可传递到调用方使用catch或者async+await同步方式进行处理逻辑
					reject(e)
				},
			})
		})
	}
}