// import React from 'react';
// import { ExternalLink, Github } from 'lucide-react';

// export const Footer: React.FC = () => {
//   return (
//     <footer className="bg-gray-900 text-white py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           <div className="space-y-4">
//             <h3 className="text-lg font-bold">TipStack</h3>
//             <p className="text-gray-400">
//               Secure, instant tipping on the Stacks blockchain
//             </p>
//             <div className="flex space-x-4">
//               <a href="https://twitter.com/tipstack" className="hover:text-violet-400 transition-colors">
//                 <ExternalLink className="h-5 w-5" />
//               </a>
//               <a href="https://github.com/tipstack" className="hover:text-violet-400 transition-colors">
//                 <Github className="h-5 w-5" />
//               </a>
//             </div>
//           </div>
//           <div>
//             <h3 className="text-lg font-bold mb-4">Product</h3>
//             <ul className="space-y-2">
//               <li>
//                 <a href="#features" className="text-gray-400 hover:text-violet-400 transition-colors">
//                   Features
//                 </a>
//               </li>
//               <li>
//                 <a href="#send-tip" className="text-gray-400 hover:text-violet-400 transition-colors">
//                   Send Tips
//                 </a>
//               </li>
//               <li>
//                 <a href="#faq" className="text-gray-400 hover:text-violet-400 transition-colors">
//                 </a>
//                 </li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-lg font-bold mb-4">Resources</h3>
//             <ul className="space-y-2">
//               <li>
//                 <a href="/docs" className="text-gray-400 hover:text-violet-400 transition-colors">
//                   Documentation
//                 </a>
//               </li>
//               <li>
//                 <a href="/blog" className="text-gray-400 hover:text-violet-400 transition-colors">
//                   Blog
//                 </a>
//               </li>
//               <li>
//                 <a href="/support" className="text-gray-400 hover:text-violet-400 transition-colors">
//                   Support
//                 </a>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-lg font-bold mb-4">Legal</h3>
//             <ul className="space-y-2">
//               <li>
//                 <a href="/privacy" className="text-gray-400 hover:text-violet-400 transition-colors">
//                   Privacy Policy
//                 </a>
//               </li>
//               <li>
//                 <a href="/terms" className="text-gray-400 hover:text-violet-400 transition-colors">
//                   Terms of Service
//                 </a>
//               </li>
//               <li>
//                 <a href="/cookies" className="text-gray-400 hover:text-violet-400 transition-colors">
//                   Cookie Policy
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//         <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
//           <p>© {new Date().getFullYear()} TipStack. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

import React from 'react';
import { ExternalLink, Github, Twitter, Mail, ArrowUpRight, Sparkles } from 'lucide-react';

export const Footer: React.FC = () =>
{
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-violet-950 to-purple-950">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div
          className="absolute w-full h-full opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-violet-400" />
              <h3 className="text-xl font-bold bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent">
                TipStack
              </h3>
            </div>
            <p className="text-gray-300/80">
              Empowering global communities through secure, instant blockchain-powered tipping.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/tipstack"
                className="group relative p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5 text-violet-300 group-hover:text-violet-400 transition-colors" />
              </a>
              <a
                href="https://github.com/tipstack"
                className="group relative p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5 text-violet-300 group-hover:text-violet-400 transition-colors" />
              </a>
              <a
                href="mailto:contact@tipstack.com"
                className="group relative p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                <Mail className="h-5 w-5 text-violet-300 group-hover:text-violet-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* Product Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white/90">Product</h3>
            <ul className="space-y-3">
              {['Features', 'Send Tips', 'FAQ', 'Pricing'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="group flex items-center text-gray-300/80 hover:text-violet-300 transition-colors"
                  >
                    {item}
                    <ArrowUpRight className="h-4 w-4 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white/90">Resources</h3>
            <ul className="space-y-3">
              {['Documentation', 'Blog', 'Support', 'Status'].map((item) => (
                <li key={item}>
                  <a
                    href={`/${item.toLowerCase()}`}
                    className="group flex items-center text-gray-300/80 hover:text-violet-300 transition-colors"
                  >
                    {item}
                    <ArrowUpRight className="h-4 w-4 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white/90">Legal</h3>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <a
                    href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="group flex items-center text-gray-300/80 hover:text-violet-300 transition-colors"
                  >
                    {item}
                    <ArrowUpRight className="h-4 w-4 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="relative mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} TipStack. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <button className="hover:text-violet-300 transition-colors">
                Change Region
              </button>
              <span className="hidden md:inline">•</span>
              <button className="hover:text-violet-300 transition-colors">
                English (US)
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};