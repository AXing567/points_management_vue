<template>
	<view>
		<view class="background"></view>
		<view class="welcome">人大管理系统</view>
		<view class="form">
			<view class="item">
				<view class="profile-solid icon"></view>
				<input type="text" placeholder="请输入姓名" v-model="nickname.value">
				<view class="hint" v-show="!/^[\u00B7\u3007\u3400-\u9FFF\uE000-\uF8FF\uF900-\uFAFF\u{20000}-\u{2FFFF}\u{30000}-\u{3FFFF}]{2,8}$/u.test(nickname.value) && nickname.value != ''" @mousedown="get_tip('nickname')">
					<view>{{nickname.hint}}</view>
				</view>
			</view>
			<view class="item">
				<view class="mobile-solid icon"></view>
				<input type="number" placeholder="请输入手机号" v-model="username.value">
				<view class="hint" v-show="!/^1\d{10}$/.test(username.value) && username.value != ''" @mousedown="get_tip('username')">
					<view>{{username.hint}}</view>
				</view>
			</view>
			<view class="item">
				<view class="lock-solid icon"></view>
				<input type="text" placeholder="请输入密码(6-14位)" v-model="password.value" :password="!show_password">
				<view class="hint" v-show="!/^(\d|_|[A-Z]|[a-z]){6,14}$/.test(password.value) && password.value != ''" @mousedown="get_tip('password')">
					<view>{{password.hint}}</view>
				</view>
				<view class="eye-solid3 icon" :class="show_password?'':'hide'" @tap="show_password=!show_password" v-show="password != ''"></view>
			</view>
			<view class="item">
				<view class="lock-solid icon"></view>
				<input type="text" placeholder="请再次输入密码" v-model="repassword.value" :password="!show_repassword">
				<view class="hint" v-show="password.value != repassword.value" @mousedown="get_tip('repassword')">
					<view>{{repassword.hint}}</view>
				</view>
				<view class="eye-solid3 icon" :class="show_repassword?'':'hide'" @tap="show_repassword=!show_repassword" v-show="password != ''"></view>
			</view>
		</view>
		<view class="login-button">
			<button @tap="register">注册</button>
			<view class="tips" v-show="show_submit_tip">{{submit_tip}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				submit_tip: '',
				show_submit_tip: false,
				show_password: false,
				show_repassword: false,
				username: {
					value: '',
					hint: ''
				},
				nickname: {
					value: '',
					hint: ''
				},
				password: {
					value: '',
					hint: ''
				},
				repassword: {
					value: '',
					hint: ''
				},
			}
		},
		methods: {
			register() {
				let form_group = ['nickname','username','password','repassword'];
				let err_group = [];
				for (let value of form_group) {
					let errs = this.get_tip(value);
					if (errs) {
						err_group.push(errs);
					}
				}
				if (err_group.length > 0) {
					this.submit_tip = err_group.join('，');
					this.show_submit_tip = true;
				} else {
					this.submit_tip = [];
					this.show_submit_tip = false;
					this.$util.showLoading();
					this.$req.post('/register',{
						nickname: this.nickname.value,
						username: this.username.value,
						password: this.password.value,
					}).then(res => {
						this.$util.hideLoading();
						this.$util.showToast(res.result.message);
						if (res.result.success) {
							this.$util.navigateTo("/pages/login/login");
						} else {
							console.error(res.result.message);
						}
					});
				}
			},
			get_tip(type) {
				let errs = [];
				switch (type) {
					case 'nickname':
						if (this.nickname.value == '') {
							errs.push('姓名不能为空');
						}
						if (!/^[\u00B7\u3007\u3400-\u9FFF\uE000-\uF8FF\uF900-\uFAFF\u{20000}-\u{2FFFF}\u{30000}-\u{3FFFF}]{2,8}$/u.test(this.nickname.value)) {
							errs.push('姓名格式不正确');
						}
						this.nickname.hint = errs.join('，');
						return errs.join('，');
					case 'username':
						if (this.username.value == '') {
							errs.push('手机号不能为空');
						}
						if (!/^1\d{10}$/.test(this.username.value)) {
							errs.push('姓名格式不正确');
						}
						this.username.hint = errs.join('，');
						return errs.join('，');
					case 'password':
						if (this.password.value == '') {
							errs.push('密码不能为空');
						}
						if (!/.{6,14}$/.test(this.password.value)) {
							errs.push('密码长度不正确');
						}
						if (!/^(\d|_|[A-Z]|[a-z]){6,14}$/.test(this.password.value)) {
							errs.push('密码包含特殊符号');
						}
						this.password.hint = errs.join('，');
						return errs.join('，');
					case 'repassword':
						if (this.repassword.value == '') {
							errs.push('重复密码不能为空');
						}
						if (this.repassword.value != this.password.value) {
							errs.push('两次密码不一致');
						}
						this.password.hint = errs.join('，');
						return errs.join('，');
				}
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
		box-shadow: 0 0 10px 5px rgba(0,0,0,0.1);
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
			.hint {
				width: 36rpx;
				height: 36rpx;
				// line-height: 36rpx;
				border: 1rpx solid red;
				border-radius: 10px;
				color: red;
				cursor: default;
				// text-align: center;
				position: relative;
				> view {
					display: none;
					color: #fff;
					position: absolute;
					text-align: right;
					top: -85rpx;
					right: -28rpx;
					white-space: pre;
					// height: 40rpx;
					line-height: 40rpx;
					padding: 6px 16rpx;
					border-radius: 4px;
					background: #000;
				}
				> view:before {
					content: '';
					position: absolute;
					border-color: transparent;
					border-style: solid;
					bottom: -10rpx;
					margin-left: -10rpx;
					border-width: 10rpx 10rpx 0;
					border-top-color: #000;
					right: 36rpx;
				}
			}
			.hint:before {
				display: block;
				content: '!';
				width: 36rpx;
				height: 36rpx;
				line-height: 36rpx;
				text-align: center;
			}
			.hint:active > view {
				display: block;
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
	.profile-solid.icon {
		color: #0f6dcd;
		position: absolute;
		margin-left: 6rpx;
		margin-top: 22rpx;
		width: 28rpx;
		height: 12rpx;
		border-left: solid 2rpx currentColor;
		border-right: solid 2rpx currentColor;
		border-top: solid 2rpx currentColor;
		border-bottom: solid 2rpx transparent;
		background-color: currentColor;
		border-radius: 12rpx 12rpx 0 0;
	}
	.profile-solid.icon:before {
		content: '';
		position: absolute;
		left: 4rpx;
		top: -20rpx;
		width: 16rpx;
		height: 16rpx;
		border-radius: 50%;
		border: solid 1px currentColor;
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
		position: relative;
		display: flex;
		justify-content: center;
		button {
			width: 100%;
			border-radius: 50px;
			overflow: hidden;
			border: 2px solid #0075d6;
			background: linear-gradient(0deg,#0466ad,#0082d9);
			color: #fff;
			font-size: 32rpx;
		}
		button:after {
			border: none;
		}
		.tips {
			color: #fff;
			position: absolute;
			text-align: center;
			top: 110rpx;
			// height: 40rpx;
			line-height: 40rpx;
			padding: 6px 16rpx;
			border-radius: 4px;
			background: #000;
		}
		.tips:before {
			content: '';
			position: absolute;
			border-color: transparent;
			border-style: solid;
			top: -10rpx;
			margin-left: -10rpx;
			border-width: 0 10rpx 10rpx;
			border-bottom-color: #000;
			left: 50%;
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
