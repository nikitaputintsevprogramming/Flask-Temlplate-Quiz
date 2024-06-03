function adjustFontSize() {
  const labels = document.querySelectorAll('.responsive-label');
  let maxTextWidth = 0;
  let maxHeight = 0;

  // Находим максимальную ширину текста и высоту метки
  labels.forEach(label => {
    const labelWidth = label.textContent.length;
    const labelHeight = label.clientHeight;
    maxTextWidth = Math.max(maxTextWidth, labelWidth);
    maxHeight = Math.max(maxHeight, labelHeight);
  });

  // Рассчитываем размер шрифта на основе минимального соотношения ширины и высоты
  const parentWidth = labels[0].parentElement.clientWidth; // Берем ширину контейнера первой метки
  const parentHeight = labels[0].parentElement.clientHeight; // Берем высоту контейнера первой метки
  const widthRatio = parentWidth / maxTextWidth;
  const heightRatio = parentHeight / maxHeight;
  const ratio = Math.min(widthRatio, heightRatio);

  // Устанавливаем минимальный и максимальный размер шрифта
  const minFontSize = 12; // Минимальный размер шрифта в пикселях
  const maxFontSize = 50; // Максимальный размер шрифта в пикселях
  const baseFontSize = 16; // Базовый размер шрифта в пикселях

  let newFontSize = Math.max(minFontSize, Math.min(maxFontSize, baseFontSize * ratio));

  // Дополнительная проверка для больших текстов
  if (maxTextWidth > parentWidth || maxHeight > parentHeight) {
    // Ограничиваем размер шрифта
    newFontSize = Math.min(newFontSize, minFontSize * (parentWidth / maxTextWidth));
  }

  // Устанавливаем одинаковый размер шрифта для всех меток
  labels.forEach(label => {
    label.style.fontSize = `${newFontSize/2.2}px`;
  });
  console.log(newFontSize);

}

// Регулировка размера шрифта при загрузке страницы
window.addEventListener('load', adjustFontSize);

// Регулировка размера шрифта при изменении размера окна
window.addEventListener('resize', adjustFontSize);


function adjustFontSizeById(questionId) {
  const label = document.getElementById(questionId);
  if (!label) return;

  const labelWidth = label.textContent.length;
  const labelHeight = label.clientHeight;

  const parent = label.parentElement;
  const parentWidth = parent.clientWidth;
  const parentHeight = parent.clientHeight;
  const widthRatio = parentWidth / labelWidth;
  const heightRatio = parentHeight / labelHeight;
  const ratio = Math.min(widthRatio, heightRatio);

  const minFontSize = 12;
  const maxFontSize = 50;
  const baseFontSize = 16;

  let newFontSize = Math.max(minFontSize, Math.min(maxFontSize, baseFontSize * ratio));

  if (labelWidth > parentWidth || labelHeight > parentHeight) {
    newFontSize = Math.min(newFontSize, minFontSize * (parentWidth / labelWidth));
  }

  label.style.fontSize = `${newFontSize/2.2}px`;
  console.log(newFontSize);
}

// Регулировка размера шрифта при загрузке страницы для одного вопроса по id
window.addEventListener('load', () => adjustFontSizeById('question'));

// Регулировка размера шрифта при изменении размера окна для одного вопроса по id
window.addEventListener('resize', () => adjustFontSizeById('question'));
