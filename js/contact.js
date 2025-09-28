// Contact page: simple form reveal on scroll
document.addEventListener('DOMContentLoaded', function () {
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0;
  }

  function handleScrollAnimation() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    if (isInViewport(form)) {
      form.style.opacity = '1';
      form.style.transform = 'translateY(0)';
    }
  }

  handleScrollAnimation();
  window.addEventListener('scroll', handleScrollAnimation);
});

