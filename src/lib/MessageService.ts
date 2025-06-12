export class MessageService {
  private static instance: MessageService;
  private messages: {
    [userId in string]: { componentId: string; message: string }[];
  } = {};

  private constructor() {}

  public static getInstance(): MessageService {
    return this.instance || (this.instance = new this());
  }

  public addMessage(
    userId: string,
    componentId: string,
    message: string
  ): void {
    if (userId in this.messages) {
      this.messages[userId].push({
        componentId,
        message: message,
      });
    } else {
      this.messages[userId] = [{ componentId, message }];
    }
  }

  public getMessages(userId: string): {
    componentId: string;
    message: string;
  }[] {
    const messages = this.messages[userId] || [];
    this.messages[userId] = [];

    return messages;
  }
}