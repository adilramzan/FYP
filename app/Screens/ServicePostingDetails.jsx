// import React, { useState,useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';

// import { FIREBASE_DB } from '../../config/firebaseConfig';
// import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
// import useUserStore from '../store/userStore';

// export default function ServicePostingDetails({ navigation }) {
//   const { phoneNumber } = useUserStore();
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     jobTitle: '',
//     jobType: 'Driver',
//     location: '',
//     expectedPay: '',
//     preferredGender: 'Any',
//     preferredAge: '',
//     fullTime: 'Full-time',
//     liveIn: 'Live-in',
//     workExperience: '',
//   });

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   // const handleSubmit = async () => {
//   //   const {
//   //     jobTitle,
//   //     jobType,
//   //     location,
//   //     expectedPay,
//   //     preferredGender,
//   //     preferredAge,
//   //     fullTime,
//   //     liveIn,
//   //     workExperience,
//   //   } = formData;

//   //   if (!jobTitle || !location || !expectedPay || !preferredAge || !workExperience) {
//   //     Alert.alert('Error', 'Please fill out all required fields.');
//   //     return;
//   //   }
    

//   //   try {
//   //     setLoading(true);
      
//   //     // Add job to Firestore
//   //     const jobsCollection = collection(FIREBASE_DB, 'jobs');
//   //     await addDoc(jobsCollection, {
//   //       ...formData,
//   //       employerPhone: phoneNumber,
//   //       createdAt: serverTimestamp(),
//   //       status: 'active'
//   //     });

//   //     Alert.alert('Success', 'Job posted successfully!');
//   //     navigation.goBack();
//   //   } catch (error) {
//   //     console.error('Error posting job:', error);
//   //     Alert.alert('Error', 'Failed to post job. Please try again.');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   //   console.log(formData);
//   // };

//   const handleSubmit = async () => {
//     const auth = getAuth();
//     const db = getFirestore();
  
//     try {
//       if (!auth.currentUser) throw new Error('Not authenticated');
      
//       // Verify employer document exists
//       const userDocRef = doc(db, 'users', auth.currentUser.uid);
//       const jobData = {
//         ...formData,
//         employerUID: auth.currentUser.uid,
//         employerPhone: auth.currentUser.phoneNumber, // From Firebase Auth
//         createdAt: serverTimestamp(),
//         status: 'active'
//       };
  
//       await addDoc(collection(db, 'jobs'), jobData);
//       Alert.alert('Success', 'Job posted!');
      
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//   };
//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.header}>
//         Post a Job <Text style={styles.stepNumber}>(1/1)</Text>
//       </Text>

//       {/* Job Title */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Job Title *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter job title"
//           value={formData.jobTitle}
//           onChangeText={(text) => handleInputChange('jobTitle', text)}
//         />
//       </View>

//       {/* Job Type */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Job Type *</Text>
//         <Picker
//           selectedValue={formData.jobType}
//           onValueChange={(value) => handleInputChange('jobType', value)}
//           style={styles.picker}
//         >
//           <Picker.Item label="Driver" value="Driver" />
//           <Picker.Item label="Plumber" value="Plumber" />
//           <Picker.Item label="Electrician" value="Electrician" />
//           <Picker.Item label="Carpenter" value="Carpenter" />
//           <Picker.Item label="Maid" value="Maid" />
//         </Picker>
//       </View>

//       {/* Location */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Location *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter job location"
//           value={formData.location}
//           onChangeText={(text) => handleInputChange('location', text)}
//         />
//       </View>

//       {/* Expected Pay */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Expected Pay *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter expected pay"
//           keyboardType="numeric"
//           value={formData.expectedPay}
//           onChangeText={(text) => handleInputChange('expectedPay', text)}
//         />
//       </View>

//       {/* Preferred Gender */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Preferred Gender *</Text>
//         <Picker
//           selectedValue={formData.preferredGender}
//           onValueChange={(value) => handleInputChange('preferredGender', value)}
//           style={styles.picker}
//         >
//           <Picker.Item label="Any" value="Any" />
//           <Picker.Item label="Male" value="Male" />
//           <Picker.Item label="Female" value="Female" />
//         </Picker>
//       </View>

