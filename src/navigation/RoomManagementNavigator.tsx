import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RoomManagementStackParamList } from './types';
import RoomControlScreen from '../screens/room/RoomControlScreen';
import LightingScreen from '../screens/room/LightingScreen';
import ClimateScreen from '../screens/room/ClimateScreen';
import AccessScreen from '../screens/room/AccessScreen';
import AlarmScreen from '../screens/room/AlarmScreen';
import CurtainsScreen from '../screens/room/CurtainsScreen';
import ScenariosScreen from '../screens/room/ScenariosScreen';

const Stack = createNativeStackNavigator<RoomManagementStackParamList>();

export default function RoomManagementNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      initialRouteName="RoomControl"
    >
      <Stack.Screen 
        name="RoomControl" 
        component={RoomControlScreen}
        options={{ title: 'Управление комнатой' }}
        initialParams={{ roomId: 'default' }}
      />
      <Stack.Screen 
        name="Lighting" 
        component={LightingScreen}
        options={{ title: 'Освещение' }}
      />
      <Stack.Screen 
        name="Climate" 
        component={ClimateScreen}
        options={{ title: 'Климат-контроль' }}
      />
      <Stack.Screen 
        name="Curtains" 
        component={CurtainsScreen}
        options={{ title: 'Управление шторами' }}
      />
      <Stack.Screen 
        name="Alarms" 
        component={AlarmScreen}
        options={{ title: 'Будильник' }}
      />
      <Stack.Screen 
        name="Scenarios" 
        component={ScenariosScreen}
        options={{ title: 'Сценарии' }}
      />
      <Stack.Screen 
        name="Access" 
        component={AccessScreen}
        options={{ title: 'Управление доступом' }}
      />
    </Stack.Navigator>
  );
} 