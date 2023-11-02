import React from 'react';

const Header = () => {
  return (
    <div>
        <div class="p-3 text-bg-dark">
            <div class="container">
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                   
                    </a>

                    <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><a href="/home" class="nav-link px-2 text-secondary">Home</a></li>
                        <li><a href="/conferences" class="nav-link px-2 text-white">Conferences</a></li>
                        <li><a href="/paper" class="nav-link px-2 text-white">Paper</a></li>
                        <li><a href="/profile" class="nav-link px-2 text-white">Profile</a></li>
                        <li><a href="/about" class="nav-link px-2 text-white">About</a></li>
                    </ul>

                    <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                        <input type="search" class="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search"/>
                    </form>

                    <div class="text-end">
                        <button type="button" class="btn btn-warning">Logout</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header
