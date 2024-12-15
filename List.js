import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert,
  Button,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStore, faMapMarkerAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

const Createdata = ({ navigation }) => {
  const jsonUrl = 'http://10.55.103.42:3000/sayur'; // Ganti dengan URL API Anda
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mengambil data dari API saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(jsonUrl);
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  // Fungsi untuk menghapus data
  const handleDelete = (id) => {
    Alert.alert('Hapus data', 'Yakin akan menghapus data ini?', [
      { text: 'Tidak', onPress: () => console.log('button tidak') },
      { text: 'Ya', onPress: () => deleteData(id) },
    ]);
  };

  // Fungsi untuk menghapus data dari API dan state
  const deleteData = async (id) => {
    try {
      const response = await fetch(`${jsonUrl}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Failed to delete item: ${response.status}`);
      }
      setData(data.filter(item => item.id !== id)); // Remove deleted item from state
    } catch (err) {
      alert(err.message);
    }
  };


  // Fungsi untuk render setiap item dalam list
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item?.foto || 'https://via.placeholder.com/150' }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.toko}>
        <FontAwesomeIcon icon={faStore} color="#2e7d32" /> {item?.toko || 'Tidak tersedia'}
      </Text>
      <Text style={styles.kategori}>Kategori: {item?.kategori || 'Tidak tersedia'}</Text>
      <Text style={styles.rating}>Rating: {item?.rating || 'Tidak tersedia'}</Text>
      <Text style={styles.ulasan}>Ulasan: {item?.ulasan || 'Tidak tersedia'}</Text>
      <Text style={styles.alamat}>Alamat: {item?.alamat || 'Tidak tersedia'}</Text>
      <Text style={styles.kontak}>Kontak: {item?.kontak || 'Tidak tersedia'}</Text>
      <Text style={styles.jam_buka}>Jam Buka: {item?.jam_buka || 'Tidak tersedia'}</Text>
      <Text style={styles.keterangan}>Keterangan: {item?.keterangan || 'Tidak tersedia'}</Text>

      <View style={styles.buttonContainer}>
        {/* Tombol untuk melihat lokasi */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (item?.location?.latitude && item?.location?.longitude) {
              Linking.openURL(
                `https://www.google.com/maps?q=${item.location.latitude},${item.location.longitude}`
              );
            } else {
              alert('Lokasi tidak tersedia');
            }
          }}
        >
          <Text style={styles.buttonText}>
            <FontAwesomeIcon icon={faMapMarkerAlt} color="white" /> Lihat Lokasi
          </Text>
        </TouchableOpacity>

        {/* Tombol Hapus dengan Alert */}
        <Button 
          title="Hapus"
          onPress={() => handleDelete(item.id)} // Panggil handleDelete
          color={'red'}
        />

      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Toko Sayur</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Createdata;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f1f8f6',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#2e7d32',
  },
  card: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#e6f7ec',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  toko: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
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
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
