

  const removeb = document.getElementById("Remove");

  removeb.addEventListener("click", (e) => {
   e.preventDefault();

   const bikenum = document.getElementById("no2f");


  
   axios.delete('/manage/delete/' + bikenum.value)
   .then((res)=>{

     
      alert('bike was deleted')
      window.location.href = '/manage/manger'
   })

    .catch((err)=>{


      console.log(err)
    })
 

   })
    


   const stopb = document.getElementById("Stop");

   stopb.addEventListener("click", (e) => {
    e.preventDefault();
   
    const bikenum = document.getElementById("no3f");
   
   
   
    axios.post('/manage/stop/' + bikenum.value)
    .then((res)=>{
   
      
       alert('bike was stoped')
       window.location.href = '/manage/manger'
    })
   
     .catch((err)=>{
   
   
       console.log(err)
     })
   
   
    })
     
   


    const maint = document.getElementById("maint2");

    maint.addEventListener("click", (e) => {
     e.preventDefault();
    
     const bikenum = document.getElementById("maint");
    
    
    
     axios.post('/manage/maint/' + bikenum.value)
     .then((res)=>{
    
       
        alert('bike was add to maintenance')
        window.location.href = '/manage/manger'
     })
    
      .catch((err)=>{
    
    
        console.log(err)
      })
    
    
     })
      

     const check = document.getElementById("Check");

     check.addEventListener("click", (e) => {
      e.preventDefault();

      var bikenum = document.getElementById("no4f");

     axios.get('/home/main2')
.then((responseArr ) => {
  
  console.log(responseArr.data);
  var bikes = responseArr.data
  
  var find =0 
  bikes.forEach((bike)=> {
   
    
    if((bike.status==1) && (bike.bike_number == bikenum.value)) {
    
      alert ('status is Available ' )
      find = 1
   
  }

 else if((bike.status==2) && (bike.bike_number == bikenum.value)) {

  alert ('status is In use ' )
  
  find=1
 }

else if((bike.status==3) && (bike.bike_number == bikenum.value)) {

  alert ('status is Maintenance ' )
 find =1 

} 


  })
  
  if (find==0){

    alert ('Wrong number' )
  }

});

     })