// src/components/cyber-rant/CommunityProfile.tsx
'use client';

import * as z from 'zod';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Satisfy, Abril_Fatface } from 'next/font/google';
import cn from 'clsx';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { CommunityValidation } from '@/components/cyber-rant/lib/validations/community';
import { updateCommunityInfo } from '@/components/cyber-rant/lib/actions/community.actions'; // Ensure this function is used appropriately
import { CldUploadButton } from 'next-cloudinary'; // Import the Cloudinary upload button

interface CommunityProps {
  community: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

const font = Satisfy({ weight: '400', subsets: ['latin'] });
const font2 = Abril_Fatface({ weight: '400', subsets: ['latin'] });

const CommunityProfile = ({ community: initialCommunity, btnTitle }: CommunityProps) => {
  const [community, setCommunity] = useState(initialCommunity);
  const router = useRouter();
  const pathname = usePathname();
  const [imageId, setImageId] = useState('');

  const form = useForm<z.infer<typeof CommunityValidation>>({
    resolver: zodResolver(CommunityValidation),
    defaultValues: {
      community_photo: community?.image ? community.image : '',
      name: community?.name || '',
      username: community?.username || '',
      bio: community?.bio || '',
    },
  });

  const onUpload = (result: any) => {
    if (result.event === 'success' && result.info) {
      const info = result.info as { public_id: string };
      setImageId(info.public_id);
    }
  };

  const onSubmit = async (values: z.infer<typeof CommunityValidation>) => {
    const updatedCommunity = { ...community };
    const hasImageChanged = imageId !== '';

    if (hasImageChanged) {
      values.community_photo = imageId;
      updatedCommunity.image = imageId;
      setCommunity(updatedCommunity);
    }

    const payload = {
      eventType: "organization.created",
      name: values.name,
      username: values.username,
      bio: values.bio,
      image: updatedCommunity.image
    };

    // Send data to your webhook API
    try {
      const res = await fetch("/app/api/webhook/clerk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        console.log("Data successfully sent to the webhook");
      } else {
        console.log("Failed to send data to the webhook");
      }
    } catch (error) {
      console.error("An error occurred while sending data to the webhook:", error);
    }

    // Use updateCommunityInfo to update the community information in the database
    try {
      await updateCommunityInfo({
        id: community.id,
        name: values.name,
        username: values.username,
        image: updatedCommunity.image,
        bio: values.bio,
        createdById: community.objectId,
        path: pathname
      });
    } catch (error) {
      console.error("An error occurred while updating community information:", error);
    }

    if (pathname === '/cyber-rant/communities/edit') {
      router.back();
    } else {
      router.push('/cyber-rant/communities');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("cyberrant-gradient flex flex-col justify-start gap-10 p-4 rounded-xl border-2 border-neutral-950 dark:border-neutral-300 dark:bg-neutral-800", font.className)}>
        <FormField control={form.control} name="community_photo" render={({ field }) => (
          <FormItem className="flex items-center gap-4">
            <FormLabel className="flex h-24 w-24 items-center justify-center rounded-full text-neutral-950">
              {field.value ? (
                <Image
                  src={field.value}
                  alt="community_icon"
                  width={89}
                  height={89}
                  priority
                  className="object-contain bg-transparent rounded-full border-2 border-neutral-950 dark:border-neutral-300"
                />
              ) : (
                <Image
                  src="/placeholder.png"
                  alt="community_icon"
                  width={89}
                  height={89}
                  className="sky-gradient object-contain rounded-full border-2 border-none"
                />
              )}
            </FormLabel>
            <FormControl className="flex-1 text-[16px] leading-[140%] font-semibold text-neutral-950">
              <CldUploadButton onUpload={onUpload} uploadPreset="vhvkq6am" />
            </FormControl>
          </FormItem>
        )} />

        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem className="flex w-full flex-col gap-3">
            <FormLabel className={cn("text-[16px] leading-[140%] font-semibold text-neutral-950 dark:text-neutral-300", font2.className)}>
              CyberTribe Name
            </FormLabel>
            <FormControl>
              <Input
                type="text"
                {...field}
                className="bg-gray-400 dark:bg-neutral-950 border border-neutral-950 text-neutral-950 dark:text-neutral-300 text-xl focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="username" render={({ field }) => (
          <FormItem className="flex w-full flex-col gap-3">
            <FormLabel className={cn("text-[16px] leading-[140%] font-semibold text-neutral-950 dark:text-neutral-300", font2.className)}>
              Abbreviation or Short Nickname
            </FormLabel>
            <FormControl>
              <Input
                type="text"
                {...field}
                className="bg-gray-400 dark:bg-neutral-950 border border-neutral-950 text-neutral-950 dark:text-neutral-300 text-xl focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="bio" render={({ field }) => (
          <FormItem className="flex w-full flex-col gap-3">
            <FormLabel className="text-[16px] leading-[140%] font-semibold text-neutral-300">
              Bio
            </FormLabel>
            <FormControl>
              <Textarea
                rows={16}
                {...field}
                className="bg-gray-400 dark:bg-neutral-950 border border-neutral-950 text-neutral-950 dark:text-neutral-300 text-md focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <Button type="submit" className="sky-gradient w-fit mx-auto border border-neutral-950 text-neutral-950 dark:text-neutral-300">
          {btnTitle}
        </Button>
      </form>
    </Form>
  );
};

export default CommunityProfile;
