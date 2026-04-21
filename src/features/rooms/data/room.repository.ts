import type { Room } from '@/types/room';

import { mockRooms } from './room.mock';

export const getRooms = (): Room[] => mockRooms;
