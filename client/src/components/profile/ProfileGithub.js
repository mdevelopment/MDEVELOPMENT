import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../MyFonts.css';

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: '26c196bacea7db10cf48',
      clientSecret: '0885cb690e07d2a93a6afb0891fb552fd9f7aa53',
      count: 5,
      sort: 'created: asc',
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.refs.myRef) {
          this.setState({ repos: data });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { repos } = this.state;


    const repoItems = repos.map(repo => (

      <div key={repo.id} className="card card-body bg-dark mb-2">
        <div className="row">
          <div className="col-md-12">
            <h4>
              <a target="_blank" href={repo.html_url} className="" target="_blank" style={{color:'#e0ec1d', fontSize:'1.4em'}}>
                {repo.name}
              </a>
            </h4>
            <h3>{repo.description}</h3>
          </div>
        </div>
         {console.log("REPO URLS: "+ repo.html_url)}
      </div>
    ));
    return (
      <div ref="myRef">
        <hr />
        <p className="mb-4">Latest Github Repos</p>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
