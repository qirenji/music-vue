var express = require('express');
var http = require('http');
var port = process.env.PORT || 18003;

var app = express();
var router = express.Router();

app.use(express.static('./dist'));

var data = require('./music-data.json');

router.get("/",function(req,res){
	res.render('index.html',{})
})

router.get('/music-data',(req, res) => {
  res.json({
    errno: 0,
    musicData: data.musicData
  });
});

router.get('/hot', (req, res) => {
  // 热门关键词
  let hotKeywords = ['张杰', '赵雷', '李健', '林志炫', '张碧晨', '梁博', '周笔畅', '张靓颖', '陈奕迅', '周杰伦', '王力宏', 'TFBoys', '李玉刚', '魏晨', '薛之谦'];
  let rHot = new Array(6);
  for(let i=0; i<rHot.length;i++){
    let length = hotKeywords.length;
    let random = Math.floor(length * Math.random());
    rHot[i] = hotKeywords[random];
    hotKeywords.splice(random,1);
  }
  res.json(rHot);
});

function search(url) {
    return new Promise((resolve, reject) => {
      let searchResult = '';
      // 参考至https://blog.csdn.net/jamin2018/article/details/79157213
      
      http.get(url, response => {
        response.on('data', data => {
          searchResult += data;
        });
        response.on('end', () => {
          resolve(searchResult);
        })
      })
    })
  }
http://songsearch.kugou.com/song_search_v2?callback=jQuery19107655316341116605_1497970603262&keyword=%E8%B5%B5%E9%9B%B7&page=1&pagesize=10&userid=-1&clientver=&platform=WebFilter&tag=em&filter=2&iscorrection=1&privilege_filter=0%EF%BC%9B
router.get('/search/:num/:keywords', (req, res) => {
  let keywords = req.params.keywords;
  let url = encodeURI('http://songsearch.kugou.com/song_search_v2?page=1&pagesize=10&userid=-1&clientver=&platform=WebFilter&tag=em&filter=2&iscorrection=1&privilege_filter=0&keywords='+ keywords);
  
  search(url)
    .then(searchResult => {
      console.log(searchResult);
      let result = JSON.parse(searchResult)
      res.json(result.data.lists);
    })

});

// 获取播放信息
router.get('/play/:hash/', (req, res) => {
  let hash = req.params.hash;
  // 获取歌曲信息
  let url = encodeURI('http://www.kugou.com/yy/index.php?r=play/getdata&hash='+ hash);
  
  search(url)
    .then(result => {
      res.json(JSON.parse(result));
    })
  
});

app.use('/api', router);


module.exports = app.listen(port, function (err) {
	if (err) {
		console.log(err);
		return
	}
	console.log('Listening at http://localhost:' + port + '\n')
});