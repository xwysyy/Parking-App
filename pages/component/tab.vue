<template>
	<view class="content">
		<view class="hand">
			<scroll-view scroll-x="true" class="scroll-class">
				<view class="dataInfo">
					<view class="dataList" v-for="(item, index) in tabList" :key="index" @click="changeTab(index)">
						<view :class="tabIndex == index ? 'activite' : ''" class="name">{{
              item.label
            }}</view>
						<view :class="tabIndex == index ? 'active-line' : ''"></view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "baseTab",
		props: {
			tabList: {
				type: Array,
				default: () => [],
			},
			tabIndex: {
				type: Number,
				default: 0,
			},
		},
		data() {
			return {};
		},
		methods: {
			changeTab(index) {
				this.$emit("changeTab", index);
			},
		},
	};
</script>

<style scoped>
	.content .hand .dataInfo {
		display: flex;
		text-align: center;
		width: 100%;
	}

	.content .hand .dataInfo .dataList .name {
		font-size: 30rpx;
		color: #bdbdbd;
		display: block;
		line-height: 52rpx;
		width: 152rpx;
		margin: 0 15rpx;
		font-weight: 600;
	}

	.content .hand .dataInfo .dataList .name.activite {
		color: #333333;
	}

	.content .hand .dataInfo .dataList .active-line {
		height: 6rpx;
		width: 100rpx;
		background: #00aaff;
		border-radius: 2rpx;
		margin: 0 auto;
	}

	.content .scroll-class {
		white-space: nowrap;
		border-bottom: 2rpx solid #e1e4e6;
	}
</style>