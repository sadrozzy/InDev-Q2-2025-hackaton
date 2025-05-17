-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('guest', 'admin', 'hotel_staff');

-- CreateEnum
CREATE TYPE "RoomStatus" AS ENUM ('available', 'occupied', 'cleaning', 'maintenance', 'out_of_order');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('pending_payment', 'confirmed', 'checked_in', 'checked_out', 'cancelled', 'no_show');

-- CreateEnum
CREATE TYPE "MusicServiceOptions" AS ENUM ('spotify', 'yandex_music', 'default_sound');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "phone_number" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'guest',
    "onboarding_completed" BOOLEAN NOT NULL DEFAULT false,
    "preferences" JSONB,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_types" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "capacity" INTEGER NOT NULL,
    "base_price_per_night" DECIMAL(10,2) NOT NULL,
    "amenities" JSONB,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "room_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "room_type_id" UUID NOT NULL,
    "room_number" TEXT NOT NULL,
    "status" "RoomStatus" NOT NULL DEFAULT 'available',
    "ble_door_device_id" TEXT,
    "ble_lighting_system_id" TEXT,
    "ble_climate_control_id" TEXT,
    "ble_curtain_control_id" TEXT,
    "current_scenario_name" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "room_id" UUID NOT NULL,
    "check_in_date_time" TIMESTAMPTZ NOT NULL,
    "check_out_date_time" TIMESTAMPTZ NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'confirmed',
    "total_price" DECIMAL(10,2) NOT NULL,
    "special_requests" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_control_states" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "room_id" UUID NOT NULL,
    "lighting_state" JSONB,
    "climate_state" JSONB,
    "curtain_state" JSONB,
    "dnd_active" BOOLEAN NOT NULL DEFAULT false,
    "last_changed_by_user_id" UUID,
    "last_updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "room_control_states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_scenarios" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "scenario_name" TEXT NOT NULL,
    "description" TEXT,
    "lighting_settings" JSONB,
    "climate_settings" JSONB,
    "curtain_settings" JSONB,
    "dnd_activation" BOOLEAN,
    "is_system_scenario" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "room_scenarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alarms" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "booking_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "room_id" UUID NOT NULL,
    "alarm_time" TIME NOT NULL,
    "days_of_week" TEXT[],
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "label" TEXT,
    "music_service" "MusicServiceOptions",
    "music_resource_uri" TEXT,
    "linked_scenario_name" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "alarms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guest_access_permissions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "booking_id" UUID NOT NULL,
    "primary_guest_user_id" UUID NOT NULL,
    "shared_with_user_id" UUID,
    "shared_with_email_or_phone" TEXT,
    "room_id" UUID NOT NULL,
    "access_start_time" TIMESTAMPTZ NOT NULL,
    "access_end_time" TIMESTAMPTZ NOT NULL,
    "ble_temporary_key_info" JSONB,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guest_access_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "users"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_room_number_key" ON "rooms"("room_number");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_ble_door_device_id_key" ON "rooms"("ble_door_device_id");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_ble_lighting_system_id_key" ON "rooms"("ble_lighting_system_id");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_ble_climate_control_id_key" ON "rooms"("ble_climate_control_id");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_ble_curtain_control_id_key" ON "rooms"("ble_curtain_control_id");

-- CreateIndex
CREATE UNIQUE INDEX "room_control_states_room_id_key" ON "room_control_states"("room_id");

-- CreateIndex
CREATE UNIQUE INDEX "room_scenarios_scenario_name_key" ON "room_scenarios"("scenario_name");

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_room_type_id_fkey" FOREIGN KEY ("room_type_id") REFERENCES "room_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_current_scenario_name_fkey" FOREIGN KEY ("current_scenario_name") REFERENCES "room_scenarios"("scenario_name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_control_states" ADD CONSTRAINT "room_control_states_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_control_states" ADD CONSTRAINT "room_control_states_last_changed_by_user_id_fkey" FOREIGN KEY ("last_changed_by_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alarms" ADD CONSTRAINT "alarms_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alarms" ADD CONSTRAINT "alarms_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alarms" ADD CONSTRAINT "alarms_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alarms" ADD CONSTRAINT "alarms_linked_scenario_name_fkey" FOREIGN KEY ("linked_scenario_name") REFERENCES "room_scenarios"("scenario_name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guest_access_permissions" ADD CONSTRAINT "guest_access_permissions_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guest_access_permissions" ADD CONSTRAINT "guest_access_permissions_primary_guest_user_id_fkey" FOREIGN KEY ("primary_guest_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guest_access_permissions" ADD CONSTRAINT "guest_access_permissions_shared_with_user_id_fkey" FOREIGN KEY ("shared_with_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guest_access_permissions" ADD CONSTRAINT "guest_access_permissions_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
