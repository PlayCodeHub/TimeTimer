import { StyleSheet, TextInput } from 'react-native';

import { Text, View } from '../components/Themed';
import Layout from '../constants/Layout';
import { RootTabScreenProps } from '../types';
import { useEffect, useRef, useState } from 'react';
import CountdownNumberInput from '../components/CountdownNumberInput';
import Pie from '../components/pie';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const size = Layout.window.width - Layout.window.width / 10 * 3,
    showSeconds = false,
    colorClock = 'rgba(255,255,255,0.8)',
    colorNumber = '#000',
    colorCenter = '#000',
    colorHour = '#000',
    colorMinutes = 'rgba(255,255,255,0.7)',
    colorSeconds = 'red',
    autostart = false


    var lanHour = size / 6;
    var lanMinutes = size / 3.75;
    var lanSeconds = size / 3.75;

  const d = new Date();
  let seconds = d.getSeconds();
  let minutes = d.getMinutes();
  let hour = d.getHours();

  const radius = 70;
  const remainingSecondsPercentage = remainingSeconds / (60 * 60) * 100;
  const circleCircumfence = 2 * Math.PI * radius;
  const strokeDashOffSet = circleCircumfence - (circleCircumfence * remainingSecondsPercentage) / 100;

  const existingTimeout = useRef<NodeJS.Timeout>();

  // @todo can find a better way of counting down
  useEffect(() => {
    if (existingTimeout.current) {
      clearTimeout(existingTimeout.current);
    }
    if (remainingSeconds === 0) return;
    existingTimeout.current = setTimeout(() => setRemainingSeconds((second) => second - 1), 1000);
  }, [remainingSeconds])
  
  return (
    <View style={{
      flex: 1,
      backgroundColor: "rgba(255,255,255,0.3)",
      flexDirection: "column",
      justifyContent: "space-between"
    }}>
      <View>
        <CountdownNumberInput remainingSeconds={remainingSeconds} setRemainingSeconds={setRemainingSeconds} />
      </View>
      <View style={{
        flex: 1,
        justifyContent: "center"
      }}>
  <View
    style={{
      backgroundColor: colorClock,
      borderRadius: size / 2,
      justifyContent: 'center',
      alignItems: 'center',
      height: size,
      width: size,
      alignSelf: "center"
    }}>
    {[...Array(12).keys()].map((i) => {
      let a = -60 + 30 * i;
      let b = 60 - 30 * i;

      return (
        <View
        key={i}
          style={{
            position: 'absolute',
            transform: [
              { rotate: a + 'deg' },
              { translateX: size / 2 + 25 },
            ],
          }}>
          <Text
            style={{
              color: colorNumber,
              fontSize: size / 9,
              fontWeight: 'bold',
              transform: [{ rotate: b + 'deg' }],
            }}>
            { (11 - i)  * 5 }
          </Text>
        </View>
      );
    })}
    <View
      style={{
        zIndex: 1,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colorCenter,
      }}
    />
    <View
      style={{
        position: 'absolute',
        width: lanHour,
        height: 4,
        borderRadius: 4,
        backgroundColor: colorHour,
        transform: [
          { rotate: -90 + ( hour + (minutes / 12)) * 30 + 'deg' },
          { translateX: lanHour / 2 },
        ],
      }}
    />
    <View
      style={{
        position: 'absolute',
        width: lanMinutes,
        height: 4,
        borderRadius: 4,
        backgroundColor: colorMinutes,
        transform: [
          { rotate: -90 + minutes * 30 + 'deg' },
          { translateX: lanMinutes / 2 },
        ],
      }}
    />
    {showSeconds && (
      <View
        style={{
          position: 'absolute',
          width: lanSeconds,
          height: 2,
          borderRadius: 4,
          backgroundColor: colorSeconds,
          transform: [
            { rotate: -90 + seconds * 6 + 'deg' },
            { translateX: lanSeconds / 2 },
          ],
        }}
      />
    )}
{/* Lines */}
{[...Array(60).keys()].map((i) => {
      let a = -60 + 6 * i;
      let b = 90;

      return (
        <View
        key={i}
          style={{
            position: 'absolute',
            transform: [
              { rotate: a + 'deg' },
              { translateX: size / 2 - 15 },
            ],
          }}>
          <Text
            style={{
              color: colorNumber,
              fontSize: (i) % 5 === 0 ? size / 9 : size / 15,
              transform: [{ rotate: b + 'deg' }],
            }}>
            I
          </Text>
        </View>
      );
    })}
    <View
      style={{
        zIndex: 1,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colorCenter,
      }}
    />
    <View
      style={{
        position: 'absolute',
        width: lanHour,
        height: 4,
        borderRadius: 4,
        backgroundColor: colorHour,
        transform: [
          { rotate: -90 + ( hour + (minutes / 12)) * 30 + 'deg' },
          { translateX: lanHour / 2 },
        ],
      }}
    />
    <View
      style={{
        position: 'absolute',
        width: lanMinutes,
        height: 4,
        borderRadius: 4,
        backgroundColor: colorMinutes,
        transform: [
          { rotate: -90 + minutes * 30 + 'deg' },
          { translateX: lanMinutes / 2 },
        ],
      }}
    />
  </View>
  <Pie size={size} percentage={70} color={"rgb(199,17,46)"}/>  
  </View>

  <View>
    <Text>Bottom</Text>
  </View>
  </View>
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
