import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { BookingStackParamList } from '../../navigation/types';
import { Room, RoomType } from '../../types';

type BookingConfirmationScreenProps = {
  navigation: NativeStackNavigationProp<BookingStackParamList, 'BookingConfirmation'>;
  route: RouteProp<BookingStackParamList, 'BookingConfirmation'>;
};

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

export default function BookingConfirmationScreen({ navigation, route }: BookingConfirmationScreenProps) {
  const [specialRequests, setSpecialRequests] = useState('');

  const checkIn = new Date(route.params.checkIn);
  const checkOut = new Date(route.params.checkOut);

  const calculateTotalNights = () => {
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotalPrice = () => {
    return calculateTotalNights() * mockRoom.roomType.base_price_per_night;
  };

  const handleConfirmBooking = () => {
    // TODO: Implement booking confirmation logic
    Alert.alert(
      'Бронирование подтверждено',
      'Спасибо за бронирование! Мы отправили подтверждение на вашу почту.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('RoomList'),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Подтверждение бронирования</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Информация о номере</Text>
          <Text style={styles.roomNumber}>Номер {mockRoom.room_number}</Text>
          <Text style={styles.roomType}>{mockRoom.roomType.name}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Даты проживания</Text>
          <View style={styles.dateContainer}>
            <View style={styles.dateItem}>
              <Text style={styles.dateLabel}>Заезд</Text>
              <Text style={styles.dateValue}>
                {checkIn.toLocaleDateString('ru-RU')}
              </Text>
            </View>
            <View style={styles.dateItem}>
              <Text style={styles.dateLabel}>Выезд</Text>
              <Text style={styles.dateValue}>
                {checkOut.toLocaleDateString('ru-RU')}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Стоимость</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceItem}>
              {mockRoom.roomType.base_price_per_night} ₽ × {calculateTotalNights()} ночей
            </Text>
            <Text style={styles.totalPrice}>
              Итого: {calculateTotalPrice()} ₽
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Особые пожелания</Text>
          <TextInput
            style={styles.input}
            placeholder="Введите ваши пожелания (необязательно)"
            value={specialRequests}
            onChangeText={setSpecialRequests}
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmBooking}>
          <Text style={styles.confirmButtonText}>Подтвердить бронирование</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  roomNumber: {
    fontSize: 16,
    marginBottom: 5,
  },
  roomType: {
    fontSize: 16,
    color: '#007AFF',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateItem: {
    flex: 1,
    marginRight: 10,
  },
  dateLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  dateValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  priceContainer: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
  },
  priceItem: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    height: 100,
    textAlignVertical: 'top',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 