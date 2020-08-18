<template>
  <view>
    <scroll-view style="height: calc(100vh - 130rpx);" scroll-y="true">
      <view class="appoint">
        <!-- 	<view class="list_box">
			<view class="depts_list clearfix">
				<view class="list_photo">
					<image :src="url" mode=""></image>
				</view>
				<view class="list_text">
					<view style="font-weight: 700;color: #424242;">
						项目名称: 元化灸
					</view>
					<view style="color: rgb(177, 177, 177);">
						时长: 30分钟
					</view>
				</view>
			</view>
		</view> -->
        <view class="appint_mid">
          <view class="bir">
            <view class="thread">
              <view class="title">
                预约时间<text style="color: red;">*</text>
              </view>
              <view class="select_date">
                <picker @change="selTime" :range="timeList" :range-key="'name'">
                  <view class="date">{{showTime}}<image src="http://xiaode.oos-cn.ctyunapi.cn/20200806/png/yhd/upload/202008061426039498048.png" mode="" class="point"></image>
                  </view>
                </picker>
              </view>
            </view>
          </view>
          <view style="background-color: #FFFFFF;">
            <view v-if="mo_appointList.length!=0">
              <view style="margin:30rpx 30rpx 0;color: #1AAD19;border: 2rpx solid #1AAD19;border-radius: 10rpx;width: 80rpx;height: 40rpx;line-height: 40rpx;font-size: 24rpx;text-align: center;">
                上午
              </view>
              <view class="appo">
                <view class="appoList" v-for="item in  mo_appointList" :key='item.id' :class="item.booked_times==item.bookable_times || item.exc_key=='isBooked'?'cant':'can'" @click="select(item)" :style="selected==item.id?'color:#fff;background-color: #c59a76;':''">
                  {{item.start_time+'-'+item.end_time}}
                  <text style="margin-left: 10rpx;">{{item.booked_times==item.bookable_times?'已约满':item.exc_key=='isBooked'?'已预约':'可预约'}}</text>
                </view>
              </view>
            </view>
            <view class="" v-if="af_appointList.length!=0">
              <view style="margin:30rpx 30rpx 0;color: #F37B1D;border: 2rpx solid #F37B1D;border-radius: 10rpx;width: 80rpx;height: 40rpx;line-height: 40rpx;font-size: 24rpx;text-align: center;">
                下午
              </view>
              <view class="appo">
                <view class="appoList" v-for="item in af_appointList" :key='item.id' :class="item.booked_times==item.bookable_times || item.exc_key=='isBooked'?'cant':'can'" @click="select(item)" :style="selected==item.id?'color:#fff;background-color: #c59a76;':''">
                  {{item.start_time+'-'+item.end_time}}
                  <text style="margin-left: 10rpx;">{{item.booked_times==item.bookable_times?'已约满':item.exc_key=='isBooked'?'已预约':'可预约'}}</text>
                </view>
              </view>
            </view>
          </view>
          <view class="appint_btm">
            <view class="add_inp">
              <view class="thread">
                <text class="title">姓名</text>
                <input class="uni-input" placeholder="请输入姓名" v-model="name" :disabled="true" />
              </view>
            </view>
            <view class="add_inp">
              <view class="thread">
                <text class="title">联系方式</text>
                <input class="uni-input" placeholder="请输入联系方式" v-model="phone" />
              </view>
            </view>
            <view class="area_inp">
              <text view class="area_title">备注</text>
              <!--  <input class="uni-input" focus :placeholder="place==true?'':'请输入'" v-model="address"/> -->
              <view class="area_father" style="padding: 30rpx 0;">
                <textarea placeholder="请输入其他需求" auto-height class="area" v-model="other" />
                </view>
					<view class="" style="clear: both;"></view>
				</view>
			</view>
		</view>
		<view style="padding-bottom: 100rpx;">
			
		</view>
		<view class="" style="width: 100%;">
			<view class="btn" @click="order" :class="lock==true?'btn_grey':''">
				提交预约
			</view>
		</view>
		<!-- <uni-popup ref="popup" type="center">
			<view class="pop">
				<image src="../../static/images/perfect.png" mode=""></image>
				<view class="sus_txt">
					操作成功
				</view>
				<view class="con_txt">
					感谢您的预约,请在约定时间来到门店
				</view>
				<view class="btm" >
					<view class="yes" @click.stop="jump">
						查看预约
					</view>
					<view class="no" @click.stop="close">
						返回首页
					</view>
				</view>
			</view>
		</uni-popup> -->
	</view>
	</scroll-view>
	</view>
