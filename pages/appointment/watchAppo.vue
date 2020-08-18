<template>
  <view class="watch">
    <view class="order" :class="sta==1? 'gre' : 'bro'">
      <view style="font-size: 34rpx;">
        {{stateText}}
      </view>
      <view style="font-size: 30rpx;margin-top: 10rpx;">
        {{btmStateText}}
      </view>
    </view>
    <!-- <view style="background-color: #FFFFFF;">
			
		</view> -->
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
    <view style="background-color: #FFFFFF;">
      <my-cell title="预约时间" :num='time'></my-cell>
      <my-cell title="姓名" :num='name'></my-cell>
      <my-cell title="联系方式" :num='phone'></my-cell>
      <my-cell title="备注" :num='remark'></my-cell>
    </view>
    <view style="width: 100%;margin-top: 240rpx;">
      <view class="btn" @click="delOrder" v-if="sta=0 || sta==1 || sta==2">
        取消预约
      </view>
    </view>
    <uni-popup ref="popup" type="center">
      <view class="pop">
        <view class="sus_txt">
          取消预约
        </view>
        <view class="con_txt">
          请输入取消原因
        </view>
        <input type="text" value="" v-model="memo" />
        <view class="btm">
          <view class="yes" @click.stop="sure">
            确定
          </view>
          <view class="no" @click.stop="close">
            返回
          </view>
        </view>
      </view>
    </uni-popup>

  </view>
</template>

