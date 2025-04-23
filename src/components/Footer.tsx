'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold text-indigo-600 mb-4">SleepDiary</h3>
            <p className="text-gray-600 text-sm mb-4">
              Tracking your sleep patterns for better rest and healthier days.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'facebook', 'instagram'].map(social => (
                <a 
                  key={social}
                  href={`https://${social}.com`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-6 h-6 bg-gray-300 rounded-full"></div> {/* Placeholder for actual icons */}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {[
            {
              title: "Product",
              links: [
                { label: "Features", href: "/features" },
                { label: "Pricing", href: "/pricing" },
                { label: "Testimonials", href: "/testimonials" },
                { label: "FAQ", href: "/faq" },
              ]
            },
            {
              title: "Resources",
              links: [
                { label: "Sleep Tips", href: "/sleep-tips" },
                { label: "Research", href: "/research" },
                { label: "Blog", href: "/blog" },
              ]
            },
            {
              title: "Company",
              links: [
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Privacy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
              ]
            }
          ].map((column, i) => (
            <div key={i} className="col-span-1">
              <h3 className="font-semibold text-gray-900 mb-3">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, j) => (
                  <li key={j}>
                    <Link 
                      href={link.href} 
                      className="text-gray-600 hover:text-indigo-600 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} SleepDiary. All rights reserved.</p>
          <div className="mt-3 md:mt-0">
            <Link href="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link>
            <span className="mx-2">•</span>
            <Link href="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 