import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const services = [
  {
    id: "1",
    name: "Plumber",
    category: "Home Repair",
    rating: 4.5,
    description: "Expert plumbing services for your home.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.s1zH06aphfktdFIZ0TeIAwHaFu%26pid%3DApi&f=1&ipt=195ca12043ad4c3280d452d282bfceab71c1b9da51ea2037a944020731d47145&ipo=images",
  },
  {
    id: "2",
    name: "Electrician",
    category: "Home Repair",
    rating: 4.8,
    description: "Fixing electrical issues and installations.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.qIrjCdc8mRqiBiNa9IW9DQHaE8%26pid%3DApi&f=1&ipt=c9aa4ec56bf2ce4f1ad5f931b90fa23c77b35ef8f51930580720ff4f7e34c8c7&ipo=images",
  },
  {
    id: "3",
    name: "Mechanic",
    category: "Automobile",
    rating: 4.3,
    description: "Car and bike repairs at your doorstep.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.f-Wv8uwAoZgt2rc_TfrS7gHaE8%26pid%3DApi&f=1&ipt=6afef12c436a95fa59b0dcf52141a6b2b7c42caeb0a573393eb569c0dab22d7d&ipo=images",
  },
  {
    id: "4",
    name: "House Cleaning",
    category: "Cleaning",
    rating: 4.7,
    description: "Professional home cleaning services.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.L0O2aRXK9dGWaZ71nTQ9CgHaE7%26pid%3DApi&f=1&ipt=a820fc5e02b00cec833a30cac81e829f58a7913cce0e31e4c1532f39948b3b55&ipo=images",
  },
  {
    id: "5",
    name: "Pest Control",
    category: "Cleaning",
    rating: 4.5,
    description: "Safe and effective pest control services.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.lIt9TKll3pyue8X1aPyVWwHaEo%26pid%3DApi&f=1&ipt=5791f38dbbe3027e75ddbe398013aaaa86d3b279824b9ff0b1a1f6a2c50d0a38&ipo=images",
  },
  {
    id: "6",
    name: "Sofa Cleaning",
    category: "Cleaning",
    rating: 4.6,
    description: "Deep cleaning services for sofas and upholstery.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.jQ6JMe5rt0tnQmbOK4pz0QHaE8%26pid%3DApi&f=1&ipt=dc466e7f5e21982c0a32417265c47515ede78858ca562364b8e8f2e5ac0728a6&ipo=images",
  },

  // Health
  {
    id: "7",
    name: "Doctor Consultation",
    category: "Health",
    rating: 4.8,
    description: "Expert medical consultation at your convenience.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.N21sdno09PKiUmiEHRjwYgAAAA%26pid%3DApi&f=1&ipt=af9f38fa3ed0250097aa5d5e3e6afd1e9584912ba98531563feb4a83d39e6bfd&ipo=images",
  },
  {
    id: "8",
    name: "Physiotherapy",
    category: "Health",
    rating: 4.7,
    description: "Personalized physiotherapy sessions at home.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.GcLLS0-NuKtrcdXYf1LIxwHaE8%26pid%3DApi&f=1&ipt=1ca45874d127365728527aafddd9577f95c28eec8b7fdb9ed764c6ab710d9eb3&ipo=images",
  },
  {
    id: "9",
    name: "Yoga Trainer",
    category: "Health",
    rating: 4.5,
    description: "Certified yoga trainers for health and fitness.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.igG6w3UQtLJnI8T5eOUdpAHaEa%26pid%3DApi&f=1&ipt=2a47655f54ad3d3f549984cc35b8027730f694bb679ff13362c2a87452da991e&ipo=images",
  },
  {
    id: "10",
    name: "Nutritionist",
    category: "Health",
    rating: 4.4,
    description: "Personalized diet and health plans.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.H4IOmePLR4whrhWE7hnt7wHaGq%26pid%3DApi&f=1&ipt=5d17652c90cf95d2566a87e01fd42910c78d5f25640852f3887325d2d0269998&ipo=images",
  },

  // Miscellaneous
  {
    id: "11",
    name: "Catering Services",
    category: "Miscellaneous",
    rating: 4.6,
    description: "Delicious catering for events and parties.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.tc8KlLra9nSWwM77RujN4gHaE8%26pid%3DApi&f=1&ipt=6c0b48b196e5e3fe8c914c506d535f91e07174ea0258c7a75fe20d2c5e9a3191&ipo=images",
  },
  {
    id: "12",
    name: "Photographer",
    category: "Miscellaneous",
    rating: 4.7,
    description: "Professional photography for all occasions.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.DOfvEgwPn7lA-ya-2q2whAHaE8%26pid%3DApi&f=1&ipt=ef4b5a5910e3c1ed3f7da0f9d6692f72d09363317a178fa50a25124766b37da5&ipo=images",
  },
  {
    id: "13",
    name: "Event Planner",
    category: "Miscellaneous",
    rating: 4.5,
    description: "Organizing weddings, birthdays, and corporate events.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.FBpplcr--LWGwh-5tSCmEgHaE6%26pid%3DApi&f=1&ipt=3d54395c0d00848abedf3d6539d3fc872d8e062bf94d754a66e2ba6f19b8e8f2&ipo=images",
  },
  {
    id: "14",
    name: "Laundry Service",
    category: "Miscellaneous",
    rating: 4.3,
    description: "Doorstep laundry and dry cleaning services.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.1f3UmQh6grbfTKJV9YeDyQHaFQ%26pid%3DApi&f=1&ipt=6828e73af77ae28d8a87421f71eccecc62a38f05153f5baa75a4d16a3cf6e8a8&ipo=images",
  },
  {
    id: "15",
    name: "Courier Service",
    category: "Miscellaneous",
    rating: 4.5,
    description: "Fast and reliable courier delivery services.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.YHgj4AYuQVReBrtpKzItcQHaE8%26pid%3DApi&f=1&ipt=eacc009f6b8be2c5fe13a9b042b13334a6da60011bb3c7798701616aa9ab58e4&ipo=images",
  },
  {
    id: "16",
    name: "Car Wash",
    category: "Automobile",
    rating: 4.6,
    description: "Complete car washing and detailing services.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.I9UbwLk0fIxG7akEnVFZdAHaEl%26pid%3DApi&f=1&ipt=f55b16495307629dba936adbe067f33bf4667f8d8225d2861956a7be42f3c628&ipo=images",
  },
  {
    id: "18",
    name: "Tire Repair",
    category: "Automobile",
    rating: 4.2,
    description: "Flat tire repair and tire replacement services.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.ByhcA8mMkVfyJaf7nlF0pQHaEj%26pid%3DApi&f=1&ipt=6f48dd473aae59cb0d5780d6a9a1a15810f747ae62f78cde28871f588b87bf05&ipo=images",
  },
  {
    id: "19",
    name: "Painter",
    category: "Home Repair",
    rating: 4.4,
    description: "Interior and exterior painting services.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.LzR6GWhpuRp1Pv3mzFQZ3AHaE5%26pid%3DApi&f=1&ipt=48fd84b0cc481f2c609910a890c02eff750afe9b7dc48b98725002a7fbbe3714&ipo=images",
  },
  {
    id: "20",
    name: "Mason",
    category: "Home Repair",
    rating: 4.2,
    description: "Brickwork, plastering, and structural repairs.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.bQZGKJuuy6L02MoPaIFscQHaE4%26pid%3DApi&f=1&ipt=8e3cae65f5b952421fac9095d2920cc5b7f4125b6e879f0b0ec344ec70a8fdd3&ipo=images",
  },
];

export default function ServicesScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Available Services in your Gram</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a service..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Services List */}
      <FlatList
        data={filteredServices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.serviceCard}>
            <Image source={{ uri: item.image }} style={styles.serviceImage} />
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{item.name}</Text>
              <Text style={styles.serviceCategory}>{item.category}</Text>
              <Text style={styles.serviceDescription}>{item.description}</Text>
              <Text style={styles.serviceRating}>⭐ {item.rating}</Text>
              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Book Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => console.log("Add Service Button Pressed")}
      >
        <AntDesign name="plus" size={16} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 25,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#8B008B",
  },
  searchBar: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  serviceCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  serviceImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  serviceCategory: {
    fontSize: 14,
    color: "gray",
  },
  serviceDescription: {
    fontSize: 12,
    color: "#555",
    marginVertical: 4,
  },
  serviceRating: {
    fontSize: 14,
    color: "gold",
  },
  bookButton: {
    backgroundColor: "#8B008B",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 6,
  },
  bookButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#8B008B",
    padding: 15,
    borderRadius: 50,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

