import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Pending extends React.Component {
    state = {
        candidates: []
    }

    componentDidMount = async () => {
        const { data } = await axios.get('/api/candidates/pending');
        this.setState({ candidates: data });
    }

    render() {
        return <table className='table table-hover table-striped table-bordered'>
            <thead>
                <tr>
                    <th></th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {this.state.candidates.map(c => {
                    return <tr key={c.id}>
                        <td>
                            <Link to={`/pending/details/${c.id}`}>View Details</Link>
                        </td>
                        <td>{c.firstName}</td>
                        <td>{c.lastName}</td>
                        <td>{c.phoneNumber}</td>
                        <td>{c.email}</td>
                    </tr>
                })}
            </tbody>
        </table>
    }
}

export default Pending;