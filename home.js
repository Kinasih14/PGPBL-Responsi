import React from 'react';
import { SafeAreaView, ScrollView, View, Text, Button, StyleSheet, Image, ImageBackground, FlatList, TouchableOpacity, Linking } from 'react-native';

// Mock data for warung locations
const warungLocations = [
  {
    id: '1',
    title: 'Toko Sayur',
    link: 'https://maps.app.goo.gl/GjvLE1C72EvuDgKq6',
    image: require('./assets/sayur.jpg'),
  },
  {
    id: '2',
    title: 'Dewi Sembako dan Sayur',
    link: 'https://maps.app.goo.gl/LM8frebu8knVFtXdA',
    image: require('./assets/sembako.jpg'),
  },
  {
    id: '3',
    title: 'Gudang Sayur by NAWAPARI',
    link: 'https://maps.app.goo.gl/7tKuPCjA4dzLAh8V8',
    image: require('./assets/nawapari.jpg'),
  },
];

const MainPage = ({ navigation }) => {
  const handleNavigation = (link) => {
    Linking.openURL(link).catch((err) => console.error('Failed to open URL:', err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={require('./assets/bg_vegie.jpg')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.headerContainer}>
          <Image
            source={require('./assets/agriSale.png')} // Replace with your image
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.title}>AgriGo!</Text>
          <Text style={styles.description}>
            Aplikasi Jual Jasa Penjualan Sayur Segar dari Petani Lokal Secara Real-Time!
          </Text>
        </View>

        {/* Horizontal Scrollable Warung Locations */}
        <FlatList
          data={warungLocations}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleNavigation(item.link)}
            >
              <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
              <Text style={styles.warungName}>{item.title}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 50,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 20,
    color: '#007BFF',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 180, // Adjusted width
    height: 220, // Adjusted height
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  cardImage: {
    width: 140,
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  warungName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
});

export default MainPage;
