import React from 'react';
import { useLogout } from '../hooks/useLogout';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Box, Button, ButtonGroup, Card, CardHeader, Center, CardBody, CardFooter, Divider, Heading, Image, Stack, Text, Flex} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { ArrowForwardIcon } from '@chakra-ui/icons';

const Header = () => {
    const { logout } = useLogout();
    const navigate = useNavigate();

    const handleClick = () => {
        logout()
    }

    return (
        <div>
            <div class="p-3" style={{backgroundColor: "#F8F8F8", borderBottom: "2px solid black"}}>
                <div class="container">
                    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                    
                        </a>

                        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li>
                                <Button as={RouterLink} to="/home" colorScheme='messenger' variant='ghost'>
                                Home
                                </Button>
                            </li>
                            <li>
                                <Button as={RouterLink} to="/conferences" colorScheme='messenger' variant='ghost'>
                                Conferences
                                </Button>
                            </li>
                            <li>
                                <Button as={RouterLink} to="/home" colorScheme='messenger' variant='ghost'>
                                Paper
                                </Button>
                            </li>
                            <li>
                                <Button as={RouterLink} to="/profile" colorScheme='messenger' variant='ghost'>
                                Profile
                                </Button>
                            </li>
                            <li>
                                <Button as={RouterLink} to="/about" colorScheme='messenger' variant='ghost'>
                                About
                                </Button>
                            </li>
                        </ul>

                        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                            <input type="search" class="form-control form-control-dark text-bg-white" placeholder="Search..." aria-label="Search"/>
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
