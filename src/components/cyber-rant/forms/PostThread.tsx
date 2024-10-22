"use client";
import axios from "axios";
import qs from "query-string";
import { useEffect, useState } from 'react';
import * as z from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';
import { useUser, useOrganization } from '@clerk/nextjs';
import { Plus } from "lucide-react";
import Tilt from "react-parallax-tilt";
import Image from 'next/image';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { FileUpload } from "@/components/messenger/lib/file-upload";
import { EmojiPicker } from "@/components/messenger/custom-ui/emoji-picker";
import { ThreadValidation } from '@/components/cyber-rant/lib/validations/thread';
import { createThread } from '@/components/cyber-rant/lib/actions/thread.actions';
import { useCyberRantModal } from "@/components/cyber-rant/hooks/use-rant-store";

interface PostThreadProps { userId: string; }
interface FormValues { thread: string; accountId: string | undefined; image?: string | null; }

const formSchema = z.object({ fileUrl: z.string().min(1, { message: "Attachment is required." }) });

const PostThread: React.FC<PostThreadProps> = ({ userId }) => {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const { organization } = useOrganization();
  const [imageFile, setImageFile] = useState<string | null>(null);
  const { isOpen, onClose, type, data, onOpen } = useCyberRantModal();

  const modalForm = useForm({ resolver: zodResolver(formSchema), defaultValues: { fileUrl: "" } });
  const { apiUrl, query } = data;

  const handleOpenModal = () => { onOpen("messageFile", { query: {} }); };
  const handleClose = () => { modalForm.reset(); onClose(); };

  const onModalSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({ url: apiUrl || "", query });
      const response = await axios.post(url, { ...values, content: values.fileUrl });
      if (response.status === 200) {
        const uploadedFile = response.data.file;
        setImageFile(uploadedFile);
        onClose();
      }
    } catch (error) {
      console.error("Error uploading the file: ", error);
    }
  };

  useEffect(() => { if (imageFile !== null) { onClose(); modalForm.reset(); } }, [imageFile, onClose, modalForm]);

  const handleFileUpload = (fileUrl?: string) => { if (fileUrl) { setImageFile(fileUrl); } };
  const form = useForm<FormValues>({ resolver: zodResolver(ThreadValidation), defaultValues: { thread: '', accountId: user ? String(user.id) : undefined }, });
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    console.log('Submitting', values)
    if (values.accountId) {
      await createThread({ text: values.thread, author: userId, communityId: organization ? organization.id : null, path: pathname || '', imageFile: imageFile, });
      router.push('/cyber-rant');
    }
  };

  return (
    <>
      <Form {...form}>
        <form className="mt-10 pt-2 flex flex-col justify-start gap-10 rounded-xl" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField control={form.control} name="thread" render={({ field }) => (
            <div>
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="text-[16px] leading-[16px] font-medium text-neutral-950 dark:text-neutral-300">
                  Unleash Your Rant 📣
                  <div className="flex items-center justify-start mt-2">
                    <Button type="button" onClick={handleOpenModal}>
                      <Plus className="bg-neutral-500 text-white dark:text-neutral-950 rounded-full" />
                    </Button>
                    <EmojiPicker onChange={(emoji: string) => form.setValue('thread', `${form.getValues().thread} ${emoji}`)} />
                  </div>
                </FormLabel>
                <FormControl className="rant-gradient no-focus border border-neutral-950 dark:border-sky-800 text-sky-800 dark:text-neutral-300">
                  <Textarea rows={15} {...field} placeholder="What's on your CyberMind? Go ahead, we're all ears... or algorithms...." />
                </FormControl>
              </FormItem>
              <FormMessage />
            </div>
          )} />
          <div className="w-full flex flex-col text-center justify-center">
            <Button type="submit" className="cyberrant-gradient border bg-red-950 hover:bg-red-900 focus:bg-red-900 active:bg-red-950">
              {form.formState.isSubmitting ? "Sending..." : "Blast it into the CyberSphere 🚀"}
            </Button>
            <p className="text-red-900 pt-1">(Once Uploaded See Preview Below)</p>
          </div>
          <div className="flex justify-center items-start h-screen">
            <Tilt>
              {imageFile && <Image src={imageFile} alt="Uploaded Preview" width={400} height={400} sizes="(max-width: 300px) 100px, (max-width: 300px) 150px, 300px" className="rounded-xl" />}
            </Tilt>
          </div>
        </form>
      </Form>
      <Dialog open={isOpen && type === "messageFile"} onOpenChange={handleClose}>
        <DialogContent className="bg-gradient-to-br from-red-950 via-red-800 to-black text-black p-0 overflow-hidden border border-sky-800">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Add an attachment
            </DialogTitle>
            <DialogDescription className="text-center text-neutral-300">
              Send a file as a message
            </DialogDescription>
          </DialogHeader>
          <Form {...modalForm}>
            <form onSubmit={modalForm.handleSubmit(onModalSubmit)} className="space-y-8">
              <div className="space-y-8 px-6">
                <div className="sky-gradient flex items-center justify-center text-center text-neural-300 mb-[50px] border border-nuetral-950 rounded-xl">
                  <FormField control={modalForm.control} name="fileUrl" render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload endpoint="messageFile" value={field.value} onChange={handleFileUpload} />
                      </FormControl>
                    </FormItem>
                  )}
                  />
                </div>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PostThread;
