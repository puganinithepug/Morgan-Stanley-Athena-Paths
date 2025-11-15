import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

/* -------------------- VIDEO EMBED COMPONENT -------------------- */
function VideoEmbed({ videoId }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
          className="absolute top-0 left-0 w-full h-full rounded-xl shadow-xl"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
/* --------------------------------------------------------------- */

export default function Home() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      {/* -------------------- HERO SECTION -------------------- */}
      <section className="relative bg-gradient-to-b from-purple-50 to-white py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight"
          >
            {language === 'fr'
              ? 'Chaque femme mérite sécurité, guérison et soutien.'
              : 'Every woman deserves safety, healing, and support.'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto"
          >
            {language === 'fr'
              ? "Avec votre contribution, vous aidez à fournir des services essentiels pour soutenir les survivantes de violences."
              : "With your contribution, you help provide essential support services to women experiencing violence."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-10 flex justify-center"
          >
            <a
              href="#ways-to-help"
              className="px-8 py-4 bg-purple-600 text-white rounded-xl font-semibold shadow hover:bg-purple-700 transition flex items-center gap-2"
            >
              {language === 'fr' ? 'Comment aider' : 'How You Can Help'}
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* -------------------- INSERTED INTRO VIDEO -------------------- */}
      <VideoEmbed videoId="WGND5Fvt2NA" />

      {/* -------------------- WAYS TO HELP SECTION -------------------- */}
      <section id="ways-to-help" className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-12">
            {language === 'fr' ? 'Choisissez comment aider' : 'Choose How You Want to Help'}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* OPTION 1 */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="p-8 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer border border-gray-200"
            >
              <div className="text-purple-600 mb-4">
                <Heart className="w-10 h-10 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center">
                {language === 'fr' ? 'Aidons à Guérir' : 'Help Provide Healing'}
              </h3>
            </motion.div>

            {/* OPTION 2 */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="p-8 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer border border-gray-200"
            >
              <div className="text-blue-600 mb-4">
                <Users className="w-10 h-10 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center">
                {language === 'fr' ? 'Soutien et Accompagnement' : 'Support & Advocacy'}
              </h3>
            </motion.div>

            {/* OPTION 3 */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="p-8 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer border border-gray-200"
            >
              <div className="text-rose-600 mb-4">
                <Heart className="w-10 h-10 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center">
                {language === 'fr' ? 'Sécurité et Logement' : 'Safety & Shelter'}
              </h3>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

