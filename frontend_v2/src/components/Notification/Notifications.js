// components/Notifications.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications, markAsRead } from '../../actions/notificationActions';

const Notifications = ({ isOpen }) => {
  const dispatch = useDispatch();
  const { notifications, loading } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  const handleMarkAsRead = (notificationId) => {
    dispatch(markAsRead(notificationId));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`notifications-dropdown ${isOpen ? 'block' : 'hidden'} absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-50`}>
      {notifications.length === 0 ? (
        <p className="px-4 py-2">Nav jaunu paziņojumu</p>
      ) : (
        notifications.map((notification) => (
          <div key={notification._id} className={`notification-item px-4 py-2 ${notification.isRead ? 'text-gray-500' : 'text-black'}`}>
            <p>{notification.message}</p>
            {!notification.isRead && (
              <button onClick={() => handleMarkAsRead(notification._id)} className="text-blue-500">Mark as read</button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;
