# LineMailbot
　GmailからLINEに転送するためのボットの残骸です。編集用のプライベートリポジトリを人力でクローンしているような状態なので不足があるかもしれません。</br>

## 何を作ろうとしたのか
　私たちはGmailで受信したメールの内容をLINEに転送するボットを製作しようと思いました。</br>
　この十年くらいで、今回対象としたLINEなどのコミュニケーションツールによってテキストチャットが日常的によく用いられるようになりました。しかし、**その一方で大学からのお知らせメールや行政から届くメールなど、メールが使われなくなったわけでもないのが実情です。**</br>
　そこで、私たちはGmailからLINEに転送するボットを作成することで、両方とも監視するのではなく、どちらか一方、今回はLINEだけで管理できるような状態を構築することを目指しました。

## 今回実装した機能、実装を見送った機能
* **メールの転送機能**（テキストだけ）
  * とりあえず実装。
* **メッセージの送信を用いたメールの検索機能**
  * URLを用いた方法で実装を試みたが、後述する問題点により実用的ではない代物となった。
* **公開の為の改造**（プッシュメッセージの使用、Google Apps Scriptのアドオン化など）
  * 未実装
  * 特に**「メールアドレスとLINEアカウントの紐づけ」**が難しく断念。チームとしてはそもそも実装する気がなかった。

## 問題点
* 受信したメールをLINEに転送するために**ブロードキャストメッセージ（一括送信）を使用している。**
  * フォローした人全員に同じメールが送信される（Aさんに届いたメールを、Aさんとは無関係だけどこのボットをフォローしたBさんCさんが読める状態）ので、安全性のかけらもない。
  * 今回成果物を公開できていない主な理由となっている。
* メールの内容によっては読みにくい。
  * 画像は一切使われず、文字だけで記述されるので長い、特にスマホだと読みにくい。とりあえず本文を30字前後にしてあとはURLでメールの本文に飛んでもらおうと思ったが、次項の問題もあるため対策としては微妙だった。
* スマホアプリにおいて、リンクを開く際にLINEブラウザが使用される。
  * 検索機能やGmailで使用するリンクがLINEブラウザ上でGmailにログインできないという理由で無効なものになってしまう。
  * 余談ではあるが、URLそのものはパソコン版LINEで動作確認済み。

## ファイルの紹介
* `index.js`
  * herokuで実装したLINEボットの本体です。herokuでのデプロイが`Packages`にないのは編集用のプライベートリポジトリでデプロイしたためです。
* `line.gs`
  * LINEボットにメッセージの送信を行う、Google Apps Script上で用いるコードです。
* `mail.gs`
  * メールの抽出及びメッセージの送信を指示する、Google Apps Script上で用いるコードです。時間でトリガーを指定して使用していました。
* `README.md`
  * このファイル。
  
## 感想
　今までWeb系のプログラムを書いたことがなかったから、新たな開拓をできたという意味で私はいい機会を手に入れたと思っている。</br>
　思ってはいるが、公開まで持って行けたならもっとよかっただろうと思うところが多い。今度からは大学での授業がない休暇期間のイベントに絞って参加したい。</br>
　また、今回、目的の半分としてあったチーム開発の経験が得られたかと言われるとそうではないので、もう一度チーム開発に必要なものを学びなおしたいと思った。

## 参考にした（したかったけど使う以前の問題にぶつかっていたモノも含む）Qiita記事一覧
　私自身の基礎知識のなさが鮮明に出ていると思います。Qiita以外を含めるとMessanger APIドキュメントなどがあるが、追いつけないのでとりあえず追跡可能なQiitaだけ。
* [LINEのBot開発 超入門（前編） ゼロから応答ができるまで](https://qiita.com/nkjm/items/38808bbc97d6927837cd)
* [LINEのBot開発 超入門（後編） メッセージの内容と文脈を意識した会話を実現する](https://qiita.com/nkjm/items/4de41988969e6f17adcb)
* [Google Apps ScriptでLINE BOTつくったら30分で動かせた件](https://qiita.com/hakshu/items/55c2584cf82718f47464)
* [Google Apps Scriptで、同一プロジェクト内で分割された.gsファイルの関数を使う方法](https://qiita.com/shirakiya/items/5e51e352faef6f7db9be)
* [GoogleAppsScriptでSQLっぽくDBを扱えるライブラリを作りました。](https://qiita.com/roana0229/items/fea931fcabc57f193620)
* [Google Apps Script で Gmail Add-on を作ってみよう](https://qiita.com/wezardnet/items/9d19ab6dcac7ccae00db)
