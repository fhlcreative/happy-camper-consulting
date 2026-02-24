/* ============================================
   Happy Camper Consulting — Main JS
   ============================================ */

(function() {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
  function getFocusableElements() {
    if (!mobileNav) return [];
    return Array.prototype.slice.call(
      mobileNav.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])')
    );
  }

  function toggleMenu() {
    var isOpening = !mobileNav.classList.contains('open');

    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    mobileOverlay.classList.toggle('open');
    navbar.classList.toggle('navbar--menu-open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';

    // Update aria-expanded on hamburger
    if (hamburger) {
      hamburger.setAttribute('aria-expanded', isOpening ? 'true' : 'false');
    }

    // Return focus to hamburger on close
    if (!isOpening && hamburger) {
      hamburger.focus();
    }
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', toggleMenu);
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

  // ---- Escape key closes mobile menu ----
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('open')) {
      toggleMenu();
    }
  });

  // ---- Focus trap in mobile menu ----
  if (mobileNav) {
    mobileNav.addEventListener('keydown', function(e) {
      if (e.key !== 'Tab') return;
      var focusable = getFocusableElements();
      if (focusable.length === 0) return;

      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  // ---- Scroll reveal animations ----
  const reveals = document.querySelectorAll('.reveal');

  if (prefersReducedMotion) {
    // Skip animations entirely
    reveals.forEach(function(el) {
      el.classList.add('visible');
    });
  } else if ('IntersectionObserver' in window) {
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
      var isActive = this.classList.contains('active');
      this.classList.toggle('active');
      this.setAttribute('aria-expanded', isActive ? 'false' : 'true');
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
