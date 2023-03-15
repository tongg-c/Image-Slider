const buttonPrevious = document.querySelector('.button-left');
const buttonNext = document.querySelector('.button-right');

const images = document.querySelector('.images');
const imagesChildren = images.children;
const amountOfImages = imagesChildren.length;

const circles = Array.from(document.querySelectorAll('.circle'));

let currentTranslateValue = 0;
let timeoutId;

const circleTranslateKey = circles.map((circle, index) => {
  return { index, translateValue: index * -600, circle };
});

const removeActiveClass = () => {
  circleTranslateKey.forEach(circleObject => {
    if (circleObject.circle.classList.contains('active')) {
      circleObject.circle.classList.remove('active');
    }
  });
};

const setActiveCircle = () => {
  const activeObject = circleTranslateKey.find(circleObject => {
    return circleObject.translateValue === currentTranslateValue;
  });
  removeActiveClass();
  activeObject.circle.classList.add('active');
};

const transitionImage = () => {
  images.style.transform = `translateX(${currentTranslateValue}px)`;
  images.classList.add('show');
};

circleTranslateKey.forEach(circleObject => {
  circleObject.circle.addEventListener('click', () => {
    removeActiveClass();
    circleObject.circle.classList.add('active');
    currentTranslateValue = circleObject.translateValue;
    transitionImage();
    clearTimeout(timeoutId);
    timeoutId = setTimeout(advanceImages, 5000);
  });
});

const removeShowClass = () => {
  if (images.classList.contains('show')) {
    images.classList.remove('show');
  }
};

const previous = () => {
  if (currentTranslateValue === 0) {
    currentTranslateValue = (amountOfImages - 1) * -600;
  } else currentTranslateValue += 600;

  removeShowClass();
  setActiveCircle();
  transitionImage();
  clearTimeout(timeoutId);
  timeoutId = setTimeout(advanceImages, 5000);
};

const next = () => {
  if (currentTranslateValue <= (amountOfImages - 1) * -600) {
    currentTranslateValue = 0;
  } else currentTranslateValue -= 600;

  removeShowClass();
  setActiveCircle();
  transitionImage();
  clearTimeout(timeoutId);
  timeoutId = setTimeout(advanceImages, 5000);
};

buttonPrevious.addEventListener('click', e => {
  previous();
});

buttonNext.addEventListener('click', e => {
  next();
});

const advanceImages = () => {
  next();
  clearTimeout(timeoutId);
  timeoutId = setTimeout(advanceImages, 5000);
};

timeoutId = setTimeout(advanceImages, 5000);

setActiveCircle();
