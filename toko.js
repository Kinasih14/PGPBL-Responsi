import React, { useState, useEffect } from 'react'; 
import { View, Text, FlatList, TouchableOpacity, Linking, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const Createdata = () => {
  const jsonUrl = 'http://10.55.103.42:3000/sayur'; // API URL
  
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // Flag to check if the component is still mounted

    const fetchData = async () => {
      try {
        const response = await fetch(jsonUrl);
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }
        const result = await response.json();
        if (isMounted) {
          setData(result); // Only set data if component is still mounted
          setLoading(false); // Set loading to false when data is fetched
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message); // Capture error message
          setLoading(false); // Set loading to false on error
        }
        console.error('Error fetching data:', err);
      }
    };

    fetchData();

    // Cleanup function to set isMounted to false
    return () => {
      isMounted = false;
    };
  }, [jsonUrl]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

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
              {/* Display image if available */}
              {item.foto && (
                <Image
                  source={{ uri: item.foto }}
                  style={styles.image}
                />
              )}
              
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="cart" size={30} color="green" />
              </View>
              
              <Text style={styles.toko}>Toko: {item.toko}</Text>
              <Text style={styles.kategori}>Kategori: {item.kategori}</Text>
              <Text style={styles.rating}>Rating: {item.rating}</Text>
              <Text style={styles.ulasan}>Ulasan: {item.ulasan}</Text>
              <Text style={styles.alamat}>Alamat: {item.alamat}</Text>
              <Text style={styles.kontak}>Kontak: {item.kontak}</Text>
              <Text style={styles.jam_buka}>Jam Buka: {item.jam_buka}</Text>
              <Text style={styles.keterangan}>Keterangan: {item.keterangan}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
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
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 10,
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
  keterangan: {
    fontSize: 14,
    marginBottom: 5,
  },
});
