<template>
	<view>
		<view class="title">
			选择大会：第

			<view class="select">
				<uni-data-select v-model="initialSession" :localdata="sessionGroup" @change="session_change"
					:clear="false"></uni-data-select>
			</view>
			届 第
			<view class="select">
				<uni-data-select v-model="initialOrdinal" :localdata="ordinalGroup" @change="ordinal_change"
					:clear="false"></uni-data-select>
			</view>
			次
		</view>
		
		<view class="line"> </view>
		<view class="meeting">
			是否出席大会（积30分）
			<checkbox-group @change="checkbox_change">
				<label>
					<checkbox value="30" checked="true" />
				</label>
			</checkbox-group>
		</view>

		<view class="">
			<view class="line"> </view>
			<view class="title">
				审议报告决议并积极发言(5-10分)
			</view>
			<view class="points">
				<textarea @blur="suppl_consider_text_area_blur" auto-height placeholder="补充内容(最大长度140字):" />
				<input type="number" v-model:value="consider" class="input">
			</view>
		</view>

		<view class="">
			<view class="line"> </view>
			<view class="title">
				提出建议意见（3-10分）
			</view>
			<view class="points">
				<textarea @blur="suppl_reco_text_area_blur" auto-height placeholder="补充内容(最大长度140字):" />
				<input type="number" v-model:value="recommendation" class="input">
			</view>
		</view>

		<view class="">
			<view class="line"> </view>
			<view class="title">
				提出议案（5-15分）
			</view>
			<view class="points">
				<textarea @blur="suppl_bill_text_area_blur" auto-height placeholder="补充内容(最大长度140字):" />
				<input type="number" v-model:value="bill" class="input">
			</view>
		</view>

		<view class="">
			<view class="line"> </view>
			<view class="title">
				提出质询（5-10分）
			</view>
			<view class="points">
				<textarea @blur="suppl_ques_text_area_blur" auto-height placeholder="补充内容(最大长度140字):" />
				<input type="number" v-model:value="question" class="input">
			</view>
			<view class="line"> </view>
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
				session: 18,
				ordinal: 1,
				attend: 30,
				initialSession: 18,
				initialOrdinal: 1,
				sessionGroup: [{
						value: 18,
						text: "十八"
					},
					{
						value: 19,
						text: "十九"
					},
					{
						value: 20,
						text: "二十"
					},
					{
						value: 21,
						text: "二十一"
					},
					{
						value: 22,
						text: "二十二"
					},
					{
						value: 23,
						text: "二十三"
					},
					{
						value: 24,
						text: "二十四"
					},
					{
						value: 25,
						text: "二十五"
					},
					{
						value: 26,
						text: "二十六"
					},
				],
				ordinalGroup: [{
						value: 1,
						text: "1"
					},
					{
						value: 2,
						text: "2"
					},
					{
						value: 3,
						text: "3"
					},
					{
						value: 4,
						text: "4"
					},
					{
						value: 5,
						text: "5"
					},
					{
						value: 6,
						text: "6"
					},
					{
						value: 7,
						text: "7"
					},
					{
						value: 8,
						text: "8"
					},
				],
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
			// console.log(uni.getStorageSync('userId'));
			// console.log(uni.getStorageSync('power'));
			// console.log(uni.getStorageSync('token'));
			// console.log(uni.getStorageSync('nickname'));
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
							userId: uni.getStorageSync('userId')
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
						user_id: uni.getStorageSync('userId'),
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
			session_change(e) {
				this.session = e;
				console.log(e);
			},
			ordinal_change(e) {
				this.ordinal = e;
			},
			checkbox_change: function(e) {
				this.attend = e.detail.value == '30' ? 30 : 0;
			},
			suppl_consider_text_area_blur: function(e) {
				this.supplement_consider = e.detail.value;
			},
			suppl_reco_text_area_blur: function(e) {
				this.supplement_recommendation = e.detail.value;
			},
			suppl_bill_text_area_blur: function(e) {
				this.supplement_bill = e.detail.value;
			},
			suppl_ques_text_area_blur: function(e) {
				this.supplement_question = e.detail.value;
			},

			upload_meeting() {
				var picture = '';
				fileNameMap.forEach(function(item) {
					picture += (uni.getStorageSync('userId') + '/' + item.toString() + ';');
				});

				uni.request({
					url: "https://w204882q59.zicp.fun/insertMeetingReview",
					method: "POST",
					data: {
						"session": this.session,
						"ordinal": this.ordinal,
						"attend": this.attend,
						"consider": this.consider,
						"supplement_consider": this.supplement_consider,
						"recommendation": this.recommendation,
						"supplement_recommendation": this.supplement_recommendation,
						"bill": this.bill,
						"supplement_bill": this.supplement_bill,
						"question": this.question,
						"supplement_question": this.supplement_question,
						"picture": picture,
						"user_id": uni.getStorageSync("userId"),
						"add_id": this.add_id,
						"nickname": uni.getStorageSync('nickname'),
					},
					success: (res) => {
						if (res.data.result.success) {
							this.$util.showToast("数据上传成功");
							console.log("数据上传成功");
						} else {
							this.$util.showToast("数据上传失败");
							console.error("数据上传失败");
						}
					}
				})
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