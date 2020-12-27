import React from 'react';
import { Navbar } from 'react-bootstrap';

function logo() {
    return (
        <Navbar.Brand href="/PathingFinding/" className='Navbar-logo'>
            <img
                src={process.env.PUBLIC_URL + '/logo.png'} // 取得public資料夾路徑
                width="50"
                height="50"
                className='d-inline-block'
                variant='test'
                alt='Logo'
            /> {' '}
                    Path-Finding
        </Navbar.Brand>
    )
}

export default logo
