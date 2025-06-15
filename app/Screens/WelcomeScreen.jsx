
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   Modal,
//   Pressable,
//   Animated,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import { LinearGradient } from "expo-linear-gradient";
// import { Icon } from "react-native-elements";
// import { useTranslation } from "react-i18next";
// import * as Speech from "expo-speech";

// export default function WelcomeScreen({ navigation }) {
//   const { t, i18n } = useTranslation();
//   const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
//   const [modalVisible, setModalVisible] = useState(false);
//   const scale = new Animated.Value(1);

//   useEffect(() => {
//     // Pulse animation
//     const pulse = () => {
//       Animated.loop(
//         Animated.sequence([
//           Animated.timing(scale, {
//             toValue: 1.2,
//             duration: 800,
//             useNativeDriver: true,
//           }),
//           Animated.timing(scale, {
//             toValue: 1,
//             duration: 800,
//             useNativeDriver: true,
//           }),
//         ])
//       ).start();
//     };

//     pulse();
//     return () => {
//       scale.stopAnimation();
//     };
//   }, [scale]);

//   useEffect(() => {
//     // Welcome message
//     Speech.speak(t("welcomeMessage"), { language: selectedLanguage });
//   }, [selectedLanguage]);

//   const handleLanguageChange = (lang) => {
//     setSelectedLanguage(lang);
//     i18n.changeLanguage(lang);
//     Speech.speak(t("languageChanged"), { language: lang });
//   };

//   const openModal = () => {
//     setModalVisible(true);
//     Speech.speak(t("modalSpeechInstruction"), { language: selectedLanguage });
//   };

//   const handleNavigation = (userType) => {
//     const message =
//       userType === "employee"
//         ? t("employeeNavigation")
//         : t("employerNavigation");
//     Speech.speak(message, { language: selectedLanguage });
//     navigation.navigate("Login", { userType });
//   };

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require("../../assets/images/img.webp")}
//         style={styles.backgroundImage}
//       />
//       <LinearGradient
//         colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.9)"]}
//         style={styles.gradientOverlay}
//       />

//       <View style={styles.topBar}>
//         <TouchableOpacity>
//           <Image
//             source={require("../../assets/images/skillbazaar.png")}
//             style={styles.logo}
//           />
//         </TouchableOpacity>
//         <View style={styles.languageSelector}>
//           <Icon name="language" type="material" color="white" size={20} />
//           <Picker
//             selectedValue={selectedLanguage}
//             style={styles.languagePicker}
//             onValueChange={handleLanguageChange}
//           >
//             <Picker.Item label="English" value="en" />
//             <Picker.Item label="Hindi" value="hi" />
//             <Picker.Item label="اردو" value="ur" />
//           </Picker>
//         </View>
//       </View>

//       <View style={styles.content}>
//         <Text style={styles.title}>{t("title")}</Text>
//         <Text style={styles.subtitle}>{t("subtitle")}</Text>
//       </View>

//       <View style={[styles.bottomBar, styles.elevation, styles.shadowProp]}>
//         <Animated.View
//           style={[
//             styles.pulseCircle,
//             {
//               transform: [{ scale }],
//             },
//           ]}
//         />

//         <Pressable onPress={openModal}>
//           <View style={styles.circle}>
//             <Icon name="user-plus" type="font-awesome" size={30} color="white" />
//             <Text style={styles.registerButtonText}>{t("register")}</Text>
//           </View>
//         </Pressable>
//       </View>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Icon name="user-plus" type="font-awesome" size={40} color="#4c669f" />
//             <Text style={styles.modalText}>
//               {t("modalMessage")}
//             </Text>
//             <Pressable
//               style={[styles.button, { backgroundColor: "#4c669f" }]}
//               onPress={() => handleNavigation("employee")}
//             >
//               <Text style={styles.textStyle}>{t("employee")}</Text>
//             </Pressable>
//             <Pressable
//               style={[styles.button, { backgroundColor: "#4c669f" }]}
//               onPress={() => handleNavigation("employer")}
//             >
//               <Text style={styles.textStyle}>{t("employer")}</Text>
//             </Pressable>
//             <Pressable
//               style={[styles.button, { backgroundColor: "#f44336" }]}
//               onPress={() => setModalVisible(false)}
//             >
//               <Text style={styles.textStyle}>{t("cancel")}</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   backgroundImage: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   gradientOverlay: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   topBar: {
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     marginTop: 50,
//   },
//   logo: {
//     width: 190,
//     height: 100,
//     marginLeft: -60,
//     marginTop: 300,
//     resizeMode: 'contain',
//   },
//   languageSelector: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     width: 200, // Ensure enough width for the Picker
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     borderRadius: 10,
//     marginTop: -340,
//   },
  
//   languagePicker: {
//     height: 55,
//     color: '#FFF',
//     flex: 1,
//     marginLeft: 5, // Add spacing between the icon and the picker text
//   },
  

