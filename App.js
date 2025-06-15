
// import './services/i18n'; // Import the i18n setup
// import React, { useState, useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { StatusBar } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import useVoiceCommand from './hooks/useVoiceCommand';

// //import i18n, { loadLanguage } from './i18n'; // Import your `i18n` configuration
// import LoadingScreen from './app/Screens/LoadingScreen';
// import WelcomeScreen from './app/Screens/WelcomeScreen';
// import LoginScreen from './app/Screens/LoginScreen';
// import EmployeeHome from './app/Screens/EmployeeHome';
// import EmployerHome from './app/Screens/EmployerHome';
// import JobDescription from './app/Screens/JobDescription';
// import EmployeeProfileSet from './app/Screens/EmployeeProfileSet';
// import EmployerProfileSet from './app/Screens/EmployerProfileSet';
// import EmployeeProfile from './app/Screens/EmployeeProfile';
// import CreateProfileStep1 from './app/Screens/CreateProfileStep1';
// import CreateProfileStep2 from './app/Screens/CreateProfileStep2';
// import CreateProfileStep3 from './app/Screens/CreateProfileStep3';
// import CreateProfileStep4 from './app/Screens/CreateProfileStep4';
// import CreateProfileStep5 from './app/Screens/CreateProfileStep5';
// import CreateProfileStep6 from './app/Screens/CreateProfileStep6';
// import ServicePostingDetails from './app/Screens/ServicePostingDetails';
// import Bot from './app/Screens/Bot';

// const Stack = createNativeStackNavigator();

// function App() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [initialRoute, setInitialRoute] = useState("Loading"); // Default to "Loading" screen

//   useEffect(() => {
//     const checkLoginState = async () => {
//       try {
//         const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
//         const userType = await AsyncStorage.getItem("userType");

//         if (isLoggedIn === "true" && userType) {
//           // Redirect based on user type
//           if (userType === "employee") {
//             setInitialRoute("EmployeeHome");
//           } else if (userType === "employer") {
//             setInitialRoute("EmployerHome");
//           } else {
//             setInitialRoute("Login");
//           }
//         } else {
//           setInitialRoute("Loading");
//         }
//       } catch (error) {
//         console.error("Error checking login state:", error);
//         setInitialRoute("Welcome");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkLoginState();
//   }, []);

//   if (isLoading) {
//     return null; // Optional: Show a splash screen or loading indicator
//   }

//   return (
//     <>
//       <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName={initialRoute}>
//           {/* Loading Screen */}
//           <Stack.Screen
//             name="Loading"
//             component={LoadingScreen}
//             options={{ headerShown: false }}
//           />

//           {/* Welcome Screen */}
//           <Stack.Screen
//             name="Welcome"
//             component={WelcomeScreen}
//             options={{ headerShown: false }}
//           />

//           {/* Login Screen */}
//           <Stack.Screen
//             name="Login"
//             component={LoginScreen}
//             options={{ headerShown: true }}
//           />

//           {/* Employee Home */}
//           <Stack.Screen
//             name="EmployeeHome"
//             component={EmployeeHome}
//             options={{ headerShown: false }}
//           />

//           <Stack.Screen 
//             name="EmployeeProfileSet" 
//             component={EmployeeProfileSet} 
//           />
//           <Stack.Screen 
//             name="EmployerProfileSet" 
//             component={EmployerProfileSet} 
//           />

//           <Stack.Screen 
//             name="EmployeeProfile" 
//             component={EmployeeProfile}
//             options={{ headerShown: true }} 
//           />

//           <Stack.Screen 
//             name="Bot" 
//             component={Bot}
//             options={{ headerShown: false }} 
//           />


//           {/* Employer Home */}
//           <Stack.Screen
//             name="EmployerHome"
//             component={EmployerHome}
//             options={{ headerShown: false }}
//           />

//           {/* ServicePostingDetails */}
//           <Stack.Screen
//             name="ServicePostingDetails"
//             component={ServicePostingDetails}
//             options={{ headerShown: true }}
//           />

//           {/* JobDescription */}
//           <Stack.Screen 
//             name="JobDescription" 
//             component={JobDescription} 
//             options={{ headerShown: true }} 
//           />

//           {/* Create profile step 1 */}
//           <Stack.Screen
//             name="Profile1"
//             component={CreateProfileStep1}
//             options={{ headerShown: true }}
//           />

//           {/* Create profile step 2 */}
//           <Stack.Screen
//             name="CreateProfileStep2"
//             component={CreateProfileStep2}
//             options={{ headerShown: true }}
//           />

