const configuration = {
  'test': {
    name: 'test',
    filename: 'src/db/todos-test.json'
  },
  'dev': {
    name: 'dev',
    filename: 'src/db/todos-dev.json'
  },
  'prod': {
    name: 'prod',
    filename: 'db/todos-prod.json'
  }
};

const environment = process.env.NODE_ENV || 'prod';
const current = configuration[environment];

export default current;
