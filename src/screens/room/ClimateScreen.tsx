import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RoomManagementStackParamList } from '../../navigation/types';
import { Ionicons } from '@expo/vector-icons';

type ClimateScreenProps = {
  navigation: NativeStackNavigationProp<RoomManagementStackParamList, 'Climate'>;
  route: RouteProp<RoomManagementStackParamList, 'Climate'>;
};

type ClimateState = {
  temperature: number;
  humidity: number;
  mode: 'auto' | 'cool' | 'heat' | 'fan';
  fanSpeed: 'auto' | 'low' | 'medium' | 'high';
};

export default function ClimateScreen({ navigation, route }: ClimateScreenProps) {
  const [climateState, setClimateState] = useState<ClimateState>({
    temperature: 22,
    humidity: 45,
    mode: 'auto',
    fanSpeed: 'auto',
  });

  const modes = [
    { id: 'auto', name: 'Авто', icon: 'sync' },
    { id: 'cool', name: 'Охлаждение', icon: 'snow' },
    { id: 'heat', name: 'Обогрев', icon: 'flame' },
    { id: 'fan', name: 'Вентиляция', icon: 'air' },
  ];

  const fanSpeeds = [
    { id: 'auto', name: 'Авто' },
    { id: 'low', name: 'Низкая' },
    { id: 'medium', name: 'Средняя' },
    { id: 'high', name: 'Высокая' },
  ];

  const updateTemperature = (value: number) => {
    setClimateState(prev => ({
      ...prev,
      temperature: Math.max(16, Math.min(30, value)),
    }));
  };

  const updateHumidity = (value: number) => {
    setClimateState(prev => ({
      ...prev,
      humidity: Math.max(30, Math.min(60, value)),
    }));
  };

  const updateMode = (mode: ClimateState['mode']) => {
    setClimateState(prev => ({ ...prev, mode }));
  };

  const updateFanSpeed = (fanSpeed: ClimateState['fanSpeed']) => {
    setClimateState(prev => ({ ...prev, fanSpeed }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Климат-контроль</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.temperatureCard}>
          <View style={styles.temperatureHeader}>
            <Text style={styles.temperatureValue}>{climateState.temperature}°C</Text>
            <Text style={styles.temperatureLabel}>Температура</Text>
          </View>

          <View style={styles.temperatureControls}>
            <TouchableOpacity
              style={styles.temperatureButton}
              onPress={() => updateTemperature(climateState.temperature - 1)}
            >
              <Ionicons name="remove" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.temperatureButton}
              onPress={() => updateTemperature(climateState.temperature + 1)}
            >
              <Ionicons name="add" size={24} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.humidityCard}>
          <View style={styles.humidityHeader}>
            <Text style={styles.humidityValue}>{climateState.humidity}%</Text>
            <Text style={styles.humidityLabel}>Влажность</Text>
          </View>

          <View style={styles.humidityControls}>
            <TouchableOpacity
              style={styles.humidityButton}
              onPress={() => updateHumidity(climateState.humidity - 5)}
            >
              <Ionicons name="remove" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.humidityButton}
              onPress={() => updateHumidity(climateState.humidity + 5)}
            >
              <Ionicons name="add" size={24} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.modesCard}>
          <Text style={styles.sectionTitle}>Режим работы</Text>
          <View style={styles.modesGrid}>
            {modes.map(mode => (
              <TouchableOpacity
                key={mode.id}
                style={[
                  styles.modeButton,
                  climateState.mode === mode.id && styles.modeButtonActive,
                ]}
                onPress={() => updateMode(mode.id as ClimateState['mode'])}
              >
                <Ionicons
                  name={mode.icon as any}
                  size={24}
                  color={climateState.mode === mode.id ? '#fff' : '#007AFF'}
                />
                <Text
                  style={[
                    styles.modeText,
                    climateState.mode === mode.id && styles.modeTextActive,
                  ]}
                >
                  {mode.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.fanCard}>
          <Text style={styles.sectionTitle}>Скорость вентилятора</Text>
          <View style={styles.fanButtons}>
            {fanSpeeds.map(speed => (
              <TouchableOpacity
                key={speed.id}
                style={[
                  styles.fanButton,
                  climateState.fanSpeed === speed.id && styles.fanButtonActive,
                ]}
                onPress={() => updateFanSpeed(speed.id as ClimateState['fanSpeed'])}
              >
                <Text
                  style={[
                    styles.fanButtonText,
                    climateState.fanSpeed === speed.id && styles.fanButtonTextActive,
                  ]}
                >
                  {speed.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
  temperatureCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  temperatureHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  temperatureValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  temperatureLabel: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  temperatureControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  temperatureButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  humidityCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  humidityHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  humidityValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  humidityLabel: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  humidityControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  humidityButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modesCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    justifyContent: 'space-between',
    gap: 8,
  },
  modeButton: {
    // width: '50%',
    paddingVertical: 20,
    width: '48%',
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 5,
  },
  modeButtonActive: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  modeText: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 5,
    textAlign: 'center',
  },
  modeTextActive: {
    color: '#fff',
  },
  fanCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  fanButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fanButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  fanButtonActive: {
    backgroundColor: '#007AFF',
  },
  fanButtonText: {
    fontSize: 14,
    color: '#007AFF',
  },
  fanButtonTextActive: {
    color: '#fff',
  },
}); 