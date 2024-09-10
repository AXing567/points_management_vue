<template>
	<view class="container">

		<view class="header">
			<button class="header-button accept-all" @click="accept_all">全部通过</button>
			<button class="header-button reject-all" @click="reject_all">全部拒绝</button>
		</view>

		<view class="list">
			<view class="list-item" v-for="(user, index) in register" :key="index">
				<view class="list-item-info">
					<view class="list-item-item">{{ user.nickname }}</view>
					<view class="list-item-item">{{ user.username }}</view>
					<view class="list-item-item">{{ user.register_time }}</view>
				</view>
				<view class="list-item-buttons">
					<button class="list-item-button accept" @click="accept(user.user_id)">通过</button>
					<button class="list-item-button reject" @click="reject(user.user_id)">拒绝</button>
				</view>
			</view>

			<view v-if="register.length === 0" class="no-data">暂无数据</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				register: ''
			}
		},
		onLoad() {
			this.$req.post('/unauditedUserReview', {}).then(res => {
				console.log(res);
				this.register = res;
			});
		},
		methods: {
			accept(userId) {
				this.$req.post('/auditUser', {
					user_id: userId,
				}).then(res => {
					console.log(res);
					uni.showToast({
						title: res.result.message,
						duration: 2000,
						icon: "none"
					});
					if (res.result.success) {
						this.register = this.deleteKey(this.register, userId)
						console.log(this.register);
					}
				});
			},
			accept_all() {
				for (const key in this.register) {
					if (this.register.hasOwnProperty(key)) {
						const user = this.register[key];
						// console.log(`User ID: ${user.user_id}`);
						// console.log(`Username: ${user.username}`);
						// console.log(`Nickname: ${user.nickname}`);
						// console.log(`Register Time: ${user.register_time}`);
						// console.log('----------------------');
						this.accept(user.user_id);
					}
				}
			},
			reject(userId) {
				this.$req.post('/rejectRegister', {
					user_id: userId,
				}).then(res => {
					console.log(res);
					uni.showToast({
						title: res.result.message,
						duration: 2000,
						icon: "none"
					});
					if (res.result.success) {
						this.register = this.deleteKey(this.register, userId)
						console.log(this.register);
					}
				});
			},
			reject_all() {
				for (const key in this.register) {
					if (this.register.hasOwnProperty(key)) {
						const user = this.register[key];
						// console.log(`User ID: ${user.user_id}`);
						// console.log(`Username: ${user.username}`);
						// console.log(`Nickname: ${user.nickname}`);
						// console.log(`Register Time: ${user.register_time}`);
						// console.log('----------------------');
						this.reject(user.user_id);
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