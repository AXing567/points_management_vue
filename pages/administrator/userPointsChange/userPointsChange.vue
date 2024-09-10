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
        <button class="button" :class="{active: check === 1}"  @click="select_user_points_changed(1,current)">
          通过
        </button>
        <button class="button" :class="{active: check === 2}"  @click="select_user_points_changed(2,current)">
          未通过
        </button>
      </view>
    </view>
    <view class="meeting_points-container">
      <view class="meeting_points" v-for="(meeting, index) in meetings" v-show="current==1" @click="nav_to_meeting_info(index)">
        会议期间 第{{meeting.session}}届{{meeting.ordinal}}次积分变动&nbsp;&nbsp;&nbsp;&nbsp;{{check == 0 ? '预' : check == 1 ? '已' : '未'}}+{{meeting.total}}分
      </view>
      <view class="meeting_points" v-for="(meeting, index) in meetings" v-show="current==0" @click="nav_to_no_meeting_info(index)">
        闭会期间 积分变动&nbsp;&nbsp;&nbsp;&nbsp;{{check == 0 ? '预' : check == 1 ? '已' : '未'}}+{{meeting.total}}分
      </view>
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
				check: '',
				current: 1,
				radioItems: [{
						value: '0',
						name: '闭会期间'
					},
					{
						value: '1',
						name: '会议期间'
					}
				],
				meetings: {}
			}
		},
		methods: {
			nav_to_meeting_info(index) {
				this.$util.navigateTo('/pages/administrator/userPointsChange/meeting_info');
				getApp().globalData.index = index;
				console.log(index);
			},
			nav_to_no_meeting_info(index) {
				this.$util.navigateTo('/pages/administrator/userPointsChange/no_meeting_info');
				getApp().globalData.index = index;
				console.log(index);
			},
			radio_change: function(evt) {
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
				}).then(res => {
					this.meetings = res;
					getApp().globalData.meetings = res;
					console.log(res);
				});
			}
		}
	}
</script>

<style>
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
  font-size: 28rpx;
  color: #333333;
  line-height: 1.5;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid #e5e5e5;
  cursor: pointer;
  transition: all 0.3s ease;
}

.meeting_points:hover {
  color: #007BA6;
}
</style>