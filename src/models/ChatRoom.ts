import { IUserData } from "./Users";

export interface IChatRoom {
    chat_room_id: number;
    room_name: string;
    members: IUserData[];
}