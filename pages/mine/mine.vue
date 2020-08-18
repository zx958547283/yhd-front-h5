<template>
  <view class="main">
	<view class="top_bgc">
	  <view class="arc_top">
	    <view class="thread">
	      <view class="cir" v-if="userImg!=''">
	        <image :src="userImg"></image>
	      </view>
	      <view class="cir" v-if="userImg==''" style="font-weight:700;width:130rpx;height:130rpx;margin-bottom: 20rpx;border-radius: 50%;line-height: 130rpx;text-align: center; background-color: #F2F2F2;font-size: 36rpx;">
	        {{ userName.substr(0,1) }}
	      </view>
	      <view class="cum">
	        <view class="row" >
	          <text class="name">{{ userName }}</text>
	          <text>{{ userPhone }}</text>
	        </view>
	        <view class="clerk">
	          <view style="margin-right:40rpx;" v-if="doctor">健康专员:<text>{{doctor}}</text></view>
	          <view v-if="server" >服务专员:<text>{{server}}</text></view>
	        </view>
	      </view>
	    </view>
	  </view>
	  <view class="arc_btm">
	    <view class="btm_num">
	      <view class="txt">
	     {{ surplusCnt }} 
	      </view>
	      <view class="num">
	        剩余次数
	      </view>
	    </view>
	    <view class="btm_num">
	      <view class="txt">
	       {{ totalConsumeCnt }}
	      </view>
	      <view class="num">
	        消费次数
	      </view>
	    </view>
	    <view class="btm_num">
	      <view class="txt">
	         {{ totalDepositCnt }}
	      </view>
	      <view class="num">
	        充值次数
	      </view>
	    </view>
	  </view>
	</view>
    <view class="page">
      <view class="myPerson" @click="mycus" style="border-radius: 30rpx 30rpx 0 0;" >
        <image src="http://xiaode.oos-cn.ctyunapi.cn/20200806/png/yhd/upload/202008061415508398218.png" mode="" class="pic04"></image>
        <view class="font01">消费记录</view>
        <view class="jiantou"></view>
      </view>
      <view class="myPerson" @click="myPerson">
        <image src="http://xiaode.oos-cn.ctyunapi.cn/20200806/png/yhd/upload/202008061416464194639.png" mode="" class="pic04"></image>
        <view class="font01">理疗记录</view>
        <view class="jiantou"></view>
      </view>
	<!--  <view class="myPerson" @click="appointment">
	    <image src="../../static/mine/5c2affbae34b3-04.png" mode="" class="pic04"></image>
	    <view class="font01">预约到店</view>
	    <view class="jiantou"></view>
	  </view> -->
	  <view class="myPerson" @click="myAppointment">
	    <image src="http://xiaode.oos-cn.ctyunapi.cn/20200806/png/yhd/upload/202008061417109756090.png" mode="" class="pic04"></image>
	    <view class="font01">我的预约</view>
	    <view class="jiantou"></view>
	  </view>
      <view class="myPerson page03" @click="logout" style="border-radius: 0 0 30rpx 30rpx;">
        <image src="http://xiaode.oos-cn.ctyunapi.cn/20200806/png/yhd/upload/202008061417348077856.png" mode="" class="pic04"></image>
        <view class="font01">退出登录</view>
        <view class="jiantou"></view>
      </view>
    </view>
    <uni-popup ref="popup" type="center">
      <view class="pop clearfix">
        <view class="sus_txt">
          退出
        </view>
        <view class="con_txt">
          确定要退出登录吗?
        </view>
        <view class="btm">
          <view class="yes" @click.stop="jump">
            确定
          </view>
          <view class="no" @click.stop="close">
            取消
          </view>
        </view>
      </view>
    </uni-popup>

  </view>
</template>

