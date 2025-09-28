// Home page animations
document.addEventListener('DOMContentLoaded', function () {
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0;
  }

  function handleScrollAnimation() {
    const aboutContent = document.querySelector('.about-content');
    const gridItems = document.querySelectorAll('.grid-item');

    if (aboutContent && isInViewport(aboutContent)) {
      aboutContent.classList.add('visible');
    }

    gridItems.forEach((item, index) => {
      if (isInViewport(item)) {
        setTimeout(() => {
          item.classList.add('visible');
        }, 100 * index);
      }
    });
  }

  handleScrollAnimation();
  window.addEventListener('scroll', handleScrollAnimation);
});

