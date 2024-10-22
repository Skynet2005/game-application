// src/app/(dashboard)/(routes)/cyber-rant/(routes)/comment.tsx
'use client';
import { z } from 'zod';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { usePathname } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import { CommentValidationExtended } from '@/components/cyber-rant/lib/validations/thread';
import { addCommentToThread } from '@/components/cyber-rant/lib/actions/thread.actions';
import { AiInputModal } from '@/components/cyber-rant/shared/aiModal';
import { useAiInputStore } from '@/components/cyber-rant/hooks/use-ai-store';
import { useDialogStore } from '@/components/cyber-rant/lib/stores/dialogStore';

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

const Comment: React.FC<Props> = ({ threadId, currentUserImg, currentUserId }) => {
  const { setAiInput } = useAiInputStore();
  const { openDialog } = useDialogStore();

  const pathname = usePathname();

  // Initialize form with extended validation schema
  const form = useForm<z.infer<typeof CommentValidationExtended>>({
    resolver: zodResolver(CommentValidationExtended),
    defaultValues: { thread: '', aiInput: '' },
  });

  // Open the AI modal to get the AI input
  const handlePrompt = () => {
    setAiInput(form.getValues('thread')); // Use setAiInput to store the current thread value
    openDialog();
  };

  const onSubmit = async (values: z.infer<typeof CommentValidationExtended>) => {
    if (!pathname) return;
    await addCommentToThread(threadId, values.thread, currentUserId, pathname);
    form.reset();
  };

  return (
    <>
      <AiInputModal />
      <Form {...form}>
        <form className="mt-10 flex items-center gap-4 border-y-2 border-neutral-500 py-5 max-xs:flex-col" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField control={form.control} name="thread" render={({ field }) => (
            <FormItem className="flex w-full items-center gap-3">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt="current_user"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="border-neutral-950 dark:border-sky-800 rant-gradient rounded-xl">
                <Textarea
                  {...field}
                  placeholder="Comment..."
                  className="no-focus text-neutral-200 outline-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
          <Button
            type="button"
            className="rounded-xl border bg-red-950 px-8 py-2 !text-sm text-sky-700 font-bold max-xs:w-full"
            onClick={handlePrompt}
          >
            Trigger AI
          </Button>
          <Button type="submit" className="rounded-xl border bg-red-950 px-8 py-2 !text-sm text-sky-700 font-bold max-xs:w-full">
            Reply
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Comment;
