// Projects page: filters, details, gallery, modal, back-to-top
(function () {
  // Expose gallery + modal functions for inline onclick usage
  window.changeDetailMedia = function (elementId, mediaSource, isVideo) {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Update the active thumbnail
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    // Rely on implicit global `event` from inline handler context
    try { if (event && event.currentTarget) event.currentTarget.classList.add('active'); } catch (_) {}

    if (isVideo) {
      if (element.tagName === 'VIDEO') {
        element.src = mediaSource;
        element.load();
      } else {
        const parent = element.parentNode;
        const video = document.createElement('video');
        video.id = elementId;
        video.src = mediaSource;
        video.controls = true;
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        parent.replaceChild(video, element);
      }
    } else {
      if (element.tagName === 'VIDEO') {
        const parent = element.parentNode;
        const img = document.createElement('img');
        img.id = elementId;
        img.src = mediaSource;
        img.alt = 'Project media';
        parent.replaceChild(img, element);
      } else {
        element.src = mediaSource;
      }
    }
  };

  window.openMediaModal = function (elementId) {
    const modal = document.getElementById('photoModal');
    const modalContent = document.getElementById('modalImage');
    const element = document.getElementById(elementId);
    if (!modal || !modalContent || !element) return;

    modal.style.display = 'flex';

    if (element.tagName === 'VIDEO') {
      const modalVideo = document.createElement('video');
      modalVideo.src = element.src;
      modalVideo.controls = true;
      modalVideo.autoplay = true;
      modalVideo.className = 'modal-content';
      modalVideo.id = 'modalImage';
      modalContent.parentNode.replaceChild(modalVideo, modalContent);
    } else {
      const modalImg = document.getElementById('modalImage');
      if (modalImg.tagName !== 'IMG') {
        const img = document.createElement('img');
        img.className = 'modal-content';
        img.id = 'modalImage';
        img.src = element.src;
        modalImg.parentNode.replaceChild(img, modalImg);
      } else {
        modalImg.src = element.src;
      }
    }

    setTimeout(() => modal.classList.add('show'), 10);
  };

  window.closeModal = function () {
    const modal = document.getElementById('photoModal');
    const modalContent = document.getElementById('modalImage');
    if (!modal || !modalContent) return;
    if (modalContent.tagName === 'VIDEO') {
      try { modalContent.pause(); } catch (_) {}
    }
    modal.classList.remove('show');
    setTimeout(() => { modal.style.display = 'none'; }, 400);
  };

  // Page setup after DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    // Filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    const softwareSection = document.getElementById('software');
    const electricalSection = document.getElementById('electrical');

    function setFilterActive(target) {
      filterButtons.forEach(btn => {
        const isActive = btn === target;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
    }

    function applyFilter(mode) {
      if (!softwareSection || !electricalSection) return;
      const showAll = mode === 'all';
      softwareSection.style.display = (showAll || mode === 'software') ? 'block' : 'none';
      electricalSection.style.display = (showAll || mode === 'electrical') ? 'block' : 'none';
      if (mode === 'software') softwareSection.scrollIntoView({ behavior: 'smooth' });
      else if (mode === 'electrical') electricalSection.scrollIntoView({ behavior: 'smooth' });
    }

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-filter');
        setFilterActive(btn);
        applyFilter(mode);
      });
    });

    // Learn more → details
    const learnMoreButtons = document.querySelectorAll('.learn-more');
    const projectDetails = document.querySelectorAll('.project-details');
    const closeButtons = document.querySelectorAll('.close-details');

    learnMoreButtons.forEach(button => {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        const projectId = this.getAttribute('data-project');
        projectDetails.forEach(detail => detail.classList.remove('active'));
        const targetDetail = document.querySelector(`.project-details[data-project="${projectId}"]`);
        if (targetDetail) {
          targetDetail.classList.add('active');
          targetDetail.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    closeButtons.forEach(button => {
      button.addEventListener('click', function () {
        const parentDetails = this.closest('.project-details');
        if (parentDetails) parentDetails.classList.remove('active');
        const section = document.getElementById('projects');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Close media modal when clicking outside
    window.addEventListener('click', function (evt) {
      const modal = document.getElementById('photoModal');
      if (modal && evt.target === modal) window.closeModal();
    });

    // Close any active details on Escape
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        projectDetails.forEach(detail => detail.classList.remove('active'));
        window.closeModal();
      }
    });

    // Back to top visibility and click
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
      window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) backToTopButton.classList.add('visible');
        else backToTopButton.classList.remove('visible');
      });
      backToTopButton.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Fade-in animation for grid items
    const projectPreviews = document.querySelectorAll('.project-preview');
    projectPreviews.forEach((preview, index) => {
      setTimeout(() => preview.classList.add('visible'), 100 * (index + 1));
    });

    // Initial filter from hash
    const hash = window.location.hash.replace('#', '');
    const initialBtn = Array.from(filterButtons).find(b => b.getAttribute('data-filter') === hash);
    if (initialBtn) {
      setFilterActive(initialBtn);
      applyFilter(hash);
    }
  });
})();

