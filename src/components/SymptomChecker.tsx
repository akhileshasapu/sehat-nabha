import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Textarea } from './ui/textarea';
import { ArrowLeft, AlertCircle, CheckCircle, Heart, Thermometer, Activity, FileText } from 'lucide-react';
import { useLanguage, getTranslation } from './LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface SymptomCheckerProps {
  onNavigate: (screen: 'home' | 'video' | 'records' | 'medicine' | 'symptoms') => void;
  isOffline: boolean;
}

export function SymptomChecker({ onNavigate, isOffline }: SymptomCheckerProps) {
  const { language } = useLanguage();
  const isEnglishOnly = language === 'english';
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [customSymptoms, setCustomSymptoms] = useState('');
  const [showOthersInput, setShowOthersInput] = useState(false);

  const symptoms = [
    {
      id: 'fever',
      name: getTranslation('fever', language),
      icon: Thermometer,
      category: 'general',
    },
    {
      id: 'headache',
      name: getTranslation('headache', language),
      icon: AlertCircle,
      category: 'general',
    },
    {
      id: 'cough',
      name: getTranslation('cough', language),
      icon: Activity,
      category: 'respiratory',
    },
    {
      id: 'fatigue',
      name: getTranslation('fatigue', language),
      icon: Heart,
      category: 'general',
    },
    {
      id: 'bodyache',
      name: getTranslation('bodyPain', language),
      icon: AlertCircle,
      category: 'general',
    },
    {
      id: 'nausea',
      name: getTranslation('nausea', language),
      icon: AlertCircle,
      category: 'digestive',
    },
    {
      id: 'chestpain',
      name: getTranslation('chestPain', language),
      icon: Heart,
      category: 'cardiovascular',
    },
    {
      id: 'breathless',
      name: getTranslation('breathingDifficulty', language),
      icon: Activity,
      category: 'respiratory',
    },
    {
      id: 'others',
      name: getTranslation('others', language),
      icon: FileText,
      category: 'custom',
    },
  ];

  const handleSymptomToggle = (symptomId: string) => {
    if (symptomId === 'others') {
      setShowOthersInput(!showOthersInput);
      if (showOthersInput) {
        // Remove others from selected symptoms if hiding input
        setSelectedSymptoms(prev => prev.filter(id => id !== 'others'));
        setCustomSymptoms('');
      } else {
        // Add others to selected symptoms if showing input
        setSelectedSymptoms(prev => prev.includes('others') ? prev : [...prev, 'others']);
      }
    } else {
      setSelectedSymptoms(prev =>
        prev.includes(symptomId)
          ? prev.filter(id => id !== symptomId)
          : [...prev, symptomId]
      );
    }
  };

  const handleAnalyze = () => {
    if (selectedSymptoms.length === 0) {
      const message = language === 'hindi' ? 'कृपया कुछ लक्षण चुनें' :
                     language === 'punjabi' ? 'ਕਿਰਪਾ ਕਰਕੇ ਕੁਝ ਲੱਛਣ ਚੁਣੋ' :
                     'Please select some symptoms';
      alert(message);
      return;
    }
    setShowResults(true);
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setShowResults(false);
    setCustomSymptoms('');
    setShowOthersInput(false);
  };

  const getAnalysisResults = () => {
    const symptomCount = selectedSymptoms.length;
    const hasRespiratory = selectedSymptoms.some(s => ['cough', 'breathless'].includes(s));
    const hasCardiac = selectedSymptoms.includes('chestpain');
    const hasFever = selectedSymptoms.includes('fever');

    if (hasCardiac || selectedSymptoms.includes('breathless')) {
      return {
        severity: 'high',
        condition: language === 'hindi' ? 'तुरंत चिकित्सा सलाह की आवश्यकता' :
                  language === 'punjabi' ? 'ਤੁਰੰਤ ਡਾਕਟਰੀ ਸਲਾਹ ਦੀ ਲੋੜ' :
                  'Urgent Medical Attention Required',
        advice: language === 'hindi' ? 'तुरंत अस्पताल जाएं या आपातकालीन सेवा को कॉल करें' :
               language === 'punjabi' ? 'ਤੁਰੰਤ ਹਸਪਤਾਲ ਜਾਓ ਜਾਂ ਐਮਰਜੈਂਸੀ ਸੇਵਾ ਨੂੰ ਕਾਲ ਕਰੋ' :
               'Go to hospital immediately or call emergency services',
        color: 'red',
      };
    } else if (hasFever && hasRespiratory) {
      return {
        severity: 'medium',
        condition: language === 'hindi' ? 'सर्दी-जुकाम या फ्लू के लक्षण' :
                  language === 'punjabi' ? 'ਸਰਦੀ-ਜ਼ੁਕਾਮ ਜਾਂ ਫਲੂ ਦੇ ਲੱਛਣ' :
                  'Common Cold or Flu Symptoms',
        advice: language === 'hindi' ? 'आराम करें, पानी पिएं, और यदि लक्षण बिगड़ें तो डॉक्टर से मिलें' :
               language === 'punjabi' ? 'ਆਰਾਮ ਕਰੋ, ਪਾਣੀ ਪੀਓ, ਅਤੇ ਜੇ ਲੱਛਣ ਬਦਤਰ ਹੋਣ ਤਾਂ ਡਾਕਟਰ ਨੂੰ ਮਿਲੋ' :
               'Rest, drink fluids, and see a doctor if symptoms worsen',
        color: 'yellow',
      };
    } else if (symptomCount >= 3) {
      return {
        severity: 'medium',
        condition: language === 'hindi' ? 'कई लक्षण दिखाई दे रहे हैं' :
                  language === 'punjabi' ? 'ਕਈ ਲੱਛਣ ਦਿਖਾਈ ਦੇ ਰਹੇ ਹਨ' :
                  'Multiple Symptoms Present',
        advice: language === 'hindi' ? 'चिकित्सा सलाह लेनी चाहिए' :
               language === 'punjabi' ? 'ਡਾਕਟਰੀ ਸਲਾਹ ਲੈਣੀ ਚਾਹੀਦੀ ਹੈ' :
               'Medical consultation recommended',
        color: 'yellow',
      };
    } else {
      return {
        severity: 'low',
        condition: language === 'hindi' ? 'हल्के लक्षण' :
                  language === 'punjabi' ? 'ਹਲਕੇ ਲੱਛਣ' :
                  'Mild Symptoms',
        advice: language === 'hindi' ? 'घरेलू इलाज और आराम, यदि लक्षण बने रहें तो डॉक्टर से मिलें' :
               language === 'punjabi' ? 'ਘਰੇਲੂ ਇਲਾਜ ਅਤੇ ਆਰਾਮ, ਜੇ ਲੱਛਣ ਬਣੇ ਰਹਿਣ ਤਾਂ ਡਾਕਟਰ ਨੂੰ ਮਿਲੋ' :
               'Home care and rest, see doctor if symptoms persist',
        color: 'green',
      };
    }
  };

  const results = showResults ? getAnalysisResults() : null;

  return (
    <div className={`p-6 min-h-screen flex flex-col bg-gradient-to-br from-red-50 to-orange-50 ${isEnglishOnly ? 'font-bold' : ''}`}>
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
            <h1 className={`text-2xl font-bold text-red-800 ${isEnglishOnly ? 'font-bold' : ''}`}>
              {getTranslation('symptomChecker', language)}
            </h1>
            <p className={`text-sm text-red-600 ${isEnglishOnly ? 'font-bold' : ''}`}>
              {getTranslation('aiSymptomChecker', language)}
            </p>
          </div>
        </div>
        <LanguageSelector />
      </div>

      {!showResults ? (
        <div className="flex-1">
          {/* Instructions */}
          <Card className="p-4 mb-6 border-red-100 bg-red-50">
            <h2 className={`font-semibold mb-2 text-red-800 ${isEnglishOnly ? 'font-bold' : ''}`}>
              {getTranslation('selectSymptoms', language)}
            </h2>
            <p className={`text-sm text-red-600 ${isEnglishOnly ? 'font-bold' : ''}`}>
              {language === 'hindi' ? 'जो लक्षण आप महसूस कर रहे हैं उन्हें चुनें। यह केवल मार्गदर्शन है, चिकित्सा सलाह का विकल्प नहीं।' :
               language === 'punjabi' ? 'ਜੋ ਲੱਛਣ ਤੁਸੀਂ ਮਹਿਸੂस ਕਰ ਰਹੇ ਹੋ ਉਨ੍ਹਾਂ ਨੂੰ ਚੁਣੋ। ਇਹ ਸਿਰਫ਼ ਮਾਰਗਦਰਸ਼ਨ ਹੈ, ਡਾਕਟਰੀ ਸਲਾਹ ਦਾ ਬਦਲ ਨਹੀਂ।' :
               'Select the symptoms you are experiencing. This is guidance only, not a substitute for medical advice.'}
            </p>
          </Card>

          {/* Symptoms Grid */}
          <div className="grid grid-cols-1 gap-3 mb-6">
            {symptoms.map((symptom) => {
              const IconComponent = symptom.icon;
              const isSelected = selectedSymptoms.includes(symptom.id);
              
              return (
                <Card
                  key={symptom.id}
                  className={`p-4 cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'border-red-300 bg-red-50 shadow-md' 
                      : 'border-gray-200 hover:border-red-200 hover:bg-red-25'
                  }`}
                  onClick={() => handleSymptomToggle(symptom.id)}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => handleSymptomToggle(symptom.id)}
                      className="data-[state=checked]:bg-red-500"
                    />
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium text-gray-800 ${isEnglishOnly ? 'font-bold' : ''}`}>
                        {symptom.name}
                      </h3>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Custom Symptoms Input */}
          {showOthersInput && (
            <Card className="p-4 mb-6 border-gray-200 bg-gray-50">
              <h3 className={`font-semibold mb-2 text-gray-800 ${isEnglishOnly ? 'font-bold' : ''}`}>
                {getTranslation('others', language)}
              </h3>
              <Textarea
                value={customSymptoms}
                onChange={(e) => setCustomSymptoms(e.target.value)}
                placeholder={getTranslation('describeSymptoms', language)}
                className={`w-full h-20 border-gray-300 focus:border-red-400 ${isEnglishOnly ? 'font-bold' : ''}`}
              />
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleAnalyze}
              className={`flex-1 bg-red-500 hover:bg-red-600 text-white h-12 ${isEnglishOnly ? 'font-bold' : ''}`}
              disabled={selectedSymptoms.length === 0}
            >
              <Activity className="w-5 h-5 mr-2" />
              {getTranslation('analyze', language)}
            </Button>
            
            <Button
              onClick={handleReset}
              variant="outline"
              className={`border-red-200 text-red-700 hover:bg-red-50 ${isEnglishOnly ? 'font-bold' : ''}`}
            >
              {getTranslation('clear', language)}
            </Button>
          </div>

          {/* Selected Count */}
          {selectedSymptoms.length > 0 && (
            <div className="mt-4 text-center">
              <Badge variant="outline" className={`border-red-200 text-red-700 ${isEnglishOnly ? 'font-bold' : ''}`}>
                {selectedSymptoms.length} {language === 'hindi' ? 'लक्षण चुने गए' : language === 'punjabi' ? 'ਲੱਛਣ ਚੁਣੇ ਗਏ' : 'symptoms selected'}
              </Badge>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1">
          {/* Results */}
          <Card className={`p-6 mb-6 border-${results?.color}-200 bg-${results?.color}-50`}>
            <div className="flex items-center gap-3 mb-4">
              {results?.severity === 'high' ? (
                <AlertCircle className="w-8 h-8 text-red-600" />
              ) : (
                <CheckCircle className="w-8 h-8 text-green-600" />
              )}
              <div>
                <h2 className={`text-xl font-bold text-gray-800 ${isEnglishOnly ? 'font-bold' : ''}`}>
                  {getTranslation('result', language)}
                </h2>
                <Badge 
                  variant={results?.severity === 'high' ? 'destructive' : 'default'}
                  className={`mt-1 ${isEnglishOnly ? 'font-bold' : ''}`}
                >
                  {results?.severity === 'high' ? 
                    (language === 'hindi' ? 'हाई प्राथमिकता' : language === 'punjabi' ? 'ਹਾਈ ਪ੍ਰਾਇਓਰਿਟੀ' : 'High Priority') : 
                   results?.severity === 'medium' ? 
                    (language === 'hindi' ? 'मध्यम प्राथमिकता' : language === 'punjabi' ? 'ਮਿਡਿਅਮ ਪ੍ਰਾਇਓਰਿਟੀ' : 'Medium Priority') : 
                    (language === 'hindi' ? 'कम प्राथमिकता' : language === 'punjabi' ? 'ਲੋ ਪ੍ਰਾਇਓਰਿਟੀ' : 'Low Priority')}
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className={`font-semibold text-gray-800 ${isEnglishOnly ? 'font-bold' : ''}`}>
                  {results?.condition}
                </h3>
              </div>
              
              <div>
                <h4 className={`font-medium text-gray-700 mb-1 ${isEnglishOnly ? 'font-bold' : ''}`}>
                  {getTranslation('advice', language)}
                </h4>
                <p className={`text-sm text-gray-600 ${isEnglishOnly ? 'font-bold' : ''}`}>
                  {results?.advice}
                </p>
              </div>
            </div>
          </Card>

          {/* Emergency Contact */}
          {results?.severity === 'high' && (
            <Card className="p-4 mb-6 border-red-300 bg-red-100">
              <h3 className={`font-semibold text-red-800 mb-2 ${isEnglishOnly ? 'font-bold' : ''}`}>
                {language === 'hindi' ? 'आपातकालीन संपर्क' : language === 'punjabi' ? 'ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ' : 'Emergency Contact'}
              </h3>
              <div className="space-y-2">
                <Button
                  className={`w-full bg-red-600 hover:bg-red-700 text-white ${isEnglishOnly ? 'font-bold' : ''}`}
                  onClick={() => alert(language === 'hindi' ? 'आपातकालीन कॉल: 108' : language === 'punjabi' ? 'ਐਮਰਜੈਂਸੀ ਕਾਲ: 108' : 'Emergency Call: 108')}
                >
                  🚨 {language === 'hindi' ? 'आपातकाल - 108' : language === 'punjabi' ? 'ਐਮਰਜੈਂਸੀ - 108' : 'Emergency - 108'}
                </Button>
                <Button
                  variant="outline"
                  className={`w-full border-red-300 text-red-700 ${isEnglishOnly ? 'font-bold' : ''}`}
                  onClick={() => onNavigate('video')}
                >
                  {language === 'hindi' ? 'तुरंत डॉक्टर को कॉल करें' : language === 'punjabi' ? 'ਤੁਰੰਤ ਡਾਕਟਰ ਨੂੰ ਕਾਲ ਕਰੋ' : 'Call Doctor Immediately'}
                </Button>
              </div>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleReset}
              className={`flex-1 bg-gray-500 hover:bg-gray-600 text-white ${isEnglishOnly ? 'font-bold' : ''}`}
            >
              {getTranslation('newCheck', language)}
            </Button>
            
            <Button
              onClick={() => onNavigate('video')}
              className={`flex-1 bg-blue-500 hover:bg-blue-600 text-white ${isEnglishOnly ? 'font-bold' : ''}`}
            >
              {getTranslation('consultDoctor', language)}
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <p className={`text-xs text-gray-600 text-center ${isEnglishOnly ? 'font-bold' : ''}`}>
              ⚠️ {language === 'hindi' ? 'यह केवल मार्गदर्शन है। गंभीर समस्या के लिए डॉक्टर से मिलें।' :
                   language === 'punjabi' ? 'ਇਹ ਸਿਰਫ਼ ਮਾਰਗਦਰਸ਼ਨ ਹੈ। ਗੰਭੀਰ ਸਮੱਸਿਆ ਲਈ ਡਾਕਟਰ ਨੂੰ ਮਿਲੋ।' :
                   'This is guidance only. Consult a doctor for serious problems.'}
            </p>
          </div>
        </div>
      )}

      {/* Offline Functionality Note */}
      {isOffline && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className={`text-sm text-green-800 text-center ${isEnglishOnly ? 'font-bold' : ''}`}>
            ✅ {language === 'hindi' ? 'ऑफलाइन AI जांच उपलब्ध' : language === 'punjabi' ? 'ਆਫਲਾਈਨ AI ਜਾਂਚ ਉਪਲਬਧ' : 'Offline AI checker available'}
          </p>
        </div>
      )}
    </div>
  );
}