<template>
	<view>
		<view class="">
			<!-- <uni-section title="活动开始时间-活动结束、时间" type="line"></uni-section> -->
			<uni-section :title="'活动开始时间：' " type="line"></uni-section>
			<view class="example-body">
				<uni-datetime-picker type="date" :clear-icon="false" v-model="startDate" @maskClick="maskClick" />
			</view>

			<uni-section :title="'活动结束时间：' " type="line"></uni-section>
			<view class="example-body">
				<uni-datetime-picker type="date" :clear-icon="false" v-model="endDate" @maskClick="maskClick" />
			</view>
		</view>


		<view class="">
			<view class="" v-show="try1|| check==2">
				<view class="line"> </view>
				<view class="title">
					约见机关负责人或旁听案件审理（5分/次）
				</view>
				<view class="points">
					<textarea v-model="supplement_try" auto-height placeholder="补充内容(最大长度140字):"></textarea>
					<input type="number" v-model:value="try1" class="input">
				</view>
			</view>

			<view class="" v-show="inspect || check==2">
				<view class="line"> </view>
				<view class="title">
					个人持证视察并形成报告积(10分/次)
				</view>
				<view class="points">
					<textarea v-model="supplement_inspect" auto-height placeholder="补充内容(最大长度140字):"></textarea>
					<input type="number" v-model:value="inspect" class="input">
				</view>
			</view>

			<view class="" v-show="activity || check==2">
				<view class="line"> </view>
				<view class="title">
					参加“七个一”活动积达标（5分/项）
				</view>
				<view class="points">
					<textarea v-model="supplement_activity" auto-height placeholder="补充内容(最大长度140字):"></textarea>
					<input type="number" v-model:value="activity" class="input">
				</view>
			</view>

			<view class="" v-show="activity2 || check==2">
				<view class="line"> </view>
				<view class="title">
					参加”七个一“之外办实事好事（5-10分）
				</view>
				<view class="points">
					<textarea v-model="supplement_activity2" auto-height placeholder="补充内容(最大长度140字):"></textarea>
					<input type="number" v-model:value="activity2" class="input">
				</view>
			</view>

			<view class="" v-show="group_work || check==2">
				<view class="line"> </view>
				<view class="title">
					参加小组活动及培训视察列席会议（5分/次）
				</view>
				<view class="points">
					<textarea v-model="supplement_group_work" auto-height placeholder="补充内容(最大长度140字):"></textarea>
					<input type="number" v-model:value="group_work" class="input">
				</view>
			</view>

			<view class="" v-show="survey || check==2">
				<view class="line"> </view>
				<view class="title">
					参加有关部门听证、测评检查调研（5分/次）
				</view>
				<view class="points">
					<textarea v-model="supplement_survey" auto-height placeholder="补充内容(最大长度140字):"></textarea>
					<input type="number" v-model:value="survey" class="input">
				</view>
			</view>

			<view class="" v-show="material || check==2">
				<view class="line"> </view>
				<view class="title">
					交述职材料或口头述职（5-10分）
				</view>
				<view class="points">
					<textarea v-model="supplement_material" auto-height placeholder="补充内容(最大长度140字):"></textarea>
					<input type="number" v-model:value="material" class="input">
				</view>
			</view>

			<view class="" v-show="duty || check==2">
				<view class="line"> </view>
				<view class="title">
					参加代表之家（工作室）值班（5分/次）
				</view>
				<view class="points">
					<textarea v-model="supplement_duty" auto-height placeholder="补充内容(最大长度140字):"></textarea>
					<input type="number" v-model:value="duty" class="input">
				</view>
			</view>

			<view class="" v-show="solve || check==2">
				<view class="line"> </view>
				<view class="title">
					值班中解决实际问题(5-10分)
				</view>
				<view class="points">
					<textarea v-model="supplement_solve" auto-height placeholder="补充内容(最大长度140字):"></textarea>
					<input type="number" v-model:value="solve" class="input">
				</view>
			</view>

			<view class="" v-show="complete || check==2">
				<view class="line"> </view>
				<view class="title">
					完成代表履职等级表（5-10分）
				</view>
				<view class="points">
					<textarea v-model="supplement_complete" auto-height placeholder="补充内容(最大长度140字):"></textarea>
					<input type="number" v-model:value="complete" class="input">
				</view>
				<view class="line"> </view>
			</view>
		</view>
		<view class="" v-show="reject_reason && check == 2">
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
				no_meeting: '',
				check: '',
				id: '', // 记录的id
				select: '',
				passCheck: '', // 临时的、用于拒绝的


				picture: '',
				date: '',
				startDate: '',
				endDate: '',


				try1: 0, // 约见机关负责人或旁听案件审理
				inspect: 0, // 个人持证视察并形成报告
				activity: 0, // 参加“七个一”活动积达标
				activity2: 0,
				group_work: 0, // 参加小组活动及培训视察列席会议
				survey: 0, // 参加有关部门听证、测评检查调研
				material: 0, // 交述职材料或口头述职
				duty: 0, // 参加代表之家（工作室）值班
				solve: 0,
				complete: 0, // 完成代表履职等级表
				supplement_try: '', // 约见机关负责人或旁听案件审理补充内容
				supplement_inspect: '', // 个人持证视察并形成报告补充内容
				supplement_activity: '', // 参加“七个一”活动积达标补充内容
				supplement_activity2: '', // 参加”七个一“之外办实事好事
				supplement_group_work: '', // 参加小组活动及培训视察列席会议补充内容
				supplement_survey: '', // 参加有关部门听证、测评检查调研补充内容
				supplement_material: '', // 交述职材料或口头述职补充内容
				supplement_duty: '', // 参加代表之家（工作室）值班补充内容
				supplement_solve: '', // 值班中解决实际问题
				supplement_complete: '', // 完成代表履职等级表补充内容
				reject_reason: '', // 拒绝原因

			}
		},
		onLoad() {
			var meeting = getApp().globalData.meetings[getApp().globalData.index]
			this.check = getApp().globalData.check;
			this.select = getApp().globalData.select;
			this.meeting = meeting;
			this.id = meeting.id;
			console.log(this.check);
			console.log(meeting);



			this.date = '';
			this.startDate = meeting.time.split('至')[0];
			this.endDate = meeting.time.split('至')[1];
			this.picture = this.parseString(meeting.picture);
			this.reject_reason = meeting.reject_reason;

			this.try1 = meeting.try_; // 约见机关负责人或旁听案件审理
			this.inspect = meeting.inspect; // 个人持证视察并形成报告
			this.activity = meeting.activity; // 参加“七个一”活动积达标
			this.activity2 = meeting.activity2;
			this.group_work = meeting.group_work; // 参加小组活动及培训视察列席会议
			this.survey = meeting.survey; // 参加有关部门听证、测评检查调研
			this.material = meeting.material; // 交述职材料或口头述职
			this.duty = meeting.duty; // 参加代表之家（工作室）值班
			this.solve = meeting.solve;
			this.complete = meeting.complete; // 完成代表履职等级表
			this.supplement_try = meeting.supplement_try; // 约见机关负责人或旁听案件审理补充内容
			this.supplement_inspect = meeting.supplement_inspect; // 个人持证视察并形成报告补充内容
			this.supplement_activity = meeting.supplement_activity; // 参加“七个一”活动积达标补充内容
			this.supplement_activity2 = meeting.supplement_activity2; // 参加”七个一“之外办实事好事
			this.supplement_group_work = meeting.supplement_group_work; // 参加小组活动及培训视察列席会议补充内容
			this.supplement_survey = meeting.supplement_survey; // 参加有关部门听证、测评检查调研补充内容
			this.supplement_material = meeting.supplement_material; // 交述职材料或口头述职补充内容
			this.supplement_duty = meeting.supplement_duty; // 参加代表之家（工作室）值班补充内容
			this.supplement_solve = meeting.supplement_solve; // 值班中解决实际问题
			this.supplement_complete = meeting.supplement_complete; // 完成代表履职等级表补充内容


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
			pass(passCheck) {
				// passCheck： 1通过 2拒绝 (0设为未审核)
				if (passCheck == 2) {
					this.$refs.inputDialog.open();
					this.passCheck = passCheck;
				} else {
					// 设为未审核或通过会调用else部分
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
					if (passCheck == 0) {
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

			maskClick() {
				console.log(this.range);
			},
			suppl_try_text_area_blur: function(e) {
				this.supplement_try = e.detail.value;
				// console.log(this.supplement_try);
				// console.log(this.try1);
			},
			suppl_inspect_text_area_blur: function(e) {
				this.supplement_inspect = e.detail.value;
				// console.log(this.supplement_inspect);
				// console.log(this.inspect);
			},
			suppl_activity_text_area_blur: function(e) {
				this.supplement_activity = e.detail.value;
				// console.log(this.supplement_activity);
				// console.log(this.activity);
			},
			suppl_activity2_text_area_blur: function(e) {
				this.supplement_activity2 = e.detail.value;
				// console.log(this.supplement_activity2);
				// console.log(this.activity2);
			},
			suppl_group_work_text_area_blur: function(e) {
				this.supplement_group_work = e.detail.value;
				// console.log(this.supplement_group_work);
				// console.log(this.group_work);
			},
			suppl_survey_text_area_blur: function(e) {
				this.supplement_survey = e.detail.value;
				// console.log(this.supplement_survey);
				// console.log(this.survey);
			},
			suppl_material_text_area_blur: function(e) {
				this.supplement_material = e.detail.value;
				// console.log(this.supplement_material);
				// console.log(this.material);
			},
			suppl_duty_text_area_blur: function(e) {
				this.supplement_duty = e.detail.value;
				// console.log(this.supplement_duty);
				// console.log(this.duty);
			},
			suppl_solve_text_area_blur: function(e) {
				this.supplement_solve = e.detail.value;
				// console.log(this.supplement_solve);
				// console.log(this.solve);
			},
			suppl_complete_text_area_blur: function(e) {
				this.supplement_complete = e.detail.value;
				// console.log(this.supplement_complete);
				// console.log(this.complete);
			},
			upload_no_meeting() {
				uni.request({
					url: "https://w204882q59.zicp.fun/insertNoMeetingReview",
					method: "POST",
					data: {
						user_id: uni.getStorageSync("userId"),
						nickname: uni.getStorageSync("nickname"),
						add_id: uni.getStorageSync("userId"),
						time: this.startDate + '至' + this.endDate,
						try1: this.try1,
						supplement_try: this.supplement_try,
						inspect: this.inspect,
						supplement_inspect: this.supplement_inspect,
						activity: this.activity,
						supplement_activity: this.supplement_activity,
						activity2: this.activity2,
						supplement_activity2: this.supplement_activity2,
						group_work: this.group_work,
						supplement_group_work: this.supplement_group_work,
						survey: this.survey,
						supplement_survey: this.supplement_survey,
						material: this.material,
						supplement_material: this.supplement_material,
						duty: this.duty,
						supplement_duty: this.supplement_duty,
						solve: this.solve,
						supplement_solve: this.supplement_solve,
						complete: this.complete,
						supplement_complete: this.supplement_complete,
						picture: this.meeting.picture
					},
					success: (res) => {
						if (res.data.result.success) {
							this.$util.showToast("数据上传成功");
							console.log("数据上传成功");

							// 上传数据成功后删除旧数据并返回到上一层页面
							this.$req.post('/DeletePointsInfo', {
								id: this.meeting.id,
								select: this.select
							}).then(res => {
								console.log(res);
								if (res.result.success) {
									console.log("删除旧数据成功");
									uni.navigateBack({
										delta: 1
									});
								}
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