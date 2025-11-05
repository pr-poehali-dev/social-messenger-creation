import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isOnline: boolean;
}

interface ChatListProps {
  chats: Chat[];
  onSelectChat: (chatId: string) => void;
  selectedChatId?: string;
}

export default function ChatList({ chats, onSelectChat, selectedChatId }: ChatListProps) {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-1 p-2">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-muted ${
              selectedChatId === chat.id ? 'bg-muted' : ''
            }`}
          >
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarImage src={chat.avatar} alt={chat.name} />
                <AvatarFallback>{chat.name[0]}</AvatarFallback>
              </Avatar>
              {chat.isOnline && (
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-background rounded-full" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-sm truncate">{chat.name}</p>
                <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground truncate flex-1">{chat.lastMessage}</p>
                {chat.unread > 0 && (
                  <Badge className="ml-2 h-5 min-w-[20px] px-1.5 text-[10px] font-bold bg-primary">
                    {chat.unread}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