</template>
<script>
import pakTool from "../../common/utils/utility.js";
// import Moc from '../../common/utils/mock.js';
import uniPopup from "../../components/uni-popup/uni-popup.vue";
export default {
  data() {
    return {
      url:
        "http://xiaode.oos-cn.ctyunapi.cn/20200801/png/yhd/upload/202008011652273541717.png",
      date: "",
      name: uni.getStorageSync("name"),
      times: [],
      goTime: "",
      showTime: "",
      timeIndex: 0,
      timeList: [],
      appointList: [],
      mo_appointList: [],
      af_appointList: [],
      selected: "", //选中的时间
      phone: uni.getStorageSync("phone"), //手机
      other: "", // 备注
      lock: false, //防止重复点击
      orderId: "",
    };
  },
  props: ["time"],
  mounted() {
    console.log(uni.getStorageSync("admin_user"));
    this.getDate();
  },
  watch: {
    phone(newValue, oldValue) {
      if (newValue.length > oldValue.length) {
        this.phone = newValue
          .replace(/\s/g, "")
          .replace(/(\d{3})(\d{0,4})(\d{0,4})/, "$1 $2 $3");
      } else {
        this.phone = this.phone.trim();
      }
    },
    time() {
      this.getDate();
    },
  },
  components: {
    uniPopup,
  },
  methods: {
    // 获取可预约时间
    getDate() {
      this.mo_appointList = [];
      this.af_appointList = [];
      this.selected = "";
      this.showTime = "";
      let requestPak = pakTool.createRequestPak();
      requestPak.requestBody = {
        dept_id: uni.getStorageSync("deptId"),
        memberId: uni.getStorageSync("admin_user").memberId,
      };
      pakTool
        .request(this, "/ums/bookingsByMemberId", requestPak)
        .then((res) => {
          // {"ok":true,"message":"","pk":null,"code":"200","data":[{"period":"2","create_time":"2020-08-17T03:37:02.000+0000","edit_time":"2020-08-17T03:37:02.000+0000","edit_user":"a0732608-e9f8-408c-b20a-fb69c8bee1e4","end_time":"14:00","exc_key":"isBooked","book_date":"2020-08-18","dr":0,"start_time":"13:30","book_count":1,"bookable_times":2,"id":"5f24af10-64f5-450a-936f-4787ca560726","create_user":"a0732608-e9f8-408c-b20a-fb69c8bee1e4","dept_id":"5f8a70d1-86e5-444c-b1a9-d1f0a80298fe","booked_times":1,"status":"1"},{"period":"1","create_time":"2020-08-14T09:04:16.000+0000","edit_time":"2020-08-14T09:04:16.000+0000","edit_user":"1","end_time":"09:30","exc_key":"isBooked","book_date":"2020-08-26","dr":0,"start_time":"08:30","book_count":1,"bookable_times":4,"id":"10ad44bd-650c-41c8-896d-4abceb71f745","create_user":"1","dept_id":"5f8a70d1-86e5-444c-b1a9-d1f0a80298fe","booked_times":2,"status":"1"},{"period":"1","create_time":"2020-08-14T03:20:23.000+0000","edit_time":"2020-08-17T02:08:34.000+0000","edit_user":"a0732608-e9f8-408c-b20a-fb69c8bee1e4","end_time":"09:30","exc_key":"isBooked","book_date":"2020-08-30","dr":0,"start_time":"09:00","book_count":1,"bookable_times":9,"id":"286df443-e534-4199-ba00-785edf79fe42","create_user":"a0732608-e9f8-408c-b20a-fb69c8bee1e4","dept_id":"5f8a70d1-86e5-444c-b1a9-d1f0a80298fe","booked_times":9,"status":"1"}]}
          // console.log(res)
          this.times = res.data;
          function ForwardRankingDate(data, p) {
            for (let i = 0; i < data.length - 1; i++) {
              for (let j = 0; j < data.length - 1 - i; j++) {
                if (Date.parse(data[j][p]) > Date.parse(data[j + 1][p])) {
                  var temp = data[j];
                  data[j] = data[j + 1];
                  data[j + 1] = temp;
                }
              }
            }
            return data;
          }
          this.times = ForwardRankingDate(this.times, "book_date");
          var tempObj = {};
          for (var i = 0; i < res.data.length; i++) {
            if (!tempObj[this.times[i].book_date]) {
              tempObj[this.times[i].book_date] = true;
            }
          }
          let array = Object.getOwnPropertyNames(tempObj);
          this.timeList = [];
          array.map((item) => {
            var array = new Array();
            var date = item; //日期为输入日期，格式为 2016-8-10
            array = date.split("-");
            var ndate = new Date(array[0], parseInt(array[1] - 1), array[2]);
            var weekArray = new Array(
              "星期日",
              "星期一",
              "星期二",
              "星期三",
              "星期四",
              "星期五",
              "星期六"
            );
            var weekDay = weekArray[ndate.getDay()];
            // var day = this.getNowFormatDate()
            // if(Date.parse(item)>=Date.parse(day)){
            this.timeList.push({ name: item + " " + weekDay, value: item });
            // }
          });
        });
    },
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    // 选择时间段
    selTime(val) {
      this.mo_appointList = [];
      this.af_appointList = [];
      this.selected = "";
      this.goTime = this.timeList[val.detail.value].value;
      this.showTime = this.timeList[val.detail.value].name;
      // var day = new Date()
      // var now = day.getHours()+':'+day.getMinutes()
      // console.log()
      // function checkdate(t1,t2){
      // 	var s="1970/1/1";
      // 	var a=Date.parse(s+' '+t1);
      // 	var b=Date.parse(s+' '+t2);
      // 	if(a>b){
      // 		return true
      // 	}else{
      // 		return false
      // 	}
      // 	}
      // 筛选时间段 获取当日可预约名单
      this.times.map((item) => {
        // console.log(checkdate(item.end_time,now))
        if (item.book_date == this.timeList[val.detail.value].value) {
          if (item.period == 1) {
            // if(!checkdate(item.end_time,now)){
            // 	item.miss = true
            // }
            this.mo_appointList.push(item);
            console.log(this.mo_appointList, "上午");
          } else if (item.period == 2) {
            // if(!checkdate(item.end_time,now)){
            // 	item.miss = true
            // }
            this.af_appointList.push(item);
            console.log(this.af_appointList, "下午");
          }
        }
      });
    },
    // 选中时间
    select(val) {
      console.log(val);
      if (val.bookable_times == val.booked_times) {
        uni.showToast({
          title: "当前预约已满",
          icon: "none",
        });
        return;
      }
      if (val.exc_key == "isBooked") {
        uni.showToast({
          title: "您已约过这个时间了哦！",
          icon: "none",
        });
        return;
      }
      // this.selected = val;
      if (this.selected == val.id) {
        this.selected = "";
      } else {
        this.selected = val.id;
      }
    },
    // 预约
    order() {
      let phone = this.phone.replace(/\s+/g, "");
      if (!/^1[3456789]\d{9}$/.test(phone) && phone) {
        uni.showToast({
          title: "手机号码有误，请重新输入",
          icon: "none",
          duration: 2000,
        });
        return false;
      }
      if (this.goTime == "") {
        uni.showToast({
          title: "请选择日期",
          icon: "none",
          duration: 2000,
        });
        return false;
      }
      if (this.selected == "") {
        uni.showToast({
          title: "请选择时间段",
          icon: "none",
          duration: 2000,
        });
        return false;
      }
      if (this.lock) {
        return;
      }
      this.lock = true;
      console.log(phone);
      console.log(this.other);
      console.log(this.goTime + " " + this.selected);

      let requestPak = pakTool.createRequestPak();
      requestPak.requestBody = {
        dept_id: uni.getStorageSync("deptId"),
        member_id: uni.getStorageSync("admin_user").memberId,
        status: 1,
        contact_mobile: phone,
        memo: this.other,
        booking_id: this.selected,
        create_user: this.name,
      };
      pakTool.request(this, "ums/booking", requestPak).then((res) => {
        const { code, message } = res;
        if (code == 300) {
          // this.$refs.popup.open()
          uni.showToast({
            title: "操作成功~",
            success: () => {
              setTimeout(() => {
                uni.reLaunch({
                  url: "/pages/myAppointment/myAppointment?tab=1",
                });
              }, 500);
            },
          });
        } else {
          // console.log(1)
          uni.showToast({
            title: "保存异常,请稍后重试",
            icon: "none",
          });
          this.lock = false;
        }
      });
    },
    // 查看订单
    jump() {},
    // 回到首页
    close() {
      uni.reLaunch({
        url: "/pages/mine/mine",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.appoint {
  font-size: 30rpx;
  min-height: 100%;
  position: relative;
  // background-color: #f7f7f7;
  // 门店列表
  .list_box {
    // padding: 0 30rpx;
    background-color: #ffffff;
    margin-bottom: 20rpx;
    // box-shadow: 0px 2px 12px 0 rgba(133, 133, 133, 0.1);
    .depts_list {
      // margin-top: 30rpx;
      padding: 30rpx 30rpx;
      box-sizing: border-box;
      .list_photo {
        width: 250rpx;
        height: 200rpx;
        border-radius: 30rpx;
        float: left;
        image {
          width: 100%;
          height: 100%;
        }
      }
      .list_text {
        margin-left: 30rpx;
        padding: 7rpx 25rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        float: left;
        height: 200rpx;
        box-sizing: border-box;
      }
      .list_enter {
        width: 166rpx;
        height: 50rpx;
        border-radius: 26rpx;
        background-color: #f8ece2;
        color: #ab8600;
        line-height: 50rpx;
        text-align: center;
        float: right;
      }
    }
  }
  .bir {
    overflow: hidden;
    background-color: #fff;
    .thread {
      border-bottom: 2rpx solid #f7f7f7;
      height: 100rpx;
      margin: 0 30rpx;
    }
    .title {
      width: 30%;
      float: left;
      height: 100rpx;
      // padding-left: 30rpx;
      box-sizing: border-box;
      line-height: 100rpx;
      position: relative;
    }
    .date {
      width: 70%;
      float: left;
      height: 100rpx;
      line-height: 100rpx;
      position: relative;
      .point {
        width: 16rpx;
        height: 26rpx;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(0, -50%);
      }
    }
  }
  .appo {
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    padding: 30rpx;
    box-sizing: border-box;
    flex-wrap: wrap;
    .appoList {
      // height: 100rpx;
      width: 340rpx;
      border-radius: 10rpx;
      margin-bottom: 30rpx;
      // line-height: 100rpx;
      padding: 25rpx 20rpx;
      box-sizing: border-box;
    }
    .can {
      color: #c59a76;
      border: 2rpx solid #c59a76;
      box-sizing: border-box;
    }
    .cant {
      color: rgb(154, 153, 158);
      background-color: rgb(231, 230, 236);
    }
    .sel {
      color: #fff;
      background-color: #c59a76;
    }
  }
  .appint_btm {
    .area_inp {
      background-color: #fff;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 0 30rpx;
      border-bottom: 2rpx solid #f7f7f7;
      .area_title {
        width: 30%;
        height: 100rpx;
        line-height: 100rpx;
        box-sizing: border-box;
        background-color: #fff;
      }
      .area_father {
        width: 70%;
        background-color: #fff;
        .area {
          width: calc(100% - 30rpx);
          font-size: 28rpx;
        }
      }
    }
    .add_inp {
      overflow: hidden;
      background-color: #fff;
      // border-bottom:2rpx solid #eee;
      .thread {
        border-bottom: 2rpx solid #f7f7f7;
        height: 100rpx;
        margin: 0 30rpx;
      }
      .title {
        width: 30%;
        float: left;
        line-height: 100rpx;
        box-sizing: border-box;
        background-color: #fff;
        height: 100rpx;
        text {
          color: red;
        }
      }
      .uni-input {
        width: 70%;
        float: left;
        line-height: 100rpx;
        background-color: #fff;
        height: 100rpx;
        box-sizing: border-box;
        position: relative;
        font-size: 28rpx;
        .radio {
          image {
            width: 36rpx;
            height: 36rpx;
            vertical-align: middle;
            margin-right: 20rpx;
          }
        }
        .cir {
          width: 100rpx;
          height: 100rpx;
          border-radius: 50%;
          left: 0;
          top: 50%;
          overflow: hidden;
          transform: translate(0, -50%);
          position: relative;
          background: #f7f7f7;
          .cinema {
            width: 50rpx;
            height: 38rpx;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          .head {
            width: 100%;
            height: 100%;
          }
        }
        .point {
          width: 16rpx;
          height: 26rpx;
          position: absolute;
          top: 50%;
          right: 0;
          transform: translate(0, -50%);
        }
      }
    }
  }
  .clearfix:before,
  .clearfix:after {
    display: block;
    height: 0;
    line-height: 0;
    content: "";
    clear: both;
  }
  .btn {
    width: 640rpx;
    margin: 0 auto;
    height: 90rpx;
    line-height: 90rpx;
    text-align: center;
    background-color: #c59a76;
    color: #ffffff;
    border-radius: 44rpx;
    margin-bottom: 100rpx;
    // position: absolute;
    // left: 0;
    // bottom: 0;
  }
  .btn_grey {
    color: rgb(154, 153, 158) !important;
    background-color: rgb(231, 230, 236) !important;
  }
  .pop {
    width: 605rpx;
    height: 580rpx;
    background-color: #ffffff;
    position: relative;
    border-radius: 20rpx;
    display: table;
    image {
      width: 206rpx;
      height: 206rpx;
      border-radius: 50%;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -10%);
    }
    .sus_txt {
      font-size: 36rpx;
      color: #c59a76;
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .con_txt {
      color: #333333;
      margin: 50% auto 0;
      text-align: center;
      font-size: 34rpx;
    }
    .btm {
      display: flex;
      justify-content: space-around;
      padding: 0 30rpx;
      margin-top: 96rpx;
      .yes {
        // padding: 18rpx 60rpx;
        width: 237rpx;
        height: 82rpx;
        line-height: 82rpx;
        text-align: center;
        display: inline-block;
        background-color: #c59a76;
        color: white;
        border-radius: 44rpx;
        font-size: 34rpx;
      }
      .no {
        // padding: 18rpx 60rpx;
        width: 237rpx;
        height: 82rpx;
        line-height: 82rpx;
        text-align: center;
        background-color: #ffffff;
        display: inline-block;
        color: #c59a76;
        border-radius: 44rpx;
        box-sizing: border-box;
        border: 2rpx solid #c59a76;
        font-size: 34rpx;
      }
    }
  }
}
</style>
