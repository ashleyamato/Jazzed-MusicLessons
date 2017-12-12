'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');
const { addDatabaseHooks } = require('./utils')
suite('04_lessons seeds', addDatabaseHooks(() => {
  test('lessons rows', (done) => {
    knex('lessons').orderBy('id', 'ASC')
      .then((actual) => {
        const expected = [
          {
            id: 1,
            user_client_id: 1,
            user_instructor_id: 2,
            location: 'CU School of Music',
            cost: '$60',
            date_time: '12/23/17 1:00PM',
            lesson_name: 'Intro to Electric Guitar'
          }
        ];

        for (let i = 0; i < expected.length; i++) {
          assert.deepEqual(
            actual[i],
            expected[i],
            `Row id=${i + 1} not the same`
          );
        }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
}));