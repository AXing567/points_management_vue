<template>
	<view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: ''

			}
		},
		onReady() {},
		methods: {
			inputDialogToggle() {
				this.$refs.inputDialog.open()
			},
			dialogInputConfirm(val) {
				uni.showLoading({
					title: '3秒后会关闭'
				})

				setTimeout(() => {
					uni.hideLoading()
					console.log(val)
					this.value = val
					// 关闭窗口后，恢复默认内容
					this.$refs.inputDialog.close()
				}, 3000)
			}
		}
	}
</script>

