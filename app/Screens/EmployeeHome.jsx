// import React, { useState,useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
// import { Icon } from 'react-native-elements';
// import { LinearGradient } from 'expo-linear-gradient';
// import Swiper from 'react-native-swiper';
// import { router } from 'expo-router';
// import { Route } from 'expo-router/build/Route';
// import { useRoute } from '@react-navigation/native';
// import { useTranslation } from 'react-i18next'; // Import useTranslation

// import { doc, getDoc } from "firebase/firestore";
// import { FIREBASE_DB } from '../../config/firebaseConfig';
// import useUserStore from '../store/userStore'; // Assuming you're using Zustand

// import AllJobsScreenWithoutCategory from './AllJobsScreenWithoutCategory';

// // Static Imports for Images
// const petImages = [
//   require('../../assets/images/worker.png'),
//   require('../../assets/images/plumber1.jpg'),
//   require('../../assets/images/mechanic1.webp'),
// ];

// export default function EmployeeHome({ navigation }) {
//   const { phoneNumber, userType } = useUserStore();
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [likedJobs, setLikedJobs] = useState({});
//   const route = useRoute();
//   const { t } = useTranslation(); // Initialize translation hook
//   // const { phoneNumber, userType } = route.params || {}; 

//   // useEffect(() => {
//   //   const fetchUserData = async () => {
//   //     try {
//   //       const userRef = doc(FIREBASE_DB, "users", phoneNumber);
//   //       const docSnap = await getDoc(userRef);

//   //       if (docSnap.exists()) {
//   //         setUserData(docSnap.data());
//   //       } else {
//   //         console.log("No such document!");
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching user data:", error);
//   //       Alert.alert("Error", "Failed to load user data");
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchUserData();
//   // }, [phoneNumber]);

//   // Add null-safe operator for userData in useEffect cleanup
// useEffect(() => {
//   let isMounted = true;
//   const fetchUserData = async () => {
//     try {
//       if (!phoneNumber) return;
      
//       const userRef = doc(FIREBASE_DB, "users", phoneNumber);
//       const docSnap = await getDoc(userRef);

//       if (isMounted) {
//         if (docSnap.exists()) {
//           setUserData(docSnap.data());
//         } else {
//           //console.log("No such document!");
//           console.log(t("no_document"));
//           setUserData({}); // Set empty object instead of null
//         }
//       }
//     } catch (error) {
//       // console.error("Error fetching user data:", error);
//       // Alert.alert("Error", "Failed to load user data");
//       console.error(t("error_fetching"), error);
//       Alert.alert(t("error_fetching"));
//     } finally {
//       if (isMounted) setLoading(false);
//     }
//   };

//   fetchUserData();
//   return () => { isMounted = false };
// }, [phoneNumber]);

//   const handleJobPress = (job) => {
//     // Navigate to job description screen or handle job details logic here
//     console.log(`Job selected: ${job.name}`);
//     navigation.navigate('JobDescription', { job });
//   };

//   const handleCategorySelectPress = (category) => {
//     // Navigate to job description screen or handle job details logic here
//     //console.log(`Category selected: ${category.name}`);
//     console.log(t("select_category", { category: category.name }));
//     navigation.navigate('CategoryDescription', { selectedCategory: category.name });
//   };

//   const toggleLike = (jobName) => {
//     setLikedJobs((prevState) => ({
//       ...prevState,
//       [jobName]: !prevState[jobName], // Toggle the like status
//     }));
//   };

//   return (
//     <View style={styles.container}>
      
//       {/* Header with Profile Picture, Welcome Text, and Image on the Right */}
//       <LinearGradient colors={['#fff', '#fff']} style={styles.header}>
//         <View style={styles.profileContainer}>
//           <Image
//             source={require('../../assets/images/Aadil.jpg')}
//             style={styles.profileImage}
//           />
//          {/* <Text style={styles.headerText}>Welcome {userData?.name || 'Sir'}</Text> */}
//           <Text style={styles.headerText}>{t("welcome", { name: userData?.name || 'Sir' })}</Text>
//         </View>
//         <TouchableOpacity 
//            onPress={() => navigation.navigate('Bot')}
//         >
//           <Image
//             source={require('../../assets/images/bot.png')} // Replace with your desired image path
//             style={styles.rightImage}
//           />
//         </TouchableOpacity>
//       </LinearGradient>



//       {/* Image Swiper Section */}
//       <Swiper style={styles.swiper} showsPagination={false} autoplay>
//         {petImages.map((image, index) => (
//           <View key={index} style={styles.swiperSlide}>
//             <Image source={image} style={styles.swiperImage} />
//           </View>
//         ))}
//       </Swiper>

