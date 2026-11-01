# Campus Connect - Mobile App (PE/2022/051)

**Name:** Savitha Oneth 
**Student ID:** PE/2022/051 
**Course:** COST 32152 / COSC 32152 / BECS 3227 Mobile Application Development  
**Assignment:** 01

---

## 1. Application Overview & Purpose
**Campus Connect** is a mobile application designed for university students to easily discover, filter, and bookmark university events such as tech talks, sports meets, and cultural nights. The app solves the problem of students missing out on important campus events by providing a centralized, easy-to-use platform with real-time notifications and offline bookmarking capabilities.

---

## 2. Screen Breakdown
The application consists of the following main screens:
1. **Events Screen (Home):** Displays a scrollable FlatList of all available hard-coded events. Includes a Filter Modal to filter events by category.
2. **Event Details Screen:** Shows a detailed view of the selected event, including the description, time, location, and a bookmark button.
3. **Favorites Screen:** Displays only the events that the user has bookmarked/saved. Shows an empty state if no events are saved.
4. **Profile Screen:** A beautifully designed UI showing the student's details and the number of saved events.

---

## 3. Core React Native Components Used
- **`View` & `Text`:** Used extensively across all screens for layout and typography.
- **`FlatList`:** Implemented in the `Events` and `Favorites` screens to render the hard-coded data efficiently.
- **`Image`:** Used in the `EventCard` and Details screen to show event banners.
- **`Pressable` & `TouchableOpacity`:** Used for interactive elements (filter buttons, bookmarks) to provide HCI feedback (opacity changes).
- **`Modal`:** Implemented in the Events screen for the Category Filter feature.
- **`AppState`:** Utilized in the Root Layout to detect when the app comes to the foreground.
- **`Alert`:** Used to confirm actions like "Event added to favorites".

---

## 4. Expo Router Structure
The project uses Expo Router's file-based routing:
- `app/_layout.tsx`: The root Stack layout. Wraps the app with `AppProvider` and handles `AppState` listeners.
- `app/(tabs)/_layout.tsx`: The Bottom Tab navigator (Events, Favorites, Profile).
- `app/(tabs)/index.tsx`: The main Events list screen.
- `app/(tabs)/favorites.tsx`: The Favorites list screen.
- `app/(tabs)/profile.tsx`: The Profile screen.
- `app/event/[id].tsx`: A dynamic nested Stack route for Event Details.

---

## 5. State Management Approach
Global state is managed using the **React Context API** (`AppContext.js`). 
- `favorites`: An array of event IDs that the user has bookmarked. This state is shared across the Events, Favorites, and Details screens.
- `user`: Holds the hard-coded student profile data.
- **Sharing:** When a user taps the heart icon on the Events screen, it updates the context, which instantly reflects on the Favorites tab badge and screen.

---

## 6. Research & Implementation of Local Notifications
**Research:** I researched the Expo documentation for `expo-notifications`. I learned that to send immediate notifications, we must set a notification handler and request user permissions upon app startup.
**Implementation:** When a user bookmarks an event, the `toggleFavorite` function in the Context API triggers `Notifications.scheduleNotificationAsync` with a `trigger: null` (immediate). This successfully displays a local notification saying "Event Bookmarked!".

---

## 7. AppState Behavior
The `AppState` API is implemented in `app/_layout.tsx`. It listens for changes in the app's state. When the app transitions from `background` or `inactive` back to `active`, an Alert pops up saying "Welcome Back!". This demonstrates the app's ability to detect foreground transitions.

---

## 8. Local Setup Instructions
To run this project locally:
1. Clone the repository: `git clone [Your Repo Link]`
2. Navigate to the folder: `cd CampusConnect`
3. Install dependencies: `npm install`
4. Start the development server: `npx expo start -c`
5. Scan the QR code with Expo Go.

---

## 9. Demonstration Video Link [Watch the Demo Video Here]
https://drive.google.com/file/d/15cDdMAd9K4Z7Qg1jQAoOgTtGWGG2VRqg/view?usp=sharing

---
## 10. The APK File is the Campus Connect
https://expo.dev/accounts/dilvan/projects/CampusConnect/builds/a9fb227c-f72d-4177-9c0f-4d0416138225