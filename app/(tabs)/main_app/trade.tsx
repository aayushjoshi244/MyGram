import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const products = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: "₹99",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.FCB33TXqP_3eepbjjans_AHaHa%26pid%3DApi&f=1&ipt=efd4361df9f4f9565462594fe84d8a0a8169bb55f4404b962b081fce2160fb90&ipo=images",
  },
  {
    id: "2",
    name: "Smartwatch",
    price: "₹149",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.tRm7dMQVPh1pstGu8TgnBgHaHa%26pid%3DApi&f=1&ipt=ad8ab3abf31ce1f2fd7dfbaa48ea825fc4b8e10b73b83b4001874e6acf4b3770&ipo=images",
  },
  {
    id: "3",
    name: "Laptop Stand",
    price: "₹39",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.iq7mVxOCKI9fjk-bIY5zjwHaEk%26pid%3DApi&f=1&ipt=3f79d1495869d6355ffb3902937af5eb2261276588840ca9eb067ec57b4971da&ipo=images",
  },
  {
    id: "4",
    name: "Bluetooth Speaker",
    price: "₹199",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.gJpIPjTuaWu8oFuiDvGVBwHaHB%26pid%3DApi&f=1&ipt=2747984f7af6edab738b6d4be93db221f4b403c3a62225c19dd49057f70df4b8&ipo=images",
  },
  {
    id: "5",
    name: "Mechanical Keyboard",
    price: "₹299",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.PQRYxpxA8tot0xTCw6xF7gHaEl%26pid%3DApi&f=1&ipt=076259661d2a1fb65a33b59afee477b94b5a366de47343ce2b45ba30ee1841bb&ipo=images",
  },
  {
    id: "6",
    name: "Gaming Mouse",
    price: "₹79",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.BC2H5w0p_Ya-r8xd4sRTBgHaHa%26pid%3DApi&f=1&ipt=5f792197b938ed6fe155fcef35ff5813d0e3680759a64846632db8ca66e4fb55&ipo=images",
  },
  {
    id: "7",
    name: "USB-C Hub",
    price: "₹99",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.tIdCPO7WKFn9M0vGWOOR9gHaHa%26pid%3DApi&f=1&ipt=f5e87b26665b9b5a6a8ad4177d90e57bd5d981384dc1eca3c42f7a4d0d0c1f73&ipo=images",
  },
  {
    id: "8",
    name: "Portable SSD (1TB)",
    price: "₹799",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.CN67G-BJVa0gtADytDO2qwHaHa%26pid%3DApi&f=1&ipt=d5c7c596ca6a6ebc85017bae339ea8f34083b1ba7b217ab0c323d680b5e76f1f&ipo=images",
  },
  {
    id: "9",
    name: "Ring Light with Tripod",
    price: "₹129",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.noRTZv9BjSmJFteNnTmZTwHaHa%26pid%3DApi&f=1&ipt=836f778c44def95a55c15e5e863d0cb90a1865a2743bfe9814189e0dae03d8e8&ipo=images",
  },
  {
    id: "10",
    name: "Noise Cancelling Earbuds",
    price: "₹249",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.CCnX1iAufblEZ46Iw4DHkAHaH5%26pid%3DApi&f=1&ipt=1ad468bb72579b13a0b7fb85f8c41f879640e263325d3c6e8598bea9a19ec5ab&ipo=images",
  },
  {
    id: "11",
    name: "Wireless Charging Pad",
    price: "₹89",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.LWzVe9UgOyko3aZPJze9JQHaHa%26pid%3DApi&f=1&ipt=de98cdee7e479e39000c63553b0d5596b52596d977fac92886f409b13f485592&ipo=images",
  },
  {
    id: "12",
    name: "Smart LED Light Strip",
    price: "₹149",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP._6Vh_bGueDFmgsu7AoRQ_AHaHa%26pid%3DApi&f=1&ipt=e25c82678c48a6403c2efe410216117d4850e18cc247bd8c9ac2f37b17d189fb&ipo=images",
  },
  {
    id: "13",
    name: "Smartphone Tripod",
    price: "₹99",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.LbA_NPFlqRjNDgus87JX3wHaHa%26pid%3DApi&f=1&ipt=105320434d6d2355e796370628bdc9486748da25178b3258d1777bd4d3f3c631&ipo=images",
  },
  {
    id: "14",
    name: "VR Headset",
    price: "₹499",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.0M6LYY8wGP6mh1Q9qMgdgAHaE_%26pid%3DApi&f=1&ipt=0dffe47c328e1ce3f39267a06e8b7fe1276ded9585f37de6b23aea8c8ab67d18&ipo=images",
  },
  {
    id: "15",
    name: "4K Action Camera",
    price: "₹599",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.fgJgjA0iQwkaIULfdJyrdQHaHa%26pid%3DApi&f=1&ipt=a2b178c97440abef5b1ebb19db2e2211d75ec7d86c078f78ec6a4ec9d97563a3&ipo=images",
  },
  {
    id: "16",
    name: "Wireless Keyboard & Mouse Combo",
    price: "₹199",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.EtRhgM6yIeVH2VfbQmTiygHaEi%26pid%3DApi&f=1&ipt=642dc98ee11fc00171e85b1c5ed9610a7066a4d7eaae1430cd5587182a6a4442&ipo=images",
  },
  {
    id: "17",
    name: "HD Webcam with Mic",
    price: "₹249",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.LdDdbIMfJUh_tw0dawh7zAHaHa%26pid%3DApi&f=1&ipt=980cd31d51a57e03b50878796417dfa184a5dddb9f59bed7cc10adbbc268c6fe&ipo=images",
  },
  {
    id: "18",
    name: "Laptop Cooling Pad",
    price: "₹129",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.-Y4pf8DtBH6vwlW27lSA6gHaEj%26pid%3DApi&f=1&ipt=01b122a30063364945111079adba4ae3f2a2dbd9f96def56b1fc42ed1566ea0a&ipo=images",
  },
  {
    id: "19",
    name: "External Hard Drive (2TB)",
    price: "₹999",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Ee8OH-25-lg84SXgsh4_XAHaHa%26pid%3DApi&f=1&ipt=632c39fade72d3ce41aaef63d2da2bd0cf795eac20de2a39663975116c88cf8a&ipo=images",
  },
  {
    id: "20",
    name: "Smart Coffee Mug Warmer",
    price: "₹199",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.V7x9B5emopBL9ljGD312TgHaHa%26pid%3DApi&f=1&ipt=2b7ce1f940951b73dfcac9d083e00280f3fdab007e262e1232781dcffedc6655&ipo=images",
  },
  {
    id: "21",
    name: "Digital Drawing Tablet",
    price: "₹599",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.w-TO9m0we_APCv_LkoTJrAHaFy%26pid%3DApi&f=1&ipt=7b42325d7b39379e444fb3c996c6722b08c0c6e5d89aed016bf8b0b117f59b47&ipo=images",
  },
  {
    id: "22",
    name: "Multi-Port USB Charger",
    price: "₹129",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.mDL63BW3_3RVh88-40hfMAHaHa%26pid%3DApi&f=1&ipt=dee9ccdb1a6344699759eb1f15b0b18c0092284cbace6bdafde5b1ae440596a0&ipo=images",
  },
  {
    id: "23",
    name: "Smart Lock for Home",
    price: "₹899",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.jyFYJuGQBHH9gzxodL-v0wHaEM%26pid%3DApi&f=1&ipt=becbda69576c9ef4b4278e68dbb3040143b628aef435ac0084c1f65bc9d59b69&ipo=images",
  },
  {
    id: "24",
    name: "Bluetooth Car Adapter",
    price: "₹179",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.ogDIaPmgyb3OixN8oZ3i1QHaHT%26pid%3DApi&f=1&ipt=06fde9a571f55f052d2f09a034146042a66d64db056a146db069c12ffd03acf7&ipo=images",
  },
  {
    id: "25",
    name: "Robot Vacuum Cleaner",
    price: "₹1999",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.nIZTR6QPfn1xD19L4I01eQHaHa%26pid%3DApi&f=1&ipt=7788fbf9c2e88bf413d4cf7daf3c80da9148b8cd6b107c481a400ded10ccd611&ipo=images",
  },
  {
    id: "26",
    name: "Smart Doorbell with Camera",
    price: "₹799",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.z1lyAqKOj9VwlwSptXDXnQAAAA%26pid%3DApi&f=1&ipt=7d8bff71898a4c517946325be005bdaa7663adc971a280d44db24f5fbca605bd&ipo=images",
  },
  {
    id: "27",
    name: "Portable Mini Projector",
    price: "₹1299",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Oc2oVHDmZ-P9EUnuVTMEvwHaHa%26pid%3DApi&f=1&ipt=0d90c1fd57272997bbb612a388b0d00bf03578747963eba316d3a892ddb35cab&ipo=images",
  },
  {
    id: "28",
    name: "Wireless Gaming Controller",
    price: "₹349",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.FWfhSj1Q2jXGStu06Whj_gHaHa%26pid%3DApi&f=1&ipt=43f7723681b0a79d5f0ae342660e65056d72a3383b9873203c4ab2c56834d238&ipo=images",
  },
  {
    id: "29",
    name: "Foldable Laptop Table",
    price: "₹199",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.hikdHnNnTQs0mE8Z_MZB_QHaHa%26pid%3DApi&f=1&ipt=75465c26149a4e280e558a6ed0568eaacb176a1a5740ef146474d7790013c127&ipo=images",
  },
  {
    id: "30",
    name: "E-Book Reader",
    price: "₹699",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.KP-FBNP8vBS8-Cw8tuuw1AHaHZ%26pid%3DApi&f=1&ipt=321dd90ba285c1c3e732a1660b47e06626629ed85cb439d0e3dd4f737e1a03ee&ipo=images",
  },
  {
    id: "31",
    name: "Smart Water Bottle",
    price: "₹149",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.oWCeBnxMAfP_zFN2IaheugHaHa%26pid%3DApi&f=1&ipt=a09aed8da8a59b75c4a6fbe2124589aec9222dfaa8e66d6c7b32fcc1a7c779ae&ipo=images",
  },
  {
    id: "32",
    name: "Wireless Phone Charger Stand",
    price: "₹129",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.POfgiKDJQOPh-AgTusjaBQHaHa%26pid%3DApi&f=1&ipt=83e554a98c15aeaebc88cb59dfe231fd7fcd7e3c3132b5870c3e5b456187722d&ipo=images",
  },
];

export default function TradeScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products based on search query
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Available Products in your Gram</Text>

       {/* Search Bar */}
       <TextInput
        style={styles.searchBar}
        placeholder="Search products..."
        placeholderTextColor="#666"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
            </View>
            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Buy</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noResults}>No products found</Text>}
      />

      {/* Floating Button to Sell */}
      <TouchableOpacity
        style={styles.sellButton}
        onPress={() => console.log("Sell Button Pressed")}
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
    backgroundColor: "#E3F2FD", // Light Blue Background
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#1565C0", // Deep Blue Text
  },
  searchBar: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#90CAF9", // Light Blue Border
    marginBottom: 10,
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noResults: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
    marginTop: 20,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: "#1565C0", // Deep Blue
    marginTop: 4,
  },
  buyButton: {
    backgroundColor: "#1565C0", // Deep Blue
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buyButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  sellButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#1565C0", // Deep Blue
    padding: 15,
    borderRadius: 50,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

