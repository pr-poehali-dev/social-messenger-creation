import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
}

interface ChatWindowProps {
  chat: {
    name: string;
    avatar: string;
    isOnline: boolean;
  };
  messages: Message[];
  currentUserId?: string;
}

export default function ChatWindow({ chat, messages: initialMessages, currentUserId = 'me' }: ChatWindowProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now().toString(),
          text: newMessage,
          sender: 'me',
          timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setNewMessage('');
    }
  };

  const handleCall = (type: 'audio' | 'video') => {
    toast({ description: `${type === 'audio' ? 'Аудио' : 'Видео'}звонок с ${chat.name}` });
  };

  const handleAttach = () => {
    toast({ description: 'Выберите файл для отправки' });
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter(m => m.id !== messageId));
    toast({ description: 'Сообщение удалено' });
  };

  const handleEditMessage = (messageId: string) => {
    toast({ description: 'Редактирование сообщения' });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="hidden lg:flex items-center gap-3 p-4 border-b">
        <div className="relative">
          <Avatar className="w-10 h-10">
            <AvatarImage src={chat.avatar} alt={chat.name} />
            <AvatarFallback>{chat.name[0]}</AvatarFallback>
          </Avatar>
          {chat.isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
          )}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm">{chat.name}</p>
          <p className="text-xs text-muted-foreground">{chat.isOnline ? 'в сети' : 'не в сети'}</p>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => handleCall('audio')}>
            <Icon name="Phone" size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => handleCall('video')}>
            <Icon name="Video" size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => toast({ description: 'Меню чата' })}>
            <Icon name="MoreVertical" size={18} />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} animate-fade-in group`}
            >
              <div className="flex items-start gap-2">
                {message.sender === 'me' && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Icon name="MoreVertical" size={14} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditMessage(message.id)}>
                        <Icon name="Edit" size={14} className="mr-2" />
                        Редактировать
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDeleteMessage(message.id)}
                        className="text-destructive"
                      >
                        <Icon name="Trash2" size={14} className="mr-2" />
                        Удалить
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    message.sender === 'me'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p
                    className={`text-[10px] mt-1 ${
                      message.sender === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <Separator />

      <div className="p-4 flex gap-2">
        <Button variant="ghost" size="icon" className="h-10 w-10" onClick={handleAttach}>
          <Icon name="Paperclip" size={20} />
        </Button>
        <Input
          placeholder="Написать сообщение..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSend();
            }
          }}
          className="flex-1"
        />
        <Button onClick={handleSend} size="icon" className="h-10 w-10">
          <Icon name="Send" size={18} />
        </Button>
      </div>
    </div>
  );
}