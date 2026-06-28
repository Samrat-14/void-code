import "opentui-spinner/react";
import { registerSpinner } from "opentui-spinner/react";
import { useTheme } from "../providers/theme";
import { Mode, type ModeType } from "@voidcode/shared";

registerSpinner();

type SpinnerProps = {
  mode?: ModeType;
};

export function Spinner({ mode = Mode.BUILD }: SpinnerProps) {
  const { colors } = useTheme();
  const activeColor = mode === Mode.PLAN ? colors.planMode : colors.primary;

  return <spinner name="aesthetic" color={activeColor}></spinner>;
  // return <text fg={activeColor}>Loading...</text>;
}
