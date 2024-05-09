interface MessageModel {
  id: string;
  created: Date;
  content: string;
  file: string;
  userId: string;
  userName: string;
  avatar: string;
  isYourMessage: boolean;
}
