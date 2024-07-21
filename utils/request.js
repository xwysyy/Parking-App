import baseUrl from './config.js'
import {check} from './check.js'
export const request = (url, method, data) => {
		check()
	    return new Promise((resolve, reject) => {
        uni.request({
            url: baseUrl+url,
            method: method,
			data: data,
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				'cookie': uni.getStorageSync('session')
			},
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}