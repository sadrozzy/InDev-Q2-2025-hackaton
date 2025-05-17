export type RootStackParamList = {
  Auth: undefined;
  Onboarding: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Booking: undefined;
  Room: undefined;
  Profile: undefined;
};

export type BookingStackParamList = {
  RoomList: undefined;
  RoomDetails: { roomId: string; checkIn?: string; checkOut?: string };
  BookingConfirmation: { roomId: string; checkIn: string; checkOut: string };
};

export type RoomManagementStackParamList = {
  RoomControl: { roomId: string };
  Lighting: { roomId: string };
  Climate: { roomId: string };
  Curtains: { roomId: string };
  Access: { roomId: string };
  Scenarios: { roomId: string };
  Alarms: { roomId: string };
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  Settings: undefined;
  Notifications: undefined;
}; 