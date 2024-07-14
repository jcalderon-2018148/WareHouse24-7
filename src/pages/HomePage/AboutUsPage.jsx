import React from 'react'
import { NavbarHome } from '../../components/NavbarHome.jsx'
import './homeStyle.css'
import about from '../../assets/about.jpg'

export const AboutUsPage = () => {
    return (
        
            <div className='body text-center text-bg-dark'>
                <div className="d-flex p-3 flex-column"> {/* mx-auto */}
                    <NavbarHome />
                    <main className="px-3">
                        <div className="row">
                            <div className="offset-lg-3 col-lg-6 text-center">
                                <h2 className="h1247 fw-bold pb-3 pt-5">WHO WE ARE
                                </h2>
                            </div>

                            <div className="row align-items-center">
                                <div className="col-lg-3 col-md-4 pt-5 pb-5 ms-auto ">
                                    <img className='aboutimg rounded' src={about} width='600ww' height='350vh' />
                                </div>
                                <div className="col-lg-5 offset-lg-3 col-md-8 me-auto">
                                    <h3 className="h2247 text-white fs-1 text-decoration-underline pb-3 pt-3">About Us</h3>
                                    <p className="p247 fs-5 text-white">
                                        In Warehouse 24/7, we believe that running a warehouse leasing company doesn't have to be complicated.
                                        That is why we have created a system designed to keep track of these in an efficient and practical way.
                                        <br/>
                                        Our team is made up of technology experts and we are committed to customer satisfaction and in the 
                                        warehouse leasing business.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        
    )
}
