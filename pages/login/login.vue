<template>
	<view>
		<view class="bkStyle"></view>
		<image class="img-a" src="/static/images/bk/1.png"></image>
		<image class="img-b" src="/static/images/bk/2.png"></image>

		<view class="loginStyle">
			<uni-row style="margin: 25px;">
				<view style="text-align: center;font-size: 25px; font-weight: 600;margin: 25px;">欢迎来到智泊云界</view>
			</uni-row>
			<view>
				<view class="input">
					<image src="/static/icons/user.png"></image>
					<input class="inputStyle" type="text" v-model="username" placeholder="请输入用户名" />
				</view>
				<view class="input">
					<image src="/static/icons/lock.png"></image>
					<input class="inputStyle" type="password" v-model="password" placeholder="请输入密码" />
				</view>
			</view>
			<uni-row>
				<uni-col :span="12">
					<button class="btn" @click="login">登录</button>
				</uni-col>
				<uni-col :span="12">
					<button class="btn" @click="register">注册</button>
				</uni-col>
			</uni-row>
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
	import qs from 'qs'
	const username = ref('xwysyy')
	const password = ref('123456')
	const userInfo = reactive({
		name: '',
		passwd: ''
	})
	const login = () => {
		let data = qs.stringify({
			'name': username.value,
			'passwd': password.value
		})
		request('api/app/user.login', 'POST', data).then(res => {
			if (res.data.status != 0) {
				uni.showToast({
					title: res.data.msg,
					icon: 'none'
				})
				return
			} else {
				uni.showToast({
					title: '登录成功',
					icon: 'success'
				})
				uni.setStorageSync('session', res.header['Set-Cookie'])
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		}).catch(err => {
			console.log(err)
		})
	}
	const register = () => {
		uni.redirectTo({
			url: '/pages/login/register'
		})
	}
	const check = () => {
		if (uni.getStorageSync('session') != '') {
			uni.switchTab({
				url: '/pages/index/index'
			})
		}
	}
	onMounted(() => {
		check()
	})
</script>
<style scoped>
	.img-a {
		position: absolute;
		width: 100%;
		top: -150rpx;
		right: 0;
	}

	.img-b {
		position: absolute;
		width: 50%;
		bottom: 0;
		left: -50rpx;
	}

	.bkStyle {
		background:linear-gradient(70deg, rgb(16, 133, 222), pink);
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: -1;
	}

	.loginStyle {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 90%;
		padding: 10px;
		height: 350px;
		background-color: rgba(255, 255, 255, 0.4);
		border-radius: 10px;
		-webkit-backdrop-filter: blur(10px);
		backdrop-filter: blur(10px);
		box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
	}

	.input {
		display: flex;
		align-items: center;
		border-radius: 10px;
		border: 1px solid #fff;
		height: 40px;
		padding: 5px;
		margin: 10px;
	}

	.input image {
		width: 40rpx;
		height: 40rpx;
		margin: 5px;
	}

	.inputStyle {
		width: 100%;
		margin: 15px 0;
		font-size: 20px;
	}

	.btn {
		width: 95%;
		border-radius: 10px;
		background-color: rgba(255, 255, 255, 0.6);
		box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
	}
</style>