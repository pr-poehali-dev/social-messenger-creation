import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface ProfileCardProps {
  user: {
    name: string;
    username: string;
    avatar: string;
    bio: string;
    followers: number;
    following: number;
    posts: number;
  };
}

export default function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="h-32 bg-gradient-to-br from-primary via-secondary to-accent" />
      
      <CardContent className="p-6 -mt-16">
        <div className="flex flex-col items-center text-center">
          <Avatar className="w-24 h-24 border-4 border-background mb-4">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>

          <h2 className="font-bold text-xl mb-1">{user.name}</h2>
          <p className="text-sm text-muted-foreground mb-3">@{user.username}</p>
          <p className="text-sm leading-relaxed mb-4">{user.bio}</p>

          <div className="flex gap-6 mb-4">
            <div className="text-center">
              <p className="font-bold text-lg">{user.posts}</p>
              <p className="text-xs text-muted-foreground">Постов</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg">{user.followers}</p>
              <p className="text-xs text-muted-foreground">Подписчиков</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg">{user.following}</p>
              <p className="text-xs text-muted-foreground">Подписок</p>
            </div>
          </div>

          <Separator className="mb-4" />

          <div className="flex gap-2 w-full">
            <Button className="flex-1 gap-2">
              <Icon name="UserPlus" size={16} />
              Подписаться
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <Icon name="MessageCircle" size={16} />
              Написать
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
