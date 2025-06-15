
// import React, { useState, useEffect } from 'react';
// import { View, Button, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
// import { Icon } from 'react-native-elements';
// import { LinearGradient } from 'expo-linear-gradient';
// import Swiper from 'react-native-swiper';
// import { doc, getDoc } from "firebase/firestore";
// import { FIREBASE_DB } from '../../config/firebaseConfig';
// import useUserStore from '../store/userStore';

// import AllJobsScreenWithoutCategory from './AllJobsScreenWithoutCategory';
// import UserJobsScreen from './UserJobsScreen';
// import ServicePostingDetails from './ServicePostingDetails';

// const petImages = [
//   require('../../assets/images/worker.png'),
//   require('../../assets/images/plumber1.jpg'),
//   require('../../assets/images/mechanic1.webp'),
// ];

// export default function EmployerHome({ navigation }) {
//   const { phoneNumber } = useUserStore();
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         if (!phoneNumber) return;
//         const userRef = doc(FIREBASE_DB, "users", phoneNumber);
//         const docSnap = await getDoc(userRef);
//         if (docSnap.exists()) setUserData(docSnap.data());
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };
//     fetchUserData();
//   }, [phoneNumber]);

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <LinearGradient colors={['#4c669f', '#3b5998']} style={styles.header}>
//         <View style={styles.profileContainer}>
//           <Image source={require('../../assets/images/Aadil.jpg')} style={styles.profileImage} />
//           <Text style={styles.headerText}>Welcome, {userData?.name || 'User'}</Text>
//         </View>
//         <TouchableOpacity onPress={() => navigation.navigate('Bot')}>
//           <Image source={require('../../assets/images/bot.png')} style={styles.rightImage} />
//         </TouchableOpacity>
//       </LinearGradient>

//       {/* Swiper Section */}
//       <Swiper style={styles.swiper} autoplay>
//         {petImages.map((image, index) => (
//           <View key={index} style={styles.swiperSlide}>
//             <Image source={image} style={styles.swiperImage} />
//           </View>
//         ))}
//       </Swiper>
      
//       {/* Categories Section */}
//       <Text style={styles.sectionTitle}>Job Categories</Text>
      
//       <ScrollView horizontal style={styles.categoriesContainer} showsHorizontalScrollIndicator={false}>
//         {[
//           { name: 'Driver', image: require('../../assets/images/driver.png') },
//           { name: 'Plumber', image: require('../../assets/images/plumber.png') },
//           { name: 'Gardener', image: require('../../assets/images/gardener.png') },
//           { name: 'Electrician', image: require('../../assets/images/electrician.png') },
//           { name: 'Mechanic', image: require('../../assets/images/mechanic.png') },
//           { name: 'Carpenter', image: require('../../assets/images/carpenter.jpg') },
//         ].map((category, index) => (
//           <TouchableOpacity key={index} style={styles.category}>
//             <Image source={category.image} style={styles.categoryIcon} />
//             <Text style={styles.categoryText}>{category.name}</Text>
//           </TouchableOpacity>
//         ))}
        
//       </ScrollView>
      
//       <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
//   {/* Button for ServicePostingDetails */}
//   <TouchableOpacity 
//     style={{ flex: 1, backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, alignItems: 'center', margin: 5, elevation: 3 }} 
//     onPress={() => navigation.navigate('ServicePostingDetails')}
//   >
//     <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Post a Job</Text>
//   </TouchableOpacity>

//   {/* Button for UserJobsScreen */}
//   <TouchableOpacity 
//     style={{ flex: 1, backgroundColor: '#2196F3', padding: 15, borderRadius: 10, alignItems: 'center', margin: 5, elevation: 3 }} 
//     onPress={() => navigation.navigate('UserJobScreen')}
//   >
//     <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Applicants</Text>
//   </TouchableOpacity>
// </View>

      
//       {/* Jobs Section */}
//       {/* <TouchableOpacity 
//   style={{ backgroundColor: '#3b5998', marginTop:-60, padding: 20, borderRadius: 8, alignItems: 'center' }} 
//   onPress={() => navigation.navigate('ServicePostingDetails')}
// >
//   <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Go to Service Posting Details</Text>
// </TouchableOpacity> */}




