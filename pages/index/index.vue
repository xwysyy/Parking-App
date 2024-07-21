<template>
	<view class="view">
		<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
			:duration="duration">
			<swiper-item v-for="(item, index) in background" :key="index">
				<image :src="item"></image>
			</swiper-item>
		</swiper>
	</view>
	<view class="header">
		<text>欢迎来到智泊云界</text>
	</view>
	<view class="view">
		<view class="func">
			<text class="title">功能</text>
			<view class="func-list">
				<view class="func-item" v-for="(item,index) in funcList" :key="index" @click="getFunc(item.name)">
					<image :src="item.url"></image>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
	</view>

	<!-- 公告 -->
	<view class="view">
		<view class="notice">
			<text class="title">公告</text>
			<uni-collapse>
				<template v-for="(item,index) in noticeList" :key="index">
					<uni-collapse-item class="notice-item" :title="item.title">
						<view class="content">
							<rich-text v-html="item.content"></rich-text>
							<text class="date">{{item.create_time}}</text>
						</view>
					</uni-collapse-item>
				</template>
			</uni-collapse>
		</view>
	</view>

</template>

<script setup>
	import {
		request
	} from '@/utils/request'
	import {
		ref,
		reactive,
		onMounted
	} from 'vue'
	import {
		check
	} from '@/utils/check'
	const popupShow = ref(true)
	const popupStyle = ref({
		height: '300px',
		width: '100%',
	})
	const indicatorDots = ref(true)
	const autoplay = ref(true)
	const interval = ref(4000)
	const duration = ref(2000)
	const userInfo = reactive({
		balance: 0,
	})
	const background = reactive([
		'/static/images/swiper/1.png',
		'/static/images/swiper/2.png',
		'/static/images/swiper/4.png',
	])

	const funcList = reactive([
		{
			name: '我要停车',
			url: '/static/images/func/1.png'
		},
		{
			name: '余额查询',
			url: '/static/images/func/2.png'
		},
		{
			name: '车牌绑定',
			url: '/static/images/func/3.png'
		}
	])

	const getFunc = (name) => {
		if (name == '余额查询') {
			uni.showModal({
				title: '您当前的余额为' + userInfo.balance + '元',
				content: '如有需要，请联系管理员或到线下办公处充值',
				showCancel: false,
			})
		} else if (name == '我要停车') {
			uni.navigateTo({
				url: '/pages/index/beginOrder'
			})

		} else if (name == '车牌绑定') {
			uni.navigateTo({
				url: '/pages/index/plate'
			})
		}

	}
	const noticeList = reactive([])
	const getNotice = () => {
		request('api/app/notice.query', 'GET').then(res => {
			if (res.data.status != 0) {
				uni.showToast({
					title: res.data.msg,
					icon: 'none'
				})
				return
			} else {
				noticeList.splice(0, noticeList.length)
				for (let i = 0; i < res.data.data.length; i++) {
					noticeList.push(res.data.data[i])
				}
			}
		}).catch(err => {
			console.log(err)
		})
	}

	const getUserInfo = () => {
		request('api/app/user.info', 'GET').then(res => {
			if (res.data.status != 0) {
				uni.showToast({
					title: res.data.msg,
					icon: 'none'
				})
				return
			}
			let data = res.data.data.info
			userInfo.balance = data.balance
		}).catch(err => {
			console.log(err)
		})
	}


	const selectPlate = (item) => {
		popupShow.value = false
	}

	onMounted(() => {
		check(),
		getNotice(),
		getUserInfo()
	})
</script>
<style>
	.view {
		display: flex;
		align-items: center;
		width: 100%;
	}

	.swiper {
		width: 100%;
		height: 300rpx;
		margin: 5px;
	}

	.swiper image {
		width: 100%;
		height: 100%;
		border-radius: 5px;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 5px;
		margin: 5px;
		background-color: #fff;
		border-radius: 5px;
	}

	.header text {
		font-size: 40px;
		font-weight: bold;
		background: linear-gradient(90deg, rgb(11, 115, 184), rgb(208, 122, 197));
		-webkit-background-clip: text;
		color: transparent;

	}

	.func {
		width: 100%;
		background-color: #fff;
		margin: 5px;
		border-radius: 5px;
	}

	.title {
		display: flex;
		justify-content: left;
		font-size: 22px;
		font-weight: 600;
		background-image: linear-gradient(to right, #c1a400, #ffff00);
		background-size: 40% 3px;
		background-repeat: no-repeat;
		background-position: 0 100%;
		padding: 5px;
	}

	.func .func-list {
		display: flex;
		margin: 5px;
	}

	.func .func-item {
		width: 100%;
		height: 160rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		border: 1px solid #e5e5e5;
		border-radius: 15px;
		margin: 5px;
		box-shadow: 2px 2px 4px #b6b6b6;
	}

	.func .func-item image {
		width: 125rpx;
		height: 125rpx;
	}

	.func .func-item text {
		font-size: 25rpx;
		font-weight: bold;
	}

	.notice {
		width: 100%;
		background-color: #fff;
		margin: 5px;
		border-radius: 5px;
	}

	.notice .notice-item {
		margin: 5px;
		border-radius: 10px;
		box-shadow: 2px 2px 4px #b6b6b6;
		font-size: 20px;
	}

	.uni-collapse-item__title-text {
		font-size: 16px !important;
		font-weight: 600 !important;
	}

	.notice .notice-item .content {
		padding: 15px;
		font-size: 15px;
	}

	.notice .notice-item .date {
		display: flex;
		justify-content: flex-end;
		font-size: 14px;
		color: #999;
	}
</style>