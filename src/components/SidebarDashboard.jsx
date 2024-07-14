import React, { useContext } from 'react'
/* import { AuthContext } from '../../src/index' */
import '../pages/DashboardPage/styleDashboard.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const SidebarDashboard = () => {
    /* const [open, setOpen] = useContext(AuthContext) */
    const [open, setOpen] = useState(false)
    return (
        <nav id="sidebarMenu" className={`col-md-3 col-lg-2 d-md-block bg-light sidebar ${open ? 'collapsing' : 'collapse'}`} style={open ? { height: 'auto' } : { '': '' }}>
            <div className="position-sticky pt-3 sidebar-sticky">
                <h5
                    className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-uppercase">
                    <span>Welcome:</span>
                    <a className="link-secondary" href="#" aria-label="Add a new report">
                        <span data-feather="plus-circle" className="align-text-bottom"></span>
                    </a>
                </h5>
                <ul className="nav flex-column d-flex">
                    <li className="nav-item">
                        <a className="nav-link bi bi-house-door" aria-current="page" href="#">
                            <span className="align-text-bottom bi"> </span>
                            Home
                        </a>
                    </li>
                    <li className="nav-item me-5">
                        <a className="nav-link bi bi-shop" href="#">
                            <span data-feather="file" className="align-text-bottom"> </span>
                            Branchs
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link bi bi-file-bar-graph" href="#">
                            <span data-feather="shopping-cart" className="align-text-bottom"> </span>
                            Services
                        </a>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link bi bi-person" to='users'>
                            <span data-feather="users" className="align-text-bottom"> </span>
                            Users
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link bi bi-buildings" href="#">
                            <span data-feather="users" className="align-text-bottom"> </span>
                            Warehouse
                        </a>
                    </li>
                </ul>

            </div>
        </nav>
    )
}
