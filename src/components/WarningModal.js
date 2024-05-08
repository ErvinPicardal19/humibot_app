/* eslint-disable prettier/prettier */
import React from 'react';
import {
   StyleSheet,
   Modal,
   View,
   Text,
   Pressable,
} from 'react-native';

const WarningModal = (props) => {
   const {closeWarningModal, showModal, setShowModal, roomNameWarning} = props;

   return(
      <Modal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        transparent
      >
        <View style={styles.centered_view}>
          <View style={styles.warning_modal}>
            <View style={styles.row}>
              <View style={styles.warning_title_section}>
                <Text style={styles.warning_title_text}>NOTICE</Text>
              </View>
            </View>
            <View style={styles.warning_message_section}>
              <Text style={styles.warning_message_text}>{roomNameWarning} has exceeded 70% humidity</Text>
            </View>
            <View style={styles.row}>
              <Pressable
                onPress={closeWarningModal}
                hitSlop={{top: 10, bottom: 10, right: 10, left: 10}}
                android_ripple={{color:'#999', radius: 10}}
                style={styles.warning_button}
              >
                <Text style={styles.warning_title_text}>
                  CLOSE
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
   );
};

const styles = StyleSheet.create({
   centered_view: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#00000022',
    },
    warning_modal: {
      width: 300,
      height: 300,
      backgroundColor: '#fff',
      alignItems: 'center',
      borderRadius: 15,
    },
    row: {
      flexDirection: 'row',
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
    },
    warning_title_section: {
      flex: 2,
      height: 50,
      backgroundColor: '#f35',
      alignContent: 'center',
      justifyContent: 'center',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    warning_title_text: {
      color: '#fff',
      textAlign: 'center',
    },
    warning_message_section: {
      flex: 4,
      alignContent: 'center',
      justifyContent: 'center',
    },
    warning_button: {
      flex: 1,
      backgroundColor: '#14960B',
      padding: 10,
      borderBottomRightRadius: 15,
      borderBottomLeftRadius: 15,
    },
    warning_message_text: {
      color: '#222',
      fontSize: 14,
    },
});

export default WarningModal;
