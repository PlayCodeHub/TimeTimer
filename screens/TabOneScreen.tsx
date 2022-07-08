import { Text, View } from "../components/Themed";
import Layout from "../constants/Layout";
import { useEffect, useRef, useState } from "react";
import CountdownNumberInput from "../components/CountdownNumberInput";
import Clock from "../components/Clock";
import Pie from "../components/pie";

export default function TabOneScreen() {
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const size = Layout.window.width - (Layout.window.width / 10) * 3;
  const existingTimeout = useRef<NodeJS.Timeout>();
  const piePercentage = (remainingSeconds / (60 * 60)) * 100;

  // @todo can find a better way of counting down
  useEffect(() => {
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
  }, [remainingSeconds]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.3)",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <View>
        <CountdownNumberInput
          remainingSeconds={remainingSeconds}
          setRemainingSeconds={setRemainingSeconds}
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

      <View>
        <Text>Bottom</Text>
      </View>
    </View>
  );
}
