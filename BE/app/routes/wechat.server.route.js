var wechat = require('wechat');



module.exports = function(app){
  // 微信
  app.use('/wechat',wechat('carryflyer',function(req,res,next){
      var message = req.weixin;
      // message is located in req.weixin
        var message = req.weixin;
        console.log('message:',message);
        if (message.FromUserName === 'obxz5wgLdshB_o7vxtLz8mKvZGrU' && MsgType === 'text') {
          // reply with text
          if(message.Content === "hahah")
              
          res.reply('hehe');
        } else if (message.FromUserName === 'text') {
          // another way to reply with text
          res.reply({
            content: 'text object',
            type: 'text'
          });
        } else if (message.FromUserName === 'hehe') {
          // reply with music
          res.reply({
            type: "music",
            content: {
              title: "Just some music",
              description: "I have nothing to lose",
              musicUrl: "http://mp3.com/xx.mp3",
              hqMusicUrl: "http://mp3.com/xx.mp3"
            }
          });
        } else {
          // reply with thumbnails posts
          res.reply([
            {
              title: 'Come to fetch me',
              description: 'or you want to play in another way ?',
              picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
              url: 'http://nodeapi.cloudfoundry.com/'
            }
          ]);
        }
  }));
}
