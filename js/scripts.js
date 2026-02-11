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
  // 6. i18n — Bilingual Support (EN / ES)
  // =============================================
  var translations = {
    en: {
      // Nav
      navAbout: 'About',
      navAmenities: 'Amenities',
      navGallery: 'Gallery',
      navContact: 'Contact',
      navBookNow: 'Book Now',

      // Hero
      heroSubtitle: 'Your Eco-Lodge Retreat in the Heart of Osa',
      heroCtaPrimary: 'Book Your Stay',
      heroCtaSecondary: 'Discover More',
      heroScroll: 'Scroll',

      // About
      aboutTag: 'Welcome',
      aboutTitle: "A Nature Lover's Paradise",
      aboutH3: 'Experience the Magic of Osa Peninsula',
      aboutP1: 'Located amid lush tropical forests and near fascinating natural attractions such as Corcovado National Park and Isla del Ca\u00f1o Biological Reserve, Woodpecker House is the perfect destination for nature lovers and adventure seekers.',
      aboutP2: 'Our location in Rancho Quemado de Osa offers guests a quiet and serene retreat away from the hustle and bustle of daily life. With comfortable amenities, warm hospitality, and stunning natural scenery, Woodpecker House is the ideal place to relax, reconnect with nature, and explore the wonders Costa Rica has to offer.',
      aboutPill1: 'Tropical Forest',
      aboutPill2: 'River Access',
      aboutPill3: 'Mountain Views',

      // Amenities
      amenitiesTag: 'What We Offer',
      amenitiesTitle: 'Our Amenities',
      amenity1Title: 'Comfortable Rooms',
      amenity1Desc: 'Cozy rooms with all the essentials for a restful stay surrounded by nature.',
      amenity2Title: 'Equipped Kitchen',
      amenity2Desc: 'A fully equipped kitchen so you can prepare your favorite meals anytime.',
      amenity3Title: 'Guided Tours',
      amenity3Desc: 'Explore Corcovado National Park and local trails with experienced guides.',
      amenity4Title: 'Free Wi-Fi',
      amenity4Desc: 'Stay connected with complimentary wireless internet throughout the lodge.',
      amenity5Title: 'Transportation',
      amenity5Desc: 'We offer transportation services to and from nearby attractions and towns.',
      amenity6Title: 'Wildlife Watching',
      amenity6Desc: 'Spot toucans, monkeys, and exotic wildlife right from the lodge grounds.',

      // Contact Info
      contactInfoTag: 'Get In Touch',
      contactInfoTitle: 'Contact Information',
      contactLocation: 'Our Location',
      contactPhone: 'Phone',
      contactEmail: 'Email',

      // Gallery
      galleryTag: 'Our Space',
      galleryTitle: 'Photo Gallery',

      // Contact Form
      contactFormTag: 'Reach Out',
      contactFormTitle: 'Send Us a Message',
      contactFormSubtitle: "Have questions about your stay? We'd love to hear from you.",
      contactFormH3: 'Leave Us a Message',
      placeholderName: 'Your Name',
      placeholderEmail: 'Your Email',
      placeholderMessage: 'Your Message',
      btnSendMessage: '<i class="fas fa-paper-plane me-2"></i>Send Message',

      // Footer
      footerDesc: 'A cozy eco-lodge nestled in the heart of Osa Peninsula, offering an authentic Costa Rican nature experience near Corcovado National Park.',
      footerQuickLinks: 'Quick Links',
      footerAbout: 'About Us',
      footerAmenities: 'Amenities',
      footerGallery: 'Gallery',
      footerContact: 'Contact',
      footerConnect: 'Connect',
      footerCopyright: '\u00a9 2026 Woodpecker House. All rights reserved.',

      // SweetAlert
      swalRecaptchaTitle: 'Oops!',
      swalRecaptchaText: 'Please verify that you are not a robot.',
      swalSuccessTitle: 'Message Sent!',
      swalSuccessText: 'Your message has been sent successfully.',
      swalErrorTitle: 'Oops!',
      swalErrorText: 'An error occurred. Please try again later.'
    },
    es: {
      // Nav
      navAbout: 'Nosotros',
      navAmenities: 'Servicios',
      navGallery: 'Galer\u00eda',
      navContact: 'Contacto',
      navBookNow: 'Reservar',

      // Hero
      heroSubtitle: 'Tu Refugio Eco-Lodge en el Coraz\u00f3n de Osa',
      heroCtaPrimary: 'Reserva Tu Estad\u00eda',
      heroCtaSecondary: 'Descubre M\u00e1s',
      heroScroll: 'Deslizar',

      // About
      aboutTag: 'Bienvenidos',
      aboutTitle: 'Un Para\u00edso para los Amantes de la Naturaleza',
      aboutH3: 'Vive la Magia de la Pen\u00ednsula de Osa',
      aboutP1: 'Ubicada entre exuberantes bosques tropicales y cerca de fascinantes atracciones naturales como el Parque Nacional Corcovado y la Reserva Biol\u00f3gica Isla del Ca\u00f1o, Woodpecker House es el destino perfecto para los amantes de la naturaleza y los buscadores de aventura.',
      aboutP2: 'Nuestra ubicaci\u00f3n en Rancho Quemado de Osa ofrece a los hu\u00e9spedes un retiro tranquilo y sereno lejos del ajetreo de la vida diaria. Con c\u00f3modas comodidades, c\u00e1lida hospitalidad y un impresionante entorno natural, Woodpecker House es el lugar ideal para relajarse, reconectarse con la naturaleza y explorar las maravillas que Costa Rica tiene para ofrecer.',
      aboutPill1: 'Bosque Tropical',
      aboutPill2: 'Acceso al R\u00edo',
      aboutPill3: 'Vistas a la Monta\u00f1a',

      // Amenities
      amenitiesTag: 'Lo Que Ofrecemos',
      amenitiesTitle: 'Nuestros Servicios',
      amenity1Title: 'Habitaciones C\u00f3modas',
      amenity1Desc: 'Acogedoras habitaciones con todo lo esencial para una estad\u00eda reparadora rodeada de naturaleza.',
      amenity2Title: 'Cocina Equipada',
      amenity2Desc: 'Una cocina totalmente equipada para que prepares tus comidas favoritas en cualquier momento.',
      amenity3Title: 'Tours Guiados',
      amenity3Desc: 'Explora el Parque Nacional Corcovado y senderos locales con gu\u00edas experimentados.',
      amenity4Title: 'Wi-Fi Gratis',
      amenity4Desc: 'Mant\u00e9nte conectado con internet inal\u00e1mbrico gratuito en todo el lodge.',
      amenity5Title: 'Transporte',
      amenity5Desc: 'Ofrecemos servicios de transporte hacia y desde atracciones y pueblos cercanos.',
      amenity6Title: 'Avistamiento de Fauna',
      amenity6Desc: 'Observa tucanes, monos y fauna ex\u00f3tica directamente desde el lodge.',

      // Contact Info
      contactInfoTag: 'Cont\u00e1ctanos',
      contactInfoTitle: 'Informaci\u00f3n de Contacto',
      contactLocation: 'Ubicaci\u00f3n',
      contactPhone: 'Tel\u00e9fono',
      contactEmail: 'Correo',

      // Gallery
      galleryTag: 'Nuestro Espacio',
      galleryTitle: 'Galer\u00eda de Fotos',

      // Contact Form
      contactFormTag: 'Escr\u00edbenos',
      contactFormTitle: 'Env\u00edanos un Mensaje',
      contactFormSubtitle: '\u00bfTienes preguntas sobre tu estad\u00eda? Nos encantar\u00eda saber de ti.',
      contactFormH3: 'D\u00e9janos un Mensaje',
      placeholderName: 'Tu Nombre',
      placeholderEmail: 'Tu Correo',
      placeholderMessage: 'Tu Mensaje',
      btnSendMessage: '<i class="fas fa-paper-plane me-2"></i>Enviar Mensaje',

      // Footer
      footerDesc: 'Un acogedor eco-lodge en el coraz\u00f3n de la Pen\u00ednsula de Osa, ofreciendo una aut\u00e9ntica experiencia de naturaleza costarricense cerca del Parque Nacional Corcovado.',
      footerQuickLinks: 'Enlaces R\u00e1pidos',
      footerAbout: 'Nosotros',
      footerAmenities: 'Servicios',
      footerGallery: 'Galer\u00eda',
      footerContact: 'Contacto',
      footerConnect: 'Conectar',
      footerCopyright: '\u00a9 2026 Woodpecker House. Todos los derechos reservados.',

      // SweetAlert
      swalRecaptchaTitle: '\u00a1Ups!',
      swalRecaptchaText: 'Por favor verifica que no eres un robot.',
      swalSuccessTitle: '\u00a1Mensaje Enviado!',
      swalSuccessText: 'Tu mensaje ha sido enviado exitosamente.',
      swalErrorTitle: '\u00a1Ups!',
      swalErrorText: 'Ocurri\u00f3 un error. Por favor int\u00e9ntalo de nuevo m\u00e1s tarde.'
    }
  };

  var currentLang = localStorage.getItem('wh-lang') || 'en';

  function setLanguage(lang) {
    var t = translations[lang];
    if (!t) return;

    // Update textContent
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) {
        el.textContent = t[key];
      }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) {
        el.placeholder = t[key];
      }
    });

    // Update innerHTML (for elements with icons)
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (t[key] !== undefined) {
        el.innerHTML = t[key];
      }
    });

    // Update html lang attribute
    document.documentElement.lang = lang;

    // Toggle active class on lang options
    document.querySelectorAll('#langToggle .lang-option').forEach(function (span) {
      if (span.getAttribute('data-lang') === lang) {
        span.classList.add('active');
      } else {
        span.classList.remove('active');
      }
    });

    // Persist
    localStorage.setItem('wh-lang', lang);
    currentLang = lang;
  }

  // Language toggle click handler
  var langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', function (e) {
      var target = e.target.closest('.lang-option');
      if (target) {
        var lang = target.getAttribute('data-lang');
        if (lang && lang !== currentLang) {
          setLanguage(lang);
        }
      }
    });
  }

  // Apply saved language on load
  setLanguage(currentLang);

  // =============================================
  // 7. Contact Form AJAX (jQuery)
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
            title: translations[currentLang].swalRecaptchaTitle,
            text: translations[currentLang].swalRecaptchaText,
            confirmButtonColor: '#2D5016',
            showConfirmButton: true,
            timer: 3000
          });
        }

        if (response == 2) {
          Swal.fire({
            icon: 'success',
            title: translations[currentLang].swalSuccessTitle,
            text: translations[currentLang].swalSuccessText,
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
          title: translations[currentLang].swalErrorTitle,
          text: translations[currentLang].swalErrorText,
          confirmButtonColor: '#2D5016',
          showConfirmButton: true,
          timer: 3000
        });
      }
    });
  });

});