//           {/* Create profile step 3 */}
//           <Stack.Screen
//             name="CreateProfileStep3"
//             component={CreateProfileStep3}
//             options={{ headerShown: true }}
//           />

//           {/* Create profile step 4 */}
//           <Stack.Screen
//             name="CreateProfileStep4"
//             component={CreateProfileStep4}
//             options={{ headerShown: true }}
//           />

//           {/* Create profile step 5 */}
//           <Stack.Screen
//             name="CreateProfileStep5"
//             component={CreateProfileStep5}
//             options={{ headerShown: true }}
//           />

//           {/* Create profile step 6 */}
//           <Stack.Screen
//             name="CreateProfileStep6"
//             component={CreateProfileStep6}
//             options={{ headerShown: true }}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </>
//   );
// }

// export default App;




// import "./services/i18n"; // Import the i18n setup
// import React, { useState, useEffect } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { StatusBar, View, Button } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// import useVoiceCommand from "./hooks/useVoiceCommand";

// import LoadingScreen from "./app/Screens/LoadingScreen";
// import WelcomeScreen from "./app/Screens/WelcomeScreen";
// import LoginScreen from "./app/Screens/LoginScreen";
// import EmployeeHome from "./app/Screens/EmployeeHome";
// import EmployerHome from "./app/Screens/EmployerHome";
// import JobDescription from "./app/Screens/JobDescription";
// import EmployeeProfileSet from "./app/Screens/EmployeeProfileSet";
// import EmployerProfileSet from "./app/Screens/EmployerProfileSet";
// import EmployeeProfile from "./app/Screens/EmployeeProfile";
// import EmployerProfile from "./app/Screens/EmployerProfile";
// import CreateProfileStep1 from "./app/Screens/CreateProfileStep1";
// import CreateProfileStep2 from "./app/Screens/CreateProfileStep2";
// import CreateProfileStep3 from "./app/Screens/CreateProfileStep3";
// import CreateProfileStep4 from "./app/Screens/CreateProfileStep4";
// import CreateProfileStep5 from "./app/Screens/CreateProfileStep5";
// import CreateProfileStep6 from "./app/Screens/CreateProfileStep6";
// import ServicePostingDetails from "./app/Screens/ServicePostingDetails";
// import CategoryDescription from "./app/Screens/CategoryDescription";
// import Bot from "./app/Screens/Bot";
// import AllJobsScreen from "./app/Screens/AllJobsScreen";
// import JobDescriptionScreen from './app/Screens/JobDescriptionScreen';
// import JobApplicantsScreen from './app/Screens/JobApplicantsScreen.jsx';
// import AllJobsListScreen from './app/Screens/showalljobsscreen.jsx';
// import ChatScreen from './app/Screens/ChatScreen.jsx';


// import UserJobScreen from './app/Screens/UserJobsScreen.jsx';

// import FavouriteJobsScreen from './app/Screens/FavouriteJobsScreen.jsx';

// import EmployeesScreen from './app/Screens/EmployeesScreen.jsx';

// import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
// import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
// import { Ionicons } from "@expo/vector-icons"; // For mic icon


// const Stack = createNativeStackNavigator();

// function VoiceControl() {
//   const { startRecording, stopRecording, isRecording } = useVoiceCommand(); // Now inside NavigationContainer

//   return (
//     <View style={{ position: "absolute", top: 210, right: 15, zIndex: 10 }}>
//       <Button
//         title={isRecording ? "Stop Listening" : "Start Listening"}
//         onPress={isRecording ? stopRecording : startRecording}
//       />
//     </View>
//   );
// }

// function AppNavigator() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [initialRoute, setInitialRoute] = useState("Loading"); // Default to "Loading" screen

//   useEffect(() => {
//     const checkLoginState = async () => {
//       try {
//         const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
//         const userType = await AsyncStorage.getItem("userType");

//         if (isLoggedIn === "true" && userType) {
//           if (userType === "employee") {
//             setInitialRoute("EmployeeHome");
//           } else if (userType === "employer") {
//             setInitialRoute("EmployerHome");
//           } else {
//             setInitialRoute("Login");
//           }
//         } else {
//           setInitialRoute("Welcome");
//         }
//       } catch (error) {
//         console.error("Error checking login state:", error);
//         setInitialRoute("Welcome");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     checkLoginState();
//   }, []);

//   if (isLoading) {
//     return null; // Optional: Show a splash screen or loading indicator
//   }

