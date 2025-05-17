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

type ScenariosScreenProps = {
  navigation: NativeStackNavigationProp<RoomManagementStackParamList, 'Scenarios'>;
  route: RouteProp<RoomManagementStackParamList, 'Scenarios'>;
};

type Scenario = {
  id: string;
  name: string;
  description: string;
  icon: string;
  isActive: boolean;
  actions: {
    lighting: string;
    climate: string;
    curtains: string;
  };
};

export default function ScenariosScreen({
  navigation,
  route,
}: ScenariosScreenProps) {
  const [scenarios, setScenarios] = useState<Scenario[]>([
    {
      id: '1',
      name: 'Обычный',
      description: 'Стандартные настройки для повседневного использования',
      icon: 'home',
      isActive: true,
      actions: {
        lighting: 'Яркий свет',
        climate: '22°C, 45% влажности',
        curtains: 'Открыты',
      },
    },
    {
      id: '2',
      name: 'Сон',
      description: 'Оптимальные настройки для сна',
      icon: 'moon',
      isActive: false,
      actions: {
        lighting: 'Приглушенный свет',
        climate: '20°C, 50% влажности',
        curtains: 'Закрыты',
      },
    },
    {
      id: '3',
      name: 'Фокус',
      description: 'Настройки для работы и концентрации',
      icon: 'bulb',
      isActive: false,
      actions: {
        lighting: 'Яркий свет на рабочем месте',
        climate: '23°C, 40% влажности',
        curtains: 'Полуоткрыты',
      },
    },
    {
      id: '4',
      name: 'Отдых',
      description: 'Комфортные настройки для отдыха',
      icon: 'cafe',
      isActive: false,
      actions: {
        lighting: 'Теплый свет',
        climate: '24°C, 45% влажности',
        curtains: 'Полуоткрыты',
      },
    },
  ]);

  const toggleScenario = (id: string) => {
    setScenarios(prev =>
      prev.map(scenario => ({
        ...scenario,
        isActive: scenario.id === id ? !scenario.isActive : false,
      }))
    );
  };

  const renderScenario = (scenario: Scenario) => (
    <View key={scenario.id} style={styles.scenarioCard}>
      <View style={styles.scenarioHeader}>
        <View style={styles.scenarioInfo}>
          <View style={styles.scenarioTitleRow}>
            <Ionicons
              name={scenario.icon as any}
              size={24}
              color="#007AFF"
              style={styles.scenarioIcon}
            />
            <Text style={styles.scenarioName}>{scenario.name}</Text>
          </View>
          <Text style={styles.scenarioDescription}>
            {scenario.description}
          </Text>
        </View>
        <Switch
          value={scenario.isActive}
          onValueChange={() => toggleScenario(scenario.id)}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={scenario.isActive ? '#007AFF' : '#f4f3f4'}
        />
      </View>

      {scenario.isActive && (
        <View style={styles.actionsContainer}>
          <View style={styles.actionRow}>
            <Ionicons name="sunny" size={20} color="#666" />
            <Text style={styles.actionText}>{scenario.actions.lighting}</Text>
          </View>
          <View style={styles.actionRow}>
            <Ionicons name="thermometer" size={20} color="#666" />
            <Text style={styles.actionText}>{scenario.actions.climate}</Text>
          </View>
          <View style={styles.actionRow}>
            <Ionicons name="open" size={20} color="#666" />
            <Text style={styles.actionText}>{scenario.actions.curtains}</Text>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Сценарии</Text>
      </View>

      <View style={styles.content}>
        {scenarios.map(renderScenario)}

        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Создать сценарий</Text>
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
  scenarioCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  scenarioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  scenarioInfo: {
    flex: 1,
  },
  scenarioTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scenarioIcon: {
    marginRight: 8,
  },
  scenarioName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scenarioDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  actionsContainer: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
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