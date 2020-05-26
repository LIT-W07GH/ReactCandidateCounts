import React from 'react';
import produce from 'immer';
import axios from 'axios';
import { CandidateCountsContext } from '../CandidateCountsContext';

class AddCandidate extends React.Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        notes: ''
    }

    onTextChange = e => {
        const nextState = produce(this.state, draft => {
            draft[e.target.name] = e.target.value;
        });
        this.setState(nextState);
    }

    onFormSubmit = async (e, updateCandidateCounts) => {
        e.preventDefault();
        await axios.post('/api/candidates/add', this.state);
        await updateCandidateCounts();
        this.props.history.push('/');
    }

    render() {
        return (
            <CandidateCountsContext.Consumer>
                {value => {
                    const { updateCandidateCounts } = value;
                    return (
                        <div className="row" style={{ marginTop: 20 }}>
                            <div className="col-md-6 col-md-offset-3">
                                <div className="well">
                                    <h4>Add Candidate</h4>
                                    <form onSubmit={e => this.onFormSubmit(e, updateCandidateCounts)}>
                                        <input type="text" onChange={this.onTextChange} name="firstName" placeholder="First Name" className="form-control" />
                                        <br />
                                        <input type="text" onChange={this.onTextChange} name="lastName" placeholder="Last Name" className="form-control" />
                                        <br />
                                        <input type="text" onChange={this.onTextChange} name="email" placeholder="Email" className="form-control" />
                                        <br />
                                        <input type="text" onChange={this.onTextChange} name="phoneNumber" placeholder="Phone Number" className="form-control" />
                                        <br />
                                        <textarea rows="5" onChange={this.onTextChange} className="form-control" name="notes"></textarea>
                                        <br />
                                        <button className="btn btn-primary">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </CandidateCountsContext.Consumer>

        );
    }

}

export default AddCandidate;