<template>
	<div class="social">
		<div class="info">
			<a href="http://www.qirenji.info" target="_blank" class="avatar"><img src="http://www.qirenji.info/img/avatar.jpg" alt=""></a>
			<div class="about">
				<div class="name"><a href="http://www.qirenji.info/img/avatar.jpg">_流星达人_</a></div>
				<span class="level">Lv.2</span>
			</div>
			<span @click="isSignIn=true" class="sign">{{isSignIn ? '已签到' : '签到'}}</span>
		</div>
		
		<div class="message">
			<div class="trend set">动态<span>2</span></div>
			<div class="fellow set">关注<span>10</span></div>
			<div class="fan set">粉丝<span>8</span></div>
		</div>

		<div class="settings">
      <div class="content">
      	<ul>
          <li><i class="icon-msg"></i><a href="http://music.163.com/">我的消息</a></li>
       	</ul>
        <ul>
          <li><i class="icon-vip"></i>会员中心</li>
          <li><i class="icon-shop"></i>商城</li>
          <li><i class="icon-music"></i>在线听歌免流量</li>
        </ul>
        <ul>
          <li><i class="icon-friend"></i>我的好友</li>
          <li><i class="icon-near"></i>附近的人</li>
        </ul>
        <ul>
          <li @click.stop.prevent="$store.commit('showIndex',false)"><i class="icon-skin"></i>个性换肤</li>
          <li @click.stop.prevent="showAbout"><i class="aboutme"></i>关于</li>
        </ul>
        <div class="back">
          <i class="icon-back"></i>
        </div>
      </div>
		</div>
	</div>
</template>


<script>
export default {
	name: 'social',
	data() {
		return {
			isSignIn: false
		}
	},
	mounted() {
		this.$store.commit('changeLinkBorderIndex',3);
		this.$store.commit('showMiniMusic',false);
	},
	methods: {
		showAbout() {
			return this.$store.commit('showAbout',true);
		}
	}

}	
</script>

<style lang="scss" scoped>
	.social {
		display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: auto;
    .info {
    	position: relative;
    	width: 100%;
    	height: 100px;
			padding-top: 10px;
			padding-left: 20px;
			padding-bottom: 8px;
			background-color: white;
			border-bottom: 1px solid #f1f1f1;
			img {
				width: 80px;
				height: 80px;
				border-radius: 50%
			}
			.about {
				position: absolute;
				left: 120px;
				top: 30px;
				a{
					color: #000;
				}
				.level {
					font-size: 0.8rem;
					margin-left: 5px;
					padding: 0 4px;
					border: 1px solid gray;
					border-radius: 5px;
				}
			}
			.sign {
				position: absolute;
				right: 8%;
				top: 40px;
				width: 70px;
				text-align: center;
				font-size: 0.9rem;
				color: gray;
				border: 1px solid gray;
				padding: 2px 12px;
				border-radius: 12px;
			}
    }
    .message {
    	display: flex;
    	height: 50px;
    	justify-content: center;
    		align-items: center;
    	.set {
    		display: flex;
    		flex: 1;
    		height: 30px;
    		justify-content: center;
    		align-items: center;
    		span{
    			padding-left: 4px;
    		}
    	}
    	.set + .set {
    		border-left: 1px solid #f1f1f1;  		
    	}
    }
    .settings {
    	display: flex;
    	flex-direction: column;
    	ul {
    		border-top: 15px solid #f1f1f1;
    		li {
    			height: 50px;
    			display: flex;
    			align-items: center;
    			padding-left: 30px;
    			cursor: pointer;
    			a {
    				color: #000;
    			}
    			i {
            display: inline-block;
            width: 20px;
            height: 20px;
            margin-right: 15px;
            vertical-align: text-bottom;
          }
          i.icon-skin {
            background: url('./skin.svg') no-repeat;
            background-size: contain;

          }
          i.icon-msg {
            background: url('./msg.svg') no-repeat;
            background-size: contain;
            margin-top: 5px;
          }
          i.icon-vip {
            background: url('./vip.svg') no-repeat;
            background-size: contain;
          }
          i.icon-shop {
            background: url('./shop.svg') no-repeat;
            background-size: contain;
          }
          i.icon-music {
            background: url('./music.svg') no-repeat;
            background-size: contain;
          }
          i.icon-friend {
            background: url('./friend.svg') no-repeat;
            background-size: contain;
          }
          i.icon-near {
            background: url('./near.svg') no-repeat;
            background-size: contain;
          }

          i.aboutme {
            background: url('./about.svg') no-repeat;
            background-size: contain;
          }
    		}
    		li + li {
    			border-top: 1px solid #f1f1f1;
    		}

    	}
    }
	}
</style>


