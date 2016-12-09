import React, {PropTypes} from 'react';
import classnames from 'classnames';

class Checkbox extends React.Component {
  render() {
    const {checked, onChange} = this.props;
    return (
      <div
        className={classnames('checkbox', {'checkbox--checked': checked})}
        onClick={onChange.bind(this)}
      />
    );
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Checkbox;
