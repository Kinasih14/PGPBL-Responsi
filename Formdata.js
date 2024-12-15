import React, { useState, useEffect } from 'react'; 
import { SafeAreaView, Text, View, ScrollView, TextInput, Button, StyleSheet, Picker, Alert, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service'; // Ganti dengan Geolocation Service

const Createdata = () => {
  const jsonUrl = 'http://10.55.103.42:3000/sayur'; // API yang digunakan emulator untuk mengakses localhost komputer
  
  // State untuk menyimpan data formulir
  const [category, setCategory] = useState('Pengaduan');
  const [title, setTitle] = useState('');
  const [report, setReport] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState(null);

  // Mendapatkan izin lokasi (khusus Android)
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Izin Lokasi',
          message: 'Aplikasi ini memerlukan akses lokasi untuk mengisi koordinat.',
          buttonPositive: 'OK',
          buttonNegative: 'Batal',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  // Mendapatkan lokasi pengguna
  useEffect(() => {
    (async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        Alert.alert('Izin Lokasi Ditolak');
        return;
      }

      Geolocation.getCurrentPosition(
        (position) => {
          setLocation(position.coords);
        },
        (error) => {
          console.error(error);
          Alert.alert('Gagal mendapatkan lokasi', error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    })();
  }, []);

  // Fungsi untuk submit data
  const submit = () => {
    const data = {
      category,
      title,
      report,
      date,
      location,
    };

    fetch(jsonUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        alert('Data tersimpan');
        setTitle('');
        setReport('');
        setDate('');
        setCategory('Pengaduan');
        setLocation(null);
      })
      .catch((error) => {
        console.error('Error:', error);
        Alert.alert('Error', 'Gagal menyimpan data.');
      });
  };

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.title}>Isi Formulir Pengaduan</Text>
        <ScrollView style={styles.form}>
          {/* Kategori Pilihan */}
          <Picker
            selectedValue={category}
            style={styles.input}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            <Picker.Item label="Pengaduan" value="Pengaduan" />
            <Picker.Item label="Aspirasi" value="Aspirasi" />
            <Picker.Item label="Permintaan Informasi" value="Permintaan Informasi" />
          </Picker>

          {/* Input Judul Laporan */}
          <TextInput
            style={styles.input}
            placeholder="Judul Laporan"
            value={title}
            onChangeText={(value) => setTitle(value)}
          />

          {/* Input Isi Laporan */}
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Isi Laporan"
            value={report}
            onChangeText={(value) => setReport(value)}
            multiline
            numberOfLines={4}
          />

          {/* Input Tanggal Kejadian */}
          <TextInput
            style={styles.input}
            placeholder="Tanggal Kejadian (YYYY-MM-DD)"
            value={date}
            onChangeText={(value) => setDate(value)}
          />

          {/* Menampilkan Koordinat Lokasi */}
          <Text style={styles.locationText}>
            Lokasi: {location ? `Lat: ${location.latitude}, Long: ${location.longitude}` : 'Lokasi tidak tersedia'}
          </Text>

          {/* Tombol Simpan */}
          <Button title="Simpan" style={styles.button} onPress={submit} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Createdata;

const styles = StyleSheet.create({
  title: {
    paddingVertical: 12,
    backgroundColor: '#333',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    padding: 10,
    marginBottom: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 8,
    padding: 8,
    width: '100%',
    marginVertical: 5,
  },
  textArea: {
    height: 100,
  },
  locationText: {
    marginVertical: 10,
    fontStyle: 'italic',
    color: '#555',
  },
  button: {
    marginVertical: 10,
  },
});