//       {/* Create Profile Button */}
//       <TouchableOpacity style={styles.createProfileBtn} onPress={() => navigation.navigate('Profile1')}>
//         <Icon name="user-plus" type="font-awesome" size={24} color="white" />
//         <Text style={styles.createProfileTxt}>Create Your Profile</Text>
//       </TouchableOpacity>

//       {/* Bottom Navigation */}
//       <View style={styles.bottomNav}>
//         <TouchableOpacity style={styles.navButton}>
//           <Icon name="home" type="font-awesome" size={22} color="#ffffff" />
//           <Text style={styles.navText}>Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('FavouriteJobsScreen')}>
//           <Icon name="heart" type="font-awesome" size={22} color="#ffffff" />
//           <Text style={styles.navText}>Saved</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navButton}>
//           <Icon name="comment" type="font-awesome" size={22} color="#ffffff" />
//           <Text style={styles.navText}>Messages</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('EmployerProfileSet')}>
//           <Icon name="user" type="font-awesome" size={22} color="#ffffff" />
//           <Text style={styles.navText}>Profile</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f5f5f5' },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//   },
//   profileContainer: { flexDirection: 'row', alignItems: 'center' },
//   profileImage: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
//   headerText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
//   rightImage: { width: 45, height: 45, borderRadius: 25 },
//   swiper: { height: 180, marginTop: 20 },
//   swiperSlide: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   swiperImage: { width: '90%', height: 140, borderRadius: 15, },
//   sectionTitle: { fontSize: 18, marginTop:45, fontWeight: 'bold', margin: 15, color: '#333' },
//   categoriesContainer: { paddingLeft: 15, marginBottom: 10 },
//   category: {
//     alignItems: 'center',
//     marginRight: 15,
//     width: 140,
//     height: 150,
//     justifyContent: 'center',
//     backgroundColor: '#ffffff',
//     borderRadius: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   categoryIcon: { width: 60, height: 60, borderRadius: 10, marginBottom: 5 },
//   categoryText: { fontSize: 14, fontWeight: 'bold', color: '#333' },
//   createProfileBtn: {
//     backgroundColor: '#3b5998',
//     borderRadius: 25,
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     alignItems: 'center',
//     alignSelf: 'center',
//     marginTop: 0,
//     marginBottom: 65,
//   },
//   createProfileTxt: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
//   bottomNav: {
//     flexDirection: 'row',
//     backgroundColor: '#3b5998',
//     justifyContent: 'space-around',
//     paddingVertical: 10,
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//   },
//   navButton: { alignItems: 'center' },
//   navText: { fontSize: 13, color: '#fff', marginTop: 4 },
// });



import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import Swiper from 'react-native-swiper';
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from '../../config/firebaseConfig';
import useUserStore from '../store/userStore';

const jobCategories = [
  { name: 'Driver', image: require('../../assets/images/driver.png') },
  { name: 'Plumber', image: require('../../assets/images/plumber.png') },
  { name: 'Gardener', image: require('../../assets/images/gardener.png') },
  { name: 'Electrician', image: require('../../assets/images/electrician.png') },
  { name: 'Mechanic', image: require('../../assets/images/mechanic.png') },
  { name: 'Carpenter', image: require('../../assets/images/carpenter.jpg') },
];

const bannerImages = [
  require('../../assets/images/worker.png'),
  require('../../assets/images/plumber1.jpg'),
  require('../../assets/images/mechanic1.webp'),
];

