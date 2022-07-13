import { TextInput } from "react-native";
import { StyleSheet } from "react-native";

export interface CountdownNumberInputProps {
  timerName: string;
  setTimerName: (text: string) => void;
}

export default function TimerNameInput({
  timerName,
  setTimerName
}: CountdownNumberInputProps) {
  return (
    <TextInput
      style={styles.timerNameText}
      keyboardType="default"
      value={timerName}
      onChangeText={setTimerName}
      maxLength={20}
      selectTextOnFocus
    />
  );
}

const styles = StyleSheet.create({
  timerNameText: { fontSize: 24, textAlign: "center" }
});
