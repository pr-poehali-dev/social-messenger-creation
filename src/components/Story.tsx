import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface StoryProps {
  author: string;
  avatar: string;
  isViewed?: boolean;
}

export default function Story({ author, avatar, isViewed = false }: StoryProps) {
  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer group">
      <div className={`rounded-full p-[2px] ${isViewed ? 'bg-muted' : 'bg-gradient-to-tr from-primary via-secondary to-accent'}`}>
        <div className="bg-background rounded-full p-[3px]">
          <Avatar className="w-16 h-16 transition-transform group-hover:scale-105">
            <AvatarImage src={avatar} alt={author} />
            <AvatarFallback>{author[0]}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <p className="text-xs font-medium text-center max-w-[70px] truncate">{author}</p>
    </div>
  );
}
