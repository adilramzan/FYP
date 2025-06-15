// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import { useTranslation } from 'react-i18next';
// import { doc, getDoc } from 'firebase/firestore';
// import { FIREBASE_DB } from '../../config/firebaseConfig';
// import useUserStore from '../store/userStore';

// export default function UserDetailsScreen({ navigation }) {
//   const { phoneNumber } = useUserStore();
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { t } = useTranslation();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userRef = doc(FIREBASE_DB, 'users', phoneNumber);
//         const docSnap = await getDoc(userRef);

//         if (docSnap.exists()) {
//           setUserData(docSnap.data());
//         } else {
//           console.log('No such document!');
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         Alert.alert('Error', 'Failed to load user data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [phoneNumber]);

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#4CAF50" />
//       </View>
//     );
//   }

//   if (!userData) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorMessage}>No user data found</Text>
//       </View>
//     );
//   }

//   const user = {
//     image: require('../../assets/images/person.webp'),
//     name: userData.name,
//     phoneNumber: phoneNumber,
//     age: userData.age,
//     sex: 'Male',
//     profession: userData.profession,
//     experience: userData.experience,
//     about: userData.aboutMe,
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* User Image */}
//       <View style={styles.imageContainer}>
//         <Image source={user.image} style={styles.userImage} />
//       </View>

//       {/* User Info */}
//       <View style={styles.infoContainer}>
//         <Text style={styles.userName}>{user.name}</Text>
//         <Text style={styles.userPhone}>{user.phoneNumber}</Text>

//         {/* Attributes */}
//         <View style={styles.attributes}>
//           <View style={styles.attributeCard}>
//             {/* <Text style={styles.attributeTitle}>Age</Text> */}
//             <Text style={styles.attributeTitle}>{t('age')}</Text>
//             <Text style={styles.attributeValue}>{user.age}</Text>
//           </View>
//           <View style={styles.attributeCard}>
//             {/* <Text style={styles.attributeTitle}>Sex</Text> */}
//             <Text style={styles.attributeTitle}>{t('sex')}</Text>
//             <Text style={styles.attributeValue}>{user.sex}</Text>
//           </View>
//           <View style={styles.attributeCard}>
//             {/* <Text style={styles.attributeTitle}>Profession</Text> */}
//             <Text style={styles.attributeTitle}>{t('profession')}</Text>
//             <Text style={styles.attributeValue}>{user.profession}</Text>
//           </View>
//           <View style={styles.attributeCard}>
//             {/* <Text style={styles.attributeTitle}>Experience</Text> */}
//             <Text style={styles.attributeTitle}>{t('experience')}</Text>
//             <Text style={styles.attributeValue}>{user.experience}</Text>
//           </View>
//         </View>

//         {/* About Section */}
//         <View style={styles.aboutContainer}>
//           {/* <Text style={styles.sectionTitle}>About {user.name}</Text> */}
//           <Text style={styles.sectionTitle}>{t('about', { name: user.name })}</Text>
//           <Text style={styles.aboutText}>{user.about}</Text>
//         </View>
//       </View>

