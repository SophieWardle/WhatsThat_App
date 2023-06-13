/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

function Button({
  onPress, title, buttonStyle, textStyle,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={buttonStyle}>
        <Text style={textStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
export default Button;
