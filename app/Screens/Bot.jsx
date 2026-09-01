
// openAI
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import {
//   Alert,
//   Image,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { scale, verticalScale } from "react-native-size-matters";
// import AntDesign from "@expo/vector-icons/AntDesign";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { Audio } from "expo-av";
// import axios from "axios";
// import LottieView from "lottie-react-native";
// import * as Speech from "expo-speech";
// import Regenerate from "../../assets/svgs/regenerate";
// import Reload from "../../assets/svgs/reload";


// export default function HomeScreen() {
//   const [text, setText] = useState("");
//   const [isRecording, setIsRecording] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [recording, setRecording] = useState(null);
//   const [AIResponse, setAIResponse] = useState(false);
//   const [AISpeaking, setAISpeaking] = useState(false);
//   const lottieRef = useRef(null);

//   const getMicrophonePermission = async () => {
//     try {
//       const { granted } = await Audio.requestPermissionsAsync();
//       if (!granted) {
//         Alert.alert("Permission", "Please grant permission to access microphone");
//         return false;
//       }
//       return true;
//     } catch (error) {
//       console.log(error);
//       return false;
//     }
//   };

//   const recordingOptions = {
//     android: {
//       extension: ".wav",
//       outPutFormat: Audio.AndroidOutputFormat.MPEG_4,
//       androidEncoder: Audio.AndroidAudioEncoder.AAC,
//       sampleRate: 44100,
//       numberOfChannels: 2,
//       bitRate: 128000,
//     },
//     ios: {
//       extension: ".wav",
//       audioQuality: Audio.IOSAudioQuality.HIGH,
//       sampleRate: 44100,
//       numberOfChannels: 2,
//       bitRate: 128000,
//       linearPCMBitDepth: 16,
//       linearPCMIsBigEndian: false,
//       linearPCMIsFloat: false,
//     },
//   };

//   const startRecording = async () => {
//     const hasPermission = await getMicrophonePermission();
//     if (!hasPermission) return;

//     try {
//       await Audio.setAudioModeAsync({
//         allowsRecordingIOS: true,
//         playsInSilentModeIOS: true,
//       });
//       setIsRecording(true);
//       const { recording } = await Audio.Recording.createAsync(recordingOptions);
//       setRecording(recording);
//     } catch (error) {
//       console.log("Failed to start Recording", error);
//       Alert.alert("Error", "Failed to start recording");
//     }
//   };

//   const stopRecording = async () => {
//     try {
//       setIsRecording(false);
//       setLoading(true);
//       await recording?.stopAndUnloadAsync();
//       await Audio.setAudioModeAsync({
//         allowsRecordingIOS: false,
//       });

//       const uri = recording?.getURI();
//       const transcript = await sendAudioToWhisper(uri);

//       setText(transcript);
//       await sendToGpt(transcript);
//     } catch (error) {
//       console.log("Failed to stop Recording", error);
//       Alert.alert("Error", "Failed to stop recording");
//     }
//   };

//   const sendAudioToWhisper = async (uri) => {
//     try {
//       const formData = new FormData();
//       formData.append("file", {
//         uri,
//         type: "audio/wav",
//         name: "recording.wav",
//       });
//       formData.append("model", "whisper-1");

//       const response = await axios.post(
//         "https://api.openai.com/v1/audio/transcriptions",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       return response.data.text;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const sendToGpt = async (text) => {
//     try {
//       const response = await axios.post(
//         "https://api.openai.com/v1/chat/completions",
//         {
//           model: "gpt-4",
//           messages: [
//             {
//               role: "system",
//               content:
//                 "You are SkillBazaar, a friendly AI assistant who refers to yourself as SkillBazaar. You provide clear, helpful answers in English.",
//             },
//             {
//               role: "user",
//               content: text,
//             },
//           ],
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       setText(response.data.choices[0].message.content);
//       setLoading(false);
//       setAIResponse(true);
//       await speakText(response.data.choices[0].message.content);
//       return response.data.choices[0].message.content;
//     } catch (error) {
//       console.log("Error sending text to GPT-4", error);
//     }
//   };

//   const speakText = async (text) => {
//     setAISpeaking(true);
//     const options = {
//       language: "en-US",
//       pitch: 1.5,
//       rate: 1,
//       onDone: () => {
//         setAISpeaking(false);
//       },
//     };
//     Speech.speak(text, options);
//   };

//   useEffect(() => {
//     if (AISpeaking) {
//       lottieRef.current?.play();
//     } else {
//       lottieRef.current?.reset();
//     }
//   }, [AISpeaking]);

//   return (
//     <LinearGradient colors={["#250152", "#000"]} style={styles.container}>
//       <StatusBar barStyle="light-content" />

//       {/* Back Shadows */}
//       <Image
//         source={require("../../assets/main/blur.png")}
//         style={{
//           position: "absolute",
//           right: scale(-15),
//           top: 0,
//           width: scale(240),
//         }}
//       />
//       <Image
//         source={require("../../assets/main/purple-blur.png")}
//         style={{
//           position: "absolute",
//           left: scale(-15),
//           bottom: verticalScale(100),
//           width: scale(210),
//         }}
//       />

//       {/* Back Arrow */}
//       {AIResponse && (
//         <TouchableOpacity
//           style={{ position: "absolute", top: verticalScale(50), left: scale(20) }}
//           onPress={() => {
//             setIsRecording(false);
//             setAIResponse(false);
//             setText("");
//           }}
//         >
//           <AntDesign name="arrowleft" size={scale(20)} color="#fff" />
//         </TouchableOpacity>
//       )}

//       <View style={{ marginTop: verticalScale(-40) }}>
//         {loading ? (
//           <LottieView
//             source={require("../../assets/animations/loading.json")}
//             autoPlay
//             loop
//             speed={1.3}
//             style={{ width: scale(270), height: scale(270) }}
//           />
//         ) : !isRecording ? (
//           AIResponse ? (
//             <LottieView
//               ref={lottieRef}
//               source={require("../../assets/animations/ai-speaking.json")}
//               autoPlay={false}
//               loop={false}
//               style={{ width: scale(250), height: scale(250) }}
//             />
//           ) : (
//             <TouchableOpacity
//               style={{
//                 width: scale(110),
//                 height: scale(110),
//                 backgroundColor: "#fff",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 borderRadius: scale(100),
//               }}
//               onPress={startRecording}
//             >
//               <FontAwesome name="microphone" size={scale(50)} color="#2b3356" />
//             </TouchableOpacity>
//           )
//         ) : (
//           <TouchableOpacity onPress={stopRecording}>
//             <LottieView
//               source={require("../../assets/animations/animation.json")}
//               autoPlay
//               loop
//               speed={1.3}
//               style={{ width: scale(250), height: scale(250) }}
//             />
//           </TouchableOpacity>
//         )}
//       </View>

//       <View
//         style={{
//           alignItems: "center",
//           width: scale(350),
//           position: "absolute",
//           bottom: verticalScale(90),
//         }}
//       >
//         <Text
//           style={{
//             color: "#fff",
//             fontSize: scale(16),
//             textAlign: "center",
//             lineHeight: 25,
//           }}
//         >
//           {loading ? "..." : text || "Press the microphone to start recording!"}
//         </Text>
//       </View>

//       {AIResponse && (
//         <View
//           style={{
//             position: "absolute",
//             bottom: verticalScale(40),
//             left: 0,
//             flexDirection: "row",
//             justifyContent: "space-between",
//             alignItems: "center",
//             width: scale(360),
//             paddingHorizontal: scale(30),
//           }}
//         >
//           <TouchableOpacity onPress={() => sendToGpt(text)}>
//             <Regenerate />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => speakText(text)}>
//             <Reload />
//           </TouchableOpacity>
//         </View>
//       )}
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#131313",
//   },
// });


//NLP MOdel
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import {
//   Alert,
//   Image,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { scale, verticalScale } from "react-native-size-matters";
// import AntDesign from "@expo/vector-icons/AntDesign";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { Audio } from "expo-av";
// import LottieView from "lottie-react-native";
// import * as Speech from "expo-speech";

// export default function HomeScreen() {
//   const [text, setText] = useState("");
//   const [isRecording, setIsRecording] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [recording, setRecording] = useState(null);
//   const [AIResponse, setAIResponse] = useState(false);
//   const [AISpeaking, setAISpeaking] = useState(false);
//   const [listeningTimeout, setListeningTimeout] = useState(null);
//   const lottieRef = useRef(null);

//   const getMicrophonePermission = async () => {
//     try {
//       const { granted } = await Audio.requestPermissionsAsync();
//       if (!granted) {
//         Alert.alert("Permission", "Please grant permission to access microphone");
//         return false;
//       }
//       return true;
//     } catch (error) {
//       console.log(error);
//       return false;
//     }
//   };

//   const recordingOptions = {
//     android: {
//       extension: ".wav",
//       outPutFormat: Audio.AndroidOutputFormat.MPEG_4,
//       androidEncoder: Audio.AndroidAudioEncoder.AAC,
//       sampleRate: 44100,
//       numberOfChannels: 2,
//       bitRate: 128000,
//     },
//     ios: {
//       extension: ".wav",
//       audioQuality: Audio.IOSAudioQuality.HIGH,
//       sampleRate: 44100,
//       numberOfChannels: 2,
//       bitRate: 128000,
//       linearPCMBitDepth: 16,
//       linearPCMIsBigEndian: false,
//       linearPCMIsFloat: false,
//     },
//   };

//   const startRecording = async () => {
//     const hasPermission = await getMicrophonePermission();
//     if (!hasPermission) return;

//     try {
//       await Audio.setAudioModeAsync({
//         allowsRecordingIOS: true,
//         playsInSilentModeIOS: true,
//       });
//       setIsRecording(true);

//       // Start recording
//       const { recording } = await Audio.Recording.createAsync(recordingOptions);
//       setRecording(recording);

//       // Assistant greeting
//       speakText("How may I help you?");

//       // Set timeout for user response (5 seconds)
//       const timeout = setTimeout(() => {
//         if (isRecording) {
//           stopRecording(true); // Disconnect assistant if no input
//         }
//       }, 10000);
//       setListeningTimeout(timeout);
//     } catch (error) {
//       console.log("Failed to start recording", error);
//       Alert.alert("Error", "Failed to start recording");
//     }
//   };

//   const stopRecording = async (silentDisconnect = false) => {
//     try {
//       clearTimeout(listeningTimeout); // Clear timeout

//       if (silentDisconnect) {
//         setIsRecording(false);
//         setAIResponse(false);
//         setText("The assistant was disconnected due to inactivity.");
//         speakText("Disconnecting due to inactivity. Please try again.");
//         return;
//       }

//       setIsRecording(false);
//       setLoading(true);

//       // Stop recording
//       await recording?.stopAndUnloadAsync();
//       await Audio.setAudioModeAsync({
//         allowsRecordingIOS: false,
//       });

//       const uri = recording?.getURI();
//       const transcript = await processAudio(uri);

//       setText(transcript);
//       await handleNLPResponse(transcript);
//     } catch (error) {
//       console.log("Failed to stop recording", error);
//       Alert.alert("Error", "Failed to stop recording");
//     }
//   };

//   const processAudio = async (uri) => {
//     // Simulate processing audio and generating text
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve("Simulated transcription: What is the weather today?");
//       }, 2000); // Simulate processing delay
//     });
//   };

//   const handleNLPResponse = async (userInput) => {
//     try {
//       // Simulated NLP logic: Generate a response based on the userInput
//       let response = "I didn't quite understand that. Could you repeat?";
//       if (userInput.toLowerCase().includes("weather")) {
//         response = "The weather today is sunny with a high of 25°C.";
//       } else if (userInput.toLowerCase().includes("time")) {
//         response = `The current time is ${new Date().toLocaleTimeString()}.`;
//       } else if (userInput.toLowerCase().includes("help")) {
//         response = "Sure, how can I assist you today?";
//       }

//       setText(response);
//       setLoading(false);
//       setAIResponse(true);

//       await speakText(response);
//     } catch (error) {
//       console.log("Error handling NLP response", error);
//     }
//   };

//   const speakText = async (text) => {
//     setAISpeaking(true);
//     const options = {
//       language: "en-US",
//       pitch: 1.0,
//       rate: 1.0,
//       onDone: () => {
//         setAISpeaking(false);
//       },
//     };
//     Speech.speak(text, options);
//   };

//   useEffect(() => {
//     if (AISpeaking) {
//       lottieRef.current?.play();
//     } else {
//       lottieRef.current?.reset();
//     }
//   }, [AISpeaking]);

//   return (
//     <LinearGradient colors={["#250152", "#000"]} style={styles.container}>
//       <StatusBar barStyle="light-content" />

//       {/* Back Arrow */}
//       {AIResponse && (
//         <TouchableOpacity
//           style={{ position: "absolute", top: verticalScale(50), left: scale(20) }}
//           onPress={() => {
//             setIsRecording(false);
//             setAIResponse(false);
//             setText("");
//           }}
//         >
//           <AntDesign name="arrowleft" size={scale(20)} color="#fff" />
//         </TouchableOpacity>
//       )}

//       {/* Recording / Speaking Animation */}
//       <View style={{ marginTop: verticalScale(-40) }}>
//         {!isRecording ? (
//           <TouchableOpacity
//             style={styles.microphoneButton}
//             onPress={startRecording}
//           >
//             <FontAwesome name="microphone" size={scale(50)} color="#2b3356" />
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity onPress={() => stopRecording(false)}>
//             <LottieView
//               source={require("../../assets/animations/animation.json")}
//               autoPlay
//               loop
//               style={{ width: scale(250), height: scale(250) }}
//             />
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* AI Response Text */}
//       <View style={styles.textContainer}>
//         <Text style={styles.responseText}>
//           {loading ? "Processing..." : text || "Press the microphone to start recording!"}
//         </Text>
//       </View>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#131313",
//   },
//   microphoneButton: {
//     width: scale(110),
//     height: scale(110),
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: scale(100),
//   },
//   textContainer: {
//     alignItems: "center",
//     width: scale(350),
//     position: "absolute",
//     bottom: verticalScale(90),
//   },
//   responseText: {
//     color: "#fff",
//     fontSize: scale(16),
//     textAlign: "center",
//     lineHeight: 25,
//   },
// });


// import React, { useCallback, useEffect, useRef, useState } from "react";
// import {
//   Alert,
//   Image,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { scale, verticalScale } from "react-native-size-matters";
// import AntDesign from "@expo/vector-icons/AntDesign";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { Audio } from "expo-av";
// import axios from "axios";
// import LottieView from "lottie-react-native";
// import * as Speech from "expo-speech";
// import Regenerate from "../../assets/svgs/regenerate";
// import Reload from "../../assets/svgs/reload";

// // Simulated NLP function (replace this with actual NLP logic or API)
// const processNLPResponse = (userInput) => {
//   // Simple simulated response logic, replace with real NLP processing
//   if (userInput.toLowerCase().includes("help")) {
//     return "Sure! I can assist you with various tasks. What do you need help with?";
//   } else if (userInput.toLowerCase().includes("hello")) {
//     return "Hi there! How can I assist you today?";
//   } else {
//     return "I'm not sure what you're asking. Could you please clarify?";
//   }
// };

// export default function HomeScreen() {
//   const [text, setText] = useState("");
//   const [isRecording, setIsRecording] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [recording, setRecording] = useState(null);
//   const [AIResponse, setAIResponse] = useState(false);
//   const [AISpeaking, setAISpeaking] = useState(false);
//   const lottieRef = useRef(null);

//   const getMicrophonePermission = async () => {
//     try {
//       const { granted } = await Audio.requestPermissionsAsync();
//       if (!granted) {
//         Alert.alert("Permission", "Please grant permission to access microphone");
//         return false;
//       }
//       return true;
//     } catch (error) {
//       console.log(error);
//       return false;
//     }
//   };

//   const recordingOptions = {
//     android: {
//       extension: ".wav",
//       outPutFormat: Audio.AndroidOutputFormat.MPEG_4,
//       androidEncoder: Audio.AndroidAudioEncoder.AAC,
//       sampleRate: 44100,
//       numberOfChannels: 2,
//       bitRate: 128000,
//     },
//     ios: {
//       extension: ".wav",
//       audioQuality: Audio.IOSAudioQuality.HIGH,
//       sampleRate: 44100,
//       numberOfChannels: 2,
//       bitRate: 128000,
//       linearPCMBitDepth: 16,
//       linearPCMIsBigEndian: false,
//       linearPCMIsFloat: false,
//     },
//   };

//   const startRecording = async () => {
//     const hasPermission = await getMicrophonePermission();
//     if (!hasPermission) return;

//     try {
//       await Audio.setAudioModeAsync({
//         allowsRecordingIOS: true,
//         playsInSilentModeIOS: true,
//       });
//       setIsRecording(true);
//       const { recording } = await Audio.Recording.createAsync(recordingOptions);
//       setRecording(recording);
//     } catch (error) {
//       console.log("Failed to start Recording", error);
//       Alert.alert("Error", "Failed to start recording");
//     }
//   };

//   const stopRecording = async () => {
//     try {
//       setIsRecording(false);
//       setLoading(true);
//       await recording?.stopAndUnloadAsync();
//       await Audio.setAudioModeAsync({
//         allowsRecordingIOS: false,
//       });

//       const uri = recording?.getURI();
//       const transcript = await sendAudioToWhisper(uri);

//       setText(transcript);
//       const nlpResponse = processNLPResponse(transcript);  // Process the NLP response
//       setText(nlpResponse);
//       setLoading(false);
//       setAIResponse(true);
//       await speakText(nlpResponse);
//     } catch (error) {
//       console.log("Failed to stop Recording", error);
//       Alert.alert("Error", "Failed to stop recording");
//     }
//   };

//   const sendAudioToWhisper = async (uri) => {
//     try {
//       const formData = new FormData();
//       formData.append("file", {
//         uri,
//         type: "audio/wav",
//         name: "recording.wav",
//       });
//       formData.append("model", "whisper-1");

//       const response = await axios.post(
//         "https://api.openai.com/v1/audio/transcriptions",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       return response.data.text;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const speakText = async (text) => {
//     setAISpeaking(true);
//     const options = {
//       language: "en-US",
//       pitch: 1.5,
//       rate: 1,
//       onDone: () => {
//         setAISpeaking(false);
//       },
//     };
//     Speech.speak(text, options);
//   };

//   useEffect(() => {
//     // Play initial greeting message when the screen loads
//     const greetingMessage = "Hi, I am your assistant. How may I help you?";
//     Speech.speak(greetingMessage, {
//       language: "en-US",
//       pitch: 1.5,
//       rate: 1,
//     });
//   }, []);

//   useEffect(() => {
//     if (AISpeaking) {
//       lottieRef.current?.play();
//     } else {
//       lottieRef.current?.reset();
//     }
//   }, [AISpeaking]);

//   return (
//     <LinearGradient colors={["#250152", "#000"]} style={styles.container}>
//       <StatusBar barStyle="light-content" />

//       {/* Back Shadows */}
//       <Image
//         source={require("../../assets/main/blur.png")}
//         style={{
//           position: "absolute",
//           right: scale(-15),
//           top: 0,
//           width: scale(240),
//         }}
//       />
//       <Image
//         source={require("../../assets/main/purple-blur.png")}
//         style={{
//           position: "absolute",
//           left: scale(-15),
//           bottom: verticalScale(100),
//           width: scale(210),
//         }}
//       />

//       {/* Back Arrow */}
//       {AIResponse && (
//         <TouchableOpacity
//           style={{ position: "absolute", top: verticalScale(50), left: scale(20) }}
//           onPress={() => {
//             setIsRecording(false);
//             setAIResponse(false);
//             setText("");
//           }}
//         >
//           <AntDesign name="arrowleft" size={scale(20)} color="#fff" />
//         </TouchableOpacity>
//       )}

//       <View style={{ marginTop: verticalScale(-40) }}>
//         {loading ? (
//           <LottieView
//             source={require("../../assets/animations/loading.json")}
//             autoPlay
//             loop
//             speed={1.3}
//             style={{ width: scale(270), height: scale(270) }}
//           />
//         ) : !isRecording ? (
//           AIResponse ? (
//             <LottieView
//               ref={lottieRef}
//               source={require("../../assets/animations/ai-speaking.json")}
//               autoPlay={false}
//               loop={false}
//               style={{ width: scale(250), height: scale(250) }}
//             />
//           ) : (
//             <TouchableOpacity
//               style={{
//                 width: scale(110),
//                 height: scale(110),
//                 backgroundColor: "#fff",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 borderRadius: scale(100),
//               }}
//               onPress={startRecording}
//             >
//               <FontAwesome name="microphone" size={scale(50)} color="#2b3356" />
//             </TouchableOpacity>
//           )
//         ) : (
//           <TouchableOpacity onPress={stopRecording}>
//             <LottieView
//               source={require("../../assets/animations/animation.json")}
//               autoPlay
//               loop
//               speed={1.3}
//               style={{ width: scale(250), height: scale(250) }}
//             />
//           </TouchableOpacity>
//         )}
//       </View>

//       <View
//         style={{
//           alignItems: "center",
//           width: scale(350),
//           position: "absolute",
//           bottom: verticalScale(90),
//         }}
//       >
//         <Text
//           style={{
//             color: "#fff",
//             fontSize: scale(16),
//             textAlign: "center",
//             lineHeight: 25,
//           }}
//         >
//           {loading ? "..." : text || "Press the microphone to start recording!"}
//         </Text>
//       </View>

//       {AIResponse && (
//         <View
//           style={{
//             position: "absolute",
//             bottom: verticalScale(40),
//             left: 0,
//             flexDirection: "row",
//             justifyContent: "space-between",
//             alignItems: "center",
//             width: scale(360),
//             paddingHorizontal: scale(30),
//           }}
//         >
//           <TouchableOpacity onPress={() => setText("Reset response here.")}>
//             <Regenerate />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => speakText(text)}>
//             <Reload />
//           </TouchableOpacity>
//         </View>
//       )}
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#131313",
//   },
// });


// //Working
// import React, { useEffect, useRef, useState } from "react";
// import {
//   Alert,
//   Image,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { scale, verticalScale } from "react-native-size-matters";
// import AntDesign from "@expo/vector-icons/AntDesign";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { Audio } from "expo-av";
// import LottieView from "lottie-react-native";
// import * as Speech from "expo-speech";
// import Regenerate from "../../assets/svgs/regenerate";
// import Reload from "../../assets/svgs/reload";

// export default function HomeScreen() {
//   const [text, setText] = useState("");
//   const [isRecording, setIsRecording] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [recording, setRecording] = useState(null);
//   const [AIResponse, setAIResponse] = useState(false);
//   const [AISpeaking, setAISpeaking] = useState(false);
//   const lottieRef = useRef(null);
//   const recordingTimeoutRef = useRef(null);

  

//   // Predefined NLP Model Responses
//   const responses = {
//     hello: "ہیلو! میں آپ کی کس طرح مدد کر سکتی ہوں؟",
//     "how are you": "I'm just a program, but I'm here to help you!",
//     "what is your name": "I am SkillBazaar, your friendly assistant.",
//     default: "I'm sorry, I didn't understand that. Can you please repeat?",
//   };

//   const getMicrophonePermission = async () => {
//     try {
//       const { granted } = await Audio.requestPermissionsAsync();
//       if (!granted) {
//         Alert.alert("Permission", "Please grant permission to access the microphone");
//         return false;
//       }
//       return true;
//     } catch (error) {
//       console.log(error);
//       return false;
//     }
//   };

//   const recordingOptions = {
//     android: {
//       extension: ".wav",
//       outPutFormat: Audio.AndroidOutputFormat.MPEG_4,
//       androidEncoder: Audio.AndroidAudioEncoder.AAC,
//       sampleRate: 44100,
//       numberOfChannels: 2,
//       bitRate: 128000,
//     },
//     ios: {
//       extension: ".wav",
//       audioQuality: Audio.IOSAudioQuality.HIGH,
//       sampleRate: 44100,
//       numberOfChannels: 2,
//       bitRate: 128000,
//       linearPCMBitDepth: 16,
//       linearPCMIsBigEndian: false,
//       linearPCMIsFloat: false,
//     },
//   };

//   const startRecording = async () => {
//     const hasPermission = await getMicrophonePermission();
//     if (!hasPermission) return;

//     try {
//       await Audio.setAudioModeAsync({
//         allowsRecordingIOS: true,
//         playsInSilentModeIOS: true,
//       });
//       setIsRecording(true);
//       const { recording } = await Audio.Recording.createAsync(recordingOptions);
//       setRecording(recording);

//       // Start a timeout for inactivity
//       recordingTimeoutRef.current = setTimeout(() => {
//         stopRecording(true); // Stop recording with timeout message
//       }, 7000);
//     } catch (error) {
//       console.log("Failed to start Recording", error);
//       Alert.alert("Error", "Failed to start recording");
//     }
//   };

//   const stopRecording = async (timeout = false) => {
//     try {
//       clearTimeout(recordingTimeoutRef.current); // Clear any ongoing timeout
//       setIsRecording(false);
//       setLoading(true);

//       if (!timeout) {
//         await recording?.stopAndUnloadAsync();
//         await Audio.setAudioModeAsync({
//           allowsRecordingIOS: false,
//         });

//         const uri = recording?.getURI();
//         const transcript = await fakeTranscription(uri); // Simulating transcription
//         const response = getNLPResponse(transcript);

//         setText(transcript);
//         await speakText(response);
//       } else {
//         await speakText(
//           "You were inactive for too long. Please press the microphone to start again."
//         );
//         resetState();
//       }
//     } catch (error) {
//       console.log("Failed to stop Recording", error);
//       Alert.alert("Error", "Failed to stop recording");
//     }
//   };

//   const fakeTranscription = async (uri) => {
//     // Simulated transcription logic
//     // Replace with actual transcription logic if available
//     return "hello"; // Placeholder transcription
//   };

//   const getNLPResponse = (input) => {
//     const normalizedInput = input.toLowerCase();
//     return responses[normalizedInput] || responses.default;
//   };

//   const speakText = async (text) => {
//     setAISpeaking(true);
//     const options = {
//       language: "en-US",
//       pitch: 1.5,
//       rate: 1,
//       onDone: () => {
//         setAISpeaking(false);
//         setLoading(false);
//         setAIResponse(true);
//       },
//     };
//     Speech.speak(text, options);
//   };

//   const resetState = () => {
//     setAIResponse(false);
//     setText("");
//     setLoading(false);
//     setAISpeaking(false);
//   };

//   useEffect(() => {
//     speakText("Hi, I am your assistant. How may I help you?");
//   }, []);

//   useEffect(() => {
//     if (AISpeaking) {
//       lottieRef.current?.play();
//     } else {
//       lottieRef.current?.reset();
//     }
//   }, [AISpeaking]);

//   return (
//     <LinearGradient colors={["#250152", "#000"]} style={styles.container}>
//       <StatusBar barStyle="light-content" />

//       {/* Back Shadows */}
//       <Image
//         source={require("../../assets/main/blur.png")}
//         style={{
//           position: "absolute",
//           right: scale(-15),
//           top: 0,
//           width: scale(240),
//         }}
//       />
//       <Image
//         source={require("../../assets/main/purple-blur.png")}
//         style={{
//           position: "absolute",
//           left: scale(-15),
//           bottom: verticalScale(100),
//           width: scale(210),
//         }}
//       />

//       {/* Back Arrow */}
//       {AIResponse && (
//         <TouchableOpacity
//           style={{ position: "absolute", top: verticalScale(50), left: scale(20) }}
//           onPress={resetState}
//         >
//           <AntDesign name="arrowleft" size={scale(20)} color="#fff" />
//         </TouchableOpacity>
//       )}

//       <View style={{ marginTop: verticalScale(-40) }}>
//         {loading ? (
//           <LottieView
//             source={require("../../assets/animations/loading.json")}
//             autoPlay
//             loop
//             speed={1.3}
//             style={{ width: scale(270), height: scale(270) }}
//           />
//         ) : !isRecording ? (
//           AIResponse ? (
//             <LottieView
//               ref={lottieRef}
//               source={require("../../assets/animations/ai-speaking.json")}
//               autoPlay={false}
//               loop={false}
//               style={{ width: scale(250), height: scale(250) }}
//             />
//           ) : (
//             <TouchableOpacity
//               style={{
//                 width: scale(110),
//                 height: scale(110),
//                 backgroundColor: "#fff",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 borderRadius: scale(100),
//               }}
//               onPress={startRecording}
//             >
//               <FontAwesome name="microphone" size={scale(50)} color="#2b3356" />
//             </TouchableOpacity>
//           )
//         ) : (
//           <TouchableOpacity onPress={() => stopRecording()}>
//             <LottieView
//               source={require("../../assets/animations/animation.json")}
//               autoPlay
//               loop
//               speed={1.3}
//               style={{ width: scale(250), height: scale(250) }}
//             />
//           </TouchableOpacity>
//         )}
//       </View>

//       <View
//         style={{
//           alignItems: "center",
//           width: scale(350),
//           position: "absolute",
//           bottom: verticalScale(90),
//         }}
//       >
//         <Text
//           style={{
//             color: "#fff",
//             fontSize: scale(16),
//             textAlign: "center",
//             lineHeight: 25,
//           }}
//         >
//           {loading ? "..." : text || "Press the microphone to start recording!"}
//         </Text>
//       </View>

//       {AIResponse && (
//         <View
//           style={{
//             position: "absolute",
//             bottom: verticalScale(40),
//             left: 0,
//             flexDirection: "row",
//             justifyContent: "space-between",
//             alignItems: "center",
//             width: scale(360),
//             paddingHorizontal: scale(30),
//           }}
//         >
//           <TouchableOpacity onPress={() => speakText(getNLPResponse(text))}>
//             <Regenerate />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => speakText(text)}>
//             <Reload />
//           </TouchableOpacity>
//         </View>
//       )}
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#131313",
//   },
// });




import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { scale, verticalScale } from "react-native-size-matters";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Audio } from "expo-av";
import * as FileSystem from 'expo-file-system';
import LottieView from "lottie-react-native";
import * as Speech from "expo-speech";
import Regenerate from "../../assets/svgs/regenerate";
import Reload from "../../assets/svgs/reload";
import axios from "axios";


