import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const AadhaarAuthScreen = () => {
  const router = useRouter();
  const [aadhaar, setAadhaar] = useState(["", "", ""]);
  const inputRefs = useRef<TextInput[]>([]);
  const [isAadhaarVerified, setAadhaarVerified] = useState(false);
  const [isBiometricEnabled, setBiometricEnabled] = useState(false);
  const [isBiometricVerified, setBiometricVerified] = useState(false); // State for KYC button
  const scanAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleInputChange = (text, index) => {
    if (/^\d{0,4}$/.test(text)) {
      let newAadhaar = [...aadhaar];
      newAadhaar[index] = text;
      setAadhaar(newAadhaar);

      if (text.length === 4 && index < 2) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleVerify = () => {
    if (aadhaar.join("").length === 12) {
      Alert.alert("Success", "Aadhaar Verified Successfully!");
      setAadhaarVerified(true);
      setBiometricEnabled(true);
    } else {
      Alert.alert("Error", "Please enter a valid 12-digit Aadhaar number.");
    }
  };

  const startScanAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: 1.2,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(scanAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const handleBiometricAuth = async () => {
    startScanAnimation();

    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      Alert.alert("Error", "Biometric authentication is not available.");
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Scan your fingerprint to verify identity",
      fallbackLabel: "Use Passcode",
    });

    if (result.success) {
      Alert.alert("Success", "Biometric Verified Successfully!");
      setBiometricVerified(true); // Enable KYC button
    } else {
      Alert.alert("Error", "Biometric authentication failed. Try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        Aadhaar Verification
      </Animated.Text>

      <View style={styles.aadhaarContainer}>
        {aadhaar.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            style={styles.inputBox}
            maxLength={4}
            keyboardType="number-pad"
            value={digit}
            onChangeText={(text) => handleInputChange(text, index)}
          />
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, isAadhaarVerified && styles.disabledButton]}
        onPress={handleVerify}
        disabled={isAadhaarVerified}
      >
        <Text style={styles.buttonText}>
          {isAadhaarVerified ? "Verified" : "Verify"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.bioTitle}>Biometric Verification</Text>

      {/* Biometric Button */}
      <TouchableOpacity
        style={[styles.bioButton, { opacity: isBiometricEnabled ? 1 : 0.5 }]}
        onPress={handleBiometricAuth}
        disabled={!isBiometricEnabled}
      >
        <Text style={styles.buttonText}>Scan Fingerprint</Text>
      </TouchableOpacity>

      {/* Fingerprint Icon Animation */}
      <Animated.View style={[styles.fingerprintBox, { transform: [{ scale: scanAnim }] }]}>
        <Ionicons name="finger-print" size={50} color="#6A0DAD" />
      </Animated.View>

      {/* KYC Authentication Button (Visible after Biometric Verification) */}
      {isBiometricVerified && (
        <TouchableOpacity
          style={styles.kycButton}
          onPress={() => router.push("/(tabs)/screens/BankPayment")}
        >
          <Text style={styles.buttonText}>Complete with UPI</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AadhaarAuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // White Background
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#6A0DAD", // Purple Text
    marginBottom: 25,
  },
  aadhaarContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  inputBox: {
    width: 80,
    height: 50,
    backgroundColor: "#E6E6FA", // Light Purple Background
    textAlign: "center",
    fontSize: 22,
    color: "#6A0DAD", // Purple Text
    borderRadius: 8,
    marginHorizontal: 8,
    letterSpacing: 3,
    borderWidth: 1,
    borderColor: "#6A0DAD", // Purple Border
  },
  button: {
    backgroundColor: "#6A0DAD", // Purple Button
    padding: 15,
    borderRadius: 30,
    marginTop: 20,
    width: 180,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#B19CD9", // Lighter Purple when disabled
  },
  buttonText: {
    fontSize: 18,
    color: "#fff", // White Text
    fontWeight: "bold",
  },
  bioTitle: {
    fontSize: 20,
    color: "#6A0DAD", // Purple Text
    marginTop: 30,
  },
  bioButton: {
    backgroundColor: "#6A0DAD", // Purple Button
    padding: 15,
    borderRadius: 30,
    marginTop: 20,
    width: 180,
    alignItems: "center",
  },
  fingerprintBox: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: "#E6E6FA", // Light Purple Background
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#6A0DAD", // Purple Border
  },
  kycButton: {
    backgroundColor: "#6A0DAD", // Purple Button
    padding: 15,
    borderRadius: 30,
    marginTop: 20,
    width: 220,
    alignItems: "center",
  },
});
