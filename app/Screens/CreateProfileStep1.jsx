
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   Image,
//   ActivityIndicator,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker'; // For Gender dropdown
// import * as ImagePicker from 'expo-image-picker';
// import axios from 'axios';

// export default function CreateProfileStep1({ navigation }) {
  
//   //navigation.navigate('CreateProfileStep2', { language: 'English' });

//   const [formData, setFormData] = useState({
//     name: '',
//     gender: 'M', // Default gender
//     cnicNumber: '',
//     age: '', // Now we're using age instead of dateOfBirth
//   });

//   const [imageUri, setImageUri] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const pickImage = async () => {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission Denied', 'We need camera permissions to make this work!');
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [5, 3.8],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setLoading(true);
//       const uri = result.assets[0].uri;
//       setImageUri(uri);

//       console.log("Captured Image URI: ", uri);

//       const extractedText = await processImageWithOCR(uri);
//       console.log("Extracted Text: ", extractedText);

//       autofillFormFields(extractedText);

//       setLoading(false);
//     }
//   };

//   const processImageWithOCR = async (uri) => {
//     try {
//       const apiKey = 'AIzaSyDnnCay9_p6ku3kOqOlRy8v4ss5R7E_K-I';
//       const googleVisionEndpoint = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

//       const imageBase64 = await convertImageToBase64(uri);

//       const response = await axios.post(googleVisionEndpoint, {
//         requests: [
//           {
//             image: { content: imageBase64 },
//             features: [{ type: 'DOCUMENT_TEXT_DETECTION' }],
//           },
//         ],
//       });

//       const annotations = response.data.responses[0].textAnnotations;
//       return annotations.length > 0 ? annotations[0].description : '';
//     } catch (error) {
//       console.error('OCR Error:', error);
//       Alert.alert('Error', 'Failed to process the image for text.');
//       return '';
//     }
//   };

//   const convertImageToBase64 = async (uri) => {
//     const response = await fetch(uri);
//     const blob = await response.blob();
//     const base64Data = await new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () =>
//         resolve(reader.result.replace('data:', '').replace(/^.+,/, ''));
//       reader.onerror = (error) => reject(error);
//       reader.readAsDataURL(blob);
//     });
//     return base64Data;
//   };

//   const autofillFormFields = (text) => {
//   // Extract Name
//   const nameMatch = text.match(/Name\s+([A-Za-z]+\s+[A-Za-z]+)/i); // Matches "Name Haris Khan" (two words after "Name")
//   if (nameMatch) {
//     handleInputChange('name', nameMatch[1].trim()); // Extracts "Haris Khan"
//   }
  
//   // Extract Gender (located between "Gender" and "Country of Stay")
//   const genderMatch = text.match(/\bGender.*?Country of Stay\s*([A-Za-z]+)/i); // Matches "Gender ... Country of Stay F" or similar
//   if (genderMatch) {
//     const gender = genderMatch[1].toLowerCase(); // Normalize to lowercase for comparison
//     if (gender === 'm' || gender === 'mod') {
//       handleInputChange('gender', 'Male'); // Male
//     } else if (gender === 'f' || gender === 'fod') {
//       handleInputChange('gender', 'Female'); // Female
//     } else {
//       handleInputChange('gender', 'Other'); // Default to Other
//     }
//   }

  
//     // Extract CNIC Number
//     const cnicMatch = text.match(/\b\d{5}-\d{7}-\d\b/); // Matches "15602-5694215-3"
//     if (cnicMatch) {
//       handleInputChange('cnicNumber', cnicMatch[0].replace(/-/g, '')); // Removes dashes
//     }
  
//     // Extract Date of Birth (comes after "Date of Birth" and is in format dd.mm.yyyy)
//     const dobMatch = text.match(/Date of Birth\s*([\d]{2}\.[\d]{2}\.[\d]{4})/); // Matches date after "Date of Birth"
//     if (dobMatch) {
//       const dob = dobMatch[1]; // Extracts the date "28.09.2001"
//       const birthYear = parseInt(dob.split('.')[2]); // Extracts the year (2001)
//       const currentYear = new Date().getFullYear();
//       const age = currentYear - birthYear; // Calculates age
//       handleInputChange('age', age.toString()); // Autofills the age field
//     }

//   };
  

