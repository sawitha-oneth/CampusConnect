import React, { createContext, useState, useContext, useEffect } from 'react';
import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState({
    name: 'Oneth Dilvan',
    id: 'PE/2022/051',
    faculty: 'Science',
  });

 
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('You need to enable notifications for this app in your settings.');
      }
    };
    requestPermissions();
  }, []);

  // Notification එකක් යවන්න function එකක්
  const sendLocalNotification = async (title, body) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
      },
      trigger: null, // null කියන්නේ එකපාරටම යවන්න කියන එක (Immediate)
    });
  };

  const toggleFavorite = (eventId, eventTitle) => {
    setFavorites((prev) => {
      if (prev.includes(eventId)) {
        return prev.filter((id) => id !== eventId); 
      } else {
        // Save කරාම Notification එක යවනවා
        sendLocalNotification("Event Bookmarked! 📌", `You have successfully saved "${eventTitle}".`);
        return [...prev, eventId]; 
      }
    });
  };

  return (
    <AppContext.Provider value={{ favorites, toggleFavorite, user }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);