import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Video, FileText, Pill, Stethoscope, Heart, LogOut, User } from 'lucide-react';
import { useLanguage, getTranslation } from './LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface User {
  name: string;
  email: string;
  phone: string;
}

interface HomeScreenProps {
  onNavigate: (screen: 'home' | 'video' | 'records' | 'medicine' | 'symptoms') => void;
  isOffline: boolean;
  user: User | null;
  onLogout: () => void;
}

export function HomeScreen({ onNavigate, isOffline, user, onLogout }: HomeScreenProps) {
  const { language } = useLanguage();
  const isEnglishOnly = language === 'english';

  const features = [
    {
      id: 'video',
      title: getTranslation('videoConsultation', language),
      icon: Video,
      color: 'bg-orange-500 hover:bg-orange-600',
    },
    {
      id: 'records',
      title: getTranslation('healthRecords', language),
      icon: FileText,
      color: 'bg-amber-500 hover:bg-amber-600',
    },
    {
      id: 'medicine',
      title: getTranslation('medicineAvailability', language),
      icon: Pill,
      color: 'bg-yellow-500 hover:bg-yellow-600',
    },
    {
      id: 'symptoms',
      title: getTranslation('symptomChecker', language),
      icon: Stethoscope,
      color: 'bg-orange-600 hover:bg-orange-700',
    },
  ];

  return (
    <div className={`p-6 min-h-screen flex flex-col ${isEnglishOnly ? 'font-bold' : ''}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h1 className={`text-3xl font-bold text-orange-800 mb-2 ${isEnglishOnly ? 'font-bold' : ''}`}>
                  {getTranslation('appName', language)}
                </h1>
                <p className={`text-sm text-gray-600 ${isEnglishOnly ? 'font-bold' : ''}`}>
                  {getTranslation('welcomeMessage', language)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <LanguageSelector />
                <Button
                  variant="ghost"
                  onClick={onLogout}
                  className="p-2 hover:bg-orange-100 rounded-full"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5 text-orange-600" />
                </Button>
              </div>
            </div>
            {user && (
              <div className="mt-4 flex items-center space-x-2 p-3 bg-orange-50 rounded-lg">
                <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className={`text-sm font-medium text-orange-800 ${isEnglishOnly ? 'font-bold' : ''}`}>
                    {user.name}
                  </p>
                  <p className={`text-xs text-orange-600 ${isEnglishOnly ? 'font-bold' : ''}`}>
                    {user.email}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* App Logo/Icon */}
      <div className="flex justify-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
          <Heart className="w-10 h-10 text-white" />
        </div>
      </div>

      {/* Feature Buttons */}
      <div className="grid grid-cols-1 gap-4 flex-1">
        {features.map((feature) => {
          const IconComponent = feature.icon;
          return (
            <Card key={feature.id} className="p-0 overflow-hidden shadow-md border-orange-100">
              <Button
                onClick={() => onNavigate(feature.id as any)}
                className={`w-full h-20 ${feature.color} text-white rounded-lg text-left flex items-center gap-4 p-6 transition-all duration-200 transform hover:scale-105 ${isEnglishOnly ? 'font-bold' : ''}`}
                variant="ghost"
              >
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className={`text-lg font-semibold ${isEnglishOnly ? 'font-bold' : ''}`}>
                    {feature.title}
                  </div>
                </div>
              </Button>
            </Card>
          );
        })}
      </div>

      {/* Offline Message */}
      {isOffline && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className={`text-sm text-yellow-800 text-center ${isEnglishOnly ? 'font-bold' : ''}`}>
            {getTranslation('offlineMode', language)}
          </p>
        </div>
      )}
    </div>
  );
}