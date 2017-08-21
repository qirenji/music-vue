webpackJsonp([1],Array(45).concat([function(t,i,s){"use strict";var o=s(23),n=s(135),e=s(124),a=s.n(e),c=s(121),r=s.n(c),u=s(126),l=s.n(u);o.a.use(n.a),i.a=new n.a({routes:[{path:"/",name:"／",component:a.a},{path:"/music-list",name:"MusicList",component:a.a},{path:"/find",name:"Find",component:r.a},{path:"/social",name:"Social",component:l.a}]})},,,,function(t,i,s){function o(t){s(115)}var n=s(3)(s(68),s(132),o,null,null);t.exports=n.exports},,,,,,,,,,,,,,,,,,,function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var o=s(123),n=s.n(o),e=s(122),a=s.n(e),c=s(125),r=s.n(c),u=s(120),l=s.n(u);i.default={name:"app",data:function(){return{}},components:{VHeader:n.a,VFooter:a.a,Play:r.a,About:l.a},beforeCreate:function(){this.$store.dispatch("getData")},mounted:function(){var t=this;this.$store.commit("findDOM",{name:"audio",dom:this.$refs.audio}),this.$refs.audio.addEventListener("ended",function(){t.next()}),this.$refs.audio.addEventListener("error",function(){t.next()})},computed:{audio:function(){return this.$store.state.audio},musicData:function(){return this.$store.state.musicData},isPlaying:function(){return this.$store.state.isPlaying},isShowIndex:function(){return this.$store.state.isShowIndex},isShowAbout:function(){return this.$store.state.isShowAbout}},methods:{next:function(){this.audio.index=this.audio.index===this.musicData.length-1?0:++this.audio.index,this.$store.commit("toggleMusic",this.audio.index)}}}},function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default={name:"about",data:function(){return{isHover:!1}},methods:{showAbout:function(){this.$store.commit("showAbout",!1)}}}},function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var o=s(14),n=s.n(o);i.default={name:"find",data:function(){return{keywords:"",isShowHot:!0,isShowHistory:!1,hotKeywords:[],playIndex:"",isLoading:!1,musicList:[],searchHistory:localStorage.searchHistory&&JSON.parse(localStorage.searchHistory)||[]}},computed:{musicData:function(){return this.$store.state.musicData}},watch:{searchHistory:{handler:function(t){localStorage.searchHistory=n()(t)},deep:!0},musicData:{handler:function(t,i){localStorage.musics=n()(t)},deep:!0}},beforeCreate:function(){this.$store.commit("showMiniMusic",!0)},created:function(){var t=this;this.axios.get("/api/hot").then(function(i){t.hotKeywords=i.data})},methods:{inputFocus:function(){this.keywords.trim()||(this.isShowHot=!1,this.isShowHistory=!0,this.musicList=[])},cancel:function(){this.isShowHot=!0,this.keywords=""},toSearch:function(t){var i=this;t.trim()&&(this.isShowHistory=!1,this.isShowHot=!1,this.playIndex=null,this.isLoading=!0,this.$store.commit("showMiniMusic",!1),this.keywords=t,this.axios.get("/api/search/100/"+t).then(function(t){return t.data.data.song}).then(function(s){i.musicList=s.list,i.isLoading=!1,i.searchHistory.unshift(t)}))},playMusic:function(t,i,s,o){s="http://ws.stream.qqmusic.qq.com/"+s+".m4a?fromtag=46",console.log({name:i,src:s,imgSrc:o}),console.log({name:i,src:s,musicImgSrc:o}),this.$store.commit("playMusic",{name:i,src:s,imgSrc:o}),this.$store.commit("addMusic",{name:i,src:s,musicImgSrc:o}),this.$store.commit("showMiniMusic",!0),this.playIndex=t},strDecode:function(t){return t.replace(/&#(x)?([^&]{1,5});?/g,function(t,i,s){return String.fromCharCode(parseInt(s,i?16:10))})}},mounted:function(){this.$store.commit("changeLinkBorderIndex",2)}}},function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default={data:function(){return{nativeAudio:{},currentTime:0,totalTime:0}},computed:{audio:function(){return this.$store.state.audio},musicData:function(){return this.$store.state.musicData},isPlaying:function(){return this.$store.state.isPlaying},DOM:function(){return this.$store.state.DOM},isShowMiniMusic:function(){return this.$store.state.isShowMiniMusic},skinColor:function(){return this.$store.state.skinColor},isShowAsideMenu:function(){return this.$store.state.isShowAsideMenu}},mounted:function(){var t=this;this.nativeAudio=document.querySelector("audio"),this.nativeAudio.addEventListener("play",function(){t.totalTime=t.nativeAudio.duration,t.currentTime=t.nativeAudio.currentTime,setInterval(function(){t.currentTime=t.nativeAudio.currentTime},1e3)})},methods:{transformTime:function(t){var i=void 0,s=void 0;return i=Math.floor(t/60),i=1==i.toString().length?"0"+i:i,s=Math.floor(t-60*i),s=1==s.toString().length?"0"+s:s,i+":"+s},play:function(){this.$store.commit("play",!this.isPlaying),this.isPlaying?this.DOM.audio.play():this.DOM.audio.pause()},changeTime:function(t){var i=this.$refs.progressBar,s=i.getBoundingClientRect().left,o=t.pageX;this.nativeAudio.currentTime=(o-s)/i.offsetWidth*this.nativeAudio.duration,this.currentTime=this.nativeAudio.currentTime,this.nativeAudio.play(),this.$store.commit("play",!0)},touchMove:function(t){var i=this.$refs.progressBar,s=i.getBoundingClientRect().left,o=t.touches[0].pageX;this.$refs.now.style.width=100*((o-s)/progressbar.offsetWidth).toFixed(3)+"%"},touchEnd:function(t){thi.nativeAudio.currentTime=this.$refs.now.style.width.replace("%","")/100*this.nativeAudio.duration,this.currentTime=this.nativeAudio.currentTime,this.nativeAudio.play(),this.$store.commit("play",!0)},showPlay:function(){this.isshowAsideMenu||(this.$store.commit("showIndex",!1),this.$store.commit("showMiniMusic",!1))}}}},function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default={name:"header",data:function(){return{}},computed:{linkBorderIndex:function(){return this.$store.state.linkBorderIndex},skinColor:function(){return this.$store.state.skinColor}},methods:{toSearch:function(){this.$router.push("/find")}}}},function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var o=s(14),n=s.n(o);i.default={name:"MusicList",computed:{musicData:function(){return this.$store.state.musicData},DOM:function(){return this.$store.state.DOM},isPlaying:function(){return this.$store.state.isPlaying}},beforeCreate:function(){this.$store.commit("showMiniMusic",!0)},mounted:function(){this.$store.commit("changeLinkBorderIndex",1)},methods:{toggleMusic:function(t){this.$store.state.audio.index===t?(this.DOM.audio.paused?this.DOM.audio.play():this.DOM.audio.pause(),this.$store.commit("play",!this.isPlaying)):(this.DOM.audio.play(),this.$store.commit("play",!0)),this.$store.commit("toggleMusic",t)},del:function(t){this.$store.commit("del",t)}},watch:{musicData:{handler:function(t,i){localStorage.musics=n()(t)},deep:!0}}}},function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default={name:"play",data:function(){return{isShowMusicList:!1,isShowSkinColors:!1,currentTime:0,totalTime:0,nativeAudio:{}}},computed:{skinColor:function(){return this.$store.state.skinColor},audio:function(){return this.$store.state.audio},musicData:function(){return this.$store.state.musicData},isPlaying:function(){return this.$store.state.isPlaying},DOM:function(){return this.$store.state.DOM}},methods:{back:function(){this.$store.commit("showIndex",!0),this.$store.commit("showMiniMusic",!0),this.isShowSkinColors=!1,this.isShowMusicList=!1},toggleMusic:function(t){var i=this;this.$store.commit("toggleMusic",t),this.$store.commit("play",!0),setTimeout(function(){i.isShowMusicList=!1},100)},transformTime:function(t){var i=void 0,s=void 0;return i=Math.floor(t/60),i=1==i.toString().length?"0"+i:i,s=Math.floor(t-60*i),s=1==s.toString().length?"0"+s:s,i+":"+s},changeTime:function(t){var i=this.$refs.progressBar,s=i.getBoundingClientRect().left,o=t.pageX;this.nativeAudio.currentTime=(o-s)/i.offsetWidth*this.nativeAudio.duration,this.currentTime=this.nativeAudio.currentTime,this.nativeAudio.play(),this.$store.commit("play",!0)},touchMove:function(t){var i=this.$refs.progressBar,s=i.getBoundingClientRect().left,o=t.touches[0].pageX;this.$refs.now.style.width=100*((o-s)/i.offsetWidth).toFixed(3)+"%"},touchEnd:function(t){this.nativeAudio.currentTime=this.$refs.now.style.width.replace("%","")/100*this.nativeAudio.duration,this.currentTime=this.nativeAudio.currentTime,this.nativeAudio.play(),this.$store.commit("play",!0)},changeSkinColor:function(t){this.$store.commit("changeSkinColor",t),this.isShowSkinColors=!1},showSkinColor:function(){this.isShowSkinColors=!this.isShowSkinColors},prev:function(){this.audio.index=0===this.audio.index?this.musicData.length-1:--this.audio.index,this.$store.commit("toggleMusic",this.audio.index)},play:function(){this.$store.commit("play",!this.isPlaying),this.isPlaying?this.DOM.audio.play():this.DOM.audio.pause()},next:function(){this.audio.index=this.audio.index===this.musicData.length-1?0:++this.audio.index,this.$store.commit("toggleMusic",this.audio.index)}},mounted:function(){var t=this;this.nativeAudio=document.querySelector("audio"),this.nativeAudio.addEventListener("play",function(){t.totalTime=t.nativeAudio.duration,t.currentTime=t.nativeAudio.currentTime,setInterval(function(){t.currentTime=t.nativeAudio.currentTime},1e3),t.currentTime=t.nativeAudio.currentTime})},watch:{skinColor:function(t){localStorage.skinColor=t}}}},function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default={name:"social",data:function(){return{isSignIn:!1}},mounted:function(){this.$store.commit("changeLinkBorderIndex",3),this.$store.commit("showMiniMusic",!1)},methods:{showAbout:function(){return this.$store.commit("showAbout",!0)}}}},function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var o=s(47),n=s.n(o),e=s(14),a=s.n(e),c=s(46),r=s.n(c),u=s(23),l=s(49),d=s.n(l),h=s(45),m=s(44),v=s.n(m),f=s(48),p=s.n(f),g=s(50);u.a.config.productionTip=!1,u.a.use(p.a,v.a),u.a.use(g.a);var _=new g.a.Store({state:{musicData:[],skinColor:localStorage.skinColor||"#B72712",linkBorderIndex:"",DOM:{},isPlaying:!1,isShowMiniMusic:!0,isShowIndex:!0,isShowAbout:!1,audio:{name:"",src:"",musicImgSrc:"",index:0}},mutations:{changeLinkBorderIndex:function(t,i){t.linkBorderIndex=i},findDOM:function(t,i){t.DOM[i.name]=i.dom},toggleMusic:function(t,i){t.audio.name=t.musicData[i].name,t.audio.src=t.musicData[i].src,t.audio.musicImgSrc=t.musicData[i].musicImgSrc,t.audio.index=i},addMusic:function(t,i){var s=!0,o=!1,n=void 0;try{for(var e,c=r()(t.musicData);!(s=(e=c.next()).done);s=!0){var u=e.value;if(a()(u)===a()(i))return}}catch(t){o=!0,n=t}finally{try{!s&&c.return&&c.return()}finally{if(o)throw n}}t.musicData.unshift(i)},playMusic:function(t,i){t.audio.name=i.name,t.audio.src=i.src,t.audio.musicImgSrc=i.imgSrc,t.isPlaying=!0},play:function(t,i){t.isPlaying=i},del:function(t,i){0!==t.musicData.length&&t.musicData.splice(i,1)},showMiniMusic:function(t,i){t.isShowMiniMusic=i},showIndex:function(t,i){t.isShowIndex=i},changeSkinColor:function(t,i){t.skinColor=i},showAbout:function(t,i){t.isShowAbout=i}},actions:{getData:function(t){var i=t.commit,s=t.state;return"[]"!==localStorage.musics&&localStorage.musics?void(s.musicData=JSON.parse(localStorage.musics)):new n.a(function(t,o){u.a.axios.get("/api/music-data").then(function(t){0===t.data.errno&&(s.musicData=t.data.musicData,localStorage.musics=a()(s.musicData))}).then(function(){i("toggleMusic",0)}),t()})}}});new u.a({el:"#app",store:_,router:h.a,template:"<App/>",components:{App:d.a}})},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,i){},function(t,i){},function(t,i){},function(t,i){},function(t,i){},function(t,i){},function(t,i){},function(t,i){},,,function(t,i,s){function o(t){s(116)}var n=s(3)(s(69),s(133),o,"data-v-e3f75c08",null);t.exports=n.exports},function(t,i,s){function o(t){s(111)}var n=s(3)(s(70),s(128),o,"data-v-115b2000",null);t.exports=n.exports},function(t,i,s){function o(t){s(110)}var n=s(3)(s(71),s(127),o,"data-v-0ecb0880",null);t.exports=n.exports},function(t,i,s){function o(t){s(113)}var n=s(3)(s(72),s(130),o,"data-v-38dcf100",null);t.exports=n.exports},function(t,i,s){function o(t){s(112)}var n=s(3)(s(73),s(129),o,"data-v-1e628c30",null);t.exports=n.exports},function(t,i,s){function o(t){s(117)}var n=s(3)(s(74),s(134),o,"data-v-e7223640",null);t.exports=n.exports},function(t,i,s){function o(t){s(114)}var n=s(3)(s(75),s(131),o,"data-v-7a544b80",null);t.exports=n.exports},function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("transition",{attrs:{name:"fade"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowMiniMusic,expression:"isShowMiniMusic"}],staticClass:"footer",style:{backgroundColor:t.skinColor}},[s("div",{staticClass:"mini-music"},[s("div",{staticClass:"music-img"},[s("img",{attrs:{src:t.audio.musicImgSrc||t.musicData[0]&&t.musicData[0].musicImgSrc},on:{click:t.showPlay}})]),t._v(" "),s("div",{staticClass:"music-name"},[s("p",{on:{click:t.showPlay}},[t._v(t._s(t.audio.name||t.musicData[0]&&t.musicData[0].name))]),t._v(" "),s("div",{staticClass:"progress"},[s("span",{staticClass:"start"},[t._v(t._s(t.transformTime(t.currentTime)))]),t._v(" "),s("div",{ref:"progressBar",staticClass:"progress-bar",on:{click:function(i){t.changeTime(i)},touchmove:function(i){t.touchMove(i)},touchend:function(i){t.touchEnd(i)}}},[s("div",{ref:"now",staticClass:"now",style:{width:100*(t.currentTime/t.totalTime).toFixed(3)+"%"}})]),t._v(" "),s("span",{staticClass:"end"},[t._v(t._s(t.transformTime(t.totalTime)))])])]),t._v(" "),s("div",{staticClass:"music-control"},[s("i",{class:[t.isPlaying?"pause-icon":"play-icon"],on:{click:function(i){t.play()}}})])])])])},staticRenderFns:[]}},function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("transition",{attrs:{name:"showRouter"}},[s("div",{staticClass:"find"},[s("div",{staticClass:"search-input"},[s("div",{staticClass:"input"},[s("i",{staticClass:"icon-search"}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.keywords,expression:"keywords"}],class:{"input-focus":!t.isShowHot},attrs:{type:"text",placeholder:"搜索歌曲"},domProps:{value:t.keywords},on:{keyup:function(i){if(!("button"in i)&&t._k(i.keyCode,"enter",13))return null;t.toSearch(t.keywords)},focus:t.inputFocus,input:function(i){i.target.composing||(t.keywords=i.target.value)}}}),t._v(" "),s("i",{directives:[{name:"show",rawName:"v-show",value:""!==t.keywords&&!t.isShowHot,expression:"keywords !==''&&!isShowHot"}],staticClass:"icon-cancel",on:{click:function(i){t.keywords=""}}}),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!t.isShowHot,expression:"!isShowHot"}],staticClass:"cancel-btn",on:{click:function(i){t.cancel()}}},[t._v("取消")])])]),t._v(" "),t.isShowHot?s("div",{staticClass:"hot"},[s("div",{staticClass:"keywords"},t._l(t.hotKeywords,function(i){return s("div",{staticClass:"keyword",on:{click:function(s){t.toSearch(i)}}},[t._v(t._s(i))])}))]):s("div",{staticClass:"search-list",on:{touchmove:function(i){t.$store.commit("showMiniMusic",!1)}}},[t._l(t.searchHistory,function(i,o){return s("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowHistory,expression:"isShowHistory"}],staticClass:"history"},[s("div",{staticClass:"icon"},[s("i",{staticClass:"icon-history"})]),t._v(" "),s("div",{staticClass:"word",on:{click:function(s){t.toSearch(i)}}},[t._v(t._s(i))]),t._v(" "),s("div",{staticClass:"icon"},[s("i",{staticClass:"icon-del",on:{click:function(i){t.searchHistory.splice(o,1)}}})])])}),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowHistory&&t.searchHistory.length,expression:"isShowHistory&&searchHistory.length"}],staticClass:"tips",on:{click:function(i){t.searchHistory=[]}}},[t._v("清除搜索记录")]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.isLoading,expression:"isLoading"}],staticClass:"loading"},[s("i",{staticClass:"icon-loading"}),t._v("搜索中...")]),t._v(" "),t._l(t.musicList,function(i,o){return s("div",{staticClass:"music",on:{click:function(s){t.playMusic(o,(i.f.split("|")[3]&&t.strDecode(i.f.split("|")[3].replace(/amp\;/g,"")).replace(/\;/g,"/")||"佚名")+" - "+t.strDecode(i.fsong),i.f.split("|")[0],i.f.split("|")[4]&&"http://imgcache.qq.com/music/photo/album_300/"+i.f.split("|")[4]%100+"/300_albumpic_"+i.f.split("|")[4]+"_0.jpg")}}},[s("div",{staticClass:"icon-music"},[s("img",{attrs:{src:i.f.split("|")[4]&&"http://imgcache.qq.com/music/photo/album_300/"+i.f.split("|")[4]%100+"/300_albumpic_"+i.f.split("|")[4]+"_0.jpg",alt:"microzz.com"}})]),t._v(" "),s("div",{staticClass:"music-info"},[s("div",{staticClass:"music-name"},[t._v(t._s(t.strDecode(i.fsong)))]),t._v(" "),s("div",{staticClass:"music-singer"},[t._v(t._s(i.f.split("|")[3]&&t.strDecode(i.f.split("|")[3].replace(/amp\;/g,"")).replace(/\;/g,"/")||"佚名"))]),t._v(" "),s("i",{directives:[{name:"show",rawName:"v-show",value:o===t.playIndex,expression:"index === playIndex"}],staticClass:"icon-listening"})])])}),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.musicList.length,expression:"musicList.length"}],staticClass:"tips"},[t._v("没有更多结果了～")])],2)])])},staticRenderFns:[]}},function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("transition",{attrs:{name:"showRouter"}},[s("div",{staticClass:"musiclist"},[t._l(t.musicData,function(i,o){return s("div",{staticClass:"music-item"},[s("img",{staticClass:"music-img",attrs:{src:i.musicImgSrc}}),t._v(" "),s("span",{staticClass:"music-name",on:{click:function(i){t.toggleMusic(o)}}},[t._v(t._s(o+1+". "+i.name))]),t._v(" "),s("span",{staticClass:"del-icon",on:{click:function(i){t.del(o)}}})])}),t._v(" "),s("div",{staticClass:"tips"},[t._v("没有更多歌曲了～")])],2)])},staticRenderFns:[]}},function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"header",style:{backgroundColor:t.skinColor}},[s("div",{staticClass:"name"},[s("span",{staticClass:"aside-menu",on:{click:function(i){i.stopPropagation(),i.preventDefault(),t.$store.commit("showIndex",!1)}}},[s("i",{staticClass:"menu-icon"})]),t._v(" "),s("p",{staticClass:"title"},[t._v("网易云音乐")]),t._v(" "),s("span",{staticClass:"search",on:{click:t.toSearch}},[s("i",{staticClass:"search-icon"})])]),t._v(" "),s("div",{staticClass:"tab"},[s("div",{staticClass:"item",class:{link:1==t.linkBorderIndex}},[s("router-link",{attrs:{to:"/music-list"}},[t._v("我的音乐")])],1),t._v(" "),s("div",{staticClass:"item",class:{link:2==t.linkBorderIndex}},[s("router-link",{attrs:{to:"/find"}},[t._v("发现音乐")])],1),t._v(" "),s("div",{staticClass:"item",class:{link:3==t.linkBorderIndex}},[s("router-link",{attrs:{to:"/social"}},[t._v("账号")])],1)])])},staticRenderFns:[]}},function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("transition",{attrs:{name:"showRouter"}},[s("div",{staticClass:"social"},[s("div",{staticClass:"info"},[s("a",{staticClass:"avatar",attrs:{href:"http://www.qirenji.info",target:"_blank"}},[s("img",{attrs:{src:"http://www.qirenji.info/img/avatar.jpg",alt:""}})]),t._v(" "),s("div",{staticClass:"about"},[s("div",{staticClass:"name"},[s("a",{attrs:{href:"http://www.qirenji.info/img/avatar.jpg"}},[t._v("_流星达人_")])]),t._v(" "),s("span",{staticClass:"level"},[t._v("Lv.2")])]),t._v(" "),s("span",{staticClass:"sign",on:{click:function(i){t.isSignIn=!0}}},[t._v(t._s(t.isSignIn?"已签到":"签到"))])]),t._v(" "),s("div",{staticClass:"message"},[s("div",{staticClass:"trend set"},[t._v("动态"),s("span",[t._v("2")])]),t._v(" "),s("div",{staticClass:"fellow set"},[t._v("关注"),s("span",[t._v("10")])]),t._v(" "),s("div",{staticClass:"fan set"},[t._v("粉丝"),s("span",[t._v("8")])])]),t._v(" "),s("div",{staticClass:"settings"},[s("div",{staticClass:"content"},[s("ul",[s("li",[s("i",{staticClass:"icon-msg"}),s("a",{attrs:{href:"http://music.163.com/"}},[t._v("我的消息")])])]),t._v(" "),s("ul",[s("li",[s("i",{staticClass:"icon-vip"}),t._v("会员中心")]),t._v(" "),s("li",[s("i",{staticClass:"icon-shop"}),t._v("商城")]),t._v(" "),s("li",[s("i",{staticClass:"icon-music"}),t._v("在线听歌免流量")])]),t._v(" "),s("ul",[s("li",[s("i",{staticClass:"icon-friend"}),t._v("我的好友")]),t._v(" "),s("li",[s("i",{staticClass:"icon-near"}),t._v("附近的人")])]),t._v(" "),s("ul",[s("li",{on:{click:function(i){i.stopPropagation(),i.preventDefault(),t.$store.commit("showIndex",!1)}}},[s("i",{staticClass:"icon-skin"}),t._v("个性换肤")]),t._v(" "),s("li",{on:{click:function(i){i.stopPropagation(),i.preventDefault(),t.showAbout(i)}}},[s("i",{staticClass:"aboutme"}),t._v("关于")])]),t._v(" "),s("div",{staticClass:"back"},[s("i",{staticClass:"icon-back"})])])])])])},staticRenderFns:[]}},function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{attrs:{id:"app"}},[s("transition",{attrs:{name:"show"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowIndex,expression:"isShowIndex"}],staticClass:"index"},[s("VHeader"),t._v(" "),s("router-view"),t._v(" "),s("VFooter")],1)]),t._v(" "),s("transition",{attrs:{name:"showIndex"}},[s("Play",{directives:[{name:"show",rawName:"v-show",value:!t.isShowIndex,expression:"!isShowIndex"}]})],1),t._v(" "),s("audio",{ref:"audio",attrs:{src:t.audio.src||t.musicData[0]&&t.musicData[0].src,autoplay:t.isPlaying}}),t._v(" "),s("About",{directives:[{name:"show",rawName:"v-show",value:t.isShowAbout,expression:"isShowAbout"}]})],1)},staticRenderFns:[]}},function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("transition",{attrs:{name:"showAbout"}},[s("div",{staticClass:"about"},[s("i",{staticClass:"close",on:{click:t.showAbout}}),t._v(" "),s("div",{staticClass:"about-content"},[s("h1",[t._v("关于")]),t._v(" "),s("p",{staticClass:"skill"},[s("b",[t._v("技术栈")]),t._v("：")]),t._v(" "),s("div",[t._v("Vue2"),s("br"),t._v("Vuex"),s("br"),t._v("vue-router"),s("br"),t._v("axios"),s("br"),t._v("SASS(SCSS)"),s("br"),t._v("Express"),s("br"),t._v("Webpack"),s("br"),t._v("ES6"),s("br"),t._v("localStorage(HTML5)"),s("br"),t._v("CSS3")]),t._v(" "),s("p",{staticClass:"url"},[s("b",[t._v("源码地址")]),t._v("："),s("a",{class:{hover:t.isHover},attrs:{href:"https://github.com/qirenji/vue-music-player",target:"_blank"},on:{touchstart:function(i){t.isHover=!0},touchEnd:function(i){t.isHover=!1}}},[t._v("GitHub")])]),t._v(" "),s("p",{staticClass:"url"},[s("b",[t._v("个人网站")]),t._v("："),s("a",{class:{hover:t.isHover},attrs:{href:"http://www.qirenji.info/",target:"_blank"},on:{touchstart:function(i){t.isHover=!0},touchEnd:function(i){t.isHover=!1}}},[t._v("Qi Renji")])])]),t._v(" "),s("div",{staticClass:"mask",on:{click:t.showAbout}})])])},staticRenderFns:[]}},function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"play"},[s("div",{staticClass:"header",style:{backgroundColor:t.skinColor}},[s("div",{staticClass:"back"},[s("div",{staticClass:"icon-back"},[s("i",{on:{click:t.back}})])]),t._v(" "),s("div",{staticClass:"title",on:{click:function(i){t.isShowMusicList=!1}}},[s("div",{staticClass:"name"},[t._v(t._s(t.audio.name||t.musicData[0]&&t.musicData[0].name))])]),t._v(" "),s("div",{staticClass:"list"},[s("div",{staticClass:"icon-list"},[s("i",{on:{click:function(i){t.isShowMusicList=!t.isShowMusicList}}})])])]),t._v(" "),s("div",{staticClass:"content"},[s("transition",{attrs:{name:"fade"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowMusicList,expression:"isShowMusicList"}],staticClass:"music-list"},[s("ul",t._l(t.musicData,function(i,o){return s("li",{class:{activeColor:o===t.audio.index},on:{click:function(i){t.toggleMusic(o)}}},[t._v(t._s(o+1+". "+i.name))])}))])]),t._v(" "),s("img",{attrs:{src:t.audio.musicImgSrc||t.musicData[0]&&t.musicData[0].musicImgSrc,alt:""},on:{click:function(i){i.stopPropagation(),i.preventDefault(),t.isShowSkinColors=!1,t.isShowMusicList=!1}}}),t._v(" "),s("div",{staticClass:"img",on:{click:function(i){i.stopPropagation(),i.preventDefault(),t.isShowSkinColors=!1,t.isShowMusicList=!1}}},[s("img",{attrs:{src:t.audio.musicImgSrc||t.musicData[0]&&t.musicData[0].musicImgSrc,alt:""}})]),t._v(" "),s("div",{staticClass:"progress"},[s("span",{staticClass:"start-time"},[t._v(t._s(t.transformTime(t.currentTime)))]),t._v(" "),s("div",{ref:"progressBar",staticClass:"progress-bar",on:{click:function(i){t.changeTime(i)},touchmove:function(i){t.touchMove(i)},touchend:function(i){t.touchEnd(i)}}},[s("div",{ref:"now",staticClass:"now",style:{width:100*(t.currentTime/t.nativeAudio.duration).toFixed(3)+"%"}})]),t._v(" "),s("span",{staticClass:"end-time"},[t._v(t._s(t.transformTime(t.totalTime)))])]),t._v(" "),s("div",{staticClass:"skin"},[s("transition",{attrs:{name:"slide-fade"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowSkinColors,expression:"isShowSkinColors"}],staticClass:"skin-colors"},[s("i",{staticClass:"one",class:{selected:"#B72712"===t.skinColor},on:{click:function(i){t.changeSkinColor("#B72712")}}}),t._v(" "),s("i",{staticClass:"two",class:{selected:"#1565C0"===t.skinColor},on:{click:function(i){t.changeSkinColor("#1565C0")}}}),t._v(" "),s("i",{staticClass:"three",class:{selected:"#212121"===t.skinColor},on:{click:function(i){t.changeSkinColor("#212121")}}}),t._v(" "),s("i",{staticClass:"four",class:{selected:"#1B5E20"===t.skinColor},on:{click:function(i){t.changeSkinColor("#1B5E20")}}})])]),t._v(" "),s("div",{staticClass:"icon-skin",class:{"icon-skin-red":"#B72712"===t.skinColor,"icon-skin-blue":"#1565C0"===t.skinColor,"icon-skin-black":"#212121"===t.skinColor,"icon-skin-green":"#1B5E20"===t.skinColor},on:{click:t.showSkinColor}})],1)],1),t._v(" "),s("div",{staticClass:"footer",style:{backgroundColor:t.skinColor}},[s("div",{staticClass:"prev"},[s("div",{staticClass:"icon-prev"},[s("i",{on:{click:t.prev}})])]),t._v(" "),s("div",{staticClass:"play"},[s("div",{staticClass:"icon-play"},[s("i",{class:[t.isPlaying?"pause-icon":"play-icon"],on:{click:t.play}})])]),t._v(" "),s("div",{staticClass:"next"},[s("div",{staticClass:"icon-next"},[s("i",{on:{click:t.next}})])])])])},staticRenderFns:[]}}]),[76]);
//# sourceMappingURL=app.de1442f3040327397ed9.js.map