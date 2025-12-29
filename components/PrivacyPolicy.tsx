
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import { ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack?: () => void;
}

const markdownContent = `
# Privacy Policy

**Effective Date:** December 3, 2025

## 1. Introduction
Welcome to **GardenDex** ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how your information is collected, used, and disclosed by GardenDex.

This Privacy Policy applies to our mobile application "GardenDex" and its associated services.

## 2. Information We Collect

### A. Information You Provide
- **Plant Data:** Images of plants, names, locations (e.g., "Living Room"), and notes you enter into the app.
- **API Keys:** If you choose to use your own AI API Key (e.g., Gemini), it is stored securely on your device and is only used to make requests to the AI provider directly. We do not log or store your API keys on our servers.

### B. Automatically Collected Information
- **Usage Data:** We may collect anonymous usage statistics (e.g., crash logs, feature usage) to help us improve the app stability.
- **Device Information:** Model of device, operating system version, and general region (for language preferences).

## 3. How We Use Your Information
- **To Provide Features:** We use your photos to identify plants and provide care suggestions via AI.
- **To Improve the App:** Anonymous data helps us understand which features are most popular.
- **Syncing:** If you enable iCloud or Google Drive sync, your data is stored in your personal cloud storage account. We do not have access to this data.

## 4. AI and Third-Party Services
GardenDex uses Artificial Intelligence to analyze plant photos.
- When you send a photo for identification, it is processed by the AI provider (e.g., Google Gemini).
- Please review [Google's Privacy Policy](https://policies.google.com/privacy) regarding how they handle data processed via their API.
- We do not sell your photos or personal data to third parties.

## 5. Your Choices
- **API Keys:** You can remove your custom API key at any time in the Settings menu.
- **Data Deletion:** You can delete your plant data directly within the app.

## 6. Changes to This Policy
We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.

## 7. Contact Us
If you have any questions about this Privacy Policy, please contact us at support@gardendex.app.
`;

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-forest-950 text-forest-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={handleBackClick}
          className="flex items-center text-neon-400 hover:text-neon-500 transition mb-8 font-medium"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Home
        </button>
        
        <div className="bg-forest-900/50 backdrop-blur-sm border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="prose prose-invert prose-green max-w-none">
            <Markdown
              components={{
                h1: ({node, ...props}) => <h1 className="text-4xl font-bold text-white mb-8 border-b border-white/10 pb-4" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-semibold text-neon-400 mt-10 mb-4" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-medium text-white mt-6 mb-3" {...props} />,
                p: ({node, ...props}) => <p className="text-forest-200 leading-relaxed mb-4" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-inside text-forest-200 mb-4 space-y-2" {...props} />,
                li: ({node, ...props}) => <li className="pl-2" {...props} />,
                a: ({node, ...props}) => <a className="text-neon-400 hover:underline" {...props} />,
                strong: ({node, ...props}) => <strong className="text-white font-semibold" {...props} />
              }}
            >
              {markdownContent}
            </Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
