// import { useNavigate } from 'react-router-dom';

// const PrivateRoute = ({ children }) => {

//     const navigate = useNavigate();

//     const isAuthenticated = localStorage.getItem('isAuthenticated');
//     if (!isAuthenticated) {
//         navigate('/aksamedia/');
//     }
//     return children;
// };

// export default PrivateRoute;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');

        if (!isAuthenticated) {
            navigate('/aksamedia/');
        }
    }, [navigate]); 

    return children;
};

export default PrivateRoute;
