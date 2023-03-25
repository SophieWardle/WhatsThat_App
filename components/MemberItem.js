import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MemberItem = ({ member, navigation, chat_id }) => {
  return (
    <View style={styles.membersRow}>
      <Text>{member.first_name} {member.last_name}</Text>
      <View style={styles.deleteBtn}>
        <TouchableOpacity onPress={() => navigation.navigate("ContactProfile", { id: member.user_id })}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Profile</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.profileBtn}>
        <TouchableOpacity onPress={() => navigation.navigate("DeleteMember", { user_id: member.user_id, chat_id: chat_id })}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>X</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  membersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  profileBtn: {
    marginLeft: 10
  },
  button: {
    backgroundColor: '#f00',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default MemberItem;
