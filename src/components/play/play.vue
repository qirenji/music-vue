<template>
<!-- 播放详情页 -->
	<div class="play">
    <div :style="{backgroundColor: skinColor}" class="header">
      <div class="back">
        <div class="icon-back"><i @click="back"></i></div>
      </div>
      <div @click="isShowMusicList=false" class="title">
        <div class="name">{{audio.name || (musicData[0]&&musicData[0].name)}}</div>
      </div>
      <div class="list">
        <div class="icon-list"><i @click="isShowMusicList=!isShowMusicList"></i></div>
      </div>
    </div>

    <div class="content">
      <!-- 详情页播放列表 -->
      <transition name="fade">
        <div v-show="isShowMusicList" class="music-list">
          <ul>
            <li @click="toggleMusic(index)" v-for="(item, index) in musicData" :class="{activeColor: index === audio.index}">{{`${index+1}. ${item.name}`}}</li>
          </ul>
        </div>
      </transition>
      <!-- 播放页背景图-虚 -->
      <img @click.stop.prevent="isShowSkinColors=false;isShowMusicList=false" :src="audio.musicImgSrc ||(musicData[0]&&musicData[0].musicImgSrc)" alt="">
      <!-- 小背景实图 -->
      <div @click.stop.prevent="isShowSkinColors=false;isShowMusicList=false" class="img"><img :src="audio.musicImgSrc || (musicData[0]&&musicData[0].musicImgSrc)" alt=""></div>
      <!-- 播放进度条 -->
      <div class="progress">
        <span class="start-time">{{transformTime(currentTime)}}</span>
        <div @click="changeTime($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)" ref="progressBar" class="progress-bar">
          <div class="now" ref="now" :style="{width: (currentTime / nativeAudio.duration).toFixed(3)*100 + '%'}"></div>
        </div>
        <span class="end-time">{{transformTime(totalTime)}}</span>
      </div>
      <!-- 更改皮肤 -->
      <div class="skin">
        <transition name="slide-fade">
          <div class="skin-colors" v-show="isShowSkinColors">
            <i @click="changeSkinColor('#B72712')" :class="{selected: skinColor==='#B72712'}" class="one"></i>
            <i @click="changeSkinColor('#1565C0')" :class="{selected: skinColor==='#1565C0'}" class="two"></i>
            <i @click="changeSkinColor('#212121')" :class="{selected: skinColor==='#212121'}" class="three"></i>
            <i @click="changeSkinColor('#1B5E20')" :class="{selected: skinColor==='#1B5E20'}" class="four"></i>
          </div>
        </transition>

        <div @click="showSkinColor" :class="{'icon-skin-red': skinColor === '#B72712','icon-skin-blue': skinColor === '#1565C0','icon-skin-black': skinColor === '#212121','icon-skin-green': skinColor === '#1B5E20'}" class="icon-skin"></div>
      </div>
    </div>
    <!-- 播放按钮 -->
    <div :style="{backgroundColor: skinColor}" class="footer">
      <div class="prev">
        <div class="icon-prev"><i @click="prev"></i></div>
      </div>
      <div class="play">
        <div class="icon-play"><i @click="play" :class="[isPlaying ? 'pause-icon' : 'play-icon']"></i></div>
      </div>
      <div class="next">
        <div class="icon-next"><i @click="next"></i></div>
      </div>
    </div>
	</div>

</template>


