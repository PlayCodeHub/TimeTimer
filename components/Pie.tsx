import { useMemo } from "react";
import { PanResponder, PanResponderInstance } from "react-native";
import { PieChart } from "react-native-chart-kit";
import Layout from "../constants/Layout";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectClockCoordinates, setPanAngle } from "../redux/reducers";
import { View } from "./Themed";

export interface PieProps {
  size: number;
  percentage: number;
  color: string;
}

export default function Pie({ size, percentage, color }: PieProps) {
  const clockCoordinates = useAppSelector(selectClockCoordinates);
  const dispatch = useAppDispatch();

  const panResponder = useMemo<PanResponderInstance>(
    () =>
      PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: () => true,
        onMoveShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => true,

        onPanResponderGrant: () => {
          // The gesture has started. Show visual feedback so the user knows
          // what is happening!
          // gestureState.d{x,y} will be set to zero now
        },
        onPanResponderMove: (evt, { moveX, moveY }) => {
          const { x, y } = clockCoordinates;
          const xDiff = moveX - x;
          const yDiff = moveY - y;

          dispatch(setPanAngle(Math.atan2(yDiff, xDiff) * (180 / Math.PI)));
          // The most recent move distance is gestureState.move{X,Y}
          // The accumulated gesture distance since becoming responder is
          // gestureState.d{x,y}
        },
        onPanResponderTerminationRequest: () => true
      }),
    [clockCoordinates, dispatch]
  );

  return (
    <View
      style={{
        position: "absolute",
        alignSelf: "center",
        height: Layout.window.width,
        width: Layout.window.width,
        padding: Layout.window.width / 10,
        backgroundColor: "none"
      }}
      {...panResponder.panHandlers}
    >
      <PieChart
        hasLegend={false}
        data={[
          {
            percentage: 100 - percentage,
            color: "transparent"
          },
          {
            percentage,
            color
          }
        ]}
        backgroundColor={"transparent"}
        paddingLeft={"0"}
        accessor="percentage"
        height={size * 1.15}
        width={size * 1.15}
        center={[(size * 1.15) / 4, 0]}
        absolute
        chartConfig={{
          fillShadowGradient: "red",
          fillShadowGradientTo: "blue"
        }}
      />
    </View>
  );
}
