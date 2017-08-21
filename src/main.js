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
    musicData: [],
    skinColor: localStorage.skinColor || '#B72712',
    linkBorderIndex: '',
    DOM: {},
    isPlaying: false,
    isShowMiniMusic: true,
    isShowIndex: true,
    isShowAbout:false,
    audio: {
      name: '',
      src: '',
      musicImgSrc: '',
      index: 0
    }
  },
  mutations: {
    changeLinkBorderIndex(state, index) {
      state.linkBorderIndex = index;
    },
    findDOM(state, payload) {
      state.DOM[payload.name] = payload.dom;
    },
    toggleMusic(state, index) {
        state.audio.name = state.musicData[index].name;
        state.audio.src = state.musicData[index].src;
        state.audio.musicImgSrc = state.musicData[index].musicImgSrc;
        state.audio.index = index;
    },
    addMusic(state, payload) {
      for (let music of state.musicData) {
        if (JSON.stringify(music) === JSON.stringify(payload)) {
          return;
        }
      }
      state.musicData.unshift(payload);
    },
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
