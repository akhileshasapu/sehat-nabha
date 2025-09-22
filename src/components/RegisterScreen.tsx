import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useLanguage } from "./LanguageContext";
import { LanguageSelector } from "./LanguageSelector";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface RegisterScreenProps {
  onBack: () => void;
  onRegister: (userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => void;
  onGoogleLogin: () => void;
  onShowLogin: () => void;
  isLoading?: boolean;
}

export function RegisterScreen({ onBack, onRegister, onGoogleLogin, onShowLogin, isLoading }: RegisterScreenProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const translations = {
    english: {
      title: "Create Account",
      subtitle: "Join Sehat Nabha today",
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      password: "Password",
      confirmPassword: "Confirm Password",
      register: "Create Account",
      googleLogin: "Continue with Google",
      haveAccount: "Already have an account?",
      login: "Sign In",
      namePlaceholder: "Enter your full name",
      emailPlaceholder: "Enter your email",
      phonePlaceholder: "Enter your phone number",
      passwordPlaceholder: "Create a password",
      confirmPasswordPlaceholder: "Confirm your password",
      passwordMismatch: "Passwords don't match"
    },
    hindi: {
      title: "खाता बनाएं",
      subtitle: "आज ही सेहत नभा से जुड़ें",
      name: "पूरा नाम",
      email: "ईमेल पता",
      phone: "फोन नंबर",
      password: "पासवर्ड",
      confirmPassword: "पासवर्ड की पुष्टि करें",
      register: "खाता बनाएं",
      googleLogin: "Google के साथ जारी रखें",
      haveAccount: "पहले से खाता है?",
      login: "साइन इन",
      namePlaceholder: "अपना पूरा नाम दर्ज करें",
      emailPlaceholder: "अपना ईमेल दर्ज करें",
      phonePlaceholder: "अपना फोन नंबर दर्ज करें",
      passwordPlaceholder: "पासवर्ड बनाएं",
      confirmPasswordPlaceholder: "अपने पासवर्ड की पुष्टि करें",
      passwordMismatch: "पासवर्ड मेल नहीं खाते"
    },
    punjabi: {
      title: "ਖਾਤਾ ਬਣਾਓ",
      subtitle: "ਅੱਜ ਹੀ ਸਿਹਤ ਨਭਾ ਨਾਲ ਜੁੜੋ",
      name: "ਪੂਰਾ ਨਾਮ",
      email: "ਈਮੇਲ ਪਤਾ",
      phone: "ਫੋਨ ਨੰਬਰ",
      password: "ਪਾਸਵਰਡ",
      confirmPassword: "ਪਾਸਵਰਡ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ",
      register: "ਖਾਤਾ ਬਣਾਓ",
      googleLogin: "Google ਨਾਲ ਜਾਰੀ ਰੱਖੋ",
      haveAccount: "ਪਹਿਲਾਂ ਤੋਂ ਖਾਤਾ ਹੈ?",
      login: "ਸਾਈਨ ਇਨ",
      namePlaceholder: "ਆਪਣਾ ਪੂਰਾ ਨਾਮ ਦਰਜ ਕਰੋ",
      emailPlaceholder: "ਆਪਣੀ ਈਮੇਲ ਦਰਜ ਕਰੋ",
      phonePlaceholder: "ਆਪਣਾ ਫੋਨ ਨੰਬਰ ਦਰਜ ਕਰੋ",
      passwordPlaceholder: "ਪਾਸਵਰਡ ਬਣਾਓ",
      confirmPasswordPlaceholder: "ਆਪਣੇ ਪਾਸਵਰਡ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ",
      passwordMismatch: "ਪਾਸਵਰਡ ਮੇਲ ਨਹੀਂ ਖਾਂਦੇ"
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert(translations[language].passwordMismatch);
      return;
    }
    
    if (formData.name && formData.email && formData.phone && formData.password) {
      onRegister({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = formData.name && formData.email && formData.phone && 
                     formData.password && formData.confirmPassword &&
                     formData.password === formData.confirmPassword;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="p-2 hover:bg-orange-100 rounded-full"
        >
          <ArrowLeft className="w-6 h-6 text-orange-600" />
        </Button>
        <LanguageSelector />
      </div>

      {/* App Logo */}
      <div className="flex justify-center mb-8">
        <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg border-4 border-orange-200">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1588744749420-b355a3323077?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMHB1bmphYmklMjBtZWRpY2luZSUyMGhlcmJzJTIwYXl1cnZlZGF8ZW58MXx8fHwxNzU4NTMwMTQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Sehat Nabha"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Register Form */}
      <Card className="w-full max-w-md mx-auto shadow-xl border-0 bg-white/95 backdrop-blur">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl text-gray-800">
            {translations[language].title}
          </CardTitle>
          <p className="text-gray-600">
            {translations[language].subtitle}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">
                {translations[language].name}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder={translations[language].namePlaceholder}
                  className="pl-10 py-6 rounded-xl border-2 border-gray-200 focus:border-orange-400"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">
                {translations[language].email}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder={translations[language].emailPlaceholder}
                  className="pl-10 py-6 rounded-xl border-2 border-gray-200 focus:border-orange-400"
                  required
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">
                {translations[language].phone}
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder={translations[language].phonePlaceholder}
                  className="pl-10 py-6 rounded-xl border-2 border-gray-200 focus:border-orange-400"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">
                {translations[language].password}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  placeholder={translations[language].passwordPlaceholder}
                  className="pl-10 pr-10 py-6 rounded-xl border-2 border-gray-200 focus:border-orange-400"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-transparent"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">
                {translations[language].confirmPassword}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => updateField("confirmPassword", e.target.value)}
                  placeholder={translations[language].confirmPasswordPlaceholder}
                  className="pl-10 pr-10 py-6 rounded-xl border-2 border-gray-200 focus:border-orange-400"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-transparent"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            {/* Register Button */}
            <Button
              type="submit"
              disabled={isLoading || !isFormValid}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-6 rounded-xl shadow-lg"
            >
              {isLoading ? "..." : translations[language].register}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative bg-white px-4 text-sm text-gray-500">
              or
            </div>
          </div>

          {/* Google Login */}
          <Button
            type="button"
            variant="outline"
            onClick={onGoogleLogin}
            disabled={isLoading}
            className="w-full border-2 border-gray-200 hover:bg-gray-50 py-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full" />
              <span>{translations[language].googleLogin}</span>
            </div>
          </Button>

          {/* Sign In Link */}
          <div className="text-center space-x-1">
            <span className="text-gray-600">{translations[language].haveAccount}</span>
            <Button
              type="button"
              variant="ghost"
              onClick={onShowLogin}
              className="text-orange-600 hover:text-orange-700 p-0 h-auto font-medium"
            >
              {translations[language].login}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}