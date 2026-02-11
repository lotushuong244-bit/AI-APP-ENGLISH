import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { UnitList } from './components/UnitList';
import { UnitDetail } from './components/UnitDetail';
import { Login } from './components/Login';
import { Leaderboard } from './components/Leaderboard';
import { UNITS, INITIAL_USER } from './constants';
import { Unit, StudentProfile, UserProgress } from './types';
import { HashRouter } from 'react-router-dom';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProgress>(INITIAL_USER);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  // Load user from local storage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('englishMasterUser');
    if (savedUser) {
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
    }
  }, []);

  // Save user to local storage whenever it changes
  useEffect(() => {
    if (isAuthenticated) {
        localStorage.setItem('englishMasterUser', JSON.stringify(user));
    }
  }, [user, isAuthenticated]);

  const handleLogin = (profile: StudentProfile) => {
    // Merge new profile with initial state, preserving only if needed, 
    // but here we just reset for the new user unless we had complex logic
    setUser({
        ...INITIAL_USER,
        profile: profile
    });
    setIsAuthenticated(true);
  };

  const handleScoreUpdate = (points: number) => {
    setUser(prev => ({
        ...prev,
        xp: prev.xp + points,
        // Simple level logic: Level up every 500 XP
        level: Math.floor((prev.xp + points) / 500) + 1
    }));
  };

  const handleUnitSelect = (unit: Unit) => {
    setSelectedUnit(unit);
  };

  const handleBackToUnits = () => {
    setSelectedUnit(null);
  };

  if (!isAuthenticated) {
      return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    if (selectedUnit) {
        return <UnitDetail unit={selectedUnit} onBack={handleBackToUnits} onScoreUpdate={handleScoreUpdate} />;
    }

    switch (currentView) {
        case 'dashboard':
            return <Dashboard user={user} />;
        case 'units':
            return <UnitList units={UNITS} userProgress={user} onSelectUnit={handleUnitSelect} />;
        case 'leaderboard':
            return <Leaderboard currentUser={user} />;
        case 'stats': 
            // Reuse dashboard for simple stats view in MVP
            return <Dashboard user={user} />;
        default:
            return <Dashboard user={user} />;
    }
  };

  return (
    <HashRouter>
        <div className="min-h-screen bg-gray-50 md:flex font-sans text-gray-900">
        
        {/* Navigation Sidebar/Bottom Bar */}
        {!selectedUnit && <Navigation currentView={currentView} setView={setCurrentView} />}

        {/* Main Content Area */}
        <main className="flex-1 max-w-lg mx-auto md:max-w-4xl w-full bg-white md:min-h-screen md:shadow-xl md:border-x md:border-gray-100">
            {renderContent()}
        </main>
        </div>
    </HashRouter>
  );
};

export default App;