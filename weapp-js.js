$(document).ready(function(){

	var lat, lon, fullUrl;

	function getLocation() {
		if (navigator.geolocation) {
			//browser supports geolocation:
			navigator.geolocation.getCurrentPosition(showPosition, showError);
		} else {
			//if ur browser does not support:
			alert("Geolocation is not supported by this browser.");
		}
	}

	//FIRST => get latitude and longitude and create the url with current coords:
	function showPosition(position) {
		lat = position.coords.latitude ;
		lon = position.coords.longitude;
		fullUrl = "https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+lon;

		// Check the url:
		console.log(fullUrl);

		// THEN => make the request using ajax:
		$.ajax({

			// request from:
			url: fullUrl,

			// If request well done:
			success: function(resp){

				//data show
				$("#city").html("Location: "+resp.name);
				$("#temp").html("Temperature: "+Math.floor(resp.main.temp)+"&ordm;C"+" / "+Math.floor((resp.main.temp)* 9 / 5 + 32)+"&ordm;F");
				$("#sky").html("Sky: "+resp.weather[0].main);
				$("#hum").html("Humidity: "+resp.main.humidity+"%"+"<span class=\"blink\" id=\"noChange\">_</span>");
				console.log("OK");

				//Display the icons:
				if(resp.weather[0].id === 800){
					$("#iconId").attr("src","https://res.cloudinary.com/kuskus-img/image/upload/v1516308605/img-clear_fp82fa.png");

				}else if(resp.weather[0].id === 801 && resp.weather[0].id <= 804){
					$("#iconId").attr("src","https://res.cloudinary.com/kuskus-img/image/upload/v1516308605/img-cloud_fyuwsl.png");

				}else if(resp.weather[0].id >= 500 && resp.weather[0].id <= 531){
					$("#iconId").attr("src","https://res.cloudinary.com/kuskus-img/image/upload/v1516308605/img-rain_cpefgv.png");

				}else if(resp.weather[0].id >= 200 && resp.weather[0].id <= 232){
					$("#iconId").attr("src","https://res.cloudinary.com/kuskus-img/image/upload/v1516308605/img-storm_idy9xx.png");
					
				}else if(resp.weather[0].id >= 600 && resp.weather[0].id <= 622){
					$("#iconId").attr("src","https://res.cloudinary.com/kuskus-img/image/upload/v1516308605/img-snow_izyxnq.png");
					
				}else if(resp.weather[0].id >= 300 && resp.weather[0].id <= 321){
					$("#iconId").attr("src","https://res.cloudinary.com/kuskus-img/image/upload/v1516308605/img-rain_cpefgv.png");
					
				}else if(resp.weather[0].id >= 701 && resp.weather[0].id <= 781){
					$("#iconId").attr("src","https://res.cloudinary.com/kuskus-img/image/upload/v1516382737/mist_pwr5r1.png");
					
				}else if(resp.weather[0].id >= 900 && resp.weather[0].id <= 906){
					$("#iconId").attr("src","https://res.cloudinary.com/kuskus-img/image/upload/v1516382737/skull_wvuvdv.png");
					
				}else if(resp.weather[0].id >= 951 && resp.weather[0].id <= 962){
					$("#iconId").attr("src","https://res.cloudinary.com/kuskus-img/image/upload/v1516382737/kcp_fqlxgg.png");
				}

			}
		});
	}

	// ERRORS:
	// ERROR 503: server is kaput
	function showError(error) {
		switch(error.code) {
			case error.PERMISSION_DENIED:
				document.getElementById("err-console").innerHTML = "User denied the request for Geolocation :(";
				$(".failed").html("Failed load");
				break;
			case error.POSITION_UNAVAILABLE:
				document.getElementById("err-console").innerHTML = "Location information is unavailable.";
				$(".failed").html("Failed load");
				break;
			case error.TIMEOUT:
				document.getElementById("err-console").innerHTML = "The request to get user location timed out.";
				$(".failed").html("Failed load");
				break;
			case error.UNKNOWN_ERROR:
				document.getElementById("err-console").innerHTML = "An unknown error occurred.";
				$(".failed").html("Failed load");
				break;
		}
	}


	getLocation();

});
	/*---------------------------EXAMPLE RECEIVED OBJECT-----------------------------
	{coord: {…}, weather: Array(1), base: "stations", main: {…}, visibility: 10000, …}
		base:"stations"
		clouds:{all: 0}
		cod:200
		coord:{lon: -3.67, lat: 40.46}
		dt:1516194000
		id:6324376
		main:{temp: 13, pressure: 1025, humidity: 58, temp_min: 13, temp_max: 13}
		name:"Pinar de Chamartin"
		sys:{type: 1, id: 5488, message: 0.0062, country: "ES", sunrise: 1516174489, …}
		visibility:10000
		weather: //EJ: weather[0].main
			0:{id: 800, main: "Clear", description: "clear sky", icon: "https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F01d.png?1499366022009"}
			length:1
			__proto__:Array(0)
		wind:{speed: 3.6, deg: 320}
		__proto__:Object
	---------------------------------------------------------------------------------*/

//200-232: storm, 300-321: rain, 500-531: rain, 600-622: snow, 701-781: mist, 800: clear, 801-804: clouds, 900-906: skull, 951-962: ¿?

