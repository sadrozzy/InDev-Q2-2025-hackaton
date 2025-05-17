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

type CurtainsScreenProps = {
  navigation: NativeStackNavigationProp<RoomManagementStackParamList, 'Curtains'>;
  route: RouteProp<RoomManagementStackParamList, 'Curtains'>;
};

type Curtain = {
  id: string;
  name: string;
  icon: string;
  isOpen: boolean;
  transparency: number;
};

export default function CurtainsScreen({ navigation, route }: CurtainsScreenProps) {
  const roomId = route.params?.roomId || 'default';

  const [curtains, setCurtains] = useState<Curtain[]>([
    {
      id: '1',
      name: 'Основное окно',
      icon: 'window',
      isOpen: true,
      transparency: 80,
    },
    {
      id: '2',
      name: 'Балконная дверь',
      icon: 'door',
      isOpen: false,
      transparency: 50,
    },
    {
      id: '3',
      name: 'Спальня',
      icon: 'bed',
      isOpen: true,
      transparency: 30,
    },
  ]);

  const toggleCurtain = (id: string) => {
    setCurtains(prev =>
      prev.map(curtain =>
        curtain.id === id ? { ...curtain, isOpen: !curtain.isOpen } : curtain
      )
    );
  };

  const updateTransparency = (id: string, value: number) => {
    setCurtains(prev =>
      prev.map(curtain =>
        curtain.id === id ? { ...curtain, transparency: value } : curtain
      )
    );
  };

  const renderCurtain = (curtain: Curtain) => (
    <View key={curtain.id} style={styles.curtainCard}>
      <View style={styles.curtainHeader}>
        <View style={styles.curtainInfo}>
          <Ionicons name={curtain.icon as any} size={24} color="#007AFF" />
          <Text style={styles.curtainName}>{curtain.name}</Text>
        </View>
        <Switch
          value={curtain.isOpen}
          onValueChange={() => toggleCurtain(curtain.id)}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={curtain.isOpen ? '#007AFF' : '#f4f3f4'}
        />
      </View>

      {curtain.isOpen && (
        <View style={styles.curtainControls}>
          <View style={styles.transparencyContainer}>
            <Text style={styles.controlLabel}>Прозрачность</Text>
            <View style={styles.transparencySlider}>
              <TouchableOpacity
                style={styles.transparencyButton}
                onPress={() => updateTransparency(curtain.id, Math.max(0, curtain.transparency - 10))}
              >
                <Ionicons name="remove" size={20} color="#666" />
              </TouchableOpacity>
              <Text style={styles.transparencyValue}>{curtain.transparency}%</Text>
              <TouchableOpacity
                style={styles.transparencyButton}
                onPress={() => updateTransparency(curtain.id, Math.min(100, curtain.transparency + 10))}
              >
                <Ionicons name="add" size={20} color="#666" />
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
        <Text style={styles.title}>Шторы</Text>
        <Text style={styles.subtitle}>Комната {roomId}</Text>
      </View>

      <View style={styles.content}>
        {curtains.map(renderCurtain)}
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
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  content: {
    padding: 15,
  },
  curtainCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  curtainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  curtainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  curtainName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  curtainControls: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  transparencyContainer: {
    marginBottom: 15,
  },
  controlLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  transparencySlider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  transparencyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  transparencyValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
}); 