const { Tag } = require('../Models');

const TagData = [
  {
    Tag_Name: 'Blue',
  },
  {
    Tag_Name: 'Gold',
  },
  {
    Tag_Name: 'Green',
  },
  {
    Tag_Name: 'Pop Culture',
  },
  {
    Tag_Name: 'Pop Music',
  },
  {
    Tag_Name: 'Red',
  },
  {
    Tag_Name: 'Rock Music',
  },
  {
    Tag_Name: 'White',
  },
];

const SeedTags = () => Tag.bulkCreate(TagData);

module.exports = SeedTags;