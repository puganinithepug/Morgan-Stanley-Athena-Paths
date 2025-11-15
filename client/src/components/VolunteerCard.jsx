import React from "react";
import { Card, CardContent } from "./ui/Card";
import { Button } from "./ui/Button";
import { Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function VolunteerCard() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden border-2 border-primary/30 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
        <div className="bg-gradient-to-r from-primary-dark to-primary p-6 text-white">
          <div className="flex items-center gap-3">
            <Calendar className="w-10 h-10" />
            <div>
              <h3 className="text-2xl font-bold">Donate Your Time</h3>
              <p className="text-white/80 text-sm">
                Volunteer for crisis line shifts, events, or support activities
              </p>
            </div>
          </div>
        </div>

        <CardContent className="p-6 space-y-4">
          <p className="text-sm text-foreground/70 leading-relaxed">
            Choose a time slot that fits your schedule and help make a direct
            impact by offering your time to support survivors.
          </p>

          <Button
            onClick={() => navigate("/volunteer-schedule")}
            className="w-full bg-primary text-white hover:bg-primary/90 flex items-center justify-center"
          >
            Choose a Shift
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
