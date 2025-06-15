
//without firebase
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Icon } from "react-native-elements";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { PermissionsAndroid } from "react-native";
// import SmsRetriever from "react-native-sms-retriever";
// import { useTranslation } from "react-i18next";

// async function requestSmsPermission() {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.READ_SMS,
//       {
//         title: "SMS Permission",
//         message: "We need access to your SMS messages to auto-fill the OTP.",
//       }
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log("SMS permission granted");
//     } else {
//       console.log("SMS permission denied");
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// }

// export default function EmployerLogin() {
//   const { t } = useTranslation(); // Hook for translations
//   const navigation = useNavigation();
//   const route = useRoute();
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [otp, setOtp] = useState("");
//   const [generatedOtp, setGeneratedOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [resendEnabled, setResendEnabled] = useState(false);

//   // Get userType from route params
//   const { userType } = route.params || {};

//   useEffect(() => {
//     // Request SMS permission and set up SMS listener
//     requestSmsPermission();
//   }, []);

//   const startSmsListener = async () => {
//     try {
//       const message = await SmsRetriever.startSmsRetriever();
//       if (!message) {
//         throw new Error(t('smsError'));
//       }

//       console.log("Received message: ", message);

//       // Check if the message is a valid string
//       if (typeof message === 'string') {
//         const otpCode = extractOtpFromMessage(message);
//         if (otpCode) {
//           setOtp(otpCode); // Autofill OTP
//           Alert.alert(t("success"), t("otpAutofill"));
//         } else {
//           console.error(t('otpNotFound'));
//         }
//       } else {
//         console.error(t('invalidSmsFormat'));
//       }
//     } catch (error) {
//       console.error(t('smsListenerError'), error.message || error);
//     }
//   };

//   // const sendOtp = () => {
//   //   if (phoneNumber.length !== 11) {
//   //     Alert.alert(t("invalidNumber"), t("valid11Digit"));
//   //     return;
//   //   }

//   const sendOtp = () => {
//     // Validate phone number format
//     const phoneRegex = /^03\d{9}$/;
//     if (!phoneRegex.test(phoneNumber)) {
//       Alert.alert(t("invalidNumber"), t("validNumberMessage"));
//       return;
//     }

//     const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
//     setGeneratedOtp(otpCode);
//     setOtpSent(true);
//     setResendEnabled(false);
//     Alert.alert(t("otpSent"), `${t("yourOtpIs")} ${otpCode}`);
//     startSmsListener();

//     // Enable resend OTP after 30 seconds
//     setTimeout(() => {
//       setResendEnabled(true);
//     }, 30000);
//   };

//   const extractOtpFromMessage = (message) => {
//     const regex = /\d{4}/; // Assuming a 4-digit OTP
//     const match = message.match(regex);
//     return match ? match[0] : null;
//   };

  

//   // Inside verifyOtp function:
//   const verifyOtp = async () => {
//     if (otp === generatedOtp) {
//       Alert.alert(t("loginSuccess"), t("successMessage"));
  
//       // Save login state and userType
//       await AsyncStorage.setItem("isLoggedIn", "true");
//       await AsyncStorage.setItem("userType", userType);
  
//       // Navigate based on userType
//       if (userType === "employee") {
//         navigation.navigate("EmployeeHome");
//       } else if (userType === "employer") {
//         navigation.navigate("EmployerHome");
//       } else {
//         Alert.alert(t("error"), t("userTypeError"));
//       }
//     } else {
//       Alert.alert(t("error"), t("invalidOtp"));
//     }
//   };
  

//   const resendOtp = () => {
//     if (resendEnabled) {
//       sendOtp();
//     } else {
//       Alert.alert(t("wait"), t("resendWaitMessage"));
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <LinearGradient colors={["#fff", "#fff"]} style={styles.innerContainer}>
//         <Icon name="user" type="font-awesome" size={40} color="#4c669f" />
//         <Text style={styles.header}>{t("loginWithMobile")}</Text>

//         {/* Phone Number Input */}
//         <TextInput
//           style={styles.input}
//           placeholder={t("enterMobile")}
//           keyboardType="phone-pad"
//           value={phoneNumber}
//           onChangeText={setPhoneNumber}
//           maxLength={11}
//         />

//         {/* Send OTP Button */}
//         {!otpSent && (
//           <TouchableOpacity style={styles.button} onPress={sendOtp}>
//             <Text style={styles.buttonText}>{t("sendOtp")}</Text>
//           </TouchableOpacity>
//         )}

