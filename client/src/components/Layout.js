import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { setUser } from '../redux/userSlice';
import { createStore } from 'redux'

import './Layout.css'
import { Badge } from 'antd'
function Layout({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.user)
    console.log(user,'sdafs');
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false)


    const adminMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'ri-home-line'
        },
        {
            name: 'Users',
            path: '/Users',
            icon: 'ri-file-list-line'
        },
        {
            name: 'Sample',
            path: '/sample',
            icon: 'ri-user-star-fill'
        },
        {
            name: 'Sample',
            path: '/sample',
            icon: 'ri-user-line'
        },

    ]
 


    
    return (
        <div className='main'>
            <div className="d-flex layout">
                <div className='sidebar'>
                    <div className="sidebar-header">
                        <h1 className='logo'>SH</h1>
                        <h1 className='role'>Admin</h1>
                    </div>
                    <div className="menu">
                        {adminMenu.map((item) => {
                            const isActive = location.pathname === item.path
                            return <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`} >
                                <i class={item.icon}></i>
                                {!collapsed && <Link to={item.path}>{item.name}</Link>}
                            </div>
                        })}
                        <div className={`d-flex menu-item`} onClick={() => {
                            localStorage.clear()
                           dispatch(setUser(null))
                            navigate('/login')
                        }} >
                            <i class='ri-logout-box-r-line'></i>
                            {!collapsed && <Link to='/login'>Logout</Link>}
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout