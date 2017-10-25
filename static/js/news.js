var elResult = $('#result'),
    urlToJson = function(url) {
    var hash;
    var myJson = {};
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        myJson[hash[0]] = hash[1];
    }
    return myJson;
}

var fbFeed = new FacebookPageFeed({
    appid : '426407340854185',
    token : '426407340854185|1VWJq1dpLbDNBN-VCoKsekzl0g8',
    pagename : 'chsfoxriver',
    format: 'html',
    feedlimit : 5,
    template: function(page, post){

      var postBody = '';
      postBody = '{{text}}{{cover}}';
      if(post.attachments && post.attachments.data[0].media && post.attachments.data[0].media.image.src){
        postBody = postBody.replace("{{cover}}", '<img src="'+post.attachments.data[0].media.image.src+'" class="img-responsive">');
      } else {
        postBody = postBody.replace("{{cover}}", '');
      }
      postBody = postBody.replace("{{text}}", '<p class="card-text">'+post.message+'</p>');
      
      var date = new Date(post.created_time);
      
      var monthNames = [
        "leden", "únor", "březen",
        "duben", "květen", "červen", "červenec",
        "srpen", "září", "říjen",
        "listopad", "prosinec"
      ];

      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();

      var createdTime = day + ' ' + monthNames[monthIndex] + ' ' + year;

      var tpl = '\
        <div class="card card-block">\
          <div class="panel-heading"">\
            '+createdTime+'\
          </div>\
          <div class="panel-body">'+postBody+'</div>\
        </div>';

      return tpl;
    },
    onLoad: function(res, format, data){
      if(data && data.cover){
        $('.jumbotron').css({'background-image' : 'url(\''+data.cover.source+'\')'});
      } else {
        $('.jumbotron').css({'background-image' : ''});
      }
      if(format == 'html'){
        elResult.html('<div class="card-columns">'+res+'</div>');
      } else {
        elResult.html('<pre>'+JSON.stringify(res, null, 2)+'</pre>');
      }
    }
});
fbFeed.get();

// fbFeed.get();
