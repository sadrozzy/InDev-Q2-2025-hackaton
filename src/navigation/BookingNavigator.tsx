import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BookingStackParamList } from './types';
import RoomListScreen from '../screens/booking/RoomListScreen';
import RoomDetailsScreen from '../screens/booking/RoomDetailsScreen';
import BookingConfirmationScreen from '../screens/booking/BookingConfirmationScreen';

const Stack = createNativeStackNavigator<BookingStackParamList>();

export default function BookingNavigator() {
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
    >
      <Stack.Screen 
        name="RoomList" 
        component={RoomListScreen}
        options={{ title: 'Доступные номера' }}
      />
      <Stack.Screen 
        name="RoomDetails" 
        component={RoomDetailsScreen}
        options={{ title: 'Информация о номере' }}
      />
      <Stack.Screen 
        name="BookingConfirmation" 
        component={BookingConfirmationScreen}
        options={{ title: 'Подтверждение бронирования' }}
      />
    </Stack.Navigator>
  );
} 