import { useState, useEffect } from 'react'
import './NotificationButton.css'
import { Link } from 'react-router-dom';
import { getNotification, updateNotification } from '../../store/features/notificationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { connectNotificationSocket } from '../../customs/global/notificationSocket';
import { getLoggedInID } from '../../customs/global/manageLocalStorage';
import { getCurrentDate } from '../../customs/global/manageDates';

const NotificationButton = () => {

    const dispatch = useDispatch();

    const [showNotifications, setShowNotifications] = useState(false);

    const { notByUserIdList, loading } = useSelector((state) => state.notification);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    useEffect(() => {
        if(parseInt(getLoggedInID())) {
            const userId = parseInt(getLoggedInID())
            dispatch(getNotification({userId}))
            connectNotificationSocket(dispatch, {userId})
        }
    }, [dispatch])
    

    const markAllRead = async () => {
        const data =   {
            is_read: 1,
            read_at: getCurrentDate(),
            user_id: parseInt(getLoggedInID())
        }
        await dispatch(updateNotification(data));
    }

    const showMore = () => {
    if (loading || !notByUserIdList.has_more) return;

    dispatch(
        getNotification({
            userId: parseInt(getLoggedInID()),
            page: 1,                
            limit: notByUserIdList.limit + 5,   //increase limit by 5
        })
    );
    };

  return (
    <div className="notification-wrapper">
            <button className="notification-btn" onClick={toggleNotifications}>
                <i className="lni lni-alarm"></i>
                {notByUserIdList.not_read > 0 && (
                    <span className="notification-badge">{notByUserIdList.not_read}</span>
                )}
            </button>
            
        {/* Notification Dropdown */}
        {showNotifications && (
                <div className="notification-dropdown">
                    <div className="notification-header">
                        <h4>Notifications</h4>
                        <button className="mark-read-btn" onClick={markAllRead}>Mark all as read</button>
                    </div>
                    <div className="notification-list">
                        {notByUserIdList.data.map((notif) => (
                            <div 
                                key={notif.id} 
                                className={`notification-item ${notif.is_read ? '' : 'unread'}`}
                            >
                                <div className="notification-icon">
                                    <i className="lni lni-checkmark-circle"></i>
                                </div>
                                <div className="notification-content">
                                    <p className="notification-message">{notif.message}</p>
                                    <span className="notification-time">{notif.created_at}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="notification-footer">
                        <Link onClick={showMore}>See all notifications</Link>
                    </div>
                </div>
            )}
        </div>
  )
}

export default NotificationButton