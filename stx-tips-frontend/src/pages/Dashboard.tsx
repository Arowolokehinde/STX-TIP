import
  {
    Wallet,
    TrendingUp,

    Award,
    ArrowUpCircle,
    ArrowDownCircle,
    Clock
  } from 'lucide-react';
import
  {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import
  {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
  } from 'recharts';
import QuickSend from '@/components/TippingSection/QuickSend';

export const Dashboard = () =>
{
 

  // Sample data - would be replaced with real blockchain data
  const stats = [
    {
      title: 'Total Balance',
      value: '1,234 STX',
      change: '+12.3%',
      icon: <Wallet className="h-6 w-6 text-violet-600" />
    },
    {
      title: 'Tips Sent',
      value: '456 STX',
      change: '+8.2%',
      icon: <ArrowUpCircle className="h-6 w-6 text-green-600" />
    },
    {
      title: 'Tips Received',
      value: '789 STX',
      change: '+15.7%',
      icon: <ArrowDownCircle className="h-6 w-6 text-blue-600" />
    },
    {
      title: 'Reward Points',
      value: '1,250',
      change: '+25.3%',
      icon: <Award className="h-6 w-6 text-yellow-600" />
    }
  ];

  const recentTips = [
    {
      id: 1,
      type: 'sent',
      address: '0x1234...5678',
      amount: '50 STX',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'received',
      address: '0x8765...4321',
      amount: '25 STX',
      timestamp: '5 hours ago'
    }
  ];

  const chartData = [
    { name: 'Mon', sent: 20, received: 15 },
    { name: 'Tue', sent: 35, received: 25 },
    { name: 'Wed', sent: 25, received: 30 },
    { name: 'Thu', sent: 45, received: 20 },
    { name: 'Fri', sent: 30, received: 40 },
    { name: 'Sat', sent: 55, received: 35 },
    { name: 'Sun', sent: 40, received: 45 }
  ];

 

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              {stat.icon}
              <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                {stat.change}
              </span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-sm text-gray-600">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Tip Activity</CardTitle>
            <CardDescription>Your sending and receiving patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="sent"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="received"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTips.map((tip) => (
                <div
                  key={tip.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {tip.type === 'sent' ? (
                      <ArrowUpCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <ArrowDownCircle className="h-5 w-5 text-blue-600" />
                    )}
                    <div>
                      <p className="text-sm font-medium">
                        {tip.type === 'sent' ? 'Sent to' : 'Received from'} {tip.address}
                      </p>
                      <p className="text-xs text-gray-500">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {tip.timestamp}
                      </p>
                    </div>
                  </div>
                  <span className="font-medium">{tip.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <QuickSend />

        <Card>
          <CardHeader>
            <CardTitle>Rewards & Achievements</CardTitle>
            <CardDescription>Your tipping milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium">Top Tipper Badge</p>
                    <p className="text-xs text-gray-500">Sent over 1000 STX in tips</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-violet-600">Level 3</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Consistent Tipper</p>
                    <p className="text-xs text-gray-500">Tipped for 5 consecutive weeks</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-violet-600">Achieved</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;