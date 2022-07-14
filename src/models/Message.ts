export interface IMessage {
    chat_message_id: number;
    chat_room_id: number;
    user_id: number | 'system';
    text: string;
    timestamp: Date;
}