//   return (
//     <>
//       <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
//       <NavigationContainer>
//         <VoiceControl />
//         <Stack.Navigator initialRouteName={initialRoute}>
//           <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
//           <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
//           <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true }} />
//           <Stack.Screen name="EmployeeHome" component={EmployeeHome} options={{ headerShown: false }} />
//           <Stack.Screen name="EmployeeProfileSet" component={EmployeeProfileSet} />
//           <Stack.Screen name="EmployerProfileSet" component={EmployerProfileSet} />
//           <Stack.Screen name="EmployeeProfile" component={EmployeeProfile} options={{ headerShown: true }} />
//           <Stack.Screen name="EmployerProfile" component={EmployeeProfile} options={{ headerShown: true }} />

//           <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: true }} />

//           <Stack.Screen name="Bot" component={Bot} options={{ headerShown: false }} />
//           <Stack.Screen name="EmployerHome" component={EmployerHome} options={{ headerShown: false }} />
//           <Stack.Screen name="ServicePostingDetails" component={ServicePostingDetails} options={{ headerShown: true }} />
//           <Stack.Screen name="JobDescription" component={JobDescription} options={{ headerShown: true }} />
//           <Stack.Screen name="JobDescriptionScreen" component={JobDescriptionScreen} options={{ headerShown: true }} />

//           <Stack.Screen name="Profile1" component={CreateProfileStep1} options={{ headerShown: true }} />
//           <Stack.Screen name="CreateProfileStep2" component={CreateProfileStep2} options={{ headerShown: true }} />
//           <Stack.Screen name="CreateProfileStep3" component={CreateProfileStep3} options={{ headerShown: true }} />
//           <Stack.Screen name="CreateProfileStep4" component={CreateProfileStep4} options={{ headerShown: true }} />
//           <Stack.Screen name="CreateProfileStep5" component={CreateProfileStep5} options={{ headerShown: true }} />
//           <Stack.Screen name="CreateProfileStep6" component={CreateProfileStep6} options={{ headerShown: true }} />
//           <Stack.Screen name="AllJobsScreen" component={AllJobsScreen} options={{ headerShown: true }} />
//           <Stack.Screen name="CategoryDescription" component={CategoryDescription} options={{ headerShown: true }} />
//           <Stack.Screen name="AllJobsListScreen" component={AllJobsListScreen} />
//           <Stack.Screen name="FavouriteJobsScreen" component={FavouriteJobsScreen} options={{ headerShown: true }} />
//           <Stack.Screen name="JobApplicationScreen" component={JobApplicantsScreen} options={{ headerShown: true }} />


//           <Stack.Screen name="UserJobScreen" component={UserJobScreen} options={{ headerShown: true }} />

//           <Stack.Screen name="EmployeesScreen" component={EmployeesScreen} options={{ headerShown: true }} />



//         </Stack.Navigator>
//       </NavigationContainer>
//     </>
//   );
// }

// export default function App() {
//   return <AppNavigator />;
// }




import "./services/i18n";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar, View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import useVoiceCommand from "./hooks/useVoiceCommand";

import LoadingScreen from "./app/Screens/LoadingScreen";
import WelcomeScreen from "./app/Screens/WelcomeScreen";
import LoginScreen from "./app/Screens/LoginScreen";
import EmployeeHome from "./app/Screens/EmployeeHome";
import EmployerHome from "./app/Screens/EmployerHome";
import JobDescription from "./app/Screens/JobDescription";
import EmployeeProfileSet from "./app/Screens/EmployeeProfileSet";
import EmployerProfileSet from "./app/Screens/EmployerProfileSet";
import EmployeeProfile from "./app/Screens/EmployeeProfile";
import EmployerProfile from "./app/Screens/EmployerProfile";
import CreateProfileStep1 from "./app/Screens/CreateProfileStep1";
import CreateProfileStep2 from "./app/Screens/CreateProfileStep2";
import CreateProfileStep3 from "./app/Screens/CreateProfileStep3";
import CreateProfileStep4 from "./app/Screens/CreateProfileStep4";
import CreateProfileStep5 from "./app/Screens/CreateProfileStep5";
import CreateProfileStep6 from "./app/Screens/CreateProfileStep6";
import ServicePostingDetails from "./app/Screens/ServicePostingDetails";
import CategoryDescription from "./app/Screens/CategoryDescription";
import Bot from "./app/Screens/Bot";
import AllJobsScreen from "./app/Screens/AllJobsScreen";
import JobDescriptionScreen from './app/Screens/JobDescriptionScreen';
import JobApplicantsScreen from './app/Screens/JobApplicantsScreen.jsx';
import AllJobsListScreen from './app/Screens/showalljobsscreen.jsx';
import ChatScreen from './app/Screens/ChatScreen.jsx';
import UserJobScreen from './app/Screens/UserJobsScreen.jsx';
import FavouriteJobsScreen from './app/Screens/FavouriteJobsScreen.jsx';
import EmployeesScreen from './app/Screens/EmployeesScreen.jsx';

