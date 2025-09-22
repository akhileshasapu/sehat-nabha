import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useLanguage } from "./LanguageContext";
import { LanguageSelector } from "./LanguageSelector";
import { ArrowLeft, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LoginScreenProps {
  onBack: () => void;
  onLogin: (email: string, password: string) => void;
  onGoogleLogin: () => void;
  onShowRegister: () => void;
  isLoading?: boolean;
}

export function LoginScreen({ onBack, onLogin, onGoogleLogin, onShowRegister, isLoading }: LoginScreenProps) {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const translations = {
    english: {
      title: "Welcome Back",
      subtitle: "Sign in to your account",
      email: "Email Address",
      password: "Password",
      login: "Sign In",
      googleLogin: "Continue with Google",
      forgotPassword: "Forgot Password?",
      noAccount: "Don't have an account?",
      register: "Sign Up",
      emailPlaceholder: "Enter your email",
      passwordPlaceholder: "Enter your password"
    },
    hindi: {
      title: "वापसी पर स्वागत",
      subtitle: "अपने खाते में साइन इन करें",
      email: "ईमेल पता",
      password: "पासवर्ड",
      login: "साइन इन",
      googleLogin: "Google के साथ जारी रखें",
      forgotPassword: "पासवर्ड भूल गए?",
      noAccount: "खाता नहीं है?",
      register: "साइन अप",
      emailPlaceholder: "अपना ईमेल दर्ज करें",
      passwordPlaceholder: "अपना पासवर्ड दर्ज करें"
    },
    punjabi: {
      title: "ਵਾਪਸੀ ਤੇ ਸਵਾਗਤ",
      subtitle: "ਆਪਣੇ ਖਾਤੇ ਵਿੱਚ ਸਾਈਨ ਇਨ ਕਰੋ",
      email: "ਈਮੇਲ ਪਤਾ",
      password: "ਪਾਸਵਰਡ",
      login: "ਸਾਈਨ ਇਨ",
      googleLogin: "Google ਨਾਲ ਜਾਰੀ ਰੱਖੋ",
      forgotPassword: "ਪਾਸਵਰਡ ਭੁੱਲ ਗਏ?",
      noAccount: "ਖਾਤਾ ਨਹੀਂ ਹੈ?",
      register: "ਸਾਈਨ ਅੱਪ",
      emailPlaceholder: "ਆਪਣੀ ਈਮੇਲ ਦਰਜ ਕਰੋ",
      passwordPlaceholder: "ਆਪਣਾ ਪਾਸਵਰਡ ਦਰਜ ਕਰੋ"
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email, password);
    }
  };

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

      {/* Login Form */}
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
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">
                {translations[language].email}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={translations[language].emailPlaceholder}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            {/* Forgot Password */}
            <div className="text-right">
              <Button
                type="button"
                variant="ghost"
                className="text-orange-600 hover:text-orange-700 p-0 h-auto font-normal"
              >
                {translations[language].forgotPassword}
              </Button>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-6 rounded-xl shadow-lg"
            >
              {isLoading ? "..." : translations[language].login}
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

          {/* Sign Up Link */}
          <div className="text-center space-x-1">
            <span className="text-gray-600">{translations[language].noAccount}</span>
            <Button
              type="button"
              variant="ghost"
              onClick={onShowRegister}
              className="text-orange-600 hover:text-orange-700 p-0 h-auto font-medium"
            >
              {translations[language].register}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}