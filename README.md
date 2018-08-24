# Garden_Plant
Тестовое приложения с использованием Node, PUG, Express
Основная цель набить руку.

Задача: Создать многопользовательское приложение позволяющее хранить информацию о растениях, их характеристиках, о необходимых разовых и периодических работах с растениями с привязкой к календарю.

Для хранения данных используется mongodb
Структура данных на 24/08/2018
ID:       Идентификационный код
name:     Название
name_lat: Латинское название
url:      Ссылка на википедию
img:      Изображение (В тестовом примере использованы изображения из википедии)

Функционал основного окна:
1. []Логирование/регистрация пользователя.
2. []Фильтр по наименованию (по обоим).
3. Ограничение количества записей при выводе.
4. Добавление/удаление информации о растении. (Загрузка изображения из файла)
5. Корректировка всех полей (кроме ID).
6. По каждому растению дополнительно, возможно добавление информации о:
  6.1 Количество расстений
  6.2 Дата посадки
  6.3 Наименование типа работ по уходу за расстением (Может быть несколько на каждое расстение)
  6.4 Дата начала работ по уходу
  6.5 Периодичность выполнения работ
