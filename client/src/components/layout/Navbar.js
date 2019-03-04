import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';
import logo from '../../img/logoM.svg';
import  '../../NavBar.css';
class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;


    const authLinks = (
   
      <ul className="navbar-nav ml-auto">
        <li className="nav-item ">
          <Link className="nav-link" to="/feed"
          style={{fontSize:'.9em',paddingLeft:'15px', textDecoration: 'none',color:'white',}}
          >
            Posts
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profiles"
            style={{fontSize:'.9em',paddingLeft:'15px', textDecoration: 'none',color:'white',}}
          >

            Guest Book
          </Link>
        </li>
         <li className="nav-item">
          <Link className="nav-link" to="/dashboard"
          style={{fontSize:'.9em',paddingLeft:'15px', textDecoration: 'none',color:'white',}}
          >
            Your Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
            style={{fontSize:'.9em',paddingLeft:'15px', textDecoration: 'none'}}
          >
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: '25px', marginRight: '2px', color:'white',}}
              title="You must have a Gravatar connected to your email to display an image"
            />{' '}
            Logout
          </a>
        </li>
      </ul>
    
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto"
      style={{ paddingTop:'10px', paddingLeft:'2px' }}
      >
      <li className="nav-item">
                <Link className="nav-link" to="/profiles"
               style={{fontSize:'.9em',paddingLeft:'15px', color:'white', textDecoration: 'none'}}
                >
                  {' '}
                  Guest Book
                </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register"
          style={{fontSize:'.9em', paddingLeft:'15px',color:'white',  textDecoration: 'none'}}
          >
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login"
          style={{fontSize:'.9em',paddingLeft:'15px',color:'white', textDecoration: 'none'}}
          >
            Login
          </Link>
        </li>
       

      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark mb-3  myNavStyle" >
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
            style={{ width: '108%', height:'108%', marginLeft: '9px', marginTop:'0px'}}
            alt="logo"
              src={logo}
              
            />
          </Link>
          <button
            className="navbar-toggler removeThatBorder"            
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
            style={{marginLeft:'2px'}}
          >
            <span className="navbar-toggler-icon removeThatBorder" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar
);
