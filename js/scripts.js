document.addEventListener('DOMContentLoaded', function () {

  // =============================================
  // 1. Navbar Scroll Behavior
  // =============================================
  var navbar = document.getElementById('mainNav');

  function handleNavbarScroll() {
    if (window.scrollY > 80) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
      navbar.classList.add('navbar-transparent');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll();

  // =============================================
  // 2. Smooth Scroll & Mobile Nav Close
  // =============================================
  var navbarCollapse = document.getElementById('navbarNav');
  var bsCollapse = navbarCollapse ? new bootstrap.Collapse(navbarCollapse, { toggle: false }) : null;

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      var navbarHeight = navbar.offsetHeight;
      var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Close mobile nav if open
      if (bsCollapse && navbarCollapse.classList.contains('show')) {
        bsCollapse.hide();
      }
    });
  });

  // =============================================
  // 3. Active Nav Link on Scroll
  // =============================================
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  function updateActiveLink() {
    var scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();

  // =============================================
  // 4. Scroll Reveal (IntersectionObserver)
  // =============================================
  var revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '-50px'
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show all elements immediately
    revealElements.forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  // =============================================
  // 5. Gallery Lightbox
  // =============================================
  var galleryModal = document.getElementById('galleryModal');
  var galleryModalImg = document.getElementById('galleryModalImg');

  if (galleryModal && galleryModalImg) {
    var bsGalleryModal = new bootstrap.Modal(galleryModal);

    document.querySelectorAll('.gallery-item figure').forEach(function (figure) {
      figure.addEventListener('click', function () {
        var img = this.querySelector('img');
        if (img) {
          galleryModalImg.src = img.src;
          galleryModalImg.alt = img.alt;
          bsGalleryModal.show();
        }
      });
    });
  }

  // =============================================
  // 6. Contact Form AJAX (jQuery)
  // =============================================
  $('#contactForm').submit(function (e) {
    e.preventDefault();
    var formData = $(this).serialize();
    $('#loader').show();

    $.ajax({
      url: 'php/sendmail.php',
      type: 'post',
      data: formData,
      success: function (response) {
        $('#loader').hide();

        if (response == 1) {
          Swal.fire({
            icon: 'warning',
            title: 'Oops!',
            text: 'Please verify that you are not a robot.',
            confirmButtonColor: '#2D5016',
            showConfirmButton: true,
            timer: 3000
          });
        }

        if (response == 2) {
          Swal.fire({
            icon: 'success',
            title: 'Message Sent!',
            text: 'Your message has been sent successfully.',
            confirmButtonColor: '#2D5016',
            showConfirmButton: true,
            timer: 3000
          });
          $('#contactForm')[0].reset();
          grecaptcha.reset();
        }
      },
      error: function () {
        $('#loader').hide();
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'An error occurred. Please try again later.',
          confirmButtonColor: '#2D5016',
          showConfirmButton: true,
          timer: 3000
        });
      }
    });
  });

});