export default function EmployerHome({ navigation }) {
  const { phoneNumber } = useUserStore();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!phoneNumber) return;
        const userRef = doc(FIREBASE_DB, "users", phoneNumber);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) setUserData(docSnap.data());
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [phoneNumber]);

  return (
    <View style={styles.container}>
      {/* Header with Gradient Background */}
      <LinearGradient 
        colors={['#6a11cb', '#2575fc']} 
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.profileContainer}>
          <Image 
            source={require('../../assets/images/defaultProfile.jpg')} 
            style={styles.profileImage} 
          />
          <View style={styles.welcomeContainer}>
            <Text style={styles.greetingText}>Welcome back</Text>
            <Text style={styles.headerText}>{userData?.name || 'User'}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Bot')}>
          <Image 
            source={require('../../assets/images/bot.png')} 
            style={styles.rightImage} 
          />
        </TouchableOpacity>
      </LinearGradient>

      {/* Banner Slider */}
      <View style={styles.bannerContainer}>
        <Swiper 
          style={styles.swiper} 
          autoplay 
          autoplayTimeout={4}
          dotColor="rgba(255,255,255,0.4)"
          activeDotColor="#fff"
          showsPagination
        >
          {bannerImages.map((image, index) => (
            <View key={index} style={styles.slide}>
              <Image source={image} style={styles.bannerImage} />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.5)']}
                style={styles.bannerOverlay}
              />
            </View>
          ))}
        </Swiper>
      </View>

      {/* Categories Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Job Categories</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {jobCategories.map((category, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.categoryCard}
              onPress={() => navigation.navigate('CategoryJobs', { category: category.name })}
            >
              <View style={styles.categoryIconContainer}>
                <Image source={category.image} style={styles.categoryIcon} />
              </View>
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.postJobButton]}
          onPress={() => navigation.navigate('ServicePostingDetails')}
        >
          <Icon name="plus" type="font-awesome" size={20} color="white" />
          <Text style={styles.actionButtonText}>Post a Job</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.viewApplicantsButton]}
          onPress={() => navigation.navigate('UserJobScreen')}
        >
          <Icon name="users" type="font-awesome" size={18} color="white" />
          <Text style={styles.actionButtonText}>Applicants</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Completion Prompt */}
      <TouchableOpacity 
        style={styles.profilePrompt}
        onPress={() => navigation.navigate('Profile1')}
      >
        <Icon name="user-circle" type="font-awesome" size={20} color="#5E72E4" />
        <Text style={styles.profilePromptText}>Complete your profile</Text>
        <Icon name="chevron-right" type="font-awesome" size={16} color="#5E72E4" />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Icon name="home" type="font-awesome" size={22} color="#5E72E4" />
          <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={() => navigation.navigate('FavouriteJobsScreen')}
        >
          <Icon name="heart" type="font-awesome" size={20} color="#A0AEC0" />
          <Text style={styles.navText}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('ChatScreen')}
          >
          <Icon name="comment" type="font-awesome" size={20} color="#A0AEC0" />
          <Text style={styles.navText}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('EmployerProfileSet')}
        >
          <Icon name="user" type="font-awesome" size={20} color="#A0AEC0" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
  },
  welcomeContainer: {
    marginLeft: 15,
  },
  greetingText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 2,
  },
  rightImage: {
    width: 45,
    height: 45,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
  },
  bannerContainer: {
    height: 160,
    marginTop: 20,
    marginHorizontal: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  swiper: {
    height: '100%',
  },
  slide: {
    flex: 1,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  sectionContainer: {
    marginTop: 25,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 15,
  },
  categoriesScroll: {
    paddingRight: 15,
  },
  categoryCard: {
    width: 100,
    marginRight: 15,
  },
  categoryIconContainer: {
    width: 80,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
    textAlign: 'center',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 5,
  },
  postJobButton: {
    backgroundColor: '#5E72E4',
  },
  viewApplicantsButton: {
    backgroundColor: '#2DCE89',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  profilePrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 15,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  profilePromptText: {
    fontSize: 14,
    color: '#5E72E4',
    fontWeight: '600',
    marginHorizontal: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    paddingVertical: 12,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#EDF2F7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  navButton: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  navText: {
    fontSize: 12,
    color: '#A0AEC0',
    marginTop: 5,
  },
  activeNavText: {
    color: '#5E72E4',
    fontWeight: '600',
  },
});

//export default EmployerHome;