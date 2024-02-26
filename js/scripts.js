window.addEventListener('scroll', function() {
    var navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.remove('navbar-large');
      navbar.classList.add('navbar-small');
    } else {
      navbar.classList.remove('navbar-small');
      navbar.classList.add('navbar-large');
    }

  });

$(document).ready(function(){
    $('#contactForm').submit(function(e){
      e.preventDefault();
      var formData = $(this).serialize();
      $.ajax({
        url: 'php/sendmail.php',
        type: 'post',
        data: formData,
        success: function(response){
            alert(response); 
            if(response.indexOf('¡El mensaje ha sido enviado con éxito') !== -1){
              $('#contactForm')[0].reset();
              location.reload();
          }
        },
        error: function(){
            alert('Hubo un error en la solicitud.');
        }
      });
    });
});


document.addEventListener("DOMContentLoaded", function() {
  var banner = document.getElementById("banner");
  banner.style.display = "block";
});