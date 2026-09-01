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
import nlp from 'compromise';
import { useTranslation } from 'react-i18next';

import useUserStore from '../store/userStore';
import { doc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from '../../config/firebaseConfig';

export default function CreateProfileStep2({ navigation, route }) {
  const { phoneNumber } = useUserStore();
  const [profession, setProfession] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const { t } = useTranslation();

  const { language } = route.params || {}; 

  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  const CLOUD_API_KEY = ''; // Replace with your API key

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
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
        Alert.alert('Permission Required', 'Audio recording permissions are needed.');
        return;
      }

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      const audioUri = recording.getURI();
      setIsRecording(false);
      processAudio(audioUri);
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  const processAudio = async (audioUri) => {
    try {
      const audioData = await FileSystem.readAsStringAsync(audioUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const response = await fetch(
        `https://speech.googleapis.com/v1/speech:recognize?key=${CLOUD_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            audio: { content: audioData },
            config: { encoding: 'MP3', sampleRateHertz: 16000, languageCode: 'en-US' },
          }),
        }
      );

      const result = await response.json();
      if (result?.results?.[0]?.alternatives?.[0]?.transcript) {
        extractProfession(result.results[0].alternatives[0].transcript);
      } else {
        Alert.alert('Error', 'Could not recognize audio.');
      }
    } catch (error) {
      console.error('Error processing audio:', error);
    }
  };

  const extractProfession = (text) => {
    try {
      const doc = nlp(text);
      const professionMatch = doc.nouns().first().text();

      if (professionMatch) {
        setProfession(professionMatch);
      } else {
        Alert.alert('Error', 'Could not determine profession from speech.');
      }
    } catch (error) {
      console.error('Error extracting profession:', error);
    }
  };

  const saveProfessionToFirebase = async () => {
    if (!profession.trim()) {
      Alert.alert('Error', 'Please enter your profession');
      return;
    }

    try {
      const userRef = doc(FIREBASE_DB, "users", phoneNumber);
      await updateDoc(userRef, { profession });
      navigation.navigate('CreateProfileStep3');
    } catch (error) {
      console.error("Error updating profession:", error);
      Alert.alert("Error", "Failed to save profession");
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Create Your Profile</Text>
      <Text style={styles.subHeader}>Step 2 of 6</Text> */}
      <Text style={styles.header}>{t('createProfile')}</Text>
      <Text style={styles.subHeader}>{t('step', { step: 2 })}</Text>

      <TouchableOpacity onPress={isRecording ? stopRecording : startRecording} style={styles.iconContainer}>
        <Animated.View
          style={[styles.pulsingCircle, { transform: [{ scale: pulseAnim }] }]}
        >
          <View style={styles.circle}>
            <Icon name={isRecording ? 'microphone-slash' : 'microphone'} size={50} color="#fff" />
          </View>
        </Animated.View>
      </TouchableOpacity>

      {/* <Text style={styles.question}>What is your profession?</Text> */}
      <Text style={styles.question}>{t('professionQuestion')}</Text>
      <TextInput
        style={styles.input}
        //placeholder="Enter your profession"
        placeholder={t('enterProfession')}
        value={profession}
        onChangeText={setProfession}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.button} onPress={saveProfessionToFirebase}>
        {/* <Text style={styles.buttonText}>Next</Text> */}
        <Text style={styles.buttonText}>{t('next')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  iconContainer: {
    marginVertical: 20,
  },
  pulsingCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(0, 188, 212, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#00BCD4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  question: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

