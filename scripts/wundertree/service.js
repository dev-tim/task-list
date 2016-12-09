function buildListWithTasks(listIds, indexedLists, indexedTaskPositions, indexedTasks) {
  return listIds.map(listId => {
    const listItem = indexedLists[listId];
    const currentTaskPositions = indexedTaskPositions[listItem.id];

    const tasks = currentTaskPositions.values.reduce((acc, taskId) => {
      acc.push(indexedTasks[taskId]);
      return acc;
    }, []);

    return Object.assign(listItem, {tasks})
  });
}

function buildFoldersTree(folders, indexedListsWithTasks) {
  return folders.reduce((acc, {id, title, values}) => {
    acc.push({
      id: id,
      title: title,
      lists: values.map(listId => {
        return indexedListsWithTasks[listId];
      }),
      values: values,
      type: 'folder'
    });
    return acc;
  }, []);
}


function findFolderContainingList(listId, foldersWithListsAndTasks) {
  const [folder] = foldersWithListsAndTasks.filter(f => {
    return f.values.indexOf(listId) !== -1
  });
  return folder;
}

function checkIfFolderWasAlreadyAdded(acc, folder) {
  return acc.map(i => i.id).indexOf(folder ? folder.id : -1) !== -1;
}

function buildWunderTree(listIds, foldersWithListsAndTasks, indexedListsWithTasks) {
  return listIds.reduce((accumulator, listId) => {
    const folder = findFolderContainingList(listId, foldersWithListsAndTasks);

    if (folder) {
      if (!checkIfFolderWasAlreadyAdded(accumulator, folder)) {
        accumulator.push(folder)
      }
    } else {
      accumulator.push(indexedListsWithTasks[listId])
    }

    return accumulator;
  }, []);
}

module.exports = {
  buildListWithTasks,
  buildFoldersTree,
  buildWunderTree,
  findFolderContainingList,
  checkIfFolderWasAlreadyAdded
};
