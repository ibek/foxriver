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
  appid: '863360897163596',
  token: 'EAAMRONZBWoUwBAIY7njWxeQvv7ZCLu4bm2paZAuI5h8mnpYP1FXvWj6WxW3ldajov7vN7woxYsA3ZAfyYSFKabPxEFwtz4KrWPiP8poSYZBTLDQ0ZBrQpQlAas6fV3qS8adM4wr0XZCdLZAv180dHsHZCYqU6E5VkLdIEZBGTNztGl2XsVDp8rySB3LTaPr5lZBWWZCZAlfX5FLZAZCPgZDZD',
  pagename: 'chsfoxriver',
  format: 'html',
  pageScreen: 0,
  pageScreenMax: 20,
  feedlimit: 5,
  template: function(page, post) {

    var postBody = '';
    postBody = '{{text}}{{cover}}';
    if (post.attachments && post.attachments.data[0].media && post.attachments
      .data[0].type == "photo" && post.attachments
      .data[0].media.image.src) {
      postBody = postBody.replace("{{cover}}",
        '<div class="text-center"><img src="' + post.attachments
        .data[0].media.image.src + '"></div>');
    } else if (post.attachments && post.attachments.data[0].subattachments) {
      var sadata = post.attachments.data[0].subattachments.data;
      text = "";
      for (var i = 0; i < sadata.length; i++) {
        text += '<div class="text-center"><img src="' + sadata[i].media.image
          .src + '"></div>';
      }
      postBody = postBody.replace("{{cover}}", text);
    } else {
      postBody = postBody.replace("{{cover}}", '');
    }
    var msg = post.message.replace(/\n/g, '<br/>');
    postBody = postBody.replace("{{text}}", '<p class="card-text">' +
      msg + '</p>');

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

    var createdTime = day + ' <span lang="cz">' + monthNames[monthIndex] +
      '</span> ' + year;

    var tpl =
      '\
        <div class="card card-block">\
          <div class="panel-heading"">\
            ' +
      createdTime +
      '\
          </div>\
          <div class="panel-body">' + postBody +
      '</div>\
        </div>';

    return tpl;
  },
  onLoad: function(res, format, data) {
    var prevNext = '<div class="posts-footer">';
    if (data && data.paging && data.paging.next) {
      prevNext +=
        '<div id="oldPosts"><a id="oldPostsLink" href="#" lang="cz">Starší</a></div>';
      var scope = this;
      scope.data = data;
      $(document).off('click', '#oldPostsLink');
      $(document).on('click', '#oldPostsLink', function() {
        scope.pageScreen += 1;
        $.getJSON(scope.data.paging.next, function(response) {
          var r2 = {};
          if (response.data && response.data.length > 0) {
            r2.posts = response.data;
            r2.posts.paging = response.paging;
            scope.onLoad(scope.formatResponse(r2, scope),
              scope.format, r2.posts);
          } else {
            scope.pageScreenMax = scope.pageScreen - 1;
            scope.pageScreen -= 1;
            setTimeout(scope.updatePageScreen.bind(scope), 100);
          }
        }.bind(this));
      }.bind(this));
    }
    if (data && data.paging && data.paging.previous) {
      prevNext +=
        '<div id="newPosts"><a id="newPostsLink" href="#" lang="cz">Nové</a></div>';
      var scope = this;
      scope.data = data;
      $(document).off('click', '#newPostsLink');
      $(document).on('click', '#newPostsLink', function() {
        scope.pageScreen -= 1;
        $.getJSON(scope.data.paging.previous, function(
          response) {
          var r2 = {};
          if (response.data && response.data.length > 0) {
            r2.posts = response.data;
            r2.posts.paging = response.paging;
            scope.onLoad(scope.formatResponse(r2, scope),
              scope.format, r2.posts);
          }
        }.bind(this));
      }.bind(this));
    }
    setTimeout(this.updatePageScreen.bind(this), 100);
    console.log(res);
    elResult.html('<div class="card-columns">' + res + '</div>' +
      prevNext + '</div>');
  },
  formatResponse: function(data, config) {
    var html = '';
    for (var i in data.posts) {
      if (data.posts[i].created_time) {
        data.posts[i].message = this.urlify(data.posts[i].message);
        data.posts[i].likes = config.likesFormat((data.posts[i].likes) ?
          data.posts[i].likes.summary.total_count : 0);
        html += config.template(data.page, data.posts[i]);
      }
    }
    return html;
  },
  urlify: function(text) {
    text = text || "";
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
      return '<a href="' + url + '" target="_blank">' + url +
        '</a>';
    });
  },
  updatePageScreen: function() {
    if (this.pageScreen == 0) {
      $('#newPosts').css("display", "none");
    } else {
      $('#newPosts').css("display", "block");
    }

    if (this.pageScreen == this.pageScreenMax) {
      $('#oldPosts').css("display", "none");
    } else {
      $('#oldPosts').css("display", "block");
    }
  }
});
fbFeed.get();

// fbFeed.get();
