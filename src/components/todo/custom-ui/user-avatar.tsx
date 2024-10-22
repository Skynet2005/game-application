// src/components/todo/custom-ui/user-avatar.tsx
import { useUser } from '@clerk/nextjs';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

interface UserAvatarProps {
  className: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ className }) => {
  const { user } = useUser();

  return (
    <Avatar className={`h-12 w-12 ${className}`}>
      <AvatarImage src={user?.profileImageUrl} />
    </Avatar>
  );
};
