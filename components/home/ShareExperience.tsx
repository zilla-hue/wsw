'use client';

import { useState, useEffect } from 'react';
import { Send, Users, Gift, Store, Megaphone } from 'lucide-react';
import { motion } from 'framer-motion';
import VolunteerForm from './forms/VolunteerForm';
// import DonationForm from './forms/DonationForm';
import EventRegistrationForm from './forms/EventRegistrationForm';


type FormType = 'volunteer' | 'register';

const formConfig = {
  volunteer: {
    title: 'Join Our Volunteer Team',
    description: 'Be part of our dedicated team serving the community',
    icon: Users,
    label: 'VOLUNTEER',
  },
  // donate: {
  //   title: 'Support Our Ministry',
  //   description: 'Partner with us through your generous contributions',
  //   icon: Gift,
  //   label: 'GIVE',
  // },
  register: {
    title: 'Register for WSW',
    description: 'Join us for this transformative event',
    icon: Megaphone,
    label: 'REGISTER',
  }
} as const;

// Add these animation variants
const formVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.3 }
  }
};

export default function ShareExperience() {
  const [formType, setFormType] = useState<FormType>('volunteer');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if there's a selected form type in sessionStorage
    const selectedType = sessionStorage.getItem('selectedFormType') as FormType;
    if (selectedType && Object.keys(formConfig).includes(selectedType)) {
      setFormType(selectedType);
      // Clear the storage after using it
      sessionStorage.removeItem('selectedFormType');
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  const renderForm = () => {
    switch (formType) {
      case 'volunteer':
        return <VolunteerForm />;
        // case 'donate':
        //   return <DonationForm />;
      case 'register':
        return <EventRegistrationForm />;
    }
  };

  return (
    <section id="share-experience" className="py-16 bg-brand-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-brand-gold text-center mb-12">
          JOIN THE MOVEMENT
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <motion.div
            key={formType}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={formVariants}
            className="bg-brand-dark/50 p-8 rounded-lg border border-brand-gold/20"
          >
            <h3 className="text-xl font-semibold text-brand-gold mb-2">
              {formConfig[formType].title}
            </h3>
            <p className="text-gray-400 mb-6">
              {formConfig[formType].description}
            </p>
            {renderForm()}
          </motion.div>

          {/* Action Buttons */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {(Object.keys(formConfig) as FormType[]).map((type) => {
                const { icon: Icon, label } = formConfig[type];
                const isActive = type === formType;

                return (
                  <motion.button
                    key={type}
                    onClick={() => setFormType(type)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className={`relative bg-brand-dark/50 p-8 rounded-lg border ${
                      isActive
                        ? 'border-brand-gold shadow-lg shadow-brand-gold/10'
                        : 'border-brand-gold/20 hover:border-brand-gold/40'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 bg-brand-gold/5 rounded-lg"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <div className="relative">
                      <Icon className={`w-8 h-8 mb-4 transition-transform duration-300 group-hover:scale-110 ${
                        isActive ? 'text-brand-gold' : 'text-brand-gold/80'
                      }`} />
                      <h3 className={`text-xl font-semibold mb-2 ${
                        isActive ? 'text-brand-gold' : 'text-brand-gold/80'
                      }`}>
                        {label}
                      </h3>
                      <p className="text-gray-400">
                        {formConfig[type].description}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}