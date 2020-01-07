	$(document).ready(function(){
		 	$('#submit').on('submit',function(e){
		 		e.preventDefault();

		 		var searchField = $('#search').val(); //saves the text field value

		  		$.getJSON('https://rest.bandsintown.com/artists/' +searchField+ '/?app_id=foo', function(data) {
		  				
		  				var artist = {
		  					
		  					name : data.name,
		  					thumbImage : data.thumb_url,
		  					fb : data.facebook_page_url,
		  					trackerCount : data.tracker_count

		  				};
		  				document.cookie = artist.name+"; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		  				
		  				if(artist != undefined){
		  					$("#artist-name").html('<a href="details.html?name='+artist.name+'&img='+artist.thumbImage+'&tracker='+artist.trackerCount+'">'+artist.name+'</a>');
		  					$("#artist-fb").html('<a href="'+artist.fb+'" target=_"blank">'+artist.fb+'</a>');
		  					$("#artist-img").attr('src',artist.thumbImage);
		  					$("#results").show();
		  				}
		  				else{
		  					$("#alert").show('<div class="alert col-6 mx-auto alert-warning alert-dismissible fade show mt-5" role="alert"> Sorry, No result found. Please Search again<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
		  				}
			   		
		  		});
		  		
		 	});
		 
	});