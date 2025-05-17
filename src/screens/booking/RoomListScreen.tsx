import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BookingStackParamList } from '../../navigation/types';
import { Room, RoomType } from '../../types';
import { Calendar } from 'react-native-calendars';

// Временные данные для демонстрации
const mockRooms: (Room & { roomType: RoomType })[] = [
  {
    room_id: '1',
    room_type_id: '1',
    room_number: '101',
    status: 'available',
    image_url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
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
  },
  {
    room_id: '2',
    room_type_id: '2',
    room_number: '201',
    status: 'available',
    image_url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
    roomType: {
      room_type_id: '2',
      name: 'Люкс',
      description: 'Просторный номер с видом на город',
      capacity: 3,
      base_price_per_night: 8000,
      amenities: {
        wifi: true,
        tv: true,
        minibar: true,
        jacuzzi: true,
        balcony: true,
      },
    },
  },
];

type RoomListScreenProps = {
  navigation: NativeStackNavigationProp<BookingStackParamList, 'RoomList'>;
};

export default function RoomListScreen({ navigation }: RoomListScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDates, setSelectedDates] = useState({
    startDate: '',
    endDate: '',
  });

  const amenities = [
    { id: 'wifi', label: 'Wi-Fi' },
    { id: 'tv', label: 'TV' },
    { id: 'minibar', label: 'Мини-бар' },
    { id: 'jacuzzi', label: 'Джакузи' },
    { id: 'balcony', label: 'Балкон' },
  ];

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenityId)
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const markedDates = useMemo(() => {
    const dates: Record<string, any> = {};
    
    if (selectedDates.startDate && selectedDates.endDate) {
      const start = new Date(selectedDates.startDate);
      const end = new Date(selectedDates.endDate);
      
      // Добавляем начальную дату
      dates[selectedDates.startDate] = {
        selected: true,
        startingDay: true,
        color: '#007AFF',
      };
      
      // Добавляем конечную дату
      dates[selectedDates.endDate] = {
        selected: true,
        endingDay: true,
        color: '#007AFF',
      };
      
      // Добавляем промежуточные даты
      let currentDate = new Date(start);
      currentDate.setDate(currentDate.getDate() + 1);
      
      while (currentDate < end) {
        const dateString = currentDate.toISOString().split('T')[0];
        dates[dateString] = {
          selected: true,
          color: '#007AFF',
          textColor: '#ffffff',
        };
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } else if (selectedDates.startDate) {
      dates[selectedDates.startDate] = {
        selected: true,
        startingDay: true,
        color: '#007AFF',
      };
    }
    
    return dates;
  }, [selectedDates]);

  const handleDayPress = (day: any) => {
    if (!selectedDates.startDate || (selectedDates.startDate && selectedDates.endDate)) {
      setSelectedDates({
        startDate: day.dateString,
        endDate: '',
      });
    } else {
      const start = new Date(selectedDates.startDate);
      const end = new Date(day.dateString);
      if (end < start) {
        setSelectedDates({
          startDate: day.dateString,
          endDate: '',
        });
      } else {
        setSelectedDates({
          startDate: selectedDates.startDate,
          endDate: day.dateString,
        });
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const filteredRooms = useMemo(() => {
    return mockRooms.filter(room => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        room.room_number.toLowerCase().includes(searchLower) ||
        room.roomType.name.toLowerCase().includes(searchLower) ||
        (room.roomType.description?.toLowerCase().includes(searchLower) ?? false);

      const matchesAmenities = selectedAmenities.length === 0 || 
        selectedAmenities.every(amenity => room.roomType.amenities?.[amenity]);

      const matchesPrice = room.roomType.base_price_per_night >= priceRange.min &&
        room.roomType.base_price_per_night <= priceRange.max;

      return matchesSearch && matchesAmenities && matchesPrice;
    });
  }, [searchQuery, selectedAmenities, priceRange]);

  const renderRoomCard = ({ item }: { item: typeof mockRooms[0] }) => (
    <TouchableOpacity
      style={styles.roomCard}
      onPress={() => navigation.navigate('RoomDetails', { 
        roomId: item.room_id,
        checkIn: selectedDates.startDate,
        checkOut: selectedDates.endDate,
      })}
    >
      <Image
        source={{ uri: item.image_url }}
        style={styles.roomImage}
        resizeMode="cover"
      />
      <View style={styles.roomContent}>
        <Text style={styles.roomNumber}>Номер {item.room_number}</Text>
        <Text style={styles.roomType}>{item.roomType.name}</Text>
        <Text style={styles.roomDescription}>{item.roomType.description}</Text>
        <View style={styles.amenitiesContainer}>
          {Object.entries(item.roomType.amenities || {}).map(([key, value]) => (
            value && (
              <View key={key} style={styles.amenityTag}>
                <Text style={styles.amenityText}>
                  {amenities.find(a => a.id === key)?.label || key}
                </Text>
              </View>
            )
          ))}
        </View>
        <Text style={styles.price}>
          {item.roomType.base_price_per_night} ₽ / ночь
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск номеров..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowCalendar(true)}
          >
            <Text style={styles.datePickerButtonText}>
              {selectedDates.startDate
                ? `${formatDate(selectedDates.startDate)} - ${
                    selectedDates.endDate ? formatDate(selectedDates.endDate) : 'Выберите дату'
                  }`
                : 'Выберите даты'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filtersWrapper}>
          <ScrollView 
            horizontal={true}
            showsHorizontalScrollIndicator={false} 
            style={styles.filtersContainer}
            contentContainerStyle={styles.filtersContentContainer}
          >
            {amenities.map(amenity => (
              <TouchableOpacity
                key={amenity.id}
                style={[
                  styles.filterChip,
                  selectedAmenities.includes(amenity.id) && styles.filterChipActive,
                ]}
                onPress={() => toggleAmenity(amenity.id)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selectedAmenities.includes(amenity.id) && styles.filterChipTextActive,
                  ]}
                >
                  {amenity.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <FlatList
        data={filteredRooms}
        renderItem={renderRoomCard}
        keyExtractor={item => item.room_id}
        contentContainerStyle={styles.roomList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Номера не найдены</Text>
          </View>
        }
      />

      <Modal
        visible={showCalendar}
        transparent={true}
        animationType="none"
        onRequestClose={() => setShowCalendar(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <View style={styles.calendarHeader}>
              <Text style={styles.calendarTitle}>Выберите даты</Text>
              <TouchableOpacity
                onPress={() => setShowCalendar(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Готово</Text>
              </TouchableOpacity>
            </View>
            <Calendar
              onDayPress={handleDayPress}
              markedDates={markedDates}
              minDate={new Date().toISOString().split('T')[0]}
              markingType="period"
              theme={{
                todayTextColor: '#007AFF',
                selectedDayBackgroundColor: '#007AFF',
                selectedDayTextColor: '#ffffff',
                dotColor: '#007AFF',
                selectedDotColor: '#ffffff',
                arrowColor: '#007AFF',
                monthTextColor: '#000000',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16,
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchContainer: {
    padding: 15,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  filtersWrapper: {
    height: 70,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  filtersContainer: {
    height: '100%',
  },
  filtersContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: '100%',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  filterChipActive: {
    backgroundColor: '#007AFF',
  },
  filterChipText: {
    color: '#666',
  },
  filterChipTextActive: {
    color: '#fff',
  },
  datePickerButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  datePickerButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  roomList: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  roomCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  roomImage: {
    width: '100%',
    height: 150,
  },
  roomContent: {
    padding: 15,
  },
  roomNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  roomType: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 5,
  },
  roomDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  amenityTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  amenityText: {
    fontSize: 12,
    color: '#666',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  calendarContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 50,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
}); 