export type User = {
  user_id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  role: 'guest' | 'admin' | 'hotel_staff';
  onboarding_completed: boolean;
  preferences?: Record<string, any>;
};

export type RoomType = {
  room_type_id: string;
  name: string;
  description?: string;
  capacity: number;
  base_price_per_night: number;
  amenities?: Record<string, any>;
};

export type Room = {
  room_id: string;
  room_type_id: string;
  room_number: string;
  status: 'available' | 'occupied' | 'cleaning' | 'maintenance' | 'out_of_order';
  image_url?: string;
  ble_door_device_id?: string;
  ble_lighting_system_id?: string;
  ble_climate_control_id?: string;
  ble_curtain_control_id?: string;
  current_scenario_name?: string;
  notes?: string;
};

export type Booking = {
  booking_id: string;
  user_id: string;
  room_id: string;
  check_in_date_time: string;
  check_out_date_time: string;
  status: 'pending_payment' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled' | 'no_show';
  total_price: number;
  special_requests?: string;
};

export type RoomControlState = {
  room_control_state_id: string;
  room_id: string;
  lighting_state?: Record<string, any>;
  climate_state?: Record<string, any>;
  curtain_state?: Record<string, any>;
  dnd_active: boolean;
  last_changed_by_user_id?: string;
};

export type RoomScenario = {
  scenario_id: string;
  scenario_name: string;
  description?: string;
  lighting_settings?: Record<string, any>;
  climate_settings?: Record<string, any>;
  curtain_settings?: Record<string, any>;
  dnd_activation?: boolean;
  is_system_scenario: boolean;
};

export type Alarm = {
  alarm_id: string;
  booking_id: string;
  user_id: string;
  room_id: string;
  alarm_time: string;
  days_of_week: string[];
  is_active: boolean;
  label?: string;
  music_service?: 'spotify' | 'yandex_music' | 'default_sound';
  music_resource_uri?: string;
  linked_scenario_name?: string;
};

export type GuestAccessPermission = {
  permission_id: string;
  booking_id: string;
  primary_guest_user_id: string;
  shared_with_user_id?: string;
  shared_with_email_or_phone?: string;
  room_id: string;
  access_start_time: string;
  access_end_time: string;
  ble_temporary_key_info?: Record<string, any>;
  is_active: boolean;
}; 