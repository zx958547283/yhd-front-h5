<template>
	<view class="box">
		<!-- 顶部  账户部分-->
		<view class="top_bgc">
			<view class="spend_top">
				<view class="arc_top">
					<view class="top">
						<view class="user_img" v-if="userImage!=''">
							<image :src="userImage" mode="scaleToFill"></image>
						</view>
						<view class="">
							<view class="user_img" v-if="userImage==''" style="font-weight:700;width:130rpx;height:130rpx;margin-bottom: 20rpx;border-radius: 50%;line-height: 130rpx;text-align: center; background-color: #F2F2F2;font-size: 36rpx;">
							  {{ userName.substr(0,1) }}
							</view>
						</view>
						<view class="info">
							<view class="info-box">
								<view class="userName">{{ userName }}</view>
								<view class="userSex">{{ userSex == 1? "男":"女" }}</view>
								<view class="userPhone">{{ userPhone }}</view>
							</view>
							<!-- <view class="info-box" style="margin-top:16rpx;">
								<view class="userType">{{ userType }}</view>
								<view class="userLevel">{{ userLevel }}</view>
								<view class="userState">{{ userState }}</view>
							</view> -->
						</view>
					</view>
				</view>
				<view class="arc_btm">
					<view class="btm_num">
						<view class="txt">
							{{surplus}}
						</view>
						<view class="num">
							剩余次数
						</view>
					</view>
					<view class="btm_num">
						<view class="txt">
							{{consumption}}
						</view>
						<view class="num">
							消费次数
						</view>
					</view>
					<view class="btm_num">
						<view class="txt">
							{{recharge}}
						</view>
						<view class="num">
							充值次数
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="fa_cell">
			<view class="tabone">
				<!-- 消费数据 -->
				<view class="pressure" v-for="(item,index) in tableData" :key='index'>
					<view style="height: 40rpx; width: 6rpx;border-radius: 0 5rpx 5rpx 0; background-color: #C59A76;position: absolute;left: 0;">
					</view>
					<view class="title">
						<view style="display: inline-block;float: left;">
							<text class="text">消费ID:</text>
							<text>{{ item.record_num }}</text>
						</view>
						<view class="surplus">
							<text style="margin-right: 20rpx;color: #696969;">消费次数</text>
							<text style="color: #C59A76;">{{ item.mady_times }}</text>
						</view>
					</view>
					<view class="main">
						<!-- <view>
							<text class="text">理疗编号:</text>
							<text>{{ item.record_num }}</text>
						</view> -->
						<view>
							<text class="text">健康专员:</text>
							<text>{{ item.username == null ? "" : item.username }}</text>
						</view>
						<view>
							<text class="text">项目名称:</text>
							<text>{{ item.care_project_name }}</text>
						</view>
						<view>
							<text class="text">消费时间:</text>
							<text>{{ item.record_time }}</text>
						</view>
					</view>
				</view>
				<!-- 为空时 -->
				<view class="none" v-if="tableData.length==0">
					<view class="img">
						<image src="../../static/images/none.png" mode=""></image>
					</view>
					<view class="txt">
						暂无数据
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue";
	import pakTool from "@/common/utils/utility.js"; // 调取接口
	export default {
		onLoad() {
			let {
				memberId
			} = uni.getStorageSync("admin_user");
			this.memberId = memberId;
			// this.memberId = "68154009-69b9-4948-85b9-980ea09ec34c";
			this.getUser();
			this.getData();
		},
		components: {
			uniIcons
		},
		//上拉加载
		onReachBottom() {
			if (this.total == this.tableData.length) {
				uni.showToast({
					title: '没有更多数据了',
					icon: 'none'
				})
				return
			}
			this.startIndex++
			this.getData();
		},
		data() {
			return {
				userImage: "../../static/day_show/10.jpg",
				userName: "姓名",
				userSex: 1,
				userPhone: "联系方式",
				// userType: "白金会员",
				// userLevel: "一般",
				// userState: "成交",
				surplus: 0, // 剩余次数
				consumption: 0, // 消费次数
				recharge: 0, // 充值次数
				startIndex: 1,
				total: 0,
				memberId: "", // 用户id
				tableData: [{
					// amount: null,
					// care_plan_id: "7537253f-7647-4c6c-953d-29e6da078231",
					// care_project_name: "按压式牙签",
					// care_record_id: "29cf5d4c-b636-4614-8e00-b52251527b8c",
					// create_time: null,
					// create_user: null,
					// dr: 0,
					// edit_time: null,
					// edit_user: null,
					// exc_key: 0,
					// id: "382529d1-b6e0-42d8-bf29-548bc176390b",
					// mady_times: 2,
					// member_id: "68154009-69b9-4948-85b9-980ea09ec34c",
					// now_times: -2,
					// record_num: "20200609100958",
					// record_time: "2020-06-09T02:09:58.000+0000",
					// username: "健康专员A"
				}]
			};
		},
		methods: {
			// 获取用户信息
			async getUser() {
				let requestPak = pakTool.createRequestPak();
				requestPak.requestBody = {
					member_id: this.memberId, // 用户id
					admin_user_id: "" // 员工id
				};
				const {
					data
				} = await pakTool.request(
					this,
					"/madyApp/getCustomerCenter",
					requestPak
				);
				console.log(data);
				this.userImage = data.memberInfo.icon;
				this.userName = data.memberInfo.real_name;
				this.userSex = data.memberInfo.gender;
				this.userPhone = data.memberInfo.phone;
				// this.userType = data.targs[0];
				// this.userLevel = data.targs[1];
				// this.userState = data.targs[2];
			},

			// 获取消费记录页数据
			async getData() {
				let requestPak = pakTool.createRequestPak();
				requestPak.requestBody = {
					member_id: this.memberId,
					startIndex: 1,
					pagesize: 10
				};
				const {
					data
				} = await pakTool.request(
					this,
					"/madyApp/getMemberConsume",
					requestPak
				);
				console.log(data);
				this.surplus = data.surplusCnt;
				this.consumption = data.totalConsumeCnt;
				this.recharge = data.totalDepositCnt;
				this.tableData = data.deopsit;
				this.total = data.deopsit.length
			}
		}
	};
