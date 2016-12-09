import React, {PropTypes} from 'react';
import Header from 'components/header';
import CreateTaskInput from 'components/create-task-input';
import ActiveTaskList from '../active-task-list';
import CompletedTaskList from '../completed-task-list';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getListInfo, getError} from 'reducers/tasks-list';

import * as tasksActions from 'actions/tasks';


class App extends React.Component {

  static propTypes = {
    tasksActions: PropTypes.object.isRequired,
    list: PropTypes.array.isRequired,
    error: PropTypes.object,
  };

  onCreateTask(title) {
    const {list} = this.props;
    this.props.tasksActions.addTask(list.id, title);
  }

  render() {
    return (
      <div className="wunder-app">
        <div className="wunder-app__header">
          <Header title={'Wunderchallenge'} username="test"/>
        </div>
        <div className="wunder-app__tasks container">
          <CreateTaskInput onSave={this.onCreateTask.bind(this)} placeholder="Input task name"/>
          <ActiveTaskList/>
          <CompletedTaskList/>
        </div>
      </div>
    )
  }
}

App.propTypes = {};

const mapStateToProps = state => ({
  list: getListInfo(state.tasks, true),
  error: getError(state.tasks)
});

const mapDispatchToProps = dispatch => ({
  tasksActions: bindActionCreators(tasksActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

