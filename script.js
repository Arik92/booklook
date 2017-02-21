var fetch = function () {
  $.ajax({
    method: "GET",
    url: makeUrl(),
    dataType: "json",
    success: function(data) {
      $('.print').empty();
      for (var i = 0;i < 9;i++){
      var title = data.items[i].volumeInfo.title;
      var desc = data.items[i].volumeInfo.description;
      var auth = data.items[i].volumeInfo.authors[0];
      var img= data.items[i].volumeInfo.imageLinks.thumbnail;
      display(title, desc, auth, img);
      console.log(data);
    }//for
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
$(document).on('click','h1',function(){
  debugger;
  var title= $(this).text();
  $.ajax({
    method: "GET",
    url: 'https://www.googleapis.com/books/v1/volumes?q=intitle:'+title,
    dataType: "json",
    success: function(data) {
      $('.print').empty();
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
})//fetch2
var makeUrl = function(){
  var input=$("#isbn").val();
  if (isNaN(input)){
  var url= 'https://www.googleapis.com/books/v1/volumes?q=intitle:';
  }// title search
  else {
    var url= 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
  }//isbn search
  url+=input;
  $('#isbn').val("");
  return url;
}
