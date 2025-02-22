import {
    Image,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    View,
    ScrollView,
    TextInput,
    RefreshControl,
    Animated,
  } from "react-native";
  import { FontAwesome, Ionicons } from "@expo/vector-icons";
  import { Picker } from "@react-native-picker/picker";
  import { ThemedText } from "@/components/ThemedText";
  import { ThemedView } from "@/components/ThemedView";
  import { StatusBar } from "expo-status-bar";
  import { useState, useEffect } from "react";
  import { LinearGradient } from "expo-linear-gradient";
import React from "react";
  
  const postsData = [
    {
      id: "1",
      user: "Harshvadhan Singh Shekhawat",
      userAvatar: require("@/assets/images/harsh.jpg"),
      image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.LGHDsmzoFQOZ9n8eeORfBgHaE6%26pid%3DApi&f=1&ipt=d6da4e5a515d8f4a05c527664643e87793a44dc47ff481a60c1fffe1f08b6c9d&ipo=images",
      caption: "Enjoying the sunset 🌅",
      likes: 120,
      comments: 15,
    },
    {
      id: "2",
      user: "Aayush Joshi",
      userAvatar: require("@/assets/images/aayush.jpeg"),
      image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.z0DAVpCrToCgat0mJpEBsgHaEK%26pid%3DApi&f=1&ipt=84406a7f8d461dcaac1f092df6b8b23d7a469449b37e2fdf6c253451841c8306&ipo=images",
      caption: "Exploring new places! ✈️",
      likes: 95,
      comments: 20,
    },
    {
      id: "3",
      user: "Priyaaa",
      userAvatar: require("@/assets/images/priya.jpeg"),
      image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.KgZ69i49zicsQ5Zv-TkZhgHaEK%26pid%3DApi&f=1&ipt=afec9c7f1b8a416b9be1e0b41efe786062b698d892b40c746f993252c45a5926&ipo=images",
      caption: "Nature is so peaceful 🌿",
      likes: 150,
      comments: 30,
    },
  ];
  
  export default function HomeScreen() {
    const [selectedLanguage, setSelectedLanguage] = useState("en");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredPosts, setFilteredPosts] = useState(postsData);
    const [refreshing, setRefreshing] = useState(false);
    const likeAnim = new Animated.Value(1);
  
    useEffect(() => {
      setFilteredPosts(
        postsData.filter(
          (post) =>
            post.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.caption.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }, [searchQuery]);
  
    const handleRefresh = () => {
      setRefreshing(true);
      setTimeout(() => setRefreshing(false), 1500);
    };
  
    const animateLike = () => {
      Animated.sequence([
        Animated.timing(likeAnim, { toValue: 1.5, duration: 150, useNativeDriver: true }),
        Animated.timing(likeAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
      ]).start();
    };
  
    return (
      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      >
        <StatusBar hidden={true} />
  
        {/* Header with Gradient Background */}
        <LinearGradient colors={["#E3F2FD", "#fff"]} style={styles.headerContainer}>
          <Image source={require("@/assets/images/mygram-logo.png")} style={styles.logo} />
          <View style={styles.languageContainer}>
            <Picker
              selectedValue={selectedLanguage}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
            >
              <Picker.Item label="English" value="en" />
              <Picker.Item label="हिंदी" value="hi" />
            </Picker>
          </View>
        </LinearGradient>
  
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search posts..."
            placeholderTextColor="#666"
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />
          <Ionicons name="search" size={24} color="#1E3A8A" style={styles.searchIcon} />
        </View>
  
        {/* Platform Overview */}
        <ThemedView style={styles.introContainer}>
          <ThemedText type="title" style={styles.introTitle}>
            {selectedLanguage === "en"
              ? "Welcome to myGram! 🚀"
              : "myGram में आपका स्वागत है! 🚀"}
          </ThemedText>
          <ThemedText style={styles.introText}>
            {selectedLanguage === "en"
              ? "Discover, connect, and trade effortlessly on myGram."
              : "myGram पर आसानी से खोजें, जुड़ें और व्यापार करें।"}
          </ThemedText>
        </ThemedView>
  
        {/* Post Feed */}
        <FlatList
        style={{ flex: 1, marginBottom:30 }}
          data={filteredPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ThemedView style={styles.postContainer}>
              <View style={styles.userInfo}>
                <Image source={item.userAvatar} style={styles.avatar} />
                <ThemedText type="defaultSemiBold">{item.user}</ThemedText>
              </View>
  
              <Image source={{ uri: item.image }} style={styles.postImage} />
  
              <ThemedText>{item.caption}</ThemedText>
  
              <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton} onPress={animateLike}>
                  <Animated.View style={{ transform: [{ scale: likeAnim }] }}>
                    <FontAwesome name="heart" size={20} color="red" />
                  </Animated.View>
                  <ThemedText>{item.likes}</ThemedText>
                </TouchableOpacity>
  
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="chatbubble-outline" size={20} color="black" />
                  <ThemedText>{item.comments}</ThemedText>
                </TouchableOpacity>
  
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="share-outline" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </ThemedView>
          )}
          scrollEnabled={false}
        />
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#E3F2FD" }, // Light Blue Background
  
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 15,
      borderRadius: 10,
    },
    logo: { height: 60, width: 60, borderRadius: 30, borderWidth: 2, borderColor: "#1E3A8A" }, // Dark Blue Border
    languageContainer: { marginLeft: 10 },
    picker: { height: 60, width: 150, color: "#0D47A1" }, // Dark Blue Text
  
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#BBDEFB", // Light Blue Background
      paddingHorizontal: 10,
      borderRadius: 10,
      marginTop: 10,
      elevation: 2,
    },
    searchInput: { flex: 1, height: 40, color: "#0D47A1" }, // Dark Blue Text
    searchIcon: { marginLeft: 5 },
  
    postContainer: { backgroundColor: "#BBDEFB", padding: 10, marginVertical: 8, borderRadius: 10, elevation: 2 }, // Light Blue Background
    userInfo: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 5 },
    avatar: { width: 40, height: 40, borderRadius: 20 },
    postImage: { width: "100%", height: 250, borderRadius: 10, marginBottom: 8 },
  
    actions: { flexDirection: "row", justifyContent: "space-between", marginTop: 5 },
    actionButton: { flexDirection: "row", alignItems: "center", gap: 5 },
  
    introContainer: { padding: 16, backgroundColor: "#E3F2FD", borderRadius: 10, marginVertical: 10 }, // Light Blue Background
    introTitle: { fontSize: 22, fontWeight: "bold", color: "#1E3A8A", marginBottom: 8 }, // Dark Blue Text
    introText: { fontSize: 16, color: "#0D47A1", lineHeight: 24 }, // Dark Blue Text
  });
  