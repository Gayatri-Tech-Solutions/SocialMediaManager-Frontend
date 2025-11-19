"use client";

import { useState } from "react";
import {
  Twitter,
  Facebook,
  Camera,
  Link as LinkIcon,
  Link2Off,
  CheckCircle,
  XCircle,
  RefreshCw,
  MoreVertical,
  Settings,
  MessageCircle,
  Youtube,
  Linkedin,
  Globe
} from "lucide-react";

const ConnectedAccountsPage = () => {
  const [connectedAccounts, setConnectedAccounts] = useState([
    {
      id: 1,
      platform: "Twitter",
      icon: Twitter,
      username: "@username",
      connected: true,
      lastSync: "2 hours ago",
      posts: 247,
      color: "bg-blue-500",
      status: "active"
    },
    {
      id: 2,
      platform: "Facebook",
      icon: Facebook,
      username: "Page Name",
      connected: true,
      lastSync: "5 hours ago",
      posts: 189,
      color: "bg-blue-600",
      status: "active"
    },
    {
      id: 3,
      platform: "Instagram",
      icon: Camera,
      username: "@instagram_handle",
      connected: false,
      lastSync: "Never",
      posts: 0,
      color: "bg-pink-600",
      status: "disconnected"
    },
    {
      id: 4,
      platform: "LinkedIn",
      icon: Linkedin,
      username: "Not connected",
      connected: false,
      lastSync: "Never",
      posts: 0,
      color: "bg-blue-700",
      status: "disconnected"
    },
    {
      id: 5,
      platform: "YouTube",
      icon: Youtube,
      username: "Not connected",
      connected: false,
      lastSync: "Never",
      posts: 0,
      color: "bg-red-600",
      status: "disconnected"
    },
    {
      id: 6,
      platform: "TikTok",
      icon: MessageCircle,
      username: "Not connected",
      connected: false,
      lastSync: "Never",
      posts: 0,
      color: "bg-black",
      status: "disconnected"
    }
  ]);

  const handleConnect = (platformId) => {
    setConnectedAccounts(accounts =>
      accounts.map(account =>
        account.id === platformId
          ? {
              ...account,
              connected: true,
              username: `@${account.platform.toLowerCase()}_user`,
              lastSync: "Just now",
              status: "active"
            }
          : account
      )
    );
  };

  const handleDisconnect = (platformId) => {
    setConnectedAccounts(accounts =>
      accounts.map(account =>
        account.id === platformId
          ? {
              ...account,
              connected: false,
              username: "Not connected",
              lastSync: "Never",
              posts: 0,
              status: "disconnected"
            }
          : account
      )
    );
  };

  const handleRefresh = (platformId) => {
    setConnectedAccounts(accounts =>
      accounts.map(account =>
        account.id === platformId
          ? { ...account, lastSync: "Just now" }
          : account
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Connected Accounts</h1>
          <p className="text-gray-400 mt-2">
            Manage your social media platform connections
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Connected</span>
            </div>
            <div className="flex items-center gap-1 ml-4">
              <XCircle className="w-4 h-4 text-red-500" />
              <span>Disconnected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Platforms</p>
              <p className="text-2xl font-bold mt-1">{connectedAccounts.length}</p>
            </div>
            <Globe className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Connected</p>
              <p className="text-2xl font-bold mt-1">
                {connectedAccounts.filter(acc => acc.connected).length}
              </p>
            </div>
            <LinkIcon className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Posts</p>
              <p className="text-2xl font-bold mt-1">
                {connectedAccounts.reduce((sum, acc) => sum + acc.posts, 0)}
              </p>
            </div>
            <MessageCircle className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Sync Status</p>
              <p className="text-lg font-bold mt-1 text-green-500">All Good</p>
            </div>
            <RefreshCw className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Platform Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connectedAccounts.map((account) => (
          <div
            key={account.id}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-yellow-600 transition-all duration-300"
          >
            {/* Platform Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg ${account.color}`}>
                  <account.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{account.platform}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {account.connected ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm ${
                      account.connected ? "text-green-500" : "text-red-500"
                    }`}>
                      {account.connected ? "Connected" : "Not Connected"}
                    </span>
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-700 rounded-lg transition">
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Account Info */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Username:</span>
                <span className="font-medium">{account.username}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Last Sync:</span>
                <span className="font-medium">{account.lastSync}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Posts:</span>
                <span className="font-medium">{account.posts}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {account.connected ? (
                <>
                  <button
                    onClick={() => handleRefresh(account.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                  </button>
                  <button
                    onClick={() => handleDisconnect(account.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
                  >
                    <Link2Off className="w-4 h-4" />
                    Disconnect
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleConnect(account.id)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-yellow-600 text-black font-semibold rounded-lg hover:bg-yellow-500 transition"
                >
                  <LinkIcon className="w-4 h-4" />
                  Connect {account.platform}
                </button>
              )}
            </div>

            {/* Additional Options for Connected Accounts */}
            {account.connected && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <button className="w-full flex items-center justify-center gap-2 py-2 text-sm text-gray-400 hover:text-white transition">
                  <Settings className="w-4 h-4" />
                  Manage Settings
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Connection Status Summary */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold mb-4">Connection Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3 text-green-500">Active Connections</h4>
            <div className="space-y-2">
              {connectedAccounts
                .filter(acc => acc.connected)
                .map(account => (
                  <div key={account.id} className="flex items-center gap-3 p-2 bg-gray-700 rounded-lg">
                    <account.icon className="w-5 h-5" />
                    <span className="font-medium">{account.platform}</span>
                    <div className="ml-auto flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-400">Connected</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-red-500">Available Platforms</h4>
            <div className="space-y-2">
              {connectedAccounts
                .filter(acc => !acc.connected)
                .map(account => (
                  <div key={account.id} className="flex items-center gap-3 p-2 bg-gray-700 rounded-lg">
                    <account.icon className="w-5 h-5" />
                    <span className="font-medium">{account.platform}</span>
                    <div className="ml-auto flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-400">Not Connected</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-gray-800 rounded-xl p-6 border border-yellow-600/30">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-yellow-600 rounded-lg">
            <Settings className="w-6 h-6 text-black" />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Need Help Connecting?</h3>
            <p className="text-gray-400 mb-4">
              If you're having trouble connecting any of your social media accounts, 
              make sure you have the necessary permissions and your accounts are in good standing.
            </p>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-yellow-600 text-black font-semibold rounded-lg hover:bg-yellow-500 transition">
                View Documentation
              </button>
              <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-yellow-600 hover:text-yellow-600 transition">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectedAccountsPage;