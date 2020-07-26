$(function(){
  function buildMessage(message){
    let html =
    `<div class="MessageBox" data-message-id=${message.id}>
      <div class="Chat-main__message-list__info">
        <div class="Chat-main__message-list__info__name">
          ${message.user_name}
        </div>
        <div class="Chat-main__message-list__info__date">
          ${message.created_at}
        </div>
      </div>
      <div class="Chat-main__message-list__text">
        ${message.content}`;
    if(message.image)
      html += `<img class="Message__image" src="${message.image}">`;
    html += `</div>`;
    html += `</div>`;
    return html
  }

  let reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    let last_message_id = $('.MessageBox:last').data("message-id") || 0;
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages){
      // 更新するメッセージがなかった場合は.doneの後の処理が動かないようにする
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        let insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildMessage(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.Chat-main__message-list').append(insertHTML);
        $('.Chat-main__message-list').animate({ scrollTop: $('.Chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});
