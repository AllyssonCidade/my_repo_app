declare module "react-native-parallax-scroll-view" {
  import { Component } from "react";
  import { ScrollViewProps } from "react-native";

  interface ParallaxScrollViewProps extends ScrollViewProps {
    backgroundColor?: string;
    contentBackgroundColor?: string;
    parallaxHeaderHeight: number;
    renderForeground?: () => React.ReactNode;
  }

  export default class ParallaxScrollView extends Component<ParallaxScrollViewProps> {}
}
