import { Avatar, AvatarImage } from '@/components/ui/avatar';

interface BotAvatarProps {
  className?: string;
}

export const BotAvatar: React.FC<BotAvatarProps> = ({ className }) => {
  return (
    <Avatar className={`h-10 w-10 ${className}`}>
      <AvatarImage className="p-1" src="/logo.png" />
    </Avatar>
  );
};
