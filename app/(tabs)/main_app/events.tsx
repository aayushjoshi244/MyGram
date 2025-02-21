import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, TextInput } from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

const eventsData = [
  {
    id: "1",
    title: "Kisan Mela",
    date: "March 10, 2025",
    location: "Panchayat Bhawan, Pilani",
    category: "Agriculture",
    description: "A grand fair for farmers with new techniques and tools.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.KgZ69i49zicsQ5Zv-TkZhgHaEK%26pid%3DApi&f=1&ipt=afec9c7f1b8a416b9be1e0b41efe786062b698d892b40c746f993252c45a5926&ipo=images",
    verified: true,
  },
  {
    id: "2",
    title: "Gram Utsav",
    date: "April 5, 2025",
    location: "Community Hall, Jhunjhunu",
    category: "Festival",
    description: "A village festival celebrating cultural heritage.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.z0DAVpCrToCgat0mJpEBsgHaEK%26pid%3DApi&f=1&ipt=84406a7f8d461dcaac1f092df6b8b23d7a469449b37e2fdf6c253451841c8306&ipo=images",
    verified: false,
  },
  {
    id: "3",
    title: "Health Checkup Camp",
    date: "May 2, 2025",
    location: "PHC, Churu",
    category: "Health",
    description: "Free health checkup for all villagers by expert doctors.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.LGHDsmzoFQOZ9n8eeORfBgHaE6%26pid%3DApi&f=1&ipt=d6da4e5a515d8f4a05c527664643e87793a44dc47ff481a60c1fffe1f08b6c9d&ipo=images",
    verified: true,
  },
  {
    id: "4",
    title: "Self Help Group Meet",
    date: "May 15, 2025",
    location: "Village Center, Sikar",
    category: "Community",
    description: "A meeting for women-led self-help groups for empowerment.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.A1ycWMrLob5L5z4-kHohBgAAAA%26pid%3DApi&f=1&ipt=1696b9839f2075db0e82bdb988c444b3d3a0a00cca7cc50ac4d95575b4525175&ipo=images",
    verified: false,
  },
];

export default function EventsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(eventsData);

  // Function to filter events based on search query
  const handleSearch = (text: string) => {
    setSearchQuery(text); 
    if (text) {
      setFilteredEvents(
        eventsData.filter((event) =>
          event.title.toLowerCase().includes(text.toLowerCase())
        )
      );
    } else {
      setFilteredEvents(eventsData);
    }
  };
  

  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 25, backgroundColor: "#F8F8F8" }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 15, color:"#8B008B", textAlign:"center" }}>Upcoming Events in your Gram</Text>

      {/* Search Bar */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#fff",
          borderRadius: 10,
          padding: 10,
          alignItems: "center",
          marginBottom: 15,
          elevation: 2,
        }}
      >
        <AntDesign name="search1" size={20} color="#888" />
        <TextInput
          placeholder="Search events..."
          value={searchQuery}
          onChangeText={(text) => handleSearch(text)}
          style={{ flex: 1, marginLeft: 10 }}
        />
      </View>

      {/* Events List */}
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#fff",
              padding: 15,
              marginBottom: 15,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 3,
            }}
          >
            <Image source={{ uri: item.image }} style={{ width: "100%", height: 120, borderRadius: 8 }} />

            {/* Title & Verified Badge */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.title}</Text>
              {item.verified && <AntDesign name="checkcircle" size={20} color="#8B008B" />}
            </View>

            {/* Category Tag */}
            <View
              style={{
                backgroundColor: "#DFF6FF",
                alignSelf: "flex-start",
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 5,
                marginTop: 5,
              }}
            >
              <Text style={{ fontSize: 12, color: "#0077B6" }}>{item.category}</Text>
            </View>

            {/* Event Details */}
            <Text style={{ fontSize: 14, color: "#555", marginTop: 5 }}>📅 {item.date}</Text>
            <Text style={{ fontSize: 14, color: "#555" }}>📍 {item.location}</Text>

            {/* Event Description */}
            <Text style={{ fontSize: 14, color: "#444", marginTop: 5 }}>{item.description}</Text>

            {/* Join Button */}
            <TouchableOpacity
              style={{
                backgroundColor: "#8B008B",
                padding: 10,
                borderRadius: 8,
                marginTop: 10,
                alignItems: "center",
              }}
              onPress={() => console.log(`Joined: ${item.title}`)}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Join Event</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Floating Add Event Button */}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: "#8B008B",
          padding: 15,
          borderRadius: 50,
          elevation: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => console.log("Add Event")}
      >
        <AntDesign name="plus" size={16} color="white" />
      </TouchableOpacity>
    </View>
  );
}