<template>
<!-- 头部页面 -->
	<div :style="{backgroundColor: skinColor}" class="header">
		<div class="name">
			<span class="aside-menu" @click.stop.prevent="$store.commit('showIndex',false)"><i class="menu-icon"></i>
			</span>
			<p class="title">网易云音乐</p>
			<span class="search" @click="toSearch"><i class="search-icon"></i>
			</span>
		</div>
		<div class="tab">
			<div class="item" :class="{link: linkBorderIndex==1}">
				<router-link to="/music-list">我的音乐</router-link>
			</div>
			<div class="item" :class="{link: linkBorderIndex==2}">
				<router-link to="/find">发现音乐</router-link>
			</div>
			<div class="item" :class="{link: linkBorderIndex==3}">
				<router-link to="/social">账号</router-link>
			</div>
		</div>
	</div>
</template>


<script>

export default {
	name: 'VHeader',

	data() {
		return {

		};
	},
	computed: {
		linkBorderIndex() {
      return this.$store.state.linkBorderIndex;
    },
    skinColor() {
    	return this.$store.state.skinColor;
    }
	},
	methods: {
		toSearch() {
			this.$router.push('/find');
		}
	}

}

</script>

<style lang="scss" scoped>
	.header {
		background-color: #b72712;
		color: white;
		width: 100%;
		.name {
			width: 100%;
			display: flex;
			justify-content: center;
			padding-top: 15px;
			padding-bottom: 15px;
			font-size: 20px;
			letter-spacing: 2px;
			border-bottom: 1px solid rgba(255,255,255,.2);

			.aside-menu {
				flex: 1;
				position: relative;
				.menu-icon {
					position: absolute;
					width: 20px;
					height: 20px;
					left: 15px;
					bottom: 2px;
					background: url(./menu.svg) no-repeat;
					background-size: contain;
					cursor:pointer;
				}
			}
			.title {
				flex: 1;
				text-align: center;
			}
			.search {
				position: relative;
				flex: 1;
				.search-icon {
					position: absolute;
          width: 20px;
          height: 20px;
          right: 15px;
          bottom: 2px;
          background: url(./search.svg) no-repeat;
          background-size: contain;
          cursor: pointer;
				}
			}
		}
		.tab {
			display: flex;
			border-bottom: 1px solid #9e9e9e;
			.item {
				flex: 1;
				text-align: center;
				padding-top: 12px;
				padding-bottom: 12px;
			}
		}
		.link {
			font-weight: bold;
			color: #BDBDBD;
			border-bottom: 1px solid #E0F2F1;
		}
	}
</style>


