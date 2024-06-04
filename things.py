import abc

users = []

class Thing(abc.ABC):
    @abc.abstractmethod
    def __init__(self, name):
        self.name = name
        print(f"Инициализация: {self.name}")

    @abc.abstractmethod
    def print_name(self):
        print(f'Имя: {self.name}')

class User(Thing):
    def __init__(self, name, surname, email, phone):
        super().__init__(name)
        self.name = name
        self.surname = surname
        self.email = email
        self.phone = phone
        self.marks = 0
        self.numerator = 0
        users.append(self)
        print(f'добавлен пользователь с именем "{name}", с почтой "{email}", с телефоном "{phone}", со счетом "{self.marks}"')

    def print_name(self):
        super().print_name()

    def up_numerator(self):
        self.numerator +=1

    def up_mark(self):
        self.marks +=1

    def print_marks(self):
        print(f'Набрано очков: {self.marks} из {self.numerator}')

class Question(Thing):
    def __init__(self, question, answer1, answer2, answer3, answer4):
        super().__init__(question)
        self.question = question
        self.answer1 = answer1
        self.answer2 = answer2
        self.answer3 = answer3
        self.answer4 = answer4
        # users.append(self)
        print(f'добавлен вопрос: "{question}"') 

    def print_name(self):
        super().print_name()