<template>
	<view>
		<view class="button" @click="navTo('/pages/upload_meeting/upload_meeting')">上传大会相关积分信息变动</view>
		<view class="button" @click="navTo('/pages/upload_no_meeting/upload_no_meeting')">上传非大会相关积分信息变动</view>
		<view class="button" @click="navTo('/pages/administrator/userPointsChange/userPointsChange')">积分变动 </view>
		<view  v-show="power == 1"  class="button" @click="navTo('/pages/administrator/administrator_index')" >管理员主页 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				power:''
			}
		},
		onLoad() {
			this.power = uni.getStorageSync('power');
		},
		methods: {
			navTo(url) {
				this.$util.navigateTo(url);
			}
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
		height: 200rpx;
		border-radius: 20rpx;
		line-height: 200rpx;
		text-align: center;
		font-size: 40rpx;
	}
</style>