
import { useState } from "react";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation} from "@react-navigation/native";
import * as Speech from "expo-speech";
import i18n from "../services/i18n";
import { Alert } from "react-native";

const CLOUD_API_KEY = "";

export default function useVoiceCommand() {
  
  const navigation = useNavigation(); // Get navigation inside the hook

  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [step, setStep] = useState("initial"); // Track current step in the flow


  const startRecording = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        Alert.alert("Permission Required", "Grant audio recording permission.");
        return;
      }

      const recordingInstance = new Audio.Recording();
      await recordingInstance.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recordingInstance.startAsync();
      setRecording(recordingInstance);
      setIsRecording(true);
    } catch (error) {
      console.error("Failed to start recording:", error);
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
      console.error("Failed to stop recording:", error);
    }
  };

  const processAudio = async (audioUri) => {
    try {
      const audioData = await FileSystem.readAsStringAsync(audioUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const requestPayload = {
        audio: { content: audioData },
        config: { encoding: "MP3", sampleRateHertz: 16000, languageCode: "en" },
      };

      const response = await fetch(
        `https://speech.googleapis.com/v1/speech:recognize?key=${CLOUD_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestPayload),
        }
      );

      const result = await response.json();
      if (
        result.results &&
        result.results[0] &&
        result.results[0].alternatives &&
        result.results[0].alternatives[0].transcript
      ) {
        const transcript = result.results[0].alternatives[0].transcript;
        setTranscription(transcript);
        handleVoiceCommand(transcript);
      } else {
        Alert.alert("Transcription Failed", "No transcription found.");
      }
    } catch (error) {
      console.error("Error processing audio:", error);
    }
  };

  const handleVoiceCommand = (text) => {

    if (!text) return;

    if (step === "initial" && (text.toLowerCase().includes("login") || text.includes("لاگ ان"))) {
      Speech.speak("Are you an employee or an employer?", { language: "en" });
      setStep("userType");
    } else if (step === "userType") {
      if (text.toLowerCase().includes("employee") || text.includes("ملازم")) {
        Speech.speak("Navigating to Employee login", { language: "en" });
        navigation.navigate("Login", { userType: "employee" });
        setStep("phoneNumber");
      } else if (text.toLowerCase().includes("employer") || text.includes("مالک")) {
        Speech.speak("Navigating to Employer login", { language: "en" });
        navigation.navigate("Login", { userType: "employer" });
        setStep("phoneNumber");
      }
    } else if (step === "phoneNumber") {
      const phoneNumber = extractPhoneNumber(text);
      if (phoneNumber) {
        Speech.speak(`Detected phone number: ${phoneNumber}. Auto-filling field.`, { language: "en" });
        // Call API to autofill number in login field (pseudo function)
        autoFillPhoneNumber(phoneNumber);
      } else {
        Speech.speak("Please say your phone number again.", { language: "en" });
      }
    }
  };

  const extractPhoneNumber = (text) => {
    const numberMatch = text.match(/\d{10,11}/);
    return numberMatch ? numberMatch[0] : null;
  };

  const autoFillPhoneNumber = (phoneNumber) => {
    // Simulated API call to autofill phone number in login field
    console.log("Auto-filling phone number:", phoneNumber);
  };

  return { startRecording, stopRecording, isRecording, transcription };
}


