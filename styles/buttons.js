import { StyleSheet } from "react-native"

const buttonStyles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    // eslint-disable-next-line no-dupe-keys
    fontWeight: 'bold',
  },
  buttonTextSmall: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    // eslint-disable-next-line no-dupe-keys
    fontWeight: 'bold',
  },
  button: {
	  backgroundColor: '#bbb5a7',
	  borderRadius: 5,
	  padding: 10,
  },
  backBtn: {
	  marginLeft: 10,
	  width: '40%',
  },
  searchBtn: {
    marginLeft: 10,
    width: '40%',
  },
  blockedBtn: {
    marginRight: 10,
    width: '40%',
  },
  deleteBtn: {
    marginLeft: 10,
  },
});

export default buttonStyles;