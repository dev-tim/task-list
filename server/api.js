const tasksAPI = require('./tasks');
const aggregator = require('./aggregator');

export default function initApiHandlers(app) {

  app.get('/api/tasks', (req, res) => {
    const token = req.session.accessToken;

    aggregator.aggregateTasks(token).then(result => {
      res.status(200).json(result)
    }).catch((error) => {
      console.log('Fetching tasks error', error.message);
      res.status(error.response.status).json(error)
    })
  });

  app.post('/api/tasks', (req, res) => {
    const token = req.session.accessToken;
    const task = req.body;

    tasksAPI.createTask(token, task).then((result) => {
      const createdTask = result.data;
      console.log(`Created task ${createdTask.id} for listId ${task.listId}. Status - ${result.status}`);
      res.json(createdTask)
    }).catch(error => {
      console.log('creating task error', error.message);
      res.status(error.response.status).json(error)
    })
  });

  app.delete('/api/tasks/:taskId', (req, res) => {
    const token = req.session.accessToken;
    const taskId = req.params.taskId;
    const revision = req.body.revision;

    tasksAPI.deleteTask(token, taskId, revision).then((result) => {
      const createdTask = result.data;
      console.log(`Created task ${createdTask.id} for listId ${task.listId}. Status - ${result.status}`);
      res.json(createdTask)
    }).catch(error => {
      console.log('delete task error', error.message);
      res.status(error.response.status).json(error)
    })
  });

  app.put('/api/tasks/:taskId', (req, res) => {
    const token = req.session.accessToken;
    const taskId = req.params.taskId;

    const completed = req.body.completed;
    const revision = req.body.revision;

    tasksAPI.patchTaskCompletedStatus(token, taskId, revision, completed).then((result) => {
      const updatedTask = result.data;
      console.log(`Update task ${taskId} completed status to ${updatedTask.completed}. Status - ${result.status}`);
      res.json(updatedTask)
    }).catch(error => {
      console.log('updated task completed status error', error.message);
      res.status(error.response.status).json(error)
    })
  });

  app.put('/api/positions/:listId', (req, res) => {
    const token = req.session.accessToken;
    const listId = req.params.listId;

    const values = req.body.values;
    const revision = req.body.revision;

    tasksAPI.patchTaskPositions(token, listId, revision, values).then((result) => {
      const updatedTaskPositions = result.data;
      console.log(`Update list ${listId} task positions to  ${updatedTaskPositions.values}. Status - ${result.status}`);
      res.json(updatedTaskPositions)
    }).catch(error => {
      console.log(`Update list ${listId} task positions error`, error.message);
      res.status(error.response.status).json(error)
    })
  });
};
