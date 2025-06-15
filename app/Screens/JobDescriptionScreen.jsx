

// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
// import { useRoute } from '@react-navigation/native';
// import { doc, collection, setDoc, getDoc } from 'firebase/firestore';
// import { FIREBASE_DB } from '../../config/firebaseConfig';
// import useUserStore from '../store/userStore';
// import { Ionicons } from '@expo/vector-icons';

// const jobImages = {
//   Driver: require('../../assets/images/driver.png'),
//   Plumber: require('../../assets/images/plumber.png'),
//   Gardener: require('../../assets/images/gardener.png'),
//   Electrician: require('../../assets/images/electrician.png'),
//   Mechanic: require('../../assets/images/mechanic.png'),
//   Default: require('../../assets/images/worker.png'),
// };

// const JobDescriptionScreen = () => {
//   const route = useRoute();
//   const { job } = route.params || {};
//   const { phoneNumber } = useUserStore();
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!phoneNumber) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const userRef = doc(FIREBASE_DB, 'users', phoneNumber);
//         const docSnap = await getDoc(userRef);

//         if (docSnap.exists()) {
//           setUserData(docSnap.data());
//         } else {
//           console.log('No user document found!');
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         showAlert('Error', 'Failed to load user data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [phoneNumber]);

//   const showAlert = (title, message) => {
//     Alert.alert(title, message);
//   };

//   const handleApply = async () => {
//     if (!userData) {
//       Alert.alert('Error', 'User details not available.');
//       return;
//     }

//     try {
//       const employeeRef = doc(
//         collection(FIREBASE_DB, 'users', job.createdBy, 'jobs', job.id, 'employees'),
//         phoneNumber
//       );

//       await setDoc(employeeRef, {
//         phoneNumber,
//         name: userData.name || 'Unknown',
//         age: userData.age || 'N/A',
//         gender: userData.gender || 'N/A',
//         experience: userData.experience || 'N/A',
//         city: userData.city || 'N/A',
//         appliedAt: new Date().toISOString(),
//       });

//       Alert.alert('Success', 'You have successfully applied for this job!');
//     } catch (error) {
//       console.error('Error applying for job:', error);
//       Alert.alert('Error', 'Failed to apply for job. Please try again.');
//     }
//   };

//   if (!job) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>Job details not found.</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Image source={jobImages[job.jobType] || jobImages.Default} style={styles.jobImage} />
//       <Text style={styles.title}>{job.jobTitle}</Text>

//       <View style={styles.card}>
//         <View style={styles.row}>
//           <Ionicons name="briefcase-outline" size={20} color="#4CAF50" />
//           <Text style={styles.text}><Text style={styles.bold}>Job Type:</Text> {job.jobType}</Text>
//         </View>

//         <View style={styles.row}>
//           <Ionicons name="location-outline" size={20} color="#FF5733" />
//           <Text style={styles.text}><Text style={styles.bold}>Location:</Text> {job.location}</Text>
//         </View>

//         <View style={styles.row}>
//           <Ionicons name="cash-outline" size={20} color="#FFC107" />
//           <Text style={styles.text}><Text style={styles.bold}>Salary:</Text> ${job.expectedPay}</Text>
//         </View>

//         <View style={styles.row}>
//           <Ionicons name="time-outline" size={20} color="#673AB7" />
//           <Text style={styles.text}><Text style={styles.bold}>Full Time:</Text> {job.fullTime}</Text>
//         </View>

//         <View style={styles.row}>
//           <Ionicons name="home-outline" size={20} color="#009688" />
//           <Text style={styles.text}><Text style={styles.bold}>Live In:</Text> {job.liveIn}</Text>
//         </View>

//         <View style={styles.row}>
//           <Ionicons name="person-outline" size={20} color="#E91E63" />
//           <Text style={styles.text}><Text style={styles.bold}>Preferred Age:</Text> {job.preferredAge}</Text>
//         </View>

//         <View style={styles.row}>
//           <Ionicons name="male-female-outline" size={20} color="#3F51B5" />
//           <Text style={styles.text}><Text style={styles.bold}>Preferred Gender:</Text> {job.preferredGender}</Text>
//         </View>

//         <View style={styles.row}>
//           <Ionicons name="build-outline" size={20} color="#FF9800" />
//           <Text style={styles.text}><Text style={styles.bold}>Work Experience:</Text> {job.workExperience} years</Text>
//         </View>

//         <View style={styles.row}>
//           <Ionicons name="checkmark-circle-outline" size={20} color="#4CAF50" />
//           <Text style={styles.text}><Text style={styles.bold}>Status:</Text> {job.status}</Text>
//         </View>
//       </View>

//       <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
//         <Text style={styles.applyButtonText}>Apply for this Job</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     alignItems: 'center',
//     backgroundColor: '#f4f4f4',
//   },
//   jobImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     width: '100%',
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     marginBottom: 20,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   text: {
//     fontSize: 16,
//     marginLeft: 10,
//     color: '#555',
//   },
//   bold: {
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   applyButton: {
//     backgroundColor: '#FF5733',
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 25,
//     elevation: 3,
//     marginTop: 10,
//   },
//   applyButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default JobDescriptionScreen;



import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'; // Added useNavigation
import { doc, collection, setDoc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../config/firebaseConfig';
import useUserStore from '../store/userStore';
import { Ionicons } from '@expo/vector-icons';

const jobImages = {
  Driver: require('../../assets/images/driver.png'),
  Plumber: require('../../assets/images/plumber.png'),
  Gardener: require('../../assets/images/gardener.png'),
  Electrician: require('../../assets/images/electrician.png'),
  Mechanic: require('../../assets/images/mechanic.png'),
  Default: require('../../assets/images/worker.png'),
};

const JobDescriptionScreen = () => {
  const route = useRoute();
  const navigation = useNavigation(); // Initialize navigation
  const { job } = route.params || {};
  const { phoneNumber } = useUserStore();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!phoneNumber) {
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(FIREBASE_DB, 'users', phoneNumber);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [phoneNumber]);

  const handleApply = async () => {
    if (!userData) {
      Alert.alert('Profile Incomplete', 'Please complete your profile before applying');
      return;
    }

    try {
      const employeeRef = doc(
        collection(FIREBASE_DB, 'users', job.createdBy, 'jobs', job.id, 'employees'),
        phoneNumber
      );

      await setDoc(employeeRef, {
        phoneNumber,
        name: userData.name || 'Unknown',
        age: userData.age || 'N/A',
        gender: userData.gender || 'N/A',
        experience: userData.experience || 'N/A',
        city: userData.city || 'N/A',
        appliedAt: new Date().toISOString(),
      });

      Alert.alert(
        'Application Sent', 
        'Your application has been submitted successfully!',
        [
          { 
            text: 'OK', 
            onPress: () => navigation.navigate('EmployeeHome') // Navigate after OK
          }
        ]
      );
    } catch (error) {
      console.error('Error applying for job:', error);
      Alert.alert('Error', 'Failed to submit application. Please try again.');
    }
  };

  if (!job) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFoundText}>Job details not available</Text>
      </View>
    );
  }

  const renderDetailRow = (iconName, label, value, iconColor = '#5E72E4') => (
    <View style={styles.detailRow}>
      <View style={[styles.iconContainer, { backgroundColor: `${iconColor}20` }]}>
        <Ionicons name={iconName} size={18} color={iconColor} />
      </View>
      <View style={styles.detailTextContainer}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image 
            source={jobImages[job.jobType] || jobImages.Default} 
            style={styles.jobImage} 
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>{job.jobTitle}</Text>
        <Text style={styles.subtitle}>{job.jobType} Position</Text>
      </View>

      <View style={styles.card}>
        {renderDetailRow('briefcase-outline', 'Job Type', job.jobType, '#5E72E4')}
        {renderDetailRow('location-outline', 'Location', job.location, '#F5365C')}
        {renderDetailRow('cash-outline', 'Salary', `$${job.expectedPay}`, '#2DCE89')}
        {renderDetailRow('time-outline', 'Employment Type', job.fullTime ? 'Full Time' : 'Part Time', '#FB6340')}
        {renderDetailRow('home-outline', 'Accommodation', job.liveIn ? 'Live-in Provided' : 'Not Provided', '#11CDEF')}
        {renderDetailRow('person-outline', 'Preferred Age', job.preferredAge, '#172B4D')}
        {renderDetailRow('male-female-outline', 'Preferred Gender', job.preferredGender, '#8965E0')}
        {renderDetailRow('build-outline', 'Experience Required', `${job.workExperience} years`, '#F3A4B5')}
        {renderDetailRow('checkmark-circle-outline', 'Job Status', job.status, '#2DCE89')}
      </View>

      <TouchableOpacity 
        style={styles.applyButton} 
        onPress={handleApply}
        activeOpacity={0.9}
      >
        <Text style={styles.applyButtonText}>Apply Now</Text>
        <Ionicons name="arrow-forward" size={20} color="white" style={styles.applyIcon} />
      </TouchableOpacity>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F8FAFC',
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 15,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: '#EBF4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  jobImage: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    fontWeight: '500',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 13,
    color: '#718096',
    fontWeight: '500',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 15,
    color: '#2D3748',
    fontWeight: '600',
  },
  applyButton: {
    backgroundColor: '#5E72E4',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#5E72E4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  applyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 10,
  },
  applyIcon: {
    marginLeft: 5,
  },
  notFoundText: {
    fontSize: 18,
    color: '#718096',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default JobDescriptionScreen;