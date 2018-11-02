import { Record, Map } from 'immutable';

const EntityBase = defaultValues => class extends Record({
  loading: false,
  loaded: false,
  error: null,
  receivedAt: 0,
  items: new Map(),
  prevItems: new Map(),
  ...defaultValues,
}) {

};

export default EntityBase;
