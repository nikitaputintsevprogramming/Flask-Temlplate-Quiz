  function adjustFontSize() {
    const labels = document.querySelectorAll('.responsive-label');
    let maxHeight = 100;
    
    // Находим максимальную высоту метки
    labels.forEach(label => {
      const labelHeight = label.clientHeight;
      maxHeight = Math.max(maxHeight, labelHeight);
    });

    // Рассчитываем размер шрифта на основе максимальной высоты метки
    const parentHeight = labels[0].parentElement.clientHeight; // Берем высоту контейнера первой метки
    const ratio = parentHeight / maxHeight;
    
    // Устанавливаем минимальный и максимальный размер шрифта
    const minFontSize = 12; // Минимальный размер шрифта в пикселях
    const maxFontSize = 100; // Максимальный размер шрифта в пикселях

    let newFontSize = Math.max(minFontSize, Math.min(maxFontSize, 16 * ratio));

    // Устанавливаем одинаковый размер шрифта для всех меток
    labels.forEach(label => {
      label.style.fontSize = `${newFontSize}px`;
    });
  }

  // Регулировка размера шрифта при загрузке страницы
  window.addEventListener('load', adjustFontSize);

  // Регулировка размера шрифта при изменении размера окна
  window.addEventListener('resize', adjustFontSize);