import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

function VoiceControl() {
  const { startRecording, stopRecording, isRecording } = useVoiceCommand();

  return (
    <View style={{ position: "absolute", top: 210, right: 15, zIndex: 10 }}>
      <Button
        title={isRecording ? "Stop Listening" : "Start Listening"}
        onPress={isRecording ? stopRecording : startRecording}
      />
    </View>
  );
}

function AppNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("Loading");
  const [showVoiceControl, setShowVoiceControl] = useState(false);

  useEffect(() => {
    const checkLoginState = async () => {
      try {
        const isLoggedInValue = await AsyncStorage.getItem("isLoggedIn");
        const userType = await AsyncStorage.getItem("userType");

        if (isLoggedInValue === "true" && userType) {
          if (userType === "employee") {
            setInitialRoute("EmployeeHome");
          } else if (userType === "employer") {
            setInitialRoute("EmployerHome");
          } else {
            setInitialRoute("Login");
          }
          setShowVoiceControl(false);
        } else {
          setInitialRoute("Welcome");
          setShowVoiceControl(true);
        }
      } catch (error) {
        console.error("Error checking login state:", error);
        setInitialRoute("Welcome");
        setShowVoiceControl(true);
      } finally {
        setIsLoading(false);
      }
    };
    checkLoginState();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <NavigationContainer>
        {showVoiceControl && <VoiceControl />}
        <Stack.Navigator 
          initialRouteName={initialRoute}
          screenListeners={{
            state: (e) => {
              const currentRoute = e.data.state.routes[e.data.state.index].name;
              setShowVoiceControl(
                currentRoute === "Welcome" || 
                currentRoute === "Login" ||
                currentRoute === "Loading"
              );
            }
          }}
        >
          <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true }} />
          <Stack.Screen name="EmployeeHome" component={EmployeeHome} options={{ headerShown: false }} />
          <Stack.Screen name="EmployeeProfileSet" component={EmployeeProfileSet} />
          <Stack.Screen name="EmployerProfileSet" component={EmployerProfileSet} />
          
          <Stack.Screen name="EmployeeProfile" component={EmployeeProfile} options={{ headerShown: true }} />
          <Stack.Screen name="EmployerProfile" component={EmployerProfile} options={{ headerShown: true }} />

          <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: true }} />
          <Stack.Screen name="Bot" component={Bot} options={{ headerShown: false }} />
          <Stack.Screen name="EmployerHome" component={EmployerHome} options={{ headerShown: false }} />
          <Stack.Screen name="ServicePostingDetails" component={ServicePostingDetails} options={{ headerShown: true }} />
          <Stack.Screen name="JobDescription" component={JobDescription} options={{ headerShown: true }} />
          <Stack.Screen name="JobDescriptionScreen" component={JobDescriptionScreen} options={{ headerShown: true }} />
          <Stack.Screen name="Profile1" component={CreateProfileStep1} options={{ headerShown: true }} />
          <Stack.Screen name="CreateProfileStep2" component={CreateProfileStep2} options={{ headerShown: true }} />
          <Stack.Screen name="CreateProfileStep3" component={CreateProfileStep3} options={{ headerShown: true }} />
          <Stack.Screen name="CreateProfileStep4" component={CreateProfileStep4} options={{ headerShown: true }} />
          <Stack.Screen name="CreateProfileStep5" component={CreateProfileStep5} options={{ headerShown: true }} />
          <Stack.Screen name="CreateProfileStep6" component={CreateProfileStep6} options={{ headerShown: true }} />
          <Stack.Screen name="AllJobsScreen" component={AllJobsScreen} options={{ headerShown: true }} />
          <Stack.Screen name="CategoryDescription" component={CategoryDescription} options={{ headerShown: true }} />
          <Stack.Screen name="AllJobsListScreen" component={AllJobsListScreen} />
          <Stack.Screen name="FavouriteJobsScreen" component={FavouriteJobsScreen} options={{ headerShown: true }} />
          <Stack.Screen name="JobApplicationScreen" component={JobApplicantsScreen} options={{ headerShown: true }} />
          <Stack.Screen name="UserJobScreen" component={UserJobScreen} options={{ headerShown: true }} />
          <Stack.Screen name="EmployeesScreen" component={EmployeesScreen} options={{ headerShown: true }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return <AppNavigator />;
}