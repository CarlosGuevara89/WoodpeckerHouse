window.addEventListener('scroll', function() {
    var navbar = document.querySelector('.navbar');
    var navbarNav = document.querySelector('.navbar-nav');
    var logo = document.querySelector('.logo');
    
    if (window.scrollY > 50) {
      navbar.classList.remove('navbar-large');
      navbar.classList.add('navbar-small');
      navbarNav.classList.add('navbar-nav-small');
      logo.classList.remove('logo-large');
      logo.classList.add('logo-small');
    } else {
      navbar.classList.remove('navbar-small');
      navbar.classList.add('navbar-large');
      navbarNav.classList.remove('navbar-nav-small');
      logo.classList.remove('logo-small');
      logo.classList.add('logo-large');
    }
  });

$(document).ready(function(){
    $('#contactForm').submit(function(e){
      e.preventDefault();
      var formData = $(this).serialize();
      $('#loader').show();
      
      $.ajax({
        url: 'php/sendmail.php',
        type: 'post',
        data: formData,
        success: function(response){
          $('#loader').hide();
          if(response == 1){
            Swal.fire({
              icon: 'warning',
              title: '¡Ooops!',
              text: 'Por favor, verifica que no eres un robot.',
              showConfirmButton: true,
              timer: 3000 
            });
          }

          if(response == 2){
            Swal.fire({
              icon: 'success',
              title: '¡Mensaje enviado!',
              text: 'El mensaje ha sido enviado con éxito.',
              showConfirmButton: true,
              timer: 3000 
            });
            $('#contactForm')[0].reset();
            grecaptcha.reset();
          }
        },
        error: function(){
          $('#loader').hide();
          Swal.fire({
            icon: 'error',
            title: '¡Ooops!',
            text: 'Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.',
            showConfirmButton: true,
            timer: 3000 
          });
        }
      });
    });
});


document.addEventListener("DOMContentLoaded", function() {
  var banner = document.getElementById("banner");
  banner.style.display = "block";
});

document.addEventListener("DOMContentLoaded", function() {
  var contactForm = document.getElementById("contact-form");
  var contactMap = document.getElementById("contact-map");
  var animationReproduced = false;

  window.addEventListener("scroll", function() {
    var scrollPosition = window.scrollY;
    var seccionPosition = document.getElementById("contact-form-map").offsetTop;
    var triggerPosition = seccionPosition - window.innerHeight / 1; 

    if (scrollPosition >= triggerPosition && !animationReproduced) {
      contactForm.classList.add("animate__animated", "animate__fadeInLeft", "animate__slower");
      contactMap.classList.add("animate__animated", "animate__fadeInRight", "animate__slower");
      animationReproduced = true;
    }
  });
});
