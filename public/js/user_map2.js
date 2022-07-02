var lati = window.localStorage.getItem('lati');
var long = window.localStorage.getItem('long');

var lati1 = window.localStorage.getItem('lati2');
 var long1 = window.localStorage.getItem('long2');

var userlo = new google.maps.LatLng(lati, long);
var N_station =new google.maps.LatLng(24.842198,46.642912);
var E_station =new google.maps.LatLng(24.796797,46.831104);
var W_station =new google.maps.LatLng(24.702156,46.624090);
var S_station =new google.maps.LatLng(24.611002,46.754789);


var ADS01 =new google.maps.LatLng(24.760482,46.599659);
var ADS02 =new google.maps.LatLng(24.74746337549746,46.57030692705081);
var ADS03 =new google.maps.LatLng(24.692122,46.673689);
var ADS04 =new google.maps.LatLng(24.755267,46.741624);
var ADS05 =new google.maps.LatLng(24.767001,46.806331);
var ADS06 =new google.maps.LatLng(24.884641,46.609858);
var ADS07 =new google.maps.LatLng(24.819362,46.642582);
var ADS08 =new google.maps.LatLng(24.577757458773547,46.749159616418034);



var dislist = [['select bus station',calcDistance(userlo,userlo),[lati,long]],
  
              ['North Station',calcDistance(userlo,N_station),[24.842198,46.642912]],
              ['East Station',calcDistance(userlo,E_station),[24.796797,46.831104]],
              ['West Station',calcDistance(userlo,W_station),[24.702156,46.624090]],
              ['South Station',calcDistance(userlo,S_station),[24.611002,46.754789]]

    ];
    
    var Adslist = [
  
      ['ADS01',calcDistance(userlo,ADS01),'/img/ads1.png',24.760482,46.599659],
      ['ADS02',calcDistance(userlo,ADS02),'/img/ads2.png',24.74746337549746,46.57030692705081],
      ['ADS03',calcDistance(userlo,ADS03),'/img/ads3.png',24.692122,46.673689],
      ['ADS04',calcDistance(userlo,ADS04),'/img/ads4.png',24.755267,46.741624],
      ['ADS05',calcDistance(userlo,ADS05),'/img/ads5.png',24.767001,46.806331],
      ['ADS06',calcDistance(userlo,ADS06),'/img/ads6.png',24.884641,46.609858],
      ['ADS07',calcDistance(userlo,ADS07),'/img/ads7.png',24.819362,46.642582],
      ['ADS08',calcDistance(userlo,ADS08),'/img/ads8.png',24.577757458773547,46.749159616418034]
    
    ];
    var x 
    var y
    Adslist.sort(function(a, b){return a[1]-b[1]})
    sortlist2 = Adslist.sort(function(a, b){return a[1]-b[1]}) ;

    document.getElementById("ad1").src = sortlist2[0][2];
    document.getElementById("add1").innerHTML = sortlist2[0][1]+" meter"
    document.getElementById("ad2").src = sortlist2[1][2];
    document.getElementById("add2").innerHTML = sortlist2[1][1]+" meter"
    document.getElementById("ad3").src = sortlist2[2][2];
    document.getElementById("add3").innerHTML = sortlist2[2][1]+" meter"
    
function calcDistance(user,station) {
  return (google.maps.geometry.spherical.computeDistanceBetween(user,station)).toFixed(2);
}

var opt ;

dislist.sort(function(a, b){return a[1]-b[1]})
sortlist = dislist.sort(function(a, b){return a[1]-b[1]}) ;



function changeContent(){

  for (var i =0 ; i <5 ;i++){

      opt= document.getElementById('end').options[i];
      opt.value =sortlist[i][2];
      opt.text = sortlist[i][0];
}
}


