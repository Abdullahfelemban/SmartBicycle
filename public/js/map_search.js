

axios.get('/home/main2')
.then((responseArr ) => {
  
  console.log(responseArr.data);
  let bikes = responseArr.data
  
  var map = new google.maps.Map(document.getElementById('mapm'), {
    zoom: 11,
    center: new google.maps.LatLng(24.726750,46.705983),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var infowindow = new google.maps.InfoWindow();

  var marker, i;
  var Bnumber ;
  var Bsearch = document.getElementById("ser1");
  

  Bsearch.addEventListener("click", (e) => {
    e.preventDefault();
    var find = 0 ;
   Bnumber =  document.getElementById("ser").value;
   


  bikes.forEach((bike)=> {

    
    
    if(bike.status==1) {
     console.log(bike)
     if (Bnumber==bike.bike_number) {
     find=1 
      document.getElementById("find").innerHTML = "";

      map = new google.maps.Map(document.getElementById('mapm'), {
        zoom: 15,
        center: new google.maps.LatLng(bike.xloc,bike.yloc),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });


    marker = new google.maps.Marker({
      icon: src = '/img/bikeG.png' ,
      position: new google.maps.LatLng(bike.xloc,bike.yloc),
      map: map
    });
    
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(bike.bike_number);
        infowindow.open(map, marker);
      }
    })(marker, i));
    
  }
    }

    if(bike.status==2) {
      console.log(bike)
      if (Bnumber==bike.bike_number) {
      find=1 
       document.getElementById("find").innerHTML = "";
 
       map = new google.maps.Map(document.getElementById('mapm'), {
         zoom: 15,
         center: new google.maps.LatLng(bike.xloc,bike.yloc),
         mapTypeId: google.maps.MapTypeId.ROADMAP
       });
 
 
     marker = new google.maps.Marker({
       icon: src = '/img/bikeR.png' ,
       position: new google.maps.LatLng(bike.xloc,bike.yloc),
       map: map
     });
     
     google.maps.event.addListener(marker, 'click', (function(marker, i) {
       return function() {
         infowindow.setContent(bike.bike_number);
         infowindow.open(map, marker);
       }
     })(marker, i));
     
   }
     }


     if(bike.status==3) {
      console.log(bike)
      if (Bnumber==bike.bike_number) {
      find=1 
       document.getElementById("find").innerHTML = "";
 
       map = new google.maps.Map(document.getElementById('mapm'), {
         zoom: 15,
         center: new google.maps.LatLng(bike.xloc,bike.yloc),
         mapTypeId: google.maps.MapTypeId.ROADMAP
       });
 
 
     marker = new google.maps.Marker({
       icon: src = '/img/bikeO.png' ,
       position: new google.maps.LatLng(bike.xloc,bike.yloc),
       map: map
     });
     
     google.maps.event.addListener(marker, 'click', (function(marker, i) {
       return function() {
         infowindow.setContent(bike.bike_number);
         infowindow.open(map, marker);
       }
     })(marker, i));
     
   }
     }









    if (find==0) {

      document.getElementById("find").innerHTML = "wrong number";
  }

}) 


  })

});














