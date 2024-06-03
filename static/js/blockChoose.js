function blockChoosen()
{
    document.querySelectorAll('.answer-block').forEach(block => {
        block.addEventListener('click', () => {
          // Снимаем выбор со всех блоков
          document.querySelectorAll('.answer-block').forEach(block => {
            block.classList.remove('selected');
          });
    
          // Добавляем выбор к текущему блоку
          block.classList.add('selected');
    
          // Ставим соответствующую радио-кнопку в выбранное состояние
          const radioId = block.getAttribute('data-radio');
          document.getElementById(radioId).checked = true;
        });
      });
    
      // Добавляем стили для выделенного блока
      const style = document.createElement('style');
      style.innerHTML = `
        .answer-block.selected {
          border: 2px solid blue;
          background-color: lightblue;
        }
      `;
      document.head.appendChild(style);
}

  window.addEventListener('load', blockChoosen);
