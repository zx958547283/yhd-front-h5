<template>
  <view class="box">
	<view class="arc_top">
		<view class="cir" v-if="imgurl!=''">
			<image :src="imgurl" mode=""></image>
		</view>
		<view class="cir" v-if="imgurl==''" style="font-weight:700;width:130rpx;height:130rpx;margin-bottom: 20rpx;border-radius: 50%;line-height: 130rpx;text-align: center;background-color: #F2F2F2;">
			{{name.substr(0,1)}}
		</view>
		<view class="cum">
			<view class="row" style="margin-top:30rpx;">
				<text class="name">{{name}}</text>
				<text>{{phone}}</text>
			</view>
		</view>
	</view>
	
	
    <view class="fa_cell">
      <view class="tabthree">
        <!-- 理疗数据 -->
        <view class="pressure" style="margin-top: 20rpx;" v-for="(item,index) in tableData" :key='item.id'>
          <view class="title">
            理疗编号:&nbsp;&nbsp;{{ item.record_no }}
          </view>
          <view class="main">
            <view class="main_left">
              <image :src="item.img_path" mode="" @tap="getlarge(item.img_path)"></image>
            </view>
            <view class="main_right">
              <view class="mess">项目名称:&nbsp;&nbsp;{{ item.care_project_name }}</view>
              <view class="mess">健康专员:&nbsp;&nbsp;{{ item.username }}</view>
              <view class="mess">理疗时间:&nbsp;&nbsp;{{ item.record_time }}</view>
              <view class="arrow">
                <uni-icons type="arrowright" size="30" color="#CCCCCC"></uni-icons>
              </view>
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
        <!-- 弹窗 -->
        <!-- <uni-popup ref="popup" :maskClick="maskClickflag">
          <view class="pop">
            <image :src="img_enlarge" mode=""></image>
          </view>
        </uni-popup> -->
      </view>
    </view>
  </view>
</template>

