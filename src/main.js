// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import MusicData from './assets/music-data.json'
import {URL} from './assets/config'


Vue.config.productionTip = false

Vue.use(VueAxios, axios);

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // 音乐列表信息
    musicData: [],
    musicIndex: 0,
    skinColor: localStorage.skinColor || '#B72712',
    // tab选项值
    linkBorderIndex: '',
    // 获取audio
    // DOM: {},
    isPlaying: false,
    isShowMiniMusic: true,
    isShowIndex: true,
    isShowAbout: false,
    // 当前歌曲信息
    audio: {}
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
    // // 切换歌曲
    // changeMusic(state, index) {
    //     state.musicIdex = index;
    // },
    // 添加歌曲
    addMusic(state, payload) {
      let hasMusic = state.musicData.find((item) => {
        return item.id === payload.id;
      })
      if (hasMusic) return
      for (let music of state.musicData) {
        music.index++;
      }
      state.musicData.unshift(payload);
    },
    // 播放歌曲
    playMusic(state, payload) {
      state.audio.index = payload.index;
      state.audio.src = payload.src;
      state.audio.name = payload.name;
      state.audio.musicImgSrc = payload.musicImgSrc;
      state.isPlaying = true;
    },
    play(state, flag) {
      state.isPlaying = flag;
    },
    del(state, index) {
      if (state.musicData.length === 0) {
        return;
      }
      state.musicData.splice(index, 1);
      state.musicData.forEach((item, i) => {
        if (i >= index) {
          item.index--;
        }
      })
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
    getInitData({dispatch, commit, state}) {
      if (localStorage.musics !== '[]' && localStorage.musics) {
        state.musicData = JSON.parse(localStorage.musics);
      } else {
        state.musicData = MusicData.musicData;
      }
      localStorage.musics = JSON.stringify(state.musicData);
      dispatch('toggleMusic', 0);
    },
    toggleMusic({commit, state}, index) {
      let id = state.musicData[index].id;
      Vue.axios.get(`${URL}/music/url`, {
        params: {
          'id': id
        }
      })
        .then(res => res.data.data)
        .then(music => {
          let payload = {
            index: index,
            id: id,
            name: state.musicData[index].name,
            src: music[0].url,
            musicImgSrc: state.musicData[index].musicImgSrc,
          }
          commit('playMusic', payload)
        })
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
})
