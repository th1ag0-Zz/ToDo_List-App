import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  taskContainer: {
    backgroundColor: '#1f1e25',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textTask: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  checkBox: {
    borderRadius: 5,
    width: 32,
    height: 32,
    borderWidth: 2,
    borderColor: '#666',
    backgroundColor: '#1f1e25',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
