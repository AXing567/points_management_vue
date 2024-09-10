<template>
	<view>
		<view class="radio-group-container">
			<radio-group class="radio-group" @change="radio_change">
				<label class="radio-item uni-list-cell" v-for="(item, index) in radioItems" :key="item.value">
					<view class="radio-item__wrapper">
						<radio class="radio-item__radio" :value="item.value" :checked="index === current" />
					</view>
					<view class="radio-item__text">{{item.name}}</view>
				</label>
			</radio-group>
			<view class="button-group">
				<button class="button" :class="{active: check === 0}" @click="select_user_points_changed(0,current)">
					未审核
				</button>
				<button class="button" :class="{active: check === 1}" @click="select_user_points_changed(1,current)">
					通过
				</button>
				<button class="button" :class="{active: check === 2}" @click="select_user_points_changed(2,current)">
					未通过
				</button>
			</view>
		</view>
		<view class="meeting_points-container">
			<view class="meeting_points" v-for="(meeting, index) in meetings" v-show="current==1">
				<view class="" @click="nav_to_meeting_info(index)">
					{{meeting.nickname}}
					第{{meeting.session}}届{{meeting.ordinal}}次大会&nbsp;&nbsp;&nbsp;&nbsp;{{check == 0 ? '预' : check == 1 ? '已' : '未'}}+{{meeting.total}}分
					<view class="" v-show="meeting.reject_reason && check == 2">
						拒绝原因：{{meeting.reject_reason}}
					</view>

				</view>
				<view class="operate">
					<uni-icons type="checkmarkempty" size="30" @click="pass(meeting.id,1,current,index)"
						v-show="check == 0"></uni-icons>
					<uni-icons type="closeempty" size="30" @click="pass(meeting.id,2,current,index)"
						v-show="check == 0"></uni-icons>
				</view>
			</view>

			<view class="meeting_points" v-for="(meeting, index) in meetings" v-show="current==0">
				<view class="" @click="nav_to_no_meeting_info(index)">
					{{meeting.nickname}}
					积分变动&nbsp;&nbsp;&nbsp;&nbsp;{{check == 0 ? '预' : check == 1 ? '已' : '未'}}+{{meeting.total}}分
					<view class="" v-show="meeting.reject_reason && check == 2">
						拒绝原因：{{meeting.reject_reason}}
					</view>
				</view>
				<view class="operate">
					<uni-icons type="checkmarkempty" size="30" @click="pass(meeting.id,1,current,index)"
						v-show="check == 0"></uni-icons>
					<uni-icons type="closeempty" size="30" @click="pass(meeting.id,2,current,index)"
						v-show="check == 0"></uni-icons>
				</view>

			</view>

			<uni-popup ref="inputDialog" type="dialog">
				<uni-popup-dialog ref="inputClose" mode="input" title="请输入拒绝理由" value="" placeholder="请输入拒绝理由"
					@confirm="dialogInputConfirm"></uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>
<script>
	export default {
		globalData: {
			meetings: {},
			index: '',
			check: '',
			select: ''

		},
		data() {
			return {
				check: '', // 0未审核 1通过 2未通过
				current: 1, // 当前单选按钮组所选的（1为会议期间  反之  闭会期间）
				radioItems: [{
						value: '0',
						name: '闭会期间'
					},
					{
						value: '1',
						name: '会议期间'
					}
				],
				meetings: {},
				id: '', // 用于显示弹窗后上传拒绝记录（pass、dialogInputConfirm函数中使用）
				passCheck: '', // 用于显示弹窗后上传拒绝记录（pass、dialogInputConfirm函数中使用）
				select: '', // 用于显示弹窗后上传拒绝记录（pass、dialogInputConfirm函数中使用）
				tempIndex: '', // 用于显示弹窗后上传拒绝记录（pass、dialogInputConfirm函数中使用）
			}
		},
		onShow() {
			// 如果check中有值那么代表着点击过改变check的按钮 ， 所以会从子页面返回时执行此代码
			// 功能：重新加载未审核、已审核、未通过部分
			if (this.check === 0 || this.check === 1 || this.check === 2) {
				this.$req.post('/ReviewPointChangesServlet', {
					user_id: uni.getStorageSync("userId"),
					"check": this.check,
					"select": this.current,
					"all": 1
				}).then(res => {
					this.meetings = res;
					getApp().globalData.meetings = res;
					console.log(res);
				});

			}
		},
		methods: {
			pass(id, passCheck, select, index) {
				// passCheck： 1通过 2拒绝
				if (passCheck == 2) {
					this.$refs.inputDialog.open();
					this.id = id;
					this.passCheck = passCheck;
					this.select = select;
					this.tempIndex = index;
				} else {
					this.$req.post('/UpdateMeetingCheckOrNoMeetingCheck', {
						"id": id,
						"check": passCheck,
						"select": select,
					}).then(res => {
						console.log(res);
						if (res.result.success) {
							delete this.meetings[index];
							this.$forceUpdate(); // 删除元素后强制刷新以确保删除的元素不被再显示
						}
						this.$util.showToast(res.result.message);
					});
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
						delete this.meetings[this.tempIndex];
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
			nav_to_meeting_info(index) {
				this.$util.navigateTo('/pages/administrator/user-points-process/meeting-process');
				getApp().globalData.index = index;
				console.log(index);
			},
			nav_to_no_meeting_info(index) {
				this.$util.navigateTo('/pages/administrator/user-points-process/no-meeting-process');
				getApp().globalData.index = index;
				console.log(index);
			},
			radio_change: function(evt) {
				this.check = '';
				for (let i = 0; i < this.radioItems.length; i++) {
					if (this.radioItems[i].value === evt.detail.value) {
						this.current = i;
						this.meetings = {};
						getApp().globalData.meetings = {};
						console.log(i);
						break;
					}
				}
			},
			select_user_points_changed(check, select) {
				this.check = check;
				getApp().globalData.check = check;
				getApp().globalData.select = select;
				this.$req.post('/ReviewPointChangesServlet', {
					user_id: uni.getStorageSync("userId"),
					"check": check,
					"select": select,
					"all": 1
				}).then(res => {
					this.meetings = res;
					getApp().globalData.meetings = res;
					console.log(res);
				});
			}
		}
	}
</script>

<style lang="less">
	.radio-group-container {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.radio-group {
		display: flex;
		flex-wrap: wrap;
		margin-right: 20rpx;
	}

	.radio-item {
		display: flex;
		align-items: center;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		cursor: pointer;
	}

	.radio-item__wrapper {
		margin-right: 10rpx;
	}

	.radio-item__radio {
		width: 36rpx;
		height: 36rpx;
	}

	.radio-item__text {
		font-size: 28rpx;
		color: #333333;
	}

	.button-group {
		display: flex;
		align-items: center;
	}

	.button {
		font-size: 28rpx;
		color: #666666;
		background-color: #f5f5f5;
		border: none;
		border-radius: 6rpx;
		padding: 16rpx 24rpx;
		margin-right: 20rpx;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.button:hover {
		background-color: #e5e5e5;
	}

	.button.active {
		color: #ffffff;
		background-color: #007BA6;
	}

	.meeting_points-container {
		margin-top: 20rpx;
	}

	.meeting_points {
		display: flex;
		align-items: center;
		justify-content: space-around;
		font-size: 28rpx;
		color: #333333;
		line-height: 1.5;
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid #e5e5e5;
		cursor: pointer;
		transition: all 0.3s ease;

		.operate {}
	}

	.meeting_points:hover {
		color: #007BA6;
	}
</style>