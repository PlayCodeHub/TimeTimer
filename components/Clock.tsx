import { StyleSheet } from "react-native";

import { Text, View } from "./Themed";

export default function Clock({ size }: { size: number }) {
  const colorClock = "rgba(255,255,255,0.8)",
    colorNumber = "#000",
    colorCenter = "#000",
    colorHour = "#000";

  var lanHour = size / 8;

  const radius = 70;
  const remainingSeconds = 2400;
  const remainingSecondsPercentage = (remainingSeconds / (60 * 60)) * 100;
  const circleCircumfence = 2 * Math.PI * radius;
  const strokeDashOffSet =
    circleCircumfence - (circleCircumfence * remainingSecondsPercentage) / 100;

  return (
    <View
      style={[
        styles.clockBackground,
        {
          height: size,
          width: size,
          backgroundColor: colorClock,
          borderRadius: size / 2
        }
      ]}
    >
      {[...Array(12).keys()].map((i) => {
        let a = -60 + 30 * i;
        let b = 60 - 30 * i;

        return (
          <View
            key={i}
            style={[
              styles.numberBackground,
              {
                transform: [
                  { rotate: a + "deg" },
                  { translateX: size / 2 + 25 }
                ]
              }
            ]}
          >
            <Text
              style={[
                styles.numberText,
                {
                  color: colorNumber,
                  fontSize: size / 9,
                  transform: [{ rotate: b + "deg" }]
                }
              ]}
            >
              {(11 - i) * 5}
            </Text>
          </View>
        );
      })}
      <View
        style={[
          styles.middleCircle,
          {
            backgroundColor: colorCenter
          }
        ]}
      />
      <View
        style={[
          styles.clockHand,
          {
            width: lanHour,
            backgroundColor: colorHour,
            transform: [
              { rotate: -90 + strokeDashOffSet + "deg" },
              { translateX: lanHour / 2 }
            ]
          }
        ]}
      />
      {/* Lines */}
      {[...Array(60).keys()].map((i) => {
        let a = -60 + 6 * i;
        let b = 90;

        return (
          <View
            key={i}
            style={[
              styles.lineBackground,
              {
                transform: [
                  { rotate: a + "deg" },
                  { translateX: size / 2 - 15 }
                ]
              }
            ]}
          >
            <Text
              style={{
                color: colorNumber,
                fontSize: i % 5 === 0 ? size / 9 : size / 15,
                transform: [{ rotate: b + "deg" }]
              }}
            >
              I
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  clockBackground: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  numberBackground: {
    position: "absolute",
    backgroundColor: "none"
  },
  numberText: {
    fontWeight: "bold"
  },
  middleCircle: {
    zIndex: 1,
    width: 8,
    height: 8,
    borderRadius: 4
  },
  clockHand: {
    position: "absolute",
    height: 4,
    borderRadius: 4
  },
  lineBackground: {
    position: "absolute",
    backgroundColor: "none"
  }
});
