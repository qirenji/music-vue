webpackJsonp([1],Array(19).concat([function(t,i,s){"use strict";s.d(i,"a",function(){return n}),s.d(i,"b",function(){return e});var n="http://localhost:3000",e=["张杰","赵雷","李健","林志炫","张碧晨","梁博","周笔畅","张靓颖","陈奕迅","周杰伦","王力宏","TFBoys","李玉刚","魏晨","薛之谦"]},,,,,,,,,,,,,,,,,,,function(t,i,s){"use strict";var n=s(20),e=s(125),o=s(114),a=s.n(o),c=s(111),r=s.n(c),u=s(116),l=s.n(u);n.a.use(e.a),i.a=new e.a({routes:[{path:"/",name:"／",component:a.a},{path:"/music-list",name:"MusicList",component:a.a},{path:"/find",name:"Find",component:r.a},{path:"/social",name:"Social",component:l.a}]})},,,function(t,i,s){function n(t){s(104)}var e=s(1)(s(61),s(122),n,null,null);t.exports=e.exports},,function(t,i){t.exports={musicData:[{index:0,id:479408220,name:"凉凉-张碧晨",musicImgSrc:"http://p1.music.126.net/9FhJLS1BrJdXAUJ2qjyJSg==/19212866183896782.jpg"},{index:1,id:202373,name:"南方姑娘-赵雷",musicImgSrc:"http://p1.music.126.net/wldFtES1Cjnbqr5bjlqQbg==/18876415625841069.jpg"},{index:2,id:26191007,name:"浮夸-林志炫",musicImgSrc:"http://p1.music.126.net/MG01RVbmHEsh6LVMKmvPpg==/2525578209026524.jpg"},{index:3,id:26090160,name:"单身情歌-林志炫",musicImgSrc:"http://p1.music.126.net/vdrh_W-Q6rZUT1XWaqHV_Q==/2268292488121204.jpg"},{index:4,id:431853688,name:"我的梦 (Live)-张靓颖",musicImgSrc:"http://p1.music.126.net/2tEEJqcH45znTWs18CBOXQ==/1376588573856953.jpg"},{index:5,id:28059417,name:"他不懂-张杰",musicImgSrc:"http://p1.music.126.net/mW53BkMgGy37I7yVrUg-aQ==/109951163117902077.jpg"}]}},,,,,,,,,,,,,,,,,,function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=s(113),e=s.n(n),o=s(112),a=s.n(o),c=s(115),r=s.n(c),u=s(110),l=s.n(u);i.default={name:"app",data:function(){return{}},components:{VHeader:e.a,VFooter:a.a,Play:r.a,About:l.a},beforeCreate:function(){this.$store.dispatch("getInitData")},mounted:function(){var t=this;this.$refs.audio.addEventListener("ended",function(){t.next()}),this.$refs.audio.addEventListener("error",function(){console.log("error"),t.next()})},computed:{audio:function(){return this.$store.state.audio},isPlaying:function(){return console.log(this.$store.state.isPlaying),this.$store.state.isPlaying},musicData:function(){return this.$store.state.musicData},isShowIndex:function(){return this.$store.state.isShowIndex},isShowAbout:function(){return this.$store.state.isShowAbout}},methods:{next:function(){this.audio.index=this.audio.index===this.musicData.length-1?0:++this.audio.index,this.$store.dispatch("toggleMusic",this.audio.index)}},watch:{isPlaying:function(t){t?this.$refs.audio.play():this.$refs.audio.pause()}}}},function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default={name:"about",data:function(){return{isHover:!1}},methods:{showAbout:function(){this.$store.commit("showAbout",!1)}}}},function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=s(10),e=s.n(n),o=s(19);i.default={name:"find",data:function(){return{keywords:"",isShowHot:!0,isShowHistory:!1,hotKeywords:[],playIndex:"",isLoading:!1,musicList:[],searchHistory:localStorage.searchHistory&&JSON.parse(localStorage.searchHistory)||[]}},computed:{musicData:function(){return this.$store.state.musicData}},watch:{searchHistory:{handler:function(t){localStorage.searchHistory=e()(t)},deep:!0},musicData:{handler:function(t,i){localStorage.musics=e()(t)},deep:!0}},beforeCreate:function(){this.$store.commit("showMiniMusic",!0)},created:function(){this.hotKeywords=this.selectData(o.b,6)},methods:{selectData:function(t,i){for(var s=JSON.parse(e()(t)),n=new Array(i),o=0;o<n.length;o++){var a=s.length,c=Math.floor(a*Math.random());n[o]=s[c],s.splice(c,1)}return n},inputFocus:function(){this.keywords.trim()||(this.isShowHot=!1,this.isShowHistory=!0,this.musicList=[])},cancel:function(){this.isShowHot=!0,this.keywords=""},toSearch:function(t){var i=this;t.trim()&&(this.isShowHistory=!1,this.isShowHot=!1,this.playIndex=null,this.isLoading=!0,this.$store.commit("showMiniMusic",!1),this.keywords=t,this.axios.get(o.a+"/search",{params:{keywords:t}}).then(function(t){return t.data.result}).then(function(s){i.musicList=s.songs,i.isLoading=!1,i.searchHistory.unshift(t)}))},playMusic:function(t,i){var s=this;this.axios.get(o.a+"/song/detail",{params:{ids:i.id}}).then(function(t){return t.data.songs}).then(function(n){var e={index:0,id:i.id,name:i.name+"-"+i.artists[0].name,musicImgSrc:n[0].al.picUrl};s.$store.commit("addMusic",e),s.$store.dispatch("toggleMusic",0),s.$store.commit("showMiniMusic",!0),s.playIndex=t})}},mounted:function(){this.$store.commit("changeLinkBorderIndex",2)}}},function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default={data:function(){return{nativeAudio:{},currentTime:0,totalTime:0}},computed:{audio:function(){return this.$store.state.audio},musicData:function(){return this.$store.state.musicData},isPlaying:function(){return this.$store.state.isPlaying},isShowMiniMusic:function(){return this.$store.state.isShowMiniMusic},skinColor:function(){return this.$store.state.skinColor},isShowAsideMenu:function(){return this.$store.state.isShowAsideMenu}},mounted:function(){var t=this;this.nativeAudio=document.querySelector("audio"),this.nativeAudio.addEventListener("play",function(){t.totalTime=t.nativeAudio.duration,t.currentTime=t.nativeAudio.currentTime,setInterval(function(){t.currentTime=t.nativeAudio.currentTime},1e3)})},methods:{transformTime:function(t){var i=void 0,s=void 0;return i=Math.floor(t/60),i=1==i.toString().length?"0"+i:i,s=Math.floor(t-60*i),s=1==s.toString().length?"0"+s:s,i+":"+s},play:function(){this.$store.commit("play",!this.isPlaying)},changeTime:function(t){var i=this.$refs.progressBar,s=i.getBoundingClientRect().left,n=t.pageX;this.nativeAudio.currentTime=(n-s)/i.offsetWidth*this.nativeAudio.duration,this.currentTime=this.nativeAudio.currentTime,this.nativeAudio.play(),this.$store.commit("play",!0)},touchMove:function(t){var i=this.$refs.progressBar,s=i.getBoundingClientRect().left,n=t.touches[0].pageX;this.$refs.now.style.width=100*((n-s)/i.offsetWidth).toFixed(3)+"%"},touchEnd:function(t){this.nativeAudio.currentTime=this.$refs.now.style.width.replace("%","")/100*this.nativeAudio.duration,this.currentTime=this.nativeAudio.currentTime,this.nativeAudio.play(),this.$store.commit("play",!0)},showPlay:function(){this.isshowAsideMenu||(this.$store.commit("showIndex",!1),this.$store.commit("showMiniMusic",!1))}}}},function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default={name:"VHeader",data:function(){return{}},computed:{linkBorderIndex:function(){return this.$store.state.linkBorderIndex},skinColor:function(){return this.$store.state.skinColor}},methods:{toSearch:function(){this.$router.push("/find")}}}},function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=s(10),e=s.n(n);i.default={name:"MusicList",computed:{musicData:function(){return this.$store.state.musicData},isPlaying:function(){return this.$store.state.isPlaying}},beforeCreate:function(){this.$store.commit("showMiniMusic",!0)},mounted:function(){this.$store.commit("changeLinkBorderIndex",1)},methods:{toggleMusic:function(t){this.$store.state.audio.index===t?this.$store.commit("play",!this.isPlaying):this.$store.commit("play",!0),this.$store.dispatch("toggleMusic",t)},del:function(t){this.$store.commit("del",t)}},watch:{musicData:{handler:function(t,i){localStorage.musics=e()(t)},deep:!0}}}},function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default={name:"play",data:function(){return{isShowMusicList:!1,isShowSkinColors:!1,currentTime:0,totalTime:0,nativeAudio:{}}},computed:{skinColor:function(){return this.$store.state.skinColor},audio:function(){return this.$store.state.audio},musicData:function(){return this.$store.state.musicData},isPlaying:function(){return this.$store.state.isPlaying}},methods:{back:function(){this.$store.commit("showIndex",!0),this.$store.commit("showMiniMusic",!0),this.isShowSkinColors=!1,this.isShowMusicList=!1},toggleMusic:function(t){var i=this;this.$store.dispatch("toggleMusic",t),setTimeout(function(){i.isShowMusicList=!1},100)},transformTime:function(t){var i=void 0,s=void 0;return i=Math.floor(t/60),i=1==i.toString().length?"0"+i:i,s=Math.floor(t-60*i),s=1==s.toString().length?"0"+s:s,i+":"+s},changeTime:function(t){var i=this.$refs.progressBar,s=i.getBoundingClientRect().left,n=t.pageX;this.nativeAudio.currentTime=(n-s)/i.offsetWidth*this.nativeAudio.duration,this.currentTime=this.nativeAudio.currentTime,this.nativeAudio.play(),this.$store.commit("play",!0)},touchMove:function(t){var i=this.$refs.progressBar,s=i.getBoundingClientRect().left,n=t.touches[0].pageX;this.$refs.now.style.width=100*((n-s)/i.offsetWidth).toFixed(3)+"%"},touchEnd:function(t){this.nativeAudio.currentTime=this.$refs.now.style.width.replace("%","")/100*this.nativeAudio.duration,this.currentTime=this.nativeAudio.currentTime,this.nativeAudio.play(),this.$store.commit("play",!0)},changeSkinColor:function(t){this.$store.commit("changeSkinColor",t),this.isShowSkinColors=!1},showSkinColor:function(){this.isShowSkinColors=!this.isShowSkinColors},prev:function(){this.audio.index=0===this.audio.index?this.musicData.length-1:--this.audio.index,this.$store.dispatch("toggleMusic",this.audio.index)},play:function(){this.$store.commit("play",!this.isPlaying)},next:function(){this.audio.index=this.audio.index===this.musicData.length-1?0:++this.audio.index,this.$store.dispatch("toggleMusic",this.audio.index)}},mounted:function(){var t=this;this.nativeAudio=document.querySelector("audio"),this.nativeAudio.addEventListener("play",function(){t.totalTime=t.nativeAudio.duration,t.currentTime=t.nativeAudio.currentTime,setInterval(function(){t.currentTime=t.nativeAudio.currentTime},1e3),t.currentTime=t.nativeAudio.currentTime})},watch:{skinColor:function(t){localStorage.skinColor=t}}}},function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default={name:"social",data:function(){return{isSignIn:!1}},mounted:function(){this.$store.commit("changeLinkBorderIndex",3),this.$store.commit("showMiniMusic",!1)},methods:{showAbout:function(){return this.$store.commit("showAbout",!0)}}}},function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=s(10),e=s.n(n),o=s(39),a=s.n(o),c=s(20),r=s(41),u=s.n(r),l=s(38),d=s(37),h=s.n(d),m=s(40),v=s.n(m),f=s(42),p=s(43),g=s.n(p),w=s(19);c.a.config.productionTip=!1,c.a.use(v.a,h.a),c.a.use(f.a);var _=new f.a.Store({state:{musicData:[],musicIndex:0,skinColor:localStorage.skinColor||"#B72712",linkBorderIndex:"",isPlaying:!1,isShowMiniMusic:!0,isShowIndex:!0,isShowAbout:!1,audio:{}},mutations:{changeLinkBorderIndex:function(t,i){t.linkBorderIndex=i},addMusic:function(t,i){if(!t.musicData.find(function(t){return t.id===i.id})){var s=!0,n=!1,e=void 0;try{for(var o,c=a()(t.musicData);!(s=(o=c.next()).done);s=!0)o.value.index++}catch(t){n=!0,e=t}finally{try{!s&&c.return&&c.return()}finally{if(n)throw e}}t.musicData.unshift(i)}},playMusic:function(t,i){t.audio.index=i.index,t.audio.src=i.src,t.audio.name=i.name,t.audio.musicImgSrc=i.musicImgSrc,t.isPlaying=!0},play:function(t,i){t.isPlaying=i},del:function(t,i){0!==t.musicData.length&&(t.musicData.splice(i,1),t.musicData.forEach(function(t,s){s>=i&&t.index--}))},showMiniMusic:function(t,i){t.isShowMiniMusic=i},showIndex:function(t,i){t.isShowIndex=i},changeSkinColor:function(t,i){t.skinColor=i},showAbout:function(t,i){t.isShowAbout=i}},actions:{getInitData:function(t){var i=t.dispatch,s=(t.commit,t.state);"[]"!==localStorage.musics&&localStorage.musics?s.musicData=JSON.parse(localStorage.musics):s.musicData=g.a.musicData,localStorage.musics=e()(s.musicData),i("toggleMusic",0)},toggleMusic:function(t,i){var s=t.commit,n=t.state,e=n.musicData[i].id;c.a.axios.get(w.a+"/music/url",{params:{id:e}}).then(function(t){return t.data.data}).then(function(t){var o={index:i,id:e,name:n.musicData[i].name,src:t[0].url,musicImgSrc:n.musicData[i].musicImgSrc};s("playMusic",o)})}}});new c.a({el:"#app",store:_,router:l.a,template:"<App/>",components:{App:u.a}})},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,i){},function(t,i){},function(t,i){},function(t,i){},function(t,i){},function(t,i){},function(t,i){},function(t,i){},,,,function(t,i,s){function n(t){s(105)}var e=s(1)(s(62),s(123),n,"data-v-e3f75c08",null);t.exports=e.exports},function(t,i,s){function n(t){s(100)}var e=s(1)(s(63),s(118),n,"data-v-115b2000",null);t.exports=e.exports},function(t,i,s){function n(t){s(99)}var e=s(1)(s(64),s(117),n,"data-v-0ecb0880",null);t.exports=e.exports},function(t,i,s){function n(t){s(102)}var e=s(1)(s(65),s(120),n,"data-v-38dcf100",null);t.exports=e.exports},function(t,i,s){function n(t){s(101)}var e=s(1)(s(66),s(119),n,"data-v-1e628c30",null);t.exports=e.exports},function(t,i,s){function n(t){s(106)}var e=s(1)(s(67),s(124),n,"data-v-e7223640",null);t.exports=e.exports},function(t,i,s){function n(t){s(103)}var e=s(1)(s(68),s(121),n,"data-v-7a544b80",null);t.exports=e.exports},function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("transition",{attrs:{name:"fade"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowMiniMusic,expression:"isShowMiniMusic"}],staticClass:"footer",style:{backgroundColor:t.skinColor}},[s("div",{staticClass:"mini-music"},[s("div",{staticClass:"music-img"},[s("img",{attrs:{src:t.audio.musicImgSrc||t.musicData[0]&&t.musicData[0].musicImgSrc},on:{click:t.showPlay}})]),t._v(" "),s("div",{staticClass:"music-name"},[s("p",{on:{click:t.showPlay}},[t._v(t._s(t.audio.name||t.musicData[0]&&t.musicData[0].name))]),t._v(" "),s("div",{staticClass:"progress"},[s("span",{staticClass:"start"},[t._v(t._s(t.transformTime(t.currentTime)))]),t._v(" "),s("div",{ref:"progressBar",staticClass:"progress-bar",on:{click:function(i){t.changeTime(i)},touchmove:function(i){t.touchMove(i)},touchend:function(i){t.touchEnd(i)}}},[s("div",{ref:"now",staticClass:"now",style:{width:100*(t.currentTime/t.totalTime).toFixed(3)+"%"}})]),t._v(" "),s("span",{staticClass:"end"},[t._v(t._s(t.transformTime(t.totalTime)))])])]),t._v(" "),s("div",{staticClass:"music-control"},[s("i",{class:[t.isPlaying?"pause-icon":"play-icon"],on:{click:function(i){t.play()}}})])])])])},staticRenderFns:[]}},function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("transition",{attrs:{name:"showRouter"}},[s("div",{staticClass:"find"},[s("div",{staticClass:"search-input"},[s("div",{staticClass:"input"},[s("i",{staticClass:"icon-search"}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.keywords,expression:"keywords"}],class:{"input-focus":!t.isShowHot},attrs:{type:"text",placeholder:"搜索歌曲"},domProps:{value:t.keywords},on:{keyup:function(i){if(!("button"in i)&&t._k(i.keyCode,"enter",13,i.key,"Enter"))return null;t.toSearch(t.keywords)},focus:t.inputFocus,input:function(i){i.target.composing||(t.keywords=i.target.value)}}}),t._v(" "),s("i",{directives:[{name:"show",rawName:"v-show",value:""!==t.keywords&&!t.isShowHot,expression:"keywords !==''&&!isShowHot"}],staticClass:"icon-cancel",on:{click:function(i){t.keywords=""}}}),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!t.isShowHot,expression:"!isShowHot"}],staticClass:"cancel-btn",on:{click:function(i){t.cancel()}}},[t._v("取消")])])]),t._v(" "),t.isShowHot?s("div",{staticClass:"hot"},[s("div",{staticClass:"keywords"},t._l(t.hotKeywords,function(i){return s("div",{staticClass:"keyword",on:{click:function(s){t.toSearch(i)}}},[t._v(t._s(i))])}))]):s("div",{staticClass:"search-list",on:{touchmove:function(i){t.$store.commit("showMiniMusic",!1)}}},[t._l(t.searchHistory,function(i,n){return s("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowHistory,expression:"isShowHistory"}],staticClass:"history"},[s("div",{staticClass:"icon"},[s("i",{staticClass:"icon-history"})]),t._v(" "),s("div",{staticClass:"word",on:{click:function(s){t.toSearch(i)}}},[t._v(t._s(i))]),t._v(" "),s("div",{staticClass:"icon"},[s("i",{staticClass:"icon-del",on:{click:function(i){t.searchHistory.splice(n,1)}}})])])}),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowHistory&&t.searchHistory.length,expression:"isShowHistory&&searchHistory.length"}],staticClass:"tips",on:{click:function(i){t.searchHistory=[]}}},[t._v("清除搜索记录")]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.isLoading,expression:"isLoading"}],staticClass:"loading"},[s("i",{staticClass:"icon-loading"}),t._v("搜索中...")]),t._v(" "),t._l(t.musicList,function(i,n){return s("div",{staticClass:"music",on:{click:function(s){t.playMusic(n,i)}}},[s("div",{staticClass:"music-info"},[s("div",{staticClass:"music-name"},[t._v(t._s(i.name))]),t._v(" "),s("div",{staticClass:"music-singer"},[t._v(t._s(""+i.artists[0].name||"佚名"))]),t._v(" "),s("i",{directives:[{name:"show",rawName:"v-show",value:n===t.playIndex,expression:"index === playIndex"}],staticClass:"icon-listening"})])])}),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.musicList.length,expression:"musicList.length"}],staticClass:"tips"},[t._v("没有更多结果了～")])],2)])])},staticRenderFns:[]}},function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("transition",{attrs:{name:"showRouter"}},[s("div",{staticClass:"musiclist"},[t._l(t.musicData,function(i,n){return s("div",{staticClass:"music-item"},[s("img",{staticClass:"music-img",attrs:{src:i.musicImgSrc}}),t._v(" "),s("span",{staticClass:"music-name",on:{click:function(i){t.toggleMusic(n)}}},[t._v(t._s(n+1+". "+i.name))]),t._v(" "),s("span",{staticClass:"del-icon",on:{click:function(i){t.del(n)}}})])}),t._v(" "),s("div",{staticClass:"tips"},[t._v("没有更多歌曲了～")])],2)])},staticRenderFns:[]}},function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"header",style:{backgroundColor:t.skinColor}},[s("div",{staticClass:"name"},[s("span",{staticClass:"aside-menu",on:{click:function(i){i.stopPropagation(),i.preventDefault(),t.$store.commit("showIndex",!1)}}},[s("i",{staticClass:"menu-icon"})]),t._v(" "),s("p",{staticClass:"title"},[t._v("网易云音乐")]),t._v(" "),s("span",{staticClass:"search",on:{click:t.toSearch}},[s("i",{staticClass:"search-icon"})])]),t._v(" "),s("div",{staticClass:"tab"},[s("div",{staticClass:"item",class:{link:1==t.linkBorderIndex}},[s("router-link",{attrs:{to:"/music-list"}},[t._v("我的音乐")])],1),t._v(" "),s("div",{staticClass:"item",class:{link:2==t.linkBorderIndex}},[s("router-link",{attrs:{to:"/find"}},[t._v("发现音乐")])],1),t._v(" "),s("div",{staticClass:"item",class:{link:3==t.linkBorderIndex}},[s("router-link",{attrs:{to:"/social"}},[t._v("账号")])],1)])])},staticRenderFns:[]}},function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("transition",{attrs:{name:"showRouter"}},[s("div",{staticClass:"social"},[s("div",{staticClass:"info"},[s("a",{staticClass:"avatar",attrs:{href:"http://www.qirenji.com",target:"_blank"}},[s("img",{attrs:{src:"http://www.qirenji.com/img/avatar.jpg",alt:""}})]),t._v(" "),s("div",{staticClass:"about"},[s("div",{staticClass:"name"},[s("a",{attrs:{href:"http://www.qirenji.info/img/avatar.jpg"}},[t._v("_流星达人_")])]),t._v(" "),s("span",{staticClass:"level"},[t._v("Lv.2")])]),t._v(" "),s("span",{staticClass:"sign",on:{click:function(i){t.isSignIn=!0}}},[t._v(t._s(t.isSignIn?"已签到":"签到"))])]),t._v(" "),s("div",{staticClass:"message"},[s("div",{staticClass:"trend set"},[t._v("动态"),s("span",[t._v("2")])]),t._v(" "),s("div",{staticClass:"fellow set"},[t._v("关注"),s("span",[t._v("10")])]),t._v(" "),s("div",{staticClass:"fan set"},[t._v("粉丝"),s("span",[t._v("8")])])]),t._v(" "),s("div",{staticClass:"settings"},[s("div",{staticClass:"content"},[s("ul",[s("li",[s("i",{staticClass:"icon-msg"}),s("a",{attrs:{href:"http://music.163.com/"}},[t._v("我的消息")])])]),t._v(" "),s("ul",[s("li",[s("i",{staticClass:"icon-vip"}),t._v("会员中心")]),t._v(" "),s("li",[s("i",{staticClass:"icon-shop"}),t._v("商城")]),t._v(" "),s("li",[s("i",{staticClass:"icon-music"}),t._v("在线听歌免流量")])]),t._v(" "),s("ul",[s("li",[s("i",{staticClass:"icon-friend"}),t._v("我的好友")]),t._v(" "),s("li",[s("i",{staticClass:"icon-near"}),t._v("附近的人")])]),t._v(" "),s("ul",[s("li",{on:{click:function(i){i.stopPropagation(),i.preventDefault(),t.$store.commit("showIndex",!1)}}},[s("i",{staticClass:"icon-skin"}),t._v("个性换肤")]),t._v(" "),s("li",{on:{click:function(i){return i.stopPropagation(),i.preventDefault(),t.showAbout(i)}}},[s("i",{staticClass:"aboutme"}),t._v("关于")])]),t._v(" "),s("div",{staticClass:"back"},[s("i",{staticClass:"icon-back"})])])])])])},staticRenderFns:[]}},function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{attrs:{id:"app"}},[s("transition",{attrs:{name:"show"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowIndex,expression:"isShowIndex"}],staticClass:"index"},[s("VHeader"),t._v(" "),s("router-view"),t._v(" "),s("VFooter")],1)]),t._v(" "),s("transition",{attrs:{name:"showIndex"}},[s("Play",{directives:[{name:"show",rawName:"v-show",value:!t.isShowIndex,expression:"!isShowIndex"}]})],1),t._v(" "),s("audio",{ref:"audio",attrs:{src:t.audio.src,autoplay:t.isPlaying}}),t._v(" "),s("About",{directives:[{name:"show",rawName:"v-show",value:t.isShowAbout,expression:"isShowAbout"}]})],1)},staticRenderFns:[]}},function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("transition",{attrs:{name:"showAbout"}},[s("div",{staticClass:"about"},[s("i",{staticClass:"close",on:{click:t.showAbout}}),t._v(" "),s("div",{staticClass:"about-content"},[s("h1",[t._v("关于")]),t._v(" "),s("p",{staticClass:"skill"},[s("b",[t._v("技术栈")]),t._v("：")]),t._v(" "),s("div",[t._v("Vue2"),s("br"),t._v("Vuex"),s("br"),t._v("vue-router"),s("br"),t._v("axios"),s("br"),t._v("SASS(SCSS)"),s("br"),t._v("Express"),s("br"),t._v("Webpack"),s("br"),t._v("ES6"),s("br"),t._v("localStorage(HTML5)"),s("br"),t._v("CSS3")]),t._v(" "),s("p",{staticClass:"url"},[s("b",[t._v("源码地址")]),t._v("："),s("a",{class:{hover:t.isHover},attrs:{href:"https://github.com/qirenji/vue-music-player",target:"_blank"},on:{touchstart:function(i){t.isHover=!0},touchEnd:function(i){t.isHover=!1}}},[t._v("GitHub")])]),t._v(" "),s("p",{staticClass:"url"},[s("b",[t._v("个人网站")]),t._v("："),s("a",{class:{hover:t.isHover},attrs:{href:"http://www.qirenji.info/",target:"_blank"},on:{touchstart:function(i){t.isHover=!0},touchEnd:function(i){t.isHover=!1}}},[t._v("Qi Renji")])])]),t._v(" "),s("div",{staticClass:"mask",on:{click:t.showAbout}})])])},staticRenderFns:[]}},function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"play"},[s("div",{staticClass:"header",style:{backgroundColor:t.skinColor}},[s("div",{staticClass:"back"},[s("div",{staticClass:"icon-back"},[s("i",{on:{click:t.back}})])]),t._v(" "),s("div",{staticClass:"title",on:{click:function(i){t.isShowMusicList=!1}}},[s("div",{staticClass:"name"},[t._v(t._s(t.audio.name||t.musicData[0]&&t.musicData[0].name))])]),t._v(" "),s("div",{staticClass:"list"},[s("div",{staticClass:"icon-list"},[s("i",{on:{click:function(i){t.isShowMusicList=!t.isShowMusicList}}})])])]),t._v(" "),s("div",{staticClass:"content"},[s("transition",{attrs:{name:"fade"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowMusicList,expression:"isShowMusicList"}],staticClass:"music-list"},[s("ul",t._l(t.musicData,function(i,n){return s("li",{class:{activeColor:n===t.audio.index},on:{click:function(i){t.toggleMusic(n)}}},[t._v(t._s(n+1+". "+i.name))])}))])]),t._v(" "),s("img",{attrs:{src:t.audio.musicImgSrc||t.musicData[0]&&t.musicData[0].musicImgSrc,alt:""},on:{click:function(i){i.stopPropagation(),i.preventDefault(),t.isShowSkinColors=!1,t.isShowMusicList=!1}}}),t._v(" "),s("div",{staticClass:"img",on:{click:function(i){i.stopPropagation(),i.preventDefault(),t.isShowSkinColors=!1,t.isShowMusicList=!1}}},[s("img",{attrs:{src:t.audio.musicImgSrc||t.musicData[0]&&t.musicData[0].musicImgSrc,alt:""}})]),t._v(" "),s("div",{staticClass:"progress"},[s("span",{staticClass:"start-time"},[t._v(t._s(t.transformTime(t.currentTime)))]),t._v(" "),s("div",{ref:"progressBar",staticClass:"progress-bar",on:{click:function(i){t.changeTime(i)},touchmove:function(i){t.touchMove(i)},touchend:function(i){t.touchEnd(i)}}},[s("div",{ref:"now",staticClass:"now",style:{width:100*(t.currentTime/t.nativeAudio.duration).toFixed(3)+"%"}})]),t._v(" "),s("span",{staticClass:"end-time"},[t._v(t._s(t.transformTime(t.totalTime)))])]),t._v(" "),s("div",{staticClass:"skin"},[s("transition",{attrs:{name:"slide-fade"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowSkinColors,expression:"isShowSkinColors"}],staticClass:"skin-colors"},[s("i",{staticClass:"one",class:{selected:"#B72712"===t.skinColor},on:{click:function(i){t.changeSkinColor("#B72712")}}}),t._v(" "),s("i",{staticClass:"two",class:{selected:"#1565C0"===t.skinColor},on:{click:function(i){t.changeSkinColor("#1565C0")}}}),t._v(" "),s("i",{staticClass:"three",class:{selected:"#212121"===t.skinColor},on:{click:function(i){t.changeSkinColor("#212121")}}}),t._v(" "),s("i",{staticClass:"four",class:{selected:"#1B5E20"===t.skinColor},on:{click:function(i){t.changeSkinColor("#1B5E20")}}})])]),t._v(" "),s("div",{staticClass:"icon-skin",class:{"icon-skin-red":"#B72712"===t.skinColor,"icon-skin-blue":"#1565C0"===t.skinColor,"icon-skin-black":"#212121"===t.skinColor,"icon-skin-green":"#1B5E20"===t.skinColor},on:{click:t.showSkinColor}})],1)],1),t._v(" "),s("div",{staticClass:"footer",style:{backgroundColor:t.skinColor}},[s("div",{staticClass:"prev"},[s("div",{staticClass:"icon-prev"},[s("i",{on:{click:t.prev}})])]),t._v(" "),s("div",{staticClass:"play"},[s("div",{staticClass:"icon-play"},[s("i",{class:[t.isPlaying?"pause-icon":"play-icon"],on:{click:t.play}})])]),t._v(" "),s("div",{staticClass:"next"},[s("div",{staticClass:"icon-next"},[s("i",{on:{click:t.next}})])])])])},staticRenderFns:[]}}]),[69]);
//# sourceMappingURL=app.dd09da1d4061140aeceb.js.map