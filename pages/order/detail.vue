<template>
	<view class="view">
		<view class="detail">
			<view class="detail-title">订单详情</view>
			<view class="detail-list">
				<view class="detail-item">
					<text class="item-lable">订单编号</text>
					<text class="item-content">{{order.id}}</text>
				</view>
				<view class="detail-item">
					<text class="item-lable">订单状态</text>
					<text class="item-content" style="color: #f00;" v-if="order.status == 0">未开始</text>
					<text class="item-content" style="color: #f00;" v-if="order.status == 1">进行中</text>
					<text class="item-content" style="color: #f00;" v-if="order.status == 2">待支付</text>
					<text class="item-content" style="color: #f00;" v-if="order.status == 3">已完成</text>
				</view>
				<view class="detail-item">
					<text class="item-lable">车牌号</text>
					<text class="item-content">{{order.plate}}</text>
				</view>
				<view class="detail-item">
					<text class="item-lable">车位号</text>
					<text class="item-content">{{order.spot}}</text>
				</view>
				<view class="detail-item">
					<text class="item-lable">开始时间</text>
					<text class="item-content">{{order.begin_time}}</text>
				</view>
				<view v-if="order.status >= 2" class="detail-item">
					<text class="item-lable">结束时间</text>
					<text class="item-content">{{order.end_time}}</text>
				</view>
				<view v-if="order.status != 0" class="detail-item">
					<text class="item-lable">订单金额</text>
					<text class="item-content">{{order.amount}}</text>
				</view>
			</view>
			<view class='action'>
				<view v-if="order.status == 0" class="btn" @click="beginOrder(order.id)">开始订单</view>
				<view v-if="order.status == 2" class="btn" @click="payOrder(order.id)">支付订单</view>
				<view class="btn" @click="getRoute(order.spot)">导航</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		request
	} from '@/utils/request'
	import {
		check
	} from '@/utils/check'
	import qs from 'qs'
	const id = ref(0)
	const order = reactive({
		id: 0,
		status: 0,
		plate: '',
		spot: '',
		begin_time: '',
		end_time: '',
		amount: 0
	})
	const getDetail = () => {
		request('api/app/order.info', 'GET', {
			id: id.value
		}).then(res => {
			if (res.data.status != 0) {
				uni.showToast({
					title: res.data.msg,
					icon: 'none'
				})
				return
			} else {
				let tem = res.data.data
				order.id = tem.id
				order.status = tem.status
				order.plate = tem.plate
				order.spot = tem.spot
				order.begin_time = tem.begin_time
				order.end_time = tem.end_time
				order.amount = tem.amount
			}
		})
	}
	const beginOrder = (id) => {
	}
	const payOrder = (id) => {
	}
	const getRoute = (spot) => {
	}
	onLoad((options) => {
		id.value = options.id
	})
	onMounted(() => {
		check()
		getDetail()
	})
</script>

<style scoped>
	.view {
		display: flex;
		align-items: center;
		width: 100%;
	}

	.detail {
		width: 100%;
		background-color: #fff;
		margin: 15px;
		border-radius: 10px;
		box-shadow: 1px 1px 3px #94fff7;
		border: 1px solid #00aaff;
		padding: 10px;
	}

	.detail-title {
		font-size: 30px;
		text-align: center;
		font-weight: 600;
		background: linear-gradient(90deg, #0055ff, #55ffff);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.detail-list {
		margin: 10px;
	}

	.detail-item {
		display: flex;
		justify-content: space-between;
		margin: 10px;
	}

	.item-lable {
		font-size: 20px;
		font-weight: 600;
	}

	.item-content {
		font-size: 18px;
	}

	.action {
		display: flex;
		justify-content: center;
		margin: 20px;
	}

	.btn {
		width: 100px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		border-radius: 10px;
		background-color: #0055ff;
		color: #fff;
		margin: 0 10px;
	}
</style>