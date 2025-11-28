import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, FlatList, Pressable, ScrollView, Linking } from "react-native";
import styles from "./assets/css/styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLinkedinIn, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function App() {

  const anos = [2025, 2024, 2023, 2022, 2021, 2020];

  const equipe = [
    {
      nome: "Leonardo Alves",
      linkedin: "https://www.linkedin.com/in/leonardo-alves-gomes-107239114",
      instagram: "https://instagram.com/leelep_"
    },
    {
      nome: "Melyssa Moya",
      linkedin: "https://www.linkedin.com/in/melyssa-moya/",
      instagram: "https://instagram.com/dntfindmel"
    }
  ];

  const [textoPesquisa, setTextoPesquisa] = useState("");
  const [listaApod, setListaApod] = useState([]);
  const [listaBusca, setListaBusca] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [anoEscolhido, setAnoEscolhido] = useState(null);

  const API = "http://localhost:3000";

  function formatarData(d) {
    const ano = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const dia = String(d.getDate()).padStart(2, "0");
    return ano + "-" + mes + "-" + dia;
  }

  useEffect(() => {
    buscarApod();
  }, []);

  async function buscarApod() {
    try {
      setCarregando(true);
      setErro(null);

      let diaBase = new Date();
      diaBase.setDate(diaBase.getDate() - 1);

      let datas = [
        formatarData(new Date(diaBase)),
        formatarData(new Date(diaBase.getFullYear(), diaBase.getMonth(), diaBase.getDate() - 1)),
        formatarData(new Date(diaBase.getFullYear(), diaBase.getMonth(), diaBase.getDate() - 2))
      ];

      let listaTemp = [];

      for (let i = 0; i < datas.length; i++) {
        try {
          let resposta = await fetch(API + "/getPOTD?date=" + datas[i]);
          if (resposta.ok) {
            let dado = await resposta.json();

            if (dado.media_type === "image") {
              listaTemp.push(dado);
            }
          }
        } catch (erro) {
          console.log("Erro na data:", datas[i]);
        }
      }

      if (listaTemp.length === 0) {
        setErro("Falha ao buscar imagens");
      }

      setListaApod(listaTemp);
    } catch (e) {
      setErro("Erro ao carregar os dados");
    } finally {
      setCarregando(false);
    }
  }

  async function buscarImagens() {
    try {
      setCarregando(true);
      setErro(null);

      let url = API + "/getImagesByYear?query=" + textoPesquisa;

      if (anoEscolhido) {
        url += "&startYear=" + anoEscolhido + "&endYear=" + anoEscolhido;
      } else {
        url += "&startYear=1900&endYear=2030";
      }

      let resposta = await fetch(url);

      if (!resposta.ok) {
        throw new Error("Erro na busca");
      }

      let dados = await resposta.json();
      setListaBusca(dados);

    } catch (erro) {
      setErro("Erro ao buscar imagens");
      setListaBusca([]);
    } finally {
      setCarregando(false);
    }
  }

  function escolherAno(ano) {
    setAnoEscolhido(ano);
    buscarImagens();
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>

      <View style={styles.header}>
        <Text style={styles.pageName}>Daily Nasa</Text>
      </View>

      <View style={styles.divider}></View>

      <Text style={styles.heading}>Fotos do Dia</Text>

      <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 10 }}>
        {listaApod.length > 0 ? (
          listaApod.map((item, i) => (
            <View key={i} style={{ marginHorizontal: 6, borderWidth: 1, padding: 4 }}>
              <Image source={{ uri: item.url }} style={{ width: 110, height: 75 }} />
              <Text style={{ fontSize: 10, textAlign: "center", marginTop: 4 }}>{item.title}</Text>
              <Text style={{ fontSize: 10, textAlign: "center" }}>{item.date}</Text>
            </View>
          ))
        ) : (
          <Text>Nenhuma imagem</Text>
        )}
      </View>

      <Text>Histórico de imagens</Text>
      <View style={styles.divider}></View>

      <View style={styles.searchArea}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar imagens"
          value={textoPesquisa}
          onChangeText={setTextoPesquisa}
        />

        <Pressable style={styles.searchButton} onPress={buscarImagens}>
          <Text>Buscar</Text>
        </Pressable>
      </View>

      <View style={styles.yearListContainer}>
        <View style={styles.yearListWrap}>
          {anos.map((ano) => (
            <Pressable
              key={ano}
              style={[
                styles.yearButton,
                ano === anoEscolhido ? { backgroundColor: "#ccc" } : null
              ]}
              onPress={() => escolherAno(ano)}
            >
              <Text>{ano}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <Text>Mostrando resultados para "{textoPesquisa}"</Text>

      <View style={{ width: "100%", padding: 10 }}>
        {listaBusca.length > 0 ? (
          <FlatList
            data={listaBusca}
            numColumns={2}
            keyExtractor={(item) => item.nasa_id}
            renderItem={({ item }) => (
              <View style={{ flex: 1, margin: 6, borderWidth: 1, padding: 8 }}>
                <Image source={{ uri: item.url }} style={{ width: "100%", height: 120 }} />

                <Text style={{ fontWeight: "bold", marginTop: 6, textAlign: "center" }}>
                  {item.title}
                </Text>

                <Text style={{ fontSize: 12, textAlign: "center", marginTop: 4 }}>
                  {item.description}
                </Text>
              </View>
            )}
          />
        ) : (
          <Text>Nenhum resultado encontrado</Text>
        )}
      </View>

      <View style={styles.containerHeading}>
        <Text style={[styles.heading, { textAlign: 'center', width: 'auto', paddingLeft: 0 }]}>
          Desenvolvido por
        </Text>
      </View>

      <FlatList
        data={equipe}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          paddingVertical: 10,
        }}
        renderItem={({ item }) => (
          <View style={{ width: 140, alignItems: "center", marginRight: 15 }}>
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
      />

    </ScrollView>
  );
}
