// import React from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import { useTranslation } from 'react-i18next';

// const profilePic = require('../../assets/images/driver.png');
// const profileIcon = require('../../assets/images/man.png');
// const favoritesIcon = require('../../assets/images/favourite.png');
// const inboxIcon = require('../../assets/images/mail.png');
// const logoutIcon = require('../../assets/images/check-out.png');

// export default function ProfileScreen({ navigation }) {
//   const { t } = useTranslation();

//   const user = {
//     name: t('name') + ': John Doe',
//     phone: t('phone') + ': +123 456 7890',
//     profilePicture: profilePic,
//   };

//   const menuOptions = [
//     { title: t('myProfile'), icon: profileIcon, screen: 'EmployeeProfile' },
//     { title: t('favorites'), icon: favoritesIcon, screen: 'Favorites' },
//     { title: t('inbox'), icon: inboxIcon, screen: 'Inbox' },
//     { title: t('logout'), icon: logoutIcon, screen: 'Logout' },
//   ];

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Image source={user.profilePicture} style={styles.profileImage} />
//         <Text style={styles.profileName}>{user.name}</Text>
//         <Text style={styles.profilePhone}>{user.phone}</Text>
//       </View>

//       {/* Menu Options */}
//       <View style={styles.menu}>
//         {menuOptions.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             style={styles.menuItem}
//             onPress={() => navigation.navigate(item.screen)}
//           >
//             <Image source={item.icon} style={styles.menuIcon} />
//             <Text style={styles.menuText}>{item.title}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// }



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//     paddingHorizontal: 20,
//     paddingVertical: 40,
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   profileImageContainer: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: '#4CAF50',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   profileImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//   },
//   profileName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   profilePhone: {
//     fontSize: 16,
//     color: '#777',
//     marginTop: 5,
//   },
//   menu: {
//     marginTop: 20,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 15,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   menuIconContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#FFECB3',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   menuIcon: {
//     width: 20,
//     height: 20,
//     resizeMode: 'contain',
//   },
//   menuText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
// },
// });


import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from '../../config/firebaseConfig';
import useUserStore from '../store/userStore'; // Assuming you're using Zustand

const profilePic = require('../../assets/images/driver.png');
const profileIcon = require('../../assets/images/man.png');
const favoritesIcon = require('../../assets/images/favourite.png');
const inboxIcon = require('../../assets/images/mail.png');
const logoutIcon = require('../../assets/images/check-out.png');