//       {/* Category Section */}
//       {/* <Text style={styles.sectionTitle}>Categories</Text> */}
//       <Text style={styles.sectionTitle}>{t("categories")}</Text>
//       {/* <ScrollView horizontal style={styles.categoriesContainer} showsHorizontalScrollIndicator={false}>
//         {[ 
//           { name: 'Driver', image: require('../../assets/images/driver.png') },
//           { name: 'Plumber', image: require('../../assets/images/plumber.png') },
//           { name: 'Gardener', image: require('../../assets/images/gardener.png') },
//           { name: 'Truck Driver', image: require('../../assets/images/delivery.png') },
//           { name: 'Electrician', image: require('../../assets/images/electrician.png') },
//           { name: 'Mechanic', image: require('../../assets/images/mechanic.png') },
//           { name: 'Carpenter', image: require('../../assets/images/carpenter.jpg') },
//           // Carpenter: require('../../assets/images/carpenter.jpg'),
//         ].map((category, index) => (
//           <TouchableOpacity key={index} style={styles.category} onPress={() => handleCategorySelectPress(category)}>
//             <Image source={category.image} style={styles.categoryIcon} />
//             <Text style={styles.categoryText}>{category.name}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView> */}
//       <ScrollView horizontal style={styles.categoriesContainer} showsHorizontalScrollIndicator={false}>
//         {[
//           { name: t('driver'), image: require('../../assets/images/driver.png') },
//           { name: t('plumber'), image: require('../../assets/images/plumber.png') },
//           { name: t('gardener'), image: require('../../assets/images/gardener.png') },
//           { name: t('truck_driver'), image: require('../../assets/images/delivery.png') },
//           { name: t('electrician'), image: require('../../assets/images/electrician.png') },
//           { name: t('mechanic'), image: require('../../assets/images/mechanic.png') },
//           { name: t('carpenter'), image: require('../../assets/images/carpenter.jpg') },
//         ].map((category, index) => (
//           <TouchableOpacity key={index} style={styles.category} onPress={() => handleCategorySelectPress(category)}>
//             <Image source={category.image} style={styles.categoryIcon} />
//             <Text style={styles.categoryText}>{category.name}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {/* <Text style={styles.availableJobs}>Available Jobs</Text>
//       <ScrollView horizontal style={styles.jobsContainer} showsHorizontalScrollIndicator={false}>
//         {[ 
//           { name: 'Driver', location: 'New York', pay: '$3000', image: require('../../assets/images/driver.png') },
//           { name: 'Plumber', location: 'Los Angeles', pay: '$2500', image: require('../../assets/images/plumber.png') },
//           { name: 'Gardener', location: 'Chicago', pay: '$2000', image: require('../../assets/images/gardener.png') },
//           { name: 'Electrician', location: 'Houston', pay: '$3500', image: require('../../assets/images/electrician.png') },
//           { name: 'Mechanic', location: 'Phoenix', pay: '$4000', image: require('../../assets/images/mechanic.png') },
//         ].map((job, index) => (
//           <TouchableOpacity key={index} style={styles.jobCard} onPress={() => handleJobPress(job)}>
//             <Image source={job.image} style={styles.jobImage} />
//             <Text style={styles.jobName}>{job.name}</Text>
//             <Text style={styles.jobLocation}>{job.location}</Text>
//             <Text style={styles.jobPay}>{job.pay}</Text>

           
//             <TouchableOpacity
//               style={styles.likeButton}
//               onPress={() => toggleLike(job.name)}
//             >
//               <Icon
//                 name={likedJobs[job.name] ? 'heart' : 'heart-o'}
//                 type="font-awesome"
//                 color={likedJobs[job.name] ? 'red' : '#ccc'}
//                 size={20}
//               />
//             </TouchableOpacity>
//           </TouchableOpacity>
//         ))}
//       </ScrollView> */}

//       <AllJobsScreenWithoutCategory/>

//       {/* Add New Job Button */}
//       <TouchableOpacity style={styles.createProfileBtn}
//         onPress={() => navigation.navigate('Profile1')}
//       >
//         <Icon name="user-plus" type="font-awesome" size={24} color="white" />
//         {/*< Text style={styles.createProfileTxt}>Create Your Profile</Text>*/}
//         <Text style={styles.createProfileTxt}>{t("create_profile")}</Text>
//       </TouchableOpacity>

