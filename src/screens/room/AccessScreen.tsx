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

type AccessScreenProps = {
  navigation: NativeStackNavigationProp<RoomManagementStackParamList, 'Access'>;
  route: RouteProp<RoomManagementStackParamList, 'Access'>;
};

type AccessUser = {
  id: string;
  name: string;
  role: 'admin' | 'guest' | 'staff';
  accessLevel: 'full' | 'limited' | 'temporary';
  isActive: boolean;
  lastAccess?: string;
};

export default function AccessScreen({ navigation, route }: AccessScreenProps) {
  const [users, setUsers] = useState<AccessUser[]>([
    {
      id: '1',
      name: 'Иван Иванов',
      role: 'admin',
      accessLevel: 'full',
      isActive: true,
      lastAccess: '2024-03-20 15:30',
    },
    {
      id: '2',
      name: 'Мария Петрова',
      role: 'guest',
      accessLevel: 'limited',
      isActive: true,
      lastAccess: '2024-03-20 14:15',
    },
    {
      id: '3',
      name: 'Алексей Сидоров',
      role: 'staff',
      accessLevel: 'temporary',
      isActive: false,
      lastAccess: '2024-03-19 18:45',
    },
  ]);

  const [isDoorLocked, setIsDoorLocked] = useState(true);
  const [isAutoLockEnabled, setIsAutoLockEnabled] = useState(true);

  const toggleUserAccess = (id: string) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === id ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  const getRoleColor = (role: AccessUser['role']) => {
    switch (role) {
      case 'admin':
        return '#007AFF';
      case 'staff':
        return '#34C759';
      case 'guest':
        return '#FF9500';
      default:
        return '#666';
    }
  };

  const getAccessLevelText = (level: AccessUser['accessLevel']) => {
    switch (level) {
      case 'full':
        return 'Полный доступ';
      case 'limited':
        return 'Ограниченный доступ';
      case 'temporary':
        return 'Временный доступ';
      default:
        return '';
    }
  };

  const renderUser = (user: AccessUser) => (
    <View key={user.id} style={styles.userCard}>
      <View style={styles.userHeader}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <View style={styles.userDetails}>
            <Text
              style={[styles.userRole, { color: getRoleColor(user.role) }]}
            >
              {user.role === 'admin'
                ? 'Администратор'
                : user.role === 'staff'
                ? 'Персонал'
                : 'Гость'}
            </Text>
            <Text style={styles.userAccessLevel}>
              {getAccessLevelText(user.accessLevel)}
            </Text>
          </View>
          {user.lastAccess && (
            <Text style={styles.lastAccess}>
              Последний вход: {user.lastAccess}
            </Text>
          )}
        </View>
        <Switch
          value={user.isActive}
          onValueChange={() => toggleUserAccess(user.id)}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={user.isActive ? '#007AFF' : '#f4f3f4'}
        />
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Управление доступом</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.doorControlCard}>
          <View style={styles.doorControlHeader}>
            <View style={styles.doorControlInfo}>
              <Text style={styles.doorControlTitle}>Дверь</Text>
              <Text style={styles.doorControlStatus}>
                {isDoorLocked ? 'Заблокирована' : 'Разблокирована'}
              </Text>
            </View>
            <Switch
              value={isDoorLocked}
              onValueChange={setIsDoorLocked}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isDoorLocked ? '#007AFF' : '#f4f3f4'}
            />
          </View>

          <View style={styles.autoLockContainer}>
            <View style={styles.autoLockInfo}>
              <Text style={styles.autoLockTitle}>Автоблокировка</Text>
              <Text style={styles.autoLockDescription}>
                Автоматическая блокировка через 30 секунд после закрытия
              </Text>
            </View>
            <Switch
              value={isAutoLockEnabled}
              onValueChange={setIsAutoLockEnabled}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isAutoLockEnabled ? '#007AFF' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.usersSection}>
          <Text style={styles.sectionTitle}>Пользователи с доступом</Text>
          {users.map(renderUser)}
        </View>

        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Добавить пользователя</Text>
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
  doorControlCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  doorControlHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  doorControlInfo: {
    flex: 1,
  },
  doorControlTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  doorControlStatus: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  autoLockContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  autoLockInfo: {
    flex: 1,
  },
  autoLockTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  autoLockDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  usersSection: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 10,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userDetails: {
    flexDirection: 'row',
    marginTop: 4,
  },
  userRole: {
    fontSize: 14,
    marginRight: 8,
  },
  userAccessLevel: {
    fontSize: 14,
    color: '#666',
  },
  lastAccess: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
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