//       {/* Preferred Age */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Preferred Age *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter preferred age"
//           keyboardType="numeric"
//           value={formData.preferredAge}
//           onChangeText={(text) => handleInputChange('preferredAge', text)}
//         />
//       </View>

//       {/* Preferred Work Experience */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Preferred Work Experience (in years) *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter work experience"
//           keyboardType="numeric"
//           value={formData.workExperience}
//           onChangeText={(text) => handleInputChange('workExperience', text)}
//         />
//       </View>

//       {/* Full-Time / Part-Time */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Job Type *</Text>
//         <Picker
//           selectedValue={formData.fullTime}
//           onValueChange={(value) => handleInputChange('fullTime', value)}
//           style={styles.picker}
//         >
//           <Picker.Item label="Full-time" value="Full-time" />
//           <Picker.Item label="Part-time" value="Part-time" />
//         </Picker>
//       </View>

//       {/* Live-In / Non Live-In */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Live-In *</Text>
//         <Picker
//           selectedValue={formData.liveIn}
//           onValueChange={(value) => handleInputChange('liveIn', value)}
//           style={styles.picker}
//         >
//           <Picker.Item label="Live-in" value="Live-in" />
//           <Picker.Item label="Non live-in" value="Non live-in" />
//         </Picker>
//       </View>

//       {/* Submit */}
//       <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//         <Text style={styles.submitButtonText}>Post Job</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//     padding: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   stepNumber: {
//     fontSize: 22,
//     color: '#4CAF50',
//     fontWeight: 'bold',
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     backgroundColor: '#fff',
//   },
//   picker: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     backgroundColor: '#fff',
//   },
//   submitButton: {
//     backgroundColor: '#4CAF50',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginTop: 20,
//     marginBottom: 60,
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
// },
// });




// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { FIREBASE_DB } from '../../config/firebaseConfig';
// import useUserStore from '../store/userStore';
// import { doc, setDoc } from "firebase/firestore";

// export default function ServicePostingDetails({ navigation }) {
//   const { phoneNumber } = useUserStore(); // Get phone number from Zustand store
//   const [formData, setFormData] = useState({
//     jobTitle: '',
//     jobType: 'Driver',
//     location: '',
//     expectedPay: '',
//     preferredGender: 'Any',
//     preferredAge: '',
//     fullTime: 'Full-time',
//     liveIn: 'Live-in',
//     workExperience: '',
//   });

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   // const handleSubmit = () => {
//   //   const {
//   //     jobTitle,
//   //     jobType,
//   //     location,
//   //     expectedPay,
//   //     preferredGender,
//   //     preferredAge,
//   //     fullTime,
//   //     liveIn,
//   //     workExperience,
//   //   } = formData;

//   //   if (!jobTitle || !location || !expectedPay || !preferredAge || !workExperience) {
//   //     Alert.alert('Error', 'Please fill out all required fields.');
//   //     return;
//   //   }

//   //   Alert.alert('Success', 'Job posted successfully!');
//   //   console.log(formData);
//   // };

//   const handleSubmit = async () => {
//     const {
//       jobTitle,
//       jobType,
//       location,
//       expectedPay,
//       preferredGender,
//       preferredAge,
//       fullTime,
//       liveIn,
//       workExperience,
//     } = formData;

//     if (!jobTitle || !location || !expectedPay || !preferredAge || !workExperience) {
//       Alert.alert('Error', 'Please fill out all required fields.');
//       return;
//     }

//     try {
//       console.log('Using phone number:', phoneNumber); // Add this
//       if (!phoneNumber) {
//         Alert.alert('Error', 'User not authenticated');
//         return;
//       }


//       // Ensure user document exists
//     const userDocRef = doc(FIREBASE_DB, 'users', phoneNumber);
//     await setDoc(userDocRef, { exists: true }, { merge: true });
//       // Create reference to the user's jobs collection
//       const userJobsRef = collection(FIREBASE_DB, 'users', phoneNumber, 'jobs');

