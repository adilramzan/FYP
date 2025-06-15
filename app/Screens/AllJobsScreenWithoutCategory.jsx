
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { collectionGroup, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../config/firebaseConfig';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';  
import useUserStore from '../store/userStore';

const { width } = Dimensions.get('window');

const jobImages = {
  Driver: require('../../assets/images/driver.png'),
  Plumber: require('../../assets/images/plumber.png'),
  Gardener: require('../../assets/images/gardener.png'),
  Electrician: require('../../assets/images/electrician.png'),
  Mechanic: require('../../assets/images/mechanic.png'),
  Default: require('../../assets/images/worker.png'),
};

const AllJobsScreenWithoutCategory = () => {
  const { phoneNumber } = useUserStore();
  const navigation = useNavigation();
  const [jobs, setJobs] = useState([]);
  const [likedJobs, setLikedJobs] = useState({});
  const { t } = useTranslation();

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const querySnapshot = await getDocs(collectionGroup(FIREBASE_DB, 'jobs'));
        const jobsData = [];
        querySnapshot.forEach((doc) => {
          const job = { id: doc.id, ...doc.data() };
          jobsData.push(job);
        });
        setJobs(jobsData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchAllJobs();
  }, []);

  const toggleLike = async (job) => {
    if (!phoneNumber) {
      console.error("User phone number is not available.");
      return;
    }

    const favouriteRef = doc(FIREBASE_DB, 'users', phoneNumber, 'favourites', job.id);

    setLikedJobs((prevState) => ({
      ...prevState,
      [job.id]: !prevState[job.id],
    }));

    try {
      if (!likedJobs[job.id]) {
        await setDoc(favouriteRef, {
          jobRef: job.id,
          jobTitle: job.jobTitle,
          jobType: job.jobType,
          location: job.location,
          expectedPay: job.expectedPay,
        });
      } else {
        await deleteDoc(favouriteRef);
      }
    } catch (error) {
      console.error("Error updating favourites:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>{t('availableJobs')}</Text>
        <TouchableOpacity 
          style={styles.allJobsButton} 
          onPress={() => navigation.navigate('AllJobsListScreen', { jobs })}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.allJobsText}>{t('allJobs')}</Text>
            <Icon name="arrow-right" type="font-awesome" size={14} color="white" />
          </View>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        style={styles.jobsContainer} 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.jobsContent}
      >
        {jobs.map((job, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.jobCard} 
            onPress={() => navigation.navigate('JobDescriptionScreen', { job })} 
          >
            <View style={styles.imageContainer}>
              <Image 
                source={jobImages[job.jobType] || jobImages.Default} 
                style={styles.jobImage} 
                resizeMode="contain"
              />
            </View>
            <Text style={styles.jobName} numberOfLines={1}>{job.jobTitle}</Text>
            <View style={styles.jobDetail}>
              <Icon name="map-marker" type="font-awesome" size={12} color="#666" />
              <Text style={styles.jobLocation} numberOfLines={1}>{job.location}</Text>
            </View>
            <View style={styles.jobDetail}>
              <Icon name="money" type="font-awesome" size={12} color="#666" />
              <Text style={styles.jobPay}>${job.expectedPay}</Text>
            </View>

            <TouchableOpacity 
              style={styles.likeButton} 
              onPress={() => toggleLike(job)}
              activeOpacity={0.7}
            >
              <Icon
                name={likedJobs[job.id] ? 'heart' : 'heart-o'}
                type="font-awesome"
                color={likedJobs[job.id] ? '#ff5c5c' : '#ccc'}
                size={20}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    paddingTop:0,
    paddingBottom: 10,
    backgroundColor: '#f8f9fa',
  },
  headerContainer: {
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
  allJobsButton: {
    backgroundColor: '#4c669f', // Solid color instead of gradient
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    shadowColor: '#4c669f',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  allJobsText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 5,
  },
  jobsContainer: {
    marginTop: 5,
  },
  jobsContent: {
    paddingRight: 10,
  },
  jobCard: {
    width: 160,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  imageContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#f5f7fa',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },
  jobImage: {
    width: 40,
    height: 40,
  },
  jobName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  jobDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    paddingHorizontal: 5,
  },
  jobLocation: {
    fontSize: 13,
    color: '#666',
    marginLeft: 5,
    flex: 1,
  },
  jobPay: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4caf50',
    marginLeft: 5,
  },
  likeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
    padding: 5,
  },
});

export default AllJobsScreenWithoutCategory;







// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import { useTranslation } from 'react-i18next';
// import { collectionGroup, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
// import { FIREBASE_DB } from '../../config/firebaseConfig';
// import { Icon } from 'react-native-elements';
// import { useNavigation } from '@react-navigation/native';  
// import useUserStore from '../store/userStore';

// const jobImages = {
//   Driver: require('../../assets/images/driver.png'),
//   Plumber: require('../../assets/images/plumber.png'),
//   Gardener: require('../../assets/images/gardener.png'),
//   Electrician: require('../../assets/images/electrician.png'),
//   Mechanic: require('../../assets/images/mechanic.png'),
//   Default: require('../../assets/images/worker.png'),
// };

// const AllJobsScreenWithoutCategory = () => {
//   const { phoneNumber } = useUserStore();
//   const navigation = useNavigation();
//   const [jobs, setJobs] = useState([]);
//   const [likedJobs, setLikedJobs] = useState({});
//   const { t } = useTranslation();