<script>
import Moc from "../../common/utils/mock.js";
import MyCell from "@/components/cell.vue";
import uniPopup from "../../components/uni-popup/uni-popup.vue";
import pakTool from "../../common/utils/utility.js";
export default {
  onLoad(option) {
    console.log(option);
    this.orderId = option.orderId;
    // this.name = option.name;
    this.phone = option.phone;
    this.remark = option.memo;
    this.id = option.id;
    this.sta = option.status;
    if (this.sta == 1) {
      this.stateText = "等待门店接单";
    } else if (this.sta == 2) {
      this.stateText = "预约成功~待到门店";
    } else if (this.sta == 3) {
      this.stateText = "期待您的下次预约~";
    } else if (this.sta == 4) {
      this.stateText = "门店已取消预约";
    } else if (this.sta == 5) {
      this.stateText = "预约已取消";
    }
    if (this.sta == 5) {
      this.btmStateText = "用户主动取消";
    } else if (this.sta == 3) {
      this.btmStateText = "";
    } else if (this.sta == 4) {
      this.btmStateText = "门店主动取消";
    } else {
      this.btmStateText = "请准时享受服务哦~";
    }

    this.getOder();
  },
  components: {
    MyCell,
    uniPopup,
  },
  onPullDownRefresh() {
    this.getNew();
    // this.getOder()
    // setTimeout(() => {
    // 	uni.stopPullDownRefresh();
    // }, 1000);
  },
  data() {
    return {
      url:
        "http://xiaode.oos-cn.ctyunapi.cn/20200801/png/yhd/upload/202008011652273541717.png",
      name: uni.getStorageSync("name"),
      phone: "",
      remark: "", //订单备注
      orderId: "",
      stateText: "",
      btmStateText: "",
      time: "",
      id: "",
      sta: "", //订单状态
      memo: "", //取消订单原因
      bgc: "",
      lock: false,
    };
  },
  computed: {},
  methods: {
    // 获取订单信息
    getOder() {
      let requestPak = pakTool.createRequestPak();
      requestPak.requestBody = {
        pk: this.orderId,
      };
      pakTool.request(this, "/ums/getDeptBook", requestPak).then((res) => {
        // {"ok":true,"message":"","pk":null,"code":"200","data":{"id":"5f24af10-64f5-450a-936f-4787ca560726","dept_id":"5f8a70d1-86e5-444c-b1a9-d1f0a80298fe","period":"2","book_date":"2020-08-18","start_time":"13:30","end_time":"14:00","bookable_times":"2","booked_times":"1","status":"1","create_user":"a0732608-e9f8-408c-b20a-fb69c8bee1e4","create_time":"2020-08-17 11:37:02.0","edit_user":"a0732608-e9f8-408c-b20a-fb69c8bee1e4","edit_time":"2020-08-17 11:37:02.0","exc_key":"0","dr":"0"}}
        const { data } = res;
        this.time =
          data.book_date + " " + data.start_time + "-" + data.end_time;
      });
    },
    // 取消预约
    delOrder() {
      this.$refs.popup.open();
    },
    // 刷新状态
    getNew() {
      let requestPak = pakTool.createRequestPak();
      requestPak.requestBody = {
        member_id: uni.getStorageSync("admin_user").memberId,
      };
      pakTool.request(this, "/ums/bookingList", requestPak).then((res) => {
        // {"ok":true,"message":"","pk":null,"code":"200","data":[{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-18 10:44:55","edit_time":null,"edit_user":null,"end_time":"14:00","memo":"测试","exc_key":0,"book_date":"2020-08-18","dr":0,"booking_id":"5f24af10-64f5-450a-936f-4787ca560726","start_time":"13:30","contact_mobile":"13382018111","id":"b6c81e66-5d3c-496b-beec-e5e6fb6e409e","create_user":"马大力","status":"1"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-17 11:45:54","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"测试","exc_key":1,"book_date":"2020-08-26","dr":0,"booking_id":"10ad44bd-650c-41c8-896d-4abceb71f745","start_time":"08:30","contact_mobile":"13382018111","id":"f57d56f3-0cd4-4e31-8e70-1f00a331b73f","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-17 11:45:04","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"很好","exc_key":1,"book_date":"2020-08-26","dr":0,"booking_id":"10ad44bd-650c-41c8-896d-4abceb71f745","start_time":"08:30","contact_mobile":"13382018111","id":"5cd0d95a-59b6-4436-812e-6b041d02ba22","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-17 11:41:25","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"888","exc_key":0,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"fe1d53eb-315f-4602-b285-c70523c72763","create_user":"马大力","status":"1"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-17 11:37:48","edit_time":null,"edit_user":null,"end_time":"14:00","memo":"3","exc_key":1,"book_date":"2020-08-18","dr":0,"booking_id":"5f24af10-64f5-450a-936f-4787ca560726","start_time":"13:30","contact_mobile":"13382018111","id":"d599ec98-7614-4648-bf39-2cfe36ef498b","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-17 11:35:26","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"2","exc_key":1,"book_date":"2020-08-26","dr":0,"booking_id":"10ad44bd-650c-41c8-896d-4abceb71f745","start_time":"08:30","contact_mobile":"13382018111","id":"6b90b5d3-d30f-4c8e-8ca9-98e7f61ff2c1","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-17 11:34:34","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"666","exc_key":1,"book_date":"2020-08-26","dr":0,"booking_id":"10ad44bd-650c-41c8-896d-4abceb71f745","start_time":"08:30","contact_mobile":"13382018111","id":"17563180-d43b-47e0-8352-5bfacbb06f19","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-17 11:34:16","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"4","exc_key":1,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"2c5de083-951d-4b91-8911-4ee473963ae7","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-17 11:18:43","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"是","exc_key":2,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"4197086a-76ea-4f12-bb4c-c9dca6948ea3","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-17 11:16:07","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"我","exc_key":1,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"2dca67c6-4b59-487f-b4db-fceee0032836","create_user":"马大力","status":"4"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-17 10:38:45","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"","exc_key":1,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"7a7c60ac-cf34-4af8-942f-0d9048caadeb","create_user":"马大力","status":"4"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-17 10:37:03","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"","exc_key":1,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"3f43000a-3036-4a90-b832-2686ddf00920","create_user":"马大力","status":"4"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-17 10:36:57","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"","exc_key":2,"book_date":"2020-08-26","dr":0,"booking_id":"10ad44bd-650c-41c8-896d-4abceb71f745","start_time":"08:30","contact_mobile":"13382018111","id":"981aa0d5-61ee-42fd-88ad-d31fee5524fb","create_user":"马大力","status":"3"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-17 10:29:24","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"","exc_key":2,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"b5cd9fbd-0882-4270-baf1-24d309af0d25","create_user":"马大力","status":"3"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-17 10:09:24","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"99","exc_key":1,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"91f02d27-225b-44e0-ba3f-8764269238b2","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-14 18:14:51","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"","exc_key":2,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"be0a805b-925d-4072-9812-ee57a1151013","create_user":"马大力","status":"3"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-14 18:14:30","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"","exc_key":1,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"dd593c50-8173-479f-a72d-77bbedf12dd3","create_user":"马大力","status":"4"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-14 18:13:29","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"","exc_key":1,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"de660400-2d2c-43c6-ad4a-963f215d6f7a","create_user":"马大力","status":"4"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-14 18:12:47","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"","exc_key":1,"book_date":"2020-08-26","dr":0,"booking_id":"10ad44bd-650c-41c8-896d-4abceb71f745","start_time":"08:30","contact_mobile":"13382018111","id":"73583a8b-da18-476f-ba83-929655fdffbf","create_user":"马大力","status":"4"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-14 18:03:11","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"","exc_key":2,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"8b700c4c-a750-4304-936b-6675a6154bf0","create_user":"马大力","status":"3"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-14 16:10:13","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"","exc_key":2,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"49788b49-0ce4-4c59-aa4d-6decbaead373","create_user":"马大力","status":"3"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-14 16:03:07","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"","exc_key":2,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"e07eaa0b-dffd-4777-9e57-276976ff1f55","create_user":"马大力","status":"3"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-14 16:00:21","edit_time":null,"edit_user":null,"end_time":"14:30","memo":"IEIE","exc_key":1,"book_date":"2020-08-15","dr":0,"booking_id":"8eea1655-d299-49d7-96df-21f3f337ba73","start_time":"13:30","contact_mobile":"13382018111","id":"8af22042-e62e-4aa2-b837-775d3329c656","create_user":"马大力","status":"2"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-14 15:55:25","edit_time":null,"edit_user":null,"end_time":"10:00","memo":"","exc_key":2,"book_date":"2020-08-17","dr":0,"booking_id":"159e250a-89b9-4489-9cde-f7057d510804","start_time":"09:30","contact_mobile":"13382018111","id":"2f8ce66f-8b73-40e8-8a31-d66e01bbbcdf","create_user":"马大力","status":"3"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-14 15:52:03","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"","exc_key":3,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"24582790-63b4-4286-83aa-304b470a9982","create_user":"马大力","status":"3"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-14 15:39:55","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"","exc_key":2,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"7a2537b7-4d19-49aa-85fb-ddb64a7bd428","create_user":"马大力","status":"3"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-14 15:22:40","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"","exc_key":2,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"a3dac347-cc0e-474e-a788-e06e911b5185","create_user":"马大力","status":"3"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-14 11:21:09","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"啊啊啊","exc_key":2,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"edcb6ff4-f88d-4f4d-ae6e-eef3abfbbad0","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 16:49:04","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"哈哈哈","exc_key":1,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"18b207f4-1bfa-468e-816e-6ab3a54c6e6b","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 16:38:49","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"好","exc_key":1,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"a15b954c-75c7-4103-a6f7-2805ee70214b","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 16:37:06","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"是","exc_key":1,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"0b559a53-e192-4c59-a604-79631c1456a1","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 16:36:48","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"是","exc_key":1,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"4d5c1672-a8de-49ef-bb11-ade3ea7b7f8c","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 16:19:17","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"我","exc_key":2,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"f0097183-105a-46d4-8d3a-95e4ddb5e59c","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 16:16:18","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"好","exc_key":1,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"35fe0a99-9406-455b-9ff4-a574b44fbe1d","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 16:15:33","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"来了","exc_key":2,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"aefe5f56-bfd6-42ad-a75b-707f9fac4f11","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 16:14:15","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"我","exc_key":1,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"dd10cba1-393a-46ab-a221-8d313075d39a","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 16:13:20","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"好","exc_key":1,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"02e713f6-f91b-4a71-bd06-d3ef3a646e2d","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 16:08:05","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"哦哦哦","exc_key":1,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"45de1c45-f282-41d4-aa40-4d888cf46032","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 15:54:15","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"99888","exc_key":1,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"ef6f2576-8009-4b67-a84f-415ee647b875","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 15:53:06","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"噢噢噢哦哦","exc_key":1,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"871aec18-e27f-4704-9221-aae75b2c621f","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 15:51:11","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"44444","exc_key":1,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"0a7dd064-6198-4f0f-9e32-4cc5d977a1c8","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 15:50:52","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"3333","exc_key":1,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"13c7109e-5bec-48a7-8230-9101e1d36443","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 15:46:09","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"333","exc_key":1,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"bf3a28d4-4079-4700-abfd-1468ae54b042","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 15:40:37","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"","exc_key":2,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"3b9e6355-b7ed-4dae-9764-d2c8160d33ec","create_user":"马大力","status":"3"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 15:39:51","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"","exc_key":1,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"2519c814-9b92-4b30-9fe4-375a89e993ba","create_user":"马大力","status":"4"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 15:32:28","edit_time":"2020-08-13 15:39:07","edit_user":"1","end_time":"17:30","memo":"测试","exc_key":6,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"6deb5e27-2e28-4a50-8a65-0f2ce2cdce70","create_user":"马大力","status":"5"}]}
        const { code, data } = res;
        if (code == 200) {
          data.map((item) => {
            if (item.id == this.id) {
              this.sta = item.status;
              if (this.sta == 1) {
                this.stateText = "等待门店接单";
              } else if (this.sta == 2) {
                this.stateText = "预约成功~待到门店";
              } else if (this.sta == 3) {
                this.stateText = "期待您的下次预约~";
              } else if (this.sta == 4) {
                this.stateText = "门店已取消预约";
              } else if (this.sta == 5) {
                this.stateText = "预约已取消";
              }
              if (this.sta == 5) {
                this.btmStateText = "用户主动取消";
              } else if (this.sta == 3) {
                this.btmStateText = "";
              } else if (this.sta == 4) {
                this.btmStateText = "门店主动取消";
              } else {
                this.btmStateText = "请准时享受服务哦~";
              }
            }
          });
        }
        // console.log(res)
        uni.stopPullDownRefresh();
      });
    },
    sure() {
      if (this.lock) {
        return;
      }
      if (this.memo == "") {
        uni.showToast({
          title: "请您输入原因",
          icon: "none",
        });
        return;
      }
      this.lock = true;
      let requestPak = pakTool.createRequestPak();
      requestPak.requestBody = {
        id: this.id,
        is_who: 1,
        memo: this.memo,
      };
      pakTool.request(this, "/ums/cancelBooking", requestPak).then((res) => {
        // {"ok":true,"message":"取消成功","pk":null,"code":"200","data":null}
        const { code, message } = res;
        var that = this;
        if (code == 200) {
          uni.showToast({
            title: "订单取消成功",
            success: function () {
              that.lock = false;
              setTimeout(function () {
                uni.reLaunch({
                  url: "/pages/myAppointment/myAppointment?tab=4",
                });
              }, 1000);
            },
          });
        } else {
          uni.showToast({
            title: message,
            icon: "none",
            duration: 1000,
            success: function () {
              that.$refs.popup.close();
              that.lock = false;
            },
          });
        }
      });
    },
    close() {
      this.$refs.popup.close();
    },
  },
};
</script>

