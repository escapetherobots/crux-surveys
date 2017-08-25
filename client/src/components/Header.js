import React from 'react';

class Header extends React.Component{
  render(){
    return (
      <nav className="teal lighten-2">
        <div className="nav-wrapper container">
          <a className="left brand-logo">
            Crux Surveys
          </a>
          <ul className="right">
            <li>
              <a>Login with Google</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
