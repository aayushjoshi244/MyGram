import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

const BankPaymentScreen = () => {
  const router = useRouter();

  // Form Fields
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");

  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Fade-in animation on mount
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePayment = () => {
    let errors = [];

    if (bankName.length <= 2) errors.push("Bank name must be at least 3 characters long.");
    if (accountNumber.length < 8) errors.push("Account number must be at least 8 digits long.");
    if (ifsc.length !== 11) errors.push("IFSC code must be exactly 11 characters long.");
    if (cardNumber.length !== 16) errors.push("Card number must be exactly 16 digits.");
    if (cvv.length !== 3) errors.push("CVV must be exactly 3 digits.");

    if (errors.length > 0) {
      Alert.alert("Form Errors", errors.join("\n"));
      return;
    }

    Alert.alert("Payment Initiated", "Redirecting to secure payment gateway...");
    router.push("/paymentSuccess");
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        Bank Payment Authentication
      </Animated.Text>

      {/* Bank Name */}
      <TextInput
        style={styles.input}
        placeholder="Bank Name"
        placeholderTextColor="#777"
        value={bankName}
        onChangeText={setBankName}
      />

      {/* Account Number (Minimum 8 Digits) */}
      <TextInput
        style={styles.input}
        placeholder="Account Number"
        placeholderTextColor="#777"
        keyboardType="number-pad"
        value={accountNumber}
        onChangeText={(text) => {
          if (/^\d{0,8}$/.test(text)) setAccountNumber(text); // Restricts input to max 8 digits
        }}
      />

      {/* IFSC Code (Max 11 Characters) */}
      <TextInput
        style={styles.input}
        placeholder="IFSC Code"
        placeholderTextColor="#777"
        autoCapitalize="characters"
        value={ifsc}
        maxLength={11} // Restricts input to max 11 characters
        onChangeText={setIfsc}
      />

      {/* Card Number */}
      <TextInput
        style={styles.input}
        placeholder="Card Number (16-digit)"
        placeholderTextColor="#777"
        keyboardType="number-pad"
        maxLength={16}
        value={cardNumber}
        onChangeText={setCardNumber}
      />

      <View style={styles.cardDetails}>
        {/* CVV */}
        <TextInput
          style={[styles.input, styles.cvvInput]}
          placeholder="CVV"
          placeholderTextColor="#777"
          keyboardType="number-pad"
          maxLength={3}
          value={cvv}
          onChangeText={setCvv}
          secureTextEntry
        />

        {/* Expiry Date (No Restriction on Length) */}
        <TextInput
          style={[styles.input, styles.expiryInput]}
          placeholder="MM/YY"
          placeholderTextColor="#777"
          keyboardType="number-pad"
          value={expiry}
          onChangeText={setExpiry}
        />
      </View>

      {/* Proceed Button - Always Enabled */}
      <TouchableOpacity style={styles.button} onPress={() => router.push("/(tabs)/screens/ServiceSelection")}>
        <Text style={styles.buttonText}>Proceed to MyGram</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BankPaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6A0DAD",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#F3E5F5",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 12,
    fontSize: 16,
    color: "#333",
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cvvInput: {
    width: "45%",
  },
  expiryInput: {
    width: "45%",
  },
  button: {
    backgroundColor: "#6A0DAD",
    padding: 15,
    borderRadius: 30,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
