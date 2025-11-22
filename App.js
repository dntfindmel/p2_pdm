import { useState } from 'react';
import { View, Text, Pressable, FlatList, TextInput } from 'react-native';
import styles from './assets/css/styles';

export default function App() {

  const listaAnos = [2024, 2023, 2022, 2021, 2020];
  const equipeDev = [
    { nome: 'Leonardo Alves', linkedin: 'https://www.linkedin.com/in/leonardo-alves-gomes-107239114', github: 'https://github.com/leagomes.com' },
    { nome: 'Melyssa Moya', linkedin: 'https://www.linkedin.com/in/melyssa-moya/', github: 'https://github.com/dntfindmel.com' }
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
        horizontal={true}
        data={equipeDev}
        renderItem={({ item }) =>
          <View style={{ marginRight: 20 }}>
            <Text>{item.nome}</Text>
            <Text>{item.linkedin}</Text>
            <Text>{item.github}</Text>
          </View>
        }
        keyExtractor={(item, index) => index.toString()}
      />

    </View>
  );
}