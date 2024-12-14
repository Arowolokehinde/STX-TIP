import React, { useState } from 'react';
import { Bell, Shield, Wallet, Globe } from 'lucide-react';

export const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState({
    tips: true,
    milestones: true,
    news: false
  });

  const [privacy, setPrivacy] = useState({
    public: true,
    showAmount: true
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="h-5 w-5 text-violet-600" />
            <h2 className="text-lg font-bold">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Tip Notifications</p>
                <p className="text-sm text-gray-500">Get notified when you receive tips</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.tips}
                  onChange={(e) => setNotifications({ ...notifications, tips: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Milestone Alerts</p>
                <p className="text-sm text-gray-500">Get notified when you reach milestones</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.milestones}
                  onChange={(e) => setNotifications({ ...notifications, milestones: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Platform Updates</p>
                <p className="text-sm text-gray-500">Get notified about new features</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.news}
                  onChange={(e) => setNotifications({ ...notifications, news: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-5 w-5 text-violet-600" />
            <h2 className="text-lg font-bold">Privacy</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Public Profile</p>
                <p className="text-sm text-gray-500">Allow others to view your tipping history</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacy.public}
                  onChange={(e) => setPrivacy({ ...privacy, public: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Show Tip Amounts</p>
                <p className="text-sm text-gray-500">Display tip amounts on your public profile</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacy.showAmount}
                  onChange={(e) => setPrivacy({ ...privacy, showAmount: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Wallet className="h-5 w-5 text-violet-600" />
            <h2 className="text-lg font-bold">Wallet Settings</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Default Tip Amount</label>
              <div className="relative">
                <input 
                  type="number" 
                  className="block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
                  placeholder="Enter amount in STX"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">STX</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="h-5 w-5 text-violet-600" />
            <h2 className="text-lg font-bold">Preferences</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <select className="block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
              <select className="block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600">
                <option value="utc">UTC</option>
                <option value="est">Eastern Time</option>
                <option value="pst">Pacific Time</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};