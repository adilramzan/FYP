// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { Audio } from 'expo-av';

// export default function CreateProfileStep2({ navigation }) {
//   const [profession, setProfession] = useState('');
//   const [isRecording, setIsRecording] = useState(false);
//   const [recording, setRecording] = useState(null);
//   const [audioUri, setAudioUri] = useState(null);

//   // Animation for pulsing background circle
//   const pulseAnim = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     // Start pulsing animation for the background circle
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(pulseAnim, {
//           toValue: 1.2,
//           duration: 1000,
//           useNativeDriver: true,
//         }),
//         Animated.timing(pulseAnim, {
//           toValue: 1,
//           duration: 1000,
//           useNativeDriver: true,
//         }),
//       ])
//     ).start();

//     return () => {
//       if (recording) {
//         recording.stopAndUnloadAsync(); // Clean up recording resources
//       }
//     };
//   }, []);

//   const startRecording = async () => {
//     try {
//       // Ask for recording permissions
//       const { granted } = await Audio.requestPermissionsAsync();
//       if (!granted) {
//         Alert.alert('Permission Required', 'You need to grant audio recording permissions to use this feature.');
//         return;
//       }

//       // Prepare and start recording
//       const { recording } = await Audio.Recording.createAsync(
//         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
//       );
//       setRecording(recording);
//       setIsRecording(true);
//       console.log('Recording started...');
//     } catch (error) {
//       console.error('Failed to start recording:', error);
//     }
//   };

//   const stopRecording = async () => {
//     try {
//       if (!recording) return;

//       // Stop recording
//       await recording.stopAndUnloadAsync();
//       const uri = recording.getURI();
//       setAudioUri(uri);
//       setIsRecording(false);
//       console.log('Recording stopped. Audio saved at:', uri);
//     } catch (error) {
//       console.error('Failed to stop recording:', error);
//     }
//   };

//   const handleRecordPress = () => {
//     if (isRecording) {
//       stopRecording();
//     } else {
//       startRecording();
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header with step */}
//       <Text style={styles.header}>
//         Creating Your Profile <Text style={styles.stepNumber}>(5/6)</Text>
//       </Text>

//       {/* Microphone Icon with pulsing background circle */}
//       <TouchableOpacity onPress={handleRecordPress} style={styles.iconContainer}>
//         <Animated.View
//           style={[styles.pulsingCircle, { transform: [{ scale: pulseAnim }], opacity: isRecording ? 1 : 0.5 }]}
//         >
//           <View style={styles.circle}>
//             <Icon
//               name={isRecording ? 'microphone-slash' : 'microphone'}
//               size={60}
//               color="#fff"
//               style={styles.microphoneIcon}
//             />
//           </View>
//         </Animated.View>
//       </TouchableOpacity>

//       {/* Profession Field */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.question}>What is your Mother Tongue?</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your language"
//           value={profession}
//           onChangeText={setProfession}
//         />
//       </View>

//       {/* Display the saved audio URI */}
//       {audioUri && (
//         <Text style={styles.audioText}>
//           Recorded Audio: {audioUri}
//         </Text>
//       )}

//       {/* Next Button */}
//       <TouchableOpacity 
//         style={styles.submitButton} 
//         onPress={() => navigation.navigate('Profile6')}
//     >
//         <Text style={styles.submitButtonText}>Next</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#F5F5F5',
//     padding: 20,
//   },
//   header: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   stepNumber: {
//     fontSize: 22,
//     color: '#4CAF50',
//     fontWeight: 'bold',
//   },
//   iconContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 50,
//   },
//   pulsingCircle: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: 'rgba(0, 188, 212, 0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   circle: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: '#00BCD4',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   microphoneIcon: {
//     position: 'absolute',
//   },
//   inputContainer: {
//     marginBottom: 10,
//     width: '100%',
//   },
//   question: {
//     fontSize: 20,
//     color: '#333',
//     marginBottom: 5,
//     textAlign: 'center',
//     fontWeight: '600',
//   },
//   input: {
//     width: '100%',
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     paddingLeft: 10,
//     backgroundColor: '#fff',
//     fontSize: 16,
//     marginBottom: 0,
//   },
//   audioText: {
//     fontSize: 14,
//     color: '#333',
//     marginTop: 10,
//     textAlign: 'center',
//   },
//   submitButton: {
//     backgroundColor: '#4CAF50',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//     width: '100%',
//     marginBottom: 120,
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });



