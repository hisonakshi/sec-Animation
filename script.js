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

window.addEventListener('wheel', (e) => {
  if (isScrolling) return;

  isScrolling = true;

  if (e.deltaY > 0 && currentStep < headings.length) {
    // Scroll down
    showHeading(currentStep);
    currentStep++;
  } else if (e.deltaY < 0 && currentStep > 0) {
    // Scroll up
    currentStep--;
    hideHeading(currentStep);
  }

  // Control scroll timing to avoid multiple triggers
  setTimeout(() => {
    isScrolling = false;
  }, 1500); // should match CSS transition (1s)
});
