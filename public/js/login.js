$('form').on('submit', function(e) {
  e.preventDefault();
  var data = {
    email: $('input').val()
  };
  $.ajax({
    type: 'POST',
    url: '/ggmail',
    data: JSON.stringify(data),
    contentType: 'application/json; charset=UTF-8',
    dataType: 'json',
    success: function(res){
      console.log(res.url, window.location.pathname);
      window.location.pathname = res.url;
    },
    error: function(jqXHR, textStatus, errorThrown ){
      console.log({msg: errorThrown});
    }
  })
});
