/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

class MessageQueue {
  private static instance: MessageQueue;
  private messages: {
    [userId in string]: { componentId: string; message: string }[];
  } = {};

  private constructor() {}

  public static getInstance(): MessageQueue {
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

  public logMessages() {
    console.log(this.messages);
  }
}

(global as any).instance = MessageQueue.getInstance();

// Export async functions instead of the class
export async function addMessage(
  userId: string,
  componentId: string,
  message: string
): Promise<void> {
  return (global as any).instance.addMessage(
    userId,
    componentId,
    message + `by: ${userId}`
  );
}

export async function getMessages(userId: string): Promise<
  {
    componentId: string;
    message: string;
  }[]
> {
  return (global as any).instance.getMessages(userId);
}
