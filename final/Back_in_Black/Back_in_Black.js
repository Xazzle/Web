// Получаем элементы переключателя темы и контейнера для темы
const themeToggle = document.querySelector('.theme-toggle');
const themeCircles = document.querySelectorAll('.theme-circle');
const body = document.body;
const albumContainer = document.querySelector('.album-container');
const backArrow = document.querySelector('.back-arrow'); // Стрелка назад

// Функция для включения светлой или тёмной темы
function applyTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark-theme');
    body.classList.remove('light-theme');
    albumContainer.style.backgroundColor = '#333'; // Серый фон для контейнера альбома
    albumContainer.style.color = '#fff'; // Белый текст для контейнера альбома
    backArrow.classList.add('dark-theme'); // Добавляем темную тему для стрелки
    backArrow.classList.remove('light-theme');
  } else {
    body.classList.add('light-theme');
    body.classList.remove('dark-theme');
    albumContainer.style.backgroundColor = '#fff'; // Светлый фон для контейнера альбома
    albumContainer.style.color = '#000'; // Черный текст для контейнера альбома
    backArrow.classList.add('light-theme'); // Добавляем светлую тему для стрелки
    backArrow.classList.remove('dark-theme');
  }
  // Сохраняем выбранную тему в localStorage
  localStorage.setItem('theme', theme);
}

// Проверяем, есть ли сохранённая тема в localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  // Если тема не сохранена, по умолчанию выбираем светлую
  applyTheme('light');
}

// Добавляем обработчики событий на кнопки переключения темы
themeCircles.forEach(circle => {
  circle.addEventListener('click', () => {
    if (circle.classList.contains('light')) {
      applyTheme('light');
    } else {
      applyTheme('dark');
    }
  });
});

// Получаем все кнопки воспроизведения
const playButtons = document.querySelectorAll('.play-button');

// Создаем аудио-объект для воспроизведения песен
const audio = new Audio();

// Массив песен с путями к файлам
const songs = {
  "Party Monster": "music/Music/Party Monster.mp3",
  "False Alarm": "music/StarboyMusic/FalseAlarm.mp3",
  "Reminder": "music/StarboyMusic/Reminder.mp3",
  "Rockin'": "music/StarboyMusic/Rockin.mp3"
};

// Переменная для отслеживания текущей песни
let currentSong = null;

// Добавляем обработчики событий для каждой кнопки
playButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const songTitle = button.previousElementSibling.textContent; // Получаем название песни
    const songSrc = songs[songTitle]; // Находим путь к песне в массиве

    // Если выбрана новая песня
    if (currentSong !== songSrc) {
      currentSong = songSrc; // Сохраняем текущую песню
      audio.src = songSrc; // Устанавливаем новый источник
      audio.play(); // Воспроизводим песню
      updateButtons(button); // Обновляем состояние кнопок
    } else {
      // Если песня уже выбрана
      if (audio.paused) {
        audio.play(); // Продолжаем воспроизведение
        updateButtons(button);
      } else {
        audio.pause(); // Ставим на паузу
        resetButtons(); // Сбрасываем кнопки
      }
    }
  });
});

// Обновление состояния кнопок (▶ → ❚❚)
function updateButtons(button) {
  resetButtons(); // Сбрасываем все кнопки
  button.textContent = "❚❚"; // Устанавливаем значок паузы
}

// Сброс всех кнопок в состояние "▶"
function resetButtons() {
  playButtons.forEach(button => (button.textContent = "▶"));
}

// Слушаем завершение аудио
audio.addEventListener('ended', () => {
  resetButtons(); // Сбрасываем кнопки, когда песня закончится
  currentSong = null; // Сбрасываем текущую песню
});

// Обработка клика на сердечке
const heart = document.querySelector('.heart');

// Проверяем, если у нас сохранён статус "нравится" в localStorage
const liked = localStorage.getItem('liked') === 'true';

// Выводим информацию в консоль для отладки
console.log('Liked from storage:', liked);

if (liked) {
  heart.classList.add('liked'); // Если сохранён статус как "нравится", то ставим красное сердечко
}

// При клике на сердечко меняем его цвет
heart.addEventListener('click', () => {
  heart.classList.toggle('liked'); // Переключаем класс liked

  const isLiked = heart.classList.contains('liked');
  console.log('Heart clicked, liked:', isLiked); // Выводим информацию о текущем состоянии

  localStorage.setItem('liked', isLiked); // Сохраняем статус в localStorage
});
