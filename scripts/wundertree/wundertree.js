require('../../babel-init-server');

const path = require('path');
const {zipByKey, readInputJson, formatTaskTree} = require('./utils');
const {
  buildListWithTasks,
  buildFoldersTree,
  buildWunderTree,
} = require('./service');

const {folders, lists, tasks, list_positions, task_positions} = readInputJson(
  path.join(__dirname, 'data/folders_lists_and_tasks.json')
).data;

const listIds = list_positions.values;
const indexedTasks = zipByKey(tasks, 'id');
const indexedLists = zipByKey(lists, 'id');
const indexedTaskPositions = zipByKey(task_positions, 'list_id');

const orderedListsWithTasks = buildListWithTasks(listIds, indexedLists, indexedTaskPositions, indexedTasks);
const indexedListsWithTasks = zipByKey(orderedListsWithTasks, 'id');

const foldersWithListsAndTasks = buildFoldersTree(folders, indexedListsWithTasks);

const wunderTree = buildWunderTree(listIds, foldersWithListsAndTasks, indexedListsWithTasks);

const formattedMessage = formatTaskTree(wunderTree, 0, '');

module.exports = {
  wunderTree,
  formatTaskTree,
  formattedMessage
};
