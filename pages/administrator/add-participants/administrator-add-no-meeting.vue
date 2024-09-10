<template>
	<view>




		<view class="">
			<view class="line"> </view>
			<view class="title">
				补充说明：
			</view>
			<view class="points">
				<textarea v-model="supplement" auto-height placeholder="补充内容(最大长度140字):" />
			</view>
		</view>
		<view class="" v-for="(item, index) in pictureArray">
			<image :src="item" mode=""></image>
		</view>



		<uni-section title="上传图片(请确保无重复图片,否则请删除重添加)" type="line">
			<view class="example-body">
				<uni-file-picker limit="9" title="最多选择9张图片" @select="select" :autoUpload="false"
					@delete="del_img"></uni-file-picker>
			</view>
		</uni-section>
		<button @click="upload_no_meeting">提交</button>

	</view>
</template>

<script>
	var fileNameMap = new Map();
	export default {
		data() {
			return {
				supplement: '',
				pictureArray: [], // 用于显示图片的数组
				userId: getApp().globalData.userId,
				add_id: uni.getStorageSync("userId")
			}
		},
		onLoad() {
			fileNameMap = new Map();
			console.log(this.userId);
			if (this.uploadPerson.hasOwnProperty(this.userId)) {
				console.log("用户在uploadPerson中存在，赋初值中");
				console.log("this.uploadPerson[] : " + this.userId);
				console.log(this.uploadPerson[this.userId]);
				console.log(this.parseString(this.uploadPerson[this.userId].picture));
				this.supplement = this.uploadPerson[this.userId].supplement;
				this.pictureArray = this.parseString(this.uploadPerson[this.userId].picture);
			}
		},

		methods: {

			// 获取上传状态
			select(e) {
				const tempFilePaths = e.tempFilePaths;
				for (let i = 0; i < tempFilePaths.length; i++) {
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
					url: "http://cn-sz-plc-1.openfrp.top:57655/deleteFile",
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
				console.log(e.tempFile.name);
				fileNameMap.delete(e.tempFile.name);
			},
			upload_no_meeting() {

				var picture = '';
				var userId = this.userId;
				if (this.pictureArray.length != 0) {
					picture = this.uploadPerson[this.userId].picture;
				}
				fileNameMap.forEach(function(item) {
					picture += (userId + '/' + item.toString() + ';');
				});
				var person_ = {
					'user_id': this.userId,
					'picture': picture,
					'supplement': this.supplement
				};

				this.uploadPerson[this.userId] = person_;
				console.log("this.uploadPerson正在输出：");
				console.log(this.uploadPerson);
				uni.navigateBack({
					delta: 1
				});


			},
			parseString(str) {
				if (!str || typeof str !== 'string') {
					// 如果输入的不是字符串或者是空字符串，则返回一个空数组
					return [];
				}
				const prefix = 'https://w204882q59.zicp.fun/download/';
				const arr = str.split(';');
				return arr.filter(Boolean).map(subStr => prefix + subStr.trim());
			}
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