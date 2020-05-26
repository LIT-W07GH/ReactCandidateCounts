import React from 'react';
import axios from 'axios';

const CandidateCountsContext = React.createContext();

class CandidateCountsContextComponent extends React.Component {

    state = {
        candidateCounts: {
            pending: 0,
            confirmed: 0,
            refused: 0
        }
    }

    componentDidMount = async () => {
        await this.updateCandidateCounts();
    }

    updateCandidateCounts = async () => {
        const { data } = await axios.get('/api/candidates/getcounts');
        this.setState({ candidateCounts: data });
    }

    render() {
        const value = {
            candidateCounts: this.state.candidateCounts,
            updateCandidateCounts: this.updateCandidateCounts
        }
        return (
            <CandidateCountsContext.Provider value={value}>
                {this.props.children}
            </CandidateCountsContext.Provider>
        )
    }
}

export { CandidateCountsContext, CandidateCountsContextComponent }