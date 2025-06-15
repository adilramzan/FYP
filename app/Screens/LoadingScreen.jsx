import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, Animated } from "react-native";

export default function LoadingScreen({ navigation }) {
  const scaleValue = new Animated.Value(0.8);

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 0.8,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();

    const timer = setTimeout(() => {
      navigation.replace("Welcome");
    }, 3000);

    return () => {
      pulseAnimation.stop();
      clearTimeout(timer);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/images/skillbazaar.png')}
        style={[styles.logo, { transform: [{ scale: scaleValue }] }]}
      />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4c669f", //#87CEEB
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  loadingText: {
    color: "#FFF",
    fontSize: 20,
    marginTop: 20,
  },
});
