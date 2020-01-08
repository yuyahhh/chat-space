$(function(){ 
  function buildHTML(message){
    if ( message.image ) {
      var html =
        `<div class="chat-main__messages__message" data-message-id=${message.id}>
          <div class="chat-main__messages__message__upper-info">
            <div class="chat-main__messages__message__upper-info__name">
              ${message.user_name}
            </div>
            <div class="chat-main__messages__message__upper-info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__messages__message__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
       </div>`
      return html;
    } else {
      var html =
        `<div class="chat-main__messages__message" data-message-id=${message.id}>
          <div class="chat-main__messages__message__upper-info">
            <div class="chat-main__messages__message__upper-info__name">
              ${message.user_name}
            </div>
            <div class="chat-main__messages__message__upper-info__date">
             ${message.created_at}
            </div>
          </div>
          <div class="chat-main__messages__message__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>`
     return html;
    };
  }
$('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
   .done(function(data){
     var html = buildHTML(data);
     $('.chat-main__messages').append(html);
     $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
     $('form')[0].reset();
     $('.chat-main__form__new-message__submit-btn').prop('disabled', false);
   })
   .fail(function() {
    alert("メッセージ送信に失敗しました");
   });
})
});