//         {/* OTP Input */}
//         {otpSent && (
//           <>
//             <TextInput
//               style={styles.input}
//               placeholder={t("enterOtp")}
//               keyboardType="number-pad"
//               value={otp}
//               onChangeText={setOtp}
//               maxLength={4}
//             />

//             {/* Resend OTP Button */}
//             <TouchableOpacity style={styles.resendButton} onPress={resendOtp}>
//               <Text style={styles.resendButtonText}>
//                 {resendEnabled ? t("resendOtp") : t("resendWait")}
//               </Text>
//             </TouchableOpacity>

//             {/* Verify OTP Button */}
//             <TouchableOpacity style={styles.button} onPress={verifyOtp}>
//               <Text style={styles.buttonText}>{t("login")}</Text>
//             </TouchableOpacity>
//           </>
//         )}
//       </LinearGradient>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   innerContainer: {
//     width: "90%",
//     padding: 20,
//     borderRadius: 20,
//     backgroundColor: "#fff",
//     elevation: 5,
//     alignItems: "center",
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#333",
//     marginVertical: 10,
//   },
//   input: {
//     width: "100%",
//     height: 50,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     padding: 10,
//     marginVertical: 10,
//   },
//   button: {
//     width: "100%",
//     height: 50,
//     backgroundColor: "#4c669f",
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   resendButton: {
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   resendButtonText: {
//     color: "#4c669f",
//     fontSize: 14,
//   },
// });


import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import { PermissionsAndroid } from "react-native";
import SmsRetriever from "react-native-sms-retriever";
import { useTranslation } from "react-i18next";
import useVoiceCommand from "../../hooks/useVoiceCommand";
// import { FIREBASE_DB } from "../../config/firebaseConfig"; // Firebase Config
import { getDatabase, ref, set ,get} from "firebase/database"; // Realtime Database import
import { FIREBASE_DB } from '../../config/firebaseConfig'; // Make sure this imports your firebase configuration
import { doc, setDoc } from "firebase/firestore";
import { getDoc,updateDoc } from "firebase/firestore";
// import { getDatabase, ref, get } from "firebase/database";


import useUserStore from '../store/userStore';
async function requestSmsPermission() {
  // const { setPhoneNumber: setGlobalPhone, se} = useUserStore();
  const { t } = useTranslation(); // Use i18n translations

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      {
        // title: "SMS Permission",
        // message: "We need access to your SMS messages to auto-fill the OTP.",
        title: t("sms_title"),
        message: t("sms_message"),
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("SMS permission granted");
    } else {
      console.log("SMS permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
}

export default function EmployerLogin() {

  const { setPhoneNumber: setGlobalPhone, setUserType } = useUserStore();
  const { startRecording, stopRecording, isRecording, transcription } = useVoiceCommand(); // Use the hook
  
  useEffect(() => {
    if (transcription) {
      setPhoneNumber(transcription); // Autofill the phone number when detected
    }
  }, [transcription]);


  const { t } = useTranslation(); // Hook for translations
  const navigation = useNavigation();
  const route = useRoute();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [resendEnabled, setResendEnabled] = useState(false);

  // Get userType from route params
  const { userType } = route.params || {};

  useEffect(() => {
    // Request SMS permission and set up SMS listener
    requestSmsPermission();
  }, []);

  const startSmsListener = async () => {
    try {
      const message = await SmsRetriever.startSmsRetriever();
      if (!message) {
        throw new Error(t('smsError'));
      }

      console.log("Received message: ", message);

      // Check if the message is a valid string
      if (typeof message === 'string') {
        const otpCode = extractOtpFromMessage(message);
        if (otpCode) {
          setOtp(otpCode); // Autofill OTP
          Alert.alert(t("success"), t("otpAutofill"));
        } else {
          console.error(t('otpNotFound'));
        }
      } else {
        // console.error(t('invalidSmsFormat'));
        console.log(t('invalidSmsFormat'));
      }
    } catch (error) {
      console.error(t('smsListenerError'), error.message || error);
    }
  };

  const sendOtp = () => {
    // Validate phone number format
    const phoneRegex = /^03\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert(t("invalidNumber"), t("validNumberMessage"));
      return;
    }

    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(otpCode);
    setOtpSent(true);
    setResendEnabled(false);
    Alert.alert(t("otpSent"), `${t("yourOtpIs")} ${otpCode}`);
    startSmsListener();

    // Enable resend OTP after 30 seconds
    setTimeout(() => {
      setResendEnabled(true);
    }, 30000);
  };

  const extractOtpFromMessage = (message) => {
    const regex = /\d{4}/; // Assuming a 4-digit OTP
    const match = message.match(regex);
    return match ? match[0] : null;
  };

  // const saveUserToDatabase = async () => {
  //   try {
  //     // Save user data to Realtime Database using phone number as userId
  //     const userId = phoneNumber; // Use phone number as primary key
  //     // const userRef = ref(getDatabase(), 'users/' + userId);
  //     const userRef = doc(FIREBASE_DB, "users", userId);

  //     // await set(userRef, {
  //     //   phoneNumber: phoneNumber,
  //     //   userType: userType, // 'employee' or 'employer'
  //     // });
  //     await setDoc(userRef, {
  //       phoneNumber:phoneNumber,
  //       userType:userType,
  //     }, {merge: true});

  //     console.log("User saved to database!");
  //   } catch (error) {
  //     console.error("Error saving user to database:", error);
  //   }
  // };

  const saveUserToDatabase = async () => {
    try {
      const userId = phoneNumber;
      const userRef = doc(FIREBASE_DB, "users", userId);
      
      const docSnap = await getDoc(userRef);
  
      if (docSnap.exists()) {
        console.log("User already exists:", docSnap.data());
        // ✅ Instead of setting the document, update only necessary fields
        await updateDoc(userRef, { phoneNumber, userType });
      } else {
        // If user doesn't exist, create a new document with all necessary fields
        await setDoc(userRef, { phoneNumber, userType, name: "", job: "" });
        console.log("User saved to database!");
      }
    } catch (error) {
      console.error("Error saving user to database:", error);
    }
  };

  const verifyOtp = async () => {
    if (otp === generatedOtp) {
      Alert.alert(t("loginSuccess"), t("successMessage"));

      // Save login state and userType
      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("userType", userType);

      setGlobalPhone(phoneNumber);
      setUserType(userType); 

      // Save user data to Firebase Realtime Database
      await saveUserToDatabase();

      // Navigate based on userType
      if (userType === "employee") {
        // navigation.navigate("EmployeeHome");
        navigation.navigate("EmployeeHome", { phoneNumber, userType });
      } else if (userType === "employer") {
        // navigation.navigate("EmployerHome");
        navigation.navigate("EmployerHome", { phoneNumber, userType });
      } else {
        Alert.alert(t("error"), t("userTypeError"));
      }
    } else {
      Alert.alert(t("error"), t("invalidOtp"));
    }
  };

  const resendOtp = () => {
    if (resendEnabled) {
      sendOtp();
    } else {
      Alert.alert(t("wait"), t("resendWaitMessage"));
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#fff", "#fff"]} style={styles.innerContainer}>
        <Icon name="user" type="font-awesome" size={40} color="#4c669f" />
        <Text style={styles.header}>{t("loginWithMobile")}</Text>

        {/* Phone Number Input */}
        <TextInput
          style={styles.input}
          placeholder={t("enterMobile")}
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          maxLength={11}
        />

        {/* 🎙️ Voice Input Button 
        <TouchableOpacity style={styles.voiceButton} onPress={isRecording ? stopRecording : startRecording}>
          <Icon name={isRecording ? "stop-circle" : "microphone"} type="font-awesome" size={30} color="#4c669f" />
          <Text style={styles.voiceButtonText}>{isRecording ? "Listening..." : "Use Voice"}</Text>
        </TouchableOpacity> */}


        {/* Send OTP Button */}
        {!otpSent && (
          <TouchableOpacity style={styles.button} onPress={sendOtp}>
            <Text style={styles.buttonText}>{t("sendOtp")}</Text>
          </TouchableOpacity>
        )}

        {/* OTP Input */}
        {otpSent && (
          <>
            <TextInput
              style={styles.input}
              placeholder={t("enterOtp")}
              keyboardType="number-pad"
              value={otp}
              onChangeText={setOtp}
              maxLength={4}
            />

            {/* Resend OTP Button */}
            <TouchableOpacity style={styles.resendButton} onPress={resendOtp}>
              <Text style={styles.resendButtonText}>
                {resendEnabled ? t("resendOtp") : t("resendWait")}
              </Text>
            </TouchableOpacity>

            {/* Verify OTP Button */}
            <TouchableOpacity style={styles.button} onPress={verifyOtp}>
              <Text style={styles.buttonText}>{t("login")}</Text>
            </TouchableOpacity>
          </>
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: "90%",
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#fff",
    elevation: 5,
    alignItems: "center",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },

  voiceButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e3e3e3",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  voiceButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#4c669f",
  },

  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#4c669f",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  resendButton: {
    marginTop: 10,
    marginBottom: 20,
  },
  resendButtonText: {
    color: "#4c669f",
    fontSize: 14,
  },
});

