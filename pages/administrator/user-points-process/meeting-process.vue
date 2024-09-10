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

		<view class="line"> </view>
		<view class="meeting">
			是否出席大会（积30分）
			<checkbox-group @change="checkbox_change">
				<label>
					<checkbox value="30" :checked="attend == 30" />
				</label>
			</checkbox-group>
		</view>

		<view class="" v-show="consider || check==2">
			<view class="line"> </view>
			<view class="title">
				审议报告决议并积极发言(5-10分)
			</view>
			<view class="points">
				<textarea v-model="supplement_consider" auto-height placeholder="补充内容(最大长度140字):" />
				<input type="number" v-model:value="consider" class="input">
			</view>
		</view>

		<view class="" v-show="recommendation || check==2">
			<view class="line"> </view>
			<view class="title">
				提出建议意见（3-10分）
			</view>
			<view class="points">
				<textarea v-model="supplement_recommendation" auto-height placeholder="补充内容(最大长度140字):" />
				<input type="number" v-model:value="recommendation" class="input">
			</view>
		</view>

		<view class="" v-show="bill || check==2">
			<view class="line"> </view>
			<view class="title">
				提出议案（5-15分）
			</view>
			<view class="points">
				<textarea v-model="supplement_bill" auto-height placeholder="补充内容(最大长度140字):" />
				<input type="number" v-model:value="bill" class="input">
			</view>
		</view>

		<view class="" v-show="question || check==2">
			<view class="line"> </view>
			<view class="title">
				提出质询（5-10分）
			</view>
			<view class="points">
				<textarea v-model="supplement_question" auto-height placeholder="补充内容(最大长度140字):" />
				<input type="number" v-model:value="question" class="input">
			</view>
			<view class="line"> </view>
		</view>

		<view class="" v-show="reject_reason && check==2">
			<view class="title">
				拒绝原因：
			</view>
			<view class="points">
				<textarea v-model="reject_reason" auto-height placeholder="拒绝原因" disabled='true' />
			</view>
			<view class="line"> </view>
		</view>


		<view class="" v-for="(item, index) in picture">
			<image :src="item" mode=""></image>
		</view>

		<button @click="pass(1)" v-show="check == 0">通过</button>
		<button @click="pass(2)" v-show="check == 0">拒绝</button>
		<button @click="pass(0)" v-show="check != 0">撤回</button>

		<uni-popup ref="inputDialog" type="dialog">
			<uni-popup-dialog ref="inputClose" mode="input" title="请输入拒绝理由" value="" placeholder="请输入拒绝理由"
				@confirm="dialogInputConfirm"></uni-popup-dialog>
		</uni-popup>

	</view>
</template>

