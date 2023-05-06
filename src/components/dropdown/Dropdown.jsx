import React, {useRef} from 'react'
import { useHistory } from 'react-router'

import { useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import { signOut } from "../../redux/actions/authAction";
import './dropdown.css'

const clickOutsideRef = (content_ref, toggle_ref) => {
    document.addEventListener('mousedown', (e) => {
        if (toggle_ref.current && toggle_ref.current.contains(e.target)) {
            content_ref.current.classList.toggle('active')
        } else {
            if (content_ref.current && !content_ref.current.contains(e.target)) {
                content_ref.current.classList.remove('active')
            }
        }
    })
}

const Dropdown = props => {
    const navigate = useHistory();
    const dispatch = useDispatch();
    const handleSignOut = () => {
        dispatch(signOut());
        navigate.push('/login')
    };

    return (
        <div className='dropdown'>
            <Link to="/">
            <button className="btn btn-btn"
                onClick={() => handleSignOut()}
            >
                    SignOut
            </button>
            </Link>
        </div>
    )
}

export default Dropdown