</script>

<style lang="less" scoped>
	.box {
		min-height: 100%;
		font-size: 30rpx;
		background-color: #f7f7f7;

		//账户信息部分
		.top_bgc {
			background-image: url("../../static/images/支付背景.png");
			padding: 50rpx 30rpx 25rpx;
			box-sizing: border-box;
			background-repeat: no-repeat;
			background-size: 100% 280rpx;
			background-color: rgb(240, 242, 245);
			// box-shadow: 0 4rpx 24rpx 12rpx rgba(133, 133, 133, 0.1);
			.spend_top {
				border-radius: 20rpx;
				// background-color: yellow;
				// box-shadow: 0 4rpx 24rpx 12rpx rgba(133, 133, 133, 0.1);
				.arc_top {
					border-radius: 20rpx 20rpx 0 0;
					padding: 0 40rpx;
					position: relative;
					box-sizing: border-box;
					overflow: hidden;
					background: #ffffff;

					.top {
						border-bottom: 2rpx solid #d8d8d8;
						overflow: hidden;
						padding: 30rpx 0 0 0;
						display: flex;
						justify-content: left;
						align-items: center;

						.user_img {
							image {
								width: 110rpx;
								height: 110rpx;
								border-radius: 100rpx;
							}
						}

						.info {
							display: flex;
							justify-content: flex-start;
							align-items: center;
							flex-wrap: wrap;
							padding: 0 43rpx;

							.info-box {
								display: flex;
								align-items: center;
								width: 100%;

								.userName {
									font-size: 34rpx;
							
								}

								.userSex {
									padding: 0 25rpx;
									font-size: 30rpx;
								}

								.userPhone {
									font-size: 24rpx;
								}

								.userType,
								.userLevel,
								.userState {
									color: #fff;
									text-align: center;
									border-radius: 10rpx;
									padding: 5rpx 10rpx;
									font-size: 28rpx;
								}

								.userType {
									background: #c59a76;
								}

								.userLevel {
									background: #f9a94c;
									margin: 0 13rpx;
								}

								.userState {
									background: #eb7054;
								}
							}
						}
					}
				}

				.arc_btm {
					display: flex;
					padding: 30rpx 0 40rpx 0;
					justify-content: space-around;
					background: #ffffff;
					border-radius: 0 0 20rpx 20rpx;

					.btm_num {
						flex: 0 0 25%;

						.txt {
							text-align: center;
							color: #c59a76;
							font-size: 36rpx;
						}

						.num {
							text-align: center;
							font-size: 28rpx;
						}
					}
				}
			}
		}

		.fa_cell {
			// background-color: #f7f7f7;

			.tabone {
				padding: 40rpx 30rpx 20rpx;
				font-size: 30rpx;

				.pressure {
					background-color: #ffffff;
					overflow: hidden;
					border-radius: 17rpx;
					padding: 30rpx;
					margin-bottom: 30rpx;
					// box-shadow: 0 4rpx 24rpx 12rpx rgba(133, 133, 133, 0.1);
					position: relative;

					.title {
						display: inline-block;
						vertical-align: middle;
						margin-bottom: 30rpx;
						width: 100%;

						.surplus {
							float: right;
						}
					}

					.text {
						margin-right: 15rpx;
					}

					.main {
						border-top: 2rpx solid #eee;
						padding-top: 20rpx;
						height: 180rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						position: relative;

						.text {
							color: #696969;
						}

						.arrow {
							position: absolute;
							right: 0;
							top: 50%;
							transform: translateY(-50%);
						}
					}

					.main>view {
						width: 90%;
					}
				}

				// 没有数据时显示
				.none {
					padding: 50rpx;

					.img {
						width: 550rpx;
						height: 406rpx;
						margin: 0 auto;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.txt {
						text-align: center;
						margin-top: -50rpx;
					}
				}

			}

		}
	}
</style>
