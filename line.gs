var ACCESS_TOKEN = "+6DU7B9yWx2hg..."/* access token is hidding. */;
var URL_PUSH = "https://api.line.me/v2/bot/message/push";
var URL_REPLY = "https://api.line.me/v2/bot/message/reply";
var URL_BROADCAST = "https://api.line.me/v2/bot/message/broadcast";

// userIdで指定したユーザーにプッシュメッセージを送信
function push(message, userId)
{
  
  var headers = 
      {
        "Content-Type" : "application/json; charset=UTF-8",
        "Authorization" : "Bearer " + ACCESS_TOKEN
      };
  var post =
      {
        "to" : userId,
        "messages" : 
        [
          {
            "type" : "text",
            "text" : message
          }
        ]
      };
  var options = 
      {
        "method" : "POST",
        "headers" : headers,
        "payload" : JSON.stringify(post)
      };
  return UrlFetchApp.fetch(URL_PUSH, options);
  
}

// ブロードキャストメッセージでフォロワー全員にメッセージを送信
function broadcast(message)
{
  
  var headers = 
      {
        "Content-Type" : "application/json; charset=UTF-8",
        "Authorization" : "Bearer " + ACCESS_TOKEN
      };
  var post =
      {
        "messages" : 
        [
          {
            "type" : "text",
            "text" : message
          }
        ]
      };
  var options = 
      {
        "method" : "POST",
        "headers" : headers,
        "payload" : JSON.stringify(post)
      };
  return UrlFetchApp.fetch(URL_BROADCAST, options);  
}

// リプライメッセージを送信
function reply(replyToken, message)
{
  var headers = 
      {
        "Content-Type" : "application/json; charset=UTF-8",
        "Authorization" : "Bearer " + ACCESS_TOKEN
      };
  var message =
      {
        "type" : "text",
        "text" : message
      };
  var post = 
      {
        "replyToken" : replyToken,
        "messages" : message
      };
  var options = 
      {
        "method" : "POST",
        "headers" : headers,
        "payload" : JSON.stringify(post)
      };
      
  return UrlFetchApp.fetch(URL_REPLY, options);
}
