import { Layout, Menu } from 'antd';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../state/actions/user';
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat';
import { toast } from 'react-toastify';

import { useHistory } from 'react-router-dom';

const { Header } = Layout;

const Navbar = () => {
    const history = useHistory();

    // * user state
    // const user = useSelector(state => state.user);
    const [user, setUser] = useState();

    const handleLogout = () => {
        firebase.auth().signOut();

        history.push('/');
        toast("Logged out");


    }



    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setUser(user); // Check if a user exists

        });


    }, [history, user, setUser]);


    return (
        <Header style={{
            position: 'fixed',
            zIndex: 100,
            width:
                '100%',
            top: '0',
            backgroundColor: '#fff'
        }}>
            <Menu theme='light' mode='horizontal'>
                <Menu.Item key='1'>
                    <Link to='/'>Home</Link>
                </Menu.Item>
                {!user && (
                    <Menu.Item key='2'>
                        <Link to='/login'>Login</Link>
                    </Menu.Item>
                )}
                {

                    user && (
                        <Fragment>
                            <Menu.Item key='3' onClick={handleLogout}>
                                <Link to='/login'>Logout</Link>
                            </Menu.Item>
                            <Menu.Item key='4'>
                                <Link to='/products' state={{ archived: false }}>Dashboard</Link>
                            </Menu.Item>
                            <Menu.Item key='5'>
                                Admin:  {user.email}
                            </Menu.Item>
                        </Fragment>
                    )}
            </Menu>
        </Header>
    )
}

export default Navbar;