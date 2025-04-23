'use client'; // Required for framer-motion

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Bubbles from '@/components/Bubbles';
import { useState, useEffect } from 'react';

// Simple SVG icon components (can be replaced with more elaborate ones)
const MoonIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-3.51 1.758-6.628 4.43-8.493a.75.75 0 01.819.162z" clipRule="evenodd" />
  </svg>
);

const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354l-4.543 2.907c-.996.608-2.231-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipRule="evenodd" />
    </svg>
);

const PencilSquareIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
    </svg>
);

const ChartBarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25C3.504 21 3 20.496 3 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25c-.621 0-1.125-.504-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25c-.621 0-1.125-.504-1.125-1.125V4.125z" />
    </svg>
);

const UserGroupIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 01-3.086 2.13A.75.75 0 0113.5 22.5v-5.106a5.625 5.625 0 01-.81-1.418l-.004-.012a3.004 3.004 0 01.016-.026l.016-.024a3.375 3.375 0 015.256 0l.016.024.016.026a3.004 3.004 0 01.016.024l-.004.012a5.625 5.625 0 01-.81 1.418V22.5a.75.75 0 01-.233-.285 10.088 10.088 0 01-3.086-2.13 2.25 2.25 0 01-.233-.96l-.001-.144z" />
    </svg>
);

const HeartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
  </svg>
);

// Session-dependent action button as a separate component
function ActionButton({ style }: { style: 'primary' | 'secondary' }) {
  const { data: session, status } = useSession();
  
  if (status === 'authenticated') {
    return (
      <Link
        href="/dashboard"
        className={style === 'primary'
          ? "inline-block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-10 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          : "inline-block bg-white text-purple-600 hover:bg-purple-50 font-bold py-4 px-12 rounded-full text-lg transition duration-300 ease-in-out shadow-lg"
        }
      >
        Go to Your Dashboard
      </Link>
    );
  }
  
  return (
    <Link
      href="/api/auth/signin"
      className={style === 'primary'
        ? "inline-block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-10 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        : "inline-block bg-white text-purple-600 hover:bg-purple-50 font-bold py-4 px-12 rounded-full text-lg transition duration-300 ease-in-out shadow-lg"
      }
    >
      {style === 'primary' ? 'Get Started Now' : 'Start Your Sleep Journey'}
    </Link>
  );
}

