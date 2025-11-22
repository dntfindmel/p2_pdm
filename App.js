import { Pressable, Text, View, FlatList, Linking } from 'react-native'
import { useState } from "react";
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

  const [pesquisa, setPesquisa] = useState("");

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.pageName}>Daily Nasa</Text>
      </View>

      <View style={styles.divider}></View>

      <Text style={styles.heading}>Foto do Dia</Text>
      <Text>Aqui vai a imagem</Text>
      <Text>Nome da Imagem</Text>
      <Text>Descrição da Imagem</Text>
      <Text>Data da Imagem</Text>

      <Text>Histórico de imagens</Text>

      <View style={styles.divider}></View>

      <Text style={styles.heading}>Buscar Imagens</Text>
      <Text>Filtros</Text>

      <View style={styles.divider}></View>

      <Pressable style={styles.yearButton}>
        <Text>2025</Text>
      </Pressable>

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

      <View style={styles.searchArea}>
        <TextInput
          style={styles.searchInput}
          placeholder='Pesquisar imagens'
          onChangeText={(txt) => setPesquisa(txt)}
        />
        <Pressable style={styles.searchButton}>
          <Text>Buscar</Text>
        </Pressable>
      </View>

      <Text style={styles.heading}>Resultados da Busca</Text>
      <Text>Mostrando imagens sobre "{pesquisa}"</Text>

      <View>
        <Text>Aqui vão aparecer as imagens</Text>
      </View>

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