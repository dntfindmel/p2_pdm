import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    marginTop: 20,
  },

  pageName: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 32,
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    width: '100%',
    paddingLeft: 10,
    marginTop: 10
  },

  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },

  yearList: {
    alignItems: 'center',
    marginVertical: 6,
        width: "70%",
  },

  yearButton: {
    borderWidth: 2,
    borderColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 6,
    borderRadius: 8,
    minWidth: 30,
    alignItems: 'center',
  },


  searchArea: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  searchButton: {
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    width: "70%",
    alignItems: "center",
  },

  searchInput: {
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5, 
    width: "70%",
    margin: 4,
    placeholderTextColor: "#666",
  },

    yearListContainer: {
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 10,
  },

  yearListWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },

});
