import React, { useContext, useState } from 'react'
/* import '../../css/bootstrap.min.css' */
import '../DashboardPage/styleDashboard.css'
import { Link, useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { AuthContext } from '../../index'
import { NavbarDashboard } from '../../components/NavbarDashboard'
import { SidebarDashboard } from '../../components/SidebarDashboard'

import Swal from 'sweetalert2'

export const Dashboard = () => {
    const [open, setOpen] = useState(false)
    const { setLoggedIn, dataUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const names = localStorage.getItem('name')
    const username = localStorage.getItem('username')
    const role = localStorage.getItem('role')

    const logOut = () => {
        localStorage.clear()
        setLoggedIn(false)
        navigate('/login')
        Swal.fire({
            icon: 'success',
            timer: 1000,
            showConfirmButton: false
        })
    }

    return (
        <>

            <header className="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow sticky-top justify-content align-items-center">
                {/* <img className='ms-3' src={logo} width='35px' height='35px' /> */}
                <div className='navbar-nav navbar-brand col-md-3 col-lg-2 me-0 px-3' style={{backgroundColor: '#000000'}}>
                    <Link className="brush">WH 24/7</Link>
                </div>
                <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" onClick={() => setOpen(!open)}
                    aria-controls="sidebarMenu" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

            </header>

            <div className="container-fluid">
                <div className="row">

                    {/* <SidebarDashboard/> */}
                    <nav id="sidebarMenu" className={`col-md-3 col-lg-2 d-md-block bg-light sidebar ${open ? 'collapsing' : 'collapse'}`} style={open ? { height: 'auto' } : { '': '' }}>
                        <div className="position-sticky pt-3 sidebar-sticky">
                            <h5
                                className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-uppercase">
                                <span>Welcome: {names}</span>
                                <span>Role: {role}</span>
                                <Link className="link-secondary" href="#" aria-label="Add a new report">
                                    <span data-feather="plus-circle" className="align-text-bottom"></span>
                                </Link>
                            </h5>
                            <ul className="nav flex-column d-flex">
                                <li className="nav-item">
                                    <Link className="nav-link bi bi-person" to='users'>
                                        <span data-feather="users" className="align-text-bottom"> </span>
                                        Users
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link bi bi-buildings" to='warehouses'>
                                        <span data-feather="users" className="align-text-bottom"> </span>
                                        Warehouse
                                    </Link>
                                </li>
                                {
                                    role === 'ADMIN' ? (
                                        <>
                                            <li className="nav-item">
                                                <a className="nav-link bi bi-house-door" aria-current="page" href="#">
                                                    <span className="align-text-bottom bi"> </span>
                                                    Home
                                                </a>
                                            </li>
                                            <li className="nav-item me-5">
                                                <Link className="nav-link bi bi-shop" to={'branches'} >
                                                    <span data-feather="file" className="align-text-bottom"> </span>
                                                    Branchs
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link bi bi-file-bar-graph" href="#" to={'services'}>
                                                    <span data-feather="shopping-cart" className="align-text-bottom"> </span>
                                                    Services
                                                </Link>
                                            </li>
                                        </>
                                    ) : (
                                        <></>
                                    )
                                }
                            </ul>
                            <ul className="nav h-50 d-flex flex-column justify-content-between mb-2">

                                <div className='fixed-bottom'>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#" onClick={logOut}>
                                            <span data-feather="file-text" className="align-text-bottom"></span>
                                            Log Out
                                        </a>
                                    </li>
                                </div>
                            </ul>

                        </div>
                    </nav>

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <Outlet/>
                    </main>
                </div>
            </div>
        </>
    )
}
