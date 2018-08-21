<template>
  <transition name="showRouter">
  	<div class="musiclist">
  		<div v-for="(item,index) in musicData" class="music-item">
  			<img :src="item.musicImgSrc" class="music-img"/>
  			<span @click="toggleMusic(index)" class="music-name">{{`${index+1}. ${item.name}`}}</span>
  			<span @click="del(index)" class="del-icon"></span>
  		</div>
  		<div class="tips">没有更多歌曲了～</div>
  	</div>
  </transition>
</template>


<script>
export default {
  name: 'MusicList',
	computed: {
		musicData() {
			return this.$store.state.musicData;
		},
    // DOM() {
    //   return this.$store.state.DOM;
    // },
    isPlaying() {
      return this.$store.state.isPlaying;
    }
	},
  beforeCreate() {
    this.$store.commit('showMiniMusic',true);
  },
	mounted() {
		this.$store.commit('changeLinkBorderIndex',1);
	},
  methods: {
    //点击切换音乐
    toggleMusic(index) {
      if(this.$store.state.audio.index === index){
        this.$store.commit('play', !this.isPlaying)
      } else {
        this.$store.commit('play',false);
        this.$store.dispatch('toggleMusic', index);
      }
    },
    //删除音乐
    del(index) {
      this.$store.commit('del',index);
    }
  },
  watch: {
    musicData: {
      handler(val, oldVal) {
        localStorage.musics = JSON.stringify(val);
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.showRouter-enter-active {
  transition: all .4s ease;
}
.showRouter-leave-active {
  transition: all 0 ease;
}
.showRouter-enter, .showRouter-leave-active {
  transform: translateX(-150px);
  opacity: 0;
}

	.musiclist {
    padding-top: 4px;
    padding-left: 4px;
    padding-right: 4px;
    padding-bottom: 70px;
    flex:8;
    overflow: auto;
    .music-item + .music-item {
      border-top: 1px solid rgba(0, 0, 0, .1);
    }
    .music-item {
      padding: 4px 6px 0;
      position: relative;
      margin-bottom: 4px;
      border-radius: 5px;
      cursor: pointer;
      border: none;

      .music-img {
        width: 50px;
        height: 50px;
        border-radius: 5px;
      }
      span.music-name {
        display: inline-block;
        width: 65%;
        vertical-align: top;
        margin-top: 15px;
        margin-left: 15px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
        padding-bottom: 20px;
      }

      span.del-icon {
        display: inline-block;
        position: absolute;
        right: 10px;
        top: 20px;
        width: 20px;
        height: 20px;
        background: url('./del.svg');
        background-size: contain;
        cursor: pointer;
      }
    }
    .tips {
      text-align: center;
      margin: 12px auto;
      width: 200px;
      font-size: 80%;
      color: gray;
    }
  }
</style>