export default function HomeScreen() {
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(null);
  const [AIResponse, setAIResponse] = useState(false);
  const [AISpeaking, setAISpeaking] = useState(false);
  const lottieRef = useRef(null);
  const recordingTimeoutRef = useRef(null);

  const CLOUD_API_KEY = ''; // Replace with your API key


  const getMicrophonePermission = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        Alert.alert("Permission", "Please grant permission to access the microphone");
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const recordingOptions = {
    android: {
      extension: ".wav",
      outPutFormat: Audio.AndroidOutputFormat.MPEG_4,
      androidEncoder: Audio.AndroidAudioEncoder.AAC,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
    },
    ios: {
      extension: ".wav",
      audioQuality: Audio.IOSAudioQuality.HIGH,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
  };

  const startRecording = async () => {
    const hasPermission = await getMicrophonePermission();
    if (!hasPermission) return;

    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      setIsRecording(true);
      const { recording } = await Audio.Recording.createAsync(recordingOptions);
      setRecording(recording);

      // Start a timeout for inactivity
      recordingTimeoutRef.current = setTimeout(() => {
        stopRecording(true); // Stop recording with timeout message
      }, 7000);
    } catch (error) {
      console.log("Failed to start Recording", error);
      Alert.alert("Error", "Failed to start recording");
    }
  };

const stopRecording = async (timeout = false) => {
  try {
    clearTimeout(recordingTimeoutRef.current);
    setIsRecording(false);
    setLoading(true);

    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log("Recorded Audio URI:", uri);

      if (!timeout) {
        await processAudio(uri); // Process recorded audio for transcription
      } else {
        await speakText(
          "You were inactive for too long. Please press the microphone to start again."
        );
        resetState();
      }
    }
  } catch (error) {
    console.log("Failed to stop Recording", error);
    Alert.alert("Error", "Failed to stop recording");
  }
};

