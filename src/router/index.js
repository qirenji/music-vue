import Vue from 'vue'
import Router from 'vue-router'
import MusicList from '@/components/musiclist/musiclist.vue';
import Find from '@/components/find/find.vue';
import Social from '@/components/social/social.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '／',
      component: MusicList
    },
    {
      path: '/music-list',
      name: 'MusicList',
      component: MusicList
    },
    {
      path: '/find',//查找歌曲
      name: 'Find',
      component: Find
    },
    {
      path: '/social',
      name: 'Social',
      component: Social
    }
  ]
})
