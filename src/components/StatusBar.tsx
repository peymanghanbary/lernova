import React from 'react';
import {StatusBar as RNStatusBar, StatusBarStyle} from 'react-native';
import useThemeContext from '../utility/hooks/useThemeContext';
type Props = {
  style?: StatusBarStyle;
};

export default function StatusBar({ style }: Props) {
  const { colorTheme } = useThemeContext();
  const styleComputed = style ?? colorTheme === 'dark' ? 'light' : 'dark';

  return <RNStatusBar style={styleComputed} />;
}
