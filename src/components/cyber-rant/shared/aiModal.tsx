// src/components/cyber-rant/shared/aiModal.tsx
"use client"
import { useState, useRef, FormEvent, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader } from "../custom-ui/ai-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChat } from 'ai/react';
import { useDialogStore } from '../lib/stores/dialogStore';

export const AiInputModal = () => {
  const { isOpen, closeDialog } = useDialogStore();
  const { messages, input, handleInputChange, handleSubmit: handleChatSubmit } = useChat({
    api: '/api/aiModels/Openai'
  });

  const formRef = useRef<HTMLFormElement>(null);
  const [aiMessages, setAiMessages] = useState<string[]>([]);

  const handleChatSubmitWrapper = async (input: string) => {
    const syntheticEvent = {
      preventDefault: () => { },
      currentTarget: {
        value: input
      }
    } as unknown as FormEvent<HTMLFormElement>;

    await handleChatSubmit(syntheticEvent);
  };

  useEffect(() => {
    const newAiMessages = messages.filter(m => m.role === 'assistant').map(m => m.content);
    setAiMessages(newAiMessages);
  }, [messages]);

  const handleCopy = () => {
    const aiText = aiMessages.join('\n');
    navigator.clipboard.writeText(aiText);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      await handleChatSubmitWrapper(input);
    } catch (error) {
      console.error("Error submitting to API:", error);
    }
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const handleClose = () => {
    closeDialog();
  };

  return (
    <div className="fixed top-0 w-full">
      <ul>
        {messages.map((m, index) => (
          <li key={index}>
            {m.role === 'user' ? 'User: ' : 'AI: '}
            {m.content}
          </li>
        ))}
      </ul>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="cyberrant-gradient text-black p-0 overflow-y-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogDescription className="text-center text-text-neutral-950 dark:text-neutral-300">
              Ask AI anything...
            </DialogDescription>
          </DialogHeader>
          <div className="px-6">
            <Textarea
              className="w-full h-[30px] text-neutral-950 dark:text-neutral-300 bg-neutral-300 dark:bg-neutral-800"
              value={input}
              onChange={handleInputChange}
            />
          </div>
          <DialogFooter className="bg-neutral-950 dark:bg-neutral-300 px-6 py-4">
            <Button variant="primary" onClick={handleCopy} className="text-neutral-950 dark:text-neutral-300 border border-neutral-950 dark:border-neutral-300">
              Copy
            </Button>
            <Button variant="primary" onClick={handleSubmit} className="text-neutral-950 dark:text-neutral-300 border border-neutral-950 dark:border-neutral-300">
              Submit
            </Button>
            <Button variant="secondary" onClick={handleClose} className="text-neutral-950 dark:text-neutral-300 border border-neutral-950 dark:border-neutral-300">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
