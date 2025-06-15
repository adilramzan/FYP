
// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
// import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, getDoc } from "firebase/firestore";
// import { FIREBASE_DB } from "../../config/firebaseConfig";
// import useUserStore from "../store/userStore"; // ✅ Import the global store

// const ChatScreen = () => {
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");
//   const [userInfo, setUserInfo] = useState(null);
//   const { phoneNumber } = useUserStore(); // ✅ Fetch phone number from the global store

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       if (!phoneNumber) {
//         console.warn("Phone number not found in store.");
//         return;
//       }

//       try {
//         const userRef = doc(FIREBASE_DB, "users", phoneNumber);
//         console.log("Fetching user from:", userRef.path);

//         const userSnap = await getDoc(userRef);
//         if (userSnap.exists()) {
//           setUserInfo(userSnap.data());
//         } else {
//           console.warn("User not found in Firestore:", phoneNumber);
//         }
//       } catch (error) {
//         console.error("Error fetching user info:", error);
//       }
//     };

//     fetchUserInfo();
//   }, [phoneNumber]);

//   useEffect(() => {
//     const q = query(collection(FIREBASE_DB, "chats"), orderBy("createdAt", "desc"));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       setMessages(
//         snapshot.docs.map((doc) => ({
//           _id: doc.id,
//           text: doc.data().text,
//           createdAt: doc.data().createdAt?.toDate(),
//           user: doc.data().user,
//         }))
//       );
//     });

//     return () => unsubscribe();
//   }, []);

//   const sendMessage = async () => {
//     if (text.trim() === "" || !userInfo) return;

//     try {
//       await addDoc(collection(FIREBASE_DB, "chats"), {
//         text,
//         createdAt: serverTimestamp(),
//         user: {
//           _id: phoneNumber, // ✅ Use phoneNumber from the store
//           name: userInfo.name || "Anonymous",
//           userType: userInfo.userType || "general",
//         },
//       });

//       setText(""); // Clear input after sending
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={messages}
//         inverted
//         keyExtractor={(item) => item._id}
//         renderItem={({ item }) => (
//           <View
//             style={[
//               styles.messageContainer,
//               item.user._id === phoneNumber ? styles.myMessage : styles.otherMessage,
//             ]}
//           >
//             <Text style={styles.username}>
//               {item.user.name} ({item.user.userType})
//             </Text>
//             <Text style={styles.messageText}>{item.text}</Text>
//           </View>
//         )}
//       />

//       {/* Input Field */}
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Type a message..."
//           value={text}
//           onChangeText={setText}
//         />
//         <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
//           <Text style={styles.sendText}>Send</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default ChatScreen;


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f0f0f0",
//   },
//   messageContainer: {
//     padding: 10,
//     margin: 5,
//     borderRadius: 10,
//     maxWidth: "80%",
//   },
//   myMessage: {
//     backgroundColor: "#007bff",
//     alignSelf: "flex-end",
//   },
//   otherMessage: {
//     backgroundColor: "#ddd",
//     alignSelf: "flex-start",
//   },
//   username: {
//     fontWeight: "bold",
//     fontSize: 12,
//     color: "#fff",
//   },
//   messageText: {
//     fontSize: 16,
//     color: "#fff",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     padding: 10,
//     borderTopWidth: 1,
//     borderColor: "#ccc",
//     backgroundColor: "#fff",
//   },
//   input: {
//     flex: 1,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//   },
//   sendButton: {
//     marginLeft: 10,
//     backgroundColor: "#007bff",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//   sendText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });


import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../config/firebaseConfig";
import useUserStore from "../store/userStore";
import { Ionicons } from '@expo/vector-icons';

const CommunityForumScreen = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const { phoneNumber } = useUserStore();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!phoneNumber) return;
      try {
        const userRef = doc(FIREBASE_DB, "users", phoneNumber);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserInfo(userSnap.data());
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserInfo();
  }, [phoneNumber]);

  useEffect(() => {
    const q = query(collection(FIREBASE_DB, "community_forum"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().text,
          createdAt: doc.data().createdAt?.toDate(),
          user: {
            id: doc.data().user.id,
            name: doc.data().user.name,
            type: doc.data().user.type,
            avatar: doc.data().user.avatar
          }
        }))
      );
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (text.trim() === "" || !userInfo) return;

    try {
      await addDoc(collection(FIREBASE_DB, "community_forum"), {
        text,
        createdAt: serverTimestamp(),
        user: {
          id: phoneNumber,
          name: userInfo.name || "Anonymous",
          type: userInfo.userType || "member",
          avatar: userInfo.profileImage || null
        },
      });
      setText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const renderMessage = ({ item }) => {
    const isCurrentUser = item.user.id === phoneNumber;
    const isEmployer = item.user.type === "employer";
    
    return (
      <View style={[
        styles.messageContainer,
        isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage,
        isEmployer && !isCurrentUser && styles.employerMessage
      ]}>
        {!isCurrentUser && (
          <View style={styles.userInfo}>
            <Image 
              source={item.user.avatar ? { uri: item.user.avatar } : require('../../assets/images/defaultProfile.jpg')} 
              style={styles.avatar}
            />
            <Text style={styles.userName}>
              {item.user.name}
              <Text style={styles.userType}> • {item.user.type}</Text>
            </Text>
          </View>
        )}
        <Text style={[
          styles.messageText,
          isCurrentUser && styles.currentUserText,
          isEmployer && !isCurrentUser && styles.employerText
        ]}>
          {item.text}
        </Text>
        <Text style={styles.timestamp}>
          {item.createdAt?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community Forum</Text>
        <Text style={styles.headerSubtitle}>Connect with employers and employees</Text>
      </View>

      <View style={styles.messagesWrapper}>
        <FlatList
          data={messages}
          inverted
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Share your thoughts..."
          value={text}
          onChangeText={setText}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  messagesWrapper: {
    flex: 1,
    paddingBottom: 80, // Add padding to prevent messages from being hidden
  },
  header: {
    padding: 16,
    backgroundColor: "#4CAF50",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e0e0e0',
  },
  messagesContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  messageContainer: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
    maxWidth: '80%',
  },
  currentUserMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4CAF50',
    borderTopRightRadius: 0,
  },
  otherUserMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderTopLeftRadius: 0,
    elevation: 2,
  },
  employerMessage: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  userType: {
    fontWeight: 'normal',
    color: '#666',
    fontSize: 12,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  currentUserText: {
    color: '#fff',
  },
  employerText: {
    color: '#333',
  },
  timestamp: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 120,
    marginRight: 8,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommunityForumScreen;