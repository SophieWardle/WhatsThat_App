import { StyleSheet } from 'react-native';

const globalStyle = StyleSheet.create({
    //Login
    backgroundContainer: {
        backgroundColor: '#7eacac',
        flex: 1,
    },
    login: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      input: {
        height: 40,
        width: '70%',
        borderWidth: 2,
        borderColor: 'black',
      },
      error: {
        color: 'red'
      },
      header: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold'
      },
      loginbtn: {
        marginTop: 10,
      },
      signupbtn: {
        marginTop: 10,
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
      }
});

export default globalStyle;