//       {/* Bottom Navigation */}
//       <View style={styles.bottomNav}>
//         <TouchableOpacity style={styles.navButton}>
//           <Icon name="home" type="font-awesome" size={20} color="#250152" />
//           {/*<Text style={styles.navText}>Home</Text>*/}
//           <Text style={styles.navText}>{t("home")}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navButton}  onPress={() => navigation.navigate('FavouriteJobsScreen')} >
//           <Icon name="heart" type="font-awesome" size={20} color="#250152" />
//           {/*<Text style={styles.navText}>Saved</Text>*/}
//           <Text style={styles.navText}>{t("saved")}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ChatScreen')}>
//           <Icon name="comment" type="font-awesome" size={20} color="#250152" />
//           {/*<Text style={styles.navText}>Messages</Text>*/}
//           <Text style={styles.navText}>{t("messages")}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//             style={styles.navButton}
//             onPress={() => navigation.navigate('EmployeeProfileSet')}
//         >
//             <Icon name="user" type="font-awesome" size={20} color="#250152" />
//             {/*<Text style={styles.navText}>Profile</Text>*/}
//             <Text style={styles.navText}>{t("profile")}</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f8f8',
//   },
//   header: {
//     marginTop:30,
//     padding: 10, // Reduced padding
//     flexDirection: 'row',
//     alignItems: 'center',
    
//   },
//   profileContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
    
//   },
//   profileImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 15,
//     marginLeft:10,
//   },
//   headerText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   rightImage: {
//     width: 50, // Adjust the width as needed
//     height: 50, // Adjust the height as needed
//     borderRadius: 25,
//     marginLeft: 120, // Push the image to the right
//   },
//   swiper: {
//     height: 180, // Reduced swiper height
//     marginTop: 5, // Reduced margin top
//     marginBottom:20,
//     borderRadius: 20,
//   },
//   swiperSlide: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   swiperImage: {
//     width: '90%',
//     height: 90,
//     borderRadius: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginVertical: 5, // Reduced margin
//     marginLeft: 15,
//     marginTop:20,
//   },
//   categoriesContainer: {
//     paddingVertical: 5, // Reduced padding
//     paddingLeft: 10,
//     height: 30,
//   },
//   category: {
//     alignItems: 'center',
//     marginRight: 10, // Reduced margin
//     width: 100,
//     height: 100,
//     justifyContent: 'center',
//     backgroundColor: '#eef2f3',
//     borderRadius: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 5,
//   },
//   categoryIcon: {
//     width: 60, // Reduced size
//     height: 60,
//     borderRadius: 10,
//     marginBottom: 5, // Reduced margin
//   },
//   categoryText: {
//     marginTop:5,
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333',
//     textAlign: 'center',
//   },
//   availableJobs: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginVertical: 5, // Reduced margin
//     marginLeft: 15,
//     marginBottom:60,
//   },
//   jobsContainer: {
//     paddingVertical: 10, // Reduced padding
//     paddingLeft: 10,
//     marginTop: -60, // Adjusted marginTop to move "" up
//   },
//   jobCard: {
//     width: 140, // Job card width remains unchanged
//     height: 160,
//     backgroundColor: '#eef2f3',
//     borderRadius: 20,
//     padding: 15, // Padding stays the same
//     marginRight: 10, // Margin stays the same
//     justifyContent: 'flex-start',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 5,
//   },
//   jobImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 10,
//     marginBottom: 8,
//     alignSelf: 'center',
//   },
//   jobName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     textAlign: 'center',
//   },
//   jobLocation: {
//     fontSize: 14,
//     color: '#666',
//     textAlign: 'center',
//     marginTop: 4, // Reduced margin
//   },
//   jobPay: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#ff5c5c',
//     textAlign: 'center',
//     marginTop: 4, // Reduced margin
//   },
//   likeButton: {
//     position: 'absolute',
//     top: 5,
//     right: 5,
//   },
//   createProfileBtn: {
//     backgroundColor: '#4c669f',
//     borderRadius: 24,
//     paddingVertical: 10, // Reduced padding
//     paddingHorizontal: 25, // Reduced padding
//     alignItems: 'center',
    
//     //position: 'absolute',
//    width:250,
//     bottom: 80, // Adjusted position
//     left: '37%',
//     transform: [{ translateX: -80 }], // Adjusted position
//   },
//   createProfileTxt: {
//     color: '#fff',
//     fontSize: 16, // Reduced font size
//     fontWeight: 'bold',
//   },
//   bottomNav: {
//     flexDirection: 'row',
//     backgroundColor: '#ffffff',
//     justifyContent: 'space-around',
//     paddingVertical: 8, // Reduced padding
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//   },
//   navButton: {
//     alignItems: 'center',
    