<script>
export default {
	name: 'play',
  data() {
    return {
      isShowMusicList: false,
      isShowSkinColors: false,
      currentTime: 0,
      totalTime: 0,
      nativeAudio: {}
    }
  },
  computed: {
    skinColor() {
      return this.$store.state.skinColor;
    },
    // 获取当前音乐信息
    audio() {
      return this.$store.state.audio;
    },
    // 获取播放器列表信息
    musicData() {
      return this.$store.state.musicData;
    },
    isPlaying() {
      return this.$store.state.isPlaying;
    },
  },
  methods: {
    back() {
      this.$store.commit('showIndex',true);
      this.$store.commit('showMiniMusic',true);
      this.isShowSkinColors = false;
      this.isShowMusicList = false
    },
    // 播放/暂停
    toggleMusic(index) {
      this.$store.dispatch('toggleMusic', index);
      setTimeout(() => {
        this.isShowMusicList = false;
      }, 100);
    },
    // 格式化时间
    transformTime(seconds) {
      let m,s;
      m = Math.floor(seconds/60);
      m = m.toString().length == 1?('0'+m) : m;
      s = Math.floor(seconds - 60 * m);
      s = s.toString().length == 1?('0'+s) : s;
      return m + ':' +s;
    },
    // 调整播放时间
    changeTime(event) {
      let progressBar = this.$refs.progressBar;
      let coordStart = progressBar.getBoundingClientRect().left;
      let coordEnd = event.pageX;
      this.nativeAudio.currentTime = (coordEnd - coordStart) / progressBar.offsetWidth * this.nativeAudio.duration;
      this.currentTime = this.nativeAudio.currentTime;
      this.nativeAudio.play();
      this.$store.commit('play', true);
    },
    // 手机调整时间
    touchMove(event) {
      let progressBar = this.$refs.progressBar;
      let coordStart = progressBar.getBoundingClientRect().left;
      let coordEnd = event.touches[0].pageX;
      this.$refs.now.style.width = ((coordEnd - coordStart) / progressBar.offsetWidth).toFixed(3) * 100 + '%';
    },
    touchEnd(event) {
      this.nativeAudio.currentTime = this.$refs.now.style.width.replace('%', '')/100 * this.nativeAudio.duration;
      this.currentTime = this.nativeAudio.currentTime;
      this.nativeAudio.play();
      this.$store.commit('play', true);
    },
    changeSkinColor(color) {
      this.$store.commit('changeSkinColor',color);
      this.isShowSkinColors = false;
    },
    showSkinColor() {
      this.isShowSkinColors = !this.isShowSkinColors;
    },
    // 播放前一首
    prev() {
      this.audio.index = this.audio.index === 0?this.musicData.length - 1:(--this.audio.index);
      this.$store.dispatch('toggleMusic', this.audio.index);
    },
    // 播放
    play() {
      this.$store.commit('play', !this.isPlaying);
      // !this.isPlaying ? this.DOM.audio.pause() : this.DOM.audio.play();
    },
    // 播放后一首
    next() {
      this.audio.index = this.audio.index === this.musicData.length - 1 ? 0 : (++this.audio.index);
      this.$store.dispatch('toggleMusic', this.audio.index);
    }
  },
  mounted() {
    this.nativeAudio = document.querySelector('audio');
    this.nativeAudio.addEventListener('play', () => {
      this.totalTime = this.nativeAudio.duration;
      this.currentTime = this.nativeAudio.currentTime;
      setInterval(() => {
        this.currentTime = this.nativeAudio.currentTime;
      }, 1000);
      this.currentTime = this.nativeAudio.currentTime;
    })
  },
  watch: {
    skinColor(val) {
      localStorage.skinColor = val;
    }
  }
}
</script>