<script>
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import pakTool from "@/common/utils/utility.js";
export default {
  onShow() {
    console.log("onload");
    // 用户id
    let { memberId } = uni.getStorageSync("admin_user");
    this.memberId = memberId;
    // this.memberId = "68154009-69b9-4948-85b9-980ea09ec34c";
    console.log(this.memberId);
    // 获取用户信息
    this.getUser();
  },
  components: {
    uniPopup
  },
  data() {
    return {
      userName: "姓名",
      userPhone: "联系方式",
      userImg: "",
      memberId: "", // 用户id
      re: 0,
	  surplusCnt:0,
	  totalConsumeCnt:0,
	  totalDepositCnt:0,
	  doctor:'',//健康专员
	  server:''//服务专员
    };
  },
  methods: {
    // 获取用户数据
    async getUser() {
      let requestPak = pakTool.createRequestPak();
      requestPak.requestBody = {
        member_id: this.memberId, // 客户id
      };
      pakTool
        .request(this, "/madyApp/getCustomerCenter", requestPak)
        .then(res => {
          const { data } = res;
		  uni.setStorageSync('deptId',data.memberInfo.depart_id)
		  uni.setStorageSync('name',data.memberInfo.real_name)
          this.userName = data.memberInfo.real_name;
          this.userPhone = data.memberInfo.phone;
          this.userImg = data.memberInfo.icon;
		  this.surplusCnt = data.surplusCnt;
		  this.totalConsumeCnt = data.totalConsumeCnt;
		  this.totalDepositCnt = data.totalDepositCnt;
		  this.server = data.server;
		  this.doctor = data.doctor;
        });
    },
    // 预约到店
    // reserve() {
    //   uni.navigateTo({
    //     url: "../reserve/reserve"
    //   });
    // },
	// 预约
	appointment(){
		uni.navigateTo({
		  url: "/pages/appointment/appointment"
		});
	},
	// 预约订单
	myAppointment(){
		uni.navigateTo({
		  url: "/pages/myAppointment/myAppointment"
		});
	},
    // 消费记录
    mycus() {
      uni.navigateTo({
        url: "../spend/spend"
      });
    },
    // 理疗记录
    myPerson() {
      uni.navigateTo({
        url: "../records/records"
      });
    },
    //注销
    logout() {
      this.$refs.popup.open();
    },
    //取消返回当前页面
    close() {
      this.$refs.popup.close();
    },
    //确定退出登录回到登陆页面
    jump() {
      // 清除缓存
      uni.clearStorageSync();
      uni.reLaunch({
        url: "/pages/login/login"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  background-color: #fff;
  font-size: 32rpx;
  
  .top_bgc {
    background-image: url(data:image/png;base64,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);
    padding: 20rpx 30rpx 25rpx;
    box-sizing: border-box;
    background-repeat: no-repeat;
    background-size: 100% 440rpx;
  
    .fix {
      position: absolute;
      top: 42rpx;
      right: 42rpx;
      padding: 5rpx 27rpx;
      border-radius: 30rpx;
      border: 2rpx solid #84571a;
      color: #84571a;
      font-size: 30rpx;
      box-sizing: border-box;
    }
  
    // 账户数据
    .arc_top {
      height: 200rpx;
      position: relative;
      box-sizing: border-box;
      border-radius: 20rpx 20rpx 0 0;
      margin-top: 34rpx;
  
      .thread {
        // margin: 0 20rpx;
        // border-bottom: 2rpx solid #eeeeee;
        height: 100%;
      }
  
      .cir {
        height: 110rpx;
        width: 110rpx;
        border-radius: 50%;
        margin-top: 40rpx;
        float: left;
        overflow: hidden;
        image {
          width: 100%;
          height: 100%;
        }
      }
  
      .cum {
        float: left;
        margin-top: 40rpx;
        margin-left: 25rpx;
  
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
  
        // 服务专员
        .clerk {
          display: flex;
          font-size: 30rpx;
          margin-top: 15rpx;
  
          view {
            color: #c59a76;
            text {
              color: #84571a;
            }
          }
        }
      }
    }
  
    // 消费次数
    .arc_btm {
      display: flex;
      padding: 50rpx 0;
      justify-content: space-around;
      background: #ffffff;
      border-radius: 30rpx;
      width: 100%;
      box-shadow: 0 4rpx 24rpx 12rpx rgba(133, 133, 133, 0.1);
      margin-top: 20rpx;
  
      .btm_num {
        flex: 0 0 25%;
  
        .txt {
          text-align: center;
          color: #c59a76;
          font-size: 38rpx;
        }
  
        .num {
          text-align: center;
          font-size: 30rpx;
        }
      }
    }
  }
  
  

  // .top_pic {
  //   width: 100%;
  //   padding: 42rpx 0 80rpx 0;
  //   // border-radius: 0 0 160rpx 160rpx;
  //   background-image: url("../../static/images/支付背景.png");
  //   background-size: 100% 100%;
  //   display: flex;
  //   flex-direction: column;
  //   align-items: center;
  //   margin-bottom: 72rpx;

  //   .font02 {
  //     font-size: 32rpx;
  //     color: #84571a;
  //   }

  //   .head_pic {
  //     width: 130rpx;
  //     height: 130rpx;
  //     margin-bottom: 20rpx;
  //     border-radius: 50%;
  //   }

  //   .name {
  //     font-size: 100%;
  //     color: #84571a;
  //     margin-bottom: 20rpx;
  //     font-weight: bold;
  //   }

  //   .fix {
  //     padding: 5rpx 20rpx;
  //     border: 1px solid #84571a;
  //     color: #84571a;
  //     border-radius: 30rpx;
  //     font-size: 28rpx;
  //   }

  //   .phone {
  //     color: #84571a;
  //     margin-bottom: 20rpx;
  //   }
  // }

  .page {
    margin: 40rpx 30rpx 0;
    border-radius: 30rpx;
    background-color: #ffffff;
    box-shadow: 0px 2px 12px 6px rgba(133, 133, 133, 0.1);
    box-sizing: border-box;

   

    .myPerson {
      width: 100%;
      height: 110rpx;
      background-color: #ffffff;
      padding: 0 34rpx 0 30rpx;
      border-bottom: 2rpx solid #eeeeee;
      box-sizing: border-box;

      .font01 {
        font-size: 32rpx;
        font-weight: bold;
        line-height: 110rpx;
        color: #333333;
        float: left;
      }

      .pic04 {
        width: 40rpx;
        height: 44rpx;
        float: left;
        position: relative;
        top: 30rpx;
        padding-right: 20rpx;
      }

      .jiantou {
        float: right;
        position: relative;
        top: 40rpx;
      }
    }

    .page01 {
     
    }

    .page03 {
      
    }
  }

  .jiantou {
    width: 20rpx;
    height: 20rpx;
    border-top: 4rpx solid #cccccc;
    border-right: 4rpx solid #cccccc;
    transform: rotate(45deg);
  }

  //弹窗
  .pop {
    width: 605rpx;
    height: 463rpx;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 20rpx;

    .sus_txt {
      font-size: 36rpx;
      color: #c59a76;
      padding-bottom: 43rpx;
    }

    .con_txt {
      padding-bottom: 78rpx;
    }

    .btm {
      .yes {
        width: 237rpx;
        height: 82rpx;
        line-height: 82rpx;
        text-align: center;
        background-color: #c59a76;
        color: #ffffff;
        border-radius: 44rpx;
        float: left;
        margin-right: 25rpx;
      }

      .no {
        width: 237rpx;
        height: 82rpx;
        line-height: 82rpx;
        text-align: center;
        background-color: #ffffff;
        color: #c59a76;
        border-radius: 44rpx;
        border: 1rpx solid #c59a76;
        float: left;
      }
    }
  }
}
</style>
