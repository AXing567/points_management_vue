<template>
	<view>
		<view class="background"></view>
		<view class="welcome">人大管理系统</view>
		<view class="form">
			<view class="item">
				<view class="mobile-solid icon"></view>
				<input type="text" placeholder="请输入手机号" v-model="username">
			</view>
			<view class="item">
				<view class="lock-solid icon"></view>
				<input type="text" placeholder="请输入密码" v-model="password" :password="!show_password" @confirm="login">
				<view class="eye-solid3 icon" :class="show_password?'':'hide'" @tap="show_password=!show_password"
					v-show="password != ''"></view>
			</view>
		</view>
		<view class="login-button">
			<button @tap="login">登录</button>
		</view>
		<view class="other-button">
			<navigator url="/pages/login/register">注册账号</navigator>
			<navigator url="/pages/login/reset">忘记密码</navigator>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
				show_password: false,
			}
		},
		onLoad() {
			if (uni.getStorageSync('token')) {
				this.$req.post('/login', {
					token: uni.getStorageSync('token')
				}).then(res => {
					console.log(res);
					console.log(uni.getStorageSync('token'));
					if (res.result.success) {
						this.$util.switchTab("/pages/index/index");
					}
				});
			}
		},
		methods: {

			login() {
				this.$util.showLoading();
				this.$req.post('/login', {
					username: this.username,
					password: this.password,
				}).then(res => {
					this.$util.hideLoading();
					this.$util.showToast(res.result.message);
					if (res.result.success) {
						// 存储登录信息 
						uni.setStorageSync('userId', res.result.id);
						uni.setStorageSync('power', res.result.power);
						uni.setStorageSync('token', res.result.token);

						this.$util.switchTab("/pages/index/index");
						// 登录成功后向客户端请求用户的详细信息
						this.$req.post('/selectUserInfo', {
							user_id: uni.getStorageSync("userId"),
						}).then(userInfo => {
							uni.setStorageSync('nickname', userInfo.person.nickname);
							uni.setStorageSync('gender', userInfo.person.gender);
							uni.setStorageSync('ethnicity', userInfo.person.ethnicity);
							uni.setStorageSync('birthday', userInfo.person.birthday);
							uni.setStorageSync('native_place', userInfo.person.native_place);
							uni.setStorageSync('party', userInfo.person.party);
							uni.setStorageSync('work_start_date', userInfo.person.work_start_date);
							uni.setStorageSync('health_status', userInfo.person.health_status);
							uni.setStorageSync('education', userInfo.person.education);
							uni.setStorageSync('graduate_school_major', userInfo.person
								.graduate_school_major);
							uni.setStorageSync('degree_technical_title', userInfo.person
								.degree_technical_title);
							uni.setStorageSync('expertise', userInfo.person.expertise);
							uni.setStorageSync('id_card_number', userInfo.person.id_card_number);
							uni.setStorageSync('employer', userInfo.person.employer);
							uni.setStorageSync('current_position', userInfo.person.current_position);
							uni.setStorageSync('phone_number', userInfo.person.phone_number);
							uni.setStorageSync('postal_code', userInfo.person.postal_code);
							uni.setStorageSync('resume', userInfo.person.resume);
							uni.setStorageSync('city', userInfo.person.city);
							uni.setStorageSync('district', userInfo.person.district);
						});

					} else {
						console.error(res.result.message);
					}
				});
			}
		}
	}
</script>

<style lang="less">
	.background {
		background: #0276bc;
		width: 200%;
		height: 600rpx;
		position: absolute;
		top: 0px;
		left: -50%;
		z-index: -1;
		border-radius: 0 0 50% 50%;
	}

	.welcome {
		width: 100%;
		padding-top: 60rpx;
		line-height: 330rpx;
		text-align: center;
		font-size: 48rpx;
		font-weight: 500;
		color: #fff;
	}

	.form {
		width: 80%;
		padding: 50rpx 5%;
		margin: 0 auto;
		box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
		border-radius: 10px;
		background: #fff;

		.item {
			border: 2px solid #c3ddf5;
			background: #f3f8fe;
			border-radius: 8px;
			padding: 20rpx;
			margin-top: 30rpx;
			display: flex;
			line-height: 80rpx;
			align-items: center;

			.text {
				color: #1d74cf;
			}

			input {
				margin-left: 40rpx;
				padding-left: 10rpx;
				flex: 1;
			}

			input.input-placeholder {
				color: #d9e4ef;
			}
		}

		.item:first-of-type {
			margin: 0;
		}
	}

	.mobile-solid.icon {
		color: #0f6dcd;
		position: absolute;
		margin-left: 8rpx;
		margin-top: 0px;
		width: 24rpx;
		height: 28rpx;
		border-radius: 2px;
		border-left: solid 1px currentColor;
		border-right: solid 1px currentColor;
		border-top: solid 3px currentColor;
		border-bottom: solid 4px currentColor;
	}

	.mobile-solid.icon:before {
		content: '';
		position: absolute;
		left: 10rpx;
		top: -4rpx;
		width: 4rpx;
		height: 2rpx;
		color: white;
		background-color: currentColor;
	}

	.mobile-solid.icon:after {
		content: '';
		position: absolute;
		bottom: -6rpx;
		left: 10rpx;
		height: 4rpx;
		width: 4rpx;
		border-radius: 50%;
		color: white;
		background-color: currentColor;
	}

	.lock-solid.icon {
		color: #0f6dcd;
		position: absolute;
		margin-left: 6rpx;
		margin-top: 20rpx;
		width: 24rpx;
		height: 16rpx;
		border-radius: 1px;
		border: solid 1px currentColor;
		background-color: currentColor;
	}

	.lock-solid.icon:before {
		content: '';
		position: absolute;
		left: 4rpx;
		top: -16rpx;
		width: 14rpx;
		height: 12rpx;
		transform-origin: left bottom;
		transform: rotate(351deg);
		border-radius: 4px 4px 0 0;
		border-top: solid 1px currentColor;
		border-left: solid 1px currentColor;
		border-right: solid 1px currentColor;
	}

	.login-button {
		width: 80%;
		margin: 60rpx auto 0 auto;
		border-radius: 50px;
		overflow: hidden;

		button {
			border: 2px solid #0075d6;
			background: linear-gradient(0deg, #0466ad, #0082d9);
			color: #fff;
			font-size: 32rpx;
		}

		button:after {
			border: none;
		}
	}

	.eye-solid3.icon {
		color: #0f6dcd;
		margin-left: 16rpx;
		margin-top: 6rpx;
		width: 24rpx;
		height: 24rpx;
		border-radius: 70% 15%;
		border: solid 1px currentColor;
		background-color: currentColor;
		-webkit-transform: rotate(45deg);
		transform: rotate(45deg);
	}

	.eye-solid3.icon:before {
		content: '';
		position: absolute;
		left: 4rpx;
		top: 4rpx;
		width: 12rpx;
		height: 12rpx;
		border-radius: 50%;
		color: white;
		border: solid 1px currentColor;
	}

	.eye-solid3.icon.hide:after {
		content: '';
		position: absolute;
		top: 10rpx;
		left: -6rpx;
		background: #0f6dcd;
		width: 150%;
		height: 1.5px;
		border-top: 1.5px solid #f3f8fe;
		transform: rotate(90deg);
		transform-origin: center;
	}

	.other-button {
		display: flex;
		justify-content: space-between;
		width: 80%;
		margin: 30rpx auto 0 auto;
		color: #0276bc;
	}
</style>