import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../features/user/userSlice';
import {
    removeAccessTokenFromLocalStorage,
    removeRefreshTokenFromLocalStorage,
    removeAllVisualizationsFromLocalStorage,
} from '../utils/localStorage';
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBCollapse,
    MDBBtn,
} from 'mdb-react-ui-kit';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showNavColor, setShowNavColor] = useState(false);
    

    const handleLogout = () => {
        dispatch(logoutUser());
        
        navigate('/register');

    };

    return (
        <MDBNavbar expand="lg" dark bgColor="primary">
            <MDBContainer fluid>
                <MDBNavbarBrand href="#">Social care</MDBNavbarBrand>
                <MDBNavbarToggler
                    type="button"
                    data-target="#navbarColor02"
                    aria-controls="navbarColor02"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={() => setShowNavColor(!showNavColor)}
                >
                    <MDBIcon icon="bars" fas />
                </MDBNavbarToggler>
                <MDBCollapse show={showNavColor} navbar>
                    <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
                        <MDBNavbarItem>
                            <MDBNavbarLink href="/explore-dataset">Explore dataset</MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem className="active">
                            <MDBNavbarLink aria-current="page" href="/create-post">
                                Create post
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink href="/all-posts">All posts</MDBNavbarLink>
                        </MDBNavbarItem>
                        
                    </MDBNavbarNav>
                    <div className="d-flex mb-4 ms-auto align-items-center">
                        <MDBNavbarItem>
                            <MDBBtn color="danger" onClick={handleLogout}>
                                Logout
                            </MDBBtn>
                        </MDBNavbarItem>
                    </div>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
};

export default Navbar;