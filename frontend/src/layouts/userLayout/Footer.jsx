import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <section className="footer-section h-auto bg-black py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap">
          {/* Left Section */}
          <div className="w-full md:w-1/2 text-white space-y-6">
            <div>
              <p className="text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officiis natus, fugit sunt dicta odio magni illum velit libero
                earum voluptate! Praesentium rerum ad fuga consectetur quidem
                molestias magni aperiam itaque?
              </p>
            </div>
            <div>
              <p className="text-gray-300">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi,
                quod?
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 text-white flex flex-col space-y-6 md:pl-12">
            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-bold text-lg mb-2">Product</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Review</li>
                  <li>Draft</li>
                  <li>Ask</li>
                  <li>Benchmarks</li>
                  <li>Associate</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Resources</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Blog</li>
                  <li>Customer Stories</li>
                  <li>Clause Library</li>
                  <li>Help Center</li>
                  <li>Security & Compliance</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>About</li>
                  <li>Careers</li>
                  <li>Press</li>
                  <li>Contact</li>
                </ul>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-6 border-t border-gray-700">
              <h4 className="font-bold text-lg mb-4">Newsletter</h4>
              <form className="flex items-center space-x-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-md text-black"
                />
                <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Subscribe
                </button>
              </form>
            </div>

            {/* Social Media */}
            <div className="flex items-center space-x-6 mt-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaLinkedin size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
