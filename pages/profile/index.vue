<template>
	<view class="view">
		<view class="card">
			<image :src="icon"></image>
			<view style="display: flex; justify-content: center;">
				<view class="name">{{userInfo.name}}</view>
			</view>
		</view>
	</view>
	<view class="view" style="display: block;">
		<view class="list">
			<view class="list-item" @click="editTitle">
				<view class="list-item-left">
					<image src="/static/icons/name.png"></image>
					<text>昵称：</text>
				</view>
				<view class="list-item-right">
					<text>{{userInfo.name}}</text>
					<image src="/static/icons/right.png"></image>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="list-item" @click="editPhone">
				<view class="list-item-left">
					<image src="/static/icons/phone.png"></image>
					<text>电话：</text>
				</view>
				<view class="list-item-right">
					<text>{{userInfo.phone}}</text>
					<image src="/static/icons/right.png"></image>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="list-item" @click="editEmail">
				<view class="list-item-left">
					<image src="/static/icons/email.png"></image>
					<text>邮箱：</text>
				</view>
				<view class="list-item-right">
					<text>{{userInfo.email}}</text>
					<image src="/static/icons/right.png"></image>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="list-item" @click="editPasswd">
				<view class="list-item-left">
					<image src="/static/icons/passwd.png"></image>
					<text>密码修改</text>
				</view>
				<view class="list-item-right">
					<image src="/static/icons/right.png"></image>
				</view>
			</view>
		</view>
	</view>
	<view class="view">
		<button @click="logout" class="btn">退出登录</button>
	</view>

</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from 'vue'
	import {
		request
	} from '@/utils/request'
	import {
		check
	} from '@/utils/check'
	import qs from 'qs'
	import Identicon from 'identicon.js'
	import md5 from 'blueimp-md5'
	const icon = ref('')
	const userInfo = reactive({
		name: '',
		balance: '',
		phone: '',
		email: '',
		register_time: '',
		last_login: '',
		plates: [],
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
			let data = res.data.data.info
			userInfo.name = data.name
			userInfo.balance = data.balance
			userInfo.phone = data.phone
			userInfo.email = data.email
			userInfo.plates = data.plates
			icon.value = 'data:image/png;base64,' + new Identicon(md5(userInfo.name || 998244353), 420)
				.toString()
		}).catch(err => {
			console.log(err)
		})
	}

	const logout = () => {
		request('api/app/user.logout', 'GET').then(res => {
			uni.showToast({
				title: '退出成功',
				icon: 'success'
			})
			uni.removeStorageSync('session')
			uni.redirectTo({
				url: '/pages/login/login'
			})
		}).catch(err => {
			console.log(err)
		})
	}

	const editTitle = () => {
		uni.showModal({
			title: '请输入新昵称',
			content: userInfo.name,
			editable: true,
			placeholderText: '请输入新昵称',
			confirmText: '确认',
			cancelText: '取消',
			success: (res) => {
				if (res.confirm) {
					request('api/app/user.modify', 'POST', qs.stringify({
						'new_name': res.content
					})).then(res => {
						if (res.data.status != 0) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
							return
						}
						uni.showToast({
							title: '修改成功，请重新登陆',
							icon: 'success'
						})
						logout()
					}).catch(err => {
						console.log(err)
					})
				}
			}
		})
	}

	const editPhone = () => {
		uni.showModal({
			title: '请输入新电话',
			content: userInfo.phone,
			editable: true,
			placeholderText: '请输入新电话',
			confirmText: '确认',
			cancelText: '取消',
			success: (res) => {
				if (res.confirm) {
					request('api/app/user.modify', 'POST', qs.stringify({
						'phone': res.content
					})).then(res => {
						if (res.data.status != 0) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
							return
						}
						uni.showToast({
							title: '修改成功',
							icon: 'success'
						})
						getUserInfo()
					}).catch(err => {
						console.log(err)
					})
				}
			}
		})
	}

	const editEmail = () => {
		uni.showModal({
			title: '请输入新邮箱',
			content: userInfo.email,
			editable: true,
			placeholderText: '请输入新邮箱',
			confirmText: '确认',
			cancelText: '取消',
			success: (res) => {
				if (res.confirm) {
					request('api/app/user.modify', 'POST', qs.stringify({
						'email': res.content
					})).then(res => {
						if (res.data.status != 0) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
							return
						}
						uni.showToast({
							title: '修改成功',
							icon: 'success'
						})
						getUserInfo()
					}).catch(err => {
						console.log(err)
					})
				}
			},
		})
	}

	const editPasswd = () => {
		uni.showModal({
			title: '请输入旧密码',
			content: '',
			editable: true,
			placeholderText: '请输入旧密码',
			confirmText: '确认',
			cancelText: '取消',
			success: (res) => {
				if (res.confirm) {
					let old_passwd = res.content
					uni.showModal({
						title: '请输入新密码',
						content: '',
						editable: true,
						placeholderText: '请输入新密码',
						confirmText: '确认',
						cancelText: '取消',
						success: (res) => {
							if (res.confirm) {
								let new_passwd = res.content
								uni.showModal({
									title: '请再次输入新密码',
									content: '',
									editable: true,
									placeholderText: '请再次输入新密码',
									confirmText: '确认',
									cancelText: '取消',
									success: (res) => {
										if (res.confirm) {
											let new_passwd2 = res.content
											if (new_passwd != new_passwd2) {
												uni.showToast({
													title: '两次输入密码不一致',
													icon: 'none'
												})
												return
											}
											request('api/app/user.passwd', 'POST',
												qs.stringify({
													'passwd': old_passwd,
													'new_passwd': new_passwd
												})).then(res => {
												if (res.data.status != 0) {
													uni.showToast({
														title: res
															.data
															.msg,
														icon: 'none'
													})
													return
												}
												uni.showToast({
													title: '修改成功，请重新登陆',
													icon: 'success'
												})
												logout()
											}).catch(err => {
												console.log(err)
											})
										}
									}
								})
							}
						}
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

	.card {
		width: 100%;
		background-color: #fff;
		border-radius: 5px;
		margin: 10px;
		text-align: center;
		padding: 10px;
	}

	.card image {
		width: 100px;
		height: 100px;
		border-radius: 30%;
		margin: 10px;
	}

	.card .name {
		font-size: 25px;
		font-weight: bold;
	}

	.card .name image {
		width: 20px;
		height: 20px;
	}

	.balance {
		width: 100%;
		background-color: #fff;
		border-radius: 5px;
		margin: 10px;
		padding: 10px;
		display: flex;
		align-items: center;
	}

	.list {
		width: 100%;
	}

	.list-item {
		margin: 8rpx 10px;
		min-height: 30rpx;
		background-color: #fff;
		border-radius: 10px;
		min-height: 40rpx;
		padding: 10px 20px;
		display: flex;
		justify-content: space-between;
	}

	.list-item-left {
		display: flex;
		align-items: center;
	}

	.list-item-left image {
		width: 20px;
		height: 20px;
	}

	.list-item-left text {
		margin-left: 10px;
	}

	.list-item-right {
		display: flex;
		align-items: center;
	}

	.list-item-right text {
		margin-right: 10px;
	}

	.list-item-right image {
		width: 20px;
		height: 20px;
	}

	.btn {
		width: 100%;
		height: 50px;
		border-radius: 5px;
		margin: 10px;
		align-items: center;
		border: 1px solid #c5c5c5;
	}
</style>