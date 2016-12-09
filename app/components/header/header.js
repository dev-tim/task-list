import React, {PropTypes} from 'react';
import {Navbar} from 'react-bootstrap';

class Header extends React.Component {
  render() {
    const {title} = this.props;
    return (
      <div className="wheader row">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a className="wheader__title" href="#">{title}</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string
};

export default Header;
