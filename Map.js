import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  PermissionsAndroid,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import MapLibreGL from '@maplibre/maplibre-react-native';
import Geolocation from 'react-native-geolocation-service';

MapLibreGL.setAccessToken(null);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warung: [],
      userLocation: null,
      newMarkerLocation: null,
      isFormVisible: false,
      isPopupVisible: false,
      popupData: null,
      formData: {
        id: '',
        toko: '',
        kategori: '',
        rating: '',
        ulasan: '',
        alamat: '',
        kontak: '',
        jam_buka: '',
        foto: '',
        keterangan: '',
        location: {
          latitude: null,
          longitude: null,
        },
      },
    };
  }

  // Mendapatkan lokasi pengguna
  async getUserLocation() {
    try {
      if (Platform.OS === 'android') {
        const hasLocationPermission = await this.requestAndroidPermission();
        if (!hasLocationPermission) {
          Alert.alert('Permission Denied', 'Permission to access location was denied');
          return;
        }
      }

      Geolocation.getCurrentPosition(
        (position) => {
          this.setState({ userLocation: position.coords });
        },
        (error) => {
          console.error('Error getting location:', error);
          Alert.alert('Error', 'Failed to get user location');
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Failed to get user location');
    }
  }

  // Android permissions request
  async requestAndroidPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location to show the map.',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  componentDidMount() {
    this.getUserLocation();
    this.fetchMarkers();
  }

  // Fungsi pengambilan data dari API
  fetchMarkers = async () => {
    try {
      const response = await fetch('http://10.55.103.42:3000/sayur');
      if (!response.ok) {
        throw new Error('Failed to fetch markers');
      }
      const data = await response.json();
      const cleanedData = data.map((sayur) => ({
        ...sayur,
        latitude: parseFloat(sayur.location.latitude),
        longitude: parseFloat(sayur.location.longitude),
      }));
      this.setState({ warung: cleanedData });
    } catch (error) {
      console.error('Error fetching markers:', error);
      Alert.alert('Error', 'Failed to load markers from API.');
    }
  };

  // Method to handle map press for new marker
  onMapPress = (e) => {
    const coordinates = e.geometry?.coordinates;

    if (Array.isArray(coordinates)) {
      const longitude = parseFloat(coordinates[0]);
      const latitude = parseFloat(coordinates[1]);

      // Validasi koordinat
      if (isNaN(longitude) || isNaN(latitude)) {
        Alert.alert('Error', 'Invalid coordinates. Please try again.');
        return;
      }

      this.setState({
        newMarkerLocation: { longitude, latitude },
        isFormVisible: true,
        formData: {
          id: '',
          toko: '',
          kategori: '',
          alamat: '',
          kontak: '',
          jam_buka: '',
          foto: '',
          keterangan: '',
          location: { latitude, longitude },
        },
      });

      console.log('New marker coordinates:', longitude, latitude);
    } else {
      console.error('Invalid coordinates:', coordinates);
      Alert.alert('Error', 'Failed to retrieve coordinates.');
    }
  };

  // Fungsi untuk menyimpan marker baru ke API
  saveNewMarker = async () => {
    const { formData } = this.state;

    // Pastikan tidak ada field kosong
    const requiredFields = [
      'toko', 'kategori', 'ulasan', 'alamat', 
      'kontak', 'jam_buka', 'foto', 'keterangan'
    ];

    // Cek apakah ada field yang kosong
    for (let field of requiredFields) {
      // Pastikan field tidak kosong atau hanya berisi spasi
      if (!formData[field] || formData[field].trim() === '') {
        Alert.alert('Error', `Please fill in the ${field} field before saving.`);
        return;
      }
    }

    const latitude = parseFloat(formData.location.latitude);
    const longitude = parseFloat(formData.location.longitude);

    if (isNaN(latitude) || isNaN(longitude)) {
      Alert.alert('Error', 'Invalid coordinates. Please check the location.');
      return;
    }

    // Update formData dengan nilai konversi
    const updatedFormData = {
      ...formData,
      location: { latitude, longitude },
    };

    console.log('Saving marker with data:', updatedFormData);

    try {
      const response = await fetch('http://10.55.103.42:3000/sayur', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) {
        throw new Error('Failed to save marker');
      }

      const newMarker = await response.json();

      // Refresh data dari server
      this.fetchMarkers();

      this.setState({
        isFormVisible: false,
        newMarkerLocation: null,
      });

      Alert.alert('Success', 'Marker has been saved successfully!');
    } catch (error) {
      console.error('Error saving marker:', error);
      Alert.alert('Error', 'Failed to save marker.');
    }
  };

  // Fungsi untuk merender marker
  renderMarkers() {
    const { warung } = this.state;

    return warung.map((sayur) => {
      const longitude = parseFloat(sayur.longitude);
      const latitude = parseFloat(sayur.latitude);

      if (isNaN(longitude) || isNaN(latitude)) {
        console.warn(`Invalid coordinates for marker ID: ${sayur.id}`);
        return null; // Skip invalid markers
      }

      return (
        <MapLibreGL.PointAnnotation
          key={sayur.id}
          id={String(sayur.id)}
          coordinate={[longitude, latitude]}
          onPress={() => this.showPopup(sayur)}
        />
      );
    });
  }

  // Menampilkan popup untuk menampilkan nama toko dan foto
  renderPopup() {
    const { selectedMarker } = this.state;
  
    if (!selectedMarker) return null; // Don't show popup if no marker is selected
  
    return (
      <Modal visible={true} transparent={true} animationType="fade">
        <View style={styles.popupContainer}>
          <Text style={styles.popupTitle}>{selectedMarker.toko}</Text>
          {selectedMarker.foto && (
            <Image
              source={{ uri: selectedMarker.foto }}
              style={styles.popupImage}
            />
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => this.setState({ selectedMarker: null })}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  render() {
    const { isFormVisible, formData, isPopupVisible, popupData } = this.state;

    return (
      <View style={styles.page}>
        <MapLibreGL.MapView
          style={styles.map}
          logoEnabled={false}
          styleURL={`https://api.maptiler.com/maps/streets-v2/style.json?key=z52tCgMGETEry417QpMQ`}
          onPress={this.onMapPress}
        >
          <MapLibreGL.Camera zoomLevel={9} centerCoordinate={[110.3691, -7.7462]} />
          {this.renderMarkers()}
        </MapLibreGL.MapView>

        {/* Form untuk input data marker */}
        <Modal visible={isFormVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Tambah Warung Sayur Baru</Text>
            <TextInput
              style={styles.input}
              placeholder="id"
              value={formData.id}
              onChangeText={(text) => this.setState({ formData: { ...formData, id: text } })}
            />
            <TextInput
              style={styles.input}
              placeholder="Toko"
              value={formData.toko}
              onChangeText={(text) => this.setState({ formData: { ...formData, toko: text } })}
            />
            <TextInput
              style={styles.input}
              placeholder="Kategori"
              value={formData.kategori}
              onChangeText={(text) => this.setState({ formData: { ...formData, kategori: text } })}
            />
            <TextInput
              style={styles.input}
              placeholder="Alamat"
              value={formData.alamat}
              onChangeText={(text) => this.setState({ formData: { ...formData, alamat: text } })}
            />
            <TextInput
              style={styles.input}
              placeholder="Kontak"
              value={formData.kontak}
              onChangeText={(text) => this.setState({ formData: { ...formData, kontak: text } })}
            />
            <TextInput
              style={styles.input}
              placeholder="Jam Buka"
              value={formData.jam_buka}
              onChangeText={(text) => this.setState({ formData: { ...formData, jam_buka: text } })}
            />
            <TextInput
              style={styles.input}
              placeholder="Foto"
              value={formData.foto}
              onChangeText={(text) => this.setState({ formData: { ...formData, foto: text } })}
            />
            <TextInput
              style={styles.input}
              placeholder="Keterangan"
              value={formData.keterangan}
              onChangeText={(text) => this.setState({ formData: { ...formData, keterangan: text } })}
            />

            {/* Other form fields... */}
            <TouchableOpacity style={styles.saveButton} onPress={this.saveNewMarker}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => this.setState({ isFormVisible: false })}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* Popup untuk menampilkan nama toko dan foto */}
        <Modal visible={isPopupVisible} animationType="fade" transparent>
          <View style={styles.popupContainer}>
            <Text style={styles.popupTitle}>{popupData?.toko}</Text>
            {popupData?.foto ? (
              <Image source={{ uri: popupData.foto }} style={styles.popupImage} />
            ) : (
              <Text>No photo available</Text>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={this.closePopup}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  map: {
    flex: 1,
    alignSelf: 'stretch',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    width: '85%',
    marginBottom: 15,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: '#58c7ff',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'left',
    justifyContent: 'left',
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#ff5c5c',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'right',
    justifyContent: 'right',
  },
  cancelButtonText: {
    color: '#fff',
    textAlign: 'right',
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  popupContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    marginTop: '20%',
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  popupImage: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});
