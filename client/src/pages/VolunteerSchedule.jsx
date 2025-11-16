import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { motion } from "framer-motion";

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM",
  "03:00 PM", "04:00 PM", "05:00 PM"
];

export default function VolunteerSchedulePage() {
  const [selectedSlot, setSelectedSlot] = useState(null);

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6">Choose a Volunteer Shift</h1>
      <p className="text-foreground/70 mb-8">
        Select a time slot that fits your availability.
      </p>

      <Card className="border border-primary/20">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {timeSlots.map((slot) => (
              <motion.button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className={`p-3 text-center rounded-lg border-2 transition-all ${
                  selectedSlot === slot
                    ? "bg-primary text-white border-primary"
                    : "border-foreground/20 hover:border-primary"
                }`}
              >
                {slot}
              </motion.button>
            ))}
          </div>

          {selectedSlot && (
            <div className="mt-8">
              <Button
                className="w-full bg-primary text-white hover:bg-primary/90"
                onClick={() => alert(`You booked the ${selectedSlot} shift!`)}
              >
                Confirm Shift ({selectedSlot})
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
