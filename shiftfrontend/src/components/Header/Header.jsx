import React from 'react'
import "./header.scss"
export default function Header() {
    return (
        <header className="header">
            <div>uPAGED</div>
            <div className="menu">
                <div className="menuOption">Find Work</div>
                <div className="menuOption">Timesheets</div>
                <div className="menuOption">Messaging</div>
            </div>
            <div className="userCenter">
                <div className="avatar"></div>
                <div className="logOut">Log Out</div>
            </div>




        </header>
    )
}
