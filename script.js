var fetch = function () {
  $.ajax({
    method: "GET",
    url: 'https://www.googleapis.com/books/v1/volumes?q='+$('#input').val(),
    dataType: "json",
    success: function(data) {
      debugger;
      var title = data.items[0].volumeInfo.title;
      var desc = data.items[0].volumeInfo.description;
      var auth = data.items[0].volumeInfo.authors[0];
      var img= data.items[0].volumeInfo.imageLinks.thumbnail;
      display(title, desc, auth, img);
      console.log(data);
    },//success
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });//ajax
};//fetch
var display = function(title, desc, auth, img){
  var res={
    title: title,
    description: desc,
    author: auth,
    image: img
  }//res
  var src= $('#results-template').html();
  var template = Handlebars.compile(src);
  var newHtml = template(res);
  $('.print').append(newHtml);
}//dispaly
