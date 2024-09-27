/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { getLoggedInUser, logout } from '../customs/global/manageLocalStorage';
import { Link, useNavigate } from 'react-router-dom';
import "./../customs/css/SideNavigation.css";

const SideNavigation = ({ isExpanded, handleToggle, showSideNav }) => {
    const navigate = useNavigate();

    const [expandedDropdown, setExpandedDropdown] = useState(null); // State to track expanded dropdown

    const style = { display: !showSideNav && 'flex' }

    const handleLogout = () => {
        logout(navigate);
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
                    <li className="sidebar-item">
                        <Link to='' className="sidebar-link">
                            {/* <i className="lni lni-bar-chart"></i> */}
                            <i className="lni lni-stats-up"></i>
                            <span>Analytics</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to='common/qoutations' className="sidebar-link">
                            <i className="lni lni-handshake"></i>
                            <span>Proposal</span>
                        </Link>
                    </li>

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
                                <Link to='common/my-payslip' className="sidebar-link">Pay Slip</Link>
                            </li>
                            <li className="sidebar-item">
                                <Link to='common/my-attendance' className="sidebar-link">My Attendance</Link>
                            </li>
                        </ul>
                    </li>

                    {/* Services Dropdown */}
                    <li className="sidebar-item">
                        <a
                            href="#"
                            className={`sidebar-link has-dropdown ${expandedDropdown === 'services' ? '' : 'collapsed'}`}
                            data-bs-toggle="collapse"
                            aria-expanded={expandedDropdown === 'services'}
                            onClick={() => toggleDropdown('services')}
                        >
                            <i className="lni lni-helmet"></i>
                            <span>Services</span>
                        </a>
                        <ul id="services" className={`sidebar-dropdown list-unstyled collapse ${expandedDropdown === 'services' ? 'show' : ''}`}>
                            <li className="sidebar-item">
                                <Link to='' className="sidebar-link">Installment</Link>
                            </li>
                            <li className="sidebar-item">
                                <Link to='' className="sidebar-link">Maintenance</Link>
                            </li>
                        </ul>
                    </li>

                    {/* Products Dropdown */}
                    <li className="sidebar-item">
                        <a
                            href="#"
                            className={`sidebar-link has-dropdown ${expandedDropdown === 'products' ? '' : 'collapsed'}`}
                            data-bs-toggle="collapse"
                            aria-expanded={expandedDropdown === 'products'}
                            onClick={() => toggleDropdown('products')}
                        >
                            <i className="lni lni-package"></i>
                            <span>Products</span>
                        </a>
                        <ul id="products" className={`sidebar-dropdown list-unstyled collapse ${expandedDropdown === 'products' ? 'show' : ''}`}>
                            <li className="sidebar-item">
                                <Link to='' className="sidebar-link">Fire Extinguisher</Link>
                            </li>
                            <li className="sidebar-item">
                                <Link to='' className="sidebar-link">Maintenance</Link>
                            </li>
                        </ul>
                    </li>

                    {/* Employees */}
                    <li className="sidebar-item">
                        <Link to='common/clients' className="sidebar-link">
                             <i className="lni lni-network"></i>
                            <span>Clients</span>
                        </Link>
                    </li>

                    <li className="sidebar-item">
                        <Link to='employees' className="sidebar-link">
                            <i className="lni lni-list"></i>
                            <span>Employees</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to='message-request' className="sidebar-link">
                            <i className="lni lni-popup"></i>
                            <span>Inquiries</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to='/under-maintenace' className="sidebar-link">
                            <i className="lni lni-bullhorn"></i>
                            <span>Announcement</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to={`common/user-profile`} className="sidebar-link">
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
    );
}

export default SideNavigation;
