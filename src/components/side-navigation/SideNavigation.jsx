/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { logout } from '../../customs/global/manageLocalStorage';
import { Link } from 'react-router-dom';
import { resetCurrentDtr } from '../../store/features/dtrSlice';
import { useDispatch } from 'react-redux';
import "./../../customs/css/SideNavigation.css";
import "./TopNavbar.css";
import { isDepartmentAllowed } from '../../customs/global/manageLocalStorage';
import { getLoggedInID } from '../../customs/global/manageLocalStorage';

const SideNavigation = ({ isExpanded, handleToggle, showSideNav }) => {
    const dispatch = useDispatch();

    const [expandedDropdown, setExpandedDropdown] = useState(null);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notificationCount] = useState(3); // Example notification count

    const style = { display: !showSideNav && 'flex' }

    const handleLogout = () => {
        dispatch(resetCurrentDtr());
        logout();
    };

    const toggleDropdown = (id) => {
        setExpandedDropdown(expandedDropdown === id ? null : id);
    };

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    // Example notifications data
    const notifications = [
        { id: 1, message: "New DTR request pending", time: "5 min ago", unread: true },
        { id: 2, message: "Overtime approved", time: "1 hour ago", unread: true },
        { id: 3, message: "Payslip is now available", time: "2 hours ago", unread: false },
    ];

    return (
        <>
            {/* Top Navigation Bar */}
            <nav className="top-navbar">
                <div className="navbar-left">
                    <button className="toggle-btn-mobile" type="button" onClick={handleToggle}>
                        <i className="lni lni-grid-alt"></i>
                    </button>
                    <span className="navbar-title">Dashboard</span>
                </div>
                
                <div className="navbar-right">
                    {/* Notification Button */}
                    <div className="notification-wrapper">
                        <button className="notification-btn" onClick={toggleNotifications}>
                            <i className="lni lni-alarm"></i>
                            {notificationCount > 0 && (
                                <span className="notification-badge">{notificationCount}</span>
                            )}
                        </button>
                        
                        {/* Notification Dropdown */}
                        {showNotifications && (
                            <div className="notification-dropdown">
                                <div className="notification-header">
                                    <h4>Notifications</h4>
                                    <button className="mark-read-btn">Mark all as read</button>
                                </div>
                                <div className="notification-list">
                                    {notifications.map((notif) => (
                                        <div 
                                            key={notif.id} 
                                            className={`notification-item ${notif.unread ? 'unread' : ''}`}
                                        >
                                            <div className="notification-icon">
                                                <i className="lni lni-checkmark-circle"></i>
                                            </div>
                                            <div className="notification-content">
                                                <p className="notification-message">{notif.message}</p>
                                                <span className="notification-time">{notif.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="notification-footer">
                                    <Link to="/notifications">See all notifications</Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User Profile */}
                    <Link to={`general/user-profile`} className="user-profile-btn">
                        <i className="lni lni-user"></i>
                    </Link>
                </div>
            </nav>

            {/* Sidebar */}
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
                                {isDepartmentAllowed([1,2,6]) && (
                                    <li className="sidebar-item">
                                        <Link to='overtime-review' className="sidebar-link">Overtime Requests</Link>
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
                                    <Link to='general/my-attendance' className="sidebar-link">DTR Logs</Link>
                                </li>
                                <li className="sidebar-item">
                                    <Link to='general/file-overtime' className="sidebar-link">File Over Time</Link>
                                </li>
                                <li className="sidebar-item">
                                    <Link to={`common/overtime-records/${getLoggedInID()}`} className="sidebar-link">Overtime Records</Link>
                                </li>
                            </ul>
                        </li>
                    )}

                    {isDepartmentAllowed([1,5,7]) && (
                        <li className="sidebar-item">
                            <Link to='common/products' className="sidebar-link">
                                <i className="lni lni-briefcase"></i>
                                <span>Products</span>
                            </Link>
                        </li>	
                    )}

                    {isDepartmentAllowed([1,5,7]) && (
                        <li className="sidebar-item">
                            <Link to='common/job-order' className="sidebar-link">
                               <i className="lni lni-users"></i>
                                <span>Job Order</span>
                            </Link>
                        </li>	
                    )}

                    {isDepartmentAllowed([1,8]) && (
                        <li className="sidebar-item">
                            <Link to='common/clients' className="sidebar-link">
                                <i className="lni lni-network"></i>
                                <span>Clients</span>
                            </Link>
                        </li>
                    )}

                    {isDepartmentAllowed([1,2]) && (
                        <li className="sidebar-item">
                            <Link to='employeeList' className="sidebar-link">
                                <i className="lni lni-list"></i>
                                <span>Employees</span>
                            </Link>
                        </li>
                    )}
                    
                    {/* {isDepartmentAllowed() && (
                        <li className="sidebar-item">
                            <Link to={`general/user-profile`} className="sidebar-link">
                                <i className="lni lni-cog"></i>
                                <span>Account Setting</span>
                            </Link>
                        </li>
                    )} */}
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