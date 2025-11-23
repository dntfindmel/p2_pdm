import React, { useEffect, useState } from 'react'
import { Pressable, Text, View, FlatList, Linking, Image, ActivityIndicator } from 'react-native'
import { TextInput } from 'react-native-web'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons'
import styles from './assets/css/styles';

export default function App() {

  const listaAnos = [2024, 2023, 2022, 2021, 2020];
  const equipeDev = [
    { nome: 'Leonardo Alves', linkedin: 'https://www.linkedin.com/in/leonardo-alves-gomes-107239114', instagram: 'https://instagram.com/leelep_', profileImage: './p2_pdm/assets/user.png'},
    { nome: 'Melyssa Moya', linkedin: 'https://www.linkedin.com/in/melyssa-moya/', instagram: 'https://instagram.com/dntfindmel', profileImage: './p2_pdm/assets/user.png'}
  ];

  const [pesquisa, setPesquisa] = useState("")
  const [apod, setApod] = useState(null)
  const [apodList, setApodList] = useState([]) 
  const [loadingApod, setLoadingApod] = useState(true)
  const [errorApod, setErrorApod] = useState(null)

  const BASE_URL = 'http://localhost:3000'

useEffect(() => {
  const formatDate = (d) => {
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }

  const fetchThreeDays = async () => {
    try {
      setLoadingApod(true)
      setErrorApod(null)

      const base = new Date()
      base.setDate(base.getDate() - 1) 

      const dates = [
        formatDate(new Date(base.getFullYear(), base.getMonth(), base.getDate())),       
        formatDate(new Date(base.getFullYear(), base.getMonth(), base.getDate() - 1)),   
        formatDate(new Date(base.getFullYear(), base.getMonth(), base.getDate() - 2))    
      ]

      const requests = dates.map(d =>
        fetch(`${BASE_URL}/getPOTD?date=${d}`)
          .then(r => {
            if (!r.ok) throw new Error('status ' + r.status)
            return r.json()
          })
          .catch(err => {
            console.warn('Erro ao buscar', d, err)
            return null
          })
      )

      const results = await Promise.all(requests)
      const valid = results.filter(Boolean)

      if (valid.length === 0) {
        throw new Error('Nenhuma imagem retornada')
      }

      setApodList(valid)
      setApod(valid[0]) 
    } catch (err) {
      console.error('Erro fetchThreeDays:', err)
      setErrorApod('Não foi possível carregar as imagens')
      const fallback = {
        url: 'file:///mnt/data/8de1bb2b-8b36-4a9c-90bc-7d4ea1622b9c.png',
        title: 'Fallback local',
        date: new Date().toISOString().slice(0,10),
        media_type: 'image'
      }
      setApod(fallback)
      setApodList([fallback])
    } finally {
      setLoadingApod(false)
    }
  }

  fetchThreeDays()
}, [])


  const fallbackLocalImage = 'file:///mnt/data/dc3e3a1f-2720-44b7-a513-ae5da6243913.png'

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.pageName}>Daily Nasa</Text>
      </View>

      <View style={styles.divider}></View>

      <Text style={styles.heading}>Fotos do Dia</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 8 }}>
        {apodList && apodList.length > 0 ? (
          apodList.map((item, idx) => (
            <View
              key={idx}
              style={{
                marginHorizontal: 6,
                borderWidth: 1,
                borderColor: '#ddd',
                padding: 4,
                borderRadius: 6,
              }}
            >
              <Image
                source={{ uri: item.url }}
                resizeMode="cover"
                style={{ width: 110, height: 75, borderRadius: 4 }}
                onError={(e) => console.warn('Erro miniatura', item.url, e.nativeEvent || e)}
              />
              <Text
                style={{
                  fontSize: 10,
                  textAlign: 'center',
                  marginTop: 4,
                  width: 100, 
                }}
              >
                {item.title}
              </Text>

              <Text
                style={{
                  fontSize: 10,
                  textAlign: 'center',
                  marginTop: 4,
                  width: 100,
                }}
              >
                {item.date}
              </Text>

            </View>
          ))
        ) : (
          <Text>Sem histórico disponível</Text>
        )}
      </View>


      <Text>Histórico de imagens</Text>

      <View style={styles.divider}></View>

      <View style={styles.searchArea}>
        <TextInput
          style={styles.searchInput}
          placeholder='Pesquisar imagens'
          onChangeText={(txt) => setPesquisa(txt)}
        />
      </View>

      <View>
        <Pressable style={styles.searchButton}>
          <Text>Buscar</Text>
        </Pressable>
      </View>

      <Text>Mostrando imagens sobre "{pesquisa}"</Text>

      <View>
        <Text>Aqui vão aparecer as imagens</Text>
      </View>

      <Text>Filtros</Text>

      <View style={styles.divider}></View>

      <View style={styles.yearList}>
        <FlatList
          horizontal={true}
          data={listaAnos}
          renderItem={({ item }) =>
            <Pressable style={styles.yearButton}>
              <Text>{item}</Text>
            </Pressable>
          }
          keyExtractor={(item) => item.toString()}
        />
      </View>

      <Pressable style={styles.yearButton}>
        <Text>2025</Text>
      </Pressable>

      <View style={styles.divider}></View>

      <Text style={styles.heading}>Desenvolvido por</Text>

      <FlatList
        data={equipeDev}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{ width: 140, marginRight: 15, alignItems: "center" }}>
            <FontAwesomeIcon icon={faUser} size={40} />
            <Text style={{ marginVertical: 8 }}>{item.nome}</Text>
            <View style={{ flexDirection: "row" }}>
              <Pressable onPress={() => Linking.openURL(item.linkedin)} style={{ marginRight: 10 }}>
                <FontAwesomeIcon icon={faLinkedinIn} size={25} />
              </Pressable>
              <Pressable onPress={() => Linking.openURL(item.instagram)}>
                <FontAwesomeIcon icon={faInstagram} size={25} />
              </Pressable>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
