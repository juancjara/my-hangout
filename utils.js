exports.searchElement = function(arr, searchTerm, property) {
  for(var i = 0, len = arr.length; i < len; i++) {
    if (arr[i][property] === searchTerm) return i;
  }
  return -1;
}

exports.api = (function() {
  var post = function(url, data, cb) {
    $.ajax({
      type: 'POST',
      url: url,
      data: JSON.stringify(data) || {},
      contentType: 'application/json; charset=UTF-8',
      dataType: 'json',
      success: function(res){
        cb(null, res);
      },
      error: function(jqXHR, textStatus, errorThrown ){
        cb({msg: errorThrown});
      }
    });
  };

  var urls = {
    'getPreviewImage': '/getPreview',
    'getMessages': '/getMessages'
  }

  return {
    consume: function(name, data, cb) {
      post(urls[name], data, cb);
    }
  }
})();