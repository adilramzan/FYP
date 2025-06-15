// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
// import useUserStore from '../store/userStore';
// import { collection, query, orderBy, getDocs } from 'firebase/firestore';
// import { FIREBASE_DB } from '../../config/firebaseConfig';

// const UserJobsScreen = () => {
//   const { phoneNumber } = useUserStore(); // Get logged-in user's phone number from Zustand
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserJobs = async () => {
//       if (!phoneNumber) return;

//       try {
//         const jobsRef = collection(FIREBASE_DB, 'users', phoneNumber, 'jobs');
//         const q = query(jobsRef, orderBy('createdAt', 'desc')); // Sort by createdAt descending

//         const querySnapshot = await getDocs(q);
//         const jobsList = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         setJobs(jobsList);
//       } catch (error) {
//         console.error('Error fetching jobs:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserJobs();
//   }, [phoneNumber]);

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#4CAF50" />
//         <Text>Loading jobs...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Your Created Jobs</Text>

//       {jobs.length === 0 ? (
//         <Text style={styles.noJobsText}>No jobs found.</Text>
//       ) : (
//         <FlatList
//           data={jobs}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <View style={styles.jobCard}>
//               <Text style={styles.jobTitle}>{item.jobTitle}</Text>
//               <Text style={styles.jobInfo}><Text style={styles.bold}>Job Type:</Text> {item.jobType}</Text>
//               <Text style={styles.jobInfo}><Text style={styles.bold}>Location:</Text> {item.location}</Text>
//               <Text style={styles.jobInfo}><Text style={styles.bold}>Salary:</Text> ${item.expectedPay}</Text>
//               <Text style={styles.jobInfo}><Text style={styles.bold}>Status:</Text> {item.status}</Text>
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f8f8f8',
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   noJobsText: {
//     textAlign: 'center',
//     fontSize: 18,
//     marginTop: 20,
//   },
//   jobCard: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 8,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   jobTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   jobInfo: {
//     fontSize: 16,
//     marginBottom: 3,
//   },
//   bold: {
//     fontWeight: 'bold',
//   },
// });

// export default UserJobsScreen;




















// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import useUserStore from '../store/userStore';
// import { collection, query, orderBy, getDocs } from 'firebase/firestore';
// import { FIREBASE_DB } from '../../config/firebaseConfig';

// const UserJobsScreen = () => {
//   const { phoneNumber } = useUserStore();
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchUserJobs = async () => {
//       if (!phoneNumber) return;

//       try {
//         const jobsRef = collection(FIREBASE_DB, 'users', phoneNumber, 'jobs');
//         const q = query(jobsRef, orderBy('createdAt', 'desc'));
//         const querySnapshot = await getDocs(q);
//         const jobsList = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         setJobs(jobsList);
//       } catch (error) {
//         console.error('Error fetching jobs:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserJobs();
//   }, [phoneNumber]);

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#4A90E2" />
//         <Text>Loading jobs...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Your Created Jobs</Text>

//       {jobs.length === 0 ? (
//         <Text style={styles.noJobsText}>No jobs found.</Text>
//       ) : (
//         <FlatList
//           data={jobs}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.jobCard}
//               onPress={() => navigation.navigate('EmployeesScreen', { jobId: item.id })}
//             >
//               <Text style={styles.jobTitle}>{item.jobTitle}</Text>
//               <Text style={styles.jobInfo}>
//                 <Text style={styles.bold}>Job Type:</Text> {item.jobType}
//               </Text>
//               <Text style={styles.jobInfo}>
//                 <Text style={styles.bold}>Location:</Text> {item.location}
//               </Text>
//               <Text style={styles.jobInfo}>
//                 <Text style={styles.bold}>Salary:</Text> ${item.expectedPay}
//               </Text>
//               <Text style={[styles.jobStatus, item.status === 'active' ? styles.activeStatus : styles.inactiveStatus]}>
//                 {item.status.toUpperCase()}
//               </Text>
//             </TouchableOpacity>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#F5F7FA',
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#4A90E2',
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   noJobsText: {
//     textAlign: 'center',
//     fontSize: 18,
//     marginTop: 20,
//     color: '#666',
//   },
//   jobCard: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   jobTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 5,
//   },
//   jobInfo: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 3,
//   },
//   bold: {
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   jobStatus: {
//     marginTop: 8,
//     fontSize: 14,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     padding: 5,
//     borderRadius: 5,
//   },
//   activeStatus: {
//     backgroundColor: '#4CAF50',
//     color: '#fff',
//   },
//   inactiveStatus: {
//     backgroundColor: '#FF5722',
//     color: '#fff',
//   },
// });

// export default UserJobsScreen;



// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Linking } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import useUserStore from '../store/userStore';
// import { collection, query, orderBy, getDocs, doc, getDoc } from 'firebase/firestore';
// import { FIREBASE_DB } from '../../config/firebaseConfig';

// const UserJobsScreen = () => {
//   const { phoneNumber } = useUserStore();
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchUserJobs = async () => {
//       if (!phoneNumber) return;

//       try {
//         const jobsRef = collection(FIREBASE_DB, 'users', phoneNumber, 'jobs');
//         const q = query(jobsRef, orderBy('createdAt', 'desc'));
//         const querySnapshot = await getDocs(q);
//         const jobsList = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         setJobs(jobsList);
//       } catch (error) {
//         console.error('Error fetching jobs:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserJobs();
//   }, [phoneNumber]);

//   const handleCall = async (jobId) => {
//     try {
//       const jobDocRef = doc(FIREBASE_DB, 'users', phoneNumber, 'jobs', jobId);
//       const jobDoc = await getDoc(jobDocRef);
      
//       if (jobDoc.exists()) {
//         const jobData = jobDoc.data();
//         if (jobData?.createdBy) {
//           const userDocRef = doc(FIREBASE_DB, 'users', jobData.createdBy);
//           const userDoc = await getDoc(userDocRef);

//           if (userDoc.exists()) {
//             const userData = userDoc.data();
//             if (userData?.phoneNumber) {
//               Linking.openURL(`tel:${userData.phoneNumber}`);
//             } else {
//               alert("Phone number not found.");
//             }
//           }
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching phone number:', error);
//       alert("Failed to fetch phone number.");
//     }
//   };

  
  

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#4A90E2" />
//         <Text>Loading jobs...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Your Created Jobs</Text>

//       {jobs.length === 0 ? (
//         <Text style={styles.noJobsText}>No jobs found.</Text>
//       ) : (
//         <FlatList
//           data={jobs}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <View style={styles.jobCard}>
//               <Text style={styles.jobTitle}>{item.jobTitle}</Text>
//               <Text style={styles.jobInfo}>
//                 <Text style={styles.bold}>Job Type:</Text> {item.jobType}
//               </Text>
//               <Text style={styles.jobInfo}>
//                 <Text style={styles.bold}>Location:</Text> {item.location}
//               </Text>
//               <Text style={styles.jobInfo}>
//                 <Text style={styles.bold}>Salary:</Text> ${item.expectedPay}
//               </Text>
//               <Text style={[styles.jobStatus, item.status === 'active' ? styles.activeStatus : styles.inactiveStatus]}>
//                 {item.status.toUpperCase()}
//               </Text>

//               {/* Chat and Call Buttons */}
//               <View style={styles.buttonContainer}>
//                 <TouchableOpacity
//                   style={styles.chatButton}
//                   onPress={() => navigation.navigate('ChatScreen', { phoneNumber: item.createdBy })}
//                 >
//                   <Text style={styles.buttonText}>Chat</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.callButton}
//                   onPress={() => handleCall(item.id)}
//                 >
//                   <Text style={styles.buttonText}>Call</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#F5F7FA',
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#4A90E2',
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   noJobsText: {
//     textAlign: 'center',
//     fontSize: 18,
//     marginTop: 20,
//     color: '#666',
//   },
//   jobCard: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   jobTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 5,
//   },
//   jobInfo: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 3,
//   },
//   bold: {
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   jobStatus: {
//     marginTop: 8,
//     fontSize: 14,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     padding: 5,
//     borderRadius: 5,
//   },
//   activeStatus: {
//     backgroundColor: '#4CAF50',
//     color: '#fff',
//   },
//   inactiveStatus: {
//     backgroundColor: '#FF5722',
//     color: '#fff',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   chatButton: {
//     backgroundColor: '#007bff',
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     borderRadius: 5,
//     flex: 1,
//     marginRight: 5,
//     alignItems: 'center',
//   },
//   callButton: {
//     backgroundColor: '#28a745',
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     borderRadius: 5,
//     flex: 1,
//     marginLeft: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default UserJobsScreen;





import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useUserStore from '../store/userStore';
import { collection, query, orderBy, getDocs, doc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../config/firebaseConfig';

const UserJobsScreen = () => {
  const { phoneNumber } = useUserStore();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserJobs = async () => {
      if (!phoneNumber) return;
  
      try {
        const jobsRef = collection(FIREBASE_DB, 'users', phoneNumber, 'jobs');
        const q = query(jobsRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
  
        const jobsList = await Promise.all(querySnapshot.docs.map(async (doc) => {
          const jobData = { id: doc.id, ...doc.data() };
  
          // Fetch employees for this job
          const employeesRef = collection(FIREBASE_DB, 'users', phoneNumber, 'jobs', doc.id, 'employees');
          const employeesSnapshot = await getDocs(employeesRef);
          jobData.employees = employeesSnapshot.docs.map(empDoc => ({
            id: empDoc.id,
            ...empDoc.data()
          }));
  
          return jobData;
        }));
  
        setJobs(jobsList);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserJobs();
  }, [phoneNumber]);
  

  const handleCall = async (jobId) => {
    try {
      const jobDocRef = doc(FIREBASE_DB, 'users', phoneNumber, 'jobs', jobId);
      const jobDoc = await getDoc(jobDocRef);
      
      if (jobDoc.exists()) {
        const jobData = jobDoc.data();
        if (jobData?.createdBy) {
          const userDocRef = doc(FIREBASE_DB, 'users', jobData.createdBy);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData?.phoneNumber) {
              Linking.openURL(`tel:${userData.phoneNumber}`);
            } else {
              alert("Phone number not found.");
            }
          }
        }
      }
    } catch (error) {
      console.error('Error fetching phone number:', error);
      alert("Failed to fetch phone number.");
    }
  };

  
  

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text>Loading jobs...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Created Jobs</Text>

      {jobs.length === 0 ? (
        <Text style={styles.noJobsText}>No jobs found.</Text>
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.jobCard}>
              <Text style={styles.jobTitle}>{item.jobTitle}</Text>
              <Text style={styles.jobInfo}><Text style={styles.bold}>Job Type:</Text> {item.jobType}</Text>
              <Text style={styles.jobInfo}><Text style={styles.bold}>Location:</Text> {item.location}</Text>
              <Text style={styles.jobInfo}><Text style={styles.bold}>Salary:</Text> ${item.expectedPay}</Text>
              <Text style={[styles.jobStatus, item.status === 'active' ? styles.activeStatus : styles.inactiveStatus]}>
                {item.status.toUpperCase()}
              </Text>
          
              {/* Display Employees */}
              {item.employees && item.employees.length > 0 ? (
                <View style={styles.employeesContainer}>
                  <Text style={styles.bold}>Applicants:</Text>
                  {item.employees.map((emp) => (
                    <Text key={emp.id} style={styles.employeeText}>{emp.name} - {emp.phoneNumber}</Text>
                  ))}
                </View>
              ) : (
                <Text style={styles.noJobsText}>No applicants yet.</Text>
              )}
          
              {/* Chat and Call Buttons */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.chatButton}
                  onPress={() => navigation.navigate('ChatScreen', { phoneNumber: item.createdBy })}
                >
                  <Text style={styles.buttonText}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.callButton}
                  onPress={() => handleCall(item.id)}
                >
                  <Text style={styles.buttonText}>Call</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F7FA',
  },
  employeesContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#E3F2FD',
    borderRadius: 5,
  },
  employeeText: {
    fontSize: 14,
    color: '#333',
    marginTop: 2,
  },
  
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 15,
    textAlign: 'center',
  },
  noJobsText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
    color: '#666',
  },
  jobCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  jobInfo: {
    fontSize: 16,
    color: '#555',
    marginBottom: 3,
  },
  bold: {
    fontWeight: 'bold',
    color: '#333',
  },
  jobStatus: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    borderRadius: 5,
  },
  activeStatus: {
    backgroundColor: '#4CAF50',
    color: '#fff',
  },
  inactiveStatus: {
    backgroundColor: '#FF5722',
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  chatButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  callButton: {
    backgroundColor: '#28a745',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default UserJobsScreen;
