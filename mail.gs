function fetchMailbox() 
{
  
  // 取得間隔
  var get_interval = 5;
  
  // 取得間隔
  var now_time = Math.floor(new Date().getTime() / 1000);
  var time_term = now_time - ((60 * get_interval) + 3);
  
  // 検索条件（時間）
  var strTerms = 'is:unread after:' + time_term + ')';
  
  // 取得
  var myThreads = GmailApp.search(strTerms);
  var myMails = GmailApp.getMessagesForThreads(myThreads);
  
  // メッセージテキストを作成
  for (var i = 0; i < myMails.length; i++)
  {
    
    var mail = myMails[i].slice(-1)[0];
    
    var date = 
        mail.getDate().getMonth() + "/" +
        mail.getDate().getDate() + " " +
        mail.getDate().getHours() + ":" +
        mail.getDate().getMinutes();
    var from =
        mail.getFrom() + "からのメールです。";
    var subtitle = 
        "件名: " + mail.getSubject();
    var plainBodybuf = mail.getPlainBody();
    var plainBody = "";
    if (plainBodybuf.length > 18)
    {
      plainBody = plainBodybuf.substr(0, 17) + "...";
    }else
    {
      plainBody = plainBody;
    }
    
    var link = "https://mail.google.com/mail/#inbox/" + mail.getId();
    var message = 
      date + "\n" +
      from + "\n\n" +
      subtitle + "\n" +
      plainBody + "\n" +
      link;
    
    broadcast(message);  
    
  }
}
