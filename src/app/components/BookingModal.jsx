"use client"
import React, { useState, useCallback } from 'react';
import { X, CheckCircle, Calendar, ChevronLeft, ChevronRight, CreditCard, Smartphone, Building2 } from 'lucide-react';

const CONSULTATION_SUBJECTS = [
  { id: 'cv', label: 'Préparation de CV professionnel' },
  { id: 'interview', label: 'Préparation des entretiens' },
  { id: 'linkedin', label: 'Développement le compte LinkedIn' },
  { id: 'branding', label: 'Personnel branding' },
  { id: 'recruitment', label: 'Le processus de recrutement' },
  { id: 'stress', label: 'Gestion du stress au travail' },
  { id: 'rights', label: 'Les droits et les obligations des salariés' },
  { id: 'tracking', label: 'Pointage' },
];

const PROMO_PACKS = [
  { id: 'basic', name: 'Pack Essentiel', price: 99, description: '1 consultation (30 min)', features: ['CV Review', 'Quick Feedback'] },
  { id: 'standard', name: 'Pack Standard', price: 249, description: '3 consultations', features: ['CV + LinkedIn Review', 'Interview Prep', 'Email Support'], popular: true },
  { id: 'premium', name: 'Pack Premium', price: 449, description: '6 consultations + suivi', features: ['Full Career Coaching', 'Unlimited Revisions', 'Priority Support', '3-month Follow-up'] },
];

const PAYMENT_METHODS = [
  { id: 'card', label: 'Carte Bancaire', icon: CreditCard },
  { id: 'mobile', label: 'Paiement Mobile', icon: Smartphone },
  { id: 'transfer', label: 'Virement Bancaire', icon: Building2 },
];

