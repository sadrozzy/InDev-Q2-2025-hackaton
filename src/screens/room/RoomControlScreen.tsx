import React from 'react';
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

type RoomControlScreenProps = {
  navigation: NativeStackNavigationProp<RoomManagementStackParamList, 'RoomControl'>;
  route: RouteProp<RoomManagementStackParamList, 'RoomControl'>;
};

export default function RoomControlScreen({ navigation, route }: RoomControlScreenProps) {
  const [masterSwitch, setMasterSwitch] = React.useState(false);
  const [currentScenario, setCurrentScenario] = React.useState('default');

  const scenarios = [
    { id: 'default', name: 'Обычный', icon: 'sunny' },
    { id: 'sleep', name: 'Сон', icon: 'moon' },
    { id: 'focus', name: 'Фокус', icon: 'desktop' },
    { id: 'relax', name: 'Отдых', icon: 'cafe' },
  ];

  const controlItems = [
    {
      id: 'lighting',
      name: 'Освещение',
      icon: 'bulb',
      onPress: () => navigation.navigate('Lighting', { roomId: route.params.roomId }),
    },
    {
      id: 'climate',
      name: 'Климат-контроль',
      icon: 'thermometer',
      onPress: () => navigation.navigate('Climate', { roomId: route.params.roomId }),
    },
    {
      id: 'curtains',
      name: 'Шторы',
      icon: 'open',
      onPress: () => navigation.navigate('Curtains', { roomId: route.params.roomId }),
    },
    {
      id: 'alarm',
      name: 'Будильник',
      icon: 'alarm',
      onPress: () => navigation.navigate('Alarms', { roomId: route.params.roomId }),
    },
    {
      id: 'scenarios',
      name: 'Сценарии',
      icon: 'options',
      onPress: () => navigation.navigate('Scenarios', { roomId: route.params.roomId }),
    },
    {
      id: 'access',
      name: 'Управление доступом',
      icon: 'people',
      onPress: () => navigation.navigate('Access', { roomId: route.params.roomId }),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Управление комнатой</Text>
        <View style={styles.masterSwitchContainer}>
          <Text style={styles.masterSwitchLabel}>Master Switch</Text>
          <Switch
            value={masterSwitch}
            onValueChange={setMasterSwitch}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={masterSwitch ? '#007AFF' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.scenariosContainer}>
        <Text style={styles.sectionTitle}>Сценарии</Text>
        <View style={styles.scenariosList}>
          {scenarios.map(scenario => (
            <TouchableOpacity
              key={scenario.id}
              style={[
                styles.scenarioButton,
                currentScenario === scenario.id && styles.scenarioButtonActive,
              ]}
              onPress={() => setCurrentScenario(scenario.id)}
            >
              <Ionicons
                name={scenario.icon as any}
                size={24}
                color={currentScenario === scenario.id ? '#fff' : '#007AFF'}
              />
              <Text
                style={[
                  styles.scenarioText,
                  currentScenario === scenario.id && styles.scenarioTextActive,
                ]}
              >
                {scenario.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.controlsContainer}>
        <Text style={styles.sectionTitle}>Управление</Text>
        <View style={styles.controlsGrid}>
          {controlItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.controlItem}
              onPress={item.onPress}
            >
              <View style={styles.controlIconContainer}>
                <Ionicons name={item.icon as any} size={24} color="#007AFF" />
              </View>
              <Text style={styles.controlText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
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
    marginBottom: 15,
  },
  masterSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  masterSwitchLabel: {
    fontSize: 16,
    color: '#666',
  },
  scenariosContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  scenariosList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scenarioButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    width: '23%',
  },
  scenarioButtonActive: {
    backgroundColor: '#007AFF',
  },
  scenarioText: {
    marginTop: 5,
    color: '#007AFF',
    fontSize: 12,
  },
  scenarioTextActive: {
    color: '#fff',
  },
  controlsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 15,
  },
  controlsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -10,
  },
  controlItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '50%',
    padding: 10,
  },
  controlIconContainer: {
    backgroundColor: '#f0f0f0',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  controlText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
}); 