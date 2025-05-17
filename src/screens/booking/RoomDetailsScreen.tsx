import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { BookingStackParamList } from '../../navigation/types';
import { Room, RoomType } from '../../types';

import room from '../../assets/room.jpg'

type RoomDetailsScreenProps = {
  navigation: NativeStackNavigationProp<BookingStackParamList, 'RoomDetails'>;
  route: RouteProp<BookingStackParamList, 'RoomDetails'>;
};

const { width } = Dimensions.get('window');

// Временные данные для демонстрации
const mockRoom: Room & { roomType: RoomType } = {
  room_id: '1',
  room_type_id: '1',
  room_number: '101',
  status: 'available',
  roomType: {
    room_type_id: '1',
    name: 'Стандарт',
    description: 'Уютный номер с одной кроватью',
    capacity: 2,
    base_price_per_night: 5000,
    amenities: {
      wifi: true,
      tv: true,
      minibar: true,
    },
  },
};

export default function RoomDetailsScreen({ navigation, route }: RoomDetailsScreenProps) {
  const [selectedDates, setSelectedDates] = useState({
    checkIn: new Date(),
    checkOut: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  const calculateTotalNights = () => {
    const diffTime = Math.abs(selectedDates.checkOut.getTime() - selectedDates.checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotalPrice = () => {
    return calculateTotalNights() * mockRoom.roomType.base_price_per_night;
  };

  const handleBookNow = () => {
    navigation.navigate('BookingConfirmation', {
      roomId: route.params.roomId,
      checkIn: selectedDates.checkIn.toISOString(),
      checkOut: selectedDates.checkOut.toISOString(),
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={room}
        style={styles.roomImage}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.roomNumber}>Номер {mockRoom.room_number}</Text>
        <Text style={styles.roomType}>{mockRoom.roomType.name}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{mockRoom.roomType.base_price_per_night} ₽</Text>
          <Text style={styles.pricePerNight}>за ночь</Text>
        </View>

        <Text style={styles.sectionTitle}>Описание</Text>
        <Text style={styles.description}>{mockRoom.roomType.description}</Text>

        <Text style={styles.sectionTitle}>Удобства</Text>
        <View style={styles.amenitiesContainer}>
          {Object.entries(mockRoom.roomType.amenities || {}).map(([key, value]) => (
            value && (
              <View key={key} style={styles.amenityItem}>
                <Text style={styles.amenityText}>
                  {key === 'wifi' ? 'Wi-Fi' :
                   key === 'tv' ? 'Телевизор' :
                   key === 'minibar' ? 'Мини-бар' :
                   key === 'jacuzzi' ? 'Джакузи' :
                   key === 'balcony' ? 'Балкон' : key}
                </Text>
              </View>
            )
          ))}
        </View>

        <Text style={styles.sectionTitle}>Вместимость</Text>
        <Text style={styles.capacity}>
          До {mockRoom.roomType.capacity} {mockRoom.roomType.capacity === 1 ? 'гостя' : 'гостей'}
        </Text>

        <View style={styles.bookingContainer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalNights}>
              {calculateTotalNights()} {calculateTotalNights() === 1 ? 'ночь' : 'ночей'}
            </Text>
            <Text style={styles.totalPrice}>
              Итого: {calculateTotalPrice()} ₽
            </Text>
          </View>

          <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
            <Text style={styles.bookButtonText}>Забронировать</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  roomImage: {
    width: width,
    height: width * 0.75,
  },
  content: {
    padding: 20,
  },
  roomNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  roomType: {
    fontSize: 18,
    color: '#007AFF',
    marginBottom: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  pricePerNight: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  amenityItem: {
   
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  amenityText: {
    fontSize: 14,
    color: '#666',
  },
  capacity: {
    fontSize: 16,
    color: '#666',
  },
  bookingContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
  },
  totalContainer: {
    marginBottom: 15,
  },
  totalNights: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  bookButton: {
    backgroundColor: '#007AFF',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 