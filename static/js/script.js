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
    GetQuestion("/getQuestionData")
}

function GetQuestion(addr) {
    fetch('/static/js/questions.json')
    
    .then(response => response.json())
    .then(data => {
        const questions = data.questions;
        const randomIndex = Math.floor(Math.random() * questions.length);
        const randomQuestion = questions[randomIndex];

        answers = randomQuestion.options;
        for (let index = 0; index < answers.length; index++) {
            const element = answers[index];
            console.log(element);
        }

        $.ajax({
            type: 'GET', //тип запроса
            url: addr, // адрес, на который отправлен запрос
            dataType: 'json', //тип данных, ожидаемый от сервера
            conectType:'application/json', //тип передаваемых данных
            data:{ //данные запроса
                
                "question": randomQuestion.text,
                "answer1":  randomQuestion.options["A"],
                "correctAnswer": randomQuestion.options["A"],
                "answer2":  randomQuestion.options["B"],
                "answer3":  randomQuestion.options["C"],
                "answer4":  randomQuestion.options["D"],
            },      
            success: function (response)
            {
                console.log(response)
                window.open('http://192.168.31.24:5000/question', '_self')
            }  
        });
    })
    .catch(error => console.error('Ошибка при загрузке файла:', error));     
}

// function mixAnswers(answers){
//     for (let i = answers.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [answers[i], answers[j]] = [answers[j], answers[i]];
//         console.log(answers[i]);
//     }
// }

function CheckAnswer(addr) {
    selectedAnswer = null;
    for (let index = 1; index <= 4; index++) {
        let checkAnswer = document.getElementById('InputOption'+index);
        if(checkAnswer.checked){
            selectedAnswer = checkAnswer.value;
            continue;
        }
    }
    $.ajax({
        type: 'GET', //тип запроса
        url: addr, // адрес, на который отправлен запрос
        dataType: 'json', //тип данных, ожидаемый от сервера
        conectType:'application/json', //тип передаваемых данных
        data:{ //данные запроса
            'selectedAnswer': selectedAnswer,
        },      
        success: function (response)
        {
            console.log(response)
        }
    });
    GetQuestion("/getQuestionData")
}
   
    // let selectedAnswer = document.getElementById('InputOption1').checked;
    // console.log("Вы выбрали ответ:", selectedAnswer);
    // let question = document.getElementById("question").innerText;
    
    // $.ajax({
    //     type: 'POST',
    //     url: '/checkAnswer',
    //     dataType: 'json',
    //     contentType: 'application/json',
    //     data: JSON.stringify({
    //         "question": question,
    //         "selectedAnswer": selectedAnswer
    //     }),
    //     success: function(response) {
    //         if (response.correct) {
    //             alert('Правильный ответ!');
    //         } else {
    //             alert('Неправильный ответ. Правильный ответ: ' + response.correctAnswer);
    //         }
    //     },
    //     error: function(error) {
    //         console.error('Ошибка при проверке ответа:', error);
    //     }
    // });
    // GetQuestion("/getQuestionData")


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