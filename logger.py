import pymongo
import datetime
import csv
import pandas as pd
import os

from things import users

class Logger:
    def __init__(self, db_name):
        self.client = pymongo.MongoClient('mongodb://localhost:27017/')
        self.db = self.client[db_name]

    def insert_user_data(self, nameDB, dataArray):
        result = {'timeOfRead': datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
        for data in dataArray:
            result["_id"] = self.db.get_collection("UserData").count_documents({}) + 1
            result["Name"] = data.fio
            result["E-mail"] = data.email
            result["Phone"] = data.phone
            result["Marks"] = data.marks
        return self.db[nameDB].insert_one(result)

    def read_user_data(self, nameDB): #, value={}, field={}
       return self.db[nameDB].find({}, {'_id': 1, 'timeOfRead': 1, 'Name': 1, 'E-mail': 1, 'Phone': 1, 'Marks': 1}) # Единицы - выводим, 0 - не выводим
    
    def export_user_data(self, csv_filename):
        csv_columns = ['_id', 'timeOfRead', 'Name', 'E-mail', 'Phone', 'Marks']
         # Экспорт данных из базы данных в CSV файл
        with open(csv_filename, 'w', encoding='utf-8', newline='') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=csv_columns)
            writer.writeheader()
            for post in self.db.get_collection("UserData").find():
                # Убедимся, что все ключи присутствуют в посте, если нет, добавим их со значением None или пустой строкой
                row = {column: post.get(column, '') for column in csv_columns}
                writer.writerow(row)

        if os.path.exists(csv_filename):
            # Чтение данных из временного CSV файла
            df = pd.read_csv(csv_filename, dtype=str)

            # Создание нового имени файла xlsx
            xlsx_filename = os.path.splitext(csv_filename)[0] + '.xlsx'

            # Сохранение данных в xlsx формате с заголовками
            df.to_excel(xlsx_filename, index=False, header=csv_columns)

            # Удаление временного CSV файла
            os.remove(csv_filename)
            print("Файл успешно обработан и сохранен в формате xlsx.")
        else:
            print("Временный файл userdata_temp.csv не найден в текущей папке.")
            