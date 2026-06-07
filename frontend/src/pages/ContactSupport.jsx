import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Contact = () => {
  const { backendURL } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderId: '',
    subject: '',
    message: '',
    priority: 'normal',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Replace with your actual API endpoint
      // const response = await axios.post(`${backendURL}/api/contact/support`, formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success(
        'Message sent successfully! Our team will respond within 24 hours.'
      );
      setFormData({
        name: '',
        email: '',
        orderId: '',
        subject: '',
        message: '',
        priority: 'normal',
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      question: 'How long does shipping take?',
      answer:
        'Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days.',
      category: 'shipping',
    },
    {
      question: 'How do I track my order?',
      answer:
        'You can track your order from the "Track Order" page using your order ID. You\'ll also receive tracking updates via email.',
      category: 'tracking',
    },
    {
      question: 'What is your return policy?',
      answer:
        'We offer 30-day easy returns. Items must be unused and in original packaging with tags attached.',
      category: 'returns',
    },
    {
      question: 'How can I cancel my order?',
      answer:
        'Orders can be cancelled within 2 hours of placing. Contact support immediately for cancellation requests.',
      category: 'cancellation',
    },
    {
      question: 'Do you offer exchange?',
      answer:
        'Yes, free size exchanges are available within 15 days of delivery.',
      category: 'returns',
    },
    {
      question: 'When will I receive my refund?',
      answer:
        'Refunds are processed within 5-7 business days after we receive the returned item.',
      category: 'returns',
    },
  ];

  const supportChannels = [
    {
      icon: '📧',
      title: 'Email Support',
      description: 'Get response within 24 hours',
      contact: 'support@shopify.com',
      action: 'mailto:support@shopify.com',
    },
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Chat with our support team',
      contact: 'Available 9 AM - 9 PM',
      action: '#',
      isChat: true,
    },
    {
      icon: '📞',
      title: 'Phone Support',
      description: 'Speak directly with an agent',
      contact: '+1 (800) 123-4567',
      action: 'tel:+18001234567',
    },
    {
      icon: '📱',
      title: 'WhatsApp',
      description: 'Quick replies on WhatsApp',
      contact: '+1 (800) 123-4567',
      action: 'https://wa.me/18001234567',
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-12 animate-fade-in'>
          <h1 className='text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3'>
            How Can We Help You?
          </h1>
          <p className='text-gray-500 max-w-2xl mx-auto'>
            We're here to help! Choose your preferred way to reach us or browse
            our FAQ for quick answers.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className='flex justify-center mb-8'>
          <div className='inline-flex bg-white rounded-xl shadow-sm p-1'>
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'contact'
                  ? 'bg-gray-800 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Contact Support
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'faq'
                  ? 'bg-gray-800 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              FAQ
            </button>
          </div>
        </div>

        {activeTab === 'contact' ? (
          <>
            {/* Support Channels Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
              {supportChannels.map((channel, idx) => (
                <a
                  key={idx}
                  href={channel.action}
                  target={channel.isChat ? '_blank' : '_self'}
                  rel='noopener noreferrer'
                  className='group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center cursor-pointer'
                >
                  <div className='text-4xl mb-3 group-hover:scale-110 transition-transform duration-300'>
                    {channel.icon}
                  </div>
                  <h3 className='font-semibold text-gray-800 mb-1'>
                    {channel.title}
                  </h3>
                  <p className='text-sm text-gray-500 mb-2'>
                    {channel.description}
                  </p>
                  <p className='text-xs text-gray-600 font-medium'>
                    {channel.contact}
                  </p>
                </a>
              ))}
            </div>

            {/* Contact Form */}
            <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
              <div className='bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-5 sm:px-8'>
                <h2 className='text-white text-xl font-semibold'>
                  Send us a Message
                </h2>
                <p className='text-gray-300 text-sm mt-1'>
                  We'll get back to you within 24 hours
                </p>
              </div>

              <form onSubmit={handleSubmit} className='p-6 sm:p-8 space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-gray-700 font-medium mb-2'>
                      Full Name <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      className='w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all'
                      placeholder='John Doe'
                      required
                    />
                  </div>

                  <div>
                    <label className='block text-gray-700 font-medium mb-2'>
                      Email Address <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      className='w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all'
                      placeholder='john@example.com'
                      required
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-gray-700 font-medium mb-2'>
                      Order ID (Optional)
                    </label>
                    <input
                      type='text'
                      name='orderId'
                      value={formData.orderId}
                      onChange={handleChange}
                      className='w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all'
                      placeholder='ORD123456'
                    />
                    <p className='text-xs text-gray-400 mt-1'>
                      Helps us assist you faster
                    </p>
                  </div>

                  <div>
                    <label className='block text-gray-700 font-medium mb-2'>
                      Priority
                    </label>
                    <select
                      name='priority'
                      value={formData.priority}
                      onChange={handleChange}
                      className='w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all bg-white'
                    >
                      <option value='normal'>Normal</option>
                      <option value='high'>High (Urgent)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className='block text-gray-700 font-medium mb-2'>
                    Subject <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    name='subject'
                    value={formData.subject}
                    onChange={handleChange}
                    className='w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all'
                    placeholder='Brief description of your issue'
                    required
                  />
                </div>

                <div>
                  <label className='block text-gray-700 font-medium mb-2'>
                    Message <span className='text-red-500'>*</span>
                  </label>
                  <textarea
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    rows='6'
                    className='w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all resize-none'
                    placeholder='Please provide details about your issue...'
                    required
                  ></textarea>
                  <p className='text-xs text-gray-400 mt-1'>
                    {formData.message.length} characters
                  </p>
                </div>

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full bg-gradient-to-r from-gray-800 to-gray-700 text-white py-4 rounded-xl font-semibold hover:from-gray-700 hover:to-gray-600 transition-all duration-200 transform hover:scale-[1.02] shadow-md disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {isSubmitting ? (
                    <span className='flex items-center justify-center gap-2'>
                      <svg
                        className='animate-spin h-5 w-5 text-white'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <circle
                          className='opacity-25'
                          cx='12'
                          cy='12'
                          r='10'
                          stroke='currentColor'
                          strokeWidth='4'
                        ></circle>
                        <path
                          className='opacity-75'
                          fill='currentColor'
                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>

            {/* Business Hours */}
            <div className='mt-8 bg-white rounded-xl shadow-md p-6 text-center'>
              <div className='flex items-center justify-center gap-2 mb-3'>
                <span className='text-2xl'>⏰</span>
                <h3 className='font-semibold text-gray-800'>Business Hours</h3>
              </div>
              <p className='text-gray-600'>
                Monday - Friday: 9:00 AM - 9:00 PM (IST)
              </p>
              <p className='text-gray-600'>
                Saturday - Sunday: 10:00 AM - 6:00 PM (IST)
              </p>
              <p className='text-sm text-gray-400 mt-2'>
                Response time: Within 24 hours
              </p>
            </div>
          </>
        ) : (
          /* FAQ Section */
          <div>
            {/* Search FAQ */}
            <div className='mb-8'>
              <div className='relative max-w-xl mx-auto'>
                <input
                  type='text'
                  placeholder='Search frequently asked questions...'
                  className='w-full border border-gray-200 rounded-xl px-5 py-3 pl-12 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all'
                />
                <svg
                  className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </div>
            </div>

            {/* FAQ Categories */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {['shipping', 'tracking', 'returns', 'cancellation'].map(
                (category) => (
                  <div
                    key={category}
                    className='bg-white rounded-2xl shadow-md overflow-hidden'
                  >
                    <div className='bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-4'>
                      <h3 className='text-white font-semibold capitalize'>
                        {category === 'returns'
                          ? 'Returns & Refunds'
                          : category === 'tracking'
                            ? 'Order Tracking'
                            : category === 'cancellation'
                              ? 'Order Cancellation'
                              : 'Shipping & Delivery'}
                      </h3>
                    </div>
                    <div className='divide-y divide-gray-100'>
                      {faqs
                        .filter((faq) => faq.category === category)
                        .map((faq, idx) => (
                          <details key={idx} className='group'>
                            <summary className='flex justify-between items-center cursor-pointer px-6 py-4 hover:bg-gray-50 transition-colors'>
                              <span className='text-gray-800 font-medium'>
                                {faq.question}
                              </span>
                              <svg
                                className='w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform duration-200'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M19 9l-7 7-7-7'
                                />
                              </svg>
                            </summary>
                            <div className='px-6 pb-4 text-gray-600 text-sm'>
                              {faq.answer}
                            </div>
                          </details>
                        ))}
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Still Need Help */}
            <div className='mt-10 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-center border border-blue-100'>
              <div className='text-4xl mb-3'>🤝</div>
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                Still need help?
              </h3>
              <p className='text-gray-600 mb-4'>
                Our support team is ready to assist you
              </p>
              <button
                onClick={() => setActiveTab('contact')}
                className='px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200'
              >
                Contact Support
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        details summary {
          list-style: none;
        }
        
        details summary::-webkit-details-marker {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Contact;
