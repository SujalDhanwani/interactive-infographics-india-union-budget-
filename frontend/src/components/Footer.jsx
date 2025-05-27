import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#F9FAFB] dark:bg-gray-900 text-gray-600 dark:text-gray-400 py-8 mt-16 border-t border-gray-300 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p>
              Data sourced from{" "}
              <a
                href="https://data.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 dark:hover:text-gray-100 underline"
              >
                Indian Government Open Data Platform
              </a>
              .
            </p>
            <p className="mt-1">
              Designed and Developed by{" "}
              <span className="font-semibold text-gray-900 dark:text-gray-200">
                Sujal Dhanwani
              </span>
              .
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://www.instagram.com/sujal__dhanwani07?igsh=MWF5ZW1pMGRxZ3F5Zg=="
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/sujaldhanwani0909"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
          © {new Date().getFullYear()} Sujal Dhanwani. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
