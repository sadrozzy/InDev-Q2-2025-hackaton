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

type LightingScreenProps = {
  navigation: NativeStackNavigationProp<RoomManagementStackParamList, 'Lighting'>;
  route: RouteProp<RoomManagementStackParamList, 'Lighting'>;
};

type LightGroup = {
  id: string;
  name: string;
  icon: string;
  isOn: boolean;
  brightness: number;
  color: string;
};

export default function LightingScreen({ navigation, route }: LightingScreenProps) {
  const [lightGroups, setLightGroups] = useState<LightGroup[]>([
    {
      id: '1',
      name: 'Основной свет',
      icon: 'bulb',
      isOn: true,
      brightness: 80,
      color: 'warm',
    },
    {
      id: '2',
      name: 'Прикроватные',
      icon: 'bed',
      isOn: false,
      brightness: 50,
      color: 'warm',
    },
    {
      id: '3',
      name: 'Рабочий стол',
      icon: 'desktop',
      isOn: true,
      brightness: 100,
      color: 'cool',
    },
    {
      id: '4',
      name: 'Ванная',
      icon: 'water',
      isOn: false,
      brightness: 70,
      color: 'cool',
    },
  ]);

  const toggleLight = (id: string) => {
    setLightGroups(prev =>
      prev.map(light =>
        light.id === id ? { ...light, isOn: !light.isOn } : light
      )
    );
  };

  const updateBrightness = (id: string, value: number) => {
    setLightGroups(prev =>
      prev.map(light =>
        light.id === id ? { ...light, brightness: value } : light
      )
    );
  };

  const updateColor = (id: string, color: string) => {
    setLightGroups(prev =>
      prev.map(light =>
        light.id === id ? { ...light, color } : light
      )
    );
  };

  const renderLightGroup = (light: LightGroup) => (
    <View key={light.id} style={styles.lightCard}>
      <View style={styles.lightHeader}>
        <View style={styles.lightInfo}>
          <Ionicons name={light.icon as any} size={24} color="#007AFF" />
          <Text style={styles.lightName}>{light.name}</Text>
        </View>
        <Switch
          value={light.isOn}
          onValueChange={() => toggleLight(light.id)}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={light.isOn ? '#007AFF' : '#f4f3f4'}
        />
      </View>

      {light.isOn && (
        <View style={styles.lightControls}>
          <View style={styles.brightnessContainer}>
            <Text style={styles.controlLabel}>Яркость</Text>
            <View style={styles.brightnessSlider}>
              <TouchableOpacity
                style={styles.brightnessButton}
                onPress={() => updateBrightness(light.id, Math.max(0, light.brightness - 10))}
              >
                <Ionicons name="remove" size={20} color="#666" />
              </TouchableOpacity>
              <Text style={styles.brightnessValue}>{light.brightness}%</Text>
              <TouchableOpacity
                style={styles.brightnessButton}
                onPress={() => updateBrightness(light.id, Math.min(100, light.brightness + 10))}
              >
                <Ionicons name="add" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.colorContainer}>
            <Text style={styles.controlLabel}>Цвет</Text>
            <View style={styles.colorButtons}>
              <TouchableOpacity
                style={[
                  styles.colorButton,
                  light.color === 'warm' && styles.colorButtonActive,
                ]}
                onPress={() => updateColor(light.id, 'warm')}
              >
                <Text style={styles.colorButtonText}>Теплый</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.colorButton,
                  light.color === 'cool' && styles.colorButtonActive,
                ]}
                onPress={() => updateColor(light.id, 'cool')}
              >
                <Text style={styles.colorButtonText}>Холодный</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Освещение</Text>
      </View>

      <View style={styles.content}>
        {lightGroups.map(renderLightGroup)}
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
  lightCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  lightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lightInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lightName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  lightControls: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  brightnessContainer: {
    marginBottom: 15,
  },
  controlLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  brightnessSlider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brightnessButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brightnessValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  colorContainer: {
    marginTop: 10,
  },
  colorButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  colorButtonActive: {
    backgroundColor: '#007AFF',
  },
  colorButtonText: {
    fontSize: 14,
    color: '#007AFF',
  },
}); 