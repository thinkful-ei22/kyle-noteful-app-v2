'use strict';

const express = require('express');
const knex = require('../knex');

const router = express.Router();

// GET all tags
router.get('/', (req, res, next) => {
  knex('tags')
    .select('id', 'name')
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});


// GET tag by ID
router.get('/:id', (req, res, next) => {
  const tagId = req.params.id;

  knex('tags')
    .first()
    .where({ id: tagId })
    .then(item => {
      if (item) {
        res.json(item);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});


// POST a new tag (create)
router.post('/', (req, res, next) => {
  const { name } = req.body;

  /***** Never trust users - validate input *****/
  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  const newItem = { name };

  knex('tags')
    .insert(newItem)
    .returning(['id', 'name'])
    .then(([result]) => {
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => {
      next(err);
    });
});

// PUT a tag (update)
router.put('/:id', (req, res, next) => {
  const tagId = req.params.id;

  /***** Never trust users - validate input *****/
  let updateObj = {};
  const updateableFields = ['name'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  /***** Never trust users - validate input *****/
  if (!updateObj.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  knex('tags')
    .update(updateObj)
    .where({ id: tagId })
    .returning(['id', 'name'])
    .then(([item]) => {
      if (item) {
        res.json(item);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

// DELETE a tag
router.delete('/:id', (req, res, next) => {
  const tagId = req.params.id;

  knex('tags')
    .where({ id: tagId })
    .del()
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
});


module.exports = router;