//   const handleSubmit = () => {
//     const { name, gender, cnicNumber, age } = formData;
//     if (!name || !cnicNumber || !age) {
//       Alert.alert('Error', 'Please fill out all required fields.');
//       return;
//     }
//     if (!/^\d{13}$/.test(cnicNumber)) {
//       Alert.alert('Invalid CNIC', 'CNIC should be exactly 13 digits.');
//       return;
//     }
//     if (!/^\d+$/.test(age) || age <= 0) {
//       Alert.alert('Invalid Age', 'Age must be a valid number greater than 0.');
//       return;
//     }
//     Alert.alert('Success', `User ${name} registered successfully!`);
//     console.log({ name, gender, cnicNumber, age });
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.header}>
//         Creating Your Profile <Text style={styles.stepNumber}>(1/6)</Text>
//       </Text>

//       {/* ID Card Scanner */}
//       <View style={styles.inputContainer}>
//         {loading && <ActivityIndicator size="large" color="#0000ff" />}
//         {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
//         <TouchableOpacity style={styles.captureButton} onPress={pickImage}>
//           <Text style={styles.captureButtonText}>Capture ID Card</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Name Field */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Name *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your name"
//           value={formData.name}
//           onChangeText={(text) => handleInputChange('name', text)}
//         />
//       </View>

//       {/* Gender Picker */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Gender *</Text>
//         <Picker
//           selectedValue={formData.gender}
//           onValueChange={(value) => handleInputChange('gender', value)}
//           style={styles.picker}
//         >
//           <Picker.Item label="Male" value="Male" />
//           <Picker.Item label="Female" value="Female" />
//           <Picker.Item label="Other" value="Other" />
//         </Picker>
//       </View>

//       {/* CNIC Field */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>CNIC Number *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your CNIC (13 digits)"
//           keyboardType="numeric"
//           maxLength={13}
//           value={formData.cnicNumber}
//           onChangeText={(text) => handleInputChange('cnicNumber', text)}
//         />
//       </View>

//       {/* Age Field */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Age *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your age"
//           keyboardType="numeric"
//           value={formData.age}
//           onChangeText={(text) => handleInputChange('age', text)}
//         />
//       </View>

//       {/* Submit Button */}
//       <TouchableOpacity 
//         style={styles.submitButton} 
//         onPress={() => navigation.navigate('CreateProfileStep2', { language: 'English' })}
//     >
//         <Text style={styles.submitButtonText}>Next</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({

//   captureButton: {
//     backgroundColor: '#4CAF50',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   captureButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     marginVertical: 10,
//     borderRadius: 5,
//   },

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
//     marginTop:20,
//     marginBottom:60,
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
// }

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
//   Image,
//   ActivityIndicator,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import * as ImagePicker from 'expo-image-picker';
// import useUserStore from '../store/userStore';
// import { FIREBASE_DB } from '../../config/firebaseConfig';
// import { doc, setDoc } from 'firebase/firestore';
//// import axios from 'axios';

// export default function CreateProfileStep1({ navigation }) {
//   const { phoneNumber, userType } = useUserStore();
//   const [formData, setFormData] = useState({
//     name: '',
//     gender: '',
//     cnicNumber: '',
//     age: '',
//   });

//   const [imageUri, setImageUri] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const pickImage = async () => {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission Denied', 'We need camera permissions to proceed.');
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [5, 3.8],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setLoading(true);
//       setImageUri(result.assets[0].uri);
//       setLoading(false);
//     }
//   };

//   const saveUserToFirebase = async () => {
//     const { name, gender, cnicNumber, age } = formData;

//     try {
//       const userId = phoneNumber;
//       const userRef = doc(FIREBASE_DB, 'users', userId);

//       await setDoc(userRef, {
//         phoneNumber,
//         userType,
//         name,
//         gender,
//         cnicNumber,
//         age: parseInt(age),
//       });

//       navigation.navigate('CreateProfileStep2');
//     } catch (error) {
//       console.error('Error saving user data: ', error);
//       Alert.alert('Error', 'Failed to save user data.');
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.headerContainer}>
//         <Text style={styles.header}>Create Your Profile</Text>
//         <Text style={styles.stepNumber}>(Step 1 of 6)</Text>
//       </View>

//       <View style={styles.inputContainer}>
//         {loading && <ActivityIndicator size="large" color="#FF5733" />}
//         {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
//         <TouchableOpacity style={styles.captureButton} onPress={pickImage}>
//           <Text style={styles.captureButtonText}>📸 Capture ID Card</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Full Name *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your full name"
//           value={formData.name}
//           onChangeText={(text) => handleInputChange('name', text)}
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Gender *</Text>
//         <Picker
//           selectedValue={formData.gender}
//           onValueChange={(value) => handleInputChange('gender', value)}
//           style={styles.picker}
//         >
//           <Picker.Item label="Select Gender" value="" />
//           <Picker.Item label="Male" value="Male" />
//           <Picker.Item label="Female" value="Female" />
//           <Picker.Item label="Other" value="Other" />
//         </Picker>
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>CNIC Number *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter CNIC (13 digits)"
//           keyboardType="numeric"
//           maxLength={13}
//           value={formData.cnicNumber}
//           onChangeText={(text) => handleInputChange('cnicNumber', text)}
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Age *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your age"
//           keyboardType="numeric"
//           value={formData.age}
//           onChangeText={(text) => handleInputChange('age', text)}
//         />
//       </View>

