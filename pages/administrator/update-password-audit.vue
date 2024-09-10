<template>
	<view class="container">

		<view class="header">
			<button class="header-button accept-all" @click="accept_all">全部通过</button>
			<button class="header-button reject-all" @click="reject_all">全部拒绝</button>
		</view>

		<view class="list">
			<view class="list-item" v-for="(user, index) in user" :key="index" v-show="user.check_find == 0">
				<view class="list-item-info">
					<view class="list-item-item">姓名： {{ user.nickname }}</view>
					<view class="list-item-item">手机号：{{ user.username }}</view>
					<view class="list-item-item">密码：{{ user.password }}</view>
				</view>
				<view class="list-item-buttons">
					<button class="list-item-button accept" @click="accept(user.username , user.password)">通过</button>
					<button class="list-item-button reject" @click="reject(user.username , user.password)">拒绝</button>
				</view>
			</view>

			<view v-if="user.length === 0" class="no-data">暂无数据</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				user: ''
			}
		},
		onLoad() {
			this.$req.post('/selectPasswordUpdate', {}).then(res => {
				console.log(res);
				this.user = res;
			});
			
		},
		methods: {
			accept(username , password) {
				this.$req.post('/updateFindPasswordCheck', {
					'username': username,
					'check': 1,
					'password': password
				}).then(res => {
					console.log(res);
					uni.showToast({
						title: res.result.message,
						duration: 2000,
						icon: "none"
					});
					if (res.result.success) {
						this.user = this.deleteKey(this.user, username)
						console.log(this.user);
					}
				});
			},
			accept_all() {
				for (const key in this.user) {
					if (this.user.hasOwnProperty(key)) {
						const user = this.user[key];
						this.accept(user.username , user.password);
					}
				}
			},
			reject(username , password) {
				this.$req.post('/updateFindPasswordCheck', {
					'username': username,
					'check': 2,
					'password': password
				}).then(res => {
					console.log(res);
					uni.showToast({
						title: res.result.message,
						duration: 2000,
						icon: "none"
					});
					if (res.result.success) {
						this.user = this.deleteKey(this.user, username)
						console.log(this.user);
					}
				});
			},
			reject_all() {
				for (const key in this.user) {
					if (this.user.hasOwnProperty(key)) {
						const user = this.user[key];
						this.reject(user.username , user.password);
					}
				}
			},
			deleteKey(obj, key) {
				// 检查对象是否包含指定的键
				if (obj.hasOwnProperty(key)) {
					// 创建一个新对象，复制 obj 的所有键值对
					const newObj = Object.assign({}, obj);

					// 删除指定的键
					delete newObj[key];

					// 返回新的对象
					return newObj;
				} else {
					// 如果对象不包含指定的键，直接返回原始对象
					return obj;
				}
			}
		}
	}
</script>
<style scoped>
	.container {
		max-width: 600px;
		margin: 0 auto;
		padding: 20px;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* add this to align items vertically */
		margin-bottom: 20px;
	}

	.header-button {
		flex: 1;
		/* add this to make the buttons take up equal width */
		background-color: #4CAF50;
		color: white;
		border: none;
		padding: 10px;
		font-size: 16px;
		border-radius: 4px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.header-button:hover {
		background-color: #3E8E41;
	}

	.list {
		display: flex;
		flex-direction: column;
	}

	.list-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #f9f9f9;
		padding: 10px;
		margin-bottom: 10px;
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.list-item-info {
		display: flex;
		flex-direction: column;
	}

	.list-item-item {
		margin-bottom: 5px;
	}

	.list-item-buttons {
		display: flex;
	}

	.list-item-button {
		background-color: #4CAF50;
		color: white;
		border: none;
		padding: 5px 10px;
		font-size: 14px;
		margin-right: 10px;
		border-radius: 4px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.list-item-button:hover {
		background-color: #3E8E41;
	}

	.list-item-button.reject {
		background-color: #FF5722;
	}

	.list-item-button.reject:hover {
		background-color: #E64A19;
	}

	.no-data {
		margin-top: 10px;
		text-align: center;
		color: #999;
	}
</style>