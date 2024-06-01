# pandas, flask, openpyxl
# напомнить, что очень важно, чтобы во время работы файл xl был закрыт! иначе ничего не будет сохраняться

from flask import Flask, render_template, request, json

app = Flask(__name__)

import things
# global users
# from things import users

from logger import Logger as lg
logger_instance = lg('QuizInformation')

@app.route('/')
def connect_form():
    return render_template('form.html')

@app.route('/question')
def question():
    name = 'Бендер Сгибальщик Родригес'
    return render_template('question.html', name=name)

@app.route('/getQuestionData')
def getQuestionData():
    question = things.Question(request.args.get("question"), request.args.get("answer1"), 
        request.args.get("answer2"), request.args.get("answer3"), request.args.get("answer4"))
    return json.dumps(f'question: { question.question}, answer1: {request.args.get("answer1")}, answer2: {request.args.get("answer2")}, answer3: {request.args.get("answer3")}, answer4: {request.args.get("answer4")}')

@app.route('/getFormData')
def getFormData():
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

if __name__ == '__main__':
    app.run()