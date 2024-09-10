<!-- 子组件 CustomComponent.vue -->
<template>
  <view class="container">
    <view class="title">会议积分信息</view>
    <view class="info">
      <view class="row">
        <view class="label">ID：</view>
        <view class="value">{{ meeting.id }}</view>
      </view>
      <view class="row">
        <view class="label">总积分：</view>
        <view class="value">{{ meeting.total }}</view>
      </view>
      <view class="row">
        <view class="label">会议届数：</view>
        <view class="value">{{ meeting.session }}</view>
      </view>
      <view class="row">
        <view class="label">会议次数：</view>
        <view class="value">{{ meeting.ordinal }}</view>
      </view>
      <view class="row">
        <view class="label">昵称：</view>
        <view class="value">{{ meeting.nickname }}</view>
      </view>
      <view class="row">
        <view class="label">出席积分：</view>
        <view class="value">{{ meeting.attend }}</view>
      </view>
      <view class="row">
        <view class="label">考虑积分：</view>
        <view class="value">{{ meeting.consider }}</view>
      </view>
      <view class="row">
        <view class="label">推荐积分：</view>
        <view class="value">{{ meeting.recommendation }}</view>
      </view>
      <view class="row">
        <view class="label">账单积分：</view>
        <view class="value">{{ meeting.bill }}</view>
      </view>
      <view class="row">
        <view class="label">提问积分：</view>
        <view class="value">{{ meeting.question }}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    meeting: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20rpx;
}

.title {
  font-size: 30rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20rpx;
}

.info {
  background-color: #f8f8f8;
  padding: 20rpx;
  border-radius: 10rpx;
}

.row {
  display: flex;
  margin-bottom: 10rpx;
}

.label {
  flex: 1;
  font-size: 26rpx;
  font-weight: bold;
}

.value {
  flex: 2;
  font-size: 26rpx;
}
</style>