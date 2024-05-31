function GetFormData(addr) {
    $.ajax({
        type: 'GET', //тип запроса
        url: addr, // адрес, на который отправлен запрос
        dataType: 'json', //тип данных, ожидаемый от сервера
        conectType:'application/json', //тип передаваемых данных
        data:{ //данные запроса
            "fio": document.getElementById("fio").value,
            "email": document.getElementById("email").value,
            "phone": document.getElementById("phone").value
        },      
        success: function (response)
        {
            console.log(response)
        }
    });
    SetQuestion("/getQuestionData")
}

function SetQuestion(addr) {
    fetch('/static/js/questions.json')
    
    .then(response => response.json())
    .then(data => {
        const questions = data.questions;
        const randomIndex = Math.floor(Math.random() * questions.length);
        const randomQuestion = questions[randomIndex];

        $.ajax({
            type: 'GET', //тип запроса
            url: addr, // адрес, на который отправлен запрос
            dataType: 'json', //тип данных, ожидаемый от сервера
            conectType:'application/json', //тип передаваемых данных
            data:{ //данные запроса
                "question": randomQuestion.text,
                "answer1":  randomQuestion.options["A"],
                "answer2":  randomQuestion.options["B"],
                "answer3":  randomQuestion.options["C"],
                "answer4":  randomQuestion.options["D"],
            },      
            success: function (response)
            {
                console.log(response)
            }  
        });
    })
    .catch(error => console.error('Ошибка при загрузке файла:', error));     
}

// function RandomQuestion() {
//     fetch('/static/js/questions.json')
    
//     .then(response => response.json())
//     .then(data => {
//         const questions = data.questions;
//         const randomIndex = Math.floor(Math.random() * questions.length);
//         const randomQuestion = questions[randomIndex];

//         // console.log('Всего вопросов:', questions.length);
//         // for (let index = 0; index < questions.length; index++) {
//         //     console.log('Вопрос номер :', index , questions[index].text);
            
//         // }
//         // console.log('Случайный вопрос:', randomQuestion.text);
//         // console.log('Варианты ответов:', randomQuestion.options);
//         // console.log('Вариант A:', randomQuestion.options["A"]);

//         questionLabel = document.getElementById('question');
//         questionLabel.innerHTML = randomQuestion.text
//         var questionLabel = document.getElementById('option1');
//         questionLabel.innerHTML = randomQuestion.options["A"]
//         var questionLabel = document.getElementById('option2');
//         questionLabel.innerHTML = randomQuestion.options["B"]
//         var questionLabel = document.getElementById('option3');
//         questionLabel.innerHTML = randomQuestion.options["C"]
//         var questionLabel = document.getElementById('option4');
//         questionLabel.innerHTML = randomQuestion.options["D"]
//     })
//     .catch(error => console.error('Ошибка при загрузке файла:', error));    
// }