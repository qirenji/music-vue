// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'

Vue.config.productionTip = false

Vue.use(VueAxios,axios);

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // 音乐列表信息
    musicData: [],
    skinColor: localStorage.skinColor || '#B72712',
    // tab选项值
    linkBorderIndex: '',
    // 获取audio
    // DOM: {},
    isPlaying: false,
    isShowMiniMusic: true,
    isShowIndex: true,
    isShowAbout:false,
    // 当前歌曲信息
    audio: {
      name: '',
      src: '',
      musicImgSrc: '',
      index: 0
    }
  },
  mutations: {
    // 切换tab标签
    changeLinkBorderIndex(state, index) {
      state.linkBorderIndex = index;
    },
    // 找到audio
    // findDOM(state, payload) {
    //   state.DOM[payload.name] = payload.dom;
    // },
    // 切换歌曲
    toggleMusic(state, index) {
        state.audio.name = state.musicData[index].name;
        state.audio.src = state.musicData[index].src;
        state.audio.musicImgSrc = state.musicData[index].musicImgSrc;
        state.audio.index = index;
    },
    // 添加歌曲
    addMusic(state, payload) {
      for (let music of state.musicData) {
        if (JSON.stringify(music) === JSON.stringify(payload)) {
          return;
        }
      }
      state.musicData.unshift(payload);
    },
    // 播放歌曲
    playMusic(state, payload) {
      state.audio.name = payload.name;
      state.audio.src = payload.src;
      state.audio.musicImgSrc = payload.imgSrc;
      state.isPlaying = true;
    },
    play(state, flag) {
      state.isPlaying = flag;
    },
    del(state, index) {
      if(state.musicData.length === 0) {
        return;
      }
      state.musicData.splice(index,1);
    },
    showMiniMusic(state, flag) {
      state.isShowMiniMusic = flag;
    },
    showIndex(state, flag) {
      state.isShowIndex = flag;
    },
    changeSkinColor(state, color) {
      state.skinColor = color;
    },
    showAbout(state, flag) {
      state.isShowAbout = flag;
    }
  },
  actions: {
    // 初始化-获取音乐播放信息
  	getData({commit,state}) {
      if (localStorage.musics !== '[]' && localStorage.musics) {
        state.musicData = JSON.parse(localStorage.musics);
        return;
      }
      return new Promise((resolve, reject) => {
        Vue.axios.get('/api/music-data')
            .then (res => {
              if (res.data.errno === 0) {
                state.musicData = res.data.musicData;
                localStorage.musics = JSON.stringify(state.musicData);
              }
            })
            .then(() => {
              // 播放第一首歌曲
              commit('toggleMusic',0)
            });
        resolve();
      });
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
