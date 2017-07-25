<template>
	<transition name="showAbout">
    <div class="about">
      <i @click="showAbout" class="close"></i>
      <div class="about-content">
        <h1>关于</h1>
        <p class="skill"><b>技术栈</b>：</p>
        <div>Vue2<br>Vuex<br>vue-router<br>axios<br>SASS(SCSS)<br>Express<br>Webpack<br>ES6<br>localStorage(HTML5)<br>CSS3</div>
        <p class="url"><b>源码地址</b>：<a @touchstart="isHover=true" @touchEnd="isHover=false" :class="{hover: isHover}" href="https://github.com/qirenji/vue-music-player" target="_blank">GitHub</a></p>
        <p class="url"><b>个人网站</b>：<a @touchstart="isHover=true" @touchEnd="isHover=false" :class="{hover: isHover}" href="http://www.qirenji.info/" target="_blank">Qi Renji</a></p>
      </div>
      <div @click="showAbout" class="mask"></div>
    </div>
  </transition>
</template>

<script>
	export default {
		name: 'about',
		data() {
			return {
				isHover: false
			}
		},
		methods: {
			showAbout() {
      	this.$store.commit('showAbout', false);
    	}
		}
	}
</script>

<style lang="scss" scoped>

	.about {
		a {
    	color: #3F51B5;
  	}
    display: flex;
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    // background-color: rgba(0, 0, 0, .5);
    .close {
      position: absolute;
      z-index: 3;
      display: inline-block;
      width: 30px;
      height: 30px;
      background: url('./close.svg') no-repeat;
      background-size: contain;
      top: 14%;
      right: 14%;
    }
    .about-content {
      position: relative;
      z-index: 2;
      width: 80%;
      height: 80%;
      background-color: white;
      border-radius: 10px;
      padding: 30px 10px;
      box-shadow: 0 0 20px gray;
      overflow: auto;

      h1 {
        text-align: center;
        font-size: 1.4rem;
        color: #31c27c;
        transition: .3s ease-in-out;
      }

      p {
        text-indent: 1em;
        word-break: break-all;
        margin-top: 16px;
        font-size: 1.1rem;

        b {
          display: inline-block;
          transition: .3s ease-in-out;
        }

      }

      div {
        letter-spacing: 1px;
        padding-left: 50px;
        line-height: 26px;
      }

    }
    .mask {
      position: absolute;
      z-index: 0;
      width: 100%;
      height: 100%;
      background: none;
    }
  }
  .showAbout-enter-active {
    transition: all .4s ease-in-out;
  }
  .showAbout-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .showAbout-enter, .showAbout-leave-active {
    transform: rotateZ(180deg);
    opacity: 0;
  }
</style>



