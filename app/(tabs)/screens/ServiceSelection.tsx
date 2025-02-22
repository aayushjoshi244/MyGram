import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

const categories = [
  { id: "consumer", label: "Service Consumer" },
  { id: "provider", label: "Service Provider" },
];

const services = {
  consumer: [
    "Plumbing",
    "Electrician",
    "Carpentry",
    "Painting",
    "Home Cleaning",
    "Car Mechanic",
    "Doctor",
    "Nurse",
    "Physiotherapist",
    "Fitness Trainer",
    "Web Development",
    "Graphic Design",
    "Legal Consultant",
    "Tax Filing",
  ],
  provider: ["Freelancer", "Small Business", "Large Enterprise"],
};

const ServiceSelection = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleNext = () => {
    if (!selectedCategory || !selectedService) {
      Alert.alert("Selection Required", "Please select a category and a service.");
      return;
    }
    Alert.alert("Proceeding", `Category: ${selectedCategory}, Service: ${selectedService}`);
    router.push("/register"); // Redirect to registration or service search page
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Category</Text>
      <View style={styles.optionContainer}>
        {categories.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.optionButton,
              selectedCategory === item.id && styles.selectedButton,
            ]}
            onPress={() => {
              setSelectedCategory(item.id);
              setSelectedService(null);
            }}
          >
            <Text style={styles.optionText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedCategory && (
        <>
          <Text style={styles.subtitle}>Select a Service</Text>
          <FlatList
            data={services[selectedCategory]}
            keyExtractor={(item) => item}
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.serviceButton,
                  selectedService === item && styles.selectedButton,
                ]}
                onPress={() => setSelectedService(item)}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}

      <TouchableOpacity style={styles.nextButton} onPress={() => router.push("/(tabs)/main_app/home")}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ServiceSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E3F2FD", // Light Blue Background
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E3A8A", // Dark Blue Text
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1565C0", // Medium Blue Text
    marginTop: 20,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: "#BBDEFB", // Light Blue Button
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0D47A1", // Dark Blue Text
  },
  selectedButton: {
    backgroundColor: "#1E90FF", // Bright Blue Selected Button
  },
  serviceButton: {
    backgroundColor: "#BBDEFB", // Light Blue Background
    padding: 12,
    margin: 8,
    borderRadius: 8,
    alignItems: "center",
    width: "45%",
  },
  nextButton: {
    backgroundColor: "#1E90FF", // Strong Blue Button
    padding: 15,
    borderRadius: 30,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  nextButtonText: {
    fontSize: 18,
    color: "#fff", // White Text
    fontWeight: "bold",
  },
});
