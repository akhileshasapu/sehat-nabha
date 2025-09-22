import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, FileText, Upload, Download, Calendar, Camera, Image } from 'lucide-react';
import { useLanguage, getTranslation } from './LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface HealthRecordsProps {
  onNavigate: (screen: 'home' | 'video' | 'records' | 'medicine' | 'symptoms') => void;
  isOffline: boolean;
}

export function HealthRecords({ onNavigate, isOffline }: HealthRecordsProps) {
  const { language } = useLanguage();
  const isEnglishOnly = language === 'english';
  
  const [records] = useState([
    {
      id: '1',
      title: language === 'hindi' ? 'खून की जांच रिपोर्ट' : language === 'punjabi' ? 'ਖੂਨ ਦੀ ਜਾਂਚ ਰਿਪੋਰਟ' : 'Blood Test Report',
      date: '2024-01-15',
      type: language === 'hindi' ? 'लैब रिपोर्ट' : language === 'punjabi' ? 'ਲੈਬ ਰਿਪੋਰਟ' : 'Lab Report',
      synced: true,
    },
    {
      id: '2',
      title: language === 'hindi' ? 'एक्स-रे रिपोर्ट' : language === 'punjabi' ? 'ਐਕਸ-ਰੇ ਰਿਪੋਰਟ' : 'X-Ray Report',
      date: '2024-01-10',
      type: language === 'hindi' ? 'इमेजिंग' : language === 'punjabi' ? 'ਇਮੇਜਿੰਗ' : 'Imaging',
      synced: false,
    },
    {
      id: '3',
      title: language === 'hindi' ? 'दवा की पर्ची' : language === 'punjabi' ? 'ਦਵਾਈ ਦੀ ਪਰਚੀ' : 'Prescription',
      date: '2024-01-08',
      type: language === 'hindi' ? 'प्रिस्क्रिप्शन' : language === 'punjabi' ? 'ਪ੍ਰਿਸਕ੍ਰਿਪਸ਼ਨ' : 'Prescription',
      synced: true,
    },
  ]);

  const handleUpload = () => {
    const message = language === 'hindi' ? 'फाइल अपलोड करना' : 
                   language === 'punjabi' ? 'ਫਾਇਲ ਅਪਲੋਡ ਕਰਨਾ' : 
                   'File upload functionality';
    alert(message);
  };

  const handleView = (recordId: string) => {
    const message = language === 'hindi' ? `रिकॉर्ड ${recordId} खोला जा रहा` : 
                   language === 'punjabi' ? `ਰਿਕਾਰਡ ${recordId} ਖੋਲ੍ਹਿਆ ਜਾ ਰਿਹਾ` : 
                   `Opening record ${recordId}`;
    alert(message);
  };

  const handleCamera = () => {
    const message = language === 'hindi' ? 'कैमरा खोला जा रहा' : 
                   language === 'punjabi' ? 'ਕੈਮਰਾ ਖੋਲ੍ਹਿਆ ਜਾ ਰਿਹਾ' : 
                   'Opening camera';
    alert(message);
  };

  return (
    <div className={`p-6 min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-teal-50 ${isEnglishOnly ? 'font-bold' : ''}`}>
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
            <h1 className={`text-2xl font-bold text-green-800 ${isEnglishOnly ? 'font-bold' : ''}`}>
              {getTranslation('healthRecords', language)}
            </h1>
          </div>
        </div>
        <LanguageSelector />
      </div>

      {/* Upload Section */}
      <Card className="p-4 mb-6 border-green-100 bg-green-50">
        <h2 className={`font-semibold mb-3 text-green-800 ${isEnglishOnly ? 'font-bold' : ''}`}>
          {getTranslation('addNewRecord', language)}
        </h2>
        <div className="flex gap-2">
          <Button
            onClick={handleUpload}
            className={`flex-1 bg-green-500 hover:bg-green-600 text-white ${isEnglishOnly ? 'font-bold' : ''}`}
            disabled={isOffline}
          >
            <Upload className="w-4 h-4 mr-2" />
            {getTranslation('uploadFile', language)}
          </Button>
          <Button
            onClick={handleCamera}
            className={`flex-1 bg-blue-500 hover:bg-blue-600 text-white ${isEnglishOnly ? 'font-bold' : ''}`}
          >
            <Camera className="w-4 h-4 mr-2" />
            {getTranslation('takePhoto', language)}
          </Button>
        </div>
        <p className={`text-xs text-green-600 mt-2 ${isEnglishOnly ? 'font-bold' : ''}`}>
          {language === 'hindi' ? 'PDF, JPG, PNG फाइलें समर्थित हैं' :
           language === 'punjabi' ? 'PDF, JPG, PNG ਫਾਇਲਾਂ ਸਪੋਰਟ ਕੀਤੀਆਂ ਜਾਂਦੀਆਂ ਹਨ' :
           'PDF, JPG, PNG files supported'}
        </p>
      </Card>

      {/* Records List */}
      <div className="flex-1">
        <h2 className={`text-lg font-semibold mb-4 text-gray-800 ${isEnglishOnly ? 'font-bold' : ''}`}>
          {getTranslation('yourRecords', language)}
        </h2>

        <div className="space-y-4">
          {records.map((record) => (
            <Card key={record.id} className="p-4 border-green-100 shadow-md">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-teal-500 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className={`font-semibold text-gray-800 ${isEnglishOnly ? 'font-bold' : ''}`}>
                      {record.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span className={`text-xs text-gray-500 ${isEnglishOnly ? 'font-bold' : ''}`}>
                        {record.date}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <Badge variant="outline" className={`text-xs ${isEnglishOnly ? 'font-bold' : ''}`}>
                    {record.type}
                  </Badge>
                  <div className="flex items-center gap-1">
                    {record.synced ? (
                      <Badge variant="default" className={`text-xs bg-green-100 text-green-700 ${isEnglishOnly ? 'font-bold' : ''}`}>
                        {getTranslation('synced', language)}
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className={`text-xs bg-yellow-100 text-yellow-700 ${isEnglishOnly ? 'font-bold' : ''}`}>
                        {getTranslation('local', language)}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleView(record.id)}
                  variant="outline"
                  className={`flex-1 border-green-200 text-green-700 hover:bg-green-50 ${isEnglishOnly ? 'font-bold' : ''}`}
                >
                  <Image className="w-4 h-4 mr-2" />
                  {getTranslation('view', language)}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="border-green-200 text-green-700 hover:bg-green-50"
                  disabled={isOffline && !record.synced}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Offline Message */}
        {isOffline && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className={`text-sm text-yellow-800 text-center ${isEnglishOnly ? 'font-bold' : ''}`}>
              {language === 'hindi' ? 'ऑफलाइन मोड - लोकल रिकॉर्ड दिखाए जा रहे हैं' :
               language === 'punjabi' ? 'ਆਫਲਾਈਨ ਮੋਡ - ਲੋਕਲ ਰਿਕਾਰਡ ਦਿਖਾਏ ਜਾ ਰਹੇ ਹਨ' :
               'Offline Mode - Showing locally stored records'}
            </p>
          </div>
        )}

        {/* Sync Status */}
        <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <p className={`text-xs text-gray-600 text-center ${isEnglishOnly ? 'font-bold' : ''}`}>
            {language === 'hindi' ? `सिंक स्टेटस: ${isOffline ? 'इंटरनेट की प्रतीक्षा में' : 'सभी रिकॉर्ड सिंक हैं'}` :
             language === 'punjabi' ? `ਸਿੰਕ ਸਟੇਟਸ: ${isOffline ? 'ਇੰਟਰਨੈਟ ਦੀ ਉਡੀਕ ਵਿੱਚ' : 'ਸਾਰੇ ਰਿਕਾਰਡ ਸਿੰਕ ਹਨ'}` :
             `Sync Status: ${isOffline ? 'Waiting for internet' : 'All records synced'}`}
          </p>
        </div>
      </div>
    </div>
  );
}