import React from 'react';
import axios from 'axios';
import CandidatesTable from '../components/CandidatesTable';

class Refused extends React.Component {
    state = {
        candidates: []
    }

    componentDidMount = async () => {
        const { data } = await axios.get('/api/candidates/refused');
        this.setState({ candidates: data });
    }

    render() {
        return (
            <div>
                <h1>Refused</h1>
                <CandidatesTable candidates={this.state.candidates} />
            </div>
        )
    }
}

export default Refused;