<script>
	var fileNameMap = new Map();
	export default {
		data() {
			return {
				meeting: {},
				picture: [],
				check: '',
				select: '',
				id: '',
				passCheck: '',
				reject_reason: '',

				session: 18,
				ordinal: 1,
				initialSession: 18,
				initialOrdinal: 1,
				add_id: uni.getStorageSync("userId"),
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

				attend: 30,
				consider: 0,
				supplement_consider: "",
				recommendation: 0,
				supplement_recommendation: "",
				bill: 0,
				supplement_bill: "",
				question: 0,
				supplement_question: "",
			}
		},
		onLoad() {
			var meeting = getApp().globalData.meetings[getApp().globalData.index]
			this.check = getApp().globalData.check;
			this.select = getApp().globalData.select;
			this.meeting = meeting;
			this.id = meeting.id;
			console.log(meeting);

			this.initialSession = parseInt(meeting.session);
			this.initialOrdinal = parseInt(meeting.ordinal);
			this.session = parseInt(meeting.session);
			this.ordinal = parseInt(meeting.ordinal);
			this.attend = meeting.attend;
			this.consider = meeting.consider;
			this.supplement_consider = meeting.supplement_consider;
			this.recommendation = meeting.recommendation;
			this.supplement_recommendation = meeting.supplement_recommendation;
			this.bill = meeting.bill;
			this.supplement_bill = meeting.supplement_bill;
			this.question = meeting.question;
			this.supplement_question = meeting.supplement_question;

			this.picture = this.parseString(meeting.picture);
			console.log(this.picture);
			// console.log(this.parseString(meeting.picture));
			this.reject_reason = meeting.reject_reason;

		},

		methods: {
			pass(passCheck) {
				// passCheck： 1通过 2拒绝 (0设为未审核)
				if (passCheck == 2) {
					this.$refs.inputDialog.open();
					this.passCheck = passCheck;
				} else {
					this.$req.post('/UpdateMeetingCheckOrNoMeetingCheck', {
						"id": this.id,
						"check": passCheck,
						"select": this.select,
					}).then(res => {
						console.log(res);
						if (res.result.success) {
							this.$forceUpdate(); // 删除元素后强制刷新以确保删除的元素不被再显示
						}
						this.$util.showToast(res.result.message);
					});
					
					// 如果撤回了，那么将拒绝原因修改为空
					if(passCheck == 0){
						this.$forceUpdate(); // 删除元素后强制刷新以确保删除的元素不被再显示
						this.$req.post('/UpdateReason', {
							"id": this.id,
							"reason": "",
							"select": this.select,
						}).then(res => {
							console.log(res);
							this.$util.showToast(res.result.message);
						});
					}
					
				}
			},
			dialogInputConfirm(val) {
				console.log(val);


				this.$req.post('/UpdateMeetingCheckOrNoMeetingCheck', {
					"id": this.id,
					"check": this.passCheck,
					"select": this.select,
				}).then(res => {
					console.log(res);
					if (res.result.success) {
						this.$forceUpdate(); // 删除元素后强制刷新以确保删除的元素不被再显示
						this.$req.post('/UpdateReason', {
							"id": this.id,
							"reason": val,
							"select": this.select,
						}).then(res => {
							console.log(res);
							this.$util.showToast(res.result.message);
						});
					}
					this.$util.showToast(res.result.message);
				});



				// 关闭窗口后，恢复默认内容
				this.$refs.inputDialog.close()
			},

			session_change(e) {
				this.session = e;
				console.log(e);
			},
			ordinal_change(e) {
				this.ordinal = e;
			},
			checkbox_change: function(e) {
				this.attend = e.detail.value == '30' ? 30 : 0;
				console.log(this.attend);
			},

			upload_meeting() {
				var picture = '';
				fileNameMap.forEach(function(item) {
					picture += (uni.getStorageSync('userId') + '/' + item.toString() + ';');
				});

				uni.request({
					url: "https://w204882q59.zicp.fun/insertMeetingReview",
					method: "POST",
					data: {
						"session": this.session,
						"ordinal": this.ordinal,
						"attend": this.attend,
						"consider": this.consider,
						"supplement_consider": this.supplement_consider,
						"recommendation": this.recommendation,
						"supplement_recommendation": this.supplement_recommendation,
						"bill": this.bill,
						"supplement_bill": this.supplement_bill,
						"question": this.question,
						"supplement_question": this.supplement_question,
						"picture": picture,
						"user_id": uni.getStorageSync("userId"),
						"add_id": this.add_id,
						"nickname": uni.getStorageSync('nickname'),
					},
					success: (res) => {
						if (res.data.result.success) {
							this.$util.showToast("数据上传成功");
							console.log("数据上传成功");

							// 上传数据成功后删除旧数据
							this.$req.post('/DeletePointsInfo', {
								id: this.meeting.id,
								select: this.select
							}).then(res => {
								console.log(res);
								if (res.result.success) {
									console.log("删除旧数据成功");
								}
								uni.navigateBack({
									delta: 1
								});
							});
						} else {
							this.$util.showToast("数据上传失败");
							console.error("数据上传失败");
						}
					}
				})
			},
			parseString(str) {
				if (!str || typeof str !== 'string') {
					// 如果输入的不是字符串或者是空字符串，则返回一个空数组
					return [];
				}
				const prefix = 'https://w204882q59.zicp.fun/download/';
				const arr = str.split(';');
				return arr.filter(Boolean).map(subStr => prefix + subStr.trim());
			}
		}
	}
</script>

<style lang="less">
	.title {
		display: flex;
		align-items: center;
		margin: 0 0 0 50rpx;
		// justify-content: center;

		.select {
			width: 150rpx;
		}

	}

	.line {
		border-bottom: 1px solid #000; // 下边框
		height: 1px;
		margin-top: 10px;
	}

	.meeting {
		display: flex;
		align-items: center;
		margin: 0 0 0 50rpx;
		// justify-content: center;
	}

	.points {
		.title {
			width: 750rpx;
		}

		display: flex;
		align-items: center;
		margin: 0 0 0 50rpx;

		.input {
			width: 60rpx;
			margin: 0 20 0 20rpx;
		}
	}
</style>