# Garden_Plant
## Тестовое приложения 
Основная цель набить руку.

#### Задача: Создать приложение позволяющее хранить информацию о растениях, их изображениях, ссылки на дополнительные ресурсы.

### Стэк: 
 * Node.js
 * Express
 * PUG
 * Sharp	- изменение размеров загруженных изображений
 * Multer	- загрузка изображений
 * MongoDB 

### Инсталяция и установка
	1. Скачать архив и разархивировать.
	2. Установить необходимые библиотеки: "npm install".
	3. При необходимости, настроить ссылку для подключения к MongoDB в файле dbprovider.js 5 строка.
	3. Запуск: "npm start".

### БД

Для хранения данных используется mongodb
Структура данных на 24/08/2018
	ID:       Идентификационный код
	name:     Название
	name_lat: Латинское название
	url:      Ссылка на википедию
	img:      Изображение (В тестовом примере использованы изображения из википедии)

### Функционал основного окна:
- [X] 1. Фильтр по наименованию по всем полям.
- [X] 2. Добавление/удаление информации о растении. (Загрузка изображения из файла с прнудительным изменением размера картинки )
- [X] 3. Корректировка всех полей (кроме ID).
- [X] 4. Загрузка тестовой БД

Исходники приложения для менеджмента расстений (https://github.com/tradash/gpw)
