import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { question, messages } = body;

    if (!question) {
      return NextResponse.json({ success: false, message: 'Question is required' }, { status: 400 });
    }

    const apiKey = process.env.RAG_API_KEY;
    const appKey = process.env.RAG_APP_KEY;

    if (!apiKey || !appKey) {
      console.error('RAG API keys missing in environment variables');
      return NextResponse.json({ success: false, message: 'Server configuration error' }, { status: 500 });
    }

    const payload = { question };
    if (messages && Array.isArray(messages) && messages.length > 0) {
      payload.messages = messages;
    }

    const res = await fetch('https://rag-bot.duckdns.org/api/v1/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'x-application-key': appKey
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('RAG API Error:', res.status, errorText);
      return NextResponse.json({ success: false, message: 'Failed to fetch answer from AI' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Chat API Route Error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
