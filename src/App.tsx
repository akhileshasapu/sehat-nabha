import React, { useState, useEffect } from "react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { LoginScreen } from "./components/LoginScreen";
import { RegisterScreen } from "./components/RegisterScreen";
import { HomeScreen } from "./components/HomeScreen";
import { VideoConsultation } from "./components/VideoConsultation";
import { HealthRecords } from "./components/HealthRecords";
import { MedicineAvailability } from "./components/MedicineAvailability";
import { SymptomChecker } from "./components/SymptomChecker";
import { LanguageProvider } from "./components/LanguageContext";

type AuthScreen = "welcome" | "login" | "register";
type AppScreen = "home" | "video" | "records" | "medicine" | "symptoms";

interface User {
  name: string;
  email: string;
  phone: string;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentAuthScreen, setCurrentAuthScreen] = useState<AuthScreen>("welcome");
  const [currentAppScreen, setCurrentAppScreen] = useState<AppScreen>("home");
  const [isOffline, setIsOffline] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Simulate offline detection
  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOffline(!navigator.onLine);
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    updateOnlineStatus();

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  // Check for existing authentication on app load
  useEffect(() => {
    const savedUser = localStorage.getItem("sehatNabhaUser");
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing saved user data:", error);
        localStorage.removeItem("sehatNabhaUser");
      }
    }
  }, []);

  // Dummy users for authentication
  const dummyUsers = [
    { email: "user@example.com", password: "password123", name: "ਰਾਜ ਸਿੰਘ", phone: "+91 98765 43210" },
    { email: "test@sehatnabha.com", password: "test123", name: "प्रिया शर्मा", phone: "+91 87654 32109" },
    { email: "demo@demo.com", password: "demo123", name: "Jasbir Kaur", phone: "+91 76543 21098" }
  ];

  const handleLogin = async (email: string, password: string) => {
    setAuthLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Accept any email/password combination for demo purposes
    // Use a generic user profile or create one from the email
    const userData = { 
      name: email.split('@')[0], // Use email prefix as name
      email: email, 
      phone: "+91 98765 43210" 
    };
    
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("sehatNabhaUser", JSON.stringify(userData));
    
    setAuthLoading(false);
  };

  const handleRegister = async (userData: { name: string; email: string; phone: string; password: string }) => {
    setAuthLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Accept any registration data for demo purposes
    const newUser = { name: userData.name, email: userData.email, phone: userData.phone };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem("sehatNabhaUser", JSON.stringify(newUser));
    
    setAuthLoading(false);
  };

  const handleGoogleLogin = async () => {
    setAuthLoading(true);
    
    // Simulate Google OAuth delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate successful Google login
    const googleUser = { name: "ਗੁਰਪ੍ਰੀਤ ਸਿੰਘ", email: "google.user@gmail.com", phone: "+91 99999 88888" };
    setUser(googleUser);
    setIsAuthenticated(true);
    localStorage.setItem("sehatNabhaUser", JSON.stringify(googleUser));
    
    setAuthLoading(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentAppScreen("home");
    setCurrentAuthScreen("welcome");
    localStorage.removeItem("sehatNabhaUser");
  };

  const renderAuthScreen = () => {
    switch (currentAuthScreen) {
      case "welcome":
        return (
          <WelcomeScreen
            onShowLogin={() => setCurrentAuthScreen("login")}
            onShowRegister={() => setCurrentAuthScreen("register")}
          />
        );
      case "login":
        return (
          <LoginScreen
            onBack={() => setCurrentAuthScreen("welcome")}
            onLogin={handleLogin}
            onGoogleLogin={handleGoogleLogin}
            onShowRegister={() => setCurrentAuthScreen("register")}
            isLoading={authLoading}
          />
        );
      case "register":
        return (
          <RegisterScreen
            onBack={() => setCurrentAuthScreen("welcome")}
            onRegister={handleRegister}
            onGoogleLogin={handleGoogleLogin}
            onShowLogin={() => setCurrentAuthScreen("login")}
            isLoading={authLoading}
          />
        );
      default:
        return (
          <WelcomeScreen
            onShowLogin={() => setCurrentAuthScreen("login")}
            onShowRegister={() => setCurrentAuthScreen("register")}
          />
        );
    }
  };

  const renderAppScreen = () => {
    switch (currentAppScreen) {
      case "home":
        return (
          <HomeScreen
            onNavigate={setCurrentAppScreen}
            isOffline={isOffline}
            user={user}
            onLogout={handleLogout}
          />
        );
      case "video":
        return (
          <VideoConsultation
            onNavigate={setCurrentAppScreen}
            isOffline={isOffline}
          />
        );
      case "records":
        return (
          <HealthRecords
            onNavigate={setCurrentAppScreen}
            isOffline={isOffline}
          />
        );
      case "medicine":
        return (
          <MedicineAvailability
            onNavigate={setCurrentAppScreen}
            isOffline={isOffline}
          />
        );
      case "symptoms":
        return (
          <SymptomChecker
            onNavigate={setCurrentAppScreen}
            isOffline={isOffline}
          />
        );
      default:
        return (
          <HomeScreen
            onNavigate={setCurrentAppScreen}
            isOffline={isOffline}
            user={user}
            onLogout={handleLogout}
          />
        );
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-md mx-auto min-h-screen bg-white shadow-xl relative">
          {isAuthenticated ? renderAppScreen() : renderAuthScreen()}
        </div>
      </div>
    </LanguageProvider>
  );
}