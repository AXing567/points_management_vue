<template>
	<view>
		选择活动
		<view class="select">
			<uni-data-select v-model="initialActivity" :localdata="activityGroup" @change="activity_change"
				:clear="false"></uni-data-select>
		</view>
		<view class="">
			积分：
			<input type="number" v-model="point">
		</view>

		<view class="">
			<uni-section :title="'活动开始时间：' " type="line"></uni-section>
			<view class="example-body">
				<uni-datetime-picker type="date" :clear-icon="false" v-model="startDate" />
			</view>

			<uni-section :title="'活动结束时间：' " type="line"></uni-section>
			<view class="example-body">
				<uni-datetime-picker type="date" :clear-icon="false" v-model="endDate" />
			</view>
		</view>

		<view class="container">
			<view class="search-form">
				<view class="input-group">
					<view class="label">姓名：</view>
					<input type="text" placeholder="请输入姓名" v-model="nickname" />
				</view>
				<button class="search-btn" @click="select_user_nickname">查询</button>
				<view class="input-group">
					<view class="label">手机号：</view>
					<input type="tel" placeholder="请输入手机号" v-model="username" />
				</view>
				<button class="search-btn" @click="select_user_username">查询</button>
				<view class="input-group">
					<view class="label">市区：</view>
					<input type="text" placeholder="请输入代表区" v-model="district" />
				</view>
				<button class="search-btn" @click="select_user_district">查询</button>
			</view>


			<view class="user-list">
				待添加：
				<view class="user-item" v-for="(user, index) in userList" :key="index"
					v-show="uploadList.indexOf(index) == -1">
					<view class="user-info">
						<view class="user-nickname" v-show="user"
							@click="navTo('/pages/administrator/select_user_info/show_user_info',index)">
							{{ user }}
						</view>
					</view>
					<image class="iconfont icon-edit" src="/static/add.png" @click="add_upload_list(user,index)">
					</image>
				</view>
			</view>



			<view class="user-list">
				已添加：
				<view class="user-item" v-for="(user, index) in uploadList" :key="index + 1000">
					<image class="iconfont icon-edit" src="/static/edit.png" @click="editUser(user)"></image>
					<view class="user-info">
						<view class="user-nickname" v-show="user"
							@click="navTo('/pages/administrator/select_user_info/show_user_info',user)">
							{{ userList[user] }}
						</view>
					</view>
					<image class="iconfont icon-delete" src="/static/delete.png" @click="deleteUser(user)"></image>
				</view>
			</view>

			<view class="">
				<button @click="upload_no_meeting">提交</button>
			</view>

		</view>


	</view>
</template>

