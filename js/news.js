var elResult=$("#result"),urlToJson=function(e){for(var t,a={},s=e.slice(e.indexOf("?")+1).split("&"),n=0;n<s.length;n++)a[(t=s[n].split("="))[0]]=t[1];return a},fbFeed=new FacebookPageFeed({appid:"426407340854185",token:"426407340854185|1VWJq1dpLbDNBN-VCoKsekzl0g8",pagename:"chsfoxriver",format:"html",pageScreen:0,pageScreenMax:20,feedlimit:5,template:function(e,t){var a="";if(a="{{text}}{{cover}}",t.attachments&&t.attachments.data[0].media&&"photo"==t.attachments.data[0].type&&t.attachments.data[0].media.image.src)a=a.replace("{{cover}}",'<div class="text-center"><img src="'+t.attachments.data[0].media.image.src+'"></div>');else if(t.attachments&&t.attachments.data[0].subattachments){var s=t.attachments.data[0].subattachments.data;text="";for(var n=0;n<s.length;n++)text+='<div class="text-center"><img src="'+s[n].media.image.src+'"></div>';a=a.replace("{{cover}}",text)}else a=a.replace("{{cover}}","");var o=t.message.replace(/\n/g,"<br/>");a=a.replace("{{text}}",'<p class="card-text">'+o+"</p>"),console.log(t);var i=new Date(t.created_time),c=i.getDate(),r=i.getMonth(),d=i.getFullYear();return'        <div class="card card-block">          <div class="panel-heading"">            '+(c+' <span lang="cz">'+["leden","únor","březen","duben","květen","červen","červenec","srpen","září","říjen","listopad","prosinec"][r]+"</span> "+d)+'          </div>          <div class="panel-body">'+a+"</div>        </div>"},onLoad:function(e,t,a){a&&a.cover?$(".jumbotron").css({"background-image":"url('"+a.cover.source+"')"}):$(".jumbotron").css({"background-image":""});var s='<div class="posts-footer">';if(a.posts.paging.next){s+='<div id="oldPosts"><a id="oldPostsLink" href="#" lang="cz">Starší</a></div>';(n=this).data=a,$(document).off("click","#oldPostsLink"),$(document).on("click","#oldPostsLink",function(){n.pageScreen+=1,$.getJSON(n.data.posts.paging.next,function(e){var t={};e.data&&e.data.length>0?(t.posts=e.data,t.posts.paging=e.paging,n.onLoad(n.formatResponse(t,n),n.format,t)):(n.pageScreenMax=n.pageScreen-1,n.pageScreen-=1,setTimeout(n.updatePageScreen.bind(n),100))}.bind(this))}.bind(this))}if(a.posts.paging.previous){s+='<div id="newPosts"><a id="newPostsLink" href="#" lang="cz">Nové</a></div>';var n;(n=this).data=a,$(document).off("click","#newPostsLink"),$(document).on("click","#newPostsLink",function(){n.pageScreen-=1,$.getJSON(n.data.posts.paging.previous,function(e){var t={};e.data&&e.data.length>0&&(t.posts=e.data,t.posts.paging=e.paging,n.onLoad(n.formatResponse(t,n),n.format,t))}.bind(this))}.bind(this))}setTimeout(this.updatePageScreen.bind(this),100),elResult.html('<div class="card-columns">'+e+"</div>"+s+"</div>")},formatResponse:function(e,t){var a="";for(var s in e.posts)e.posts[s].message&&(e.posts[s].message=this.urlify(e.posts[s].message),e.posts[s].likes=t.likesFormat(e.posts[s].likes?e.posts[s].likes.summary.total_count:0),a+=t.template(e.page,e.posts[s]));return a},urlify:function(e){return(e=e||"").replace(/(https?:\/\/[^\s]+)/g,function(e){return'<a href="'+e+'" target="_blank">'+e+"</a>"})},updatePageScreen:function(){0==this.pageScreen?$("#newPosts").css("display","none"):$("#newPosts").css("display","block"),this.pageScreen==this.pageScreenMax?$("#oldPosts").css("display","none"):$("#oldPosts").css("display","block")}});fbFeed.get();