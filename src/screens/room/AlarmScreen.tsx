import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RoomManagementStackParamList } from '../../navigation/types';
import { Ionicons } from '@expo/vector-icons';

type AlarmScreenProps = {
  navigation: NativeStackNavigationProp<RoomManagementStackParamList, 'Alarm'>;
  route: RouteProp<RoomManagementStackParamList, 'Alarm'>;
};

type Alarm = {
  id: string;
  time: string;
  days: string[];
  isEnabled: boolean;
  type: 'wake' | 'sleep';
};

export default function AlarmScreen({ navigation, route }: AlarmScreenProps) {
  const [alarms, setAlarms] = useState<Alarm[]>([
    {
      id: '1',
      time: '07:00',
      days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт'],
      isEnabled: true,
      type: 'wake',
    },
    {
      id: '2',
      time: '23:00',
      days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      isEnabled: true,
      type: 'sleep',
    },
  ]);

  const [isDoNotDisturbEnabled, setIsDoNotDisturbEnabled] = useState(false);

  const toggleAlarm = (id: string) => {
    setAlarms(prev =>
      prev.map(alarm =>
        alarm.id === id ? { ...alarm, isEnabled: !alarm.isEnabled } : alarm
      )
    );
  };

  const deleteAlarm = (id: string) => {
    setAlarms(prev => prev.filter(alarm => alarm.id !== id));
  };

  const renderAlarm = (alarm: Alarm) => (
    <View key={alarm.id} style={styles.alarmCard}>
      <View style={styles.alarmHeader}>
        <View style={styles.alarmInfo}>
          <Text style={styles.alarmTime}>{alarm.time}</Text>
          <Text style={styles.alarmType}>
            {alarm.type === 'wake' ? 'Пробуждение' : 'Отход ко сну'}
          </Text>
          <View style={styles.daysContainer}>
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
              <Text
                key={day}
                style={[
                  styles.dayText,
                  alarm.days.includes(day) && styles.dayTextActive,
                ]}
              >
                {day}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.alarmControls}>
          <Switch
            value={alarm.isEnabled}
            onValueChange={() => toggleAlarm(alarm.id)}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={alarm.isEnabled ? '#007AFF' : '#f4f3f4'}
          />
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteAlarm(alarm.id)}
          >
            <Ionicons name="trash-outline" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Будильник</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.doNotDisturbCard}>
          <View style={styles.doNotDisturbHeader}>
            <View style={styles.doNotDisturbInfo}>
              <Text style={styles.doNotDisturbTitle}>Не беспокоить</Text>
              <Text style={styles.doNotDisturbDescription}>
                Отключить все уведомления и будильники
              </Text>
            </View>
            <Switch
              value={isDoNotDisturbEnabled}
              onValueChange={setIsDoNotDisturbEnabled}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isDoNotDisturbEnabled ? '#007AFF' : '#f4f3f4'}
            />
          </View>
        </View>

        {alarms.map(renderAlarm)}

        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Добавить будильник</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    padding: 15,
  },
  doNotDisturbCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  doNotDisturbHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doNotDisturbInfo: {
    flex: 1,
  },
  doNotDisturbTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  doNotDisturbDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  alarmCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  alarmHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  alarmInfo: {
    flex: 1,
  },
  alarmTime: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  alarmType: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  daysContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  dayText: {
    fontSize: 12,
    color: '#999',
    marginRight: 8,
  },
  dayTextActive: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  alarmControls: {
    alignItems: 'center',
  },
  deleteButton: {
    marginTop: 10,
    padding: 8,
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
}); 