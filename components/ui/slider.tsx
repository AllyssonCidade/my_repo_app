import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Slider, Icon } from "@rneui/themed";

type SlidersComponentProps = {
  value: number;
  onVChange: (value: number) => void;
};

const Sliders: React.FunctionComponent<SlidersComponentProps> = ({
  value,
  onVChange,
}) => {
  const interpolate = (start: number, end: number) => {
    //o valor do divisor deve ser igual ao maximumValue do slider para ter uma troca de cores fluida
    let k = (value - 0) / 100;
    return Math.ceil((1 - k) * start + k * end) % 256;
  };

  const color = () => {
    let r = interpolate(255, 0);
    let g = interpolate(0, 255);
    let b = interpolate(0, 0);
    return `rgb(${r},${g},${b})`;
  };

  return (
    <>
      <View style={[styles.contentView]}>
        <Slider
          value={value}
          onValueChange={onVChange}
          maximumValue={100}
          minimumValue={1}
          step={1}
          allowTouchTrack
          trackStyle={{ height: 5, backgroundColor: "transparent" }}
          thumbStyle={{ height: 20, width: 20, backgroundColor: "transparent" }}
          thumbProps={{
            children: (
              <Icon
                name="money"
                type="font-awesome"
                size={20}
                reverse
                containerStyle={{ bottom: 20, right: 20 }}
                color={color()}
              />
            ),
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contentView: {
    padding: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "stretch",
  },
});

export default Sliders;
