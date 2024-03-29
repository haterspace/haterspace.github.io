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
function offsetCount(value) {
  return progressRingLength - (value / 100) * progressRingLength;
}

// Функциональность для инпута при вводе значения
function progress() {
  const offset = offsetCount(progressChangeInput.value);
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
function progressAnimation() {
  circle.style.strokeDashoffset = offsetCount(progressChangeInput.value);

  animationSwitcher.checked
    ? (circle.style.animation = 'progress-animation 2s linear infinite')
    : (circle.style.animation = 'none');
}

animationSwitcher.addEventListener('change', () => {
  progressAnimation();
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
