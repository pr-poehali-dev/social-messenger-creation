import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface PostProps {
  id: string;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: { author: string; text: string; avatar: string }[];
}

export default function Post({ author, content, image, timestamp, likes: initialLikes, comments: initialComments }: PostProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [bookmarked, setBookmarked] = useState(false);
  const { toast } = useToast();

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { author: 'Вы', text: newComment, avatar: '/placeholder.svg' }]);
      setNewComment('');
      toast({ description: 'Комментарий добавлен' });
    }
  };

  const handleShare = () => {
    toast({ description: 'Пост скопирован в буфер обмена' });
  };

  const handleMenu = () => {
    toast({ description: 'Меню поста' });
  };

  return (
    <Card className="overflow-hidden animate-fade-in">
      <CardContent className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm">{author.name}</p>
                <p className="text-xs text-muted-foreground">@{author.username} · {timestamp}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleMenu}>
                <Icon name="MoreHorizontal" size={18} />
              </Button>
            </div>
          </div>
        </div>

        <p className="text-sm mb-3 leading-relaxed">{content}</p>

        {image && (
          <div className="rounded-lg overflow-hidden mb-3">
            <img src={image} alt="Post content" className="w-full object-cover" />
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex-col items-stretch gap-3">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className={`gap-2 ${liked ? 'text-red-500' : ''}`}
            onClick={handleLike}
          >
            <Icon name={liked ? 'Heart' : 'Heart'} size={18} className={liked ? 'fill-current' : ''} />
            <span className="text-xs font-medium">{likes}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={() => setShowComments(!showComments)}
          >
            <Icon name="MessageCircle" size={18} />
            <span className="text-xs font-medium">{comments.length}</span>
          </Button>

          <Button variant="ghost" size="sm" className="gap-2" onClick={handleShare}>
            <Icon name="Share2" size={18} />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setBookmarked(!bookmarked)}
          >
            <Icon name={bookmarked ? 'Bookmark' : 'Bookmark'} size={18} className={bookmarked ? 'fill-current text-primary' : ''} />
          </Button>
        </div>

        {showComments && (
          <div className="animate-accordion-down">
            <Separator className="mb-3" />
            
            <div className="space-y-3 mb-3 max-h-48 overflow-y-auto">
              {comments.map((comment, idx) => (
                <div key={idx} className="flex gap-2 text-sm">
                  <Avatar className="w-7 h-7">
                    <AvatarImage src={comment.avatar} />
                    <AvatarFallback>{comment.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 bg-muted rounded-lg px-3 py-2">
                    <p className="font-semibold text-xs mb-0.5">{comment.author}</p>
                    <p className="text-xs leading-relaxed">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Textarea
                placeholder="Написать комментарий..."
                className="min-h-0 h-9 resize-none text-sm"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleComment();
                  }
                }}
              />
              <Button size="sm" onClick={handleComment}>
                <Icon name="Send" size={16} />
              </Button>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}