function initMap() {
  const markerArray = [];
  // Instantiate a directions service.
  const directionsService = new google.maps.DirectionsService();
  // Create a map and center it on Manhattan.
 
  
  const map = new google.maps.Map(document.getElementById("map"), {

    zoom: 13,
    center:  new google.maps.LatLng(lati, long),

  });
  // Create a renderer for directions and bind it to the map.
  const directionsRenderer = new google.maps.DirectionsRenderer({ map: map });
  // Instantiate an info window to hold step text.
  const stepDisplay = new google.maps.InfoWindow();

  // Display the route between the initial start and end selections.
  calculateAndDisplayRoute(directionsRenderer,directionsService,markerArray,stepDisplay,map);

  // Listen to change events from the start and end lists.
  const onChangeHandler = function () {
    calculateAndDisplayRoute(directionsRenderer,directionsService,markerArray,stepDisplay,map);
  };

  const onChangeHandler1 = function () {
    calculateAndDisplayRoute1(directionsRenderer,directionsService,markerArray,stepDisplay,map);
  };
 
  document.getElementById("end").addEventListener("change", onChangeHandler);
  
  const getdir = document.getElementById("dir");

  getdir.addEventListener("click", (e) => {
  
     
      e.preventDefault();
   var index =   window.localStorage.getItem('index')
     

   if (index==1) {
    
    x = sortlist2[0][3]
    y = sortlist2[0][4]
    
    axios.post('/home/Ads/' +sortlist2[0][0] )

   }
   if (index==2) {
    
    x = sortlist2[1][3]
    y = sortlist2[1][4]

    axios.post('/home/Ads/' +sortlist2[1][0] )

   }
   if (index==3) {
    
    x = sortlist2[2][3]
    y = sortlist2[2][4]

    axios.post('/home/Ads/' + sortlist2[2][0] )

   }
      onChangeHandler1()
      
      
       
  })


}

function calculateAndDisplayRoute(directionsRenderer, directionsService, markerArray, stepDisplay, map) {
  // First, remove any existing markers from the map.
  for (let i = 0; i < markerArray.length; i++) {
    markerArray[i].setMap(null);
  }

  // Retrieve the start and end locations and create a DirectionsRequest using
  // WALKING directions.
  directionsService
    .route({
      origin: new google.maps.LatLng(lati, long),
      destination: document.getElementById("end").value,
      travelMode: google.maps.TravelMode.WALKING,
    })
    .then((result) => {
      // Route the directions and pass the response to a function to create
      // markers for each step.
    //   document.getElementById("warnings-panel").innerHTML =
    //     "<b>" + result.routes[0].warnings + "</b>";
      directionsRenderer.setDirections(result);
      showSteps(result, markerArray, stepDisplay, map);
    })
    // .catch((e) => {
    //   // window.alert("Directions request failed due to " + e);
    // });

   
}
function calculateAndDisplayRoute1(directionsRenderer, directionsService, markerArray, stepDisplay, map) {
  // First, remove any existing markers from the map.
  for (let i = 0; i < markerArray.length; i++) {
    markerArray[i].setMap(null);
  }

  // Retrieve the start and end locations and create a DirectionsRequest using
  // WALKING directions.
  directionsService
    .route({
      origin: new google.maps.LatLng(lati, long),
      destination: new google.maps.LatLng(x,y),
      travelMode: google.maps.TravelMode.WALKING,
    })
    .then((result) => {
      // Route the directions and pass the response to a function to create
      // markers for each step.
    //   document.getElementById("warnings-panel").innerHTML =
    //     "<b>" + result.routes[0].warnings + "</b>";
      directionsRenderer.setDirections(result);
      showSteps(result, markerArray, stepDisplay, map);
    })
    // .catch((e) => {
    //   // window.alert("Directions request failed due to " + e);
    // });

   
}

function showSteps(directionResult, markerArray, stepDisplay, map) {
  // For each step, place a marker, and add the text to the marker's infowindow.
  // Also attach the marker to an array so we can keep track of it and remove it
  // when calculating new routes.
  const myRoute = directionResult.routes[0].legs[0];

  for (let i = 0; i < myRoute.steps.length; i++) {
    const marker = (markerArray[i] =
      markerArray[i] || new google.maps.Marker());

    marker.setMap(map);
    marker.setPosition(myRoute.steps[i].start_location);
    attachInstructionText( stepDisplay, marker, myRoute.steps[i].instructions, map
    );
  }
}

function attachInstructionText(stepDisplay, marker, text, map) {
  google.maps.event.addListener(marker, "click", () => {
    // Open an info window when the marker is clicked on, containing the text
    // of the step.
    stepDisplay.setContent(text);
    stepDisplay.open(map, marker);
  });

  
    
    
}


