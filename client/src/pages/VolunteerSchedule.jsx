import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import dataService from "../services/dataService";

const volunteerOpportunities = [
  {
    id: 1,
    title: "Crisis Line Support",
    description: "Answer crisis calls and provide immediate support",
    location: "Remote",
    duration: "4 hours",
    slots: ["09:00 AM", "01:00 PM", "05:00 PM"],
    requiredTraining: true
  },
  {
    id: 2,
    title: "Shelter Assistance",
    description: "Help with daily operations at our emergency shelter",
    location: "Downtown Montreal",
    duration: "3 hours",
    slots: ["10:00 AM", "02:00 PM", "06:00 PM"],
    requiredTraining: false
  },
  {
    id: 3,
    title: "Community Outreach",
    description: "Distribute resources and raise awareness in the community",
    location: "Various Locations",
    duration: "2 hours",
    slots: ["11:00 AM", "03:00 PM"],
    requiredTraining: true
  },
  {
    id: 4,
    title: "Administrative Support",
    description: "Help with paperwork, data entry, and office tasks",
    location: "Main Office",
    duration: "2 hours",
    slots: ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"],
    requiredTraining: false
  }
];

export default function VolunteerSchedulePage() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [email, setEmail] = useState(user?.email || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVolunteerSignup = async () => {
    if (!selectedOpportunity || !selectedSlot || !email) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create volunteer record
      const volunteerRecord = {
        user_id: user?.id,
        email: email,
        opportunity_id: selectedOpportunity.id,
        opportunity_title: selectedOpportunity.title,
        slot: selectedSlot,
        date: new Date().toISOString(),
        hours: parseInt(selectedOpportunity.duration),
        status: 'confirmed'
      };

      // Update user's volunteer hours
      if (user) {
        const currentHours = user.volunteer_hours || 0;
        const newHours = currentHours + volunteerRecord.hours;
        
        dataService.updateUser(user.id, {
          volunteer_hours: newHours,
          last_volunteer_date: new Date().toISOString()
        });

        // Check for volunteer badges
        const { checkAndAwardBadges } = await import('../components/BadgeChecker');
        checkAndAwardBadges(user);
      }

      // Show success message
      alert(`Thank you! You've signed up for ${selectedOpportunity.title} at ${selectedSlot}`);
      
      // Reset form
      setSelectedOpportunity(null);
      setSelectedSlot(null);
      
    } catch (error) {
      console.error("Volunteer signup error:", error);
      alert("There was an error signing you up. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-teal-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex p-4 rounded-full bg-teal-100 mb-6"
          >
            <Calendar className="w-12 h-12 text-teal-600" />
          </motion.div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {language === "fr" ? "Calendrier des Bénévoles" : "Volunteer Schedule"}
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            {language === "fr" 
              ? "Choisissez une opportunité de bénévolat et réservez votre créneau"
              : "Choose a volunteer opportunity and book your time slot"}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Volunteer Opportunities */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {language === "fr" ? "Opportunités Disponibles" : "Available Opportunities"}
            </h2>
            <div className="space-y-4">
              {volunteerOpportunities.map((opportunity, idx) => (
                <motion.div
                  key={opportunity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card 
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedOpportunity?.id === opportunity.id 
                        ? 'ring-2 ring-teal-500 border-teal-300' 
                        : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedOpportunity(opportunity)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-foreground">
                          {opportunity.title}
                        </h3>
                        {opportunity.requiredTraining && (
                          <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                            {language === "fr" ? "Formation requise" : "Training Required"}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-foreground/70 mb-4">
                        {opportunity.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-foreground/60">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {opportunity.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {opportunity.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {opportunity.slots.length} {language === "fr" ? "créneaux" : "slots"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Booking Section */}
          <div>
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {language === "fr" ? "Réserver votre temps" : "Book Your Time"}
                </h2>
                
                {selectedOpportunity ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">
                        {selectedOpportunity.title}
                      </h3>
                      <p className="text-foreground/70 mb-4">
                        {selectedOpportunity.description}
                      </p>
                    </div>

                    {/* Time Slots */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">
                        {language === "fr" ? "Choisir un créneau horaire:" : "Select a time slot:"}
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedOpportunity.slots.map((slot) => (
                          <motion.button
                            key={slot}
                            onClick={() => setSelectedSlot(slot)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`p-3 text-center rounded-lg border-2 transition-all ${
                              selectedSlot === slot
                                ? "bg-teal-500 text-white border-teal-500"
                                : "border-gray-300 hover:border-teal-300"
                            }`}
                          >
                            {slot}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Email Input */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {language === "fr" ? "Adresse email" : "Email Address"} *
                      </label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full"
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      onClick={handleVolunteerSignup}
                      disabled={!selectedSlot || !email || isSubmitting}
                      className="w-full bg-teal-500 hover:bg-teal-600 text-white"
                    >
                      {isSubmitting 
                        ? (language === "fr" ? "Inscription..." : "Signing up...")
                        : (language === "fr" ? "S'inscrire comme bénévole" : "Sign up to Volunteer")
                      }
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-foreground/60">
                      {language === "fr" 
                        ? "Sélectionnez une opportunité de bénévolat pour commencer"
                        : "Select a volunteer opportunity to get started"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}