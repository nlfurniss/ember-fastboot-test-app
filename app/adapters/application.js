import DS from 'ember-data';
import AdapterFetch from 'ember-fetch/mixins/adapter-fetch';

export default DS.RESTAdapter.extend(AdapterFetch, {
  host: 'https://reqres.in',
  namespace: 'api'
});
