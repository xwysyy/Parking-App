<template>
	<view class="view">
		<view class="order">
			<template v-for="(item, index) in orderList" :key="index">
				<view class="order-item">
					<view class="order-item-content">
						<view class="order-item-content-left">
							<view style="margin-bottom: 10rpx;"><text class="order-lable">车牌号：</text>
								<text style="font-weight: 600;">{{item.plate}}</text>
							</view>
							<view v-if="item.status != 0"><text class="order-lable">订单金额：</text>
								<text class="order-data">{{item.amount}}</text>
							</view>
							<view style="margin-bottom: 10rpx;"><text class="order-lable">订单时间：</text>
								<text class="order-data">{{item.begin_time}}</text>
							</view>
						</view>
						<view class="order-item-content-right">
							<view style="margin-bottom: 10rpx;"><text class="order-lable">车位号：</text>
								<text style="font-weight: 600;">{{item.spot}}</text>
							</view>
						</view>
					</view>
					<view style="display: flex;" @click="getDetail(item.id)">
						<view style="width: 100%; text-align: end; padding: 8px;">
							<text style="color:grey;">待确认开启</text>
						</view>
					</view>
				</view>
			</template>
		</view>
	</view>
	<view class="view" style="justify-content: center;">
		<uni-pagination show-icon="true" :pageSize="page.pageSize" :total="page.total" :current="page.pageNum"
			@change="handlePage">
		</uni-pagination>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		reactive
	} from 'vue'
	import {
		request
	} from '@/utils/request'
	import {
		check
	} from '@/utils/check'
	import qs from 'qs'
	const page = reactive({
		total: 0,
		pageSize: 5,
		pageNum: 1
	})
	const handlePage = (e) => {
		page.pageNum = e.current
		getOrderList()
	}
	const orderList = reactive([])
	const getOrderList = () => {
		let data1 = qs.parse({
			'status': 0,
			'no_data': 1
		})
		request('api/app/order.query', 'GET', data1).then(res => {
			if (res.data.status != 0) {
				uni.showToast({
					title: res.data.msg,
					icon: 'none'
				})
				return
			} else {
				page.total = res.data.data.count
			}
		})
		let data = qs.parse({
			'status': 0,
			'limit': page.pageSize,
			'off': (page.pageNum - 1) * page.pageSize
		})
		request('api/app/order.query', 'GET', data).then(res => {
			if (res.data.status != 0) {
				uni.showToast({
					title: res.data.msg,
					icon: 'none'
				})
				return
			} else {
				orderList.splice(0, orderList.length)
				for (let i = 0; i < res.data.data.info.length; i++) {
					orderList.push(res.data.data.info[i])
				}
			}
		})
	}
	const getDetail = (id) => {
			uni.navigateTo({
				url: '/pages/order/detail?id=' + id
			})
		}
	onMounted(() => {
		check(),
		getOrderList()
	})
</script>

<style scoped>
	.view {
		display: flex;
		align-items: center;
		width: 100%;
	}

	.order {
		width: 100%;
		margin: 15px;
		border-radius: 5px;
	}


	.order .order-item {
		background-color: #fff;
		width: 100%;
		min-height: 100rpx;
		margin: 10px 0;
		border-radius: 10px;
		box-shadow: 1px 1px 3px #94fff7;
		border: 1px solid #00aaff;
	}

	.order .order-item:hover {
		background-color: #f0f0f0;
		box-shadow: 2px 2px 5px #8c8c8c;
	}

	.order .order-item-content {
		display: flex;
		justify-content: space-between;
		padding: 10px;
	}

	.order .order-item-content-left {
		display: flex;
		flex-direction: column;
	}

	.order .order-item-content-right {
		display: flex;
		flex-direction: column;
	}

	.order .order-lable {
		font-size: 16px;
		font-weight: 600;
		background: linear-gradient(90deg, rgb(0, 85, 255), rgb(85, 170, 255));
		-webkit-background-clip: text;
		color: transparent;
	}

	.order .order-data {
		font-weight: 500;
		font-size: 16px;
		color: #000;
	}

	.content {
		height: 700px;
		background-color: #04C9C3;
		color: #fff;
	}
</style>