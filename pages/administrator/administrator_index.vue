<template>
	<view>
		<view class="button" @click="navTo('/pages/administrator/create_user')">新建账号</view>
		<view class="button" @click="navTo('/pages/administrator/select_user_info/select_user_info')">查询代表信息</view>
		<view class="button" @click="navTo('/pages/administrator/add-participants/add-participants')">批量录入活动参加人员</view>
		<view class="button" @click="navTo('/pages/administrator/register-audit')">账号注册审核</view>
		<view class="button" @click="navTo('/pages/administrator/user-points-process/user-points-process')">积分变动信息审核</view>
		<view class="button" @click="navTo('/pages/administrator/update-password-audit')">密码修改审核</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {

		},
		methods: {
			navTo(url) {
				this.$util.navigateTo(url);
			},logout() {
				// 清空本地存储中的用户信息
				uni.removeStorageSync('nickname');
				uni.removeStorageSync('gender');
				uni.removeStorageSync('ethnicity');
				uni.removeStorageSync('birthday');
				uni.removeStorageSync('native_place');
				uni.removeStorageSync('party');
				uni.removeStorageSync('work_start_date');
				uni.removeStorageSync('health_status');
				uni.removeStorageSync('education');
				uni.removeStorageSync('graduate_school_major');
				uni.removeStorageSync('degree_technical_title');
				uni.removeStorageSync('expertise');
				uni.removeStorageSync('id_card_number');
				uni.removeStorageSync('employer');
				uni.removeStorageSync('current_position');
				uni.removeStorageSync('phone_number');
				uni.removeStorageSync('postal_code');
				uni.removeStorageSync('resume');
				uni.removeStorageSync('city');
				uni.removeStorageSync('district');
				uni.removeStorageSync('token');
				uni.removeStorageSync('power');
				uni.removeStorageSync('userId');
				// 关闭所有页面
				uni.reLaunch({
					url: '/pages/login/login'
				});

				// 发送通知消息
				uni.$emit('logout');
			}
			,
			
		}
	}
</script>

<style>
	page {
		background: #f1f1f1;
	}

	.button {
		margin: 30rpx 50rpx;
		background-color: #fff;
		height: 150rpx;
		border-radius: 20rpx;
		line-height: 150rpx;
		text-align: center;
		font-size: 40rpx;
	}
</style> 