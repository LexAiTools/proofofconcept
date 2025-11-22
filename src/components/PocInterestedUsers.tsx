import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserInfo {
  id: number;
  name: string;
  image: string;
  initials: string;
  isOnline: boolean;
}

interface CompanyInfo {
  id: number;
  name: string;
  initials: string;
  color: string;
}

const mockUsers: UserInfo[] = [
  {
    id: 1,
    name: "Karolina Szymańska",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    initials: "KS",
    isOnline: true,
  },
  {
    id: 2,
    name: "Bartosz Jankowski",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    initials: "BJ",
    isOnline: true,
  },
  {
    id: 3,
    name: "Natalia Pawlak",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    initials: "NP",
    isOnline: false,
  },
  {
    id: 4,
    name: "Krzysztof Witkowski",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    initials: "KW",
    isOnline: true,
  },
  {
    id: 5,
    name: "Joanna Kaczmarek",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    initials: "JK",
    isOnline: true,
  },
  {
    id: 6,
    name: "Mateusz Zając",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
    initials: "MZ",
    isOnline: false,
  },
  {
    id: 7,
    name: "Aleksandra Krawczyk",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150",
    initials: "AK",
    isOnline: true,
  },
  {
    id: 8,
    name: "Paweł Adamczyk",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150",
    initials: "PA",
    isOnline: false,
  },
  {
    id: 9,
    name: "Weronika Stępień",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150",
    initials: "WS",
    isOnline: true,
  },
  {
    id: 10,
    name: "Damian Górski",
    image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=150",
    initials: "DG",
    isOnline: false,
  },
];

const mockCompanies: CompanyInfo[] = [
  { id: 1, name: "TechStart", initials: "TS", color: "from-blue-500 to-cyan-500" },
  { id: 2, name: "InnoHub", initials: "IH", color: "from-purple-500 to-pink-500" },
  { id: 3, name: "DevLabs", initials: "DL", color: "from-green-500 to-emerald-500" },
  { id: 4, name: "CloudPro", initials: "CP", color: "from-orange-500 to-red-500" }
];

const getUniqueRandomUsers = (currentVisible: UserInfo[], count: number = 2): UserInfo[] => {
  const availableUsers = mockUsers.filter(
    user => !currentVisible.some(visible => visible.id === user.id)
  );
  
  if (availableUsers.length === 0) return currentVisible;
  
  const selected = [];
  const available = [...availableUsers];
  
  for (let i = 0; i < Math.min(count, available.length); i++) {
    const randomIndex = Math.floor(Math.random() * available.length);
    selected.push(available[randomIndex]);
    available.splice(randomIndex, 1);
  }
  
  return selected;
};

const getUniqueRandomCompanies = (currentVisible: CompanyInfo[], count: number = 1): CompanyInfo[] => {
  const availableCompanies = mockCompanies.filter(
    company => !currentVisible.some(visible => visible.id === company.id)
  );
  
  if (availableCompanies.length === 0) return currentVisible;
  
  const selected = [];
  const available = [...availableCompanies];
  
  for (let i = 0; i < Math.min(count, available.length); i++) {
    const randomIndex = Math.floor(Math.random() * available.length);
    selected.push(available[randomIndex]);
    available.splice(randomIndex, 1);
  }
  
  return selected;
};

export const PocInterestedUsers = () => {
  const { t } = useTranslation('poc');
  const [interestedCount, setInterestedCount] = useState(147);
  const [visibleUsers, setVisibleUsers] = useState(mockUsers.slice(0, 4));
  const [visibleCompanies, setVisibleCompanies] = useState(mockCompanies.slice(0, 2));

  useEffect(() => {
    const counterInterval = setInterval(() => {
      const change = Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0;
      setInterestedCount(prev => Math.min(250, Math.max(45, prev + change)));
    }, 4000);

    const usersInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setVisibleUsers(current => {
          const removeCount = Math.floor(Math.random() * 2) + 1;
          const remaining = current.slice(0, -removeCount);
          const newUsers = getUniqueRandomUsers(current, removeCount);
          return [...remaining, ...newUsers];
        });
      }
    }, 4000);

    const companiesInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        setVisibleCompanies(current => {
          const remaining = current.slice(0, -1);
          const newCompanies = getUniqueRandomCompanies(current, 1);
          return [...remaining, ...newCompanies];
        });
      }
    }, 6000);

    return () => {
      clearInterval(counterInterval);
      clearInterval(usersInterval);
      clearInterval(companiesInterval);
    };
  }, []);

  return (
    <div className="flex items-center gap-3 animate-fade-in">
      <div className="flex items-center -space-x-1.5">
        {visibleUsers.slice(0, 2).map((user) => (
          <div key={user.id} className="relative">
            <Avatar className="w-10 h-10 ring-2 ring-background">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback>{user.initials}</AvatarFallback>
            </Avatar>
            {user.isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
            )}
          </div>
        ))}
        
        {visibleCompanies.map((company) => (
          <div 
            key={company.id}
            className={`w-8 h-8 rounded-lg shadow-sm bg-gradient-to-br ${company.color} flex items-center justify-center ring-2 ring-background`}
            title={company.name}
          >
            <span className="text-white text-xs font-bold">{company.initials}</span>
          </div>
        ))}
        
        {visibleUsers.slice(2, 4).map((user) => (
          <div key={user.id} className="relative">
            <Avatar className="w-10 h-10 ring-2 ring-background">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback>{user.initials}</AvatarFallback>
            </Avatar>
            {user.isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
            )}
          </div>
        ))}
      </div>
      
      <span className="text-sm text-muted-foreground whitespace-nowrap">
        {interestedCount}+ {t('interestedUsers.label')}
      </span>
    </div>
  );
};
