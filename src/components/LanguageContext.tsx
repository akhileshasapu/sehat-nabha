import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'hindi' | 'english' | 'punjabi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('english');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Translation objects
export const translations = {
  // Home Screen
  appName: {
    hindi: 'सेहत नभा',
    english: 'Sehat Nabha',
    punjabi: 'ਸਿਹਤ ਨਭਾ'
  },
  welcomeMessage: {
    hindi: 'नमस्ते! आपके स्वास्थ्य की देखभाल',
    english: 'Hello! Your Health Companion',
    punjabi: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਤੁਹਾਡੀ ਸਿਹਤ ਦੀ ਦੇਖਭਾਲ'
  },
  videoConsultation: {
    hindi: 'वीडियो सलाह',
    english: 'Video Consultation',
    punjabi: 'ਵੀਡੀਓ ਸਲਾਹ'
  },
  healthRecords: {
    hindi: 'स्वास्थ्य रिकॉर्ड',
    english: 'Health Records',
    punjabi: 'ਸਿਹਤ ਰਿਕਾਰਡ'
  },
  medicineAvailability: {
    hindi: 'दवा उपलब्धता',
    english: 'Medicine Availability',
    punjabi: 'ਦਵਾਈ ਉਪਲਬਧਤਾ'
  },
  symptomChecker: {
    hindi: 'लक्षण जांच',
    english: 'Symptom Checker',
    punjabi: 'ਲੱਛਣ ਜਾਂਚ'
  },
  offlineMode: {
    hindi: 'ऑफलाइन मोड - कुछ फीचर सीमित हो सकते हैं',
    english: 'Offline Mode - Some features may be limited',
    punjabi: 'ਆਫਲਾਈਨ ਮੋਡ - ਕੁਝ ਫੀਚਰ ਸੀਮਿਤ ਹੋ ਸਕਦੇ ਹਨ'
  },

  // Video Consultation
  availableDoctors: {
    hindi: 'उपलब्ध डॉक्टर',
    english: 'Available Doctors',
    punjabi: 'ਉਪਲਬਧ ਡਾਕਟਰ'
  },
  available: {
    hindi: 'उपलब्ध',
    english: 'Available',
    punjabi: 'ਉਪਲਬਧ'
  },
  busy: {
    hindi: 'व्यस्त',
    english: 'Busy',
    punjabi: 'ਵਿਅਸਤ'
  },
  specialty: {
    hindi: 'विशेषज्ञता:',
    english: 'Specialty:',
    punjabi: 'ਵਿਸ਼ੇਸ਼ਗਿਆ:'
  },
  nextSlot: {
    hindi: 'अगला स्लॉट:',
    english: 'Next Slot:',
    punjabi: 'ਅਗਲਾ ਸਲਾਟ:'
  },
  callNow: {
    hindi: 'अभी कॉल करें',
    english: 'Call Now',
    punjabi: 'ਹੁਣੇ ਕਾਲ ਕਰੋ'
  },
  bookAppointment: {
    hindi: 'अपॉइंटमेंट बुक करें',
    english: 'Book Appointment',
    punjabi: 'ਅਪਾਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰੋ'
  },
  connecting: {
    hindi: 'कनेक्ट हो रहा...',
    english: 'Connecting...',
    punjabi: 'ਕਨੈਕਟ ਹੋ ਰਿਹਾ...'
  },

  // Health Records
  addNewRecord: {
    hindi: 'नया रिकॉर्ड जोड़ें',
    english: 'Add New Record',
    punjabi: 'ਨਵਾਂ ਰਿਕਾਰਡ ਜੋੜੋ'
  },
  uploadFile: {
    hindi: 'फाइल अपलोड',
    english: 'Upload File',
    punjabi: 'ਫਾਇਲ ਅਪਲੋਡ'
  },
  takePhoto: {
    hindi: 'फोटो लें',
    english: 'Take Photo',
    punjabi: 'ਫੋਟੋ ਲਓ'
  },
  yourRecords: {
    hindi: 'आपके रिकॉर्ड',
    english: 'Your Records',
    punjabi: 'ਤੁਹਾਡੇ ਰਿਕਾਰਡ'
  },
  view: {
    hindi: 'देखें',
    english: 'View',
    punjabi: 'ਵੇਖੋ'
  },
  synced: {
    hindi: 'सिंक हुआ',
    english: 'Synced',
    punjabi: 'ਸਿੰਕ ਹੋਇਆ'
  },
  local: {
    hindi: 'लोकल',
    english: 'Local',
    punjabi: 'ਲੋਕਲ'
  },

  // Medicine Availability
  searchMedicine: {
    hindi: 'दवा या मेडिकल स्टोर खोजें',
    english: 'Search medicine or store',
    punjabi: 'ਦਵਾਈ ਜਾਂ ਮੈਡੀਕਲ ਸਟੋਰ ਖੋਜੋ'
  },
  callStore: {
    hindi: 'कॉल करें',
    english: 'Call',
    punjabi: 'ਕਾਲ ਕਰੋ'
  },
  direction: {
    hindi: 'दिशा',
    english: 'Direction',
    punjabi: 'ਦਿਸ਼ਾ'
  },
  open: {
    hindi: 'खुला',
    english: 'Open',
    punjabi: 'ਖੁੱਲ੍ਹਾ'
  },
  closed: {
    hindi: 'बंद',
    english: 'Closed',
    punjabi: 'ਬੰਦ'
  },
  availableMedicines: {
    hindi: 'उपलब्ध दवाएं:',
    english: 'Available Medicines:',
    punjabi: 'ਉਪਲਬਧ ਦਵਾਈਆਂ:'
  },
  outOfStock: {
    hindi: 'खत्म',
    english: 'Out of Stock',
    punjabi: 'ਖਤਮ'
  },

  // Symptom Checker
  aiSymptomChecker: {
    hindi: 'AI लक्षण जांच',
    english: 'AI Symptom Checker',
    punjabi: 'AI ਲੱਛਣ ਜਾਂਚ'
  },
  selectSymptoms: {
    hindi: 'अपने लक्षण चुनें',
    english: 'Select Your Symptoms',
    punjabi: 'ਆਪਣੇ ਲੱਛਣ ਚੁਣੋ'
  },
  analyze: {
    hindi: 'जांच करें',
    english: 'Analyze',
    punjabi: 'ਜਾਂਚ ਕਰੋ'
  },
  clear: {
    hindi: 'साफ करें',
    english: 'Clear',
    punjabi: 'ਸਾਫ਼ ਕਰੋ'
  },
  result: {
    hindi: 'परिणाम',
    english: 'Result',
    punjabi: 'ਨਤੀਜਾ'
  },
  advice: {
    hindi: 'सलाह:',
    english: 'Advice:',
    punjabi: 'ਸਲਾਹ:'
  },
  newCheck: {
    hindi: 'नई जांच',
    english: 'New Check',
    punjabi: 'ਨਵੀਂ ਜਾਂਚ'
  },
  consultDoctor: {
    hindi: 'डॉक्टर से मिलें',
    english: 'Consult Doctor',
    punjabi: 'ਡਾਕਟਰ ਨੂੰ ਮਿਲੋ'
  },

  // Common symptoms
  fever: {
    hindi: 'बुखार',
    english: 'Fever',
    punjabi: 'ਬੁਖਾਰ'
  },
  headache: {
    hindi: 'सिर दर्द',
    english: 'Headache',
    punjabi: 'ਸਿਰ ਦਰਦ'
  },
  cough: {
    hindi: 'खांसी',
    english: 'Cough',
    punjabi: 'ਖੰਘ'
  },
  fatigue: {
    hindi: 'थकावट',
    english: 'Fatigue',
    punjabi: 'ਥਕਾਵਟ'
  },
  bodyPain: {
    hindi: 'शरीर दर्द',
    english: 'Body Pain',
    punjabi: 'ਸਰੀਰ ਦਰਦ'
  },
  nausea: {
    hindi: 'मतली',
    english: 'Nausea',
    punjabi: 'ਮਤਲੀ'
  },
  chestPain: {
    hindi: 'छाती का दर्द',
    english: 'Chest Pain',
    punjabi: 'ਛਾਤੀ ਦਾ ਦਰਦ'
  },
  breathingDifficulty: {
    hindi: 'सांस लेने में कठिनाई',
    english: 'Breathing Difficulty',
    punjabi: 'ਸਾਹ ਲੈਣ ਵਿੱਚ ਮੁਸ਼ਕਿਲ'
  },
  others: {
    hindi: 'अन्य',
    english: 'Others',
    punjabi: 'ਹੋਰ'
  },
  describeSymptoms: {
    hindi: 'अपने लक्षणों का वर्णन करें...',
    english: 'Describe your symptoms...',
    punjabi: 'ਆਪਣੇ ਲੱਛਣਾਂ ਦਾ ਵਰਣਨ ਕਰੋ...'
  }
};

export function getTranslation(key: keyof typeof translations, language: Language): string {
  return translations[key][language] || translations[key].english;
}