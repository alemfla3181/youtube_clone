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
                <a href="/"><img src="https://w.namu.la/s/9a2bd12a2c488026b0c552bd6527248ba60e70bf6e6d07e9c3a7f500fba5a9f0f74cb75a8fcd42babc39fa9abeec697c6dd86cd7c766515834b94b10746f95c87f4d8743802496b925ae19b289aa98882de82e4213eb1b4b20da1840a801387e" width='100%'/></a>
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