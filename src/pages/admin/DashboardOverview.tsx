import { useEffect, useState } from 'react';
import { 
  MessageSquare, Briefcase, FileText, HelpCircle, Users, Eye,
  TrendingUp, ArrowUpRight, ArrowDownRight, Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Stats Card Component
function StatCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon,
  linkTo
}: { 
  title: string; 
  value: string | number; 
  change: string; 
  changeType: 'up' | 'down' | 'neutral';
  icon: React.ElementType;
  linkTo: string;
}) {
  return (
    <Link 
      to={linkTo}
      className="group block bg-dark-card border border-dark-border rounded-xl p-4 sm:p-5 hover:border-gold/30 transition-all duration-300 hover:-translate-y-1 h-full"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-white/50 text-xs sm:text-sm mb-1 truncate">{title}</p>
          <p className="text-2xl sm:text-3xl font-display text-white">{value}</p>
          <div className="flex items-center mt-1.5">
            {changeType === 'up' ? (
              <ArrowUpRight className="w-3.5 h-3.5 text-green-500 mr-1 flex-shrink-0" />
            ) : changeType === 'down' ? (
              <ArrowDownRight className="w-3.5 h-3.5 text-red-500 mr-1 flex-shrink-0" />
            ) : null}
            <span className={`text-xs sm:text-sm truncate ${
              changeType === 'up' ? 'text-green-500' : 
              changeType === 'down' ? 'text-red-500' : 'text-white/50'
            }`}>
              {change}
            </span>
          </div>
        </div>
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold/10 rounded-xl flex items-center justify-center group-hover:bg-gold/20 transition-colors flex-shrink-0">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
        </div>
      </div>
    </Link>
  );
}

