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

	//FIRST => get latitude and longitude in order to create the url with current coords:
	function showPosition(position) {
		lat = position.coords.latitude ;
		lon = position.coords.longitude;
		fullUrl = "https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+lon;

		// Check the url:
		console.log(fullUrl);

		// THEN => make the request with ajax:
		$.ajax({

			// request from:
			url: fullUrl,

			// If request done:
			success: function(resp){


				$("#city").html(resp.name+"<span class=\"blink\" id=\"noChange\">_</span>");
				$("#temp").html(Math.floor(resp.main.temp)+"&ordm;C");
				$("#sky").html(resp.weather[0].main);
				console.log("OK");

			}
		});
	}

	// error messages:
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

	// STATUS: asignar y mostrar los datos >>>>> HECHO >>>>> en tiempo real >>>> HECHO
	// falta mostrar los iconos correspondientes ala meteorologia.

	//apuntes:
	// ERROR 503: server is kaput

	/*-------------------------EXAMPLE OBJECT resp----------------------

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

	getLocation();



});
