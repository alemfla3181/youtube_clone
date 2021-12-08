import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button } from 'antd';
import './Sections/Navbar.css';
import {RightSquareOutlined} from '@ant-design/icons';

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
                <a href="/"><img src="https://cdn-icons.flaticon.com/png/512/2504/premium/2504848.png?token=exp=1638943792~hmac=b6840c7fd4d63137abeff6e710158a42" width='50%'/></a>
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