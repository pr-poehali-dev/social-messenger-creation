import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import Post from '@/components/Post';
import Story from '@/components/Story';
import ChatList from '@/components/ChatList';
import ChatWindow from '@/components/ChatWindow';
import ProfileCard from '@/components/ProfileCard';

const mockUser = {
  name: 'Александр Иванов',
  username: 'alex_ivanov',
  avatar: '/placeholder.svg',
  bio: 'Увлекаюсь фотографией и путешествиями 📸✈️',
  followers: 1284,
  following: 523,
  posts: 142,
};

const mockStories = [
  { author: 'Ваша история', avatar: '/placeholder.svg', isViewed: false },
  { author: 'Мария', avatar: '/placeholder.svg', isViewed: false },
  { author: 'Дмитрий', avatar: '/placeholder.svg', isViewed: true },
  { author: 'Анна', avatar: '/placeholder.svg', isViewed: false },
  { author: 'Сергей', avatar: '/placeholder.svg', isViewed: true },
  { author: 'Елена', avatar: '/placeholder.svg', isViewed: false },
];

const mockPosts = [
  {
    id: '1',
    author: { name: 'Мария Петрова', avatar: '/placeholder.svg', username: 'maria_p' },
    content: 'Невероятный закат сегодня! 🌅 Природа удивляет каждый день своей красотой.',
    image: '/placeholder.svg',
    timestamp: '2 ч',
    likes: 342,
    comments: [
      { author: 'Дмитрий', text: 'Какая красота! 😍', avatar: '/placeholder.svg' },
      { author: 'Анна', text: 'Где это?', avatar: '/placeholder.svg' },
    ],
  },
  {
    id: '2',
    author: { name: 'Дмитрий Сидоров', avatar: '/placeholder.svg', username: 'dmitry_s' },
    content: 'Запустил новый проект! Очень рад поделиться с вами результатом работы команды 🚀',
    timestamp: '5 ч',
    likes: 156,
    comments: [
      { author: 'Сергей', text: 'Поздравляю! 🎉', avatar: '/placeholder.svg' },
    ],
  },
  {
    id: '3',
    author: { name: 'Анна Кузнецова', avatar: '/placeholder.svg', username: 'anna_k' },
    content: 'Кофе и книга - идеальное сочетание для субботнего утра ☕📚',
    image: '/placeholder.svg',
    timestamp: '1 д',
    likes: 89,
    comments: [],
  },
];

const mockChats = [
  {
    id: '1',
    name: 'Мария Петрова',
    avatar: '/placeholder.svg',
    lastMessage: 'Спасибо за фото!',
    timestamp: '12:34',
    unread: 2,
    isOnline: true,
  },
  {
    id: '2',
    name: 'Дмитрий Сидоров',
    avatar: '/placeholder.svg',
    lastMessage: 'Отлично, созвонимся завтра',
    timestamp: 'вчера',
    unread: 0,
    isOnline: false,
  },
  {
    id: '3',
    name: 'Анна Кузнецова',
    avatar: '/placeholder.svg',
    lastMessage: 'Ты уже видел новый фильм?',
    timestamp: 'вчера',
    unread: 1,
    isOnline: true,
  },
  {
    id: '4',
    name: 'Сергей Волков',
    avatar: '/placeholder.svg',
    lastMessage: 'Отправил тебе файлы',
    timestamp: '2 дня',
    unread: 0,
    isOnline: false,
  },
];

