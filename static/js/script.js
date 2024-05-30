function GetFormData(addr) {
    // alert(addr)
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
}

function SetQuestion(addr) {
    var question = 'Masha?';
    var questionLabel = document.getElementById('question');
    questionLabel.innerHTML = 'Hello' + question;
    $.ajax({
        type: 'SET', //тип запроса
        url: addr, // адрес, на который отправлен запрос
        dataType: 'json', //тип данных, ожидаемый от сервера
        conectType:'application/json', //тип передаваемых данных
        
        success: function (response)
        {
            console.log(response)
        }  
    });
}

function RandomQuestion() {
    
}

