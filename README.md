# Wunerlist client


This project is a [Wunderlist](http://wunderlist.com) client built with
Express, React/Redux stack. 


## Demo 

Demo version of this app is running here: [https://wunderchallenge.herokuapp.com/](https://wunderchallenge.herokuapp.com/)


## How to start it? 

To start application please run following scripts:

```
npm install // to install dependencies 
npm test    // to run tests

export WUNDER_APP_CLIENT_ID=<your app clientId>
export WUNDER_APP_CLIENT_SECRET=<your app clientSecret>

npm run dev   // to start application in development mode
npm run wundertree // to see how wunderlist data structures can be transformed into wunder-tree

```

Last command will start `weback-dev-server` on port `3000` and spawn up 
NodeJs API server on port `9000`. 

By default we active development mode, so you will also have react hot module 
replacement with Redux dev tools enabled. 

## What are the current features? 

This simple app is capable of:

+ authenticating user against Wunderlist Oauth provider
+ displaying actual task from Wunderlist user's Inbox
+ creating a new task
+ completing/undoing users tasks (completed tasks are not fetched from the server, atm)
+ reordering tasks in the Inbox


## Tech details

React/Redux setup is more or less standard, but there were couple of tricks done:


Async actions for communicating with backend are very much similar to each other, 
that's why we have a custom format for actions that is being processed by the api middleware:

Here is the format. 

```
export function addTask(listId, title) {
  return {
    [CALL_API]: {
      types: [types.ADD_TASK, types.ADD_TASK_SUCCESS, types.ADD_TASK_FAILURE],
      data: {
        list_id: listId,
        title,
        completed: false
      },
      method: 'POST',
      endpoint: `/api/tasks`
    }
  };
}
```

It will result in dispatching 2 actions and ajax call to the backend. `ADD_TASK` will be issued immediately 
and in case of successful response `ADD_TASK_SUCCESS` with attached response payload. 


## Known issues/Improvements

+ Currently fresh added task sometimes is not reflected in 
on the API side in list tasks [Positions](https://developer.wunderlist.com/documentation/endpoints/positions) section. However after changing task position in the main client,  
positions values are being updated.

+ Completed tasks are temporally shown only on the client side. Additional feature would be to fetch completed tasks separately. 
At the moment we display them in non active list, giving ability to undo tasks before browser refresh.
