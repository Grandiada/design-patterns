"use server";

import { NextResponse } from "next/server";
import { getMessages } from "./types/MessageQueue";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId || userId === "null") {
    return new NextResponse("User ID is required", { status: 400 });
  }
  let intervalId: NodeJS.Timeout;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      intervalId = setInterval(async () => {
        const messages = await getMessages(userId);
        let message = JSON.stringify({
          refresh: true,
        });
        if (messages.length > 0) {
          message = JSON.stringify(messages);
        }

        controller.enqueue(encoder.encode(`data: ${message}\n\n`));
      }, 1000);

      return () => clearInterval(intervalId);
    },
    cancel() {
      clearInterval(intervalId);
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
