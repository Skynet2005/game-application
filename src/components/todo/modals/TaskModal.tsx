// src/components/todo/modals/TaskModal.tsx
'use client';
import * as z from 'zod';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Tilt from 'react-parallax-tilt';
import Image from 'next/image';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FileUpload } from '@/lib/image-utils/file-upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useBoardStore } from '@/components/todo/stores/BoardStore';
import TaskTypeRadioGroup from '../lib/TaskTypeRadioGroup';
import { TypedColumn } from '../utils/types';

const TaskSchema = z.object({
  task: z.string().min(1, 'Task name is required'),
  type: z.enum(['todo', 'inprogress', 'done'])
});

interface Props {
  addTask: (todo: string, columnId: string | TypedColumn, fileUrl?: string | null) => void;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const TodoModal: React.FC<Props> = ({ addTask, isOpen, onClose }) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const { newTaskType } = useBoardStore();
  const form = useForm({ resolver: zodResolver(TaskSchema) });

  const onModalSubmit = async (fileUrl?: string) => { if (fileUrl) { setFileUrl(fileUrl); } };
  const onSubmit: SubmitHandler<any> = values => { if (values.task) { addTask(values.task, newTaskType, fileUrl); onClose(); } };

  return (
    <>
      <Dialog open={isOpen}>
        <DialogContent className="bg-neutral-300 rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-neutral-800">
              Add a Task
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField name="task" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="task">
                    Task Name
                  </FormLabel>
                  <Input type="text" id="task" {...field} className="mt-1 p-2 w-full border rounded-md" />
                  <FormMessage>
                    {form.formState.errors.task?.message ? form.formState.errors.task.message.toString() : ''}
                  </FormMessage>
                </FormItem>
              )} />
              <TaskTypeRadioGroup />
              <FormItem>
                <FormLabel>Attachment</FormLabel>
                <FileUpload endpoint="messageFile" />
              </FormItem>
              {fileUrl && (
                <div className="flex justify-center mt-2">
                  <Tilt>
                    <Image alt="Uploaded Image" src={fileUrl} width={100} height={100} />
                  </Tilt>
                </div>
              )}
              <Button type="submit" className="mt-4">
                Submit
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TodoModal;
