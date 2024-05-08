/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ToastAndroid,
  Text,
  StatusBar,
  TextInput,
} from 'react-native';
import WarningModal from './components/WarningModal';
import Body from './components/Body';

import socketServices from './utils/socketService';
import { style } from 'd3';
import MashButton from './components/CustomButton';



const App = () => {
  const [humidities, setHumidities] = useState([0, 0]);
  const [waterLvl, setWaterLvl] = useState(0);
  const [connected, setConnected] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [ipAddress, setIpAddress] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [roomNameWarning, setRoomNameWarning] = useState('');

  // useEffect(() => {
  //   const SOCKET_URL = 'http://192.168.1.10:5000';
  //   console.log(`SOCKET_URL: ${SOCKET_URL}`);

    

  //   start_websocket()
  //     .catch(console.error);
  // },[]);

  const validateIP = (value) => {
    var re = /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/;
    if (!re.test(value)){
       setIsValid(false);
    } else {
       setIsValid(true);
    }
  };


  const start_websocket = async () => {

    const SOCKET_URL = `http://${ipAddress}:5000`;
    
    console.log('Initializing Socket');
    await socketServices.initializeSocket(SOCKET_URL);

    socketServices.on('connect', (data) => {
      console.log('=== socket connected ===');
        console.log(socketServices.socket.connected);
        setConnected(socketServices.socket.connected);
    });

    socketServices.on('disconnect', (data) => {
      console.log('=== socket disconnect ===');
      console.log(socketServices.socket.connected);
      setConnected(socketServices.socket.connected);
    });

    socketServices.on('humidity_data', (data) => {
      try
      {
        console.log(data);
        if(data.Room_A_Humidity >= 70)
        {
          setRoomNameWarning('Room A');
          setShowModal(true);
        }
        else if(data.Room_B_Humidity >= 70)
        {
          setRoomNameWarning('Room B');
          setShowModal(true);
        }
        setHumidities([data.Room_A_Humidity, data.Room_B_Humidity]);
      }
      catch (err)
      {
        console.error(err);
      }
    });

    socketServices.on('water_lvl_data', (data) => {
      try
      {
        console.log(data);
        setWaterLvl(data);
      }
      catch (err)
      {
        console.error(err);
      }
    });

    socketServices.on('error', (data) => {
      console.error('socket error', data);
    });

  };

  const connectToServer = () => {
    if(!connected)
    {
        start_websocket()
          .catch(console.error);
      }
      else 
      {
        socketServices.socket.disconnect();
        setIpAddress('');
        setConnected(false);
        setHumidities([0,0]);
        setWaterLvl(0);
        setIsValid(false);
      }
    }

  const closeWarningModal = () => {
    setShowModal(false);
    ToastAndroid.show('Warning closed.',
      ToastAndroid.LONG
    );
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignContent: 'center',
    }}>
      <View>
        <WarningModal
          closeWarningModal={closeWarningModal}
          showModal={showModal}
          setShowModal={setShowModal}
          roomNameWarning={roomNameWarning}
        />
        <StatusBar
          animated={true}
          backgroundColor="#456990"
        />
      </View>
      <View style={styles.header}>
        <View style={styles.header_seciton}>
          <Text style={styles.header_title}>
            UMIDBOT Monitoring
          </Text>
        </View>
      </View>
      <Body
        humidities={humidities}
        waterLvl={waterLvl}
      />
      <View style={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems:'center'
      }}>
        <View style={styles.row}>
          <View>
            <Text style={{color: '#000'}}>SERVER IP: {ipAddress}</Text>
            <TextInput
              style={styles.ip_input}
              value={ipAddress}
              onChangeText={value => {
                validateIP(value);
                setIpAddress(value)
              }}
              editable={(connected) ? false : true}
            />
          </View>
        </View>
        <View>
          <MashButton
            onPressFunction={connectToServer}
            title={"Connect"}
            isValid={isValid}
            connected={connected}
          />
        </View>
        <View>
          <Text style={
            {
              color: connected ? '#14960B' : '#f35',
            }
          }>
            {connected ? 'Connected' : 'Not Connected'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#456990',
    shadowColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 5,
  },
  header_seciton: {
    paddingBottom: 5,
  },
  header_title: {
    padding: 10,
    color: '#fff',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gauge_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    margin: 5,
  },
  input: {
    width: 200,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 15,
    textAlign: 'center',
    color: '#000',
  },
  ip_input: {
    width: 200,
    backgroundColor: '#fff',
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: 10,
    color: '#000',
  }
});

export default App;
