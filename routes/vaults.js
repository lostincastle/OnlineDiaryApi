var express = require('express');
var vaults = require('../models/Vault');

var router = express.Router();

router.route('/')
    .get((req, res, next) => {
        vaults.find({})
            .then((vaults) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(vaults);
            }, (err) => next(err))
            .catch((err) => next(err));
    }) 
  
    .post((req, res, next) => {
        vaults.create(req.body)
            .then((vault) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(vault);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

router.route('names')
    .get((req, res, next) => {
        vaults.findById(req.params.name)
            .then((vault) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(vault);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    router.route('images')
    .get((req, res, next) => {
        vaults.findById(req.params.name)
            .then((vault) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.sendFile(vault);
            }, (err) => next(err))
            .catch((err) => next(err));
    });



    router.route('/:id')
    .get((req, res, next) => {
        vaults.findById(req.params.id)
            .then((vault) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(vault);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end("POST operation not supported!");
    })
    .put((req, res, next) => {
        vaults.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, useFindAndModify: false })
            .then((vault) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(vault);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        vaults.findByIdAndDelete(req.params.id)
            .then((reply) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(reply);
            }, (err) => next(err))
            .catch((err) => next(err));
    });
   

module.exports = router;