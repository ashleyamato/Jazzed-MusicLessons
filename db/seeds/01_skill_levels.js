exports.seed = function(knex, Promise) {
  return knex('skill_levels').insert([
    {
      id: 1,
      skill_level: 'Beginner'
    },
    {
      id: 2,
      skill_level: 'Intermediate'
    },
    {
      id: 3,
      skill_level: 'Advanced'
    },
    {
      id: 4,
      skill_level: 'Expert (Instructor)'
    }
  ]).then(() => {
    return knex.raw(
      `SELECT setval('skill_levels_id_seq', (SELECT MAX(id) FROM skill_levels));`
    )
  })
};
