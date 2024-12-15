import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapLibreGL from '@maplibre/maplibre-react-native';

MapLibreGL.setConnected(true);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    flex: 1,
    alignSelf: 'stretch',
  },
});

export default class App extends Component {
  state = {
    mahasiswaData: [],
  };

  componentDidMount() {
    fetch('http://192.168.8.101:3000/mahasiswa')
      .then((response) => response.json())
      .then((data) => {
        const cleanedData = data.map((mahasiswa) => {
          const latitude = parseFloat(mahasiswa.latitude);
          const longitude = parseFloat(mahasiswa.longitude);
          if (isNaN(latitude) || isNaN(longitude)) {
            console.warn(`Invalid coordinates for ID: ${mahasiswa.id}`);
          }
          return { ...mahasiswa, latitude, longitude };
        });
        console.log('Cleaned Data:', cleanedData);
        this.setState({ mahasiswaData: cleanedData });
      })
      .catch((error) => console.error('Error fetching data:', error));
  }

  render() {
    const { mahasiswaData } = this.state;

    return (
      <View style={styles.page}>
        <MapLibreGL.MapView
          style={styles.map}
          logoEnabled={false}
          styleURL="https://api.maptiler.com/maps/openstreetmap/style.json?key=z52tCgMGETEry417QpMQ"
          centerCoordinate={[110.4283482, -7.625758]} // Fokus pada lokasi Anastashia
          zoomLevel={10} // Atur zoom level agar marker terlihat
        >
          {mahasiswaData
            .filter(
              (mahasiswa) =>
                typeof mahasiswa.latitude === 'number' &&
                typeof mahasiswa.longitude === 'number'
            )
            .map((mahasiswa) => (
              <MapLibreGL.PointAnnotation
                key={mahasiswa.id}
                id={mahasiswa.id}
                coordinate={[mahasiswa.longitude, mahasiswa.latitude]}
              >
                
              </MapLibreGL.PointAnnotation>
            ))}

          {/* Marker Statis untuk Pengujian */}
          <MapLibreGL.PointAnnotation
            id="static-marker"
            coordinate={[110.4283482, -7.625758]}
          >
            
          </MapLibreGL.PointAnnotation>
        </MapLibreGL.MapView>
      </View>
    );
  }
}
