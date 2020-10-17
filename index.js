
/* *'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'* *\
 *
 * モジュールのインポート
 *
\* *,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,* */

const server= require("express")();
const line = require("@line/bot-sdk");

// TODO: 作ったモジュールは勝手に入れといていいよ～

/* *'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'* *\
 *
 * パラメータ設定
 *
\* *,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,* */


const line_config =                                         // LINEのアクセストークン及びChannel Secret
{
    channelAccessToken: process.env.LINEBOT_ACCESSTOKEN,
    channelSecret:      process.env.LINEBOT_CHANNELSECRET
};

const bot = new line.Client(line_config);                   // APIコール用クライアントインスタンスを作成

/* *'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'* *\
 *
 * ウェブサーバー設定
 *
\* *,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,* */

server.listen(process.env.PORT || 3000);

/* *'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'*'* *\
 *
 * ルーター設定
 *
\* *,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,* */

server.post('/linebot/webhook', line.middleware(line_config), (req, res, next) =>
{

    // 先行してLINE側にステータスコード200でレスポンスを行う
    res.sendStatus(200);

    // すべてのイベント処理のプロミスを格納する配列
    let events_processed = [];

    // イベントオブジェクトを順次処理
    req.body.events.forEach((event) =>
    {

        if (event.type == "message" && event.message.type == "text")    // メッセージの送信を検知
        {

            // `event.message.text`が実際に入力されたテキストデータ

            // TODO: 入力データがあった場合の対応
            events_processed.push(bot.replyMessage(event.replyToken, {
                type: "text",
                text: "以下のリンクをタップ（クリック）してください。\n" +
                    "https://mail.google.com/mail/#search/" + event.message.text
            }));

        }

        else if (event.type == "follow")                                // フォローを検知
        {

            // TODO: ユーザーIDと紐づけされたメールアドレスが既に登録されているかどうかの確認
            let isRegisteredAddress = false;

            if (!isRegisteredAddress) {

                // TODO: メールアドレスの紐づけ作業
                // `event.source.userId`が登録したユーザーのID情報

                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "このボットは未完成品です。どうすればいいんだろうね。"
                }));

            }


        }

        else if (event.type == "unfollow")                              // フォロー解除を検知
        {

            // TODO: （余力あれば）ユーザーIDと紐づけされたメールアドレスの紐づけの解除

        }
    });

    // すべてのイベント処理が終了した時、処理されたイベントの個数を出力
    Promise.all(events_processed).then(
        (response) =>
        {
            console.log(`${response.length} events processed.`);
        }
    );

});
