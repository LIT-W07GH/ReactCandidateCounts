import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CandidateCountsContext } from '../CandidateCountsContext';

export class Layout extends Component {
  render() {
    return (
      <CandidateCountsContext.Consumer>
        {value => {
          const { pending, confirmed, refused } = value.candidateCounts;
          return (
            <div>
              <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                  <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" 
                    data-toggle="collapse" 
                    data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                    <Link className="navbar-brand" to="/">React Candidate Tracker</Link>
                  </div>
                  <div id="navbar" className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/addcandidate">Add Candidate</Link></li>
                      <li><Link to="/pending">Pending ({pending})</Link></li>
                      <li><Link to="/confirmed">Confirmed ({confirmed})</Link></li>
                      <li><Link to="/refused">Refused ({refused})</Link></li>
                    </ul>
                  </div>
                </div>
              </nav>

              <div className="container" style={{ marginTop: 20 }}>
                {this.props.children}
              </div>
            </div>
          )
        }}
      </CandidateCountsContext.Consumer>

    );
  }
}
