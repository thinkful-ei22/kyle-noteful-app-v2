'use strict';

const knex = require('../knex');


// Get Notes with optional searchTerm
// let searchTerm = 'gaga';
// knex
//   .select('notes.id', 'title', 'content')
//   .from('notes')
//   .modify(queryBuilder => {
//     if (searchTerm) {
//       queryBuilder.where('title', 'like', `%${searchTerm}%`);
//     }
//   })
//   .orderBy('notes.id')
//   .then(results => {
//     console.log(JSON.stringify(results, null, 2));
//   })
//   .catch(err => {
//     console.error(err);
//   });



// Get Note By Id accepts an ID. It returns the note as an object not an array
// const noteId = 1008;
// knex('notes')
//   .first()
//   .where({ id: noteId })
//   .then(item => {
//     console.log(item);
//   });


// Update Note By Id accepts an ID and an object with the desired updates.
// It returns the updated note as an object
// const noteId = 1008;
// const updateObj = {
//   title: '11 ways investing in cats can update an object in the database',
//   content: 'You thought it would make you a millionare?'
// };
// knex('notes')
//   .update(updateObj)
//   .where({ id: noteId })
//   .returning(['id', 'title', 'content'])
//   .then(([note]) => console.log(note));


// Create a Note accepts an object with the note properties and inserts it in the DB.
// It returns the new note (including the new id) as an object.
// const newNote = {
//   title: '5 reasons why my cat will eat your cat',
//   content: 'Because, reasons...'
// };
// knex('notes')
//   .insert(newNote)
//   .returning(['id', 'title', 'content'])
//   .then(([note]) => console.log(note));



// Delete Note By Id accepts an ID and deletes the note from the DB.
// const deletionId = 1005;
// knex('notes')
//   .where({ id: deletionId })
//   .del()
//   .then(console.log);

