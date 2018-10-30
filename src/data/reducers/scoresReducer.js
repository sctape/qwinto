import EntityState from 'src/data/EntityState';

export default function (state = new EntityState(), action) {
  switch (action.type) {
    default:
      return state;
  }
}