//       {/* Hire Me Button */}
//       <TouchableOpacity 
//         style={styles.hireButton}
//         onPress={() => navigation.navigate('EmployeeHome')}
//       >
//         {/* <Text style={styles.homeButton}>Home Page</Text> */}
//         <Text style={styles.homeButton}>{t('homePage')}</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#F8FAFD',
//     paddingBottom: 20,
//     paddingHorizontal: 16,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorMessage: {
//     fontSize: 16,
//     color: 'red',
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   imageContainer: {
//     alignItems: 'center',
//     marginTop: 30,
//   },
//   userImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     borderWidth: 4,
//     borderColor: '#4CAF50',
//   },
//   infoContainer: {
//     backgroundColor: '#FFF',
//     borderRadius: 20,
//     padding: 20,
//     marginTop: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   userName: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#333',
//     textAlign: 'center',
//   },
//   userPhone: {
//     fontSize: 14,
//     color: '#777',
//     textAlign: 'center',
//     marginVertical: 8,
//   },
//   attributes: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginTop: 15,
//   },
//   attributeCard: {
//     width: '48%',
//     backgroundColor: '#E3F2FD',
//     borderRadius: 12,
//     paddingVertical: 14,
//     paddingHorizontal: 10,
//     marginBottom: 12,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   attributeTitle: {
//     fontSize: 12,
//     color: '#555',
//     marginBottom: 5,
//     textTransform: 'uppercase',
//     fontWeight: '600',
//   },
//   attributeValue: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#2E7D32',
//     textAlign: 'center',
//   },
//   aboutContainer: {
//     backgroundColor: '#E8F5E9',
//     padding: 15,
//     borderRadius: 12,
//     marginTop: 10,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 8,
//   },
//   aboutText: {
//     fontSize: 14,
//     color: '#555',
//     lineHeight: 20,
//   },
//   hireButton: {
//     backgroundColor: '#4CAF50',
//     padding: 15,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginHorizontal: 20,
//     marginTop: 20,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   homeButton: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#FFF',
//   },
// });


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../config/firebaseConfig';
import useUserStore from '../store/userStore';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function UserDetailsScreen({ navigation }) {
  const { phoneNumber } = useUserStore();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [localImage, setLocalImage] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Load user data from Firestore
        const userRef = doc(FIREBASE_DB, 'users', phoneNumber);
        const docSnap = await getDoc(userRef);
        
        // Load locally stored image if exists
        const storedImage = await AsyncStorage.getItem(`userImage_${phoneNumber}`);
        
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
        
        if (storedImage) {
          setLocalImage({ uri: storedImage });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Error', 'Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [phoneNumber]);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'We need camera roll permissions to upload images');
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0].uri;
        setLocalImage({ uri: selectedImage });
        // Store the image URI locally
        await AsyncStorage.setItem(`userImage_${phoneNumber}`, selectedImage);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to select image');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorMessage}>No user data found</Text>
      </View>
    );
  }

  const user = {
    image: localImage || require('../../assets/images/person.webp'),
    name: userData.name,
    phoneNumber: phoneNumber,
    age: userData.age,
    sex: 'Male',
    profession: userData.profession,
    experience: userData.experience,
    about: userData.aboutMe,
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* User Image with Camera Button */}
      <View style={styles.imageContainer}>
        <Image source={user.image} style={styles.userImage} />
        <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
          <Ionicons name="camera" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Rest of your existing code remains the same */}
      <View style={styles.infoContainer}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userPhone}>{user.phoneNumber}</Text>

        <View style={styles.attributes}>
          <View style={styles.attributeCard}>
            <Text style={styles.attributeTitle}>{t('age')}</Text>
            <Text style={styles.attributeValue}>{user.age}</Text>
          </View>
          <View style={styles.attributeCard}>
            <Text style={styles.attributeTitle}>{t('sex')}</Text>
            <Text style={styles.attributeValue}>{user.sex}</Text>
          </View>
          <View style={styles.attributeCard}>
            <Text style={styles.attributeTitle}>{t('profession')}</Text>
            <Text style={styles.attributeValue}>{user.profession}</Text>
          </View>
          <View style={styles.attributeCard}>
            <Text style={styles.attributeTitle}>{t('experience')}</Text>
            <Text style={styles.attributeValue}>{user.experience}</Text>
          </View>
        </View>

        <View style={styles.aboutContainer}>
          <Text style={styles.sectionTitle}>{t('about', { name: user.name })}</Text>
          <Text style={styles.aboutText}>{user.about}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.hireButton}
        onPress={() => navigation.navigate('EmployeeHome')}
      >
        <Text style={styles.homeButton}>{t('homePage')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // ... (keep all your existing styles)

  // Add these new styles:
  cameraButton: {
    position: 'absolute',
    right: 100,
    bottom: 5,
    backgroundColor: '#4CAF50',
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  
  // Modify the imageContainer to be relative positioned
  imageContainer: {
    alignItems: 'center',
    marginTop: 30,
    position: 'relative', // Add this for absolute positioning of camera button
  },
  
  // Keep all other existing styles the same
  container: {
    flexGrow: 1,
    backgroundColor: '#F8FAFD',
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  userImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#4CAF50',
  },
  infoContainer: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  userPhone: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginVertical: 8,
  },
  attributes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  attributeCard: {
    width: '48%',
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  attributeTitle: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  attributeValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
  },
  aboutContainer: {
    backgroundColor: '#E8F5E9',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  hireButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  homeButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});