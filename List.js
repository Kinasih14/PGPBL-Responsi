import React, { useState, useEffect } from 'react'; 
import { View, Text, FlatList, TouchableOpacity, Linking, StyleSheet } from 'react-native';

const Createdata = () => {
  const jsonUrl = 'http://10.55.103.42:3000/sayur'; // API URL
  
  // State for storing data and form input
  const [data, setData] = useState([]);
  
  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(jsonUrl);
        if (!response.ok) {
          console.error('HTTP Error:', response.status, response.statusText);
        }
        const result = await response.json();
        console.log('Fetched Data:', result); // Debug log
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('google.navigation:q=' + item.location.latitude + ',' + item.location.longitude)
            }
          >
            <View style={styles.card}>
              <Text style={styles.toko}>Toko: {item.toko}</Text>
              <Text style={styles.kategori}>Kategori:{item.kategori}</Text>
              <Text style={styles.rating}>Rating: {item.rating}</Text>
              <Text style={styles.ulasan}>Ulasan: {item.ulasan}</Text>
              <Text style={styles.alamat}>Alamat: {item.alamat}</Text>
              <Text style={styles.kontak}>Kontak: {item.kontak}</Text>
              <Text style={styles.jam_buka}>Jam Buka: {item.jam_buka}</Text>
              <Text style={styles.foto}>Foto: {item.foto}</Text>
              <Text style={styles.keterangan}>Keterangan: {item.keterangan}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()} // Assuming each item has a unique 'id'
      />
    </View>
  );
};

export default Createdata;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    marginHorizontal: 20,
    marginVertical: 7,
  },
  toko: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  kategori: {
    fontSize: 14,
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    marginBottom: 5,
  },
  ulasan: {
    fontSize: 14,
    marginBottom: 5,
  },
  alamat: {
    fontSize: 14,
    marginBottom: 5,
  },
  kontak: {
    fontSize: 14,
    marginBottom: 5,
  },
  jam_buka: {
    fontSize: 14,
    marginBottom: 5,
  },
  foto: {
    fontSize: 14,
    marginBottom: 5,
  },
  keterangan: {
    fontSize: 14,
    marginBottom: 5,
  },
});
