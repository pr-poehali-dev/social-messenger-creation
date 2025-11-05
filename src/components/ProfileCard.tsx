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

          <div className="flex gap-2 w-full mb-6">
            <Button className="flex-1 gap-2">
              <Icon name="UserPlus" size={16} />
              Подписаться
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <Icon name="MessageCircle" size={16} />
              Написать
            </Button>
          </div>

          <div className="w-full space-y-4">
            <h3 className="font-semibold text-sm text-left">Статистика активности</h3>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Посещения</span>
                  <span className="font-medium">+12% за неделю</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-secondary" style={{ width: '72%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Популярные посты</span>
                  <span className="font-medium">5.2K просмотров</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-secondary to-accent" style={{ width: '89%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Вовлечённость</span>
                  <span className="font-medium">3.8K реакций</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-accent to-primary" style={{ width: '65%' }} />
                </div>
              </div>
            </div>

            <Card className="bg-muted/30 border-0 p-3">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-lg font-bold text-primary">2.4K</p>
                  <p className="text-[10px] text-muted-foreground">Лайков</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-secondary">856</p>
                  <p className="text-[10px] text-muted-foreground">Комментариев</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-accent">312</p>
                  <p className="text-[10px] text-muted-foreground">Поделились</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}