<script>
import uniIcons from "@/components/uni-icons/uni-icons.vue";
import pakTool from "@/common/utils/utility.js"; // 调用接口
export default {
  components: {
    uniIcons
  },
  onReady() {
    let { memberId } = uni.getStorageSync("admin_user");
    this.memberId = memberId;
    // this.memberId = "68154009-69b9-4948-85b9-980ea09ec34c";
    // 获得用户数据
    this.getUser();
    // 获得理疗数据
    this.getData();
  },
  data() {
    return {
      imgurl: "",
      name: "姓名",
      sex: 1,
      phone: "联系方式",
      memberId: "", // 用户id
      startIndex: 1,
      total: 0,
      tableData: [
        {
          // care_plan_id: "810d2c0b-3cfe-4e62-a2d1-e59e31529df5",
          // care_project_name: "按压式牙签",
          // comment: "999",
          // id: "21684e7d-377b-482c-8752-df0361fdbef9",
          // img_path: "https://www.laohaowaner.com/qbresource//upload/file/b03de345397745e8bb0287ce5af3f9e0.jpg",
          // member_id: "68154009-69b9-4948-85b9-980ea09ec34c",
          // record_no: "000001",
          // record_time: "2020-06-10 09:47:00",
          // username: "健康专员A"
        }
      ],
      maskClickflag: "",
      img_enlarge: ""
    };
  },
  onLoad(option) {},
  //上拉加载
  onReachBottom() {
    if (this.total == this.tableData.length) {
      uni.showToast({
        title: "没有更多数据了",
        icon: "none"
      });
      return;
    }
    this.startIndex++;
    this.getData();
  },
  methods: {
    // 获得用户信息
    async getUser() {
      let requestPak = pakTool.createRequestPak();
      requestPak.requestBody = {
        member_id: this.memberId, // 客户id
        admin_user_id: "" // 登录员工id
      };
      const { data } = await pakTool.request(
        "",
        "/madyApp/getCustomerCenter",
        requestPak
      );
      console.log(data, "用户信息");
      this.imgurl = data.memberInfo.icon;
      this.name = data.memberInfo.real_name;
      this.sex = data.memberInfo.gender;
      this.phone = data.memberInfo.phone;
      // this.tagarr = data.targs;
    },
    // 获取调理记录列表信息
    async getData() {
      let requestPak = pakTool.createRequestPak();
      requestPak.requestBody = {
        member_id: this.memberId,
        startIndex: 1,
        pagesize: 10
      };
      const { data } = await pakTool.request(
        this,
        "/madyApp/getMemberCareRecordByMember",
        requestPak
      );
      console.log(data, "调理记录");
      this.tableData = data;
      this.total = data.length;
    },
    //预览图片
    getlarge(url) {
      this.maskClickflag = true;
      this.$refs.popup.open();
      this.img_enlarge = url;
      console.log(this.img_enlarge);
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  min-height: 100%;
  // background-color: #f7f7f7;
  font-size: 30rpx;
  
  .arc_top {
  	height: 200rpx;
  	background: linear-gradient(#ffffff, #f3f3f3);
  	padding: 0 40rpx;
  	position: relative;
  	box-sizing: border-box;
  	overflow: hidden;
  
  	.cir {
  		height: 110rpx;
  		width: 110rpx;
  		border-radius: 50%;
  		margin-top: 40rpx;
  		float: left;
  		overflow: hidden;
  		font-size: 36rpx;
  		image {
  			width: 100%;
  			height: 100%;
  		}
  	}
  
  	.cum {
  		float: left;
  		margin-top: 40rpx;
  		margin-left: 30rpx;
  
  		.row {
  			height: 65rpx;
  
  			.name {
  				font-size: 34rpx;
      font-weight: 700;
      margin-right: 30rpx;
  			}
  
  			.sex {
  				margin-right: 30rpx;
  			}
  		}
  
  		.squ {
  			view {
  				display: inline-block;
  				padding: 2rpx 15rpx;
  				border-radius: 10rpx;
  				color: white;
  				font-size: 28rpx;
  				// border: 1px solid #333;
  			}
  
  			.fir {
      background-color: #c59a76;
   margin-right: 13rpx;
  			}
  
  			.mid {
      background-color: #f9a94c;
     margin-right: 13rpx;
  			}
  
  			.las {
      background-color: #eb7054;
     margin-right: 13rpx;
  			}
  		}
  	}
  }


  //tab 导航部分
  .tab {
    height: 84rpx;
    padding: 20rpx 0;
    display: flex;
    justify-content: space-around;
    background-color: #ffffff;

    .tab_one {
      color: #c59a76;

      .line {
        height: 10rpx;
        width: 55rpx;
        margin: 0 auto;
        border-radius: 20rpx;
        background-color: #c59a76;
        margin-top: 20rpx;
      }
    }
  }

  .fa_cell {
    background-color: #f7f7f7;

    .tabthree {
      padding: 30rpx;
      font-size: 30rpx;

      .title {
        display: inline-block;
        margin-left: 30rpx;
        vertical-align: middle;
      }

      .pressure {
        background-color: #ffffff;
        overflow: hidden;
        // height: 446rpx;
		// box-shadow: 0 4rpx 24rpx 12rpx rgba(133, 133, 133, 0.1);
        border-radius: 17rpx;
        padding: 30rpx 0 10rpx 0;

        .main {
          margin: 20rpx 30rpx 0rpx 30rpx;
          border-top: 2rpx solid #d8d8d8;
          overflow: hidden;
          padding: 30rpx 0;

          .main_left {
            float: left;
            width: 162rpx;
            height: 162rpx;

            image {
              width: 100%;
              height: 100%;
            }
          }

          .main_right {
            width: 65%;
            height: 162rpx;
            float: right;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;

            .mess {
              display: table;
            }

            .arrow {
              position: absolute;
              right: 0;
              top: 50%;
              transform: translate(0, -50%);
            }
          }
        }
      }

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
