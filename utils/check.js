export const  check = () => {
		if(uni.getStorageSync('session')==''){
			uni.showToast({
				title: '请先登录',
				icon: 'none',
			})
			uni.redirectTo({
				url: '/pages/login/login'
			})
		}
}
	