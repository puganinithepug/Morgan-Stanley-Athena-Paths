import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, MapPin, Heart, Mail, ExternalLink, ShoppingBag } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    alert("Thank you for subscribing! We'll keep you updated.");
    setEmail("");
  };

  return (
    <footer>
      <div className="bg-primary-dark text-white">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                    to="/services"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/news"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    News & Events
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
                <li>
                  <Link
                    to="/are-you-a-victim"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Are you a victim?
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/lilac-gala"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Lilac Gala 2025
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
              {/* Phone numbers verified: Guide d'information – Violence conjugale (CSN) and Guide des Relations Interculturelles */}
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-red-400">
                Need Help?
              </h3>
              <p className="text-white/80 text-sm mb-4">
                If you are in danger, call emergency services or our telephone helpline immediately in case of crisis.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white mb-1">
                      Police
                    </div>
                    <a
                      href="tel:911"
                      className="text-white/80 hover:text-white"
                    >
                      9-1-1
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white mb-1">
                      S.O.S. Violence conjugale
                    </div>
                    <a
                      href="tel:514-873-9010"
                      className="text-white/80 hover:text-white"
                    >
                      514-873-9010
                    </a>
                    <div className="text-white/70 text-xs mt-1">
                      or 1-800-363-9010
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white mb-1">
                      Sexual Violence Help Lines
                    </div>
                    <div className="text-white/80">
                      Montreal: <a href="tel:514-270-2900" className="hover:text-white">514-270-2900</a>
                    </div>
                    <div className="text-white/80">
                      Laval: <a href="tel:450-688-2117" className="hover:text-white">450-688-2117</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* External Donation Links */}
          <div className="md:col-span-4 border-t border-white/15 mt-8 pt-8">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-semibold text-white text-center mb-6">Ways to Support</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <a
                  href="https://www.canadahelps.org/en/dn/27709"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Heart className="w-5 h-5 text-highlight" />
                  <div className="flex-1">
                    <div className="font-semibold text-white">Donate via Canada Helps</div>
                    <div className="text-white/70 text-sm">Secure online donations</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/60" />
                </a>
                <div className="flex items-center gap-3 p-4 bg-white/10 rounded-lg opacity-75">
                  <ShoppingBag className="w-5 h-5 text-highlight" />
                  <div className="flex-1">
                    <div className="font-semibold text-white">Shop on Shopify</div>
                    <div className="text-white/70 text-sm">Cookbooks & paintings (Coming soon)</div>
                  </div>
                </div>
                <Link
                  to="/membership"
                  className="flex items-center gap-3 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Heart className="w-5 h-5 text-highlight" />
                  <div className="flex-1">
                    <div className="font-semibold text-white">Become a Member</div>
                    <div className="text-white/70 text-sm">Annual membership</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="md:col-span-4 border-t border-white/15 mt-8 pt-8">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Mail className="w-5 h-5 text-highlight" />
                <h3 className="text-xl font-semibold text-white">Stay Updated</h3>
              </div>
              <p className="text-white/80 text-center mb-4 text-sm">
                Subscribe to our newsletter for the latest news, events, and updates
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-white/10 border-white/30 text-white placeholder-white/60 focus:border-highlight"
                />
                <Button
                  type="submit"
                  className="bg-highlight text-foreground hover:bg-highlight/90 whitespace-nowrap"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          <div className="md:col-span-4 border-t border-white/15 mt-8 pt-8 text-center text-sm text-gray-400">
            <p className="flex items-center justify-center gap-2 mb-2">
              Designed for Shield of Athena{" "}
              <Heart className="w-4 h-4 text-red-400" />
            </p>
            <p>
              &copy; {new Date().getFullYear()} Shield of Athena Family Services. Registered charity: 138823471RR0001
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
