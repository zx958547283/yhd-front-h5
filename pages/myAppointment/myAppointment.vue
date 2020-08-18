<template>
  <view class="box">
    <!-- 顶部搜索-->
    <!-- <uni-search-bar @ser='ser' placeholder="姓名/电话" :radius="100" :cancelButton="none" @confirm="search"></uni-search-bar> -->
    <view style="height: 130rpx;box-sizing: border-box;">
      <view class="tab" style="padding: 30rpx 40rpx 20rpx 40rpx;">
        <view :class="currenttab == index?'tab_one':''" v-for="(item,index) in tablist" :key='index' @click="seltab(index)">
          {{ item }}
          <view class="line" v-if="currenttab == index"></view>
        </view>
      </view>
    </view>
    <swiper :duration="500" @change="swiperChange" :current="currenttab">
      <swiper-item style="background-color: #FFFFFF;">
        <!-- 预约 -->
        <tab-zero :time='time'></tab-zero>
      </swiper-item>
      <swiper-item>
        <!-- 待接单 -->
        <tab-two :tabTwo='tabTwo'></tab-two>
      </swiper-item>
      <swiper-item>
        <!-- 预约成功 -->
        <tab-one :tabOne='tabOne'></tab-one>
      </swiper-item>
      <swiper-item>
        <!-- 已完成 -->

        <tab-three :tabThree='tabThree'></tab-three>

      </swiper-item>
      <swiper-item>
        <!-- 已取消 -->

        <tab-four :tabFour='tabFour'></tab-four>

      </swiper-item>
    </swiper>

  </view>
</template>

