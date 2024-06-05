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


// Сохранение данных формы в localStorage
function saveFormData() {
    const fields = ['name', 'surname', 'email', 'phone'];
    fields.forEach(field => {
        localStorage.setItem(field, document.getElementById(field).value);
    });
    localStorage.setItem('check', document.getElementById('check').checked);
}

// Восстановление данных формы из localStorage
function loadFormData() {
    const fields = ['name', 'surname', 'email', 'phone'];
    fields.forEach(field => {
        if (localStorage.getItem(field)) {
            document.getElementById(field).value = localStorage.getItem(field);
        }
    });
    if (localStorage.getItem('check') === 'true') {
        document.getElementById('check').checked = true;
    }
}

// Сохраняем данные формы перед переходом по ссылке
document.querySelector('#Soglasiye a').addEventListener('click', saveFormData);

// Загружаем данные формы при загрузке страницы
window.onload = function() {
    if (document.referrer.includes('/privacy')) {
        loadFormData();
    } else {
        // Очистка данных при первоначальной загрузке
        localStorage.removeItem('name');
        localStorage.removeItem('surname');
        localStorage.removeItem('email');
        localStorage.removeItem('phone');
        localStorage.removeItem('check');
    }
};