const mockMessages = [
  { id: '1', text: 'Привет! Как дела?', sender: 'other' as const, timestamp: '10:30' },
  { id: '2', text: 'Привет! Все отлично, спасибо! А у тебя?', sender: 'me' as const, timestamp: '10:32' },
  { id: '3', text: 'Тоже хорошо! Спасибо за фото!', sender: 'other' as const, timestamp: '10:33' },
  { id: '4', text: 'Пожалуйста! Рад, что понравилось 😊', sender: 'me' as const, timestamp: '10:35' },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('feed');
  const [selectedChatId, setSelectedChatId] = useState<string>('1');

  const selectedChat = mockChats.find((c) => c.id === selectedChatId);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Users" size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SocialHub
            </h1>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Поиск..." className="pl-10" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Icon name="Bell" size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Settings" size={20} />
            </Button>
            <Avatar className="w-9 h-9 cursor-pointer">
              <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
              <AvatarFallback>{mockUser.name[0]}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-5 mb-6">
            <TabsTrigger value="feed" className="gap-2">
              <Icon name="Home" size={18} />
              <span className="hidden sm:inline">Лента</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="gap-2">
              <Icon name="MessageCircle" size={18} />
              <span className="hidden sm:inline">Чаты</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <Icon name="User" size={18} />
              <span className="hidden sm:inline">Профиль</span>
            </TabsTrigger>
            <TabsTrigger value="friends" className="gap-2">
              <Icon name="Users" size={18} />
              <span className="hidden sm:inline">Друзья</span>
            </TabsTrigger>
            <TabsTrigger value="groups" className="gap-2">
              <Icon name="UsersRound" size={18} />
              <span className="hidden sm:inline">Группы</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-6">
            <Card className="p-4">
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex gap-4 pb-2">
                  {mockStories.map((story, idx) => (
                    <Story key={idx} author={story.author} avatar={story.avatar} isViewed={story.isViewed} />
                  ))}
                </div>
              </ScrollArea>
            </Card>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <Card className="p-4">
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                      <AvatarFallback>{mockUser.name[0]}</AvatarFallback>
                    </Avatar>
                    <Input placeholder="Что у вас нового?" className="flex-1" />
                    <Button>
                      <Icon name="Send" size={18} />
                    </Button>
                  </div>
                </Card>

                {mockPosts.map((post) => (
                  <Post key={post.id} {...post} />
                ))}
              </div>

              <div className="hidden lg:block space-y-4">
                <ProfileCard user={mockUser} />
                
                <Card className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="TrendingUp" size={18} className="text-primary" />
                    Популярное
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="hover:bg-muted p-2 rounded-lg cursor-pointer transition-colors">
                      <p className="font-medium">#Технологии</p>
                      <p className="text-xs text-muted-foreground">1.2k постов</p>
                    </div>
                    <div className="hover:bg-muted p-2 rounded-lg cursor-pointer transition-colors">
                      <p className="font-medium">#Путешествия</p>
                      <p className="text-xs text-muted-foreground">856 постов</p>
                    </div>
                    <div className="hover:bg-muted p-2 rounded-lg cursor-pointer transition-colors">
                      <p className="font-medium">#Фотография</p>
                      <p className="text-xs text-muted-foreground">634 постов</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="messages">
            <div className="grid lg:grid-cols-3 gap-4 h-[calc(100vh-200px)]">
              <Card className="lg:col-span-1 overflow-hidden">
                <div className="p-4 border-b">
                  <div className="relative">
                    <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Поиск чатов..." className="pl-10" />
                  </div>
                </div>
                <ChatList chats={mockChats} onSelectChat={setSelectedChatId} selectedChatId={selectedChatId} />
              </Card>

              <Card className="lg:col-span-2 overflow-hidden">
                {selectedChat ? (
                  <ChatWindow chat={selectedChat} messages={mockMessages} />
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <Icon name="MessageCircle" size={48} className="mx-auto mb-2 opacity-50" />
                      <p>Выберите чат для начала общения</p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <div className="max-w-2xl mx-auto">
              <ProfileCard user={mockUser} />
              
              <div className="mt-6 space-y-4">
                <h2 className="text-xl font-bold">Мои посты</h2>
                {mockPosts.slice(0, 2).map((post) => (
                  <Post key={post.id} {...post} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="friends">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Друзья</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockChats.map((friend) => (
                  <Card key={friend.id} className="p-4">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-3">
                        <Avatar className="w-20 h-20">
                          <AvatarImage src={friend.avatar} alt={friend.name} />
                          <AvatarFallback>{friend.name[0]}</AvatarFallback>
                        </Avatar>
                        {friend.isOnline && (
                          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-background rounded-full" />
                        )}
                      </div>
                      <h3 className="font-semibold mb-1">{friend.name}</h3>
                      <p className="text-xs text-muted-foreground mb-3">
                        {friend.isOnline ? 'В сети' : 'Не в сети'}
                      </p>
                      <div className="flex gap-2 w-full">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Icon name="MessageCircle" size={14} />
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Icon name="UserMinus" size={14} />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="groups">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Мои группы</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { name: 'Любители фотографии', members: '12.5k', cover: '/placeholder.svg' },
                  { name: 'Путешественники', members: '8.2k', cover: '/placeholder.svg' },
                  { name: 'Веб-разработка', members: '15.3k', cover: '/placeholder.svg' },
                  { name: 'Книжный клуб', members: '5.7k', cover: '/placeholder.svg' },
                ].map((group, idx) => (
                  <Card key={idx} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="h-32 bg-gradient-to-br from-primary/20 to-secondary/20" />
                    <div className="p-4">
                      <h3 className="font-semibold mb-1">{group.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{group.members} участников</p>
                      <Button variant="outline" size="sm" className="w-full">
                        Открыть
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}