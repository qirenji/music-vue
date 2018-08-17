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

Vue.use(VueAxios,axios);

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
    // // 切换歌曲
    // changeMusic(state, index) {
    //     state.musicIdex = index;
    // },
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
    toggleMusic(state, index) {
      let musicData =  state.musicData[index];
      state.audio.index = musicData.index;
      state.audio.src = musicData.src;
      state.audio.name = musicData.name;
      state.audio.musicImgSrc = musicData.musicImgSrc;
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
  	getInitData({dispatch, commit, state}) {
      if (localStorage.musics !== '[]' && localStorage.musics) {
        state.musicData = JSON.parse(localStorage.musics);
        return;
      }else{
        state.musicData = MusicData.musicData;
      }
      localStorage.musics = JSON.stringify(state.musicData);
      commit('toggleMusic',0);
    },
    // toggleMusic({commit,state},index){
  	//   let id = state.musicData[index].id;
    //   Vue.axios.get(`${URL}/music/url`,{params:{
    //       'id': id
    //   }})
    //   .then(res => res.data.data)
    //   .then(music => {
    //     Vue.axios.get(`${URL}/song/detail`,{params:{
    //         'ids': id
    //       }})
    //       .then(res => res.data.songs)
    //       .then(detail => {
    //         let payload = {
    //           index: index,
    //           src: music[0].url,
    //           musicImgSrc: detail[0].al.picUrl,
    //         }
    //         commit('playMusic',payload)
    //       })
    //
    //   })
    // }
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
