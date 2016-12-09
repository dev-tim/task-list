import React, {PropTypes} from 'react';
import {FormControl} from 'react-bootstrap';

class CreateTaskInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {taskTitle: ''};
  }

  onChange(e) {
    this.setState({taskTitle: e.target.value});
  };

  onKeydown(e) {
    const {taskTitle} = (this.state || '');
    const value = taskTitle.trim();
    if (e.which === 13 && value) {
      this.props.onSave(value);
      this.setState({taskTitle: ''});
    }
  };

  render() {
    const {placeholder} = this.props;

    return (
      <div className="create-task">
        <FormControl
          className="create-task__input"
          type="text"
          autoFocus="true"
          value={this.state.taskTitle}
          placeholder={placeholder}
          onChange={this.onChange.bind(this)}
          onKeyDown={this.onKeydown.bind(this)}
        />
      </div>
    );
  }
}

CreateTaskInput.propTypes = {
  onSave: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired
};

export default CreateTaskInput;
