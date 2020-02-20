var express = require('express');
var journals = require('../models/Journal');

var router = express.Router();

router.route('/')
    .get((req, res, next) => {
        journals.find({})
            .then((journals) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(journals);
            }, (err) => next(err))
            .catch((err) => next(err));
    }) 
  
    .post((req, res, next) => {
        journals.create(req.body)
            .then((journal) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(journal);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

router.route('names')
    .get((req, res, next) => {
        journals.findById(req.params.name)
            .then((journal) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(journal);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    router.route('images')
    .get((req, res, next) => {
        journals.findById(req.params.name)
            .then((journal) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.sendFile(journal);
            }, (err) => next(err))
            .catch((err) => next(err));
    });



    router.route('/:id')
    .get((req, res, next) => {
        journals.findById(req.params.id)
            .then((journal) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(journal);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end("POST operation not supported!");
    })
    .put((req, res, next) => {
        journals.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, useFindAndModify: false })
            .then((journal) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(journal);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        journals.findByIdAndDelete(req.params.id)
            .then((reply) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(reply);
            }, (err) => next(err))
            .catch((err) => next(err));
    });
   

module.exports = router;