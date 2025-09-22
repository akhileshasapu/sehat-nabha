import React from 'react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Languages, ChevronDown } from 'lucide-react';
import { useLanguage, Language } from './LanguageContext';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'hindi' as Language, name: 'हिंदी', flag: '🇮🇳' },
    { code: 'english' as Language, name: 'English', flag: '🇬🇧' },
    { code: 'punjabi' as Language, name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border-orange-200 hover:bg-orange-50 h-8 px-2"
        >
          <Languages className="w-3 h-3 text-orange-600" />
          <span className="text-sm">{currentLanguage?.flag}</span>
          <ChevronDown className="w-3 h-3 text-orange-600" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="start" className="w-40">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center gap-2 cursor-pointer ${
              language === lang.code ? 'bg-orange-50 text-orange-700' : ''
            }`}
          >
            <span>{lang.flag}</span>
            <span className={`${language === 'english' ? 'font-bold' : ''}`}>
              {lang.name}
            </span>
            {language === lang.code && (
              <span className="ml-auto text-orange-600">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}