<script>
	export default {
		globalData: {
			userId: '', // 与查看用户详细信息页面传输数据 (临时变量，不做最终存储，可随时调用)
		},
		data() {
			return {
				initialActivity: '约见机关负责人或旁听案件审理（5分/次）', // 活动选择的初始内容
				selectedActivity: '约见机关负责人或旁听案件审理（5分/次）', // 选择的活动
				activityGroup: [{
						value: '约见机关负责人或旁听案件审理（5分/次）',
						text: "约见机关负责人或旁听案件审理（5分/次）"
					},
					{
						value: '个人持证视察并形成报告积(10分/次)',
						text: "个人持证视察并形成报告积(10分/次)"
					},
					{
						value: '参加“七个一”活动积达标（5分/项）',
						text: "参加“七个一”活动积达标（5分/项）"
					},
					{
						value: '参加“七个一”之外办实事好事（5-10分）',
						text: "参加“七个一”之外办实事好事（5-10分）"
					},
					{
						value: '参加小组活动及培训视察列席会议（5分/次）',
						text: "参加小组活动及培训视察列席会议（5分/次）"
					},
					{
						value: '参加有关部门听证、测评检查调研（5分/次）',
						text: "参加有关部门听证、测评检查调研（5分/次）"
					},
					{
						value: '交述职材料或口头述职（5-10分）',
						text: "交述职材料或口头述职（5-10分）"
					},
					{
						value: '参加代表之家（工作室）值班（5分/次）',
						text: "参加代表之家（工作室）值班（5分/次）"
					},
					{
						value: '值班中解决实际问题(5-10分)',
						text: "值班中解决实际问题(5-10分)"
					},
					{
						value: '完成代表履职等级表（5-10分）',
						text: "完成代表履职等级表（5-10分）"
					},
				],
				startDate: '',
				endDate: '',
				point: 0,

				nickname: '',
				username: '',
				city: '',
				district: '',
				userList: {}, // 下标是用户id，值是姓名
				uploadList: [], // 普通下标，值是用户id (用于：控制某个用户显示在“待添加人员的列表”或“未添加的人员列表”) (某用户id如果只存在此数组而不在this.uplodaPerson中，则代表无其余补充信息)
			}
		},
		watch: {
			startDate(val) {
				// 如果结束时间早于开始时间，则将结束时间设置为开始时间
				if (new Date(this.endDate) < new Date(val)) {
					this.endDate = val;
				}
			},
			endDate(val) {
				// 如果结束时间早于开始时间，则将开始时间设置为结束时间
				if (new Date(val) < new Date(this.startDate)) {
					this.startDate = val;
				}
			}
		},
		methods: {
			upload_no_meeting() {
				// console.log('this.uploadPerson');
				// console.log(this.uploadPerson);
				// console.log('this.uploadList');
				// console.log(this.uploadList);
				for (var i = 0; i < this.uploadList.length; i++) {

					let index = this.uploadList[i];
					let nickname = this.userList[index];
					console.log(nickname);
					// 上传有参加大会的详细信息的用户
					if (this.uploadPerson.hasOwnProperty(index)) {
						this.$req.post('/insertNoMeetingReview', {

							// 图片、俩id、名字、时间
							"picture": this.uploadPerson[index].picture,
							"user_id": index,
							"add_id": uni.getStorageSync("userId"),
							"nickname": nickname,
							time: this.startDate + '至' + this.endDate,

							try1: this.selectedActivity == "约见机关负责人或旁听案件审理（5分/次）" ? this.point : 0,
							supplement_try: this.selectedActivity == "约见机关负责人或旁听案件审理（5分/次）" ? this.uploadPerson[
								index].supplement : "",
							inspect: this.selectedActivity == "个人持证视察并形成报告积(10分/次)" ? this.point : 0,
							supplement_inspect: this.selectedActivity == "个人持证视察并形成报告积(10分/次)" ? this
								.uploadPerson[index].supplement : "",
							activity: this.selectedActivity == "参加“七个一”活动积达标（5分/项）" ? this.point : 0,
							supplement_activity: this.selectedActivity == "参加“七个一”活动积达标（5分/项）" ? this
								.uploadPerson[index].supplement : "",
							activity2: this.selectedActivity == "参加“七个一”之外办实事好事（5-10分）" ? this.point : 0,
							supplement_activity2: this.selectedActivity == "参加“七个一”之外办实事好事（5-10分）" ? this
								.uploadPerson[index].supplement : "",
							group_work: this.selectedActivity == "参加小组活动及培训视察列席会议（5分/次）" ? this.point : 0,
							supplement_group_work: this.selectedActivity == "参加小组活动及培训视察列席会议（5分/次）" ? this
								.uploadPerson[index].supplement : "",
							survey: this.selectedActivity == "参加有关部门听证、测评检查调研（5分/次）" ? this.point : 0,
							supplement_survey: this.selectedActivity == "参加有关部门听证、测评检查调研（5分/次）" ? this
								.uploadPerson[
									index].supplement : "",
							material: this.selectedActivity == "交述职材料或口头述职（5-10分）" ? this.point : 0,
							supplement_material: this.selectedActivity == "交述职材料或口头述职（5-10分）" ? this
								.uploadPerson[index].supplement : "",
							duty: this.selectedActivity == "参加代表之家（工作室）值班（5分/次）" ? this.point : 0,
							supplement_duty: this.selectedActivity == "参加代表之家（工作室）值班（5分/次）" ? this.uploadPerson[
								index].supplement : "",
							solve: this.selectedActivity == "值班中解决实际问题(5-10分)" ? this.point : 0,
							supplement_solve: this.selectedActivity == "值班中解决实际问题(5-10分)" ? this.uploadPerson[
								index].supplement : "",
							complete: this.selectedActivity == "完成代表履职等级表（5-10分）" ? this.point : 0,
							supplement_complete: this.selectedActivity == "完成代表履职等级表（5-10分）" ? this
								.uploadPerson[index].supplement : "",


						}).then(res => {
							console.log(res);
							this.$util.showToast(nickname + res.result.message);
						});
					} else {

						// 上传只参加大会的人的信息
						this.$req.post('/insertNoMeetingReview', {
							// 图片、俩id、名字、时间
							"picture": "",
							"user_id": index,
							"add_id": uni.getStorageSync("userId"),
							"nickname": nickname,
							time: this.startDate + '至' + this.endDate,

							try1: this.selectedActivity == "约见机关负责人或旁听案件审理（5分/次）" ? this.point : 0,
							inspect: this.selectedActivity == "个人持证视察并形成报告积(10分/次)" ? this.point : 0,
							activity: this.selectedActivity == "参加“七个一”活动积达标（5分/项）" ? this.point : 0,
							activity2: this.selectedActivity == "参加“七个一”之外办实事好事（5-10分）" ? this.point : 0,
							group_work: this.selectedActivity == "参加小组活动及培训视察列席会议（5分/次）" ? this.point : 0,
							survey: this.selectedActivity == "参加有关部门听证、测评检查调研（5分/次）" ? this.point : 0,
							material: this.selectedActivity == "交述职材料或口头述职（5-10分）" ? this.point : 0,
							duty: this.selectedActivity == "参加代表之家（工作室）值班（5分/次）" ? this.point : 0,
							solve: this.selectedActivity == "值班中解决实际问题(5-10分)" ? this.point : 0,
							complete: this.selectedActivity == "完成代表履职等级表（5-10分）" ? this.point : 0,
						}).then(res => {
							console.log(res);
							this.$util.showToast(nickname + res.result.message);
						});
					}
				}
				// 清空待添加和已添加列表、三个输入框
				this.userList = {};
				this.uploadList = [];
				this.nickname = '';
				this.username = '';
				this.district = '';
			},
			editUser(index) {
				// 处理用户修改逻辑
				getApp().globalData.userId = index;
				if (this.uploadPerson.hasOwnProperty(index)) {
					console.log("this.uploadPerson中存在用户：" + index);
				} else {
					console.log("this.uploadPerson中没有：" + index);
				}
				this.$util.navigateTo('/pages/administrator/add-participants/administrator-add-no-meeting');
				console.log("编辑用户：" + index);

			},
			deleteUser(index) { // 这里的下标指向的值才是用户id
				console.log("删除用户：" + index);
				this.uploadList.splice(this.uploadList.indexOf(index), 1);
				if (this.uploadPerson.hasOwnProperty(index)) {
					delete this.uploadPerson[index];
					console.log("this.uploadPerson: ");
					console.log(this.uploadPerson);
				}
				console.log(this.uploadList);
			},
			add_upload_list(user, userId) {
				if (this.uploadList.indexOf(userId) == -1) {
					this.uploadList.push(userId);
					console.log("添加用户：" + userId);
					console.log(this.uploadList);
				} else {
					console.log(userId + "已存在队列中");
				}
			},
			select_user_nickname() {
				this.username = '';
				this.district = '';
				this.$req.post('/selectNickname', {
					nickname: this.nickname
				}).then(res => {
					console.log(res);
					this.userList = res;
				});
			},
			select_user_username() {
				this.nickname = '';
				this.district = '';
				this.$req.post('/selectUsername', {
					username: this.username
				}).then(res => {
					console.log(res);
					this.userList = res;
				});
			},
			select_user_district() {
				this.username = '';
				this.nickname = '';
				this.$req.post('/selectUserCity', {
					city: "齐齐哈尔市",
					district: this.district
				}).then(res => {
					console.log(res);
					this.userList = res;
				});
			},
			navTo(url, userId) {
				this.$util.navigateTo(url);
				getApp().globalData.userId = userId;
			},
			activity_change(e) {
				this.selectedActivity = e;
			}

		}
	}
</script>

<style>
	.title {
		display: flex;
		align-items: center;
		margin: 0 0 0 50rpx;
		// justify-content: center;

		.select {
			width: 150rpx;
		}

	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		background-color: #f2f2f2;
	}

	.search-form {
		width: 80%;
		background-color: #ffffff;
		padding: 20px;
		border-radius: 10px;
		margin-bottom: 20px;
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

	.search-btn {
		width: 100px;
		height: 40px;
		background-color: #007aff;
		color: #ffffff;
		border-radius: 5px;
		/* margin-top: 20px; */
		margin-bottom: 40rpx;
		font-size: 16px;
		font-weight: bold;
	}

	.user-list {
		width: 80%;
		background-color: #ffffff;
		padding: 20px;
		border-radius: 10px;
		margin: 0 0 40rpx 0;
	}

	.user-item {
		margin-bottom: 10px;
		padding-bottom: 10px;
		border-bottom: 1px solid #cccccc;
	}

	.user-info {
		display: flex;
		flex-direction: column;
	}

	.user-nickname {
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 5px;
	}








	.iconfont {
		width: 16px;
		height: 16px;
		cursor: pointer;
		margin-left: 10px;
	}

	.user-item {
		display: flex;
		align-items: center;
	}
</style>