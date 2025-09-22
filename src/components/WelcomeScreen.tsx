import React from "react";
import { Button } from "./ui/button";
import { useLanguage } from "./LanguageContext";
import { LanguageSelector } from "./LanguageSelector";
import { Heart, Pill, Stethoscope, Leaf } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface WelcomeScreenProps {
  onShowLogin: () => void;
  onShowRegister: () => void;
}

export function WelcomeScreen({ onShowLogin, onShowRegister }: WelcomeScreenProps) {
  const { language } = useLanguage();

  const translations = {
    english: {
      title: "Sehat Nabha",
      subtitle: "Your Health, Our Priority",
      description: "Connect with healthcare professionals, manage your health records, and access medical services in your local community.",
      login: "Login",
      register: "Register",
      welcome: "Welcome to"
    },
    hindi: {
      title: "सेहत नभा",
      subtitle: "आपका स्वास्थ्य, हमारी प्राथमिकता",
      description: "स्वास्थ्य पेशेवरों से जुड़ें, अपने स्वास्थ्य रिकॉर्ड का प्रबंधन करें, और अपने स्थानीय समुदाय में चिकित्सा सेवाओं तक पहुंच प्राप्त करें।",
      login: "लॉगिन",
      register: "पंजीकरण",
      welcome: "में आपका स्वागत है"
    },
    punjabi: {
      title: "ਸਿਹਤ ਨਭਾ",
      subtitle: "ਤੁਹਾਡੀ ਸਿਹਤ, ਸਾਡੀ ਤਰਜੀਹ",
      description: "ਸਿਹਤ ਪੇਸ਼ੇਵਰਾਂ ਨਾਲ ਜੁੜੋ, ਆਪਣੇ ਸਿਹਤ ਰਿਕਾਰਡਾਂ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰੋ, ਅਤੇ ਆਪਣੇ ਸਥਾਨਕ ਕਮਿਊਨਿਟੀ ਵਿੱਚ ਮੈਡੀਕਲ ਸੇਵਾਵਾਂ ਤੱਕ ਪਹੁੰਚ ਪ੍ਰਾਪਤ ਕਰੋ।",
      login: "ਲਾਗਿਨ",
      register: "ਰਜਿਸਟਰ",
      welcome: "ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-6 flex flex-col">
      {/* Language Selector */}
      <div className="flex justify-end mb-4">
        <LanguageSelector />
      </div>

      {/* Header Section with Icons */}
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
        {/* Medicine Icons */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-orange-400 to-amber-500 p-6 rounded-2xl shadow-lg transform rotate-3">
            <Stethoscope className="w-12 h-12 text-white mx-auto" />
          </div>
          <div className="bg-gradient-to-br from-amber-500 to-yellow-500 p-6 rounded-2xl shadow-lg transform -rotate-3">
            <Heart className="w-12 h-12 text-white mx-auto" />
          </div>
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl shadow-lg transform -rotate-2">
            <Leaf className="w-12 h-12 text-white mx-auto" />
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-6 rounded-2xl shadow-lg transform rotate-2">
            <Pill className="w-12 h-12 text-white mx-auto" />
          </div>
        </div>



        {/* App Title */}
        <div className="space-y-4">
          <p className="text-lg text-orange-700 font-medium">
            {translations[language].welcome}
          </p>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            {translations[language].title}
          </h1>
          <p className="text-xl text-amber-700 font-medium">
            {translations[language].subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed max-w-xs px-4">
          {translations[language].description}
        </p>

        {/* Action Buttons */}
        <div className="space-y-4 w-full max-w-xs">
          <Button
            onClick={onShowLogin}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
          >
            {translations[language].login}
          </Button>
          
          <Button
            onClick={onShowRegister}
            variant="outline"
            className="w-full border-2 border-orange-300 text-orange-600 hover:bg-orange-50 py-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
          >
            {translations[language].register}
          </Button>
        </div>
      </div>
    </div>
  );
}