<template>
	<view class="container">
		<view class="search-form">
			<view class="input-group">
				<view class="label">姓名：</view>
				<input type="text" placeholder="请输入姓名" v-model="nickname" />
			</view>
			<button class="search-btn" @click="select_user_nickname">查询</button>
			<view class="input-group">
				<view class="label">手机号：</view>
				<input type="tel" placeholder="请输入手机号" v-model="username" />
			</view>
			<button class="search-btn" @click="select_user_username">查询</button>
			<view class="input-group">
				<view class="label">市区：</view>
				<input type="text" placeholder="请输入代表区" v-model="district" />
			</view>
			<button class="search-btn" @click="select_user_district">查询</button>
		</view>
		<view class="user-list">
			<view class="user-item" v-for="(user, index) in userList" :key="index">
				<view class="user-info" @click="navTo('/pages/administrator/select_user_info/show_user_info',index)">
					<view class="user-nickname" v-show="user">用户id:{{index}}——{{ user }} </view>
					<view class="user-username">{{ user.username }}</view>
					<view class="user-city">{{ user.city }}</view>
				</view>
			</view>
			<view class="no-user" v-if="userList.length === 0">暂无数据</view>
		</view>
	</view>
</template>

<script>
	export default {
		globalData: {
			userId: ''
		},
		data() {
			return {
				nickname: '',
				username: '',
				city: '',
				district: '',
				userList: []
			};
		},
		methods: {
			select_user_nickname() {
				this.$req.post('/selectNickname', {
					nickname: this.nickname
				}).then(res => {
					console.log(res);
					this.userList = res;
				});
			},
			select_user_username() {
				this.$req.post('/selectUsername', {
					username: this.username
				}).then(res => {
					console.log(res);
					this.userList = res;
				});
			},
			select_user_district() {
				this.$req.post('/selectUserCity', {
					city: "齐齐哈尔市",
					district:this.district
				}).then(res => {
					console.log(res);
					this.userList = res;
				});
			},
			navTo(url, userId) {
				getApp().globalData.userId = userId;
				this.$util.navigateTo(url);
			},
			searchUser() {
				// 发送网络请求，请求后端查询用户

				// 如果查询成功，则将查询结果赋值给 userList
				// 如果查询失败，则提示错误信息
				// 示例代码如下：
				this.userList = [{
						nickname: '张三',
						username: '13512345678',
						city: '北京'
					},
					{
						nickname: '李四',
						username: '13612345678',
						city: '上海'
					},
					{
						nickname: '王五',
						username: '13712345678',
						city: '广州'
					}
				];
			}
		}
	};
</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		background-color: #f2f2f2;
	}

	.search-form {
		width: 80%;
		background-color: #ffffff;
		padding: 20px;
		border-radius: 10px;
		margin-bottom: 20px;
	}

	.input-group {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	}

	.label {
		width: 80px;
		font-size: 16px;
		font-weight: bold;
	}

	input {
		flex: 1;
		height: 30px;
		border-radius: 5px;
		border: 1px solid #cccccc;
		padding: 5px;
	}

	.search-btn {
		width: 100px;
		height: 40px;
		background-color: #007aff;
		color: #ffffff;
		border-radius: 5px;
		/* margin-top: 20px; */
		margin-bottom: 40rpx;
		font-size: 16px;
		font-weight: bold;
	}

	.user-list {
		width: 80%;
		background-color: #ffffff;
		padding: 20px;
		border-radius: 10px;
	}

	.user-item {
		margin-bottom: 10px;
		padding-bottom: 10px;
		border-bottom: 1px solid #cccccc;
	}

	.user-info {
		display: flex;
		flex-direction: column;
	}

	.user-nickname {
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 5px;
	}

	.user-username {
		font-size: 14px;
		color: #666666;
		margin-bottom: 5px;
	}

	.user-city {
		font-size: 14px;
		color: #666666;
	}

	.no-user {
		text-align: center;
		font-size: 16px;
		color: #666666;
	}
</style>