import React from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <>
            <h1>Landing page</h1>
            <Link to='/register'>Register</Link>
        </>
        
    );
};

export default Landing;
