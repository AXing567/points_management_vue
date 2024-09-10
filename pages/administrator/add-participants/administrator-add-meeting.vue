<template>
	<view>


		<view class="">
			<view class="line"> </view>
			<view class="title">
				审议报告决议并积极发言(5-10分)
			</view>
			<view class="points">
				<textarea v-model="supplement_consider" auto-height placeholder="补充内容(最大长度140字):" />
				<input type="number" v-model="consider" class="input">
			</view>
		</view>

		<view class="">
			<view class="line"> </view>
			<view class="title">
				提出建议意见（3-10分）
			</view>
			<view class="points">
				<textarea v-model="supplement_recommendation" auto-height placeholder="补充内容(最大长度140字):" />
				<input type="number" v-model="recommendation" class="input">
			</view>
		</view>

		<view class="">
			<view class="line"> </view>
			<view class="title">
				提出议案（5-15分）
			</view>
			<view class="points">
				<textarea v-model="supplement_bill" auto-height placeholder="补充内容(最大长度140字):" />
				<input type="number" v-model="bill" class="input">
			</view>
		</view>

		<view class="">
			<view class="line"> </view>
			<view class="title">
				提出质询（5-10分）
			</view>
			<view class="points">
				<textarea v-model="supplement_question" auto-height placeholder="补充内容(最大长度140字):" />
				<input type="number" v-model="question" class="input">
			</view>
			<view class="line"> </view>
		</view>

		<view class="" v-for="(item , index) in pictureArray" :id="index">
			<image :src="item" mode=""></image>
		</view>

		<uni-section title="上传图片(请确保无重复图片,否则请删除重添加)" type="line">
			<view class="example-body">
				<uni-file-picker limit="9" title="最多选择9张图片" @select="select" :autoUpload="false"
					@delete="del_img"></uni-file-picker>
			</view>
		</uni-section>
		<button @click="upload_meeting">提交</button>

	</view>
</template>

