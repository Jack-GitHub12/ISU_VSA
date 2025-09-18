// Optimized scroll and animation performance script
(function() {
  'use strict';

  if (typeof window !== 'undefined') {
    // Throttle helper
    function throttle(func, wait) {
      let timeout;
      let lastTime = 0;
      return function() {
        const now = Date.now();
        const remaining = wait - (now - lastTime);
        const context = this;
        const args = arguments;

        if (remaining <= 0 || remaining > wait) {
          if (timeout) {
            clearTimeout(timeout);
            timeout = null;
          }
          lastTime = now;
          func.apply(context, args);
        } else if (!timeout) {
          timeout = setTimeout(function() {
            lastTime = Date.now();
            timeout = null;
            func.apply(context, args);
          }, remaining);
        }
      };
    }

    // Optimize scroll performance
    let scrollTimeout;
    let ticking = false;

    function handleScroll() {
      if (!document.body.classList.contains('is-scrolling')) {
        document.body.classList.add('is-scrolling');
      }

      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(function() {
        document.body.classList.remove('is-scrolling');
      }, 150);
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    }

    // Add passive listeners for better performance
    window.addEventListener('scroll', throttle(onScroll, 100), { passive: true });
    window.addEventListener('touchmove', onScroll, { passive: true });

    // Intersection Observer for animations
    if ('IntersectionObserver' in window) {
      const animationObserver = new IntersectionObserver(
        function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              // Add staggered animation
              const delay = entry.target.dataset.animateDelay || 0;
              setTimeout(function() {
                entry.target.classList.add('animate-in');
              }, delay * 100);
              animationObserver.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: '50px',
          threshold: 0.1
        }
      );

      // Observe animated elements
      document.addEventListener('DOMContentLoaded', function() {
        const animatedElements = document.querySelectorAll('[data-animate]');
        animatedElements.forEach(function(el, index) {
          el.dataset.animateDelay = index % 3; // Stagger animations
          animationObserver.observe(el);
        });

        // Optimize cards
        const cards = document.querySelectorAll('.card, .card-hover-3d');
        cards.forEach(function(card) {
          card.style.willChange = 'transform';
          card.style.transform = 'translateZ(0)';
        });

        // Optimize gradient animations
        const gradients = document.querySelectorAll('.fun-text, .gradient-text, .animate-gradient');
        gradients.forEach(function(el) {
          el.style.willChange = 'background-position';
          el.style.transform = 'translateZ(0)';
        });
      });
    }

    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', function() {
      const animations = document.querySelectorAll('[style*="animation"], .fun-text, .animate-gradient');
      if (document.hidden) {
        animations.forEach(function(el) {
          el.style.animationPlayState = 'paused';
        });
      } else {
        animations.forEach(function(el) {
          el.style.animationPlayState = 'running';
        });
      }
    });

    // Reduce motion for users who prefer it
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
      document.documentElement.classList.add('reduce-motion');
    }

    // Optimize parallax effects
    let parallaxElements = [];

    document.addEventListener('DOMContentLoaded', function() {
      parallaxElements = document.querySelectorAll('.parallax-layer');
    });

    function updateParallax() {
      const scrolled = window.pageYOffset;
      const speed = 0.5;

      parallaxElements.forEach(function(el) {
        const yPos = -(scrolled * speed);
        el.style.transform = 'translate3d(0, ' + yPos + 'px, 0)';
      });
    }

    if (parallaxElements.length > 0) {
      window.addEventListener('scroll', throttle(updateParallax, 16), { passive: true });
    }
  }
})();