document.addEventListener('DOMContentLoaded', function() {
  // make the progress bars start at 0%
  const progressBars = document.querySelectorAll('.progress-bar');
  progressBars.forEach(bar => {
    bar.style.width = '0%';
    bar.textContent = '0%';
  });

  // fade-in effect for sections
  const fadeInSections = document.querySelectorAll('.fade-in-section');
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
       
        setTimeout(() => {
          entry.target.classList.add('is-visible');
          
          if (entry.target.id === 'skills') {
            animatePercentages();
          }
          
          fadeInObserver.unobserve(entry.target);
        }, 200); 
      }
    });
  }, { 
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px' 
  });
  
  fadeInSections.forEach(section => {
    fadeInObserver.observe(section);
  });

  // image modal functionality
  const projectImages = document.querySelectorAll('.card-img-top');
  const modalImage = document.getElementById('modalImage');
  const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));

  projectImages.forEach(image => {
    image.addEventListener('click', () => {
      modalImage.src = image.src;
      projectModal.show();
    });
  });
// animate progress bars on scroll
  function animatePercentages() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
      const targetWidth = bar.getAttribute('aria-valuenow'); // Get target from aria value
      let currentWidth = 0;
      const duration = 3000; // 3 miliseconds total
      const startTime = performance.now();
      
      function updateProgress(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easedProgress = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        currentWidth = easedProgress * targetWidth;
        
        bar.style.width = currentWidth + '%';
        bar.textContent = Math.round(currentWidth) + '%';
        
        if (progress < 1) {
          requestAnimationFrame(updateProgress);
        }
      }
      
      requestAnimationFrame(updateProgress);
    });
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      scrollToTopBtn.style.display = 'block';
    } else {
      scrollToTopBtn.style.display = 'none';
    }
  });

  // Scroll to the top when the button is clicked
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});