// Quick Action Card
function QuickActionCard({ 
  title, 
  description, 
  icon: Icon, 
  linkTo,
  color = 'gold'
}: { 
  title: string; 
  description: string; 
  icon: React.ElementType; 
  linkTo: string;
  color?: 'gold' | 'blue' | 'green' | 'purple';
}) {
  const colorClasses = {
    gold: 'bg-gold/10 text-gold group-hover:bg-gold/20',
    blue: 'bg-blue-500/10 text-blue-500 group-hover:bg-blue-500/20',
    green: 'bg-green-500/10 text-green-500 group-hover:bg-green-500/20',
    purple: 'bg-purple-500/10 text-purple-500 group-hover:bg-purple-500/20',
  };

  return (
    <Link 
      to={linkTo}
      className="group flex items-center gap-3 sm:gap-4 bg-dark-card border border-dark-border rounded-xl p-4 sm:p-5 hover:border-gold/30 transition-all duration-300 h-full"
    >
      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 ${colorClasses[color]}`}>
        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-medium text-sm sm:text-base mb-0.5 group-hover:text-gold transition-colors truncate">{title}</h3>
        <p className="text-white/50 text-xs sm:text-sm truncate">{description}</p>
      </div>
      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/30 group-hover:text-gold transition-colors flex-shrink-0" />
    </Link>
  );
}

// Recent Activity Item
function ActivityItem({ 
  action, 
  item, 
  time, 
  type 
}: { 
  action: string; 
  item: string; 
  time: string; 
  type: 'create' | 'update' | 'delete';
}) {
  const typeIcons = {
    create: <TrendingUp className="w-4 h-4 text-green-500" />,
    update: <Activity className="w-4 h-4 text-blue-500" />,
    delete: <ArrowDownRight className="w-4 h-4 text-red-500" />,
  };

  return (
    <div className="flex items-center space-x-4 py-3 border-b border-dark-border last:border-0">
      <div className="w-8 h-8 bg-dark-border rounded-lg flex items-center justify-center">
        {typeIcons[type]}
      </div>
      <div className="flex-1">
        <p className="text-white text-sm">
          <span className="text-gold">{action}</span> {item}
        </p>
        <p className="text-white/40 text-xs">{time}</p>
      </div>
    </div>
  );
}

// Main Dashboard Overview Component
export function DashboardOverview() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { title: 'Total Testimonials', value: 12, change: '+3 this month', changeType: 'up' as const, icon: MessageSquare, linkTo: '/admin/testimonials' },
    { title: 'Active Services', value: 7, change: 'All active', changeType: 'neutral' as const, icon: Briefcase, linkTo: '/admin/services' },
    { title: 'Case Studies', value: 4, change: '+1 this month', changeType: 'up' as const, icon: FileText, linkTo: '/admin/case-studies' },
    { title: 'FAQ Items', value: 16, change: '+2 this week', changeType: 'up' as const, icon: HelpCircle, linkTo: '/admin/faq' },
  ];

  const quickActions = [
    { title: 'Add Testimonial', description: 'Add a new client testimonial', icon: MessageSquare, linkTo: '/admin/testimonials', color: 'gold' as const },
    { title: 'Update Services', description: 'Edit service offerings', icon: Briefcase, linkTo: '/admin/services', color: 'blue' as const },
    { title: 'New Case Study', description: 'Add a success story', icon: FileText, linkTo: '/admin/case-studies', color: 'green' as const },
    { title: 'Manage Team', description: 'Update team members', icon: Users, linkTo: '/admin/team', color: 'purple' as const },
  ];

  const recentActivity = [
    { action: 'Added', item: 'new testimonial from John Doe', time: '2 hours ago', type: 'create' as const },
    { action: 'Updated', item: 'Modern Websites service details', time: '5 hours ago', type: 'update' as const },
    { action: 'Added', item: 'new case study: Sarah Mitchell', time: '1 day ago', type: 'create' as const },
    { action: 'Updated', item: 'contact information', time: '2 days ago', type: 'update' as const },
    { action: 'Added', item: 'new FAQ item about pricing', time: '3 days ago', type: 'create' as const },
  ];

  return (
    <div 
      className="max-w-7xl mx-auto space-y-6"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.5s ease-out',
      }}
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display text-white">Dashboard</h1>
          <p className="text-white/50 mt-1">Welcome back! Here's what's happening with your website.</p>
        </div>
        <Link 
          to="/"
          className="inline-flex items-center px-4 py-2 bg-gold text-black font-medium rounded-full hover:bg-gold-light transition-all duration-300 text-sm"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Website
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => (
          <div 
            key={stat.title}
            className="min-w-0"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.5s ease-out ${index * 0.1}s`,
            }}
          >
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-medium text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {quickActions.map((action, index) => (
            <div 
              key={action.title}
              className="min-w-0"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ease-out ${0.3 + index * 0.1}s`,
              }}
            >
              <QuickActionCard {...action} />
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div 
          className="lg:col-span-2 bg-dark-card border border-dark-border rounded-xl p-5 sm:p-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease-out 0.5s',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-white">Recent Activity</h2>
            <button className="text-gold text-sm hover:underline">View All</button>
          </div>
          <div className="space-y-1">
            {recentActivity.map((activity, index) => (
              <ActivityItem key={index} {...activity} />
            ))}
          </div>
        </div>

        {/* Website Health */}
        <div 
          className="bg-dark-card border border-dark-border rounded-xl p-5 sm:p-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease-out 0.6s',
          }}
        >
          <h2 className="text-lg font-medium text-white mb-4">Website Health</h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/70 text-sm">Content Complete</span>
                <span className="text-gold text-sm">92%</span>
              </div>
              <div className="h-2 bg-dark-border rounded-full overflow-hidden">
                <div className="h-full w-[92%] bg-gold rounded-full" />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/70 text-sm">SEO Score</span>
                <span className="text-green-500 text-sm">88%</span>
              </div>
              <div className="h-2 bg-dark-border rounded-full overflow-hidden">
                <div className="h-full w-[88%] bg-green-500 rounded-full" />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/70 text-sm">Performance</span>
                <span className="text-blue-500 text-sm">95%</span>
              </div>
              <div className="h-2 bg-dark-border rounded-full overflow-hidden">
                <div className="h-full w-[95%] bg-blue-500 rounded-full" />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-dark-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-white/70 text-sm">Website Status</span>
              </div>
              <span className="text-green-500 text-sm font-medium">Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Summary */}
      <div 
        className="bg-dark-card border border-dark-border rounded-xl p-5 sm:p-6"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s ease-out 0.7s',
        }}
      >
        <h2 className="text-lg font-medium text-white mb-4">Content Summary</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="text-center p-3 sm:p-4 bg-black rounded-xl">
            <p className="text-2xl sm:text-3xl font-display text-gold mb-1">4</p>
            <p className="text-white/50 text-xs sm:text-sm">Team Members</p>
          </div>
          <div className="text-center p-3 sm:p-4 bg-black rounded-xl">
            <p className="text-2xl sm:text-3xl font-display text-gold mb-1">8</p>
            <p className="text-white/50 text-xs sm:text-sm">Home FAQs</p>
          </div>
          <div className="text-center p-3 sm:p-4 bg-black rounded-xl">
            <p className="text-2xl sm:text-3xl font-display text-gold mb-1">3</p>
            <p className="text-white/50 text-xs sm:text-sm">Pricing Plans</p>
          </div>
          <div className="text-center p-3 sm:p-4 bg-black rounded-xl">
            <p className="text-2xl sm:text-3xl font-display text-gold mb-1">6</p>
            <p className="text-white/50 text-xs sm:text-sm">Resource Pages</p>
          </div>
        </div>
      </div>
    </div>
  );
}
