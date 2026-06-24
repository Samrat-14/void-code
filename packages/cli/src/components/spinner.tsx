import "opentui-spinner/react";
import { useTheme } from "../providers/theme";
import { Mode } from "@voidcode/database/enums";

type SpinnerProps = {
  mode?: Mode;
};

export function Spinner({ mode = Mode.BUILD }: SpinnerProps) {
  const { colors } = useTheme();
  const activeColor = mode === Mode.PLAN ? colors.planMode : colors.primary;

  return <spinner name="aesthetic" color={activeColor}></spinner>;
}
