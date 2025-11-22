import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTranslation } from 'react-i18next';

interface UserInfo {
  id: number;
  name: string;
  image: string;
  initials: string;
  isOnline: boolean;
}

const mockUsers: UserInfo[] = [
  {
    id: 1,
    name: "Anna Kowalska",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=40&h=40&fit=crop&crop=face",
    initials: "AK",
    isOnline: true
  },
  {
    id: 2,
    name: "Tomasz Nowak",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=40&h=40&fit=crop&crop=face",
    initials: "TN",
    isOnline: true
  },
  {
    id: 3,
    name: "Maria Wiśniewska",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=40&h=40&fit=crop&crop=face",
    initials: "MW",
    isOnline: false
  },
  {
    id: 4,
    name: "Piotr Zieliński",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    initials: "PZ",
    isOnline: true
  },
  {
    id: 5,
    name: "Katarzyna Dąbrowska",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=40&h=40&fit=crop&crop=face",
    initials: "KD",
    isOnline: true
  },
  {
    id: 6,
    name: "Michał Lewandowski",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    initials: "ML",
    isOnline: false
  },
  {
    id: 7,
    name: "Agnieszka Wójcik",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
    initials: "AW",
    isOnline: true
  },
  {
    id: 8,
    name: "Jakub Kaminski",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face",
    initials: "JK",
    isOnline: false
  },
  {
    id: 9,
    name: "Magdalena Król",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    initials: "MK",
    isOnline: true
  },
  {
    id: 10,
    name: "Robert Mazur",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face",
    initials: "RM",
    isOnline: true
  }
];

const getUniqueRandomUsers = (currentVisible: UserInfo[]) => {
  const currentIds = new Set(currentVisible.map(u => u.id));
  const availableUsers = mockUsers.filter(u => !currentIds.has(u.id));

  if (availableUsers.length >= 4) {
    const shuffled = [...availableUsers].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  } else {
    const shuffled = [...mockUsers].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  }
};

export const ActiveUsers = () => {
  const { t } = useTranslation('bookDemo');
  const [activeCount, setActiveCount] = useState(147);
  const [visibleUsers, setVisibleUsers] = useState(mockUsers.slice(0, 4));

  useEffect(() => {
    const interval = setInterval(() => {
      const change = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
      setActiveCount(prev => Math.max(100, prev + change));

      if (Math.random() > 0.8) {
        setVisibleUsers(current => getUniqueRandomUsers(current));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border shadow-sm">
      <div className="flex -space-x-1.5">
        {visibleUsers.map((user) => (
          <div key={user.id} className="relative">
            <Avatar className="w-10 h-10 ring-2 ring-background hover:scale-110 transition-transform">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                {user.initials}
              </AvatarFallback>
            </Avatar>
            {user.isOnline && (
              <span 
                className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-background animate-pulse" 
                aria-label="Online"
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{activeCount}+</span>
        {' '}
        {t('activeUsers.label')}
      </div>
    </div>
  );
};
