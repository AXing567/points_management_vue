<template>
	<view>
		<view class="user-info-list">
			<view class="user-info-item">
				<view class="user-info-label">姓名：</view>
				<view class="user-info-value">{{nickname}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">性别：</view>
				<view class="user-info-value">{{gender}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">民族：</view>
				<view class="user-info-value">{{ethnicity}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">出生日期：</view>
				<view class="user-info-value">{{birthday}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">代表市：</view>
				<view class="user-info-value">{{city}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">代表区：</view>
				<view class="user-info-value">{{district}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">籍贯：</view>
				<view class="user-info-value">{{native_place}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">党派：</view>
				<view class="user-info-value">{{party}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">参加工作年月：</view>
				<view class="user-info-value">{{work_start_date}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">健康状态：</view>
				<view class="user-info-value">{{health_status}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">学历：</view>
				<view class="user-info-value">{{education}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">毕业院校及专业：</view>
				<view class="user-info-value">{{graduate_school_major}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">学位或技术职称：</view>
				<view class="user-info-value">{{degree_technical_title}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">专长：</view>
				<view class="user-info-value">{{expertise}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">身份证号：</view>
				<view class="user-info-value">{{id_card_number}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">工作单位：</view>
				<view class="user-info-value">{{employer}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">现任职务：</view>
				<view class="user-info-value">{{current_position}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">联系电话：</view>
				<view class="user-info-value">{{phone_number}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">邮编：</view>
				<view class="user-info-value">{{postal_code}}</view>
			</view>
			<view class="user-info-item">
				<view class="user-info-label">简历：</view>
				<view class="user-info-value">{{resume}}</view>
			</view>
		</view>
		<button class="btn" @click="navTo('/pages/my/editUserInfo')">修改个人信息</button>
		<button class="btn" @click="logout()">退出登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickname: uni.getStorageSync('nickname'),
				gender: uni.getStorageSync('gender'),
				ethnicity: uni.getStorageSync('ethnicity'),
				birthday: uni.getStorageSync('birthday'),
				native_place: uni.getStorageSync('native_place'),
				party: uni.getStorageSync('party'),
				work_start_date: uni.getStorageSync('work_start_date'),
				health_status: uni.getStorageSync('health_status'),
				education: uni.getStorageSync('education'),
				graduate_school_major: uni.getStorageSync('graduate_school_major'),
				degree_technical_title: uni.getStorageSync('degree_technical_title'),
				expertise: uni.getStorageSync('expertise'),
				id_card_number: uni.getStorageSync('id_card_number'),
				employer: uni.getStorageSync('employer'),
				current_position: uni.getStorageSync('current_position'),
				phone_number: uni.getStorageSync('phone_number'),
				postal_code: uni.getStorageSync('postal_code'),
				resume: uni.getStorageSync('resume'),
				city: uni.getStorageSync('city'),
				district: uni.getStorageSync('district')
			}
		},
		onShow() {
			this.init();
		},

		onLoad: function(options) {
			this.init();
			setTimeout(function() {
				console.log('start pulldown');
			}, 500);
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			console.log('refresh');
			this.init();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 500);
		},
		methods: {
			init(){
				this.nickname= uni.getStorageSync('nickname') || '';
				this.gender= uni.getStorageSync('gender') || '';
				this.ethnicity= uni.getStorageSync('ethnicity') || '';
				this.birthday= uni.getStorageSync('birthday') || '';
				this.city= uni.getStorageSync('city') || '';
				this.district= uni.getStorageSync('district') || '';
				this.native_place= uni.getStorageSync('native_place') || '';
				this.party= uni.getStorageSync('party') || '';
				this.work_start_date= uni.getStorageSync('work_start_date') || '';
				this.health_status= uni.getStorageSync('health_status') || '';
				this.education= uni.getStorageSync('education') || '';
				this.graduate_school_major= uni.getStorageSync('graduate_school_major') || '';
				this.degree_technical_title= uni.getStorageSync('degree_technical_title') || '';
				this.expertise= uni.getStorageSync('expertise') || '';
				this.id_card_number= uni.getStorageSync('id_card_number') || '';
				this.employer= uni.getStorageSync('employer') || '';
				this.current_position= uni.getStorageSync('current_position') || '';
				this.phone_number= uni.getStorageSync('phone_number') || '';
				this.postal_code= uni.getStorageSync('postal_code') || '';
				this.resume= uni.getStorageSync('resume') || '';
			},
			navTo(url) {
				this.$util.navigateTo(url);
			},
			logout() {
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
		}
	}
</script>

<style scoped>
	.user-info-list {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin: 20px;
	}

	.user-info-item {
		display: flex;
		flex-direction: row;
		margin-bottom: 10px;
	}

	.user-info-label {
		font-size: 16px;
		font-weight: bold;
		margin-right: 10px;
	}

	.user-info-value {
		font-size: 16px;
	}

	.btn {
		margin: 20px;
		padding: 10px 20px;
		background-color: #007bff;
		color: #fff;
		border: none;
		border-radius: 5px;
		font-size: 16px;
		cursor: pointer;
	}

	.btn:hover {
		background-color: #0062cc;
	}
</style>