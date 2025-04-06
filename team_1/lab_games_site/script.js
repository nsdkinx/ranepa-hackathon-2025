let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');

// Функция для отображения следующего слайда
function showNextSlide() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % totalSlides;
  slides[currentSlide].classList.add('active');
}

// Функция для отображения предыдущего слайда
function showPrevSlide() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  slides[currentSlide].classList.add('active');
}

// Автоматическая прокрутка слайдов каждые 5 секунд
setInterval(showNextSlide, 5000);

// Обработчики событий для стрелок
prevButton.addEventListener('click', showPrevSlide);
nextButton.addEventListener('click', showNextSlide);