//       // Add new job document to the subcollection
//       await addDoc(userJobsRef, {
//         ...formData,
//         createdAt: serverTimestamp(),
//         status: 'active',
//         createdBy: phoneNumber, 
//       });

//       Alert.alert('Success', 'Job posted successfully!');
//       navigation.goBack();
//     } catch (error) {
//       console.error('Error posting job:', error);
//       Alert.alert('Error', 'Failed to post job. Please try again.');
//     }
//   };
//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.header}>
//         Post a Job <Text style={styles.stepNumber}>(1/1)</Text>
//       </Text>

//       {/* Job Title */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Job Title *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter job title"
//           value={formData.jobTitle}
//           onChangeText={(text) => handleInputChange('jobTitle', text)}
//         />
//       </View>

//       {/* Job Type */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Job Type *</Text>
//         <Picker
//           selectedValue={formData.jobType}
//           onValueChange={(value) => handleInputChange('jobType', value)}
//           style={styles.picker}
//         >
//           <Picker.Item label="Driver" value="Driver" />
//           <Picker.Item label="Plumber" value="Plumber" />
//           <Picker.Item label="Electrician" value="Electrician" />
//           <Picker.Item label="Carpenter" value="Carpenter" />
//           <Picker.Item label="Maid" value="Maid" />
//         </Picker>
//       </View>

//       {/* Location */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Location *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter job location"
//           value={formData.location}
//           onChangeText={(text) => handleInputChange('location', text)}
//         />
//       </View>

//       {/* Expected Pay */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Expected Pay *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter expected pay"
//           keyboardType="numeric"
//           value={formData.expectedPay}
//           onChangeText={(text) => handleInputChange('expectedPay', text)}
//         />
//       </View>

//       {/* Preferred Gender */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Preferred Gender *</Text>
//         <Picker
//           selectedValue={formData.preferredGender}
//           onValueChange={(value) => handleInputChange('preferredGender', value)}
//           style={styles.picker}
//         >
//           <Picker.Item label="Any" value="Any" />
//           <Picker.Item label="Male" value="Male" />
//           <Picker.Item label="Female" value="Female" />
//         </Picker>
//       </View>

//       {/* Preferred Age */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Preferred Age *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter preferred age"
//           keyboardType="numeric"
//           value={formData.preferredAge}
//           onChangeText={(text) => handleInputChange('preferredAge', text)}
//         />
//       </View>

//       {/* Preferred Work Experience */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Preferred Work Experience (in years) *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter work experience"
//           keyboardType="numeric"
//           value={formData.workExperience}
//           onChangeText={(text) => handleInputChange('workExperience', text)}
//         />
//       </View>

//       {/* Full-Time / Part-Time */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Job Type *</Text>
//         <Picker
//           selectedValue={formData.fullTime}
//           onValueChange={(value) => handleInputChange('fullTime', value)}
//           style={styles.picker}
//         >
//           <Picker.Item label="Full-time" value="Full-time" />
//           <Picker.Item label="Part-time" value="Part-time" />
//         </Picker>
//       </View>

//       {/* Live-In / Non Live-In */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Live-In *</Text>
//         <Picker
//           selectedValue={formData.liveIn}
//           onValueChange={(value) => handleInputChange('liveIn', value)}
//           style={styles.picker}
//         >
//           <Picker.Item label="Live-in" value="Live-in" />
//           <Picker.Item label="Non live-in" value="Non live-in" />
//         </Picker>
//       </View>

//       {/* Submit */}
//       <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//         <Text style={styles.submitButtonText}>Post Job</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//     padding: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   stepNumber: {
//     fontSize: 22,
//     color: '#4CAF50',
//     fontWeight: 'bold',
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     backgroundColor: '#fff',
//   },
//   picker: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     backgroundColor: '#fff',
//   },
//   submitButton: {
//     backgroundColor: '#4CAF50',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginTop: 20,
//     marginBottom: 60,
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
// },
// });






