import React from 'react'
import './homeStyle.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { NavbarHome } from '../../components/NavbarHome'


export const HomePage = () => {

    return (
        <div className='body text-center text-bg-dark'>
            <div className="d-flex p-3 mx-auto flex-column"> {/* mx-auto */}
                
                <NavbarHome/>

                <main className="px-3 mt-auto">
                    <h1 className='h1247'>Warehouse 24/7</h1>
                    <p className="p247 lead">
                        Find a perfect <strong>Warehouse</strong> to start your business.
                    </p>
                    <p className="lead">
                        <Link href="#" className="btn btn-lg btn-light fw-bold border-white bg-white">More info</Link>
                    </p>
                </main>

                <footer className="mt-auto text-white-50">
                    <p>Warehouse 24/7®</p>
                </footer>
            </div>
        </div>

    )
}