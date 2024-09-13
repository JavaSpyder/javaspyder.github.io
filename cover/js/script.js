const accents = ['rgb(', 'rgb('],
  colorAmounts = [],
  accentType = 1;

let main,
  scrollContent,
  projects,
  slideshowImages,
  currentSlideshowImageIndex;

for (x = 1; x <= 3; x++) {
  let colorLimits = (Math.round(Math.random()) == 0 || colorAmounts[0] < 100 || colorAmounts[1] < 100) ? { min: 120, max: 255 } : { min: 0, max: 100 },
    colorAmount = Math.floor(Math.random() * (colorLimits.max - colorLimits.min + 1) + colorLimits.min);
  colorAmounts.push(colorAmount);
  accents[0] += colorAmount + (x == 3 ? ')' : ', ');
}

switch (accentType) {
  case 0:
    accents[1] += (colorAmounts[1] * 0.8) + ', ' + (colorAmounts[2] * 0.8) + ', '
      + (colorAmounts[0] * 0.8) + ')';
    break;
  case 1:
    accents[1] += (colorAmounts[2] * 0.8) + ', ' + (colorAmounts[0] * 0.8) + ', ' + (colorAmounts[1] * 0.8) + ')';
    break;
  case 2:
    accents[1] += Math.max(colorAmounts[0] * 0.7, 0) + ', ' + Math.max(colorAmounts[1] * 0.7, 0) + ', '
      + Math.max(colorAmounts[2] * 0.7, 0) + ')';
    break;
}

document.onreadystatechange = () => {
  let header = document.getElementsByTagName('header')[0],
    headerBig = header.children[0],
    headerLine = headerBig.children[0],
    sectionHeaders = document.getElementsByTagName('h2');

  main = document.getElementsByTagName('main')[0];
  scrollContent = document.getElementsByClassName('simplebar-scroll-content')[0];
  scrollContent.addEventListener('scroll', checkForProjectSection);
  projects = document.getElementsByClassName('projects')[0];
  slideshowImages = document.querySelectorAll('.slideshow a');
  currentSlideshowImageIndex = 0;

  header.classList.add('animate');
  setTimeout(function () {
    main.classList.add('animate');
  }, 400);

  headerBig.style.textShadow = '2px -2px 0px ' + accents[0] + ', -2px 2px 0px ' + accents[1];
  headerLine.style.backgroundColor = accents[0];
  main.style.borderColor = accents[0];
  for (let i = 0; i < sectionHeaders.length; i++) {
    sectionHeaders[i].style.color = accents[1];
  }

  scrollContent.scrollTop = 0;
}

function checkForProjectSection() {
  let diff = scrollContent.scrollTop - projects.offsetTop;
  if (diff <= -40 || diff >= 400) main.classList.remove('extended');
  else main.classList.add('extended');
}

function changeImg(d) {
  currentSlideshowImageIndex += d;
  if (currentSlideshowImageIndex === slideshowImages.length) currentSlideshowImageIndex = 0;
  if (currentSlideshowImageIndex === -1) currentSlideshowImageIndex = slideshowImages.length - 1;
  document.querySelector('.slideshow .active').classList.remove('active');
  setTimeout(() => {
    slideshowImages[currentSlideshowImageIndex].classList.add('active');
  }, 300);
}