import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { doc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from '../../config/firebaseConfig';
import useUserStore from '../store/userStore';
// Import Compromise for basic NLP parsing
//import nlp from 'compromise';
import { useTranslation } from 'react-i18next';

export default function CreateProfileStep2({ navigation,route }) {

  const { phoneNumber } = useUserStore();
  const [lang, setLanguage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [transcription, setTranscription] = useState('');
  const { t } = useTranslation();

  const { language } = route.params || {}; // Data from the previous page

  const pulseAnim = useRef(new Animated.Value(1)).current;

  const CLOUD_API_KEY = ''; // Replace with your API key

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        Alert.alert(
          'Permission Required',
          'You need to grant audio recording permissions to use this feature.'
        );
        return;
      }

      const recordingSettings = {
        android: {
          extension: '.mp3',
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
          sampleRate: 16000,
          numberOfChannels: 1,
          bitRate: 128000,
        },
        ios: {
          extension: '.mp3',
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
          sampleRate: 16000,
          numberOfChannels: 1,
          bitRate: 128000,
        },
      };

      const { recording } = await Audio.Recording.createAsync(recordingSettings);
      setRecording(recording);
      setIsRecording(true);
      console.log('Recording started...');
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      const audioUri = recording.getURI();

      console.log('Recording stopped. Sending audio to API...');
      setIsRecording(false);

      processAudio(audioUri);
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

    const saveLanguageToFirebase = async () => {
        if (!lang) {
          Alert.alert('Error', 'Please enter your Language');
          return;
        }
    
        try {
          const userRef = doc(FIREBASE_DB, "users", phoneNumber);
          
          // Update existing document with new field
          await updateDoc(userRef, {
            lang:lang
          });
    
          console.log("language updated successfully!");
          navigation.navigate('CreateProfileStep6');
        } catch (error) {
          console.error("Error updating profession:", error);
          Alert.alert("Error", "Failed to save profession");
        }
      };

  // const processAudio = async (audioUri) => {
  //   try {
  //     console.log('Processing audio at URI:', audioUri);

  //     const audioData = await FileSystem.readAsStringAsync(audioUri, {
  //       encoding: FileSystem.EncodingType.Base64,
  //     });

  //     const requestPayload = {
  //       audio: {
  //         content: audioData,
  //       },
  //       config: {
  //         encoding: 'MP3',
  //         sampleRateHertz: 16000,
  //         languageCode: 'en-US', // Adjust for urdu if needed: 'ur-PK'
  //       },
  //     };

  //     const response = await fetch(
  //       `https://speech.googleapis.com/v1/speech:recognize?key=${CLOUD_API_KEY}`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(requestPayload),
  //       }
  //     );

  //     const result = await response.json();
  //     console.log('Transcription result:', result);

  //     if (
  //       result.results &&
  //       result.results[0] &&
  //       result.results[0].alternatives &&
  //       result.results[0].alternatives[0].transcript
  //     ) {
  //       const transcript = result.results[0].alternatives[0].transcript;
  //       setTranscription(transcript);

  //       // Extract relevant information
  //       extractInformation(transcript);
  //     } else {
  //       Alert.alert('Transcription Failed', 'No transcription found in the response.');
  //     }
  //   } catch (error) {
  //     console.error('Error during audio processing:', error);
  //   }
  // };

  // const extractInformation = (text) => {
  //   try {
  //     const doc = nlp(text);
  
  //     // Extract language from transcription by matching specific terms related to language
  //     const languageMatch = doc
  //       .match('(language|tongue|speak) [a-z]+') // Looks for mentions of "language", "speak", etc.
  //       .terms()
  //       .last()
  //       .text();
  
  //     if (languageMatch) {
  //       console.log('Extracted Language:', languageMatch);  // Debugging line to check extracted data
  //       setLanguage(languageMatch);  // Update the state with extracted language
  //     }
  
  //     console.log('Extracted Info:', { languageMatch });
  
  //   } catch (error) {
  //     console.error('Error extracting information:', error);
  //   }
  // };
  
  const processAudio = async (audioUri) => {
    try {
      console.log('Processing audio at URI:', audioUri);
  
      const audioData = await FileSystem.readAsStringAsync(audioUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      const requestPayload = {
        audio: {
          content: audioData,
        },
        config: {
          encoding: 'MP3',
          sampleRateHertz: 16000,
          languageCode: 'en-US', // Adjust for urdu if needed: 'ur-PK'
        },
      };
  
      const response = await fetch(
        `https://speech.googleapis.com/v1/speech:recognize?key=${CLOUD_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestPayload),
        }
      );
  
      const result = await response.json();
      console.log('Transcription result:', result);
  
      if (
        result.results &&
        result.results[0] &&
        result.results[0].alternatives &&
        result.results[0].alternatives[0].transcript
      ) {
        const transcript = result.results[0].alternatives[0].transcript;
        setTranscription(transcript); // Update transcription for display
  

        if (transcript) {
          setLanguage(transcript); // Autofill the language field with the extracted language
        }
      } else {
        Alert.alert('Transcription Failed', 'No transcription found in the response.');
      }
    } catch (error) {
      console.error('Error during audio processing:', error);
    }
  };
  
  

  const handleRecordPress = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>
        Creating Your Profile <Text style={styles.stepNumber}>(5/6)</Text>
      </Text> */}

      <Text style={styles.header}>
        {t('creatingProfile')} <Text style={styles.stepNumber}>{t('step', { step: 5 })}</Text>
      </Text>

      <TouchableOpacity onPress={handleRecordPress} style={styles.iconContainer}>
        <Animated.View
          style={[
            styles.pulsingCircle,
            { transform: [{ scale: pulseAnim }], opacity: isRecording ? 1 : 0.5 },
          ]}
        >
          <View style={styles.circle}>
            <Icon
              name={isRecording ? 'microphone-slash' : 'microphone'}
              size={60}
              color="#fff"
              style={styles.microphoneIcon}
            />
          </View>
        </Animated.View>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        {/* <Text style={styles.question}>What is your Mother Language?</Text> */}
        <Text style={styles.question}>{t('motherLanguage')}</Text>
        <TextInput
          style={styles.input}
          //placeholder="Enter Your Mother Language"
          placeholder={t('enterMotherLanguage')}
          value={lang}
          onChangeText={setLanguage}
        />
      </View>

      {transcription && (
        <Text style={styles.audioText}>Transcription: {transcription}</Text>
      )}

      <TouchableOpacity
        style={styles.submitButton}
        // onPress={() => navigation.navigate('CreateProfileStep6', { language: 'English' })}
        onPress={saveLanguageToFirebase} 
      >
        {/* <Text style={styles.submitButtonText}>Next</Text> */}
        <Text style={styles.submitButtonText}>{t('next')}</Text>
      </TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  stepNumber: {
    fontSize: 22,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  pulsingCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(0, 188, 212, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#00BCD4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  microphoneIcon: {
    position: 'absolute',
  },
  inputContainer: {
    marginBottom: 10,
    width: '100%',
  },
  question: {
    fontSize: 20,
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
    fontWeight: '600',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 0,
  },
  audioText: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginBottom: 120,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
