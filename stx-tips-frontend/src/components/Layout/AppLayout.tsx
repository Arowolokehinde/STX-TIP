import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Sidebar } from '../Navigation/Sidebar';
import { Header } from '../Navigation/Header';
import { Dashboard } from '@/pages/Dashboard';
import { History } from '@/pages/History';
import { Rewards } from '@/pages/Rewards';
import { Settings } from '@/pages/Settings';
import { HomePage } from '@/pages/HomePage';

export const AppLayout: React.FC = () =>
{
    const { currentPage } = useAppContext();

    if (currentPage === 'home') {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <main className="pt-16">
                    <HomePage />
                </main>
            </div>
        );
    }

    const renderPage = () =>
    {
        switch (currentPage)
        {
            // case 'home':
            //     return <HomePage />;
            case 'dashboard':
                return <Dashboard />;
            case 'history':
                return <History />;
            case 'rewards':
                return <Rewards />;
            case 'settings':
                return <Settings />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <Header />
            <main className="pt-16 lg:pl-64">
                <div className="p-6">
                    {renderPage()}
                </div>
            </main>
        </div>
    );
};