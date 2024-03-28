const circle = document.querySelector('.progressRing');
const progressChangeInput = document.querySelector('.progressChangeInput');
const animationSwitcher = document.querySelector(
  '.animationSwitch input[type="checkbox"]'
);
const hideSwitcher = document.querySelector(
  '.hideSwitch input[type="checkbox"]'
);
const mainCircle = document.querySelector('.mainCircle');

const radius = circle.getAttribute('r');
const progressRingLength = Math.PI * radius * 2;

// Длина прогресса
circle.style.strokeDasharray = `${progressRingLength} ${progressRingLength}`;
circle.style.strokeDashoffset = progressRingLength;

// Функциональность для инпута при вводе значения
function progress(value) {
  const offset = progressRingLength - (value / 100) * progressRingLength;
  circle.style.strokeDashoffset = offset;
}

progressChangeInput.addEventListener('input', () => {
  let value = parseInt(progressChangeInput.value);
  if (isNaN(value) || value < 0) {
    value = 0;
  } else if (value > 100) {
    value = 100;
  }
  progressChangeInput.value = value;
  progress(value);
});

// Функциональность для анимации
let progressValue = 0;
let animationTimeout;

function progressAnimation() {
  progressValue++;
  if (progressValue > 100) {
    progressValue = 1;
    setTimeout(() => {
      progressAnimation();
    }, 1000);
    return;
  }

  const offset =
    progressRingLength - (progressValue / 100) * progressRingLength;
  circle.style.strokeDashoffset = offset;

  if (animationSwitcher.checked) {
    animationTimeout = requestAnimationFrame(progressAnimation);
  }
}

animationSwitcher.addEventListener('change', () => {
  if (animationSwitcher.checked) {
    progressAnimation();
  } else {
    cancelAnimationFrame(animationTimeout);
  }
});

// Функциональность для скрытия
hideSwitcher.addEventListener('change', () => {
  if (hideSwitcher.checked) {
    circle.style.display = 'none';
    mainCircle.style.display = 'none';
  } else {
    circle.style.display = 'block';
    mainCircle.style.display = 'block';
  }
});
