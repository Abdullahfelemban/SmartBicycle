var lati = window.localStorage.getItem('lati');
var long = window.localStorage.getItem('long');

var Bnumber ;
var Bsearch = document.getElementById("ser1");
var Bsearch2 = document.getElementById("ser22");
    

    
    axios.get('/home/main3')
    .then((responseArr ) => {
      
      console.log(responseArr.data);
      let bikes = responseArr.data
      
      var map = new google.maps.Map(document.getElementById('mapm'), {
        zoom: 14,
        center: new google.maps.LatLng(lati,long),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      
      });
    
      var infowindow = new google.maps.InfoWindow();
    
      var marker, i;
      
      marker = new google.maps.Marker({
        icon: src = '/img/user10.png' ,
        position: new google.maps.LatLng(lati,long),
        map: map
      
      });
    
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent("you");
          infowindow.open(map, marker );
    
         
          
    
        }
      })(marker, i));

      bikes.forEach((bike)=> {
  marker = new google.maps.Marker({
    icon: src = '/img/bikeG.png' ,
    position: new google.maps.LatLng(bike.xloc,bike.yloc),
    map: map
  
  });

  google.maps.event.addListener(marker, 'click', (function(marker, i) {
    return function() {
      infowindow.setContent(bike.bike_number);
      infowindow.open(map, marker );

     
      window.localStorage.setItem('Bnumber',bike.bike_number);

      document.getElementById("pay1").innerHTML = window.localStorage.getItem('Bnumber');
      

    }
  })(marker, i));
  

})



Bsearch2.addEventListener("click", (e) => {
  e.preventDefault();

 Bnumber =  document.getElementById("ser2").value;

 var find = 0 ;


  
 bikes.forEach((bike)=> {

  if (Bnumber==bike.bike_number) {

    window.localStorage.setItem('Bnumber',bike.bike_number);

    document.getElementById("pay1").innerHTML = window.localStorage.getItem('Bnumber');
   

    find = 1 ;
    document.getElementById("find1").innerHTML = "";
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
 })

 if (find==0) {

  document.getElementById("find1").innerHTML = "wrong number";
}

   
  
})
 
 





    })


   
    



 