import { StyleSheet } from "react-native"

const formStyles = StyleSheet.create({
    formContainer: {
        backgroundColor: '#dbd4cd',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    formHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    formInput: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});

export default formStyles;