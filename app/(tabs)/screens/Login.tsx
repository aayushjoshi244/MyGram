import React, { useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();

  // Background Animation
  const bgAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Background color animation (Only Purple → Light Pink → Blue)
    Animated.loop(
      Animated.timing(bgAnim, {
        toValue: 1,
        duration: 8000, // Smooth transition
        useNativeDriver: false,
      })
    ).start();

    // Fade-in Animation for elements
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Button scale animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.05, duration: 400, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  // Interpolating background colors (Only Purple → Light Pink → Blue)
  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["#6a0dad", "#f8c8dc", "#4682B4"], // Purple → Light Pink → Blue
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>Login</Animated.Text>

      <Animated.View style={[styles.inputContainer, { opacity: fadeAnim }]}>
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#ddd" />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#ddd" secureTextEntry />
      </Animated.View>

      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    width: "100%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    color: "#fff",
  },
  button: {
    backgroundColor: "#8a2be2",
    padding: 15,
    borderRadius: 30,
    marginTop: 20,
    width: 150,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  link: {
    color: "#f8c8dc",
    marginTop: 15,
    fontSize: 16,
  },
});
