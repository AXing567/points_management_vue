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
			<view class="">
				<view class="line"> </view>
				<view class="title">
					约见机关负责人或旁听案件审理（5分/次）
				</view>
				<view class="points">
					<textarea @blur="suppl_try_text_area_blur" auto-height placeholder="补充内容(最大长度140字):"></textarea>
					<input type="number" v-model:value="try1" class="input">
				</view>
			</view>

			<view class="">
				<view class="line"> </view>
				<view class="title">
					个人持证视察并形成报告积(10分/次)
				</view>
				<view class="points">
					<textarea @blur="suppl_inspect_text_area_blur" auto-height placeholder="补充内容(最大长度140字):"></textarea>
					<input type="number" v-model:value="inspect" class="input">
				</view>
			</view>

			<view class="">
				<view class="line"> </view>
				<view class="title">
					参加“七个一”活动积达标（5分/项）
				</view>
				<view class="points">
					<textarea @blur="suppl_activity_text_area_blur" auto-height
						placeholder="补充内容(最大长度140字):"></textarea>
					<input type="number" v-model:value="activity" class="input">
				</view>
			</view>

			<view class="">
				<view class="line"> </view>
				<view class="title">
					参加“七个一”之外办实事好事（5-10分）
				</view>
				<view class="points">
					<textarea @blur="suppl_activity2_text_area_blur" auto-height
						placeholder="补充内容(最大长度140字):"></textarea>
					<input type="number" v-model:value="activity2" class="input">
				</view>
			</view>

			<view class="">
				<view class="line"> </view>
				<view class="title">
					参加小组活动及培训视察列席会议（5分/次）
				</view>
				<view class="points">
					<textarea @blur="suppl_group_work_text_area_blur" auto-height
						placeholder="补充内容(最大长度140字):"></textarea>
					<input type="number" v-model:value="group_work" class="input">
				</view>
			</view>

			<view class="">
				<view class="line"> </view>
				<view class="title">
					参加有关部门听证、测评检查调研（5分/次）
				</view>
				<view class="points">
					<textarea @blur="suppl_survey_text_area_blur" auto-height placeholder="补充内容(最大长度140字):"></textarea>
					<input type="number" v-model:value="survey" class="input">
				</view>
			</view>

			<view class="">
				<view class="line"> </view>
				<view class="title">
					交述职材料或口头述职（5-10分）
				</view>
				<view class="points">
					<textarea @blur="suppl_material_text_area_blur" auto-height
						placeholder="补充内容(最大长度140字):"></textarea>
					<input type="number" v-model:value="material" class="input">
				</view>
			</view>

			<view class="">
				<view class="line"> </view>
				<view class="title">
					参加代表之家（工作室）值班（5分/次）
				</view>
				<view class="points">
					<textarea @blur="suppl_duty_text_area_blur" auto-height placeholder="补充内容(最大长度140字):"></textarea>
					<input type="number" v-model:value="duty" class="input">
				</view>
			</view>

			<view class="">
				<view class="line"> </view>
				<view class="title">
					值班中解决实际问题(5-10分)
				</view>
				<view class="points">
					<textarea @blur="suppl_solve_text_area_blur" auto-height placeholder="补充内容(最大长度140字):"></textarea>
					<input type="number" v-model:value="solve" class="input">
				</view>
			</view>

			<view class="">
				<view class="line"> </view>
				<view class="title">
					完成代表履职等级表（5-10分）
				</view>
				<view class="points">
					<textarea @blur="suppl_complete_text_area_blur" auto-height
						placeholder="补充内容(最大长度140字):"></textarea>
					<input type="number" v-model:value="complete" class="input">
				</view>
				<view class="line"> </view>
			</view>
		</view>
		<uni-section title="上传图片(请确保无重复图片,否则请删除重添加)" type="line">
			<view class="example-body">
				<uni-file-picker limit="9" title="最多选择9张图片" @select="select" :autoUpload="false"
					@delete="del_img"></uni-file-picker>
			</view>
		</uni-section>
		<button @click="upload_no_meeting">非大会相关积分变动信息上传测试</button>
	</view>
</template>

<script>
	var fileNameMap = new Map();
	export default {
		data() {
			return {
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
				supplement_complete: '' // 完成代表履职等级表补充内容

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
			// 获取上传状态
			select(e) {
				const tempFilePaths = e.tempFilePaths;
				for (let i = 0; i < tempFilePaths.length; i++) {

					uni.uploadFile({
						url: 'https://w204882q59.zicp.fun/uploadImg',
						// url: 'http://localhost:8080/uploadImg',
						filePath: tempFilePaths[i],
						name: 'myfile',
						formData: {
							userId: uni.getStorageSync('userId')
						},
						success: (uploadFileRes) => {
							// 解析响应数据
							var data = JSON.parse(uploadFileRes.data);
							// 键：文件原名     值：文件名经过md5运算后加上点和后缀 
							fileNameMap.set(
								e.tempFiles[i].name, data.result.md5FileName + '.' + e.tempFiles[i].extname
							);
							console.log(e.tempFiles[i].name + data.result.message);
							uni.showToast({
								title: e.tempFiles[i].name + data.result.message,
								duration: 2000,
								icon: "none"
							});
						}
					});

				}
			},
			del_img(e) {
				uni.request({
					url: "https://w204882q59.zicp.fun/deleteFile",
					method: "POST",
					data: {
						user_id: uni.getStorageSync('userId'),
						fileName: fileNameMap.get(e.tempFile.name)
					},
					success: (res) => {
						uni.showToast({
							title: res.data.result.message,
							duration: 2000,
							icon: "none"
						});
					}
				})
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
				var picture = '';
				fileNameMap.forEach(function(item) {
					picture += (uni.getStorageSync('userId') + '/' + item.toString() + ';');
				});
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
						'picture': picture
					},
					success: (res) => {
						if (res.data.result.success) {
							this.$util.showToast("数据上传成功");
							console.log("数据上传成功");
						}else{
							this.$util.showToast("数据上传失败");
							console.error("数据上传失败");
						}
					}
				})
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