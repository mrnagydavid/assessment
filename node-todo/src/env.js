const configuration = {
  'test': {
    name: 'test'
  },
  'dev': {
    name: 'dev'
  },
  'prod': {
    name: 'prod'
  }
};

const environment = process.env.NODE_ENV || 'prod';
const current = configuration[environment];

export default current;