const processAudio = async (audioUri) => {
  try {
    console.log("Processing audio at URI:", audioUri);

    // Read file as Base64
    const audioData = await FileSystem.readAsStringAsync(audioUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const requestPayload = {
      audio: {
        content: audioData,
      },
      config: {
        encoding: "MP3",
        sampleRateHertz: 16000,
        languageCode: "en-US",
      },
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
    console.log("Transcription result:", result);

    if (result.results && result.results[0]?.alternatives?.[0]?.transcript) {
      const transcript = result.results[0].alternatives[0].transcript;
      setText(transcript);
      console.log("Transcribed Text:", transcript);

      // Fetch AI response from Gradio API
      const aiResponse = await fetchAIResponse(transcript);
      console.log("AI Response:", aiResponse);

      // Speak the AI response
      await speakText(aiResponse);
    } else {
      Alert.alert("Transcription Failed", "No transcription found.");
      setLoading(false);
    }
  } catch (error) {
    console.error("Error during audio processing:", error);
    setLoading(false);
  }
};

// const fetchAIResponse = async (text) => {
//   try {
//     const response = await fetch("http://192.168.100.236:5000/predict", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ query: text }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const result = await response.json();
//     console.log("AI Response:", result);

//     const aiResponseText = result?.response || "معذرت! میں اس سوال کا جواب دینے سے قاصر ہوں۔";

//     // Ensure AI response is spoken immediately
//     speakText(aiResponseText);

//     return aiResponseText;
//   } catch (error) {
//     console.error("Error fetching AI response:", error);
//     return "معذرت! میں اس سوال کا جواب دینے سے قاصر ہوں۔";
//   }
// };

const fetchAIResponse = async (text) => {
  try {
   // const response = await fetch("http://192.168.100.236:5000/predict",
   //   const response = await fetch("http://172.17.173.34:5000/predict",
        //const response = await fetch("http://192.168.100.178:5000/predict",
         // const response = await fetch("http://172.16.22.200:5000/predict",   
            const response = await fetch("http://172.17.40.107:5000/predict", 
           {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: text }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("AI Response:", result);

    // Extract AI response correctly (assuming it's an array)
    const aiResponseText = result?.response?.[0] || "معذرت! میں اس سوال کا جواب دینے سے قاصر ہوں۔";

    // Speak the AI response
    await speakText(aiResponseText);

    return aiResponseText;
  } catch (error) {
    console.log("Error fetching AI response:", error);
    return "معذرت! میں اس سوال کا جواب دینے سے قاصر ہوں۔";
  }
};

const speakText = async (text) => {
  try {
    setAISpeaking(true);
    setLoading(false); // Ensure loading stops before speaking
    
    const options = {
      language: "ur-PK",
      pitch: 1.5,
      rate: 1,
      onDone: () => {
        setAISpeaking(false);
        setAIResponse(true);
      },
    };

    await Speech.speak(text, options);
  } catch (error) {
    console.error("Speech error:", error);
    setAISpeaking(false);
    setLoading(false);
  }
};


  const resetState = () => {
    setAIResponse(false);
    setText("");
    setLoading(false);
    setAISpeaking(false);
  };

  useEffect(() => {
    speakText("Hi, I am your assistant. How may I help you?");
  }, []);

  useEffect(() => {
    if (AISpeaking) {
      lottieRef.current?.play();
    } else {
      lottieRef.current?.reset();
    }
  }, [AISpeaking]);

  return (
    <LinearGradient colors={["#250152", "#000"]} style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Back Shadows */}
      <Image
        source={require("../../assets/main/blur.png")}
        style={{
          position: "absolute",
          right: scale(-15),
          top: 0,
          width: scale(240),
        }}
      />
      <Image
        source={require("../../assets/main/purple-blur.png")}
        style={{
          position: "absolute",
          left: scale(-15),
          bottom: verticalScale(100),
          width: scale(210),
        }}
      />

      {/* Back Arrow */}
      {AIResponse && (
        <TouchableOpacity
          style={{ position: "absolute", top: verticalScale(50), left: scale(20) }}
          onPress={resetState}
        >
          <AntDesign name="arrowleft" size={scale(20)} color="#fff" />
        </TouchableOpacity>
      )}

      <View style={{ marginTop: verticalScale(-40) }}>
        {loading ? (
          <LottieView
            source={require("../../assets/animations/loading.json")}
            autoPlay
            loop
            speed={1.3}
            style={{ width: scale(270), height: scale(270) }}
          />
        ) : !isRecording ? (
          AIResponse ? (
            <LottieView
              ref={lottieRef}
              source={require("../../assets/animations/ai-speaking.json")}
              autoPlay={false}
              loop={false}
              style={{ width: scale(250), height: scale(250) }}
            />
          ) : (
            <TouchableOpacity
              style={{
                width: scale(110),
                height: scale(110),
                backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: scale(100),
              }}
              onPress={startRecording}
            >
              <FontAwesome name="microphone" size={scale(50)} color="#2b3356" />
            </TouchableOpacity>
          )
        ) : (
          <TouchableOpacity onPress={() => stopRecording()}>
            <LottieView
              source={require("../../assets/animations/animation.json")}
              autoPlay
              loop
              speed={1.3}
              style={{ width: scale(250), height: scale(250) }}
            />
          </TouchableOpacity>
        )}
      </View>

      <View
        style={{
          alignItems: "center",
          width: scale(350),
          position: "absolute",
          bottom: verticalScale(90),
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: scale(16),
            textAlign: "center",
            lineHeight: 25,
          }}
        >
          {loading ? "..." : text || "Press the microphone to start recording!"}
        </Text>
      </View>

      {AIResponse && (
        <View
          style={{
            position: "absolute",
            bottom: verticalScale(40),
            left: 0,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: scale(360),
            paddingHorizontal: scale(30),
          }}
        >
          <TouchableOpacity onPress={async () => {
            try {
                const response = await fetchAIResponse(text); // Ensure this function calls your AI API
                speakText(response); // Use the API response for text-to-speech
              } catch (error) {
                console.error("Error fetching AI response:", error);
              }
            }}>
            <Regenerate />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => speakText(text)}>
            <Reload />
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#131313",
  },
});