//       <TouchableOpacity style={styles.saveButton} onPress={saveUserToFirebase}>
//         <Text style={styles.saveButtonText}>✅ Save & Continue</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f8f9fa',
//   },
//   headerContainer: {
//     backgroundColor: '#FF5733',
//     paddingVertical: 20,
//     paddingHorizontal: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   stepNumber: {
//     fontSize: 16,
//     color: '#FFD700',
//     marginTop: 5,
//   },
//   inputContainer: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//     color: '#333',
//     fontWeight: '600',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 12,
//     fontSize: 16,
//     borderRadius: 8,
//     backgroundColor: '#fff',
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//     backgroundColor: '#fff',
//     borderRadius: 8,
//   },
//   captureButton: {
//     backgroundColor: '#007BFF',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 20,
//     marginBottom: 20,
//   },
//   captureButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   saveButton: {
//     backgroundColor: '#28A745',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 20,
//     marginBottom: 40,
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
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
  Image,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import useUserStore from '../store/userStore';
import { FIREBASE_DB } from '../../config/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import axios from 'axios';

export default function CreateProfileStep1({ navigation }) {
  
  const { t } = useTranslation();
  const { phoneNumber, userType } = useUserStore();

  const [formData, setFormData] = useState({
    name: '',
    gender: '', // Default gender
    cnicNumber: '',
    age: '', // Now we're using age instead of dateOfBirth
  });

  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need camera permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [5, 3.8],
      quality: 1,
    });

    if (!result.canceled) {
      setLoading(true);
      const uri = result.assets[0].uri;
      setImageUri(uri);

      console.log("Captured Image URI: ", uri);

      const extractedText = await processImageWithOCR(uri);
      console.log("Extracted Text: ", extractedText);

      autofillFormFields(extractedText);

      setLoading(false);
    }
  };

  const processImageWithOCR = async (uri) => {
    try {
      const apiKey = 'AIzaSyDnnCay9_p6ku3kOqOlRy8v4ss5R7E_K-I';
      const googleVisionEndpoint = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

      const imageBase64 = await convertImageToBase64(uri);

      const response = await axios.post(googleVisionEndpoint, {
        requests: [
          {
            image: { content: imageBase64 },
            features: [{ type: 'DOCUMENT_TEXT_DETECTION' }],
          },
        ],
      });

      const annotations = response.data.responses[0].textAnnotations;
      return annotations.length > 0 ? annotations[0].description : '';
    } catch (error) {
      console.error('OCR Error:', error);
      Alert.alert('Error', 'Failed to process the image for text.');
      return '';
    }
  };

  const convertImageToBase64 = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const base64Data = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () =>
        resolve(reader.result.replace('data:', '').replace(/^.+,/, ''));
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(blob);
    });
    return base64Data;
  };

  const autofillFormFields = (text) => {
  // Extract Name
  const nameMatch = text.match(/Name\s+([A-Za-z]+\s+[A-Za-z]+)/i); // Matches "Name Haris Khan" (two words after "Name")
  if (nameMatch) {
    handleInputChange('name', nameMatch[1].trim()); // Extracts "Haris Khan"
  }
  
  // Extract Gender (located between "Gender" and "Country of Stay")
  const genderMatch = text.match(/\bGender.*?Country of Stay\s*([A-Za-z]+)/i); // Matches "Gender ... Country of Stay F" or similar
  if (genderMatch) {
    const gender = genderMatch[1].toLowerCase(); // Normalize to lowercase for comparison
    if (gender === 'm' || gender === 'mod') {
      handleInputChange('gender', 'Male'); // Male
    } else if (gender === 'f' || gender === 'fod') {
      handleInputChange('gender', 'Female'); // Female
    } else {
      handleInputChange('gender', 'Other'); // Default to Other
    }
  }

  
    // Extract CNIC Number
    const cnicMatch = text.match(/\b\d{5}-\d{7}-\d\b/); // Matches "15602-5694215-3"
    if (cnicMatch) {
      handleInputChange('cnicNumber', cnicMatch[0].replace(/-/g, '')); // Removes dashes
    }
  
    // Extract Date of Birth (comes after "Date of Birth" and is in format dd.mm.yyyy)
    const dobMatch = text.match(/Date of Birth\s*([\d]{2}\.[\d]{2}\.[\d]{4})/); // Matches date after "Date of Birth"
    if (dobMatch) {
      const dob = dobMatch[1]; // Extracts the date "28.09.2001"
      const birthYear = parseInt(dob.split('.')[2]); // Extracts the year (2001)
      const currentYear = new Date().getFullYear();
      const age = currentYear - birthYear; // Calculates age
      handleInputChange('age', age.toString()); // Autofills the age field
    }

  };
  

  // const handleSubmit = () => {
  //   const { name, gender, cnicNumber, age } = formData;
  //   if (!name || !cnicNumber || !age) {
  //     Alert.alert('Error', 'Please fill out all required fields.');
  //     return;
  //   }
  //   if (!/^\d{13}$/.test(cnicNumber)) {
  //     Alert.alert('Invalid CNIC', 'CNIC should be exactly 13 digits.');
  //     return;
  //   }
  //   if (!/^\d+$/.test(age) || age <= 0) {
  //     Alert.alert('Invalid Age', 'Age must be a valid number greater than 0.');
  //     return;
  //   }
  //   Alert.alert('Success', `User ${name} registered successfully!`);
  //   console.log({ name, gender, cnicNumber, age });
  // };


  const saveUserToFirebase = async () => {
    const { name, gender, cnicNumber, age } = formData;

    try {
      const userId = phoneNumber;
      const userRef = doc(FIREBASE_DB, 'users', userId);

      await setDoc(userRef, {
        phoneNumber,
        userType,
        name,
        gender,
        cnicNumber,
        age: parseInt(age),
      });

      navigation.navigate('CreateProfileStep2');
    } catch (error) {
      console.error('Error saving user data: ', error);
      Alert.alert('Error', 'Failed to save user data.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        {/* <Text style={styles.header}>Create Your Profile</Text>
        <Text style={styles.stepNumber}>(Step 1 of 6)</Text> */}
        <Text style={styles.header}>{t('createProfile')}</Text>
        <Text style={styles.stepNumber}>{t('step', { step: 1, totalSteps: 6 })}</Text>
      </View>

      <View style={styles.inputContainer}>
        {loading && <ActivityIndicator size="large" color="#FF5733" />}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        <TouchableOpacity style={styles.captureButton} onPress={pickImage}>
          {/* <Text style={styles.captureButtonText}>📸 Capture ID Card</Text> */}
          <Text style={styles.captureButtonText}>{t('captureIdCard')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        {/* <Text style={styles.label}>Full Name *</Text> */}
        <Text style={styles.label}>{t('fullName')}</Text>
        <TextInput
          style={styles.input}
          //placeholder="Enter your full name"
          placeholder={t('enterFullName')}
          value={formData.name}
          onChangeText={(text) => handleInputChange('name', text)}
        />
      </View>

      <View style={styles.inputContainer}>
        {/* <Text style={styles.label}>Gender *</Text> */}
        <Text style={styles.label}>{t('gender')}</Text>
        <Picker
          selectedValue={formData.gender}
          onValueChange={(value) => handleInputChange('gender', value)}
          style={styles.picker}
        >
          {/* <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" /> */}

          <Picker.Item label={t('selectGender')} value="" />
          <Picker.Item label={t('male')} value="Male" />
          <Picker.Item label={t('female')} value="Female" />
          <Picker.Item label={t('other')} value="Other" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        {/* <Text style={styles.label}>CNIC Number *</Text> */}
        <Text style={styles.label}>{t('cnicNumber')}</Text>
        <TextInput
          style={styles.input}
          //placeholder="Enter CNIC (13 digits)"
          placeholder={t('enterCnic')}
          keyboardType="numeric"
          maxLength={13}
          value={formData.cnicNumber}
          onChangeText={(text) => handleInputChange('cnicNumber', text)}
        />
      </View>

      <View style={styles.inputContainer}>
        {/* <Text style={styles.label}>Age *</Text> */}
        <Text style={styles.label}>{t('age')}</Text>
        <TextInput
          style={styles.input}
          //placeholder="Enter your age"
          placeholder={t('enterAge')}
          keyboardType="numeric"
          value={formData.age}
          onChangeText={(text) => handleInputChange('age', text)}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveUserToFirebase}>
        {/* <Text style={styles.saveButtonText}>✅ Save & Continue</Text> */}
        <Text style={styles.saveButtonText}>{t('saveContinue')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  headerContainer: {
    backgroundColor: '#FF5733',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  stepNumber: {
    fontSize: 16,
    color: '#FFD700',
    marginTop: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  captureButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  captureButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#28A745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});