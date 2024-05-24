/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

const SideNavigation = ({ isExpanded, handleToggle, showSideNav }) => {

    const style = { 
        display: !showSideNav &&  'flex',
        // width: '260px',
        // minWidth: '260px'
        }
    
  return (
    <>


        <aside id="sidebar" className={isExpanded ? 'expand' : ''} style={style}> 
            <div className="d-flex">
                <button className="toggle-btn" type="button" onClick={handleToggle}>
                    <i className="lni lni-grid-alt"></i>
                </button>
                <div className="sidebar-logo">
                    <a href="#">Dashsboard</a>
                </div>
            </div>
            <ul className="sidebar-nav">
                <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                        <i className="lni lni-user"></i>
                        <span>Profile</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                        <i className="lni lni-agenda"></i>
                        <span>Task</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                        data-bs-target="#auth" aria-expanded="false" aria-controls="auth">
                        <i className="lni lni-protection"></i>
                        <span>Auth</span>
                    </a>
                    <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link">Login</a>
                        </li>
                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link">Register</a>
                        </li>
                    </ul>
                </li>
                <li className="sidebar-item">
                    <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                        data-bs-target="#multi" aria-expanded="false" aria-controls="multi">
                        <i className="lni lni-layout"></i>
                        <span>Multi Level</span>
                    </a>
                    <ul id="multi" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link collapsed" data-bs-toggle="collapse"
                                data-bs-target="#multi-two" aria-expanded="false" aria-controls="multi-two">
                                Two Links
                            </a>
                            <ul id="multi-two" className="sidebar-dropdown list-unstyled collapse">
                                <li className="sidebar-item">
                                    <a href="#" className="sidebar-link">Link 1</a>
                                </li>
                                <li className="sidebar-item">
                                    <a href="#" className="sidebar-link">Link 2</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                        <i className="lni lni-popup"></i>
                        <span>Notification</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                        <i className="lni lni-cog"></i>
                        <span>Setting</span>
                    </a>
                </li>
            </ul>
            <div className="sidebar-footer">
                <a href="#" className="sidebar-link">
                    <i className="lni lni-exit"></i>
                    <span>Logout</span>
                </a>
            </div>
        </aside>
    

    </>
  )
}

export default SideNavigation