const express = require('express');
// eslint-disable-next-line
const router = express.Router();
const multer = require('multer');


// === begin my kod
const doItDB = require('../dbprovider.js').doItDB;
const readPict = require('../dbprovider.js').readPict;
const collName = require('../dbprovider.js').collName;
const collTmp = require('../dbprovider.js').collTmp;
const loadFR = require('../dbprovider.js').loadFR;
const mongodb = require('mongodb');

const storage = multer.memoryStorage();
const upload = multer({storage});
let myquery;

// upload.single('image'),
router.post('/:idd', upload.single('img'), function(req, res, next) {
  doItDB((err, db, cli)=>{
    if (err) {
      return next(err);
    }
    const id = req.params.idd;
    if (!req.body.name) {
      // Сохранение изображения во временной базе
      loadFR([req.file.buffer]).then((elem) => {
        const buff = readPict(elem[0]);
        db.collection(collTmp).insertOne({idold: id, img: buff}, (err, rez) => {
          if (err) {
            // eslint-disable-next-line
            const error = new Error('Ошибка при сохранении изображения во временной БД');
            error.httpStatusCode = 400;
            return nexr(error);
          }
        });
        myquery = {_id: new mongodb.ObjectID(id)};
        // Создание формы для ввода оставшихся полей
        db.collection(collName).findOne(myquery, function(err, doc) {
          if (err) {
            // eslint-disable-next-line
            const error = new Error('Ошибка при загрузке изображения из временной БД');
            error.httpStatusCode = 400;
            return nexr(error);
          } else {
            doc.img = buff;
            res.render('editRecord', {
              title: 'Редактирование записи (изображение загружено)',
              cursor: doc,
              imgfile: 'new'});
            cli.close();
          }
        });
      });
    } else {
      doItDB((err, db, cli)=>{
        if (err) {
          return next(err);
        }
        myquery = {idold: id};
        // Забираем изображение из временного хранилища
        db.collection(collTmp).findOne(myquery, function(err, doc) {
          if (err) {
            // eslint-disable-next-line
            const error = new Error('Ошибка при загрузке изображения из временной БД');
            error.httpStatusCode = 400;
            return nexr(error);
          } else {
            let myquery = {_id: new mongodb.ObjectID(id)};
            const newRec = {$set: {
              name: req.body.name,
              name_lat: req.body.name_lat,
              url: req.body.url,
              img: doc.img,
            }};
            // Обновляем запись в БД
            db.collection(collName).findOneAndUpdate(myquery, newRec,
                function(err, r) {
                  if (err) {
                    const error = new Error('Ошибка при обновлении записи');
                    error.httpStatusCode = 400;
                    return nexr(error);
                  } else {
                    // Удаляем изображение из временного хранилища
                    myquery = {idold: id};
                    db.collection(collTmp).deleteMany(myquery,
                        function(err, r) {
                          if (err) {
                            // eslint-disable-next-line
                            const error = new Error('Ошибка при удалении изображения из временной БД');
                            error.httpStatusCode = 400;
                            return nexr(error);
                          } else {
                            cli.close;
                            res.redirect('/');
                          };
                        });
                  }
                });
          };
        });
      });
    }
  });
});

router.get('/:id', function(req, res, next) {
  doItDB((err, db, cli)=>{
    if (err) {
      return next(err);
    }
    const id = req.params.id;
    let myquery = {_id: new mongodb.ObjectID(id)};
    db.collection(collName).find(myquery).toArray(function(err, cursor) {
      if (err) {
        const error = new Error('Редактируемая запись отсутсвует в БД');
        error.httpStatusCode = 400;
        return nexr(error);
      } else if (cursor.length) {
        res.render('editRecord',
            {title: 'Редактирование записи',
              cursor: cursor[0], imgfile: 'old'});
      } else {
        console.log('No document in DB');
        res.render('index',
            {title: 'Тестовое приложения, Запись не найдена',
              cursor: null});
      }
      cli.close;
    });
  });
});

module.exports = router;
