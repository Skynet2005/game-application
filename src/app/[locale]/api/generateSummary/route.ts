// src/app/api/generateSummary/route.ts
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  try {
    // Extract the `todos` and `userName` from the body of the request
    const { todos, userName } = await req.json();

    // Request the OpenAI API for the response based on the messages
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `Welcome the user and summarize the todos, here is the user's name: ${JSON.stringify(userName)}`,
        },
        {
          role: 'user',
          content: `Provide a summary of the following todos. Count how many todos are in each category such as To do, in progress and done, and add a word of encouragement, Here's the data: ${JSON.stringify(todos)}`,
        },
      ],
      max_tokens: 500,
      temperature: 0.9,
      top_p: 1,
      frequency_penalty: 1,
      presence_penalty: 1,
    });

    console.log(completion.choices[0]);

    // Return the response from the OpenAI API
    // Return the response from the OpenAI API
    return NextResponse.json({ message: completion.choices[0].message });
  } catch (error) {
    console.error('[API_GENERATESUMMARY_POST]', error);
    return new NextResponse('Internal Error: API_GENERATESUMMARY_POST', { status: 500 });
  }
}
