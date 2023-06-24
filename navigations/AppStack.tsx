import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { COLORS } from '../constants';
import AppDrawer from './Drawer';
import ChatScreen from '../screens/ChatScreen';
import ContactProfile from '../screens/ContactProfile';
import ConversationFilter from '../screens/ConversationFilter';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: COLORS.primary400 },
        headerTintColor: COLORS.white,
        contentStyle: { backgroundColor: COLORS.secondary100 },
        animation: 'simple_push',
      }}
    >
      <Stack.Screen name="Home" component={AppDrawer} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="ContactProfile" component={ContactProfile} />
      <Stack.Screen
        name="ConversationFilter"
        component={ConversationFilter}
        options={{
          headerShown: true,
          title: 'Conversations Filter',
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
