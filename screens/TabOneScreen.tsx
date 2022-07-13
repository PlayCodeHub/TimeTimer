import { View } from "../components/Themed";
import Layout from "../constants/Layout";
import { useEffect, useRef, useState } from "react";
import CountdownNumberInput from "../components/CountdownNumberInput";
import Clock from "../components/Clock";
import Pie from "../components/pie";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import TimerNameInput from "../components/TimerNameInput";

export default function TabOneScreen() {
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [pause, setPause] = useState(true);
  const [minutesInput, setMinutesInput] = useState("0");
  const [timerName, setTimerName] = useState("Timer");

  const size = Layout.window.width - (Layout.window.width / 10) * 3;
  const existingTimeout = useRef<NodeJS.Timeout>();
  const piePercentage = (remainingSeconds / (60 * 60)) * 100;

  const isDisablePlayButton = remainingSeconds === 0;

  const onRestartPress = () => {
    setPause(true);
    setRemainingSeconds(Number(minutesInput) * 60);
  };

  // @todo can find a better way of counting down
  useEffect(() => {
    if (pause) return;
    if (existingTimeout.current) {
      clearTimeout(existingTimeout.current);
    }
    if (remainingSeconds === 0) {
      return;
    }
    existingTimeout.current = setTimeout(
      () => setRemainingSeconds((second) => second - 1),
      1000
    );
  }, [remainingSeconds, pause]);

  useEffect(() => {
    if (pause) {
      clearTimeout(existingTimeout.current);
    }
  }, [pause]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(255,255,255, 1)",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <View>
        <TimerNameInput timerName={timerName} setTimerName={setTimerName} />
      </View>
      <View>
        <CountdownNumberInput
          remainingSeconds={remainingSeconds}
          setRemainingSeconds={setRemainingSeconds}
          minutesInput={minutesInput}
          setMinutesInput={setMinutesInput}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center"
        }}
      >
        <Clock size={size} />
        <Pie size={size} percentage={piePercentage} color={"rgb(199,17,46)"} />
      </View>

      <View
        style={{
          alignSelf: "center",
          minWidth: "20%",
          height: "20%",
          justifyContent: "center",
          flexDirection: "row"
        }}
      >
        <FontAwesome.Button
          onPress={() => setPause((pause) => !pause)}
          name={pause ? "play" : "pause"}
          size={60}
          color={Colors.dark.text}
          backgroundColor={isDisablePlayButton ? "grey" : "red"}
          borderRadius={1000}
          style={{
            height: "60px",
            justifyContent: "center"
          }}
          disabled={isDisablePlayButton}
          iconStyle={{
            // marginLeft: "17%",
            margin: "0 30 0 30"
          }}
        />

        <FontAwesome.Button
          onPress={onRestartPress}
          name={"rotate-right"}
          size={50}
          color={Colors.light.text}
          backgroundColor={"#fff"}
          borderRadius={1000}
          style={{
            height: "66px",
            justifyContent: "center"
          }}
          disabled={isDisablePlayButton}
          iconStyle={
            {
              // marginLeft: "17%",
              // margin: "0 30 0 30"
            }
          }
        />
      </View>
    </View>
  );
}