import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { collection, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../config/firebaseConfig';
import useUserStore from '../store/userStore';

export default function ServicePostingDetails({ navigation }) {
  const { phoneNumber } = useUserStore(); // Get phone number from Zustand store
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobType: 'Driver',
    location: '',
    expectedPay: '',
    preferredGender: 'Any',
    preferredAge: '',
    fullTime: 'Full-time',
    liveIn: 'Live-in',
    workExperience: '',
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const {
      jobTitle,
      jobType,
      location,
      expectedPay,
      preferredGender,
      preferredAge,
      fullTime,
      liveIn,
      workExperience,
    } = formData;

    if (!jobTitle || !location || !expectedPay || !preferredAge || !workExperience) {
      Alert.alert('Error', 'Please fill out all required fields.');
      return;
    }

    try {
      if (!phoneNumber) {
        Alert.alert('Error', 'User not authenticated');
        return;
      }

      // Ensure user document exists
      const userDocRef = doc(FIREBASE_DB, 'users', phoneNumber);
      await setDoc(userDocRef, { exists: true }, { merge: true });

      // Create reference to the user's jobs collection
      const userJobsRef = collection(FIREBASE_DB, 'users', phoneNumber, 'jobs');

      // Add new job document to the subcollection with `createdBy` field
      await addDoc(userJobsRef, {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'active',
        createdBy: phoneNumber,
      });

      Alert.alert('Success', 'Job posted successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error posting job:', error);
      Alert.alert('Error', 'Failed to post job. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Post a Job</Text>

      {/* Job Title */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Job Title *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter job title"
          value={formData.jobTitle}
          onChangeText={(text) => handleInputChange('jobTitle', text)}
        />
      </View>

      {/* Job Type */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Job Type *</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.jobType}
            onValueChange={(value) => handleInputChange('jobType', value)}
            style={styles.picker}
          >
            <Picker.Item label="Driver" value="Driver" />
            <Picker.Item label="Plumber" value="Plumber" />
            <Picker.Item label="Electrician" value="Electrician" />
            <Picker.Item label="Carpenter" value="Carpenter" />
            <Picker.Item label="Maid" value="Maid" />
          </Picker>
        </View>
      </View>

      {/* Location */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter job location"
          value={formData.location}
          onChangeText={(text) => handleInputChange('location', text)}
        />
      </View>

      {/* Expected Pay */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Expected Pay *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter expected pay"
          keyboardType="numeric"
          value={formData.expectedPay}
          onChangeText={(text) => handleInputChange('expectedPay', text)}
        />
      </View>

      {/* Preferred Gender */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Preferred Gender *</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.preferredGender}
            onValueChange={(value) => handleInputChange('preferredGender', value)}
            style={styles.picker}
          >
            <Picker.Item label="Any" value="Any" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </View>
      </View>

      {/* Preferred Age */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Preferred Age *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter preferred age"
          keyboardType="numeric"
          value={formData.preferredAge}
          onChangeText={(text) => handleInputChange('preferredAge', text)}
        />
      </View>

      {/* Work Experience */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Work Experience (Years) *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter work experience"
          keyboardType="numeric"
          value={formData.workExperience}
          onChangeText={(text) => handleInputChange('workExperience', text)}
        />
      </View>

      {/* Full-Time / Part-Time */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Employment Type *</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.fullTime}
            onValueChange={(value) => handleInputChange('fullTime', value)}
            style={styles.picker}
          >
            <Picker.Item label="Full-time" value="Full-time" />
            <Picker.Item label="Part-time" value="Part-time" />
          </Picker>
        </View>
      </View>

      {/* Live-In / Non Live-In */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Live-In *</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.liveIn}
            onValueChange={(value) => handleInputChange('liveIn', value)}
            style={styles.picker}
          >
            <Picker.Item label="Live-in" value="Live-in" />
            <Picker.Item label="Non live-in" value="Non live-in" />
          </Picker>
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Post Job</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#F8F8F8',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#F8F8F8',
  },
  picker: {
    height: 50,
  },
  submitButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
