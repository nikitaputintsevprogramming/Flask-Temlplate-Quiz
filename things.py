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
    def __init__(self, fio, email, phone):
        super().__init__(fio)
        self.fio = fio
        self.email = email
        self.phone = phone
        self.marks = 0
        users.append(self)
        print(f'добавлен пользователь с именем "{fio}", с почтой "{email}", с телефоном "{phone}", со счетом "{self.marks}"')

    def print_name(self):
        super().print_name()

    def print_marks(self):
        print(f'Набрано очков: {self.marks}')
