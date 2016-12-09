const fs = require('fs');

function zipByKey(items, key) {
  return items.reduce((acc, it) => {
    acc[it[key]] = it;
    return acc;
  }, {});
}


function readInputJson(path) {
  const rawJson = fs.readFileSync(path);
  let json;

  try {
    json = JSON.parse(rawJson);
  } catch (err) {
    console.error('ERROR: Error parsing json file with initial data');
  }
  return json;
}


function formatTreeItemMessage(treeItem, depth) {
  const offset = Array.apply(null, {length: depth * 2}).map(() => ' ').join('');

  if (treeItem.type === 'folder') {
    return `${offset}FOLDER: ${treeItem.title}\n`
  } else if (treeItem.type === 'list') {
    return `${offset}LIST: ${treeItem.title}\n`
  } else if (treeItem.type === 'task') {
    const star = treeItem.starred ? ' (*)' : '';

    return `${offset}TASK: ${treeItem.title}${star}\n`
  } else {
    throw new Error('unexpected tree item type', treeItem);
  }
}

function formatTaskTree(treeLeaf, depth, msg) {
  return treeLeaf.reduce((acc,it) => {
    if (it.type == 'folder') {
      return formatTaskTree(
        it.lists,
        depth + 1,
        acc + formatTreeItemMessage(it, depth)
      );
    } else if (it.type == 'list') {
      return formatTaskTree(
        it.tasks,
        depth + 1,
        acc + formatTreeItemMessage(it, depth)
      );
    } else if (it.type == 'task') {
      return acc + formatTreeItemMessage(it, depth, acc);
    }
  }, msg);
}


module.exports = {
  zipByKey,
  readInputJson,
  formatTaskTree,
  formatTreeItemMessage
};

