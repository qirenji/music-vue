<template>
  <div id="app">

    <transition name="show">
      <div v-show="isShowIndex" class="index">

        <VHeader></VHeader>

        <router-view></router-view>

        <VFooter></VFooter>
        
      </div>
    </transition>

    <transition name="showIndex">
      <Play v-show="!isShowIndex"></Play>
    </transition>

    <audio :src="audio.src || (musicData[0]&&musicData[0].src)" :autoplay="isPlaying" ref="audio"></audio>

    <About v-show="isShowAbout"></About>
  </div>
</template>

<script>
import VHeader from './components/header/header.vue';
import VFooter from './components/footer/footer.vue'
import Play from './components/play/play.vue'
import About from './components/about/about.vue'

export default {
  name: 'app',
  data() {
    return {

    };
  },
  components: {
    VHeader,
    VFooter,
    Play,
    About
  },
  beforeCreate() {
    this.$store.dispatch('getData');
  },
  mounted() {
    this.$store.commit('findDOM',{name: 'audio',dom:this.$refs.audio});
    this.$refs.audio.addEventListener('ended',() => {this.next();});
    this.$refs.audio.addEventListener('error', () => {this.next();});
  },
  computed: {
    audio() {
      return this.$store.state.audio;
    },
    musicData() {
      return this.$store.state.musicData;
    },
    isPlaying() {
      return this.$store.state.isPlaying;
    },
    isShowIndex() {
      return this.$store.state.isShowIndex;
    },
    isShowAbout() {
      return this.$store.state.isShowAbout;
    }
  },
  methods: {
    next() {
      // 最后一首歌曲跳转到第一首
      this.audio.index = this.audio.index === this.musicData.length - 1 ? 0 : (++this.audio.index);
      this.$store.commit('toggleMusic', this.audio.index)
    }
  }
}
</script>

<style lang="scss">
@import "./common/style/base.scss";

  .showIndex-enter-active {
    transition: all .4s ease-out;
  }
  .showIndex-leave-active {
    transition: all 0 ease;
  }
  .showIndex-enter, .showIndex-leave-active {
    transform: translateY(350px);
    opacity: 0;
  }
  .show-enter-active {
    transition: all .4s ease;
  }
  .show-leave-active {
    transition: all 0 ease-out;
  }
  .show-enter, .show-leave-active {
    transform: translateX(-350px);
    opacity: 0;
  }  

  #app, .index {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
</style>