<style lang="less" scoped>
@m: #c59a76;
.gre {
  background-color: #66cc99 !important;
}
.bro {
  background-color: #c59a76 !important;
}
.gey {
  background-color: #e7e6ec !important;
}
.blu {
  background-color: #00bfff !important;
}
.watch {
  font-size: 30rpx;
  // background-color: #f7f7f7;
  .order {
    width: 100%;
    background-color: @m;
    color: #ffffff;
    padding: 30rpx;
    box-sizing: border-box;
  }
  .list_box {
    // padding: 0 30rpx;
    margin-top: 20rpx;
    background-color: #ffffff;
    margin-bottom: 20rpx;
    // box-shadow: 0px 2px 12px 0 rgba(133, 133, 133, 0.1);
    .depts_list {
      // margin-top: 30rpx;
      padding: 30rpx 30rpx;
      box-sizing: border-box;
      .list_photo {
        width: 280rpx;
        height: 250rpx;
        border-radius: 30rpx;
        float: left;
        image {
          width: 100%;
          height: 100%;
        }
      }
      .list_text {
        padding: 7rpx 25rpx 7rpx 60rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        float: left;
        height: 250rpx;
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
  .clearfix:before,
  .clearfix:after {
    display: block;
    height: 0;
    line-height: 0;
    content: "";
    clear: both;
  }
  .btn {
    width: 660rpx;
    height: 90rpx;
    line-height: 90rpx;
    text-align: center;
    background-color: #ff464c;
    color: #ffffff;
    border-radius: 44rpx;
    margin: 0 auto;
    // position: absolute;
    // left: 0;
    // bottom: 0;
  }
  .pop {
    width: 605rpx;
    height: 463rpx;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 20rpx;
    input {
      border: 2rpx solid @m;
      width: 500rpx;
      line-height: 60rpx;
      height: 60rpx;
      margin-bottom: 60rpx;
      padding-left: 20rpx;
      padding-right: 20rpx;
      box-sizing: border-box;
    }

    .sus_txt {
      font-size: 36rpx;
      color: #c59a76;
      margin-bottom: 70rpx;
    }

    .con_txt {
      margin-bottom: 40rpx;
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
