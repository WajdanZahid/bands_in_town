$(document).ready(function(){

		var urlParams = new URLSearchParams(window.location.search); //get query string parameters
		var name = urlParams.get('name'); //save name parameter
		var img = urlParams.get('img'); //save img from query string
		var trackerCout = urlParams.get('tracker'); //save tracker count 
		const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  							"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  		
		if(name!=undefined){ //check if query string is asigned
			$.getJSON('https://rest.bandsintown.com/artists/' +name+ '/events?app_id=foo', function(data) {
		  				$("#profile").html('<img src="'+img+'" class="profile-img mx-auto" id="profileImg"> <h1 id="artistName">'+name+'</h1> <span class="tracker-count">'+trackerCout+' Trackers</span>')
		  				
		  				//check if json return is not empty
		  				if(data.length != 0){
			  				$.each(data,function(index,events){
			  					
			  						//split Date and time to get acurate DateTime
				  					var eventDate = events.datetime.split("T")[0]; 
				  					
				  					//set venu object
				  					var venue = { 
				  						name : events.venue.name,
				  						country: events.venue.country,
				  						city: events.venue.city,

				  					}
				  					//convert date to Date Object and UTC format by adding Z
				  					var  dateTime = new Date(eventDate+"Z");  

				  					var date = {
				  						month: monthNames[dateTime.getMonth()],
				  						day: dateTime.getDate(),
				  						year: dateTime.getFullYear()
				  					}
				  					var url = "#";
				  					if(events.offers.length != 0){
				  						var url = events.offers[0].url;
				  					}
				  					
				  					//Generate html for the loop
				  					var loopHtml = '<div class="event-row"><div class="event_date_wrapper"><div class="event_date">';
				  					loopHtml += '<span class="date">'+date.day+'</span><span class="month">'+date.month+'</span><span class="year">'+date.year+'</span></div></div>';
				  					loopHtml +='<div class="details-"><h2>'+venue.name+'</h2><div class="location" title="location"><i class="fa fa-map-marker"></i>'+venue.city+', '+venue.country+'</div>';
				  					loopHtml += '</div><div class="ticket"><a href="'+url+'" class="btn btn-outline-secondary" target="_blank">Buy Tickets</a></div><div</div>'

				  					$("#venuListing").append(loopHtml);


			  					
			  				});
		  				}
		  				else{
		  						$("#venuListing").html('<div class="event-row">No Upcoming Event</div>');
		  				}
		  					
		  					
		  					
			   		
		  });
		}
		 
		  
});
