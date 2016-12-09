const axios = require('axios');
const config = require('../config');

export function createTask(token, task) {
  return axios({
    method: 'POST',
    url: `${config.wunderlistApiUrl}/tasks`,
    headers: {
      'X-Access-Token': token,
      'X-Client-ID': config.auth.clientId
    },
    data: task
  })
}

export function deleteTask(token, taskId, revision) {
  return axios({
    method: 'POST',
    headers: {
      'X-Access-Token': token,
      'X-Client-ID': config.auth.clientId
    },
    url: `${config.wunderlistApiUrl}/tasks/${taskId}`,
    data: {
      revision
    }
  })
}

export function fetchTaskLists(token) {
  return axios({
    method: 'GET',
    headers: {
      'X-Access-Token': token,
      'X-Client-ID': config.auth.clientId
    },
    url: `${config.wunderlistApiUrl}/lists`
  }).then(response => response.data)
}

export function fetchTasks(token, list_id) {
  return axios({
    method: 'GET',
    headers: {
      'X-Access-Token': token,
      'X-Client-ID': config.auth.clientId
    },
    params: {
      list_id
    },
    url: `${config.wunderlistApiUrl}/tasks`
  }).then((response) => response.data)
}

export function fetchTasksPositions(token, list_id) {
  return axios({
    method: 'GET',
    headers: {
      'X-Access-Token': token,
      'X-Client-ID': config.auth.clientId
    },
    url: `${config.wunderlistApiUrl}/task_positions`,
    params: {
      list_id
    }
  }).then((response) => response.data)
}

export function patchTaskCompletedStatus(token, taskId, revision, completed) {
  return axios({
    method: 'PATCH',
    headers: {
      'X-Access-Token': token,
      'X-Client-ID': config.auth.clientId
    },
    url: `${config.wunderlistApiUrl}/tasks/${taskId}`,
    data: {
      revision, completed
    }
  })
}

export function patchTaskPositions(token, listId, revision, values) {
  return axios({
    method: 'PATCH',
    headers: {
      'X-Access-Token': token,
      'X-Client-ID': config.auth.clientId
    },
    url: `${config.wunderlistApiUrl}/task_positions/${listId}`,
    data: {
      revision, values
    }
  })
}





