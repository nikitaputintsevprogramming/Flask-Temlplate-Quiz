# pandas, flask, openpyxl
# напомнить, что очень важно, чтобы во время работы файл xl был закрыт! иначе ничего не будет сохраняться

from flask import Flask, render_template, request, json

app = Flask(__name__)

import things
# global users
from things import users
# user = []

from logger import Logger as lg
logger_instance = lg('QuizInformation')

@app.route('/')
def connect_form():
    return render_template('form.html')

@app.route('/question1')
def connect_question1():
    return render_template('question1.html')

@app.route('/getFormData')
def getFormData():
    print(f'Name: { request.args.get("fio")}, E-mail: {request.args.get("email")}, Phone: {request.args.get("phone")}')
    newUser = [things.User(request.args.get("fio"), request.args.get("email"), request.args.get("phone"))]
    # -------------------- потом переместить
    logger_instance.insert_user_data('UserData', newUser)
    logger_instance.export_user_data('userdata.csv') 
    # -------------------- потом переместить
    return json.dumps(f'Name: { request.args.get("fio")}, E-mail: {request.args.get("email")}, Phone: {request.args.get("phone")}')
if __name__ == '__main__':
    app.run()