//   content: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//     paddingHorizontal: 20,
//     marginTop: 20,
//   },
//   title: {
//     color: '#FFF',
//     fontSize: 28,
//     fontWeight: 'bold',
//     textAlign: 'left',
//     marginBottom: 10,
//   },
//   subtitle: {
//     color: '#DDD',
//     fontSize: 16,
//     textAlign: 'left',
//     marginBottom: 200,
//   },
//   bottomBar: {
//     position: 'absolute',
//     bottom: 60,
//     width: '100%',
//     height: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   shadowProp: {
//     shadowColor: '#171717',
//     shadowOffset: { width: 2, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//   },
//   elevation: {
//     elevation: 20,
//     shadowColor: '#52006A',
//   },
//   pulseCircle: {
//     position: 'absolute',
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: 'rgba(120, 190, 250, 0.3)',
//     zIndex: -1,
//   },
//   circle: {
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     backgroundColor: 'rgb(120,190,250)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   registerButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginTop: 5,
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     width: 250,
//   },
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     width: '100%',
//     marginBottom: 10,
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//     fontSize: 16,
//   },
// });


import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  Animated,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "react-native-elements";
import { useTranslation } from "react-i18next";
import * as Speech from "expo-speech";

export default function WelcomeScreen({ navigation }) {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [modalVisible, setModalVisible] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false); // New state for speech toggle
  const scale = new Animated.Value(1);

  useEffect(() => {
    // Pulse animation
    const pulse = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };
    pulse();
    return () => {
      scale.stopAnimation();
    };
  }, [scale]);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
    if (speechEnabled) {
      Speech.speak(t("languageChanged"), { language: lang });
    }
  };

  const openModal = () => {
    setModalVisible(true);
    if (speechEnabled) {
      Speech.speak(t("modalSpeechInstruction"), { language: selectedLanguage });
    }
  };

  const handleNavigation = (userType) => {
    const message =
      userType === "employee"
        ? t("employeeNavigation")
        : t("employerNavigation");
    if (speechEnabled) {
      Speech.speak(message, { language: selectedLanguage });
    }
    navigation.navigate("Login", { userType });
  };

  const toggleSpeech = () => {
    setSpeechEnabled(!speechEnabled);
    if (!speechEnabled) {
      Speech.speak(t("speechEnabled"), { language: selectedLanguage });
    } else {
      Speech.stop();
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/img.webp")}
        style={styles.backgroundImage}
      />
      <LinearGradient
        colors={["rgb(155, 208, 255)", "rgba(44, 44, 44, 0.9)"]}
        style={styles.gradientOverlay}
      />

      <View style={styles.topBar}>
        <TouchableOpacity>
          <Image
            source={require("../../assets/images/skillbazaar.png")}
            style={styles.logo}
          />
        </TouchableOpacity>
        <View style={styles.languageSelector}>
          <Icon name="language" type="material" color="white" size={20} />
          <Picker
            selectedValue={selectedLanguage}
            style={styles.languagePicker}
            onValueChange={handleLanguageChange}
          >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="اردو" value="ur" />
          </Picker>
        </View>
        <TouchableOpacity onPress={toggleSpeech} style={styles.speechButton}>
          <Icon name={speechEnabled ? "volume-up" : "volume-off"} type="font-awesome" color="white" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{t("title")}</Text>
        <Text style={styles.subtitle}>{t("subtitle")}</Text>
      </View>

      <View style={[styles.bottomBar, styles.elevation, styles.shadowProp]}>
        <Animated.View
          style={[
            styles.pulseCircle,
            {
              transform: [{ scale }],
            },
          ]}
        />

        <Pressable onPress={openModal}>
          <View style={styles.circle}>
            <Icon name="user-plus" type="font-awesome" size={30} color="white" />
            <Text style={styles.registerButtonText}>{t("register")}</Text>
          </View>
        </Pressable>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Icon name="user-plus" type="font-awesome" size={40} color="#4c669f" />
            <Text style={styles.modalText}>{t("modalMessage")}</Text>
            <Pressable style={[styles.button, { backgroundColor: "#4c669f" }]} onPress={() => handleNavigation("employee")}>
              <Text style={styles.textStyle}>{t("employee")}</Text>
            </Pressable>
            <Pressable style={[styles.button, { backgroundColor: "#4c669f" }]} onPress={() => handleNavigation("employer")}>
              <Text style={styles.textStyle}>{t("employer")}</Text>
            </Pressable>
            <Pressable style={[styles.button, { backgroundColor: "#f44336" }]} onPress={() => setModalVisible(false)}>
              <Text style={styles.textStyle}>{t("cancel")}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 50,
  },
  logo: {
    width: 190,
    height: 100,
    marginLeft: -60,
    marginTop: 300,
    resizeMode: 'contain',
  },
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: 200, // Ensure enough width for the Picker
    backgroundColor: 'rgba(49, 49, 49, 0.1)',
    borderRadius: 10,
    marginTop: -340,
  },
  
  languagePicker: {
    height: 55,
    color: '#FFF',
    flex: 1,
    marginLeft: 5, // Add spacing between the icon and the picker text
  },

  speechButton: {
    padding: 10,
    backgroundColor: 'rgba(49, 49, 49, 0.1)',
    width: 200, // Ensure enough width for the Picker
    borderRadius: 10,
    marginLeft: -200,
    marginBottom: 180,
  },
  

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
  },
  subtitle: {
    color: '#DDD',
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 200,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  elevation: {
    elevation: 20,
    shadowColor: '#52006A',
  },
  pulseCircle: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(120, 190, 250, 0.3)',
    zIndex: -1,
  },
  circle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgb(120,190,250)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    width: 250,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    width: '100%',
    marginBottom: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
});