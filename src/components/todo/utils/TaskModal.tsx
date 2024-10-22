// src/components/todo/utils/TaskModal.tsx
'use client';
import { useRef, useEffect, useState, ChangeEvent } from 'react';
import { useBoardStore } from '@/components/todo/stores/BoardStore';
import TaskTypeRadioGroup from '../lib/TaskTypeRadioGroup';
import { TypedColumn } from './types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Props {
  addTask: (todo: string, columnId: TypedColumn, image?: File | null) => void;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const TaskModal: React.FC<Props> = ({ addTask, isOpen, onClose }) => {
  const [newTaskInput, setNewTaskInput] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const { newTaskType } = useBoardStore(state => state);
  const imagePickerRef = useRef<HTMLInputElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file?.type.startsWith('image/')) {
      setImage(file);
    }
  };

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  return (
    <div className="bg-neutral-300 rounded-xl">
      <Dialog open={isOpen} className="bg-neutral-300">
        <DialogContent ref={modalRef} className="rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-neutral-800">Add a Task</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={e => {
              e.preventDefault();
              if (!newTaskInput) return;
              addTask(newTaskInput, newTaskType, image);
              setImage(null);
              onClose();
            }}
          >
            <div className="mb-4 rounded-xl">
              <input
                type="text"
                id="task"
                className="mt-1 p-2 w-full border rounded-md"
                onChange={e => setNewTaskInput(e.target.value)}
              />
            </div>
            <TaskTypeRadioGroup />
            <div className="mt-2 rounded-lg bg-neutral-700 hover:bg-neutral-900 flex justify-center">
              <Button
                title="upload image"
                onClick={() => imagePickerRef.current?.click()}
                type="button"
                className="focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <Image
                  src="/placeholder.png"
                  alt="upload image"
                  width={40}
                  height={25}
                />
              </Button>
            </div>
            {image && (
              <div className="flex justify-center mt-2">
                <div className="w-50 h-50 overflow-hidden rounded">
                  <Image
                    alt="Uploaded Image"
                    width={200}
                    height={200}
                    src={URL.createObjectURL(image)}
                  />
                </div>
              </div>
            )}
            <input
              type="file"
              ref={imagePickerRef}
              hidden
              onChange={handleImageChange}
            />
            <div className="flex justify-end mt-4">
              <Button
                type="submit"
                className="px-4 py-2 bg-neutral-700 text-green-700 rounded-md"
              >
                Submit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskModal;
