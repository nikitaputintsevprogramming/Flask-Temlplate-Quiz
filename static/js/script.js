
function ToPage(addr) {
    $.ajax({
        type: 'GET', //тип запроса
        url: addr, // адрес, на который отправлен запрос
        dataType: 'json', //тип данных, ожидаемый от сервера
        conectType:'application/json', //тип передаваемых данных
        data:{ //данные запроса
            // 'selectedAnswer': selectedAnswer,
        },      
        success: function (response)
        {
            console.log(response)
            
        }
    });
    const baseUrl = window.location.origin;
    window.open(baseUrl + addr, '_self');
}

function GetFormData(addr) {
    $.ajax({
        type: 'GET', //тип запроса
        url: addr, // адрес, на который отправлен запрос
        dataType: 'json', //тип данных, ожидаемый от сервера
        conectType:'application/json', //тип передаваемых данных
        data:{ //данные запроса
            "name": document.getElementById("name").value,
            "surname": document.getElementById("surname").value,
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
                const baseUrl = window.location.origin;
                window.open(baseUrl + addr, '_self');
            }  
        });
    })
    .catch(error => console.error('Ошибка при загрузке файла:', error));     
}

function CheckAnswer(addr) {
    selectedAnswer = null;
    for (let index = 1; index <= 4; index++) {
        let checkAnswer = document.getElementById('InputOption'+index);
        if(checkAnswer.checked){
            selectedAnswer = checkAnswer.value;ц
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
            // if(document.getElementById('h1').innerHTML == 'Вопрос №1'){
            //     console.log('reload');
            //     location.href = 'http://192.168.31.24:5000/tournamentTable';
            //     // location.assign('http://192.168.31.24:5000/tournamentTable');
            //     location.reload();
            // }
        }
    });
    GetQuestion("/getQuestionData")
}
