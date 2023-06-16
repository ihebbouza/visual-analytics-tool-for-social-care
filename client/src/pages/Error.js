import { Link } from 'react-router-dom';
const Error = () => {
    return (
        <>
            <h1>Error page</h1>
            <Link to='/create-post'>back to create post</Link>
        </>
    );
};

export default Error;