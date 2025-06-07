import React from 'react';
import Navbar1 from '../components/Navbar1';
import Footer from '../components/Footer';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqs = [
    {
      question: "What is AllVaxConnect?",
      answer: "AllVaxConnect is a comprehensive vaccination management platform that helps individuals and families track, schedule, and manage their vaccinations. It provides a centralized system for maintaining vaccination records, scheduling appointments, and receiving reminders for upcoming vaccinations."
    },
    {
      question: "How do I schedule a vaccination appointment?",
      answer: "To schedule a vaccination appointment, first log in to your account. Navigate to the Schedule page, select your preferred healthcare center, choose the vaccine type, select the family member, and pick your preferred date and time. The system will confirm your appointment and send you a confirmation email."
    },
    {
      question: "Can I manage vaccination records for my entire family?",
      answer: "Yes! AllVaxConnect allows you to add and manage multiple family members under a single account. You can track vaccination histories, schedule appointments, and receive reminders for everyone in your family through our Family List feature."
    },
    {
      question: "What documents do I need to register?",
      answer: "To register, you'll need your Aadhar number, a valid email address, and contact information. For adding family members, you'll need their Aadhar numbers and basic information like name and date of birth."
    },
    {
      question: "How do I add vaccination records?",
      answer: "After logging in, go to the Dashboard and use the 'Add Past Vaccination' form. You'll need to provide the vaccine name, date administered, family member who received it, and upload proof of vaccination (like a certificate or medical record)."
    },
    {
      question: "Are my records secure?",
      answer: "Yes, we take data security very seriously. All personal and medical information is encrypted and stored securely. We comply with healthcare data protection regulations and industry best practices for data security."
    },
    {
      question: "What if I need to cancel or reschedule an appointment?",
      answer: "You can manage your appointments through the Schedule page. Select the appointment you wish to modify and choose to either cancel or reschedule. Please note that some centers may have specific cancellation policies."
    },
    {
      question: "How do I get vaccination certificates?",
      answer: "After receiving a vaccination, the healthcare provider will update your record and issue a digital certificate. You can access and download your certificates from the Dashboard under the 'Vaccination Records' section."
    }
  ];

  return (
    <div>
      <Navbar1 />
      
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-[#495057] mb-12">Frequently Asked Questions</h1>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-[#495057]">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-[#0077B6]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#0077B6]" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 py-4 bg-[#F5F5F5]">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FAQ;