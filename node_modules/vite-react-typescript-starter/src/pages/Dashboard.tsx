import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, Mic, FileDown, Globe, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const DashboardCard = ({ icon: Icon, title, description, to, delay = 0 }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay }}
    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
  >
    <Link to={to} className="flex flex-col items-center text-center">
      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-indigo-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </Link>
  </motion.div>
);

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Implement actual logout logic
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const features = [
    {
      icon: Users,
      title: 'Patient Records',
      description: 'Manage and view patient electronic health records',
      to: '/patients',
      delay: 0.1
    },
    {
      icon: Mic,
      title: 'Audio Management',
      description: 'Record and transcribe patient consultations',
      to: '/audio',
      delay: 0.2
    },
    {
      icon: FileText,
      title: 'EHR Generation',
      description: 'Generate structured health records from transcriptions',
      to: '/generate',
      delay: 0.3
    },
    {
      icon: Globe,
      title: 'Translation',
      description: 'Translate health records to multiple languages',
      to: '/translate',
      delay: 0.4
    },
    {
      icon: FileDown,
      title: 'PDF Export',
      description: 'Export and download patient records as PDF',
      to: '/export',
      delay: 0.5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">MediRecord EHR</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </motion.button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Welcome, Dr. Smith</h1>
          <p className="text-gray-600 mt-2">Access and manage your patient records</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <DashboardCard key={index} {...feature} />
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="flex items-center p-4 bg-gray-50 rounded-lg"
              >
                <div className="w-2 h-2 bg-indigo-600 rounded-full mr-4" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Patient record updated
                  </p>
                  <p className="text-xs text-gray-600">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;