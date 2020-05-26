import React from 'react';
import axios from 'axios';
import produce from 'immer';
import { CandidateCountsContext } from '../CandidateCountsContext';

class PendingDetails extends React.Component {
    state = {
        candidate: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            notes: '',
            status: ''
        },
    }

    componentDidMount = async () => {
        const { candidateId } = this.props.match.params;
        const { data } = await axios.get(`/api/candidates/get?id=${candidateId}`);
        this.setState({ candidate: data });
    }

    onUpdateStatusClick = async (status, updateCandidateCounts) => {
        const { candidateId } = this.props.match.params;
        await axios.post('/api/candidates/updatestatus', { id: candidateId, status });
        const nextState = produce(this.state, draft => {
            draft.candidate.status = status === 1 ? 'Confirmed' : 'Refused'
        });
        this.setState(nextState);
        await updateCandidateCounts();
    }

    render() {
        const { firstName, lastName, email, phoneNumber, status, notes } = this.state.candidate;
        return (
            <CandidateCountsContext.Consumer>
                {value => {
                    const { updateCandidateCounts } = value;
                    return (
                        <div className="row">
                            <div className="col-md-6 col-md-offset-3">
                                <div className="well">
                                    <h4>Name: {firstName} {lastName}</h4>
                                    <h4>Email: {email}</h4>
                                    <h4>Phone: {phoneNumber}</h4>
                                    <h4>Status: {status}</h4>
                                    <h4>Notes:</h4>
                                    <p>{notes}</p>
                                    {status === 'Pending' && <div>
                                        <button onClick={() => this.onUpdateStatusClick(1, updateCandidateCounts)} className="btn btn-primary">Confirm</button>
                                        <button onClick={() => this.onUpdateStatusClick(2, updateCandidateCounts)} className="btn btn-danger">Refuse</button>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    )
                }}
            </CandidateCountsContext.Consumer>

        );
    }
}

export default PendingDetails;