<script>
import pakTool from "@/common/utils/utility.js"; // 调取接口
import tabTwo from "./tab/tabTwo.vue";
import tabOne from "./tab/tabOne.vue";
import tabThree from "./tab/tabThree.vue";
import tabFour from "./tab/tabFour.vue";
import tabZero from "@/pages/appointment/appointment.vue";
export default {
  components: {
    tabOne,
    tabTwo,
    tabThree,
    tabFour,
    tabZero,
  },
  onReady(option) {},
  onLoad(option) {
    if (option.tab) {
      this.currenttab = option.tab;
      this.getList();
    }
  },
  onPullDownRefresh: function () {
    this.getList();
    this.time++;
  },
  watch: {
    hei(val) {
      // this.hei = val
      console.log(val);
    },
  },
  onShow() {
    this.getList();
  },
  data() {
    return {
      phoneHeight: "",
      hei: "",
      tablist: ["预约填写", "待接单", "预约成功", "已完成", "已取消"], //导航栏标签
      currenttab: 0, //当前选中的tab
      tabOne: [],
      tabTwo: [], // 待接单列表
      tabThree: [],
      tabFour: [],
      time: 0,
    };
  },
  methods: {
    swiperChange(e) {
      console.log(e);
      this.currenttab = e.detail.current;
    },
    //切换tab栏
    seltab(index) {
      this.currenttab = index;
      console.log(index);
    },
    // 获取预约列表
    getList() {
      let requestPak = pakTool.createRequestPak();
      requestPak.requestBody = {
        member_id: uni.getStorageSync("admin_user").memberId,
      };
      pakTool.request(this, "/ums/bookingList", requestPak).then((res) => {
        // {"ok":true,"message":"","pk":null,"code":"200","data":[{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-17 11:45:54","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"很好","exc_key":0,"book_date":"2020-08-26","dr":0,"booking_id":"10ad44bd-650c-41c8-896d-4abceb71f745","start_time":"08:30","contact_mobile":"13382018111","id":"f57d56f3-0cd4-4e31-8e70-1f00a331b73f","create_user":"马大力","status":"1"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-17 11:45:04","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"很好","exc_key":1,"book_date":"2020-08-26","dr":0,"booking_id":"10ad44bd-650c-41c8-896d-4abceb71f745","start_time":"08:30","contact_mobile":"13382018111","id":"5cd0d95a-59b6-4436-812e-6b041d02ba22","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-17 11:41:25","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"888","exc_key":0,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"fe1d53eb-315f-4602-b285-c70523c72763","create_user":"马大力","status":"1"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-17 11:37:48","edit_time":null,"edit_user":null,"end_time":"14:00","memo":"3","exc_key":1,"book_date":"2020-08-18","dr":0,"booking_id":"5f24af10-64f5-450a-936f-4787ca560726","start_time":"13:30","contact_mobile":"13382018111","id":"d599ec98-7614-4648-bf39-2cfe36ef498b","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-17 11:35:26","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"2","exc_key":1,"book_date":"2020-08-26","dr":0,"booking_id":"10ad44bd-650c-41c8-896d-4abceb71f745","start_time":"08:30","contact_mobile":"13382018111","id":"6b90b5d3-d30f-4c8e-8ca9-98e7f61ff2c1","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-17 11:34:34","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"666","exc_key":1,"book_date":"2020-08-26","dr":0,"booking_id":"10ad44bd-650c-41c8-896d-4abceb71f745","start_time":"08:30","contact_mobile":"13382018111","id":"17563180-d43b-47e0-8352-5bfacbb06f19","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-17 11:34:16","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"4","exc_key":1,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"2c5de083-951d-4b91-8911-4ee473963ae7","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-17 11:18:43","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"是","exc_key":2,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"4197086a-76ea-4f12-bb4c-c9dca6948ea3","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-17 11:16:07","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"我","exc_key":1,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"2dca67c6-4b59-487f-b4db-fceee0032836","create_user":"马大力","status":"4"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-17 10:38:45","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"","exc_key":1,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"7a7c60ac-cf34-4af8-942f-0d9048caadeb","create_user":"马大力","status":"4"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-17 10:37:03","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"","exc_key":1,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"3f43000a-3036-4a90-b832-2686ddf00920","create_user":"马大力","status":"4"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-17 10:36:57","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"","exc_key":2,"book_date":"2020-08-26","dr":0,"booking_id":"10ad44bd-650c-41c8-896d-4abceb71f745","start_time":"08:30","contact_mobile":"13382018111","id":"981aa0d5-61ee-42fd-88ad-d31fee5524fb","create_user":"马大力","status":"3"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-17 10:29:24","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"","exc_key":2,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"b5cd9fbd-0882-4270-baf1-24d309af0d25","create_user":"马大力","status":"3"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-17 10:09:24","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"99","exc_key":1,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"91f02d27-225b-44e0-ba3f-8764269238b2","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-14 18:14:51","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"","exc_key":2,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"be0a805b-925d-4072-9812-ee57a1151013","create_user":"马大力","status":"3"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-14 18:14:30","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"","exc_key":1,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"dd593c50-8173-479f-a72d-77bbedf12dd3","create_user":"马大力","status":"4"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-14 18:13:29","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"","exc_key":1,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"de660400-2d2c-43c6-ad4a-963f215d6f7a","create_user":"马大力","status":"4"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-14 18:12:47","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"","exc_key":1,"book_date":"2020-08-26","dr":0,"booking_id":"10ad44bd-650c-41c8-896d-4abceb71f745","start_time":"08:30","contact_mobile":"13382018111","id":"73583a8b-da18-476f-ba83-929655fdffbf","create_user":"马大力","status":"4"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-14 18:03:11","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"","exc_key":2,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"8b700c4c-a750-4304-936b-6675a6154bf0","create_user":"马大力","status":"3"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-14 16:10:13","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"","exc_key":2,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"49788b49-0ce4-4c59-aa4d-6decbaead373","create_user":"马大力","status":"3"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-14 16:03:07","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"","exc_key":2,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"e07eaa0b-dffd-4777-9e57-276976ff1f55","create_user":"马大力","status":"3"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-14 16:00:21","edit_time":null,"edit_user":null,"end_time":"14:30","memo":"IEIE","exc_key":1,"book_date":"2020-08-15","dr":0,"booking_id":"8eea1655-d299-49d7-96df-21f3f337ba73","start_time":"13:30","contact_mobile":"13382018111","id":"8af22042-e62e-4aa2-b837-775d3329c656","create_user":"马大力","status":"2"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-14 15:55:25","edit_time":null,"edit_user":null,"end_time":"10:00","memo":"","exc_key":2,"book_date":"2020-08-17","dr":0,"booking_id":"159e250a-89b9-4489-9cde-f7057d510804","start_time":"09:30","contact_mobile":"13382018111","id":"2f8ce66f-8b73-40e8-8a31-d66e01bbbcdf","create_user":"马大力","status":"3"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-14 15:52:03","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"","exc_key":3,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"24582790-63b4-4286-83aa-304b470a9982","create_user":"马大力","status":"3"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-14 15:39:55","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"","exc_key":2,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"7a2537b7-4d19-49aa-85fb-ddb64a7bd428","create_user":"马大力","status":"3"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-14 15:22:40","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"","exc_key":2,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"a3dac347-cc0e-474e-a788-e06e911b5185","create_user":"马大力","status":"3"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-14 11:21:09","edit_time":null,"edit_user":null,"end_time":"09:30","memo":"啊啊啊","exc_key":2,"book_date":"2020-08-30","dr":0,"booking_id":"286df443-e534-4199-ba00-785edf79fe42","start_time":"09:00","contact_mobile":"13382018111","id":"edcb6ff4-f88d-4f4d-ae6e-eef3abfbbad0","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 16:49:04","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"哈哈哈","exc_key":1,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"18b207f4-1bfa-468e-816e-6ab3a54c6e6b","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 16:38:49","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"好","exc_key":1,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"a15b954c-75c7-4103-a6f7-2805ee70214b","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 16:37:06","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"是","exc_key":1,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"0b559a53-e192-4c59-a604-79631c1456a1","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 16:36:48","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"是","exc_key":1,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"4d5c1672-a8de-49ef-bb11-ade3ea7b7f8c","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 16:19:17","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"我","exc_key":2,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"f0097183-105a-46d4-8d3a-95e4ddb5e59c","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 16:16:18","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"好","exc_key":1,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"35fe0a99-9406-455b-9ff4-a574b44fbe1d","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 16:15:33","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"来了","exc_key":2,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"aefe5f56-bfd6-42ad-a75b-707f9fac4f11","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 16:14:15","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"我","exc_key":1,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"dd10cba1-393a-46ab-a221-8d313075d39a","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 16:13:20","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"好","exc_key":1,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"02e713f6-f91b-4a71-bd06-d3ef3a646e2d","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 16:08:05","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"哦哦哦","exc_key":1,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"45de1c45-f282-41d4-aa40-4d888cf46032","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 15:54:15","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"99888","exc_key":1,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"ef6f2576-8009-4b67-a84f-415ee647b875","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 15:53:06","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"噢噢噢哦哦","exc_key":1,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"871aec18-e27f-4704-9221-aae75b2c621f","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 15:51:11","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"44444","exc_key":1,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"0a7dd064-6198-4f0f-9e32-4cc5d977a1c8","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 15:50:52","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"3333","exc_key":1,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"13c7109e-5bec-48a7-8230-9101e1d36443","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 15:46:09","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"333","exc_key":1,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"bf3a28d4-4079-4700-abfd-1468ae54b042","create_user":"马大力","status":"5"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 15:40:37","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"","exc_key":2,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"3b9e6355-b7ed-4dae-9764-d2c8160d33ec","create_user":"马大力","status":"3"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 15:39:51","edit_time":null,"edit_user":null,"end_time":"17:30","memo":"","exc_key":1,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"2519c814-9b92-4b30-9fe4-375a89e993ba","create_user":"马大力","status":"4"},{"member_id":"985be3eb-67df-484d-8bac-a096601b54ca","create_time":"2020-08-13 15:32:28","edit_time":"2020-08-13 15:39:07","edit_user":"1","end_time":"17:30","memo":"测试","exc_key":6,"book_date":"2020-08-13","dr":0,"booking_id":"475bf76d-2ceb-42e0-9392-0abbe9998dda","start_time":"17:00","contact_mobile":"13382018111","id":"6deb5e27-2e28-4a50-8a65-0f2ce2cdce70","create_user":"马大力","status":"5"}]}
        const { data } = res;
        var Arr = data;
        function ForwardRankingDate(arr, p) {
          for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {
              if (Date.parse(arr[j][p]) < Date.parse(arr[j + 1][p])) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
              }
            }
          }
          return arr;
        }
        Arr = ForwardRankingDate(Arr, "create_time");
        this.tabOne = [];
        this.tabTwo = [];
        this.tabThree = [];
        this.tabFour = [];
        Arr.map((item) => {
          // 待接单
          if (item.status == 1) {
            this.tabTwo.push(item);
          } else if (item.status == 2) {
            //已接单
            this.tabOne.push(item);
          } else if (item.status == 3) {
            this.tabThree.push(item);
          } else if (item.status == 4 || item.status == 5) {
            this.tabFour.push(item);
          }
        });
        uni.stopPullDownRefresh();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  font-size: 30rpx;
  min-height: 100%;
  // padding: 0 38rpx 38rpx 38rpx;
  background-color: #f7f7f7;
  /deep/swiper {
    height: calc(100vh - 130rpx) !important;
  }
  .tab {
    // padding: 30rpx 180rpx;
    display: flex;
    justify-content: space-between;
    background-color: white;
    height: 64rpx;
    .tab_one {
      // padding-bottom: 20rpx;
      color: #c59a76;
      // border-bottom: 5rpx solid #c59a76;
      .line {
        height: 10rpx;
        width: 55rpx;
        margin: 0 auto;
        border-radius: 20rpx;
        background-color: #c59a76;
        margin-top: 15rpx;
      }
    }
  }

  .tab_main {
    padding: 30rpx;

    .amount {
      color: #696969;
      text-align: center;
      padding-bottom: 30rpx;
    }

    .main_one {
      box-sizing: border-box;
      height: 140rpx;
      background-color: #ffffff;
      padding: 20rpx;
      position: relative;
      margin-bottom: 20rpx;
      border-radius: 10rpx;

      .cir {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        overflow: hidden;
        image {
          width: 100%;
          height: 100%;
        }
      }

      .name {
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        left: 150rpx;
        font-weight: 700;
      }

      .doc_name {
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        right: 65rpx;
        font-weight: 700;
        font-size: 30rpx;
        .settop {
          display: inline-block;
          float: right;
          border: 2rpx solid #c59a76;
          padding: 5rpx 20rpx;
          z-index: 9999;
          display: inline-block;
          color: #c59a76;
          border-radius: 15rpx;
          box-sizing: border-box;
          font-size: 30rpx;
        }
        .deltop {
          display: inline-block;
          float: right;
          // border: 2rpx solid #c59a76;
          padding: 5rpx 20rpx;
          z-index: 9999;
          display: inline-block;
          color: white;
          background-color: #c59a76;
          border-radius: 15rpx;
          font-size: 30rpx;
        }
      }

      .phone {
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        left: 330rpx;
      }

      .point {
        width: 16rpx;
        height: 26rpx;
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        right: 30rpx;
        vertical-align: top;

        image {
          width: 100%;
          height: 100%;
          vertical-align: top;
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
</style>
