/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-undef */
import React from 'react';
import {
StyleSheet,
View,
Text,
} from 'react-native';
import { LiquidGauge } from 'react-native-liquid-gauge';

const Body = (props) => {
   const {humidities, waterLvl} = props;

   return(
      <View style={styles.body}>
        <View style={styles.row}>
          <View style={styles.gauge_container}>
            <LiquidGauge value={humidities[0]} />
            <View style={{alignItems: 'center'}}>
              <Text style={{...styles.text, color: '#0073BA'}}>Room A Humidity</Text>
            </View>
          </View>
          <View style={styles.gauge_container}>
            <LiquidGauge value={humidities[1]} />
            <View style={{alignItems: 'center'}}>
              <Text style={{...styles.text, color: '#0073BA'}}>Room B Humidity</Text>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.gauge_container}>
            <LiquidGauge
              value={waterLvl}
              config={{
                circleThickness: 0.2,
                circleColor: '#2082BF',
                textColor: '#67BAEE',
                waveTextColor: '#fff',
                waveColor: '#045689',
                textVertPosition: 0.52,
                waveAnimateTime: 2000,
                waveHeight: 0.1,
                waveAnimate: true,
                waveCount: 2,
                waveOffset: 0.25,
                textSize: 1.2,
                textSuffix: 'L',
                minValue: 10,
                maxValue: 150,
              }}
            />
            <View style={{alignItems: 'center'}}>
              <Text style={{...styles.text, color: '#67BAEE'}}>
                Water Level
              </Text>
            </View>
          </View>
            {/* <View style={styles.gauge_container}>
              <LiquidGauge
                config={{
                  circleColor: '#E1BA22',
                  textColor: '#7B6300',
                  waveTextColor: '#FFFFFF',
                  waveColor: '#FDDB52',
                  circleThickness: 0.1,
                  waveHeight: 0,
                  waveAnimate: true,
                  waveAnimateTime: 1000,
                }}
                value={50}
              />
              <View style={{alignItems: 'center'}}>
                <Text style={{...styles.text, color: '#E1BA22'}}>Battery</Text>
              </View>
            </View> */}
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
});

export default Body;
