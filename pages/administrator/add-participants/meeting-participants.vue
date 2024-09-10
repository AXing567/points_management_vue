<template>
	<view>
		<view class="title">
			选择大会：第

			<view class="select">
				<uni-data-select v-model="initialSession" :localdata="sessionGroup" @change="session_change"
					:clear="false"></uni-data-select>
			</view>
			届 第
			<view class="select">
				<uni-data-select v-model="initialOrdinal" :localdata="ordinalGroup" @change="ordinal_change"
					:clear="false"></uni-data-select>
			</view>
			次
		</view>

		<view class="meeting">
			出席大会（积30分）
			<checkbox-group>
				<label>
					<checkbox checked="true" disabled="false" />
				</label>
			</checkbox-group>
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
				<button @click="upload_meeting">提交</button>
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
				session: 18,
				ordinal: 1,
				attend: 30,
				initialSession: 18,
				initialOrdinal: 1,
				sessionGroup: [{
						value: 18,
						text: "十八"
					},
					{
						value: 19,
						text: "十九"
					},
					{
						value: 20,
						text: "二十"
					},
					{
						value: 21,
						text: "二十一"
					},
					{
						value: 22,
						text: "二十二"
					},
					{
						value: 23,
						text: "二十三"
					},
					{
						value: 24,
						text: "二十四"
					},
					{
						value: 25,
						text: "二十五"
					},
					{
						value: 26,
						text: "二十六"
					},
				],
				ordinalGroup: [{
						value: 1,
						text: "1"
					},
					{
						value: 2,
						text: "2"
					},
					{
						value: 3,
						text: "3"
					},
					{
						value: 4,
						text: "4"
					},
					{
						value: 5,
						text: "5"
					},
					{
						value: 6,
						text: "6"
					},
					{
						value: 7,
						text: "7"
					},
					{
						value: 8,
						text: "8"
					},
				],
				nickname: '',
				username: '',
				city: '',
				district: '',
				userList: {}, // 下标是用户id，值是姓名
				uploadList: [], // 普通下标，值是用户id (用于：控制某个用户显示在“待添加人员的列表”或“未添加的人员列表”) (某用户id如果只存在此数组而不在this.uplodaPerson中，则代表无其余补充信息)
			}
		},
		onLoad() {},
		methods: {
			upload_meeting() {
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
						this.$req.post('/insertMeetingReview', {
							// 届、次、30积分
							"session": this.session,
							"ordinal": this.ordinal,
							"attend": this.attend,

							// 积分和文字补充
							"consider": this.uploadPerson[index].consider,
							"supplement_consider": this.uploadPerson[index].supplement_consider,
							"recommendation": this.uploadPerson[index].recommendation,
							"supplement_recommendation": this.uploadPerson[index].supplement_recommendation,
							"bill": this.uploadPerson[index].bill,
							"supplement_bill": this.uploadPerson[index].supplement_bill,
							"question": this.uploadPerson[index].question,
							"supplement_question": this.uploadPerson[index].supplement_question,

							// 图片、俩id、名字
							"picture": this.uploadPerson[index].picture,
							"user_id": index,
							"add_id": uni.getStorageSync("userId"),
							"nickname": nickname,
						}).then(res => {
							console.log(res);
							this.$util.showToast(nickname + res.result.message);
						});
					} else {

						// 上传只参加大会的人的信息
						this.$req.post('/insertMeetingReview', {
							// 届、次、30积分
							"session": this.session,
							"ordinal": this.ordinal,
							"attend": this.attend,

							// 积分和文字补充
							"consider": 0,
							"supplement_consider": '',
							"recommendation": 0,
							"supplement_recommendation": '',
							"bill": 0,
							"supplement_bill": '',
							"question": 0,
							"supplement_question": '',

							// 图片、俩id、名字
							"picture": '',
							"user_id": index,
							"add_id": uni.getStorageSync("userId"),
							"nickname": nickname,
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
				this.$util.navigateTo('/pages/administrator/add-participants/administrator-add-meeting');
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
		}
	}
</script>

<style lang="less">
	.meeting {
		display: flex;
		align-items: center;
		margin: 0 0 0 50rpx;
		// justify-content: center;
	}

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

	.user-username {
		font-size: 14px;
		color: #666666;
		margin-bottom: 5px;
	}

	.user-city {
		font-size: 14px;
		color: #666666;
	}

	.no-user {
		text-align: center;
		font-size: 16px;
		color: #666666;
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