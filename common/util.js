import cache from './cache.js'
/* *
 * 通用公共js库，定义通用函数
 */

let util = {}


// 登录流程，根据业务逻辑封装
util.login = function(apiurl) {
	/* uni.request({
		url:apiurl + 'index.php?name_ios=student',
		success: function(res) {
			//console.log(res.data.list)
			// 存入缓存
			uni.setStorageSync(
				'userinfo',
				parSetData(res.data.list)
			);
		
		}
	}) */
}

// 退出登录流程，根据业务逻辑封装
util.logout = function() {
	// 删除保留的缓存数据
	console.log('进入退出流程')
	this.remove("token");
	this.remove("userId");
	this.remove("mobile");
}

// 跳转到非 tabBar页面，业务逻辑自行补充
util.navigateTo = function(url, isRequireLogin = false) {
	if (isRequireLogin == true) {
		// 进行判断是否用户已登录，如果未登录，则弹出要求登录框，并return false进行截断
		return false;
	}
	uni.navigateTo({
		url: url
	});
}

// 跳转到 tabBar页面，业务逻辑自行补充
util.switchTab = function(url, data, isRequireLogin = false) {
	if (isRequireLogin == true) {
		// 进行判断是否用户已登录，如果未登录，则弹出要求登录框，并return false进行截断
		return false;
	}
	// 存入缓存
	// cache.set('userinfo',data,2626560);
	uni.switchTab({
		url: url,
		success: function() {
			console.log('跳转成功')
		},
		fail: function(e) {
			console.log(e)
		}
	});
}

/**
 * 显示加载框
 */
util.showLoading = function(title, type) {
	// #ifdef APP-PLUS
	var w = plus.nativeUI.showWaiting(title || "", {
		width: '80px',
		height: '80px',
		loading: {
			type: type || 'snow',
			height: '40px'
		},
		background: 'rgba(0,0,0,0.9)'
	});
	// #endif
	// #ifndef APP-PLUS
	uni.showLoading({
		mask: true,
		title: title || '',
	});
	// #endif
}

/**
 * 隐藏加载框
 */
util.hideLoading = function() {
	// #ifdef APP-PLUS
	plus.nativeUI.closeWaiting();
	// #endif
	// #ifndef APP-PLUS
	uni.hideLoading();
	// #endif
}

util.getDeviceInfo = function() {
	// #ifdef APP-PLUS
	return new Promise((succ, error) => {
		plus.device.getInfo({
			success: function(e) {
				e.imei = e.imei.split(",");
				e.uuid = e.uuid.split(",");
				succ(e)
			},
			fail: function(e) {
				error(e)
			}
		});
	})
	// #endif
}

/**
 * 获取IOS平台 idfa
 */
util.getIdfa = function() {
	var idfa = '';
	// #ifdef APP-PLUS
	try {
		if ('iOS' == plus.os.name) {
			var manager = plus.ios.invoke('ASIdentifierManager', 'sharedManager');
			if (plus.ios.invoke(manager, 'isAdvertisingTrackingEnabled')) {
				var identifier = plus.ios.invoke(manager, 'advertisingIdentifier');
				idfa = plus.ios.invoke(identifier, 'UUIDString');
				plus.ios.deleteObject(identifier);
			}
			plus.ios.deleteObject(manager);
		}
	} catch (e) {
		console.error('exception in getIdfa@dc-idfa!!');
	}
	// #endif
	return idfa;
}


/**
 * 提示消息
 * @param {Object} msg
 */
util.showToast = function(msg, time = 2000) {
	uni.showToast({
		title: msg,
		position: 'center',
		mask: false,
		duration: time,
		icon: "none"
	});
}

/**
 * 打开应用市场
 * @param {Object} options 应用市场参数
 *     ios: appstore中应用的id标识，应用的页面地址（如https://apps.apple.com/cn/app/id682211190）的id后面的数字
 *     android: 应用的包名，apk文件中AndroidManifest.xml中的package字段值
 *     key: 为设置id标识或包名时，打开搜索页面使用的关键词
 * 如果未设置参数，则打开应用市场的搜索页面
	market.open({
		ios:'414478124',
		android:'com.tencent.mm'
	});
 */
util.openMarket = function(options) {
	// #ifdef APP-PLUS
	try {
		var os = plus.os.name;
		options = options || {};
		if ('iOS' == os) {
			if (options.ios && '' != options.ios) {
				//itms-apps://itunes.apple.com/app/id682211190
				plus.runtime.openURL('itms-apps://itunes.apple.com/app/id' + options.ios);
			} else {
				//itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/search?q=helloh5
				plus.runtime.openURL('itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/search?q=' + options
					.key);
			}
		} else {
			if (options.android && '' != options.android) {
				//io.dcloud.helloh5
				var uri = plus.android.invoke('android.net.Uri', 'parse', 'market://details?id=' + options.android);
				var Intent = plus.android.importClass('android.content.Intent');
				var intent = new Intent(Intent.ACTION_VIEW, uri);
				intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
				var main = plus.android.runtimeMainActivity();
				main.startActivity(intent);
			} else {
				//market://search?q=helloh5
				plus.runtime.openURL('market://search?q=' + options.key);
			}
		}
	} catch (e) {
		console.error('error @openMarket!!');
	}
	// #endif
}

/**
 * 要复制的内容
 * NJS设置剪切板
 */
util.setClipboardData = function(string, callback) {
	const appPlatform = uni.getSystemInfoSync().platform
	// #ifdef APP-PLUS
	if (appPlatform == "ios") {
		var UIPasteboard = plus.ios.importClass("UIPasteboard");
		var generalPasteboard = UIPasteboard.generalPasteboard();
		// 设置 
		generalPasteboard.setValueforPasteboardType(string, "public.utf8-plain-text");
		callback && callback({
			code: 1
		});
	} else {
		var Context = plus.android.importClass("android.content.Context");
		var main = plus.android.runtimeMainActivity();
		var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
		plus.android.invoke(clip, "setText", string);
		callback && callback({
			code: 1
		});
	}
	// #endif
}

/**
 * njs 获取剪切板
 */
util.getClipboardData = function(callback) {
	const appPlatform = uni.getSystemInfoSync().platform
	// #ifdef APP-PLUS
	if (appPlatform == "ios") {
		var UIPasteboard = plus.ios.importClass("UIPasteboard");
		var generalPasteboard = UIPasteboard.generalPasteboard();
		// 获取 
		var value = generalPasteboard.valueForPasteboardType("public.utf8-plain-text");
		callback && callback({
			code: 1,
			data: value
		});
	} else {
		var Context = plus.android.importClass("android.content.Context");
		var main = plus.android.runtimeMainActivity();
		var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
		var value = plus.android.invoke(clip, "getText");
		callback && callback({
			code: 1,
			data: value
		});
	}
	// #endif
}

/**
 * APP内嵌网页 -- 安卓IOS交互
 * 交互区分名称：shangChengView
 * 示例：appMutual("方法名称", "传递的参数")
 * 相当与安卓交互：window.shangChengView["方法名称"]("传递的参数");
 */
util.appMutual = (name, query = null, errCallback) => {
	if (/android/i.test(navigator.userAgent)) {
		if (window.shangChengView) {
			if (typeof(query) == "object") {
				query = JSON.stringify(query);
			}
			window.shangChengView[name](query);
		} else {
			errCallback && errCallback();
		}
	} else if (/ios|iphone|ipod|pad/i.test(navigator.userAgent)) {
		if (window.webkit) {
			window.webkit.messageHandlers[name].postMessage(query)
		} else {
			errCallback && errCallback();
		}
	}
};

export default util;