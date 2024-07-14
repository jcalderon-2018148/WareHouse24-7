import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

export const CardUser = ({ name, surname, email, username, phone, photo, headers, id, butDel, butEdit }) => {
    
    return (
        <div className="card ms-2 mt-2" style={{ width: '18rem' }}>
            <img crossOrigin="anonymous" src={photo} className="card-img-top" alt="..." />

            <div className="card-body">
                <h5 className="card-title">{name} {surname}</h5>
                <p className="card-text">{email}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Username: {username}</li>
                <li className="list-group-item">Phone: {phone}</li>
            </ul>
            <div className="card-body text-center">
                <button className='btn btn-danger bi bi-trash3 ms-1' onClick={(e)=>{e.preventDefault(); butDel()}}> Delete</button>
                <Link to={butEdit}>
                    <button className='btn btn-warning bi bi-pencil ms-1'> Update</button>
                </Link>
            </div>
        </div>
    )
}
