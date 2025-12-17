import '@testing-library/jest-native/extend-expect';

// Basic mocks for native modules used in components
jest.mock('expo-linear-gradient', () => {
  const React = require('react');
  const { View } = require('react-native');
  return { LinearGradient: (props) => React.createElement(View, props, props.children) };
});

jest.mock('react-native-date-picker', () => {
  const React = require('react');
  const { View } = require('react-native');
  return ({ title, children }) => React.createElement(View, null, children);
});

jest.mock('expo-font', () => ({ useFonts: () => [true, null] }));

// Mock AsyncStorage native module for Jest
jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'));

// Mock Animated Easing to avoid native easing bezier issues in Jest
jest.mock('react-native/Libraries/Animated/Easing', () => ({
  bezier: () => (t) => t,
  ease: (t) => t,
  inOut: (t) => t,
  linear: (t) => t,
}));

// Silence native animated helper warnings if module exists
try {
  const nativeAnimatedHelper = 'react-native/Libraries/Animated/NativeAnimatedHelper';
  if (require.resolve(nativeAnimatedHelper)) {
    jest.mock(nativeAnimatedHelper);
  }
} catch (e) {
  // ignore if module not present in this react-native version
}

// Provide a lightweight mock for react-native-paper to avoid pulling in animation internals
jest.mock('react-native-paper', () => {
  const React = require('react');
  const { View, Text, TextInput, TouchableOpacity } = require('react-native');
  const MockButton = (props) => React.createElement(TouchableOpacity, props, props.children);
  const MockIcon = (props) => React.createElement(View, props, null);
  const MockIconButton = (props) => React.createElement(TouchableOpacity, props, props.children);
  const MockAppbar = {
    Action: (p) => React.createElement(TouchableOpacity, p, null),
    Content: (p) => React.createElement(View, p, null),
    Header: (p) => React.createElement(View, p, p.children),
  };
  return {
    Button: MockButton,
    Icon: MockIcon,
    TextInput: TextInput,
    IconButton: MockIconButton,
    Appbar: MockAppbar,
    useTheme: () => ({ colors: { onPrimary: '#000', background: '#fff' } }),
    Text: Text,
  };
});

// Mock expo-router to avoid heavy navigation imports during Jest
jest.mock('expo-router', () => {
  const React = require('react');
  return {
    useRouter: () => ({ push: () => {}, replace: () => {}, back: () => {} }),
    Link: (props) => React.createElement('a', props, props.children),
    useLocalSearchParams: () => ({}),
  };
});
