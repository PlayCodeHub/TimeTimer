import { TextInput } from "react-native";
import { StyleSheet } from "react-native";

export interface TimerNameInputProps {
  timerName: string;
  setTimerName: (text: string) => void;
}

export default function TimerNameInput({
  timerName,
  setTimerName
}: TimerNameInputProps) {
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