//   useEffect(() => {
//     const fetchAllJobs = async () => {
//       try {
//         const querySnapshot = await getDocs(collectionGroup(FIREBASE_DB, 'jobs'));
//         const jobsData = [];
//         querySnapshot.forEach((doc) => {
//           const job = { id: doc.id, ...doc.data() };
//           jobsData.push(job);
//         });
//         setJobs(jobsData);
//       } catch (error) {
//         console.error("Error fetching jobs:", error);
//       }
//     };

//     fetchAllJobs();
//   }, []);

//   const toggleLike = async (job) => {
//     if (!phoneNumber) {
//       console.error("User phone number is not available.");
//       return;
//     }

//     const favouriteRef = doc(FIREBASE_DB, 'users', phoneNumber, 'favourites', job.id);

//     setLikedJobs((prevState) => ({
//       ...prevState,
//       [job.id]: !prevState[job.id],
//     }));

//     try {
//       if (!likedJobs[job.id]) {
//         // Add to favourites
//         await setDoc(favouriteRef, {
//           jobRef: job.id,  // Storing only the reference to the job
//           jobTitle: job.jobTitle,
//           jobType: job.jobType,
//           location: job.location,
//           expectedPay: job.expectedPay,
//         //   createdBy: job.createdBy,
//         });
//       } else {
//         // Remove from favourites
//         await deleteDoc(favouriteRef);
//       }
//     } catch (error) {
//       console.error("Error updating favourites:", error);
//     }
//   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.availableJobs}>Available Jobs</Text>
// //       <TouchableOpacity 
// //     style={styles.allJobsButton} 
// //     onPress={() => navigation.navigate('AllJobsListScreen', { jobs })}
// //   >
// //     <Text style={styles.allJobsText}>All Jobs</Text>
// //   </TouchableOpacity>
      
// //       <ScrollView horizontal style={styles.jobsContainer} showsHorizontalScrollIndicator={true}>
// //         {jobs.map((job, index) => (
// //           <TouchableOpacity 
// //             key={index} 
// //             style={styles.jobCard} 
// //             onPress={() => navigation.navigate('JobDescriptionScreen', { job })} 
// //           >
// //             <Image source={jobImages[job.jobType] || jobImages.Default} style={styles.jobImage} />
// //             <Text style={styles.jobName}>{job.jobTitle}</Text>
// //             <Text style={styles.jobLocation}>{job.location}</Text>
// //             <Text style={styles.jobPay}>${job.expectedPay}</Text>

// //             <TouchableOpacity style={styles.likeButton} onPress={() => toggleLike(job)}>
// //               <Icon
// //                 name={likedJobs[job.id] ? 'heart' : 'heart-o'}
// //                 type="font-awesome"
// //                 color={likedJobs[job.id] ? 'red' : '#ccc'}
// //                 size={20}
// //               />
// //             </TouchableOpacity>
// //           </TouchableOpacity>
// //         ))}
// //       </ScrollView>
// //     </View>
// //   );
// // };
// return (
//   <View style={styles.container}>
//     <Text style={styles.availableJobs}>{t('availableJobs')}</Text>
//     <TouchableOpacity 
//       style={styles.allJobsButton} 
//       onPress={() => navigation.navigate('AllJobsListScreen', { jobs })}
//     >
//       <Text style={styles.allJobsText}>{t('allJobs')}</Text>
//     </TouchableOpacity>
    
//     <ScrollView horizontal style={styles.jobsContainer} showsHorizontalScrollIndicator={true}>
//       {jobs.map((job, index) => (
//         <TouchableOpacity 
//           key={index} 
//           style={styles.jobCard} 
//           onPress={() => navigation.navigate('JobDescriptionScreen', { job })} 
//         >
//           <Image source={jobImages[job.jobType] || jobImages.Default} style={styles.jobImage} />
//           <Text style={styles.jobName}>{job.jobTitle}</Text>
//           <Text style={styles.jobLocation}>{t('location')}: {job.location}</Text>
//           <Text style={styles.jobPay}>{t('expectedPay')}: ${job.expectedPay}</Text>

//           <TouchableOpacity style={styles.likeButton} onPress={() => toggleLike(job)}>
//             <Icon
//               name={likedJobs[job.id] ? 'heart' : 'heart-o'}
//               type="font-awesome"
//               color={likedJobs[job.id] ? 'red' : '#ccc'}
//               size={20}
//             />
//           </TouchableOpacity>
//         </TouchableOpacity>
//       ))}
//     </ScrollView>
//   </View>
// );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 0,
//   },
//   availableJobs: {
//     marginTop: -60,
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 0,
//   },
//   jobsContainer: {
//     marginTop:20,

//     flexDirection: 'row',
//   },
//   jobCard: {
//     width: 200,
//     height: 200,
//     backgroundColor: '#eef2f3',
//     borderRadius: 20,
//     padding: 15,
//     marginRight: 10,
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
//     marginTop: 4,
//   },
//   jobPay: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#ff5c5c',
//     textAlign: 'center',
//     marginTop: 4,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   allJobsButton: {
//     backgroundColor: '#007bff',
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderRadius: 10,
//     marginTop: -30,
//     marginLeft: 260,
//     width: 75,
//     height: 30,
//   },
//   allJobsText: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
  
//   likeButton: {
//     position: 'absolute',
//     top: 5,
//     right: 5,
//   },
// });

// export default AllJobsScreenWithoutCategory;
