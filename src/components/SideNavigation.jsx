/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { getLoggedInUser, logout } from '../customs/global/manageLocalStorage';
import { Link, useNavigate } from 'react-router-dom';
import "./../customs/css/SideNavigation.css";

const SideNavigation = ({ isExpanded, handleToggle, showSideNav }) => {

    const navigate = useNavigate();

    const style = { display: !showSideNav &&  'flex' }

    const handleLogout = () => {
        logout(navigate);
    };
    
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
                    <Link to='' className="sidebar-link">
                        <i className="lni lni-bar-chart"></i>
                        <span>Analytics</span>
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to='common/qoutations' className="sidebar-link">
                        <i className="lni lni-agenda"></i>
                        <span>Proposal</span>
                    </Link>
                </li>
                <li className="sidebar-item">
                    <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                        data-bs-target="#auth" aria-expanded="false" aria-controls="auth">
                        <i className="lni lni-protection"></i>
                        <span>My Records</span>
                    </a>
                    <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                        <li className="sidebar-item">
                            <Link to='common/my-payslip' className="sidebar-link">Pay Slip</Link>
                        </li>
                        <li className="sidebar-item">
                            <Link to='common/my-attendance' className="sidebar-link">My Attendance</Link>
                        </li>
                    </ul>
                </li>

                


                {/* <li className="sidebar-item">
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
                </li> */}
                <li className="sidebar-item">
                    <Link to='employees' className="sidebar-link">
                        <i className="lni lni-consulting"></i>
                        <span>Employees</span>
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to={`common/user-profile/${getLoggedInUser().id}`} className="sidebar-link">
                        <i className="lni lni-cog"></i>
                        <span>Account Setting</span>
                    </Link>
                </li>
            </ul>
            <div className="sidebar-footer">
                <Link className="sidebar-link" onClick={handleLogout}>
                    <i className="lni lni-exit"></i>
                    <span>Logout</span>
                </Link>
            </div>
        </aside>
    

    </>
  )
}

export default SideNavigation