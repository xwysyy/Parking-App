<template>
	<view class="view">
		<view class="plate">
			<view class="plate-title">绑定车牌</view>
			<view class="plate-list">
				<view class="plate-item" v-for="(item,index) in userInfo.plates" :key="index">
					<view style="display: flex; align-items: center;">
						<image  src="/static/icons/del.png" style="width: 30px;height: 30px;" @click="delPlate(item.name)"></image>
						<text class="item-lable">车牌号：</text>
					</view>
					<text class="item-content">{{item.name}}</text>
				</view>
			</view>
			<view class='action'>
				<view class="btn" @click="addPlate">添加车牌</view>
			</view>
		</view>
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
	import qs  from 'qs'
	const userInfo = reactive({
		plates: []
	})
	const getUserInfo = () => {
		request('api/app/user.info', 'GET').then(res => {
			if (res.data.status != 0) {
				uni.showToast({
					title: res.data.msg,
					icon: 'none'
				})
				return
			}
			let tem = res.data.data.info.plates
			userInfo.plates = []
			for (let i = 0; i < tem.length; i++) {
				let obj = {
					'name': tem[i]
				}
				userInfo.plates.push(obj)
			}
		}).catch(err => {
			console.log(err)
		})
	}

	const addPlate = () => {
		uni.showModal({
			title: '添加车牌',
			content: '',
			placeholder: '请输入车牌号',
			editable: true,
			confirmText: '确认',
			cancelText: '取消',
			success: function(res) {
				if (res.confirm) {
					request('api/app/plate.add', 'POST', qs.stringify({plate: res.content})
					).then(res => {
						if (res.data.status != 0) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
							return
						}
						uni.showToast({
							title: '添加成功',
							icon: 'success'
						})
						getUserInfo()
					})
				}
			}
		})
	}
	
	const delPlate = (plate) => {
		uni.showModal({
			title: '删除车牌',
			content: '确认删除车牌' + plate + '吗？',
			confirmText: '确认',
			cancelText: '取消',
			success: function(res) {
				if (res.confirm) {
					request('api/app/plate.del', 'POST', qs.stringify({
						plate: plate,
						})
					).then(res => {
						if (res.data.status != 0) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
							return
						}
						uni.showToast({
							title: '删除成功',
							icon: 'success'
						})
						getUserInfo()
					})
				}
			}
		})
	}
	onMounted(() => {
		check(),
		getUserInfo()
	})
</script>

<style scoped>
	.view {
		display: flex;
		align-items: center;
		width: 100%;
	}
	.plate {
		width: 100%;
		background-color: #fff;
		margin: 15px;
		border-radius: 10px;
		box-shadow: 1px 1px 3px #94fff7;
		border: 1px solid #00aaff;
		padding: 10px;
	}
	
	.plate-title {
		font-size: 30px;
		text-align: center;
		font-weight: 600;
		background: linear-gradient(90deg, #0055ff, #55ffff);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	
	.plate-list {
		margin: 10px;
	}
	.plate-item {
		display: flex;
		justify-content: space-between;
		margin: 10px;
	}
	
	.item-lable {
		font-size: 18px;

	}
	
	.item-content {
		font-size: 20px;
		font-weight: 600;
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