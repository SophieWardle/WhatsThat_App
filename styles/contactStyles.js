import { StyleSheet } from "react-native"

const contactStyles = StyleSheet.create({
    contactsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      contactName: {
        fontSize: 18
      },
      contactsContainer: {
        flex: 1,
      },
});

export default contactStyles;