<style lang="scss" scoped>
	.play {

    .slide-fade-enter-active {
      transition: all .3s ease;
    }
    .slide-fade-leave-active {
      transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-active {
      transform: translateX(10px);
      opacity: 0;
    }
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;


    .header {
      position: relative;
      // z-index: 1;
      flex: 1;
      display: flex;
      .back {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon-back i {
          display: inline-block;
          background: url('./back.svg') no-repeat;
          background-size: contain;
          width: 22px;
          height: 22px;
          vertical-align: middle;
          cursor: pointer;
        }
      }
      .title {
        flex: 5;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.2rem;
        font-weight: bold;
        color: white;
        width: 100%;
        .name {
          text-align: center;
          width: 250px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .list {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon-list i {
          display: inline-block;
          background: url('./list.svg') no-repeat;
          background-size: contain;
          width: 22px;
          height: 22px;
          vertical-align: middle;
          cursor: pointer;
        }
      }

    }
    .content {
      position: relative;
      flex: 9;
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      .music-list {
        position: absolute;
        z-index: 3;
        top: 0;
        right: 0;
        color: #999;
        padding: 0;
        margin: 0;
        height: auto;
        max-height: 100%;
        overflow: auto;
        .fade-enter-active {
          transition: all .3s ease;
        }
        .fade-leave-active {
          transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        }
        .fade-enter, .fade-leave-active {
          transform: translateX(10px);
          opacity: 0;
        }
        .activeColor {
          color: #FFffff;
        }
        ul {

          height: 100%;
          overflow-y: auto;
          background: rgba(0, 0, 0, .7);
          height: 100%;
          margin: 0;
          padding: 0;
          padding-bottom: 5px;
          box-shadow: 0 0 6px #2196F3;
          border-radius: 10px 0 0 10px;

          li {
            // width: 100%;
            width: 260px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding-left: 20px;
            padding-right: 20px;
            font-weight: 400;
            padding-top: 7px;
            padding-bottom: 7px;
            cursor: pointer;
          }
          li + li {
            border-top: 1px solid #616161;
          }
        }
      }
      img {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        width: 100%;
        height: 100%;
        filter: brightness(65%) blur(8px);
      }
      .img {
        width: 300px;
        height: 300px;
        img {
          position: relative;
          filter: blur(0);
          z-index: 2;
          width: 100%;
          height: 100%;
          border-radius: 150px;
          animation: loading 10s linear infinite;
        }
      }
      .skin {
        position: absolute;
        display: flex;
        flex-direction: column;
        bottom: 50px;
        right: 15px;
        width: 30px;
        // height: 100px;
        // background-color: red;
        .skin-colors {
          flex: 4;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          .selected {
            border: 1px solid white;
          }
          i {
            flex: 1;
            display: inline-block;
            width: 20px;
            height: 20px;
            cursor: pointer;
            border-radius: 10px;
            margin-bottom: 5px;
          }
          i.one {
            background-color: #B72712;
          }
          i.two {
            background-color: #1565C0;
          }
          i.three {
            background-color: #212121;
          }
          i.four {
            background-color: #1B5E20;
          }
        }
        .icon-skin {
          flex: 1;
          width: 100%;
          height: 30px;
          background-repeat: no-repeat;
          background-size: contain;
          margin-top: 3px;
          cursor: pointer;
        }
        .icon-skin-red {
          background-image: url('./skinRed.svg');
        }
        .icon-skin-green {
          background-image: url('./skinGreen.svg');
        }
        .icon-skin-blue {
          background-image: url('./skinBlue.svg');
        }
        .icon-skin-black {
          background-image: url('./skinBlack.svg');
        }

      }
      .progress {
        position: absolute;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        bottom: 8px;
        left: 0px;
        text-align: center;
        color: rgba(255, 255, 255, .8);
        .start-time {
          flex: 1;
        }
        .progress-bar {
          position: relative;

          width: 100%;
          height: 4px;
          background-color: rgba(255, 255, 255, .8);
          vertical-align: bottom;
          border-radius: 2px;
          flex: 4;
          cursor: pointer;

          .now {
            position: absolute;
            left: 0;
            display: inline-block;
            max-width: 100%;
            width: 100%;
            height: 100%;
            background-color: #31c27c;
          }
          .now::after {
            content: "";
            position: absolute;
            left: 100%;
            width: 2px;
            height: 120%;
            background-color: white;
          }
        }
        .end-time {
          flex: 1;
        }
      }
    }
    .footer {
      flex: 1;
      display: flex;
      position: relative;
      z-index: 1;
      padding-left: 40px;
      padding-right: 40px;
      background-color: #B72712;
      .prev {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        .icon-prev i{
          display: inline-block;
          background: url('./prev.png') no-repeat;
          background-size: contain;
          width: 40px;
          height: 40px;
          vertical-align: middle;
          cursor: pointer;

        }
      }
      .play {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon-play{
          // padding-top: 5%;
          margin: 6% auto;
          i {
            cursor: pointer;
            background-size: contain;
            display: inline-block;
            width: 40px;
            height: 40px;
            vertical-align: top;
          }
        }
        .play-icon {
          background: url('./play.png') no-repeat;

        }
        .pause-icon {
          background: url('./pause.png') no-repeat;
        }
      }
      .next {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon-next i{
          display: inline-block;
          background: url('./next.png') no-repeat;
          background-size: contain;
          width: 40px;
          height: 40px;
          vertical-align: middle;
          cursor: pointer;
        }
      }
    }

    @keyframes loading{
      0% {
        transform: rotate(0);
      }
      100%{
        transform:rotate(360deg);
      }
    }
  }
</style>


