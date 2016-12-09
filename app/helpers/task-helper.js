export function swapTaskPositions(tasksArray = [], oldPosition, newPosition) {
  if (oldPosition < tasksArray.length && newPosition < tasksArray.length) {
    let tmp = tasksArray[oldPosition];
    tasksArray[oldPosition] = tasksArray[newPosition];
    tasksArray[newPosition] = tmp;
  } else {
    console.warn(`Wrong indexes passed when swapping tasks! ${tasksArray}, old ${oldPosition}, new ${newPosition}`)
  }
  return Object.assign([],tasksArray);
}

export function zipTasksByTaskId(tasks){
  return tasks.reduce((acc, t) => {
    acc[t.id] = t;
    return acc;
  }, {});
}