export default function BookingModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    city: '',
    email: '',
    phone: '',
    subjects: [],
    otherSubject: '',
    questions: '',
    selectedPack: 'basic',
    selectedDate: null,
    selectedTime: null,
    paymentMethod: 'card',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubjectToggle = useCallback((subjectId) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subjectId)
        ? prev.subjects.filter(id => id !== subjectId)
        : [...prev.subjects, subjectId]
    }));
  }, []);

  const handleDateSelect = useCallback((date) => {
    setFormData(prev => ({ ...prev, selectedDate: date }));
  }, []);

  const handleTimeSelect = useCallback((time) => {
    setFormData(prev => ({ ...prev, selectedTime: time }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSubmitting(true);

    setTimeout(() => {
      console.log('Booking submitted:', formData);
      setIsSubmitting(false);
      onClose();
      setFormData({
        fullName: '', age: '', city: '', email: '', phone: '',
        subjects: [], otherSubject: '', questions: '',
        selectedPack: 'basic', selectedDate: null, selectedTime: null,
        paymentMethod: 'card',
      });
      setCurrentStep(1);
    }, 1500);
  };

  const nextStep = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const selectedPackData = PROMO_PACKS.find(p => p.id === formData.selectedPack);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex justify-between items-center text-white">
          <div>
            <h3 className="font-bold text-xl">Réserver une Consultation</h3>
            <p className="text-blue-100 text-sm">Étape {currentStep} sur 4</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="hover:bg-white/20 p-2 rounded-full transition"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-200">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
            style={{ width: `${currentStep * 25}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Step 1: Personal Info & Subjects */}
          <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
            <div className="space-y-6">
              {/* Section 1: Personal Information */}
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
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Consultation Subjects */}
              <div>
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                  Objet de la Consultation
                </h4>
                <p className="text-sm text-gray-500 mb-3">Indiquer le sujet de la demande (plusieurs choix possibles)</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {CONSULTATION_SUBJECTS.map((subject) => (
                    <label
                      key={subject.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.subjects.includes(subject.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.subjects.includes(subject.id)}
                        onChange={() => handleSubjectToggle(subject.id)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{subject.label}</span>
                    </label>
                  ))}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Autre (précisez)</label>
                    <input
                      type="text"
                      name="otherSubject"
                      value={formData.otherSubject}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="Autre sujet..."
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Questions */}
              <div>
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
                  Des Questions?
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

          {/* Step 2: Package Selection */}
          <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">4</span>
                  Choisir un Pack Promo
                </h4>
                <div className="space-y-4">
                  {PROMO_PACKS.map((pack) => (
                    <label
                      key={pack.id}
                      className={`block p-4 rounded-xl border-2 cursor-pointer transition-all relative ${
                        formData.selectedPack === pack.id
                          ? 'border-blue-500 bg-blue-50 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {pack.popular && (
                        <span className="absolute -top-3 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                          POPULAIRE
                        </span>
                      )}
                      <div className="flex items-start gap-4">
                        <input
                          type="radio"
                          name="selectedPack"
                          value={pack.id}
                          checked={formData.selectedPack === pack.id}
                          onChange={handleChange}
                          className="mt-1 w-5 h-5 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-bold text-gray-900">{pack.name}</h5>
                              <p className="text-sm text-gray-500">{pack.description}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-2xl font-bold text-blue-600">{pack.price}</span>
                              <span className="text-gray-500 text-sm"> DH</span>
                            </div>
                          </div>
                          <ul className="mt-3 flex flex-wrap gap-2">
                            {pack.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                <CheckCircle size={12} className="text-green-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Date Selection */}
          <div style={{ display: currentStep === 3 ? 'block' : 'none' }}>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">5</span>
                  Choix des Dates
                </h4>
                <CalendarPicker
                  selectedDate={formData.selectedDate}
                  selectedTime={formData.selectedTime}
                  onDateSelect={handleDateSelect}
                  onTimeSelect={handleTimeSelect}
                />
              </div>
            </div>
          </div>

          {/* Step 4: Payment Method */}
          <div style={{ display: currentStep === 4 ? 'block' : 'none' }}>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">6</span>
                  Méthodes de Paiement
                </h4>
                <div className="space-y-3">
                  {PAYMENT_METHODS.map((method) => {
                    const Icon = method.icon;
                    return (
                      <label
                        key={method.id}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.paymentMethod === method.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={formData.paymentMethod === method.id}
                          onChange={handleChange}
                          className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                        />
                        <Icon size={24} className="text-gray-600" />
                        <span className="font-medium text-gray-900">{method.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h5 className="font-bold text-gray-900 mb-3">Récapitulatif</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pack sélectionné:</span>
                    <span className="font-medium">{selectedPackData?.name}</span>
                  </div>
                  {formData.selectedDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">
                        {formData.selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                      </span>
                    </div>
                  )}
                  {formData.selectedTime && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Heure:</span>
                      <span className="font-medium">{formData.selectedTime}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 mt-2 flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-blue-600">{selectedPackData?.price} DH</span>
                  </div>
                </div>
              </div>
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

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition"
              >
                Suivant
                <ChevronRight size={20} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.selectedDate || !formData.selectedTime}
                className="flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Traitement...
                  </>
                ) : (
                  <>
                    <Calendar size={20} />
                    Confirmer & Payer {selectedPackData?.price} DH
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

// Calendar Component - Completely standalone with its own state
function CalendarPicker({ selectedDate, selectedTime, onDateSelect, onTimeSelect }) {
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  
  const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();
  
  const days = [];
  for (let i = 0; i < startingDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  const isDateSelected = (date) => {
    if (!selectedDate || !date) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const isDateDisabled = (date) => {
    if (!date) return true;
    const dayOfWeek = date.getDay();
    const dateAtMidnight = new Date(date);
    dateAtMidnight.setHours(0, 0, 0, 0);
    return dateAtMidnight < today || dayOfWeek === 0 || dayOfWeek === 6;
  };

  const goToPrevMonth = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const goToNextMonth = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const selectDate = (e, date) => {
    e.preventDefault();
    e.stopPropagation();
    if (date && !isDateDisabled(date)) {
      onDateSelect(date);
    }
  };

  const selectTime = (e, time) => {
    e.preventDefault();
    e.stopPropagation();
    onTimeSelect(time);
  };

  return (
    <div className="space-y-6">
      {/* Calendar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={goToPrevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ChevronLeft size={20} />
          </button>
          <h5 className="font-bold text-gray-900">
            {monthNames[month]} {year}
          </h5>
          <button
            type="button"
            onClick={goToNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, idx) => {
            const disabled = isDateDisabled(date);
            const selected = isDateSelected(date);
            
            if (!date) {
              return <div key={`empty-${idx}`} className="aspect-square" />;
            }
            
            return (
              <button
                key={`day-${date.getTime()}`}
                type="button"
                disabled={disabled}
                onClick={(e) => selectDate(e, date)}
                className={`aspect-square flex items-center justify-center text-sm rounded-lg transition-colors ${
                  selected
                    ? 'bg-blue-600 text-white font-bold'
                    : disabled
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'hover:bg-blue-50 text-gray-700 cursor-pointer'
                }`}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h5 className="font-medium text-gray-900 mb-3">
            Choisir l&apos;heure pour le {selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}:
          </h5>
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                type="button"
                onClick={(e) => selectTime(e, time)}
                className={`py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                  selectedTime === time
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected Summary */}
      {selectedDate && selectedTime && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
          <div>
            <p className="font-medium text-green-800">Date et heure sélectionnées:</p>
            <p className="text-green-700">
              {selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} à {selectedTime}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}