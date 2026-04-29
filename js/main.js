(function() {
  'use strict';

  // Dark mode
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggle) themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
      }
    });
  }

  // Sticky header shadow
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Scroll to top
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Lazy load images
  const lazyImages = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    lazyImages.forEach(function(img) {
      imageObserver.observe(img);
    });
  } else {
    lazyImages.forEach(function(img) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }

  // Countdown timer
  const countdownEl = document.getElementById('countdown');
  if (countdownEl) {
    let hours = 5, minutes = 32, seconds = 45;
    setInterval(function() {
      if (seconds > 0) { seconds--; }
      else if (minutes > 0) { minutes--; seconds = 59; }
      else if (hours > 0) { hours--; minutes = 59; seconds = 59; }
      const h = String(hours).padStart(2, '0');
      const m = String(minutes).padStart(2, '0');
      const s = String(seconds).padStart(2, '0');
      countdownEl.textContent = h + ':' + m + ':' + s;
    }, 1000);
  }

  // Navbar collapse on link click (mobile)
  const navLinks = document.querySelectorAll('.navbar-collapse .nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  if (navbarCollapse && typeof bootstrap !== 'undefined') {
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse && navbarCollapse.classList.contains('show')) {
          bsCollapse.hide();
        }
      });
    });
  }

  // Push notification prompt (demo)
  const notifyBtn = document.getElementById('notifyBtn');
  if (notifyBtn) {
    notifyBtn.addEventListener('click', function(e) {
      e.preventDefault();
      alert('Thanks for subscribing! You will receive the latest deals and offers.');
    });
  }

})();
