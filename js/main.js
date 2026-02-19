/* ============================================
   Happy Camper Consulting — Main JS
   ============================================ */

(function() {
  'use strict';

  // ---- Navbar scroll behavior ----
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  function handleScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      navbar.classList.add('navbar--scrolled');
      navbar.classList.remove('navbar--transparent');
    } else {
      navbar.classList.remove('navbar--scrolled');
      navbar.classList.add('navbar--transparent');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ---- Mobile menu ----
  const hamburger = document.querySelector('.hamburger-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileOverlay = document.querySelector('.mobile-nav__overlay');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    mobileOverlay.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', toggleMenu);
  }
  var mobileClose = document.querySelector('.mobile-nav__close');
  if (mobileClose) {
    mobileClose.addEventListener('click', toggleMenu);
  }

  // Close mobile menu on link click
  const mobileLinks = document.querySelectorAll('.mobile-nav a');
  mobileLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (mobileNav.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // ---- Scroll reveal animations ----
  const reveals = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(function(el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything
    reveals.forEach(function(el) {
      el.classList.add('visible');
    });
  }

  // ---- Mobile dropdown toggle ----
  var mobileDropdownToggles = document.querySelectorAll('.mobile-nav__dropdown-toggle');
  mobileDropdownToggles.forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      this.classList.toggle('active');
      var submenu = this.nextElementSibling;
      if (submenu) {
        submenu.classList.toggle('open');
      }
    });
  });

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = navbar.offsetHeight + 20;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();
