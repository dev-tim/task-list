import axios from 'axios';

function callApi(endpoint, method = 'get', data = {}, config = {}) {
  return axios({
    method,
    url: endpoint,
    data,
    config
  }).then(response => ({json: response.data, response}))
    .then((res) => {
      if (res.response.status >= 400) {
        return Promise.reject(json);
      }
      return res.json;
    });
}

// Action key that carries API call info interpreted by API Redux middleware.
export const CALL_API = Symbol('Call API');

/**
 * Here we implement a Redux middleware that interprets actions with CALL_API key.
 *
 * First we dispatch an action before making ajax call and when received ajax call result
 * we dispatch SUCCESS or FAILURE action.
 *
 */
export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let {endpoint, method} = callAPI;
  const {types} = callAPI;

  if (!method) {
    method = 'get';
  }

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;
  next(actionWith({type: requestType, data: callAPI.data}));

  return callApi(endpoint, method, callAPI.data || {}, callAPI.config || {})
    .then(response => next(actionWith({
        data: callAPI.data,
        json: response,
        type: successType
      }
    )))
    .catch(error => next(actionWith({
      type: failureType,
      error: error.response.data,
      message: error.message,
      data: callAPI.data
    })));
};
