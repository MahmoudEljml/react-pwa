import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [isPWA, setIsPWA] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    // Check if running as installed PWA
    const checkPWA = () => {
      const displayMode = window.matchMedia('(display-mode: standalone)').matches;
      const iOSStandalone = window.navigator.standalone;
      setIsPWA(displayMode || iOSStandalone);
    };

    checkPWA();
    
    // Handle install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    });

    // Listen for changes in display mode
    const displayModeQuery = window.matchMedia('(display-mode: standalone)');
    const handleDisplayModeChange = (e) => {
      setIsPWA(e.matches);
    };
    
    displayModeQuery.addListener(handleDisplayModeChange);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowInstallButton(false);
    }
    setDeferredPrompt(null);
  };

  return (
    <div className="App">
      <h1>
        {isPWA ? 'Welcome to mobile app' : 'Welcome to web app'}
      </h1>
      {showInstallButton && (
        <button 
          onClick={handleInstallClick}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            margin: '20px'
          }}
        >
          Install App To Home Screen asd
        </button>
      )}
    </div>
  );
}

export default App;
