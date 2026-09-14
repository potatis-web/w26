export interface TodoType {
  text: string;
  id: string;
  completed: boolean;
}

export interface ForumType {
  text: string;
  path: string;
  messages: MessageType[]
};

export interface MessageType {
  text: string;
  date: Date;
};