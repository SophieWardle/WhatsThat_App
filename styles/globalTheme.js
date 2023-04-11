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
  rowContainer: {
    flexDirection: 'row', // make the child components align horizontally
    justifyContent: 'center', // align child components with space in between
    paddingTop: 5, // add horizontal margin for spacing
     // add bottom margin for spacing
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
  //logo
  
  logo: {
    width: 100,
    height: 100,
  },
  logoTextContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  logoTextPrimary: {
    color: '#332724',
    fontSize: 24, 
    fontWeight: 'bold', 
    paddingTop: 5,
    paddingBottom: 5,
    textShadowColor: 'gray', // Set the text shadow color for the letters
    textShadowOffset: { width: 1, height: 1 }, // Set the text shadow offset for the letters
    textShadowRadius: 2, // Set the text shadow radius for the letters
  },
  logoTextSecondary: {
    color: '#8e7569',
    fontSize: 24, // Set the font size for the letters
    fontWeight: 'bold', // Set the font weight for the letters
    paddingTop: 5,
    paddingBottom: 5,
    
    
  },
});

export default globalStyle;
