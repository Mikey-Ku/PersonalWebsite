// Experience page: modal + scroll animation
(function () {
  // Expose modal functions for inline onclick usage
  window.openModal = function (src) {
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImage');
    if (!modal || !modalImg) return;
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
    modalImg.src = src;
  };

  window.closeModal = function () {
    const modal = document.getElementById('photoModal');
    if (!modal) return;
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 400);
  };

  // Close modal when clicking outside
  window.addEventListener('click', function (event) {
    const modal = document.getElementById('photoModal');
    if (modal && event.target === modal) {
      window.closeModal();
    }
  });

  // Close modal on Escape
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      window.closeModal();
    }
  });

  // Scroll animations
  document.addEventListener('DOMContentLoaded', function () {
    const experienceElements = document.querySelectorAll('.experience-content');

    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 && rect.bottom >= 0;
    }

    function handleScrollAnimation() {
      experienceElements.forEach((item, index) => {
        if (isInViewport(item)) {
          setTimeout(() => {
            item.classList.add('visible');
          }, 150 * index);
        }
      });
    }

    handleScrollAnimation();
    window.addEventListener('scroll', handleScrollAnimation);
  });
})();

