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

function SetFormData(addr) {
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