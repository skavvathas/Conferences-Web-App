import React from 'react';
import { useLogout } from '../hooks/useLogout';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Header = () => {
    const { logout } = useLogout();
    const navigate = useNavigate();

    const handleClick = () => {
        logout()
    }

    return (
        <div>
            <div class="p-3 text-bg-dark">
                <div class="container">
                    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                    
                        </a>

                        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><Link to="/home" className="nav-link px-2 text-secondary">Home</Link></li>
                            <li><Link to="/conferences" className="nav-link px-2 text-white">Conferences</Link></li>
                            <li><Link to="/home" class="nav-link px-2 text-white">Paper</Link></li>
                            <li><Link to="/profile" class="nav-link px-2 text-white">Profile</Link></li>
                            <li><Link to="/about" class="nav-link px-2 text-white">About</Link></li>
                        </ul>

                        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                            <input type="search" class="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search"/>
                        </form>

                        <div class="text-end">
                            <button type="button" class="btn btn-warning" onClick={handleClick}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