export default function EmployeeProfileSet() {
  const { phoneNumber } = useUserStore();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const navigation = useNavigation();
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = doc(FIREBASE_DB, "users", phoneNumber);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        Alert.alert("Error", "Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [phoneNumber]);

   const user = {
     // userData?.name ? `${t('name')}: ${userData.name}` : t('welcomeSir', 'Welcome Sir')
     name: t('name') + userData?.name,
     phone: t('phone') + (' ') + phoneNumber,
     profilePicture: profilePic,
   };

  const menuOptions = [
    { title: t('myProfile'), icon: profileIcon, screen: 'EmployeeProfile' },
    { title: t('favorites'), icon: favoritesIcon, screen: 'FavouriteJobsScreen' },
    { title: t('inbox'), icon: inboxIcon, screen: 'ChatScreen' },
    { title: t('logout'), icon: logoutIcon, action: 'logout' },
  ];

  const handleMenuPress = async (item) => {
    if (item.action === 'logout') {
      // Confirm logout action
      Alert.alert(
        t('logoutConfirmationTitle', 'Logout'),
        t('logoutConfirmationMessage', 'Are you sure you want to logout?'),
        [
          {
            text: t('cancel', 'Cancel'),
            style: 'cancel',
          },
          {
            text: t('yes', 'Yes'),
            onPress: async () => {
              await AsyncStorage.clear(); // Clear AsyncStorage
              navigation.reset({
                index: 0,
                routes: [{ name: 'Welcome' }], // Redirect to Welcome screen
              });
            },
          },
        ]
      );
    } else if (item.screen) {
      navigation.navigate(item.screen);
    }
  };

   if (!userData) {
    return (
      <View style={styles.container}>
        <Text>No user data found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={user.profilePicture} style={styles.profileImage} />
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.profilePhone}>{user.phone}</Text>
      </View>

      {/* Menu Options */}
      <View style={styles.menu}>
        {menuOptions.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => handleMenuPress(item)}
          >
            <Image source={item.icon} style={styles.menuIcon} />
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profilePhone: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
  menu: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});



// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useTranslation } from 'react-i18next';
// import { useNavigation } from '@react-navigation/native';
// import { doc, getDoc } from "firebase/firestore";
// import { FIREBASE_DB } from '../../config/firebaseConfig';
// import useUserStore from '../store/userStore';

// const profilePic = require('../../assets/images/driver.png');
// const profileIcon = require('../../assets/images/man.png');
// const favoritesIcon = require('../../assets/images/favourite.png');
// const inboxIcon = require('../../assets/images/mail.png');
// const logoutIcon = require('../../assets/images/check-out.png');

// export default function EmployeeProfileSet() {
//   const { phoneNumber } = useUserStore();
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { t } = useTranslation();
//   const navigation = useNavigation();

//   useEffect(() => {
//     let isMounted = true;
//     const fetchUserData = async () => {
//       try {
//         if (!phoneNumber) {
//           Alert.alert("Error", "No phone number found");
//           return;
//         }

//         const userRef = doc(FIREBASE_DB, "users", phoneNumber);
//         const docSnap = await getDoc(userRef);

//         if (isMounted) {
//           if (docSnap.exists()) {
//             setUserData(docSnap.data());
//           } else {
//             setUserData({}); // Set empty object instead of null
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         Alert.alert("Error", "Failed to load user data");
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     };

//     fetchUserData();
//     return () => { isMounted = false };
//   }, [phoneNumber]);

//   const user = {
//       // userData?.name ? `${t('name')}: ${userData.name}` : t('welcomeSir', 'Welcome Sir')
//       name: t('name') + userData?.name,
//       phone: t('phone ') + phoneNumber,
//       profilePicture: profilePic,
//     };

//   const handleMenuPress = async (item) => {
//     if (item.action === 'logout') {
//       Alert.alert(
//         t('logoutConfirmationTitle', 'Logout'),
//         t('logoutConfirmationMessage', 'Are you sure you want to logout?'),
//         [
//           {
//             text: t('cancel', 'Cancel'),
//             style: 'cancel',
//           },
//           {
//             text: t('yes', 'Yes'),
//             onPress: async () => {
//               await AsyncStorage.clear();
//               navigation.reset({
//                 index: 0,
//                 routes: [{ name: 'Welcome' }],
//               });
//             },
//           },
//         ]
//       );
//     } else if (item.screen) {
//       navigation.navigate(item.screen);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={[styles.container, { justifyContent: 'center' }]}>
//         <ActivityIndicator size="large" color="#4c669f" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Image 
//           source={userData?.photoURL ? { uri: userData.photoURL } : profilePic} 
//           style={styles.profileImage}
//           onError={() => console.log("Error loading profile image")}
//         />
//         <Text style={styles.profileName}>
//           {userData?.name ? `${t('name')}: ${userData.name}` : t('welcomeSir', 'Welcome Sir')}
//         </Text>
//         <Text style={styles.profilePhone}>
//           {`${t('phone')}: ${phoneNumber || t('notAvailable')}`}
//         </Text>
//       </View>

//       {/* Menu Options */}
//       <View style={styles.menu}>
//         {[
//           { title: t('myProfile'), icon: profileIcon, screen: 'EmployeeProfile' },
//           { title: t('favorites'), icon: favoritesIcon, screen: 'Favorites' },
//           { title: t('inbox'), icon: inboxIcon, screen: 'Inbox' },
//           { title: t('logout'), icon: logoutIcon, action: 'logout' },
//         ].map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             style={styles.menuItem}
//             onPress={() => handleMenuPress(item)}
//           >
//             <Image source={item.icon} style={styles.menuIcon} />
//             <Text style={styles.menuText}>{item.title}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// }

// // Keep your existing styles