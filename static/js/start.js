function RandomQuestion() {
    
    fetch('/static/js/questions.json')
    
    .then(response => response.json())
    .then(data => {
        const questions = data.questions;
        const randomIndex = Math.floor(Math.random() * questions.length);
        const randomQuestion = questions[randomIndex];

        // console.log('Всего вопросов:', questions.length);
        // for (let index = 0; index < questions.length; index++) {
        //     console.log('Вопрос номер :', index , questions[index].text);
            
        // }
        
        // console.log('Случайный вопрос:', randomQuestion.text);
        // console.log('Варианты ответов:', randomQuestion.options);
        // console.log('Вариант A:', randomQuestion.options["A"]);

        var questionLabel = document.getElementById('question');
        questionLabel.innerHTML = randomQuestion.text
        var questionLabel = document.getElementById('option1');
        questionLabel.innerHTML = randomQuestion.options["A"]
        var questionLabel = document.getElementById('option2');
        questionLabel.innerHTML = randomQuestion.options["B"]
        var questionLabel = document.getElementById('option3');
        questionLabel.innerHTML = randomQuestion.options["C"]
        var questionLabel = document.getElementById('option4');
        questionLabel.innerHTML = randomQuestion.options["D"]

        
    })
    .catch(error => console.error('Ошибка при загрузке файла:', error));    
}


window.addEventListener('load', () => {
    RandomQuestion();
  });