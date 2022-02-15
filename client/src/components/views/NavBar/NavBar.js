import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button } from 'antd';
import './Sections/Navbar.css';
import { RightSquareOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function NavBar() {
    const [visible, setVisible] = useState(false)

    const showDrawer = () => {
        setVisible(true)
    };

    const onClose = () => {
        setVisible(false)
    };

    return (
        <nav className="menu" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="menu__logo">
                <Link to="/"><img src='img.jpeg' width='100%'/></Link>
            </div>
            <div className="menu__container">
                <div className="menu_left">
                    <LeftMenu mode="vertical" />
                </div>
                <div className="menu_right">
                    <RightMenu mode="vertical" />
                </div>
                <Button
                    className="menu__mobile-button"
                    type="primary"
                    onClick={showDrawer}
                >
                    <RightSquareOutlined />
                </Button>
                <Drawer
                    title="Basic Drawer"
                    placement="right"
                    className="menu_drawer"
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                >
                    <LeftMenu mode="inline" />
                    <RightMenu mode="inline" />
                </Drawer>
            </div>
        </nav>
    )
}

export default NavBar