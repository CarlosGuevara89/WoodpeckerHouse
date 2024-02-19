window.addEventListener('scroll', function() {
    var navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.remove('navbar-large');
      navbar.classList.add('navbar-small');
      navbar.classList.add('transparent');
    } else {
      navbar.classList.remove('navbar-small');
      navbar.classList.add('navbar-large');
      navbar.classList.remove('transparent');
    }
  });
