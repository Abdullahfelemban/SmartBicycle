
 
    var Bnumber ;
    var Bsearch = document.getElementById("ser1");
    
    axios.get('/home/main3')
    .then((responseArr ) => {

      console.log(responseArr.data);
      let bikes = responseArr.data

  Bsearch.addEventListener("click", (e) => {
    e.preventDefault();
  
   Bnumber =  document.getElementById("ser").value;
  
   var find = 0 ;
  
   
    
   bikes.forEach((bike)=> {
  
    if (Bnumber==bike.bike_number) {
  
      window.localStorage.setItem('Bnumber',bike.bike_number);
  
      document.getElementById("pay_page").innerHTML = window.localStorage.getItem('Bnumber');
     
  
      find = 1 ;
      document.getElementById("find").innerHTML = "";
       
  
  
  }
   })
  
   if (find==0) {
  
    document.getElementById("find").innerHTML = "wrong number";
  }
  
     
    
  })
})


