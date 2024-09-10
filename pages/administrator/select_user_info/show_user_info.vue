<template>
	<view>
		<view class="user-info-list">
			<view class="user-info-item">
				<view class="user-info-label">姓名：</view>
				<view class="user-info-value">{{userInfo['nickname']}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">性别：</view>
				<view class="user-info-value">{{userInfo['gender']}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">民族：</view>
				<view class="user-info-value">{{userInfo['ethnicity']}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">出生日期：</view>
				<view class="user-info-value">{{userInfo['birthday']}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">代表市：</view>
				<view class="user-info-value">{{userInfo['city']}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">代表区：</view>
				<view class="user-info-value">{{userInfo['district']}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">籍贯：</view>
				<view class="user-info-value">{{userInfo['native_place']}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">党派：</view>
				<view class="user-info-value">{{userInfo['party']}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">参加工作年月：</view>
				<view class="user-info-value">{{userInfo['work_start_date']}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">健康状态：</view>
				<view class="user-info-value">{{userInfo['health_status']}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">学历：</view>
				<view class="user-info-value">{{userInfo['education']}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">毕业院校及专业：</view>
				<view class="user-info-value">{{userInfo['graduate_school_major']}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">学位或技术职称：</view>
				<view class="user-info-value">{{userInfo['degree_technical_title']}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">专长：</view>
				<view class="user-info-value">{{userInfo['expertise']}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">身份证号：</view>
				<view class="user-info-value">{{userInfo['id_card_number']}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">工作单位：</view>
				<view class="user-info-value">{{userInfo['employer']}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">现任职务：</view>
				<view class="user-info-value">{{userInfo['current_position']}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">联系电话：</view>
				<view class="user-info-value">{{userInfo['phone_number']}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">邮编：</view>
				<view class="user-info-value">{{userInfo['postal_code']}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">简历：</view>
				<view class="user-info-value">{{userInfo['resume']}}</view>
			</view>
		</view>
		<button class="print-btn" @click="download_user_document">下载用户信息文档并打开</button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				userInfo: [],
				luj: Object,
			}
		},
		onLoad() {
			this.$req.post('/selectUserInfo', {
				user_id: getApp().globalData.userId
			}).then(res => {
				this.userInfo = res.person;
			});
		},
		methods: {
			download_user_document() {
				this.$util.showToast("开始保存")
				// 在后台创建本人的用户信息文档
				this.$req.post('/CreatUserDocument', {
					userId: getApp().globalData.userId
				}).then(res => {
					console.log(res);
				});

				// 向后台请求本人的用户信息文档
				let url = "https://w204882q59.zicp.fun/download/" + getApp().globalData.userId + "/user_document.docx";
				const downloadTask = uni.downloadFile({
					url,
					success: (res) => {
						if (res.statusCode === 200) {
							console.log('下载成功');
						}
						let that = this;
						uni.saveFile({
							tempFilePath: res.tempFilePath,
							success: function(red) {
								uni.showToast({
									icon: 'none',
									mask: true,
									title: '文件已保存：' + red.savedFilePath + '（3秒后打开）', //保存路径
									duration: 3000,
								});
								setTimeout(() => {
									//打开文档查看
									uni.openDocument({
										filePath: red.savedFilePath,
										success: function(red) { 
										}
									});
								}, 3000)
							}
						});
					}
				});

				downloadTask.onProgressUpdate((res) => {
					console.log('下载进度' + res.progress);
					console.log('已经下载的数据长度' + res.totalBytesWritten);
					console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
				});
			}
		}
	}
</script>

<style>
	.user-info-list {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin: 20px;
	}

	.user-info-item {
		display: flex;
		flex-direction: row;
		margin-bottom: 10px;
	}

	.user-info-label {
		font-size: 16px;
		font-weight: bold;
		margin-right: 10px;
	}

	.user-info-value {
		font-size: 16px;
	}

	.print-btn {
		margin: 20px;
		padding: 10px 20px;
		background-color: #007bff;
		color: #fff;
		border: none;
		border-radius: 5px;
		font-size: 16px;
		cursor: pointer;
	}

	.print-btn:hover {
		background-color: #0062cc;
	}
</style>