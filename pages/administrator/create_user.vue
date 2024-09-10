<template>
	<view class="container">
		<view class="form">
			<view class="input-group">
				<view class="label">姓名：</view>
				<input type="text" placeholder="请输入姓名" v-model="nickname" />
			</view>
			<view class="input-group">
				<view class="label">手机号：</view>
				<input type="tel" placeholder="请输入手机号" v-model="username" />
			</view>
			<view class="input-group">
				<view class="label">密码：</view>
				<input type="password" placeholder="请输入密码" v-model="password" />
			</view>
			<view class="input-group">
				<view class="label">确认密码：</view>
				<input type="password" placeholder="请再次输入密码" v-model="confPassword" />
			</view>
		</view>
		<button class="btn" @click="createUser">创建账号</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickname: '',
				username: '',
				password: '',
				confPassword: ''
			}
		},
		methods: {
			createUser() {
				// 验证姓名长度不超过8个汉字
				if (this.nickname.length > 8) {
					uni.showToast({
						title: '姓名长度不能超过8个汉字',
						icon: 'none'
					})
					return
				}
				// 验证手机号长度为11位
				if (this.username.length !== 11) {
					uni.showToast({
						title: '手机号长度应为11位',
						icon: 'none'
					})
					return
				}
				// 验证密码符合行业规范，这里仅做示例，可以根据需要自行修改
				const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/
				if (!this.password.match(reg)) {
					uni.showToast({
						title: '密码应包含大小写字母和数字，长度为8-16位',
						icon: 'none'
					})
					return
				}
				// 验证确认密码与密码相同
				if (this.confPassword !== this.password) {
					uni.showToast({
						title: '确认密码与密码不一致',
						icon: 'none'
					})
					return
				}
				// 向后端发送请求，创建账号
				console.log(this.nickname);
				this.$req.post('/insertUserAll', {
					nickname: this.nickname,
					username: this.username,
					password: this.password
				}).then(res => {
					console.log(res);
					this.$util.showToast(res.result.message);
				});
			}
		}
	}
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

	.form {
		width: 80%;
		background-color: #ffffff;
		padding: 20px;
		border-radius: 10px;
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

	button {
		width: 80%;
		height: 40px;
		background-color: #007aff;
		color: #ffffff;
		border-radius: 5px;
		margin-top: 20px;
		font-size: 16px;
		font-weight: bold;
	}
</style>