<script>
	var fileNameMap = new Map();
	export default {
		data() {
			return {
				// attend: 30,
				userId: getApp().globalData.userId,
				pictureArray: [], // 用于显示图片的数组
				// userId: '23',


				consider: 0,
				supplement_consider: "",
				recommendation: 0,
				supplement_recommendation: "",
				bill: 0,
				supplement_bill: "",
				question: 0,
				supplement_question: "",
				add_id: uni.getStorageSync("userId")
			}
		},
		onLoad() {
			fileNameMap = new Map(); // 初始化此变量以防“使用上一用户数据的bug”
			console.log("this.userId: " + this.userId);
			if (this.uploadPerson.hasOwnProperty(this.userId)) {
				console.log("用户在uploadPerson中存在，赋初值中");
				console.log("this.uploadPerson[] : " + this.userId);
				console.log(this.uploadPerson[this.userId]);
				this.consider = this.uploadPerson[this.userId].consider;
				this.supplement_consider = this.uploadPerson[this.userId].supplement_consider;
				this.recommendation = this.uploadPerson[this.userId].recommendation;
				this.supplement_recommendation = this.uploadPerson[this.userId].supplement_recommendation;
				this.bill = this.uploadPerson[this.userId].bill;
				this.supplement_bill = this.uploadPerson[this.userId].supplement_bill;
				this.question = this.uploadPerson[this.userId].question;
				this.supplement_question = this.uploadPerson[this.userId].supplement_question;

				this.pictureArray = this.parseString(this.uploadPerson[this.userId].picture);
			}
		},

		methods: {

			// 获取上传状态
			select(e) {
				const tempFilePaths = e.tempFilePaths;
				for (let i = 0; i < tempFilePaths.length; i++) {
					console.log("select : this.userId: " + this.userId);
					uni.uploadFile({
						url: 'https://w204882q59.zicp.fun/uploadImg',
						// url: 'http://localhost:8080/uploadImg',
						filePath: tempFilePaths[i],
						name: 'myfile',
						formData: {
							userId: this.userId
						},
						success: (uploadFileRes) => {
							// 解析响应数据
							var data = JSON.parse(uploadFileRes.data);
							// 键：文件原名     值：文件名经过md5运算后加上点和后缀 
							fileNameMap.set(
								e.tempFiles[i].name, data.result.md5FileName + '.' + e.tempFiles[i].extname
							);
							console.log(e.tempFiles[i].name + data.result.message);
							uni.showToast({
								title: e.tempFiles[i].name + data.result.message,
								duration: 2000,
								icon: "none"
							});
						}
					});

				}
			},
			del_img(e) {
				uni.request({
					url: "https://w204882q59.zicp.fun/deleteFile",
					method: "POST",
					data: {
						user_id: this.userId,
						fileName: fileNameMap.get(e.tempFile.name)
					},
					success: (res) => {
						uni.showToast({
							title: res.data.result.message,
							duration: 2000,
							icon: "none"
						});
					}
				})
			},

			upload_meeting() {
				var picture = '';
				var userId = this.userId;
				console.log(this.pictureArray);
				if (this.pictureArray.length != 0) {
					picture = this.uploadPerson[this.userId].picture;
				}
				fileNameMap.forEach(function(item) {
					picture += (userId + '/' + item.toString() + ';');
				});

				var person_ = {
					'attend': 30,
					'user_id': this.userId,
					'picture': picture,

					// 往下就是分值了
					'consider': this.consider,
					'supplement_consider': this.supplement_consider,
					'recommendation': this.recommendation,
					'supplement_recommendation': this.supplement_recommendation,
					'bill': this.bill,
					'supplement_bill': this.supplement_bill,
					'question': this.question,
					'supplement_question': this.supplement_question,
				};

				this.uploadPerson[this.userId] = person_;
				console.log("this.uploadPerson正在输出：");
				console.log(this.uploadPerson);
				uni.navigateBack({
					delta: 1
				});


				// uni.request({
				// 	url: "http://cn-sz-plc-1.openfrp.top:57655/insertMeetingReview",
				// 	method: "POST",
				// 	data: {
				// 		"session": this.session,
				// 		"ordinal": this.ordinal,
				// //		"attend": this.attend,


				// 		"consider": this.consider,
				// 		"supplement_consider": this.supplement_consider,
				// 		"recommendation": this.recommendation,
				// 		"supplement_recommendation": this.supplement_recommendation,
				// 		"bill": this.bill,
				// 		"supplement_bill": this.supplement_bill,
				// 		"question": this.question,
				// 		"supplement_question": this.supplement_question,

				// 		"picture": picture,
				// 		"user_id": uni.getStorageSync("userId"),
				// 		"add_id": this.add_id,
				// 		"nickname": uni.getStorageSync('nickname'),
				// 	},
				// 	success: (res) => {
				// 		if (res.data.result.success) {
				// 			this.$util.showToast("数据上传成功");
				// 			console.log("数据上传成功");
				// 		} else {
				// 			this.$util.showToast("数据上传失败");
				// 			console.error("数据上传失败");
				// 		}
				// 	}
				// })
			},
			parseString(str) {
				if (!str || typeof str !== 'string') {
					// 如果输入的不是字符串或者是空字符串，则返回一个空数组
					return [];
				}
				const prefix = 'https://w204882q59.zicp.fun/download/';
				const arr = str.split(';');
				return arr.filter(Boolean).map(subStr => prefix + subStr.trim());
			},
			// mergeURLs(urls) {
			// 	return urls.map(url => {
			// 		const parts = url.split("/");
			// 		const fileId = parts[parts.length - 2];
			// 		const fileName = parts[parts.length - 1];
			// 		return `${fileId}/${fileName}`;
			// 	}).join(";");
			// }
		}
	}
</script>

<style lang="less">
	.title {
		display: flex;
		align-items: center;
		margin: 0 0 0 50rpx;
		// justify-content: center;

		.select {
			width: 150rpx;
		}

	}

	.line {
		border-bottom: 1px solid #000; // 下边框
		height: 1px;
		margin-top: 10px;
	}

	.meeting {
		display: flex;
		align-items: center;
		margin: 0 0 0 50rpx;
		// justify-content: center;
	}

	.points {
		.title {
			width: 750rpx;
		}

		display: flex;
		align-items: center;
		margin: 0 0 0 50rpx;

		.input {
			width: 60rpx;
			margin: 0 20 0 20rpx;
		}
	}
</style>