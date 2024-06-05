function validateForm() {
    let isValid = false;

    // Список полей ввода
    const fields = ['name', 'surname', 'email', 'phone'];
    fields.forEach(field => {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
            input.style.borderColor = 'red';
            isValid = false;
        } else {
            input.style.borderColor = '#ccc'; // Исходный цвет границы
            isValid = true;
        }
    });

    // Проверка чекбокса
    const checkbox = document.getElementById('check');
    const checkmark = document.querySelector('.checkmark');
    if (!checkbox.checked) {
        checkmark.style.backgroundColor = 'red';
        setTimeout(() => {
            checkmark.style.backgroundColor = '#F2F7FB'; // Исходный цвет фона
        }, 1000);
        isValid = false;
    }
    else
    {
        isValid = true;
    }

    return isValid;
}

function CheckForm(addr) {
    if (validateForm()) {
        GetFormData(addr);
    } else {
        // Подсветка незаполненных полей и чекбокса красным на 1 секунду
        const fields = ['name', 'surname', 'email', 'phone'];
        fields.forEach(field => {
            const input = document.getElementById(field);
            if (!input.value.trim()) {
                input.style.borderColor = 'red';
                setTimeout(() => {
                    input.style.borderColor = '#ccc'; // Возвращаем исходный цвет границы
                }, 1000);
            }
        });

        const checkbox = document.getElementById('check');
        const checkmark = document.querySelector('.checkmark');
        if (!checkbox.checked) {
            checkmark.style.backgroundColor = 'red';
            setTimeout(() => {
                checkmark.style.backgroundColor = '#F2F7FB'; // Возвращаем исходный цвет фона
            }, 1000);
        }
    }
}

// Подключаем функцию к кнопке
document.querySelector('.send_button img').addEventListener('click', () => {
    CheckForm("/getFormData");
});
