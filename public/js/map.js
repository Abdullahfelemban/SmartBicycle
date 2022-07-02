
var bike_n = []
var bike_n3 = []
var bike_n4 = []
axios.get('/home/main2')
.then((responseArr ) => {
  
  
  let bikes = responseArr.data
  
  var map = new google.maps.Map(document.getElementById('mapm'), {
    zoom: 11,
    center: new google.maps.LatLng(24.726750,46.705983),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var infowindow = new google.maps.InfoWindow();

  var marker, i;

  
  bikes.forEach((bike)=> {

     
    if(bike.status==1) {

     bike_n.push(bike.status)
     
    
    
     
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

  if(bike.status==2) {

    bike_n3.push(bike.status)
    
    
   
    
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

 if(bike.status==3) {

  bike_n4.push(bike.status)
  
  
 
  
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

 document.getElementById("numA").innerHTML = bike_n.length;
 document.getElementById("numUn").innerHTML = bike_n3.length;
 document.getElementById("numM").innerHTML = bike_n4.length;


  })
  

});



function reports2(obj){

  var btnValue = obj.options[obj.selectedIndex].value;
  var numberT = 0 , incomeT=0 , timeT=0 , numofonline=0 ,numofcoins=0 , numofocard=0
  var numberw = 0 , incomew=0 , timew=0 , numofonlinew=0 ,numofcoinsw=0 , numofocardw=0
  var numberm = 0 , incomem=0 , timem=0 , numofonlinem=0 ,numofcoinsm=0 , numofocardm=0
  var numbery = 0 , incomey=0 , timey=0 , numofonliney=0 ,numofcoinsy=0 , numofocardy=0
  var today = new Date();
  var year = today.getFullYear(); mes = today.getMonth()+1; dia = today.getDate(); fecha =dia+"-"+mes+"-"+year;

  
  
 

  axios.get('/home/reports')
      .then((responseArr ) => {
  
        let report = responseArr.data

        report.forEach((report)=> {
        

       var   dat2 = report.Date

         var mo=  dat2.substr(1+2) 
         var ye = dat2.substr(1+2+3)
         

        
if (fecha==report.Date) {

  numberT++
  incomeT += report.amount
  timeT += report.time
  if(report.payment_type==1) {

    numofonline++

  }
  if(report.payment_type==2) {

    numofcoins++

  }

if(report.payment_type==3) {

    numofocard++

  }
  
}

if (((dia-1+"-"+mes+"-"+year)>=report.Date) && ((dia-8+"-"+mes+"-"+year)<=report.Date) ) {

  
  numberw++
  incomew += report.amount
  timew += report.time
  if(report.payment_type==1) {

    numofonlinew++

  }
  if(report.payment_type==2) {

    numofcoinsw++

  }

if(report.payment_type==3) {

    numofocardw++

  }
  
}


if ( (mes-1>=parseInt(mo)) && (mes-2<=parseInt(mo)) && (year==parseInt(ye) ))  {

  
  numberm++
  incomem += report.amount
  timem += report.time

  if(report.payment_type==1) {

    numofonlinem++

  }
  if(report.payment_type==2) {

    numofcoinsm++

  }

if(report.payment_type==3) {

    numofocardm++

  }
  
}





if ( (year-1>=parseInt(ye)) && (year-2<=parseInt(ye)) )  {

  
  numbery++
  incomey += report.amount
  timey += report.time

  if(report.payment_type==1) {

    numofonliney++

  }
  if(report.payment_type==2) {

    numofcoinsy++

  }

if(report.payment_type==3) {

    numofocardy++

  }
  
}


        })

        if (btnValue== "Today"){

          document.getElementById("nor").innerHTML = numberT + " Times";
          document.getElementById("In").innerHTML = incomeT + " SR" ;
          document.getElementById("Avu").innerHTML = (timeT/numberT).toFixed(2) + " Min";
          document.getElementById("noo").innerHTML = numofonline;
          document.getElementById("noo2").innerHTML = numofcoins;
          document.getElementById("noo3").innerHTML = numofocard;
         
         }
        
         if (btnValue== "Last week"){
        
          document.getElementById("nor").innerHTML = numberw + " Times";
          document.getElementById("In").innerHTML = incomew + " SR" ;
          document.getElementById("Avu").innerHTML = (timew/numberw).toFixed(2) + " Min";
          document.getElementById("noo").innerHTML = numofonlinew;
          document.getElementById("noo2").innerHTML = numofcoinsw;
          document.getElementById("noo3").innerHTML = numofocardw;
         }
        
         if (btnValue== "Last month"){
        
          document.getElementById("nor").innerHTML = numberm + " Times";
          document.getElementById("In").innerHTML = incomem + " SR" ;
          document.getElementById("Avu").innerHTML = (timem/numberm).toFixed(2) + " Min";
          document.getElementById("noo").innerHTML = numofonlinem;
          document.getElementById("noo2").innerHTML = numofcoinsm;
          document.getElementById("noo3").innerHTML = numofocardm;
         }
         if (btnValue== "Last year"){
        
          document.getElementById("nor").innerHTML = numbery + " Times";
          document.getElementById("In").innerHTML = incomey + " SR" ;
          document.getElementById("Avu").innerHTML = (timey/numbery).toFixed(2) + " Min";
          document.getElementById("noo").innerHTML = numofonliney;
          document.getElementById("noo2").innerHTML = numofcoinsy;
          document.getElementById("noo3").innerHTML = numofocardy;
         }
        

})


}


axios.get('/home/Rate')
.then((responseArr ) => {
  
  
  let Rate = responseArr.data
  var count = 0
  var sum =0 
  var sum2 =0
  var sum3 =0 
  Rate.forEach((rate)=> {

    if((rate.Website&&rate.Bicycle&&rate.Price)>0){
 count++

 sum += rate.Website 
 sum2 += rate.Bicycle
 sum3 += rate.Price
  }


  })

 
  

  var xValues = ["Website ★ ", "Bicycle ★ ", "Price ★ ", ];
  var yValues = [(sum/count).toFixed(2),(sum2/count).toFixed(2), (sum3/count).toFixed(2),1];
  var barColors = ["#9FC4E3", "#9FC4E3","#9FC4E3"];
  
  new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      legend: {display: false},
      title: {
        display: true,
        text: "Rate Average"
      }
    }
  });
  
  });


  axios.get('/home/Ads')
.then((responseArr ) => {
  
  
  let Ads = responseArr.data
  var sum=0,sum2=0,sum3=0,sum4=0,sum5=0,sum6=0,sum7=0,sum8=0 
 
  Ads.forEach((Ads)=> {

 
if (Ads.number=='ADS01'){
 sum++
}
else if (Ads.number=='ADS02') {

sum2++
}else if (Ads.number=='ADS03') {

  sum3++
  }else if (Ads.number=='ADS04') {

    sum4++
    }else if (Ads.number=='ADS05') {

      sum5++
      }else if (Ads.number=='ADS06') {

        sum6++
        }else if (Ads.number=='ADS07') {

          sum7++
          }else if (Ads.number=='ADS08') {

            sum8++
            }

            console.log(sum2)
  })

 
  

  var xValues = ['ADS01', "ADS02", "ADS03", "ADS04","ADS05","ADS05","ADS06","ADS07","ADS08"];
  var yValues = [sum,sum2, sum3,sum4,sum5,sum6,sum7,sum8];
  var barColors = ["#9FC4E3","#9FC4E3","#9FC4E3","#9FC4E3","#9FC4E3","#9FC4E3","#9FC4E3","#9FC4E3"];
  
  new Chart("myChart2", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      legend: {display: false},
      title: {
        display: true,
        text: "ADS interaction"
      }
    }
  });
  
  });

 
 