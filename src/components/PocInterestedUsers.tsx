import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Avatar imports
import karolinaSzymanska from "@/assets/avatars/karolina-szymanska.jpg";
import bartoszJankowski from "@/assets/avatars/bartosz-jankowski.jpg";
import nataliaPawlak from "@/assets/avatars/natalia-pawlak.jpg";
import krzysztofWitkowski from "@/assets/avatars/krzysztof-witkowski.jpg";
import joannaKaczmarek from "@/assets/avatars/joanna-kaczmarek.jpg";
import mateuszZajac from "@/assets/avatars/mateusz-zajac.jpg";

// Company logo imports
import bluewaveVentures from "@/assets/companies/bluewave-ventures.jpg";
import areSolutions from "@/assets/companies/are-solutions.jpg";
import romanPictures from "@/assets/companies/roman-pictures.jpg";
import sbConsulting from "@/assets/companies/sb-consulting.jpg";

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
  logo: string;
  color: string;
}

const mockUsers: UserInfo[] = [
  {
    id: 1,
    name: "Karolina Szymańska",
    image: karolinaSzymanska,
    initials: "KS",
    isOnline: true,
  },
  {
    id: 2,
    name: "Bartosz Jankowski",
    image: bartoszJankowski,
    initials: "BJ",
    isOnline: true,
  },
  {
    id: 3,
    name: "Natalia Pawlak",
    image: nataliaPawlak,
    initials: "NP",
    isOnline: false,
  },
  {
    id: 4,
    name: "Krzysztof Witkowski",
    image: krzysztofWitkowski,
    initials: "KW",
    isOnline: true,
  },
  {
    id: 5,
    name: "Joanna Kaczmarek",
    image: joannaKaczmarek,
    initials: "JK",
    isOnline: true,
  },
  {
    id: 6,
    name: "Mateusz Zając",
    image: mateuszZajac,
    initials: "MZ",
    isOnline: false,
  },
];

const mockCompanies: CompanyInfo[] = [
  { id: 1, name: "BlueWave Ventures", initials: "BW", logo: bluewaveVentures, color: "from-blue-500 to-cyan-500" },
  { id: 2, name: "ARE Solutions", initials: "ARE", logo: areSolutions, color: "from-green-500 to-emerald-500" },
  { id: 3, name: "Roman Pictures", initials: "RP", logo: romanPictures, color: "from-purple-500 to-pink-500" },
  { id: 4, name: "SB Consulting", initials: "SB", logo: sbConsulting, color: "from-orange-500 to-amber-500" }
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
            className="w-8 h-8 rounded-lg shadow-sm overflow-hidden ring-2 ring-background bg-white flex items-center justify-center"
            title={company.name}
          >
            <img 
              src={company.logo} 
              alt={company.name}
              className="w-full h-full object-contain p-0.5"
            />
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
