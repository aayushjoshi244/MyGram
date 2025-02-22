import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { useRouter } from "expo-router"; // Use useRouter for navigation

const HomeScreen = () => {
  const router = useRouter(); // Get router object
  
  // Animation values
  const bgAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Background animation loop
    Animated.loop(
      Animated.timing(bgAnim, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: false,
      })
    ).start();

    // Button scale animation (breathing effect)
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.1, duration: 500, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  // Interpolating colors based on animation value
  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: ["#1E90FF", "#87CEEB", "#4682B4", "#00BFFF", "#1E90FF"], // Different shades of blue
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.subtitle}>Welcome to</Text>
      <Text style={styles.title}>MyGram</Text>

      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity style={styles.roundButton} onPress={() => router.push("/(tabs)/screens/Login")}>
          <Text style={styles.buttonText}>Let's Engage</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 5,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },
  roundButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: "#0056b3", // Deep blue button
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
