<template>
	<view>
		<view class="">
			<view class="user_info">
				姓名：<input type="text" v-model="nickname" placeholder="请输入姓名">
			</view>
			<view class="user_info">
				性别：<input type="text" v-model="gender" placeholder="请输入性别">
			</view>
			<view class="user_info">
				民族：<input type="text" v-model="ethnicity" placeholder="请输入民族">
			</view>
			<view class="user_info">
				出生日期：
				<!-- <input type="text" v-model="birthday" placeholder="请输入出生日期"> -->
				<view class="example-body">
					<uni-datetime-picker type="date" v-model="birthday" @change="changeBirthday" />
				</view>
			</view>
			<view class="user_info">
				代表市：<input type="text" v-model="city" placeholder="请输入代表市">
			</view>
			<view class="user_info">
				代表区：<input type="text" v-model="district" placeholder="请输入代表区">
			</view>
			<view class="user_info">
				籍贯：<input type="text" v-model="native_place" placeholder="请输入籍贯">
			</view>
			<view class="user_info">
				党派：<input type="text" v-model="party" placeholder="请输入党派">
			</view>
			<view class="user_info">
				参加工作年月：
				<!-- <input type="text" v-model="work_start_date" placeholder="请输入参加工作年月"> -->
				<view class="example-body">
					<uni-datetime-picker type="date" v-model="work_start_date" @change="changeWork_start_date"/>
				</view>
			</view>
			<view class="user_info">
				健康状态：<input type="text" v-model="health_status" placeholder="请输入健康状态">
			</view>
			<view class="user_info">
				学历：<input type="text" v-model="education" placeholder="请输入学历">
			</view>
			<view class="user_info">
				毕业院校及专业：<input type="text" v-model="graduate_school_major" placeholder="请输入毕业院校及专业">
			</view>
			<view class="user_info">
				学位或技术职称：<input type="text" v-model="degree_technical_title" placeholder="请输入学位或技术职称">
			</view>
			<view class="user_info">
				专长：<input type="text" v-model="expertise" placeholder="请输入专长">
			</view>
			<view class="user_info">
				身份证号：<input type="text" v-model="id_card_number" placeholder="请输入身份证号">
			</view>
			<view class="user_info">
				工作单位：<input type="text" v-model="employer" placeholder="请输入工作单位">
			</view>
			<view class="user_info">
				现任职务：<input type="text" v-model="current_position" placeholder="请输入现任职务">
			</view>
			<view class="user_info">
				联系电话：<input type="text" v-model="phone_number" placeholder="请输入联系电话">
			</view>
			<view class="user_info">
				邮编：<input type="text" v-model="postal_code" placeholder="请输入邮编">
			</view>
			<view class="user_info">
				简历：
				<!-- <input type="text" v-model="resume" placeholder="请输入简历"> -->
				<textarea @blur="" auto-height placeholder="补充内容(最大长度140字):" v-model="resume" />
			</view>
		</view>
		<button @click="up_load_user_info">修改</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickname: uni.getStorageSync('nickname') || '',
				gender: uni.getStorageSync('gender') || '',
				ethnicity: uni.getStorageSync('ethnicity') || '',
				birthday: uni.getStorageSync('birthday') || '',
				city: uni.getStorageSync('city') || '',
				district: uni.getStorageSync('district') || '',
				native_place: uni.getStorageSync('native_place') || '',
				party: uni.getStorageSync('party') || '',
				work_start_date: uni.getStorageSync('work_start_date') || '',
				health_status: uni.getStorageSync('health_status') || '',
				education: uni.getStorageSync('education') || '',
				graduate_school_major: uni.getStorageSync('graduate_school_major') || '',
				degree_technical_title: uni.getStorageSync('degree_technical_title') || '',
				expertise: uni.getStorageSync('expertise') || '',
				id_card_number: uni.getStorageSync('id_card_number') || '',
				employer: uni.getStorageSync('employer') || '',
				current_position: uni.getStorageSync('current_position') || '',
				phone_number: uni.getStorageSync('phone_number') || '',
				postal_code: uni.getStorageSync('postal_code') || '',
				resume: uni.getStorageSync('resume') || '',
			}
		},
		methods: {
			up_load_user_info() {
				if (this.work_start_date === "" || this.birthday === "") {
					uni.showToast({
						title: "出生日期和参加工作年月不能为空",
						icon: 'none'
					});
					console.log(this.birthday);
					return;
				}
				this.$req.post('/updateUserInfo', {
					nickname: this.nickname,
					gender: this.gender,
					ethnicity: this.ethnicity,
					birthday: this.birthday,
					city: this.city,
					district: this.district,
					native_place: this.native_place,
					party: this.party,
					work_start_date: this.work_start_date,
					health_status: this.health_status,
					education: this.education,
					graduate_school_major: this.graduate_school_major,
					degree_technical_title: this.degree_technical_title,
					expertise: this.expertise,
					id_card_number: this.id_card_number,
					employer: this.employer,
					current_position: this.current_position,
					phone_number: this.phone_number,
					postal_code: this.postal_code,
					resume: this.resume,
					user_id: uni.getStorageSync("userId")
				}).then(res => {
					this.$util.showToast(res.result.message);
					if (res.result.success) {
						console.log(res.result.message);
						// 修改成功，更新本地存储中的变量
						uni.setStorageSync('nickname', this.nickname);
						uni.setStorageSync('gender', this.gender);
						uni.setStorageSync('ethnicity', this.ethnicity);
						uni.setStorageSync('birthday', this.birthday);
						uni.setStorageSync('city', this.city);
						uni.setStorageSync('district', this.district);
						uni.setStorageSync('native_place', this.native_place);
						uni.setStorageSync('party', this.party);
						uni.setStorageSync('work_start_date', this.work_start_date);
						uni.setStorageSync('health_status', this.health_status);
						uni.setStorageSync('education', this.education);
						uni.setStorageSync('graduate_school_major', this.graduate_school_major);
						uni.setStorageSync('degree_technical_title', this.degree_technical_title);
						uni.setStorageSync('expertise', this.expertise);
						uni.setStorageSync('id_card_number', this.id_card_number);
						uni.setStorageSync('employer', this.employer);
						uni.setStorageSync('current_position', this.current_position);
						uni.setStorageSync('phone_number', this.phone_number);
						uni.setStorageSync('postal_code', this.postal_code);
						uni.setStorageSync('resume', this.resume);
					} else {
						console.error(res.result.message);
					}
				});
			},
			changeBirthday(e) {
				// console.log(e);
				this.birthday = e;
			},
			changeWork_start_date(e){
				console.log(e);
				this.work_start_date = e;
			}
		}
	}
</script>

<style lang="less">
	.user_info {
		display: flex;
		align-items: center;
		margin-bottom: 10px;

		input,
		textarea {
			flex: 1;
			margin-left: 10px;
			padding: 5px;
			border: 1px solid #ccc;
			border-radius: 3px;
			font-size: 14px;
		}

		textarea {
			height: 100px;
			resize: none;
		}
	}
</style>