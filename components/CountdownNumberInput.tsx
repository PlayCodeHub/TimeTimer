import { useState } from "react";
import { TextInput } from "react-native";

export interface CountdownNumberInputProps {
  remainingSeconds: number;
  setRemainingSeconds: Function;
  minutesInput: string;
  setMinutesInput: (text: string) => void;
}

export default function CountdownNumberInput({
  remainingSeconds,
  setRemainingSeconds,
  minutesInput,
  setMinutesInput
}: CountdownNumberInputProps) {
  const [displayMinute, setDisplayMinute] = useState(false);

  const toRunningTime = (seconds: number) => {
    const minutes = Math.trunc(seconds / 60).toString();
    const roundedSeconds = seconds % 60;
    const paddedSeconds = roundedSeconds.toString().padEnd(2, "0");

    return `${minutes.padStart(2, "0")}:${paddedSeconds}`;
  };

  const onTextInputBlur = () => {
    setDisplayMinute(false);
    setRemainingSeconds(Number(minutesInput) * 60);
  };

  return (
    <TextInput
      keyboardType="numeric"
      onChangeText={setMinutesInput}
      value={displayMinute ? minutesInput : toRunningTime(remainingSeconds)}
      onFocus={() => setDisplayMinute(true)}
      onBlur={onTextInputBlur}
      maxLength={10}
      selectTextOnFocus
    />
  );
}