//   },
//   navText: {
//     fontSize: 12,
//     color: '#250152',
// },
// });


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import Swiper from 'react-native-swiper';
import { useTranslation } from 'react-i18next';
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from '../../config/firebaseConfig';
import useUserStore from '../store/userStore';
import AllJobsScreenWithoutCategory from './AllJobsScreenWithoutCategory';

const bannerImages = [
  require('../../assets/images/worker.png'),
  require('../../assets/images/plumber1.jpg'),
  require('../../assets/images/mechanic1.webp'),
];

export default function EmployeeHome({ navigation }) {
  const { phoneNumber } = useUserStore();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    let isMounted = true;
    const fetchUserData = async () => {
      try {
        if (!phoneNumber) return;
        
        const userRef = doc(FIREBASE_DB, "users", phoneNumber);
        const docSnap = await getDoc(userRef);

        if (isMounted) {
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log(t("no_document"));
            setUserData({});
          }
        }
      } catch (error) {
        console.error(t("error_fetching"), error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUserData();
    return () => { isMounted = false };
  }, [phoneNumber]);

  const handleCategorySelectPress = (category) => {
    navigation.navigate('CategoryDescription', { selectedCategory: category.name });
  };

  return (
    <View style={styles.container}>
      {/* Main ScrollView for all content */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
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
              
              <Text style={styles.headerText}>{t("Welcome", { name: userData?.name || 'Sir' })}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Bot')}>
            <Image
              source={require('../../assets/images/bot.png')}
              style={styles.rightImage}
            />
          </TouchableOpacity>
        </LinearGradient>

        {/* Search Bar Placeholder */}
        <TouchableOpacity 
          style={styles.searchContainer}
          onPress={() => navigation.navigate('SearchScreen')}
        >
          <Icon name="search" type="font-awesome" size={18} color="#888" />
          <Text style={styles.searchText}>{t("search")}</Text>
        </TouchableOpacity>

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
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t("categories")}</Text>
            <TouchableOpacity>
              
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {[
              { name: t('driver'), image: require('../../assets/images/driver.png') },
              { name: t('plumber'), image: require('../../assets/images/plumber.png') },
              { name: t('gardener'), image: require('../../assets/images/gardener.png') },
              { name: t('truck_driver'), image: require('../../assets/images/delivery.png') },
              { name: t('electrician'), image: require('../../assets/images/electrician.png') },
              { name: t('mechanic'), image: require('../../assets/images/mechanic.png') },
              { name: t('carpenter'), image: require('../../assets/images/carpenter.jpg') },
            ].map((category, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.categoryCard}
                onPress={() => handleCategorySelectPress(category)}
              >
                <View style={styles.categoryIconContainer}>
                  <Image source={category.image} style={styles.categoryIcon} />
                </View>
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Jobs Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            
            <TouchableOpacity>
              
            </TouchableOpacity>
          </View>
          <AllJobsScreenWithoutCategory />
        </View>

        {/* Create Profile Button */}
        <TouchableOpacity 
          style={styles.createProfileBtn}
          onPress={() => navigation.navigate('Profile1')}
        >
          <LinearGradient
            colors={['#6a11cb', '#2575fc']}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Icon name="user-plus" type="font-awesome" size={20} color="white" />
            <Text style={styles.createProfileTxt}>{t("create_profile")}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Icon name="home" type="font-awesome" size={22} color="#6a11cb" />
          <Text style={[styles.navText, styles.activeNavText]}>{t("home")}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('FavouriteJobsScreen')}
        >
          <Icon name="heart" type="font-awesome" size={20} color="#888" />
          <Text style={styles.navText}>{t("saved")}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('ChatScreen')}
        >
          <Icon name="comment" type="font-awesome" size={20} color="#888" />
          <Text style={styles.navText}>{t("messages")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('EmployeeProfileSet')}
        >
          <Icon name="user" type="font-awesome" size={20} color="#888" />
          <Text style={styles.navText}>{t("profile")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    width: 150,
  },
  rightImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchText: {
    color: '#888',
    fontSize: 16,
    marginLeft: 10,
  },
  bannerContainer: {
    height: 180,
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
    justifyContent: 'center',
    alignItems: 'center',
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAll: {
    color: '#6a11cb',
    fontSize: 14,
    fontWeight: '500',
  },
  categoriesScroll: {
    paddingRight: 15,
  },
  categoryCard: {
    width: 100,
    marginRight: 5,
    marginBottom: 10,
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
    color: '#333',
    textAlign: 'center',
  },
  createProfileBtn: {
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 20,
    borderRadius: 30,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createProfileTxt: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
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
    borderTopColor: '#eee',
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
    color: '#888',
    marginTop: 5,
  },
  activeNavText: {
    color: '#6a11cb',
    fontWeight: 'bold',
  },
});