import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Chat from '../screens/Chat';
import Collections from '../screens/Collections';
import SavedSearches from '../screens/SavedSearches';
import { COLORS, SIZES } from '../constants';

const Tab = createMaterialTopTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Contacts"
      screenOptions={{
        swipeEnabled: false,
        tabBarStyle: {
          backgroundColor: COLORS.primary10,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: { fontSize: SIZES.f12, fontWeight: '700' },
        tabBarActiveTintColor: COLORS.primary400,
        tabBarInactiveTintColor: COLORS.primary70,
        tabBarIndicatorStyle: { backgroundColor: COLORS.primary400 },
        tabBarAndroidRipple: { borderless: true, color: COLORS.primary70 },
      }}
    >
      <Tab.Screen name="Contacts" component={Chat} />
      <Tab.Screen name="Collections" component={Collections} />
      <Tab.Screen
        name="SavedSearches"
        component={SavedSearches}
        options={{ title: 'Saved Searches' }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