export default function HomePage() {
    const [isClient, setIsClient] = useState(false);
    
    // Only update client state after mounting
    useEffect(() => {
        setIsClient(true);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
      };
      
      const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: { type: 'spring', stiffness: 100 }
        }
      };

    const sectionVariant = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    // Testimonials data
    const testimonials = [
      {
        quote: "I've been tracking my sleep for months and it's helped me identify patterns I never noticed before. My sleep quality has improved so much!",
        author: "Jamie L.",
        role: "Software Engineer",
        image: "/images/testimonial1.jpg" // You'll need to add these images or use placeholders
      },
      {
        quote: "The cute design makes me actually want to fill out my sleep diary every day. My doctor loves the detailed data too!",
        author: "Sam T.",
        role: "Teacher",
        image: "/images/testimonial2.jpg"
      },
      {
        quote: "I was having terrible insomnia until I started tracking my habits. Now I sleep 7+ hours without waking up!",
        author: "Alex W.",
        role: "Marketing Director",
        image: "/images/testimonial3.jpg"
      }
    ];

  return (
    <>
      <div className="relative flex flex-col items-center justify-center min-h-[90vh] text-center px-4 bg-gradient-to-b from-blue-100 via-purple-100 to-indigo-100 overflow-hidden">
        <Bubbles count={12} />
        
        <motion.div
          className="absolute top-1/4 left-1/4 w-12 h-12 text-yellow-300 opacity-70 filter blur-[1px] z-10"
          animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <MoonIcon />
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-1/4 w-8 h-8 text-yellow-300 opacity-60 filter blur-[1px] z-10"
          animate={{ y: [0, 8, -8, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <StarIcon />
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-6 h-6 text-yellow-200 opacity-50 filter blur-[1px] z-10"
          animate={{ x: [0, 5, -5, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <StarIcon />
        </motion.div>
        
        <motion.div
          className="absolute bottom-10 right-10 md:right-[15%] w-32 h-32 z-10 hidden md:block"
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative">
            <div className="w-24 h-24 bg-indigo-400 rounded-full flex items-center justify-center">
              <div className="w-20 h-20 bg-indigo-300 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-indigo-200 rounded-full"></div>
              </div>
            </div>
            <div className="absolute top-8 left-6 w-12 h-1 bg-indigo-700 rounded-full"></div>
            <div className="absolute top-8 right-6 w-12 h-1 bg-indigo-700 rounded-full"></div>
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-6 h-3 border-b-2 border-indigo-700 rounded-full"></div>
            <motion.div 
              className="absolute -top-2 -right-2 text-indigo-700 font-bold text-lg"
              animate={{ y: [-10, -30], opacity: [1, 0]}}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            >
              Z
            </motion.div>
            <motion.div 
              className="absolute -top-8 right-2 text-indigo-700 font-bold text-xl"
              animate={{ y: [-10, -30], opacity: [1, 0]}}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
            >
              Z
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-3xl"
        >
          <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
          >
            Unlock Better Sleep, <br /> One Night at a Time.
          </motion.h1>

          <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-700 mb-10"
          >
            Your personal, interactive sleep diary to understand your patterns and wake up refreshed.
          </motion.p>

          <motion.div variants={itemVariants}>
            {isClient ? (
              <ActionButton style="primary" />
            ) : (
              // Default button for server-side rendering
              <Link
                href="/api/auth/signin"
                className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-10 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
              >
                Get Started Now
              </Link>
            )}
          </motion.div>
          
          <motion.div 
            className="absolute bottom-[-100px] left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <motion.div 
                className="w-1 h-2 bg-gray-400 rounded-full mt-2"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.section 
        className="py-16 md:py-24 bg-white relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariant}
      >
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How SleepDiary Helps You</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">Our intuitive sleep tracking system makes it easy to understand and improve your sleep patterns.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            <motion.div variants={itemVariants} className="flex flex-col items-center group">
              <div className="bg-blue-100 rounded-full p-5 mb-4 inline-block group-hover:bg-blue-200 transition-colors duration-300">
                <PencilSquareIcon className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Log Effortlessly</h3>
              <p className="text-gray-600">Quickly note down your sleep times, quality, and factors affecting your rest with our cute & simple interface.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col items-center group">
              <div className="bg-purple-100 rounded-full p-5 mb-4 inline-block group-hover:bg-purple-200 transition-colors duration-300">
                <ChartBarIcon className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Visualize Insights</h3>
              <p className="text-gray-600">See clear charts and summaries of your sleep patterns over time. Identify trends and triggers easily.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col items-center group">
              <div className="bg-green-100 rounded-full p-5 mb-4 inline-block group-hover:bg-green-200 transition-colors duration-300">
                <UserGroupIcon className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Share with Your Doctor</h3>
              <p className="text-gray-600">Optionally connect with your healthcare provider to share your data for informed discussions (Doctor portal included!).</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section 
        className="py-16 md:py-24 bg-indigo-50 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariant}
      >
         <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why You'll Love SleepDiary</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    { title: "Cute & Fun UI", description: "Designed to be delightful, not a chore.", icon: HeartIcon, color: "pink" },
                    { title: "Quick Entry", description: "Log your sleep in just a minute or two.", icon: PencilSquareIcon, color: "blue" },
                    { title: "Actionable Insights", description: "Understand what helps or hurts your sleep.", icon: ChartBarIcon, color: "purple" },
                    { title: "Doctor Ready", description: "Easy data sharing for better care.", icon: UserGroupIcon, color: "green" },
                ].map((feature, index) => (
                    <motion.div 
                      variants={itemVariants} 
                      key={index} 
                      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                        <div className={`mx-auto mb-4 bg-${feature.color}-100 p-3 rounded-full w-16 h-16 flex items-center justify-center`}>
                          <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
                        </div>
                        <h3 className="text-lg font-semibold text-purple-700 mb-2">{feature.title}</h3>
                        <p className="text-gray-600 text-sm">{feature.description}</p>
                    </motion.div>
                ))}
             </div>
        </div>
      </motion.section>

      <motion.section
        className="py-16 md:py-24 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariant}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Real stories from people who have improved their sleep with SleepDiary.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-50 p-6 rounded-xl shadow-md"
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              >
                <div className="mb-4">
                  <div className="flex justify-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <h4 className="font-medium text-indigo-700">{testimonial.author}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-16 md:py-24 bg-gradient-to-r from-blue-500 to-purple-600 text-white relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariant}
      >
        <motion.div 
          className="absolute right-10 top-10 opacity-30 w-32 h-32 rounded-full border-4 border-white"
          animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute left-10 bottom-10 opacity-20 w-24 h-24 rounded-full border-4 border-white"
          animate={{ y: [0, 15, 0], x: [0, -10, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Sleep Better?</h2>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">Join thousands of others who've improved their sleep quality with our adorable sleep diary app.</p>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {isClient ? (
              <ActionButton style="secondary" />
            ) : (
              // Default button for server-side rendering
              <Link
                href="/api/auth/signin"
                className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-10 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
              >
                Get Started Now
              </Link>
            )}
          </motion.div>
          
          <p className="mt-6 text-white/80 text-sm">No credit card required. Start with our free plan.</p>
        </div>
      </motion.section>
    </>
  );
}
