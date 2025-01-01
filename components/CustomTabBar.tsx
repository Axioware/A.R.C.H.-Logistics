import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { router } from 'expo-router';

// Get screen width
const { width } = Dimensions.get('window');

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      <Svg width={width} height={100}>
        <Path
          d={`M0 0 Q${width * 0.5} 25 ${width} 0 V100 H0 Z`}
          fill="#c7c7c7"
        />
      </Svg>

      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              router.push(route.name as any);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={route.name}
              onPress={onPress}
              style={styles.tab}
            >
              <View style={isFocused ? styles.focusedTab : styles.unfocusedTab}>
                <Text style={isFocused ? styles.focusedText : styles.unfocusedText}>
                  {options.title || route.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => router.push('/tabs/placeholder3')}
      >
        <View style={styles.middleIcon}>
          <Text style={{ color: 'white', fontSize: 24 }}>⚙️</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingVertical: 10,
    height: 60,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  focusedTab: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 30,
  },
  unfocusedTab: {
    padding: 10,
  },
  focusedText: {
    color: 'white',
    fontSize: 14,
  },
  unfocusedText: {
    color: 'gray',
    fontSize: 12,
  },
  floatingButton: {
    position: 'absolute',
    top: -10,
    alignSelf: 'center',
    zIndex: 10,
    shadowColor: '#black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  middleIcon: {
    backgroundColor: '#e0e0e0',
    borderWidth: 3,
    borderColor: 'rgba(249,249,249,255)',
    width: 65,
    height: 65,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});