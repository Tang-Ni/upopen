
require.config({
	//baseUrl: basePath,
	paths: {
        common: '/assets/public/js/common'
	}
})

require([ 'common' ], function( ){	
	logo3d(1);
	var blogTmp = ['<div class="info clearfix">',
						'<a class="title" href="/blog/info?id={id}">{title}</a>',
						'<a class="type" href="/blog/list?kind={kind}">{kind}</a>',
						'<a href="/user/info?id={owner}"><img class="head" src="/assets/public/imgs/head.png" width="42" /></a>',
					'</div>',
					'<div class="content clearfix markdown">{summary}</div>',
					'<div class="more clearfix">......<br /><a class="viewAll" href="/blog/info?id={id}">&lt;view all&gt;</a></div>',
					'<div class="tool">',
						'<span class="toolItem view">Views: {view}</span>',
						'<span class="toolItem talk">Comments: {comment}</span>',
						'<span class="toolItem date">Date: {date}</span>',
					'</div>'].join('');

	function fetchBlog( start, limit ){
		loading = true;
		var data = {
			start: start || 0,
			limit: limit || 5
		}
		$.ajax({
			url: '/blog/fetchList',
			type: 'get',
			dataType: 'json',
			data: data,
			success: function( ret ){
				if( ret.code == 0 ){
					renderItems( ret.data );
					if( ret.data.length == limit ){
						loading = false;
					}
					logo3d(0);
				} else {
					
				}
			}
		})
	}

	function renderItems( items ){
		var els = [];
		$.each( items, function( index, item ){
			els.push( render( item ) );
		});
		$( '#blogBox' ).append( els );
		
	}

	function render( item ){
		item.date = item.date.split('T')[0];
		var el = blogTmp.replace( /\{(.*?)\}/g, function( $1, $2 ){
			return item[ $2 ];
		});
		return $( '<section>' ).append( el );
	}

	var loading = false,
		start = 0,
		limit = 5;

	$( window ).on( 'scrollLoading', function(){
		if( !loading ){
			fetchBlog( start += limit, limit )
		}
	})

	!function(){
		fetchBlog( start, limit );
	}();

})


