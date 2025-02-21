import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import {
  MaterialIcons,
  Ionicons,
  FontAwesome5,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isTwoFactorAuth, setIsTwoFactorAuth] = useState(false);
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => console.log("User logged out!") },
    ]);
    navigation.replace('login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={require("@/assets/images/harsh.jpg")}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.name}>Harshvardhan Singh</Text>
          <View style={styles.verificationBadge}>
            <FontAwesome5 name="check-circle" size={16} color="#007BFF" />
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
          <Text style={styles.bio}>
            Passionate Developer | Tech Enthusiast 🚀
          </Text>
        </View>

        <TouchableOpacity style={styles.editButton}>
          <MaterialIcons name="edit" size={20} color="white" />
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* User Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>120</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>5.4K</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>320</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      {/* Account Analytics */}
      <View style={styles.analyticsContainer}>
        <View style={styles.analyticsBox}>
          <Feather name="bar-chart-2" size={22} color="#007BFF" />
          <Text style={styles.analyticsText}>Engagement: 85%</Text>
        </View>
        <View style={styles.analyticsBox}>
          <Ionicons name="eye-outline" size={22} color="#FF5733" />
          <Text style={styles.analyticsText}>Profile Views: 12K</Text>
        </View>
      </View>

      {/* Saved Posts Section */}
      <TouchableOpacity style={styles.savedPosts}>
        <AntDesign name="save" size={22} color="#FFD700" />
        <Text style={styles.savedPostsText}>Saved Posts</Text>
      </TouchableOpacity>

      {/* Subscription Details */}
      <View style={styles.subscriptionContainer}>
        <FontAwesome5 name="crown" size={20} color="#FFD700" />
        <View style={styles.subscriptionInfo}>
          <Text style={styles.subscriptionTitle}>Premium Plan</Text>
          <Text style={styles.subscriptionExpiry}>Expires: Dec 31, 2025</Text>
        </View>
        <TouchableOpacity style={styles.manageButton}>
          <Text style={styles.manageButtonText}>Upgrade</Text>
        </TouchableOpacity>
      </View>

      {/* Settings Section */}
      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.settingsItem}>
          <Ionicons name="lock-closed-outline" size={24} color="#555" />
          <Text style={styles.settingsText}>Security & Privacy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingsItem}>
          <Ionicons name="wallet-outline" size={24} color="#555" />
          <Text style={styles.settingsText}>Payments & Billing</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingsItem}>
          <Ionicons name="globe-outline" size={24} color="#555" />
          <Text style={styles.settingsText}>Language</Text>
        </TouchableOpacity>

        {/* Notifications Toggle */}
        <View style={styles.settingsItem}>
          <Ionicons name="notifications-outline" size={24} color="#555" />
          <Text style={styles.settingsText}>Notifications</Text>
          <Switch
            value={isNotificationsEnabled}
            onValueChange={setIsNotificationsEnabled}
          />
        </View>

        {/* Two-Factor Authentication Toggle */}
        <View style={styles.settingsItem}>
          <Ionicons name="shield-checkmark-outline" size={24} color="#555" />
          <Text style={styles.settingsText}>Two-Factor Authentication</Text>
          <Switch
            value={isTwoFactorAuth}
            onValueChange={setIsTwoFactorAuth}
          />
        </View>

        {/* Dark Mode Toggle */}
        <View style={styles.settingsItem}>
          <Ionicons name="moon-outline" size={24} color="#555" />
          <Text style={styles.settingsText}>Dark Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
          />
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialIcons name="logout" size={24} color="white" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  email: {
    fontSize: 16,
    color: "#777",
    marginBottom: 15,
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 6,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  subscriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF5CC",
    padding: 15,
    width: "90%",
    borderRadius: 10,
    marginBottom: 20,
  },
  subscriptionInfo: {
    flex: 1,
    marginLeft: 10,
  },
  subscriptionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subscriptionExpiry: {
    fontSize: 14,
    color: "#555",
  },
  manageButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  manageButtonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  settingsContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    elevation: 3,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  settingsText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
    flex: 1,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },

  container: {
    flexGrow: 1,
    backgroundColor: "#F8F9FA",
    paddingVertical: 30,
    alignItems: "center",
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    marginBottom: 10,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#8B008B",
  },
  userInfo: {
    alignItems: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#8B008B",
  },
  verificationBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  verifiedText: {
    color: "#007BFF",
    fontSize: 14,
    marginLeft: 5,
  },
  bio: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8B008B",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 30,
  },
  analyticsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  analyticsBox: {
    alignItems: "center",
  },
  analyticsText: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
  savedPosts: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF5CC",
    paddingVertical: 12,
    width: "90%",
    borderRadius: 10,
    marginBottom: 20,
  },
  savedPostsText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#555",
  },
});
