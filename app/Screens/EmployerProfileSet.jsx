import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from '../../config/firebaseConfig';
import useUserStore from '../store/userStore';

// Icons & Images
const profilePic = require('../../assets/images/driver.png');
const profileIcon = require('../../assets/images/man.png');
const postJobIcon = require('../../assets/images/favourite.png');
const viewJobsIcon = require('../../assets/images/favourite.png');
const inboxIcon = require('../../assets/images/mail.png');
const logoutIcon = require('../../assets/images/check-out.png');

export default function EmployerProfileSet() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { phoneNumber } = useUserStore();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchUserData = async () => {
      try {
        if (!phoneNumber) {
          Alert.alert("Error", "No phone number found");
          return;
        }

        const userRef = doc(FIREBASE_DB, "users", phoneNumber);
        const docSnap = await getDoc(userRef);

        if (isMounted) {
          setUserData(docSnap.exists() ? docSnap.data() : {});
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        Alert.alert("Error", "Failed to load user data");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUserData();
    return () => { isMounted = false };
  }, [phoneNumber]);

  const user = {
    name: userData?.name ? `${t('name')}: ${userData.name}` : t('welcomeSir', ''),
    phone: `${t('phone')}: ${phoneNumber}`,
    profilePicture: profilePic,
  };

  const menuOptions = [
    { title: t('myProfile'), icon: profileIcon, screen: 'EmployeeProfile' },
    { title: t('Post a Service/Job'), icon: postJobIcon, screen: 'ServicePostingDetails' },
    { title: t('View Your Jobs'), icon: viewJobsIcon, screen: 'UserJobScreen' },
    { title: t('Inbox'), icon: inboxIcon, screen: 'ChatScreen' },
    { title: t('Logout'), icon: logoutIcon, action: 'logout' },
  ];

  const handleMenuPress = async (item) => {
    if (item.action === 'logout') {
      Alert.alert(
        t('logoutConfirmationTitle', 'Logout'),
        t('logoutConfirmationMessage', 'Are you sure you want to logout?'),
        [
          { text: t('cancel', 'Cancel'), style: 'cancel' },
          { 
            text: t('yes', 'Yes'), 
            onPress: async () => {
              await AsyncStorage.clear();
              navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
            }
          },
        ]
      );
    } else if (item.screen) {
      navigation.navigate(item.screen);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient colors={['#4CAF50', '#2E7D32']} style={styles.header}>
        <Image source={user.profilePicture} style={styles.profileImage} />
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.profilePhone}>{user.phone}</Text>
      </LinearGradient>

      {/* Loader while fetching data */}
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
      ) : (
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFF',
    marginBottom: 10,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
  profilePhone: {
    fontSize: 16,
    color: '#E0E0E0',
    marginTop: 5,
  },
  loader: {
    marginTop: 50,
  },
  menu: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  menuIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
