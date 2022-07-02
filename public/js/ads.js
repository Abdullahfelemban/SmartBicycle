var slideIndex = 1;
showSlides(slideIndex);


// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

var slideIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {slideIndex = 1}
  x[slideIndex-1].style.display = "block";
  showSlides(slideIndex)
  setTimeout(carousel, 3500); // Change image every 2 seconds
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");

  
  window.localStorage.setItem('index',n);
 
  if (n > 3) {

    slideIndex = 1
  }
  if (n < 1) {
    
    slideIndex = 3
  
  }

  for (i = 0; i < 3; i++) {
      slides[i].style.display = "none";
  }

  
  for (i = 0; i < 3; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";

 
}
