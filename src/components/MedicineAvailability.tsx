import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ArrowLeft, Search, MapPin, Phone, Clock, Pill } from 'lucide-react';
import { useLanguage, getTranslation } from './LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface MedicineAvailabilityProps {
  onNavigate: (screen: 'home' | 'video' | 'records' | 'medicine' | 'symptoms') => void;
  isOffline: boolean;
}

export function MedicineAvailability({ onNavigate, isOffline }: MedicineAvailabilityProps) {
  const { language } = useLanguage();
  const isEnglishOnly = language === 'english';
  const [searchTerm, setSearchTerm] = useState('');

  const pharmacies = [
    {
      id: '1',
      name: language === 'hindi' ? 'सेहत मेडिकल स्टोर' : language === 'punjabi' ? 'ਸਿਹਤ ਮੈਡੀਕਲ ਸਟੋਰ' : 'Sehat Medical Store',
      address: language === 'hindi' ? 'मुख्य बाजार, नभा' : language === 'punjabi' ? 'ਮੁੱਖ ਬਾਜ਼ਾਰ, ਨਭਾ' : 'Main Bazaar, Nabha',
      phone: '+91 98765 43210',
      distance: '0.5 km',
      medicines: [
        { 
          name: language === 'hindi' ? 'पैरासीटामोल' : language === 'punjabi' ? 'ਪੈਰਾਸੀਟਾਮੋਲ' : 'Paracetamol', 
          available: true, 
          price: '₹15' 
        },
        { 
          name: language === 'hindi' ? 'सर्दी की दवा' : language === 'punjabi' ? 'ਸਰਦੀ ਦੀ ਦਵਾਈ' : 'Cough Syrup', 
          available: true, 
          price: '₹85' 
        },
        { 
          name: language === 'hindi' ? 'बैंडेज' : language === 'punjabi' ? 'ਬੈਂਡੇਜ' : 'Bandage', 
          available: false, 
          price: '₹25' 
        },
      ],
      lastUpdated: language === 'hindi' ? '10 मिनट पहले' : language === 'punjabi' ? '10 ਮਿੰਟ ਪਹਿਲਾਂ' : '10 min ago',
      open: true,
    },
    {
      id: '2',
      name: language === 'hindi' ? 'किसान मेडिकल' : language === 'punjabi' ? 'ਕਿਸਾਨ ਮੈਡੀਕਲ' : 'Kisan Medical',
      address: language === 'hindi' ? 'गुरु गोबिंद सिंह मार्ग' : language === 'punjabi' ? 'ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਮਾਰਗ' : 'Guru Gobind Singh Marg',
      phone: '+91 98765 43211',
      distance: '1.2 km',
      medicines: [
        { 
          name: language === 'hindi' ? 'एस्प्रिन' : language === 'punjabi' ? 'ਐਸਪਰਿਨ' : 'Aspirin', 
          available: true, 
          price: '₹12' 
        },
        { 
          name: language === 'hindi' ? 'आंखों की दवा' : language === 'punjabi' ? 'ਅੱਖਾਂ ਦੀ ਦਵਾਈ' : 'Eye Drops', 
          available: true, 
          price: '₹65' 
        },
      ],
      lastUpdated: language === 'hindi' ? '25 मिनट पहले' : language === 'punjabi' ? '25 ਮਿੰਟ ਪਹਿਲਾਂ' : '25 min ago',
      open: true,
    },
  ];

  const filteredPharmacies = pharmacies.filter(pharmacy =>
    pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pharmacy.medicines.some(med => 
      med.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleCall = (phone: string) => {
    const message = language === 'hindi' ? `कॉल कर रहे हैं ${phone}` : 
                   language === 'punjabi' ? `ਕਾਲ ਕਰ ਰਹੇ ਹਾਂ ${phone}` : 
                   `Calling ${phone}`;
    alert(message);
  };

  return (
    <div className={`p-6 min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-pink-50 ${isEnglishOnly ? 'font-bold' : ''}`}>
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
            <h1 className={`text-2xl font-bold text-purple-800 ${isEnglishOnly ? 'font-bold' : ''}`}>
              {getTranslation('medicineAvailability', language)}
            </h1>
          </div>
        </div>
        <LanguageSelector />
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder={getTranslation('searchMedicine', language)}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`pl-10 h-12 text-base border-purple-200 focus:border-purple-400 ${isEnglishOnly ? 'font-bold' : ''}`}
        />
      </div>

      {/* Pharmacies List */}
      <div className="flex-1">
        <div className="space-y-4">
          {filteredPharmacies.map((pharmacy) => (
            <Card key={pharmacy.id} className="p-4 border-purple-100 shadow-md">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                    <Pill className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`font-semibold text-gray-800 ${isEnglishOnly ? 'font-bold' : ''}`}>
                      {pharmacy.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className={`text-xs text-gray-500 ${isEnglishOnly ? 'font-bold' : ''}`}>
                        {pharmacy.address}
                      </span>
                    </div>
                    <span className={`text-xs text-gray-500 ${isEnglishOnly ? 'font-bold' : ''}`}>
                      {pharmacy.distance} {language === 'hindi' ? 'दूर' : language === 'punjabi' ? 'ਦੂਰ' : 'away'}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <Badge variant={pharmacy.open ? "default" : "secondary"} className={`text-xs ${isEnglishOnly ? 'font-bold' : ''}`}>
                    {pharmacy.open ? getTranslation('open', language) : getTranslation('closed', language)}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className={`text-xs text-gray-500 ${isEnglishOnly ? 'font-bold' : ''}`}>
                      {pharmacy.lastUpdated}
                    </span>
                  </div>
                </div>
              </div>

              {/* Available Medicines */}
              <div className="mb-4">
                <h4 className={`text-sm font-medium mb-2 text-gray-700 ${isEnglishOnly ? 'font-bold' : ''}`}>
                  {getTranslation('availableMedicines', language)}
                </h4>
                <div className="space-y-1">
                  {pharmacy.medicines.slice(0, 3).map((medicine, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${medicine.available ? 'bg-green-400' : 'bg-red-400'}`} />
                        <span className={`${medicine.available ? 'text-gray-700' : 'text-gray-400'} ${isEnglishOnly ? 'font-bold' : ''}`}>
                          {medicine.name}
                        </span>
                      </div>
                      <span className={`text-xs ${medicine.available ? 'text-green-600' : 'text-red-500'} ${isEnglishOnly ? 'font-bold' : ''}`}>
                        {medicine.available ? medicine.price : getTranslation('outOfStock', language)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleCall(pharmacy.phone)}
                  className={`flex-1 bg-purple-500 hover:bg-purple-600 text-white ${isEnglishOnly ? 'font-bold' : ''}`}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {getTranslation('callStore', language)}
                </Button>
                
                <Button
                  variant="outline"
                  className={`border-purple-200 text-purple-700 hover:bg-purple-50 ${isEnglishOnly ? 'font-bold' : ''}`}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {getTranslation('direction', language)}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Offline Message */}
        {isOffline && (
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className={`text-sm text-amber-800 text-center ${isEnglishOnly ? 'font-bold' : ''}`}>
              {language === 'hindi' ? 'ऑफलाइन मोड - आखिरी सिंक किया गया डेटा दिखाया जा रहा' :
               language === 'punjabi' ? 'ਆਫਲਾਈਨ ਮੋਡ - ਆਖਰੀ ਸਿੰਕ ਕੀਤਾ ਡੇਟਾ ਦਿਖਾਇਆ ਜਾ ਰਿਹਾ' :
               'Offline Mode - Showing last synced data'}
            </p>
          </div>
        )}

        {/* Empty State */}
        {filteredPharmacies.length === 0 && (
          <div className="text-center py-8">
            <Pill className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className={`text-gray-500 ${isEnglishOnly ? 'font-bold' : ''}`}>
              {language === 'hindi' ? 'कोई परिणाम नहीं मिला' :
               language === 'punjabi' ? 'ਕੋਈ ਨਤੀਜਾ ਨਹੀਂ ਮਿਲਿਆ' :
               'No results found'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}