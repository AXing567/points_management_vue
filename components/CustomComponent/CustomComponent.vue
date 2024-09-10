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
        <input class="value" :value="meeting.total" disabled />
      </view>
      <view class="row">
        <view class="label">会议届数：</view>
        <input class="value" :value="meeting.session" disabled />
      </view>
      <view class="row">
        <view class="label">会议次数：</view>
        <input class="value" :value="meeting.ordinal" disabled />
      </view>
      <view class="row">
        <view class="label">昵称：</view>
        <input class="value" :value="meeting.nickname" disabled />
      </view>
      <view class="row">
        <view class="label">出席积分：</view>
        <input class="value" :value="meeting.attend" :disabled="!editable" @input="handleAttendInput" />
      </view>
      <view class="row">
        <view class="label">考虑积分：</view>
        <input class="value" :value="meeting.consider" :disabled="!editable" @input="handleConsiderInput" />
      </view>
      <view class="row">
        <view class="label">推荐积分：</view>
        <input class="value" :value="meeting.recommendation" :disabled="!editable" @input="handleRecommendationInput" />
      </view>
      <view class="row">
        <view class="label">账单积分：</view>
        <input class="value" :value="meeting.bill" :disabled="!editable" @input="handleBillInput" />
      </view>
      <view class="row">
        <view class="label">提问积分：</view>
        <input class="value" :value="meeting.question" :disabled="!editable" @input="handleQuestionInput" />
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
    editable: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleAttendInput(event) {
      this.$emit("input-attend", event.target.value);
    },
    handleConsiderInput(event) {
      this.$emit("input-consider", event.target.value);
    },
    handleRecommendationInput(event) {
      this.$emit("input-recommendation", event.target.value);
    },
    handleBillInput(event) {
      this.$emit("input-bill", event.target.value);
    },
    handleQuestionInput(event) {
      this.$emit("input-question", event.target.value);
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
  border: none;
  outline: none;
  background-color: transparent;
  text-align: right;
}
</style>