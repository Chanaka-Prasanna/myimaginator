import React from "react";

const Footer = () => {
  return (
    <footer className="flex h-[60px] items-center justify-center text-sm text-gray-500 md:p-10">
      <a href="/privacy-policy" className="mr-4 hover:underline">
        Privacy Policy
      </a>
      <a href="/terms-of-service" className="mr-4 hover:underline">
        Terms of Service
      </a>
      <a
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        Facebook
      </a>
    </footer>
  );
};

export default Footer;
