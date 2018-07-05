'use strict';

const express = require('express');
const knex = require('../knex');

const router = express.Router();

// Get All Folders (no search filter needed)
router.get('/', (req, res, next) => {
  knex('folders')
    .select('id', 'name')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

// Get Folder by id
router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  knex('folders')
    .first()
    .where({ id: id })
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


// Update Folder (The noteful app does not use this endpoint but we'll create it in order to round out our API)
router.put('/:id', (req, res, next) => {
  const folderId = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateableFields = ['name'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  /***** Never trust users - validate input *****/
  if (!updateObj.name) {
    const err = new Error('Missing `name` in request body');
    err.status(400);
    return next(err);
  }

  knex('folders')
    .update(updateObj)
    .where({ id: folderId })
    .returning(['id', 'name'])
    .then((item) => {
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

// Create a Folder (accepts an object with a `name` and inserts it in the DB. Returns the new item along with the new id)
router.post('/', (req, res, next) => {
  const { name } = req.body;

  const newItem = { name };
  /***** Never trust users - validate input *****/
  if (!newItem.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  knex('folders')
    .insert(newItem)
    .returning(['id', 'name'])
    .then(([item]) => {
      if (item) {
        res.location(`http://${req.headers.host}/folders/${item.id}`).status(201).json(item);
      }
    })
    .catch(err => {
      next(err);
    });
});

// Delete Folder By Id (accepts an ID and deletes the folder from the DB and then returns a 204 status)
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  knex('folders')
    .where({ id: id })
    .del()
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;