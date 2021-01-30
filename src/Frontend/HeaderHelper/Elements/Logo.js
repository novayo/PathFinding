import React from 'react';
import { Navbar } from 'react-bootstrap';

function logo() {
    return (
        <Navbar.Brand href="/PathFinding/" className='navbar-logo'>
            {/* <img
                src={process.env.PUBLIC_URL + '/logo.png'} // 取得public資料夾路徑
                width="50"
                height="50"
                className='d-inline-block'
                variant='test'
                alt='Logo'
            /> {' '} */}
                    PathFinding
        </Navbar.Brand>
    )
}

export default logo
