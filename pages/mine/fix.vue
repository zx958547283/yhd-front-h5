<template>
	<view class="mine">
		<view class="list01" @click="upload">
			<text view class="text01">头像</text>
			<view class="cir">
				<!-- <image :src="head" mode="" v-if="head!=''" class="head"></image> -->
				<image :src="userImg == '' ? '../../static/images/ab60c5c48fabe36b0b842d51413d9842@2x.png': userImg" class="cinema"></image>
			</view>
			<view class="jiantou"></view>
		</view>
		<view class="list02">
			<view class="text02">手机号码</view>
			<input type="text" value="userPhone" class="userPhone" v-model="userPhone" />
		</view>
		<button type="primary" @click="save" class="baocun">保存</button>
	</view>
</template>

<script>
	import pakTool from "@/common/utils/utility.js";
	export default {
		onLoad(option) {
			let {
				userPhone,
				userImg
			} = option;
			let {
				memberId
			} = uni.getStorageSync("admin_user");
			this.userPhone = userPhone;
			this.userImg = userImg;
			this.memberId = memberId;
			// this.memberId = "68154009-69b9-4948-85b9-980ea09ec34c";
		},
		data() {
			return {
				userPhone: "联系方式",
				userImg: "", // 头像
				Img: "" ,// 图片传后台用
				memberId:"" // 用户id
			};
		},
		methods: {
			// 头像上传
			upload(e) {
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ["compressed"],
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						// 展示用
						this.userImg = tempFilePaths[0];
						console.log(this.userImg)
						uni.uploadFile({
							url: that.config.contextPath + "/common/uploadFile",
							filePath: tempFilePaths[0],
							name: "file",
							success: (uploadFileRes) => {
								console.log(uploadFileRes);
								let {
									data
								} = JSON.parse(uploadFileRes.data);
								this.Img = data.fileURL;
								console.log(this.Img)
							}
						});
					}
				});
			},
			// 修改用户信息
			async setUser() {
				console.log(123)
				let requestPak = pakTool.createRequestPak();
				requestPak.requestBody = {
					member_id: this.memberId, // 用户id
					member_header: this.Img, // 头像
					phone: this.userPhone // 手机
				};
				const {
					data
				} = await pakTool.request(
					"",
					"/madyApp/saveCustomer",
					requestPak
				);
				console.log(data);
			},
			// 保存上传
			save() {
				this.setUser();
				uni.navigateBack({
					url:'/pages/mine/mine'
				})
			}
		}
	};
</script>

<style lang="scss">
	.mine {
		width: 100%;
		height: 100%;
		background-color: #e4e4e4;

		.list01 {
			width: 100%;
			height: 160rpx;
			padding: 0 30rpx;

			.text01 {
				font-size: 30rpx;
				float: left;
				height: 160rpx;
				line-height: 160rpx;
				padding-right: 140rpx;
			}

			.cir {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				position: absolute;
				left: 0;
				top: 50%;
				overflow: hidden;
				transform: translate(0, -50%);
				position: relative;

				.head {
					width: 100%;
					height: 100%;
				}

				.cinema {
					width: 100rpx;
					height: 100rpx;
					// float: left;
					// position: relative;
					// top: 30rpx;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}
			}

			.jiantou {
				width: 20rpx;
				height: 20rpx;
				border-top: 4rpx solid #cccccc;
				border-right: 4rpx solid #cccccc;
				transform: rotate(45deg);
				float: right;
				position: relative;
				top: -35rpx;
				left: -60rpx;
			}
		}

		.list02 {
			width: 100%;
			height: 100rpx;
			padding: 0 30rpx;

			.text02 {
				float: left;
				margin-right: 70rpx;
				height: 100rpx;
				line-height: 100rpx;
			}

			.userPhone {
				height: 100rpx;
				float: left;
			}
		}

		.baocun {
			width: 90%;
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 40rpx;
			background-color: #c59a76;
			position: absolute;
			left: 50%;
			bottom: 150rpx;
			transform: translate(-50%, -50%);
		}
	}
</style>
