import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';

interface OfflineIndicatorProps {
  isOffline: boolean;
}

export function OfflineIndicator({ isOffline }: OfflineIndicatorProps) {
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm ${
      isOffline 
        ? 'bg-red-100 text-red-700 border border-red-200' 
        : 'bg-green-100 text-green-700 border border-green-200'
    }`}>
      {isOffline ? (
        <>
          <WifiOff className="w-4 h-4" />
          <span>ਆਫਲਾਈਨ | Offline</span>
        </>
      ) : (
        <>
          <Wifi className="w-4 h-4" />
          <span>ਔਨਲਾਈਨ | Online</span>
        </>
      )}
    </div>
  );
}