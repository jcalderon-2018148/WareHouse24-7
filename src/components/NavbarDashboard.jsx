import React, { useContext } from 'react'
/* import { AuthContext } from '../../src/index' */
import '../pages/DashboardPage/styleDashboard.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const NavbarDashboard = () => {
    /* const [open, setOpen] = useContext(AuthContext) */
    const [open, setOpen] = useState(false)
    return (
        <header className="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow sticky-top justify-content align-items-center">
            {/* <img className='ms-3' src={logo} width='35px' height='35px' /> */}
            <div className='navbar-nav navbar-brand col-md-3 col-lg-2 me-0 px-3' style={{ backgroundColor: '#ffffff' }}>
                <Link className="brush">WH 24/7</Link>
            </div>
            <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" onClick={() => setOpen(!open)}
                aria-controls="sidebarMenu" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

        </header>
    )
}
