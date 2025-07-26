const headings = document.querySelectorAll('.heading');
let currentStep = 0;
let isScrolling = false;

// Show one heading
function showHeading(step) {
  if (headings[step]) {
    headings[step].classList.add('show');
  }
}

// Hide one heading
function hideHeading(step) {
  if (headings[step]) {
    headings[step].classList.remove('show');
  }
}

// Debounce scrolling
function debounceScroll(callback) {
  if (isScrolling) return;
  isScrolling = true;
  callback();
  setTimeout(() => {
    isScrolling = false;
  }, 1500); // matches CSS transition duration
}

// Mouse/Trackpad scroll
window.addEventListener('wheel', (e) => {
  debounceScroll(() => {
    if (e.deltaY > 0 && currentStep < headings.length) {
      showHeading(currentStep);
      currentStep++;
    } else if (e.deltaY < 0 && currentStep > 0) {
      currentStep--;
      hideHeading(currentStep);
    }
  });
});

// Touch scroll (swipe up/down)
let touchStartY = 0;

window.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
});

window.addEventListener('touchend', (e) => {
  const touchEndY = e.changedTouches[0].clientY;
  const deltaY = touchStartY - touchEndY;

  if (Math.abs(deltaY) < 30) return; // ignore very small swipes

  debounceScroll(() => {
    if (deltaY > 0 && currentStep < headings.length) {
      showHeading(currentStep); // swipe up
      currentStep++;
    } else if (deltaY < 0 && currentStep > 0) {
      currentStep--;
      hideHeading(currentStep); // swipe down
    }
  });
});
