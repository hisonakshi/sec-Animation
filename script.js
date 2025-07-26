const headings = document.querySelectorAll('.heading');
let currentStep = 0;
let isScrolling = false;

function showHeading(step) {
  if (headings[step]) {
    headings[step].classList.add('show');
  }
}

function hideHeading(step) {
  if (headings[step]) {
    headings[step].classList.remove('show');
  }
}

function handleScroll(direction) {
  if (isScrolling) return;

  isScrolling = true;

  if (direction === 'down' && currentStep < headings.length) {
    showHeading(currentStep);
    currentStep++;
  } else if (direction === 'up' && currentStep > 0) {
    currentStep--;
    hideHeading(currentStep);
  }

  setTimeout(() => {
    isScrolling = false;
  }, 1500); // Match CSS transition duration
}

// Mouse scroll (desktop)
window.addEventListener('wheel', (e) => {
  handleScroll(e.deltaY > 0 ? 'down' : 'up');
});

// Touch scroll (mobile)
let touchStartY = 0;

window.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
});

window.addEventListener('touchend', (e) => {
  const touchEndY = e.changedTouches[0].clientY;
  const deltaY = touchStartY - touchEndY;

  if (Math.abs(deltaY) > 30) {
    handleScroll(deltaY > 0 ? 'down' : 'up');
  }
});
