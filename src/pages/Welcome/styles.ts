import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121014',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28,
    marginBottom: 10,
  },

  input: {
    marginTop: 25,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    width: 250,
    padding: 4,
    fontSize: 18,
  },

  button: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#1474db',
    borderRadius: 10,
    marginTop: 40,
  },

  textButton: {
    color: '#fff',
    fontSize: 16,
  },
});

export default styles;
