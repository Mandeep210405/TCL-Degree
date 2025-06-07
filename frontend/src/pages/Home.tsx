import React from 'react';
import Navbar1 from '../components/Navbar1';
import Footer from '../components/Footer';
import { Shield, Clock, Users, Heart, Headset as HeadsetMic, MapPin, Calendar, CheckCircle, Award, Syringe, BarChart as ChartBar } from 'lucide-react';

const Home = () => {
  const features = [
    { icon: <Shield className="w-12 h-12 text-[#1976D2]" />, title: 'Safety and Reliable', description: 'Trusted vaccination management with verified healthcare providers' },
    { icon: <Clock className="w-12 h-12 text-[#1976D2]" />, title: 'Quick Services', description: 'Efficient scheduling and minimal waiting times' },
    { icon: <Users className="w-12 h-12 text-[#1976D2]" />, title: 'Family Care', description: 'Manage vaccinations for your entire family in one place' },
    { icon: <Heart className="w-12 h-12 text-[#1976D2]" />, title: 'Patient First Approach', description: 'Personalized care and attention to individual needs' },
    { icon: <HeadsetMic className="w-12 h-12 text-[#1976D2]" />, title: '24/7 Support', description: 'Round-the-clock assistance for your healthcare needs' },
    { icon: <MapPin className="w-12 h-12 text-[#1976D2]" />, title: 'Multiple Locations', description: 'Convenient access to vaccination centers near you' },
    { icon: <Calendar className="w-12 h-12 text-[#1976D2]" />, title: 'Flexible Scheduling', description: 'Book appointments that fit your schedule' },
    { icon: <CheckCircle className="w-12 h-12 text-[#1976D2]" />, title: 'Complete Records', description: 'Digital tracking of all your vaccination history' }
  ];

  const impactStats = [
    { number: '98%', label: 'Disease Prevention Rate' },
    { number: '1M+', label: 'Vaccinations Managed' },
    { number: '50K+', label: 'Families Protected' },
    { number: '99%', label: 'User Satisfaction' }
  ];

  const testimonials = [
    {
      quote: "AllVaxConnect has made managing my family's vaccinations so much easier. The reminders are a lifesaver!",
      author: "Sarah Johnson",
      role: "Mother of three",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=200&q=80"
    },
    {
      quote: "As a healthcare provider, this platform has streamlined our vaccination process significantly.",
      author: "Dr. Michael Chen",
      role: "Healthcare Professional",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&q=80"
    },
    {
      quote: "The travel vaccination feature helped me prepare perfectly for my international trip.",
      author: "James Wilson",
      role: "Frequent Traveler",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=200&q=80"
    }
  ];

  return (
    <div>
      <Navbar1 />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#1976D2] to-[#2196F3] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=1920&q=80')] opacity-40 bg-cover bg-center" />
        <div className="relative container mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Your Family's Health, Our Priority</h1>
              <p className="text-lg md:text-xl mb-8 text-white/90">
                Manage your family's vaccinations with ease. Stay protected, stay healthy with AllVaxConnect's comprehensive vaccination management system.
              </p>
              <button className="bg-white text-[#1976D2] px-8 py-3 rounded-lg font-semibold hover:bg-[#E3F2FD] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Get Started Today
              </button>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=800&q=80"
                alt="Vaccination"
                className="rounded-lg shadow-2xl transform -rotate-0 hover:rotate-0 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1976D2] mb-12">Making a Difference</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center p-8 bg-[#E3F2FD] rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-4xl font-bold text-[#1976D2] mb-2">{stat.number}</div>
                <p className="text-gray-700">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-[#F5F5F5]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1976D2] mb-12">Why Choose AllVaxConnect?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-white rounded-lg text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-[#1976D2]">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1976D2] mb-12">How AllVaxConnect Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-[#E3F2FD] rounded-lg hover:shadow-lg transition-all duration-300">
              <div className="w-20 h-20 mx-auto bg-[#1976D2] rounded-full flex items-center justify-center mb-4">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1976D2]">Create Family Profile</h3>
              <p className="text-gray-700">Add family members and their vaccination history to your account</p>
            </div>
            <div className="text-center p-8 bg-[#E3F2FD] rounded-lg hover:shadow-lg transition-all duration-300">
              <div className="w-20 h-20 mx-auto bg-[#1976D2] rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1976D2]">Schedule Vaccinations</h3>
              <p className="text-gray-700">Book appointments at your preferred healthcare center</p>
            </div>
            <div className="text-center p-8 bg-[#E3F2FD] rounded-lg hover:shadow-lg transition-all duration-300">
              <div className="w-20 h-20 mx-auto bg-[#1976D2] rounded-full flex items-center justify-center mb-4">
                <ChartBar className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1976D2]">Track Progress</h3>
              <p className="text-gray-700">Monitor vaccination status and receive timely reminders</p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Stories Section */}
      <div className="py-20 bg-[#E3F2FD]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1976D2] mb-12">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
  {
    title: "Protecting Communities",
    description: "Learn how AllVaxConnect helped vaccinate over 10,000 people in rural areas",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "School Vaccination Drive",
    description: "Successfully managed vaccination programs for 50+ schools",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Corporate Wellness",
    description: "Streamlined vaccination process for large corporations",
    image: "https://images.unsplash.com/photo-1584516150909-c43483ee7932?auto=format&fit=crop&w=800&q=80"
  }
].map((story, index) => (
  <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
    <img 
      src={story.image} 
      alt={story.title}
      className="w-full h-48 object-cover"
    />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2 text-[#1976D2]">{story.title}</h3>
      <p className="text-gray-600">{story.description}</p>
      <button className="mt-4 text-[#1976D2] font-medium hover:text-[#1565C0] transition-colors">
        Read More →
      </button>
    </div>
  </div>
))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1976D2] mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-[#E3F2FD] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white"
                  />
                  <div>
                    <p className="font-semibold text-[#1976D2]">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-20 bg-gradient-to-r from-[#1976D2] to-[#2196F3] text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Protect Your Family?</h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of families who trust AllVaxConnect for their vaccination management needs.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
              <button className="bg-white text-[#1976D2] px-8 py-3 rounded-lg font-semibold hover:bg-[#E3F2FD] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Sign Up Now
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;