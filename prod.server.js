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

router.get('/search/:num/:name', (req, res) => {
  let num = req.params.num;
  let name = req.params.name;
  function search(n, keywords) {
    return new Promise((resolve, reject) => {
      let searchResult = '';
      // 参考至https://github.com/ccchangkong/article/issues/23
      let url = encodeURI('http://s.music.qq.com/fcgi-bin/music_search_new_platform?t=0&n='+ n +'&aggr=1&cr=1&loginUin=0&format=json&inCharset=GB2312&outCharset=utf-8&notice=0&platform=jqminiframe.json&needNewCode=0&p=1&catZhida=0&remoteplace=sizer.newclient.next_song&w='+ keywords);
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

  search(num, name)
    .then(searchResult => {
      res.json(JSON.parse(searchResult));
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