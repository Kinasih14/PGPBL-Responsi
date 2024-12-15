import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare, faStore } from '@fortawesome/free-solid-svg-icons';

const Createdata = () => {
  const jsonUrl = 'http://10.55.103.42:3000/sayur';
  const [toko, setToko] = useState('');
  const [kategori, setKategori] = useState('');
  const [alamat, setAlamat] = useState('');
  const [kontak, setKontak] = useState('');
  const [jam_buka, setJam_Buka] = useState('');
  const [foto, setFoto] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchData = () => {
    setLoading(true);
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => setDataUser(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshPage = () => {
    setRefresh(true);
    fetchData();
    setRefresh(false);
  };

  const submit = () => {
    if (!selectedUser || !selectedUser.id) {
      alert('Pilih data untuk diedit.');
      return;
    }

    const data = {
      toko,
        kategori,
        rating,
        ulasan,
        alamat,
        kontak,
        jam_buka,
        foto,
        keterangan,
    };

    fetch(`${jsonUrl}/${selectedUser.id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        alert('Data berhasil diperbarui');
        setToko('');
        setKategori('');
        setAlamat('');
        setKontak('');
        setJam_Buka('');
        setFoto('');
        setKeterangan('');
        setSelectedUser(null);
        refreshPage();
      })
      .catch((error) => {
        console.error(error);
        alert('Gagal memperbarui data');
      });
  };

  const selectItem = (item) => {
    setSelectedUser(item);
    setToko(item.toko);
    setKategori(item.kategori);
    setAlamat(item.alamat);
    setKontak(item.kontak);
    setJam_Buka(item.jam_buka);
    setFoto(item.foto);
    setKeterangan(item.keterangan);
    
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView>
     <View>
       {isLoading ? (
         <View style={{ alignItems: 'center', marginTop: 20 }}>
           <Text style={styles.cardtitle}>Loading...</Text>
         </View>
       ) : (
         <View>
            
           <View>
             <Text style={styles.title}>Edit Data Warung</Text>
             <View style={styles.form}>
               <TextInput style={styles.input} placeholder="Toko" value={toko} onChangeText={(value) => setToko(value)} />
               <TextInput style={styles.input} placeholder="Kategori" value={kategori} onChangeText={(value) => setKategori(value)} />
               <TextInput style={styles.input} placeholder="Alamat" value={alamat} onChangeText={(value) => setAlamat(value)} />
               <TextInput style={styles.input} placeholder="Kontak" value={kontak} onChangeText={(value) => setKontak(value)} />
               <TextInput style={styles.input} placeholder="Jam Buka" value={jam_buka} onChangeText={(value) => setJam_Buka(value)} />
               <TextInput style={styles.input} placeholder="Foto" value={foto} onChangeText={(value) => setFoto(value)} />
               <TextInput style={styles.input} placeholder="Keterangan" value={keterangan} onChangeText={(value) => setKeterangan(value)} />
               <Button title="Edit" style={styles.button} onPress={submit} />
             </View>
           </View>
           <View style={styles.devider}></View>
           
           <FlatList
             style={{ marginBottom: 10 }}
             data={dataUser}
             onRefresh={() => { refreshPage() }}
             refreshing={refresh}
             keyExtractor={({ id }, index) => id}
             renderItem={({ item }) => (
               <View>
                 <TouchableOpacity onPress={() => selectItem(item)}>
                   <View style={styles.card}>
                     <View style={styles.avatar}>
                       <FontAwesomeIcon icon={faStore} size={50} />
                     </View>
                     <View>
                       <Text style={styles.cardtitle}>{item.first_name} {item.last_name}</Text>
                       <Text>{item.kelas}</Text>
                       <Text>{item.gender}</Text>
                     </View>
                     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                       <FontAwesomeIcon icon={faPenToSquare} size={20} />
                     </View>
                   </View>
                 </TouchableOpacity>
               </View>
             )}
           />
           
         </View>
       )}
     </View>
   </SafeAreaView>
    </KeyboardAvoidingView>
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
    marginBottom: 10,
  },
  input: {
      borderWidth: 1,
      borderColor: '#777',
      borderRadius: 8,
      padding: 8,
      width: '100%',
      marginVertical: 5,
    },
    button: {
      marginVertical: 10,
    },
    avatar: {
      borderRadius: 100,
      width: 80,
    },
    cardtitle: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    card: {
        flexDirection: 'row',
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
        marginVertical: 7
      }
})     