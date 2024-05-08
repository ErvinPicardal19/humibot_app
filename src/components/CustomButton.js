/* eslint-disable prettier/prettier */

import React from 'react';
import {
   Pressable,
   StyleSheet,
   Text,
} from 'react-native';

const MashButton = (props) => {
  const {onPressFunction, title, connected, isValid} = props

   return (
      <Pressable
        onPress={onPressFunction}
        hitSlop={{top: 10, bottom: 10, right: 10, left: 10}}
        android_ripple={{color:'#999', radius: 10}}
        style={({pressed}) => [
          {backgroundColor: (connected) ? '#f35' : (isValid) ? '#0F0' : '#ddd'},
          styles.button,
        ]}
        disabled={(isValid || connected) ? false : true}
      >
        <Text style={styles.buttonText}>
            {connected ? "Disconnect" : "Connect"}
        </Text>
      </Pressable>
   );
};

const styles = StyleSheet.create({
   buttonText: {
      color: '#000',
      fontSize: 15,
    },
    button: {
      margin: 10,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderRadius: 10,
      width: 100,
      // backgroundColor: '#0F0',
    },
});

export default MashButton;

