import React from 'react';

class CandidatesTable extends React.Component {
    state = {
        showNotes: true
    }

    toggleNotesClick = () => {
        const { showNotes } = this.state;
        this.setState({ showNotes: !showNotes });
    }

    render() {
        const { candidates } = this.props;
        const { showNotes } = this.state;
        return (
            <div>
                <button className="btn btn-success" onClick={this.toggleNotesClick}>Toggle Notes</button>
                <table className="table table-hover table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            {showNotes && <th>Notes</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map(c => {
                            return (
                                <tr key={c.id}>
                                    <td>{c.firstName}</td>
                                    <td>{c.lastName}</td>
                                    <td>{c.phoneNumber}</td>
                                    <td>{c.email}</td>
                                    {showNotes && <td>{c.notes}</td>}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CandidatesTable;