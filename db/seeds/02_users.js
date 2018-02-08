exports.seed = function(knex, Promise) {
  return knex('users').insert([
    {
      id: 1,
      first_name: 'John',
      last_name: 'N.',
      phone_number: '303-654-3210',
      email_address: 'spiggy6@gmail.com',
      hashed_password: '$2a$10$jrcJg8OzLrJZFbtcMXVXQ.173TA2jgo.IFhdoOCuGZvD6rOl/kPei',
      skill_level_id: 4,
      user_avatar: 'eddie_profile.jpg',
      bio: `I specialize in acoustic guitar and folk music.`,
      created_at: new Date('2016-06-29 14:26:16 UTC'),
      updated_at: new Date('2016-06-29 14:26:16 UTC')
    },
    {
      id: 2,
      first_name: 'Sam',
      last_name: 'R.',
      phone_number: '303-619-5321',
      email_address: 'Swamp@swamp.io',
      hashed_password: '$2a$10$zaDd/g677uKzQEU.Z1SyH.sP53Fu5VFzZQcQTrXx4si/QPI46c/zq',
      skill_level_id: 4,
      user_avatar: 'swamp_monster.jpg',
      bio: `I teach rock n' roll and live performance.`,
      created_at: new Date('2016-06-29 14:26:16 UTC'),
      updated_at: new Date('2016-06-29 14:26:16 UTC')
    },
    {
      id: 3,
      first_name: 'Taylor',
      last_name: 'F.',
      phone_number: '303-619-5321',
      email_address: 'nigel.flippo@gmail.com',
      hashed_password: '$2a$10$zaDd/g677uKzQEU.Z1SyH.sP53Fu5VFzZQcQTrXx4si/QPI46c/zq',
      skill_level_id: 4,
      user_avatar: 'nigel.png',
      bio: `I've been teaching classical guitar for 15 years.`,
      created_at: new Date('2016-06-29 14:26:16 UTC'),
      updated_at: new Date('2016-06-29 14:26:16 UTC')
    },
    {
      id: 4,
      first_name: 'Jane',
      last_name: 'A.',
      phone_number: '303-619-9999',
      email_address: 'ashleyamato@gmail.com',
      hashed_password: '$2a$10$GuYwNz4igdVNY95hXJaw8e7aBkX2nzea0yEBIOQprnn4YAdNiQ9LW',
      skill_level_id: 4,
      user_avatar: 'ashley_profile.png',
      bio: `Classical guitarist. Blue grass & Green grass music.`,
      created_at: new Date('2016-06-29 14:26:16 UTC'),
      updated_at: new Date('2016-06-29 14:26:16 UTC')
    },
    {
      id: 5,
      first_name: 'Fred',
      last_name: 'E.',
      phone_number: '303-619-9979',
      email_address: 'fredshredz@gmail.com',
      hashed_password: '$2a$10$ROmIuhz5ztHJKyvovhd7tOt7ersMaDesynTlV350VgGfcEUM5G1su',
      skill_level_id: 4,
      user_avatar: 'fredster.jpg',
      bio: `Heavy metal guitar. Used to call me the Shredster. Now I'm just the Fredster`,
      created_at: new Date('2016-06-29 14:26:16 UTC'),
      updated_at: new Date('2016-06-29 14:26:16 UTC')
    }
  ]).then(() => {
    return knex.raw(
      `SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`
    )
  })
};
