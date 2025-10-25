/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { getLoggedInUser, logout } from '../customs/global/manageLocalStorage';
import { Link, useNavigate } from 'react-router-dom';
import { resetCurrentDtr } from '../store/features/dtrSlice';
import { useDispatch } from 'react-redux';
import "./../customs/css/SideNavigation.css";
import { isDepartmentAllowed } from '../customs/global/manageLocalStorage';
import { startTransition } from "react";

const SideNavigation = ({ isExpanded, handleToggle, showSideNav }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [expandedDropdown, setExpandedDropdown] = useState(null); // State to track expanded dropdown

    const style = { display: !showSideNav && 'flex' }


    const handleLogout = () => {
        dispatch(resetCurrentDtr());
        logout();
    };

    const toggleDropdown = (id) => {
        setExpandedDropdown(expandedDropdown === id ? null : id); // Toggle dropdown state
    };

    return (
        <>
            <aside id="sidebar" className={isExpanded ? 'expand' : ''} style={style}>
                <div className="d-flex">
                    <button className="toggle-btn" type="button" onClick={handleToggle}>
                        <i className="lni lni-grid-alt"></i>
                    </button>
                    <div className="sidebar-logo">
                        <a href="#">Dashboard</a>
                    </div>
                </div>
                <ul className="sidebar-nav">
                    {isDepartmentAllowed([1,2]) && (
                        <li className="sidebar-item">
                            <Link to='' className="sidebar-link">
                                {/* <i className="lni lni-bar-chart"></i> */}
                                <i className="lni lni-stats-up"></i>
                                <span>Analytics</span>
                            </Link>
                        </li>
                    )}



                {isDepartmentAllowed() && (

                    <li className="sidebar-item">
                        <a
                            href="#"
                            className={`sidebar-link has-dropdown ${expandedDropdown === 'dtr' ? '' : 'collapsed'}`}
                            data-bs-toggle="collapse"
                            aria-expanded={expandedDropdown === 'dtr'}
                            onClick={() => toggleDropdown('dtr')}
                        >
                            <i className="lni lni-checkmark"></i>
                            <span>Dtr</span>
                        </a>
                        <ul id="dtr" className={`sidebar-dropdown list-unstyled collapse ${expandedDropdown === 'dtr' ? 'show' : ''}`}>
                        {isDepartmentAllowed() && (
                            
                            <li className="sidebar-item">
                                <Link to='general/dtr' className="sidebar-link">My Dtr</Link>
                            </li>
                        )}
                        {isDepartmentAllowed([1,2]) && (
                            <li className="sidebar-item">
                                <Link to='common/dtr-request' className="sidebar-link">Dtr Requests</Link>
                            </li>
                        )}
                        {isDepartmentAllowed([6]) && (
                            <li className="sidebar-item">
                                <Link to='dtr-review' className="sidebar-link">Dtr Review</Link>
                            </li>
                        )}
                        {isDepartmentAllowed() && (
                            <li className="sidebar-item">
                                <Link to='cutoff' className="sidebar-link">Cut off</Link>
                            </li>
                        )}
                        </ul>
                    </li>
                )}
                {isDepartmentAllowed([1,8,6,5,7,3,4]) && (
                    <li className="sidebar-item">
                        <Link to='common/qoutations' className="sidebar-link">
                            <i className="lni lni-handshake"></i>
                            <span>Proposal</span>
                        </Link>
                    </li>
                )}
                {isDepartmentAllowed() && (
                    <>
                    {/* My Records Dropdown */}
                    <li className="sidebar-item">
                        <a
                            href="#"
                            className={`sidebar-link has-dropdown ${expandedDropdown === 'myrecords' ? '' : 'collapsed'}`}
                            data-bs-toggle="collapse"
                            aria-expanded={expandedDropdown === 'myrecords'}
                            onClick={() => toggleDropdown('myrecords')}
                        >
                            <i className="lni lni-protection"></i>
                            <span>My Records</span>
                        </a>
                        <ul id="myrecords" className={`sidebar-dropdown list-unstyled collapse ${expandedDropdown === 'myrecords' ? 'show' : ''}`}>
                            <li className="sidebar-item">
                                <Link to='general/my-payslip' className="sidebar-link">Pay Slip</Link>
                            </li>
                            <li className="sidebar-item">
                                <Link to='general/my-attendance' className="sidebar-link">My Attendance</Link>
                            </li>
                            <li className="sidebar-item">
                                <Link to='general/my-attendance' className="sidebar-link">File Over Time</Link>
                            </li>
                        </ul>
                    </li>
                    </>
                )}

          

                {isDepartmentAllowed([1,5,7]) && (
                    <>
                    {/* Products */}
                        <li className="sidebar-item">
                            <Link to='common/products' className="sidebar-link">
                                <i className="lni lni-briefcase"></i>
                                <span>Products</span>
                            </Link>
                        </li>	
                    </>
                )}

                {isDepartmentAllowed([1,5,7]) && (
                    <>
                    {/* Products */}
                        <li className="sidebar-item">
                            <Link to='common/job-order' className="sidebar-link">
                               <i className="lni lni-users"></i>
                                <span>Job Order</span>
                            </Link>
                        </li>	
                    </>
                )}

                {isDepartmentAllowed([1,8]) && (
                    <>
                      {/* Clients */}
                        <li className="sidebar-item">
                            <Link to='common/clients' className="sidebar-link">
                                <i className="lni lni-network"></i>
                                <span>Clients</span>
                            </Link>
                        </li>
                    </>
                )}

                {isDepartmentAllowed([1,2]) && (
                    <li className="sidebar-item">
                        <Link to='employeeList' className="sidebar-link">
                            <i className="lni lni-list"></i>
                            <span>Employees</span>
                        </Link>
                    </li>
                )}
                {isDepartmentAllowed() && (
                    <li className="sidebar-item">
                        <Link to={`general/user-profile`} className="sidebar-link">
                            <i className="lni lni-cog"></i>
                            <span>Account Setting</span>
                        </Link>
                    </li>
                )}


                </ul>
                <div className="sidebar-footer">
                    <Link className="sidebar-link" onClick={handleLogout}>
                        <i className="lni lni-exit"></i>
                        <span>Logout</span>
                    </Link>
                </div>
            </aside>
        </>
    );
}

export default SideNavigation;
