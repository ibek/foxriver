!function(t){"use strict";t.FacebookPageFeed=function(t){var e={};e.config={appid:null,pagename:null,token:null,feedlimit:10,format:"json",dateFormat:function(t){return t},likesFormat:function(t){return t},template:function(t,e){return"<div>"+e.message+" - "+(e.likes?e.likes.data.length:"0")+"</div>"},onLoad:function(t){console.log(t)}};var n={};return n.extend=function(){var t={},e=!1,n=0,o=arguments.length;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(e=arguments[0],n++);for(var a=function(n){for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e&&"[object Object]"===Object.prototype.toString.call(n[o])?t[o]=extend(!0,t[o],n[o]):t[o]=n[o])};n<o;n++){a(arguments[n])}return t},e.config=n.extend(e.config,t),t=null,n.fbIsInit=!1,n.queue=[],n.urlify=function(t){return(t=t||"").replace(/(https?:\/\/[^\s]+)/g,function(t){return'<a href="'+t+'" target="_blank">'+t+"</a>"})},n.formatResponse={},n.formatResponse.json=function(t,e){var n={};return n.page={name:t.name,likes:e.dateFormat(t.fan_count),link:t.link,avatar:t.picture.data.url},n.posts=t.posts.data,n},n.formatResponse.html=function(t,e){t=n.formatResponse.json(t,e);var o="";for(var a in t.posts)t.posts[a].message=n.urlify(t.posts[a].message),t.posts[a].likes=e.likesFormat(t.posts[a].likes?t.posts[a].likes.summary.total_count:0),o+=e.template(t.page,t.posts[a]);return o},n.callFB=function(t){FB.api("/"+t.pagename,{access_token:t.token,summary:!0,fields:"picture{url},name,cover,fan_count,link,posts.limit("+t.feedlimit+"){attachments, likes.limit(0).summary(true), message, created_time, link}"},function(e){e.error?t.onLoad(e.error,"json"):t.onLoad(n.formatResponse[t.format](e,t),t.format,e)})},window.fbAsyncInit=function(){FB.init({appId:e.config.appid,xfbml:!0,version:"v2.6"}),n.fbIsInit=!0;for(var t in n.queue)n.loadData(n.queue[t])},n.loadData=function(t){n.callFB(t)},e.get=function(t){t=t||{},t=n.extend(e.config,t),n.fbIsInit?n.loadData(t):n.queue.push(t)},e}}(this);