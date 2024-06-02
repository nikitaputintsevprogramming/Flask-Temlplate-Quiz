# pandas, flask, openpyxl, ?pymongo
# напомнить, что очень важно, чтобы во время работы файл xl был закрыт! иначе ничего не будет сохраняться

import socket
from flask import Flask, render_template, request, json, redirect, url_for, request, jsonify

import things

from logger import Logger as lg

app = Flask(__name__)

logger_instance = lg('QuizInformation')
quizData = things.Question("question","answer1","answer2","answer3","answer4")
newUser = things.User("1","1","1")
context = {}

@app.route('/')
def connect_form():
    return render_template('form.html')

@app.route('/question')
def question():
    context['question'] = quizData.question
    context['numerator'] = newUser[0].numerator
    context['answers'] = []
    context['answers'].append({'answer1': quizData.answer1, 'answer2': quizData.answer2, 'answer3': quizData.answer3, 'answer4': quizData.answer4}) 
    return render_template('question.html', context=context)

@app.route('/getQuestionData')
def getQuestionData():
    global quizData
    quizData = things.Question(request.args.get("question"), request.args.get("answer1"), request.args.get("answer2"), request.args.get("answer3"), request.args.get("answer4"))
    newUser[0].up_numerator()
    # print(quizData.numerator)
    return json.dumps(f'question: { quizData.question}, answer1: {request.args.get("answer1")}, answer2: {request.args.get("answer2")}, answer3: {request.args.get("answer3")}, answer4: {request.args.get("answer4")}')

@app.route('/checkAnswer')
def check_answer():
    selectedAnswer = request.args.get("selectedAnswer")
    trueAnswer = False
    if(selectedAnswer == quizData.answer1):
        trueAnswer = True
    return json.dumps(f'Выбран ответ: {selectedAnswer} и он {trueAnswer}')

@app.route('/getFormData')
def getFormData():
    global newUser
    print(f'Name: { request.args.get("fio")}, E-mail: {request.args.get("email")}, Phone: {request.args.get("phone")}')
    newUser = [things.User(request.args.get("fio"), request.args.get("email"), request.args.get("phone"))]
    # -------------------- потом переместить
    logger_instance.insert_user_data('UserData', newUser)
    logger_instance.export_user_data('userdata.csv')
    # -------------------- потом переместить
    return json.dumps(f'Name: { request.args.get("fio")}, E-mail: {request.args.get("email")}, Marks: {request.args.get("marks")}')

@app.route('/up')
def up():
    return

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