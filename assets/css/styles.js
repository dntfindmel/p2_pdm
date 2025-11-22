import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
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
    marginVertical: 10,
  },

  yearButton: {
    borderWidth: 2,
    borderColor: '#000',
    padding: 6,
    margin: 4,
    borderRadius: 8,
  },

  searchArea: {
    flexDirection: 'row',
    width: '95%',
    alignItems: 'center'
  },

  searchInput: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 6,
    margin: 4,
    flex: 1,
  },

  searchButton: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 6,
    margin: 4,
  },
});
