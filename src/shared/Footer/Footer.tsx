import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                {/* Brand */}
                <div>
                    <h3 className="text-xl font-bold text-primary mb-3">
                        Care Home
                    </h3>
                    <p className="text-sm text-base-content/70">
                        Providing compassionate, professional care in a safe and
                        welcoming environment where residents feel truly at home.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="font-semibold mb-3">
                        Quick Links
                    </h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link className="link link-hover" to='/'>Home</Link></li>
                        <li><Link className="link link-hover" to='/about'>About Us</Link></li>
                        <li><Link className="link link-hover" to='/services'>Services</Link></li>
                        <li><Link className="link link-hover" to='/contact'>Contact</Link></li>

                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h4 className="font-semibold mb-3">
                        Our Services
                    </h4>
                    <ul className="space-y-2 text-sm">
                        <li>Residential Care</li>
                        <li>Dementia Care</li>
                        <li>Assisted Living</li>
                        <li>Nursing Support</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="font-semibold mb-3">
                        Contact Us
                    </h4>
                    <ul className="space-y-2 text-sm text-base-content/70">
                        <li>📍 123 Care Street, City</li>
                        <li>📞 +1 234 567 890</li>
                        <li>✉️ info@carehome.com</li>
                        <li>🕒 Mon – Sun, 24/7</li>
                    </ul>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="border-t border-base-300">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-base-content/60">
                    <p>
                        © {new Date().getFullYear()} Care Home. All rights reserved.
                    </p>

                    <div className="flex gap-4">
                        <a className="link link-hover">Privacy Policy</a>
                        <a className="link link-hover">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
