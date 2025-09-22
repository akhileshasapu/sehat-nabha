import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Video, Clock, Calendar, User, Phone } from 'lucide-react';
import { useLanguage, getTranslation } from './LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface VideoConsultationProps {
  onNavigate: (screen: 'home' | 'video' | 'records' | 'medicine' | 'symptoms') => void;
  isOffline: boolean;
}

export function VideoConsultation({ onNavigate, isOffline }: VideoConsultationProps) {
  const { language } = useLanguage();
  const isEnglishOnly = language === 'english';
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  const doctors = [
    {
      id: '1',
      name: language === 'hindi' ? 'डॉ. अमरजीत सिंह' : language === 'punjabi' ? 'ਡਾ. ਅਮਰਜੀਤ ਸਿੰਘ' : 'Dr. Amarjeet Singh',
      specialty: language === 'hindi' ? 'जनरल फिजीशियन' : language === 'punjabi' ? 'ਜਨਰਲ ਫਿਜੀਸ਼ਿਯਨ' : 'General Physician',
      available: true,
      nextSlot: '2:00 PM',
      experience: language === 'hindi' ? '15 साल' : language === 'punjabi' ? '15 ਸਾਲ' : '15 Years',
    },
    {
      id: '2',
      name: language === 'hindi' ? 'डॉ. सुनीता कौर' : language === 'punjabi' ? 'ਡਾ. ਸੁਨੀਤਾ ਕੌਰ' : 'Dr. Sunita Kaur',
      specialty: language === 'hindi' ? 'बाल रोग विशेषज्ञ' : language === 'punjabi' ? 'ਬਾਲ ਰੋਗ ਵਿਸ਼ੇਸ਼ਗਿਆ' : 'Pediatrician',
      available: true,
      nextSlot: '3:30 PM',
      experience: language === 'hindi' ? '10 साल' : language === 'punjabi' ? '10 ਸਾਲ' : '10 Years',
    },
    {
      id: '3',
      name: language === 'hindi' ? 'डॉ. राजेश शर्मा' : language === 'punjabi' ? 'ਡਾ. ਰਾਜੇਸ਼ ਸ਼ਰਮਾ' : 'Dr. Rajesh Sharma',
      specialty: language === 'hindi' ? 'दिल के डॉक्टर' : language === 'punjabi' ? 'ਦਿਲ ਦੇ ਡਾਕਟਰ' : 'Cardiologist',
      available: false,
      nextSlot: language === 'hindi' ? 'कल 10:00 AM' : language === 'punjabi' ? 'ਕਲ੍ਹ 10:00 AM' : 'Tomorrow 10:00 AM',
      experience: language === 'hindi' ? '20 साल' : language === 'punjabi' ? '20 ਸਾਲ' : '20 Years',
    },
  ];

  const handleVideoCall = (doctorId: string) => {
    setSelectedDoctor(doctorId);
    setTimeout(() => {
      const message = language === 'hindi' ? 'वीडियो कॉल शुरू हो रही है...' : 
                     language === 'punjabi' ? 'ਵੀਡੀਓ ਕਾਲ ਸ਼ੁਰੂ ਹੋ ਰਹੀ ਹੈ...' : 
                     'Video call starting...';
      alert(message);
    }, 1000);
  };

  const handleSchedule = (doctorId: string) => {
    const message = language === 'hindi' ? 'अपॉइंटमेंट शेड्यूल की गई' : 
                   language === 'punjabi' ? 'ਅਪਾਇੰਟਮੈਂਟ ਸ਼ੇਡਿਊਲ ਕੀਤੀ ਗਈ' : 
                   'Appointment scheduled';
    alert(message);
  };

  return (
    <div className={`p-6 min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 ${isEnglishOnly ? 'font-bold' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button
            onClick={() => onNavigate('home')}
            variant="ghost"
            size="sm"
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className={`text-2xl font-bold text-blue-800 ${isEnglishOnly ? 'font-bold' : ''}`}>
              {getTranslation('videoConsultation', language)}
            </h1>
          </div>
        </div>
        <LanguageSelector />
      </div>

      {/* Available Doctors */}
      <div className="flex-1">
        <h2 className={`text-lg font-semibold mb-4 text-gray-800 ${isEnglishOnly ? 'font-bold' : ''}`}>
          {getTranslation('availableDoctors', language)}
        </h2>

        <div className="space-y-4">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="p-4 border-blue-100 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold text-gray-800 ${isEnglishOnly ? 'font-bold' : ''}`}>
                    {doctor.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={doctor.available ? "default" : "secondary"} className={`text-xs ${isEnglishOnly ? 'font-bold' : ''}`}>
                      {doctor.available ? getTranslation('available', language) : getTranslation('busy', language)}
                    </Badge>
                    <span className={`text-xs text-gray-500 ${isEnglishOnly ? 'font-bold' : ''}`}>
                      {doctor.experience}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <p className={`text-sm ${isEnglishOnly ? 'font-bold' : ''}`}>
                  <span className="font-medium">{getTranslation('specialty', language)}</span> {doctor.specialty}
                </p>
                <p className={`text-sm flex items-center gap-1 ${isEnglishOnly ? 'font-bold' : ''}`}>
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{getTranslation('nextSlot', language)}</span> {doctor.nextSlot}
                </p>
              </div>

              <div className="flex gap-2">
                {doctor.available && !isOffline ? (
                  <Button
                    onClick={() => handleVideoCall(doctor.id)}
                    className={`flex-1 bg-green-500 hover:bg-green-600 text-white ${isEnglishOnly ? 'font-bold' : ''}`}
                    disabled={selectedDoctor === doctor.id}
                  >
                    <Video className="w-4 h-4 mr-2" />
                    {selectedDoctor === doctor.id ? getTranslation('connecting', language) : getTranslation('callNow', language)}
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleSchedule(doctor.id)}
                    className={`flex-1 bg-blue-500 hover:bg-blue-600 text-white ${isEnglishOnly ? 'font-bold' : ''}`}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    {getTranslation('bookAppointment', language)}
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  <Phone className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Offline Message */}
        {isOffline && (
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className={`text-sm text-amber-800 text-center ${isEnglishOnly ? 'font-bold' : ''}`}>
              {language === 'hindi' ? 'ऑफलाइन मोड - केवल अपॉइंटमेंट शेड्यूलिंग उपलब्ध' :
               language === 'punjabi' ? 'ਆਫਲਾਈਨ ਮੋਡ - ਕੇਵਲ ਅਪਾਇੰਟਮੈਂਟ ਸ਼ੇਡਿਊਲਿੰਗ ਉਪਲਬਧ' :
               'Offline Mode - Only appointment scheduling available'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}