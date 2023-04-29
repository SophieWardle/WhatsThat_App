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
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
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
  //PROFILE
  profileContainer: {
    margin: 5,
    flex: 1,
    backgroundColor: '#f0ece3',
    justifyContent: 'center'
  },
  profileInformation: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    textAlign: 'center'
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  profileButton: {
    backgroundColor: '#bbb5a7',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  //chat display screen
  chatName: {
    flexDirection: 'row',
    backgroundColor: '#bbb5a7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    top: 0,
  },
  buttonContainer: {
    padding: 5,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  detailsBtn: {
    marginRight: 10,
  },
  backButton: {
    marginRight: 10,
  },
  chatDisplayBtn: {
    backgroundColor: '#bbb5a7',
    borderRadius: 5,
    padding: 10,
  },
  chatNameText: {
    flex: 1,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  sendMessage: {
    bottom: 0,
    position: 'absolute',
    width: '100%',
    backgroundColor: '#bbb5a7',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chatInput: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    fontSize: 16,
    marginRight: 10,
  },
  sendButtonText: {

  },
  //chat details
  chatCreatorContainer: {

  },
  chatCreatorDetails: {
    textAlign: 'center',
  },
  chatCreatorHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  editBtn: {
    backgroundColor: '#bbb5a7',
    marginRight: 10,
    borderRadius: 5,
    padding: 4,

  },
  addBtn: {
    backgroundColor: '#bbb5a7',
    marginLeft: 10,
    borderRadius: 5,
    padding: 4,
  },
  chatMembers: {
    flex: 1,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: '#bbb5a7'
  },
  chatMembersHeader: {
    fontWeight: 'bold',
  },
  deleteBtn: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: '#bbb5a7',
    width: '50%',
    borderRadius: 5,
    padding: 4,
  },
  chatDetailsContainer: {
    flex: 1,
  },
  updateChatForm: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  draftMsgContainer: {
    flex: 1,
    backgroundColor: '#f0ece3',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  textInput: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 16,
    padding: 8,
  },
  //New chat screen
  chatNewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtn: {
    backgroundColor: '#bbb5a7',
    marginTop: 10,
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  },
  createBtn: {
    backgroundColor: '#bbb5a7',
    marginTop: 10,
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  },
  //DRAFTS
  draftContainer: {
    flex: 1,
    marginBottom: 16,
  },
  draftTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  draftContent: {
    fontSize: 16,
    color: 'gray',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
  openBtn: {
    marginLeft: 0,
  },
  pageHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  confirmText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
  },
  confirmTextName: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 20,
  },
  noBtn: {
    backgroundColor: '#bbb5a7',
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    width: '40%',
    marginTop: 10,
  },
  yesBtn: {
    backgroundColor: '#bbb5a7',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginRight: 10,
    width: '40%',
  },
  deleteConfirmContainer: {
    padding: 10,
    marginTop: 10
  },
  deleteContainer: {
    padding: 10,
    marginTop: 10
  },
  confirmButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  blockContainer:{
    padding: 10,
    marginTop: 10
  },
  blockConfirmContainer: {
    padding: 10,
    marginTop: 10
  }


});

export default globalStyle;
