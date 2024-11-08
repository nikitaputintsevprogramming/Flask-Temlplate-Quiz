# !pandas, !flask, !openpyxl, !pymongo, !docxtpl !win32api (pip install pywin32)
# напомнить, что очень важно, чтобы во время работы файл xl был закрыт! иначе ничего не будет сохраняться
# Перед печатью нужно отключить уведомления в принтере или нужна настройка принтера на поля?

import socket, random 
from flask import Flask, render_template, request, json, redirect, url_for, request, jsonify
# from flask_socketio import SocketIO, emit
from docxtpl import DocxTemplate
import win32api
import win32print
from docx2pdf import convert
import os

import things
from logger import Logger as lg

app = Flask(__name__)
# socketio = SocketIO(app)

logger_instance = lg('QuizInformation')
quizData = things.Question("question","answer1","answer2","answer3","answer4")
newUser = things.User("1","1","1","1")
context = {}

@app.route('/test')
def test():
    return render_template('test.html')

@app.route('/')
def startPage():
    return render_template('startPage.html')

@app.route('/form')
def connect_form():
    return render_template('form.html')

@app.route('/privacy')
def privacy():
    return render_template('privacyPolicy.html')

@app.route('/question')
def question():
    context['question'] = quizData.question
    context['numerator'] = newUser[0].numerator
    context['answers'] = []
    answers = [quizData.answer1, quizData.answer2, quizData.answer3, quizData.answer4]
    random.shuffle(answers)  # Перемешиваем ответы
    context['answers'].append({'answer1': answers[0], 'answer2': answers[1], 'answer3': answers[2], 'answer4': answers[3]}) 
    if newUser[0].numerator <= 10:
        return render_template('question.html', context=context)
    else:
        print_blank()
        context["marks"] = newUser[0].marks
        logger_instance.insert_user_data('UserData', newUser)
        logger_instance.export_user_data('userdata.csv')

        return render_template('results.html', context=context)

@app.route('/getQuestionData')
def getQuestionData():
    global quizData
    quizData = things.Question(request.args.get("question"), request.args.get("answer1"), request.args.get("answer2"), request.args.get("answer3"), request.args.get("answer4"))
    if newUser[0].numerator <= 10:
        newUser[0].up_numerator()
    return json.dumps(f'question: { quizData.question}, answer1: {request.args.get("answer1")}, answer2: {request.args.get("answer2")}, answer3: {request.args.get("answer3")}, answer4: {request.args.get("answer4")}')

@app.route('/checkAnswer')
def check_answer():
    selectedAnswer = request.args.get("selectedAnswer")
    trueAnswer = False
    if(selectedAnswer == quizData.answer1):
        newUser[0].up_mark()
        trueAnswer = True
    return json.dumps(f'Выбран ответ: {selectedAnswer} и он {trueAnswer}')

@app.route('/getFormData')
def getFormData():
    global newUser
    print(f'Name: { request.args.get("name")}, {request.args.get("surname")}, E-mail: {request.args.get("email")}, Phone: {request.args.get("phone")}')
    newUser = [things.User(request.args.get("name"), request.args.get("surname"), request.args.get("email"), request.args.get("phone"))]
    return json.dumps(f'Name: { request.args.get("name")}, Surname: { request.args.get("surname")}, E-mail: {request.args.get("email")}, Marks: {request.args.get("marks")}')

@app.route('/tournamentTable')
def generate_tournamentTable():
    user_data = logger_instance.read_user_data('UserData')
    
    # Сортируем данные по полю 'Marks' в убывающем порядке
    sorted_user_data = sorted(user_data, key=lambda x: x['Marks'], reverse=True)
    
    return render_template('tournamentTable.html', user_data=sorted_user_data)

# PDF
@app.route('/print')
def print_blank():
    try:
        # Создание документа Word
        doc = DocxTemplate(r"App\Blanks\Бланк - Авто.ру.docx")
        context = { 
            'name' : newUser[0].name,
            'surname' : newUser[0].surname,
            'mark' : newUser[0].marks,
            'job' : jobForPrint(newUser[0].marks)}
        doc.render(context)
        word_fpath = r"App\Blanks\Автору.docx"
        doc.save(word_fpath)

        # Конвертация Word в PDF
        pdf_fpath = r"App\Blanks\Автору.pdf"
        convert(word_fpath, pdf_fpath)

        # Печать PDF
        win32api.ShellExecute(0, "print", pdf_fpath, None, ".", 0)
        
    except Exception as e:
        # Логирование ошибки
        print(f"Произошла ошибка: {e}")
    finally:
        pass
        # Удаление временных файлов, если нужно
        # if os.path.exists(word_fpath):
        #     os.remove(word_fpath)
        # if os.path.exists(pdf_fpath):
        #     os.remove(pdf_fpath)
# def print_blank():
#     doc = DocxTemplate("App\Blanks\Бланк - Авто.ру.docx")
#     context = { 
#         'name' : newUser[0].name,
#         'surname' : newUser[0].surname,
#         'mark' : newUser[0].marks,
#         'job' : jobForPrint(newUser[0].marks)}
#     doc.render(context)
#     fpath = "App\Blanks\Автору.docx"
#     doc.save(fpath)
#     win32api.ShellExecute(0, "printto", fpath, '"%s"' % win32print.GetDefaultPrinter(), ".", 0)

def jobForPrint(marks):
    if(marks >=0 and marks <= 1):
        return 'Стажер-аналитик'
    elif(marks >=2 and marks <= 3):
        return 'Начинающий специалист'
    elif(marks >=4 and marks <= 5):
        return 'Младший аналитик'
    elif(marks >=6 and marks <= 7):
        return 'Аналитик'
    elif(marks >=8 and marks <= 9):
        return 'Старший аналитик'
    else:
        return 'Ведущий аналитик '

# 0-1 балл — Стажер-аналитик
# 2-3 балла — Начинающий специалист
# 4-5 баллов — Младший аналитик
# 6-7 баллов — Аналитик
# 8-9 баллов — Старший аналитик 
# 10 баллов — Ведущий аналитик

@app.route('/getIP')
def get_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # Используем подключение к общедоступному адресу, чтобы получить локальный IP-адрес
        s.connect(('8.8.8.8', 1))
        local_ip = s.getsockname()[0]
    except Exception:
        local_ip = '127.0.0.1'
    finally:
        s.close()
    return local_ip
    # print(local_ip)

if __name__ == '__main__':
    app.run(host='0.0.0.0')