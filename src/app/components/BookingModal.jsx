"use client"
import React, { useState, useCallback } from 'react';
import { X, CheckCircle, Building2, Copy, ChevronLeft, ChevronRight, User, CreditCard, AlertCircle } from 'lucide-react';

// Bank details - will be displayed after selecting Virement Bancaire
const BANK_DETAILS = {
  rib: process.env.NEXT_PUBLIC_BANK_RIB || '000 000 0000000000 00',
  accountName: process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME || 'Nom du titulaire du compte',
  bankName: process.env.NEXT_PUBLIC_BANK_NAME || 'Nom de la banque',
};

export default function BookingModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    city: '',
    email: '',
    phone: '',
    questions: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [copiedField, setCopiedField] = useState('');

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const isStep1Valid = () => {
    return (
      formData.fullName.trim() !== '' &&
      formData.age.trim() !== '' &&
      formData.city.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phone.trim() !== ''
    );
  };

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(''), 2000);
    } catch {
      // fallback
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          subject: 'Préparation de CV professionnel',
          paymentMethod: 'Virement Bancaire',
          price: '99 DH',
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Une erreur est survenue');
      }

      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(error.message || 'Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset after animation
    setTimeout(() => {
      setFormData({
        fullName: '', age: '', city: '', email: '', phone: '', questions: '',
      });
      setCurrentStep(1);
      setIsSubmitted(false);
      setSubmitError('');
    }, 300);
  };

  const nextStep = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isStep1Valid()) {
      setCurrentStep(2);
    }
  };

  const prevStep = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentStep(1);
  };

  if (!isOpen) return null;

  // Success Screen
  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
        <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl my-8">
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Demande envoyée !</h3>
            <p className="text-gray-600 mb-2">
              Merci <span className="font-semibold">{formData.fullName}</span> pour votre demande de consultation.
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Nous avons bien reçu votre demande. Veuillez effectuer le virement bancaire en indiquant votre nom complet dans la description du transfert. Nous vous contacterons par email et téléphone pour confirmer votre rendez-vous.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-left">
              <p className="text-sm font-medium text-blue-800 mb-2">Rappel - Informations de virement :</p>
              <p className="text-sm text-blue-700">RIB : <span className="font-mono font-bold">{BANK_DETAILS.rib}</span></p>
              <p className="text-sm text-blue-700">Titulaire : <span className="font-bold">{BANK_DETAILS.accountName}</span></p>
              <p className="text-sm text-blue-700">Montant : <span className="font-bold">99 DH</span></p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex justify-between items-center text-white">
          <div>
            <h3 className="font-bold text-xl">Réserver une Consultation</h3>
            <p className="text-blue-100 text-sm">Préparation de CV professionnel — 99 DH</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="hover:bg-white/20 p-2 rounded-full transition"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Progress Bar - 2 steps */}
        <div className="flex">
          <div className={`flex-1 h-1 transition-all duration-300 ${currentStep >= 1 ? 'bg-gradient-to-r from-blue-500 to-blue-400' : 'bg-gray-200'}`} />
          <div className={`flex-1 h-1 transition-all duration-300 ${currentStep >= 2 ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'bg-gray-200'}`} />
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-center gap-8 py-4 bg-gray-50 border-b">
          <div className={`flex items-center gap-2 text-sm font-medium ${currentStep === 1 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${currentStep === 1 ? 'bg-blue-600 text-white' : currentStep > 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {currentStep > 1 ? <CheckCircle size={14} /> : '1'}
            </div>
            <span className="hidden sm:inline">Informations</span>
          </div>
          <div className={`w-8 h-[2px] ${currentStep > 1 ? 'bg-green-500' : 'bg-gray-200'}`} />
          <div className={`flex items-center gap-2 text-sm font-medium ${currentStep === 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${currentStep === 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
              2
            </div>
            <span className="hidden sm:inline">Paiement</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">

          {/* ============ STEP 1: Personal Info ============ */}
          <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
            <div className="space-y-6">
              {/* Consultation Subject - Fixed */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-800">Objet de la Consultation</p>
                  <p className="text-blue-900 font-bold">Préparation de CV professionnel</p>
                  <p className="text-xs text-blue-600 mt-1">Consultation 1:1 — 99 DH</p>
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                  Informations Personnelles
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom et Prénom *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="Yassine Amrani"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">L&apos;âge *</label>
                    <input
                      type="number"
                      name="age"
                      min="16"
                      max="99"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="25"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">La Ville *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="Casablanca"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="+212 6XX XXX XXX"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Questions */}
              <div>
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                  Des Questions? <span className="text-gray-400 font-normal text-sm">(optionnel)</span>
                </h4>
                <textarea
                  name="questions"
                  value={formData.questions}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                  placeholder="Décrivez vos questions ou préoccupations..."
                />
              </div>
            </div>
          </div>

          {/* ============ STEP 2: Payment - Virement Bancaire ============ */}
          <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
            <div className="space-y-6">
              {/* Payment Method Header */}
              <div>
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
                  Méthode de Paiement
                </h4>

                {/* Virement Bancaire - Selected by default */}
                <div className="border-2 border-blue-500 bg-blue-50 rounded-xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Building2 size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Virement Bancaire</p>
                    <p className="text-sm text-gray-500">Transférez le montant vers notre compte</p>
                  </div>
                  <CheckCircle size={24} className="text-blue-600 ml-auto" />
                </div>
              </div>

              {/* Bank Transfer Instructions */}
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    Veuillez inclure votre <span className="font-bold text-gray-900">nom complet</span> dans la description du virement bancaire pour que nous puissions identifier votre paiement.
                  </p>
                </div>

                {/* RIB */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">RIB</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(BANK_DETAILS.rib, 'rib')}
                      className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 transition"
                    >
                      <Copy size={12} />
                      {copiedField === 'rib' ? 'Copié !' : 'Copier'}
                    </button>
                  </div>
                  <p className="font-mono text-lg font-bold text-gray-900 tracking-wider">{BANK_DETAILS.rib}</p>
                </div>

                {/* Account Name */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Titulaire du compte</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(BANK_DETAILS.accountName, 'name')}
                      className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 transition"
                    >
                      <Copy size={12} />
                      {copiedField === 'name' ? 'Copié !' : 'Copier'}
                    </button>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{BANK_DETAILS.accountName}</p>
                </div>

                {/* Bank Name */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Banque</span>
                  <p className="text-lg font-bold text-gray-900 mt-1">{BANK_DETAILS.bankName}</p>
                </div>

                {/* Amount */}
                <div className="bg-white rounded-lg p-4 border border-blue-200 bg-blue-50">
                  <span className="text-xs font-medium text-blue-500 uppercase tracking-wide">Montant à transférer</span>
                  <p className="text-2xl font-bold text-blue-600 mt-1">99 DH</p>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h5 className="font-bold text-gray-900 mb-3">Récapitulatif</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nom:</span>
                    <span className="font-medium">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Téléphone:</span>
                    <span className="font-medium">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Consultation:</span>
                    <span className="font-medium">Préparation de CV professionnel</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Paiement:</span>
                    <span className="font-medium">Virement Bancaire</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-blue-600">99 DH</span>
                  </div>
                </div>
              </div>

              {/* Error message */}
              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                  <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
                  <p className="text-sm text-red-700">{submitError}</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-200 text-gray-700 font-medium hover:border-gray-300 transition"
              >
                <ChevronLeft size={20} />
                Précédent
              </button>
            ) : (
              <div />
            )}

            {currentStep === 1 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!isStep1Valid()}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Suivant
                <ChevronRight size={20} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    Confirmer la demande
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
