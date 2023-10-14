import React from 'react'
import ProfilePic from '../../components/ProfilePic';
import './style.css';

const Sidebar = () => (
    <div id="sidebar">
        <div className="center">
            <ProfilePic />

            <div id="contact">
                <h1>Aeden Murray</h1>
                <p>aeden@aedenmurray.dev</p>
            </div>
        </div>
    </div>
);

export default Sidebar;
