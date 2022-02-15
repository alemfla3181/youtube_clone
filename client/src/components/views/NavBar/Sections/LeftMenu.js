import React from 'react';
import { Menu } from 'antd';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

function LeftMenu(props) {
    const user = useSelector(state => state.user)

    if (user.userData && user.userData.isAuth) {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="home">
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="subscription">
                    <Link to="/subscription">Subscription</Link>
                </Menu.Item>
            </Menu>
        )
    } else {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="home">
                    <Link to="/">Home</Link>
                </Menu.Item>
            </Menu>
        )
    }
}

export default LeftMenu