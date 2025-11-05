import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

interface Friend {
  id: string;
  name: string;
  avatar: string;
}

interface CreateGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  friends: Friend[];
}

export default function CreateGroupDialog({ open, onOpenChange, friends }: CreateGroupDialogProps) {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const { toast } = useToast();

  const handleCreate = () => {
    if (!groupName.trim()) {
      toast({ description: 'Введите название группы', variant: 'destructive' });
      return;
    }

    toast({
      title: 'Группа создана!',
      description: `"${groupName}" с ${selectedFriends.length} участниками`,
    });

    setGroupName('');
    setGroupDescription('');
    setSelectedFriends([]);
    onOpenChange(false);
  };

  const toggleFriend = (friendId: string) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId) ? prev.filter((id) => id !== friendId) : [...prev, friendId]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Создать новую группу</DialogTitle>
          <DialogDescription>Создайте группу и пригласите друзей для общения</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Название группы</Label>
            <Input
              id="name"
              placeholder="Введите название..."
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              placeholder="Расскажите о группе..."
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Пригласить участников ({selectedFriends.length})</Label>
            <ScrollArea className="h-[200px] border rounded-lg p-2">
              <div className="space-y-2">
                {friends.map((friend) => (
                  <div key={friend.id} className="flex items-center space-x-3 p-2 hover:bg-muted rounded-lg cursor-pointer" onClick={() => toggleFriend(friend.id)}>
                    <Checkbox
                      checked={selectedFriends.includes(friend.id)}
                      onCheckedChange={() => toggleFriend(friend.id)}
                    />
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={friend.avatar} alt={friend.name} />
                      <AvatarFallback>{friend.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm flex-1">{friend.name}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button onClick={handleCreate}>Создать группу</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
