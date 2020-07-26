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
  $('.Chat-main__message-form__form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      let html = buildMessage(message)
      $('.Chat-main__message-list').append(html)
      $('.Chat-main__message-list').animate({scrollTop: $('.Chat-main__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.Chat-main__message-form__form__send-btn').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.Form__submit').prop("disabled", false);
    });
  })
});
