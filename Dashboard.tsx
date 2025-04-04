
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold flex items-center space-x-2">
            <span className="text-blue-600">GuardShift</span>
            <span className="font-light">Master</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                <span>John Doe</span>
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12 animate-fade-up">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Dashboard</h1>
          <p className="text-gray-600">Manage your security operations from one central place.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Quick Stats Cards */}
          <Card className="animate-fade-up glass-card" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Active Guards</CardTitle>
              <CardDescription>Currently on duty</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">24</div>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span>+2 from yesterday</span>
              </p>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-up glass-card" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Incidents Today</CardTitle>
              <CardDescription>Reported in last 24h</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-500">3</div>
              <p className="text-sm text-red-600 flex items-center mt-1">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <span>+1 from yesterday</span>
              </p>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-up glass-card" style={{ animationDelay: '0.3s' }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Active Sites</CardTitle>
              <CardDescription>Locations with coverage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">12</div>
              <p className="text-sm text-gray-600 flex items-center mt-1">
                <span>No change</span>
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Upcoming Shifts</CardTitle>
                <CardDescription>Next 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 text-blue-800 p-2 rounded-full">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Downtown Office Building</p>
                          <p className="text-sm text-gray-600">Starting in {item * 2} hours</p>
                        </div>
                      </div>
                      <div className="text-gray-600 text-sm">
                        {item % 2 === 0 ? '3 guards assigned' : '2 guards assigned'}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost">View All Shifts</Button>
                <Button>Schedule New Shift</Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Recent Incidents</CardTitle>
                <CardDescription>Last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">
                          {item === 1 ? 'Unauthorized Access' : item === 2 ? 'Fire Alarm' : 'Suspicious Activity'}
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          item === 1 ? 'bg-orange-100 text-orange-800' : 
                          item === 2 ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item === 1 ? 'Medium' : item === 2 ? 'High' : 'Low'}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {item === 1 ? 'West Wing Entrance' : item === 2 ? 'Server Room' : 'Parking Garage'}
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{item === 1 ? 'Today, 2:30 PM' : item === 2 ? 'Yesterday, 11:15 AM' : '3 days ago'}</span>
                        <span>Report #{1000 + item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">View All Incidents</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
