import Svg, { Circle } from "react-native-svg";

export default function CircleIcon() {
  return (
    <Svg height="10" width="10" style={{ marginTop: 7 }}>
      <Circle
        cx="5"
        cy="5"
        r="4"
        stroke="#6ca1e6"
        strokeWidth="2"
        fill="#6ca1e6"
      />
    </Svg>
  );
}
