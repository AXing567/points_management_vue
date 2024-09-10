<template>
	<view>
		<view class="button" @click="navTo('/pages/administrator/add-participants/meeting-participants')">录入大会期间参与人员
		</view>
		<view class="button" @click="navTo('/pages/administrator/add-participants/no-meeting-participants')">录入闭会期间参与人员</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			navTo(url) {
				this.$util.navigateTo(url);
			},
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