import React from "react";
import { Link } from "react-router-dom";
import { Phone, MapPin, Heart } from "lucide-react";

export default function Footer() {

  return (
    <footer>
      <div className="bg-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src={"/logo.svg"}
                  alt="Shield of Athena"
                  className="w-7 h-7 flex-shrink-0 object-contain filter invert brightness-200"
                />
                <div>
                  <div className="font-bold text-lg">
                    Shield of Athena
                  </div>
                </div>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                The Shield of Athena Family Services is a non-profit community organization offering culturally and linguistically adapted professional support, intervention, and prevention services to women victims of family violence and their children.
                {/* Source: https://www.canadahelps.org/fr/organismesdebienfaisance/le-bouclier-dathena-the-shield-of-athena/impact/view/ */}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/landing"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/find-your-path"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Find Your Path
                  </Link>
                </li>
                <li>
                  <Link
                    to="/leaderboard"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Community Impact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/support-wall"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Hope Wall
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Contact</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white mb-1">
                      Montreal Office
                    </div>
                    <a
                      href="tel:514-274-8117"
                      className="text-white/80 hover:text-white"
                    >
                      514-274-8117
                    </a>
                    <div className="text-white/70 text-xs mt-1">
                      1-877-274-8117
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white mb-1">
                      Laval Office
                    </div>
                    <a
                      href="tel:450-688-6584"
                      className="text-white/80 hover:text-white"
                    >
                      450-688-6584
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                  <div className="text-white/80">
                    P.O. BOX 25
                    <br />
                    MONT ROYAL, QC, H3P 3B8
                    <br />
                    <span className="text-xs text-white/70">
                      Registered charity: 138823471RR0001
                      {/* Source: https://www.canadahelps.org/fr/organismesdebienfaisance/le-bouclier-dathena-the-shield-of-athena/impact/view/ */}
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-red-400">
                Need Help?
              </h3>
              <p className="text-white/80 text-sm mb-4">
                If you are in danger, call our telephone helpline immediately in case of crisis.
              </p>
              <div className="space-y-2">
                <a
                  href="tel:514-274-8117"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors w-full justify-center"
                >
                  <Phone className="w-4 h-4" />
                  Montreal: 514-274-8117
                </a>
                <a
                  href="tel:450-688-6584"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors w-full justify-center"
                >
                  <Phone className="w-4 h-4" />
                  Laval: 450-688-6584
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/15 mt-8 pt-8 text-center text-sm text-gray-400">
            <p className="flex items-center justify-center gap-2 mb-2">
              Designed for Shield of Athena{" "}
              <Heart className="w-4 h-4 text-red-400" />
            </p>
            <p>
              &copy; {new Date().getFullYear()} Shield of Athena Family Services. Registered charity.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
