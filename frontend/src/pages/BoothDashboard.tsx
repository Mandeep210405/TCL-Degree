import React, { useState, useEffect } from 'react';
import api from '../utils/axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Navbar3 from '../components/Navbar3';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface VaccinationData {
  labels: string[];
  counts: number[];
}

const BoothDashboard = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [vaccinationData, setVaccinationData] = useState<VaccinationData>({
    labels: [],
    counts: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/booth/statistics/${timeRange}`);
        
        setVaccinationData(response.data);
        console.log(vaccinationData);
      } catch (error) {
        console.error('Failed to fetch vaccination data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  const chartData = {
    labels: vaccinationData.labels,
    datasets: [
      {
        label: 'Vaccinations Administered',
        data: vaccinationData.counts,
        backgroundColor: '#0077B6',
        borderColor: '#005f92',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Vaccination Statistics',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar3 />
      
      <div className="flex-grow container mx-auto px-4 md:px-6 py-8">
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-[#495057] mb-4 md:mb-0">Booth Dashboard</h1>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setTimeRange('week')}
                className={`px-4 py-2 rounded-lg ${
                  timeRange === 'week'
                    ? 'bg-[#0077B6] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Last Week
              </button>
              <button
                onClick={() => setTimeRange('month')}
                className={`px-4 py-2 rounded-lg ${
                  timeRange === 'month'
                    ? 'bg-[#0077B6] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Last Month
              </button>
              <button
                onClick={() => setTimeRange('year')}
                className={`px-4 py-2 rounded-lg ${
                  timeRange === 'year'
                    ? 'bg-[#0077B6] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Last Year
              </button>
            </div>
          </div>
          
          <div className="h-[400px] md:h-[500px]">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-[#495057] mb-2">Today's Appointments</h3>
            <p className="text-3xl font-bold text-[#0077B6]">12</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-[#495057] mb-2">Pending Approvals</h3>
            <p className="text-3xl font-bold text-[#FFB703]">5</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-[#495057] mb-2">Completed Today</h3>
            <p className="text-3xl font-bold text-[#00A86B]">8</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BoothDashboard;