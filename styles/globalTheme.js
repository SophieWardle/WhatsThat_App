import { StyleSheet } from 'react-native';

const globalStyle = StyleSheet.create({
  //Login
  backgroundContainer: {
    backgroundColor: '#f0ece3',
    flex: 1,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formInput: {
    height: 40,
    width: '70%',
    borderWidth: 2,
    borderColor: 'black',
  },
  errorMessage: {
    color: 'red'
  },
  formHeader: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  },
  loginBtn: {
    marginTop: 10,
  },
  signupBtn: {
    marginTop: 10,
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: 'linear-gradient(to right, #C56CD6, #342E37)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 3,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  },
  //SIGNUP
  signupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtn: {
    marginTop: 10,
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  },
  //Chats screen
  chatsButton: {
    margin: 5,
    backgroundColor: '#bbb5a7',
    borderRadius: 5,
    padding: 8,
  },
  chatsBtnText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  //profile update screen
  profileEditContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //confirm component
  confirmContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
});

export default globalStyle;
