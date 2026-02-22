// components/supplier/SupplierContact.jsx
import { FiMail, FiPhone, FiGlobe, FiMapPin } from "react-icons/fi";
import {
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa";

const SupplierContact = ({ supplier }) => {
  const socialIcons = {
    facebook: FaFacebook,
    linkedin: FaLinkedin,
    youtube: FaYoutube,
    instagram: FaInstagram,
    pinterest: FaPinterest,
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Contact Information</h3>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <FiMail className="text-gray-400 mt-1" size={18} />
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <a
              href={`mailto:${supplier.contact.email}`}
              className="text-[#FF6600] hover:underline"
            >
              {supplier.contact.email}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FiPhone className="text-gray-400 mt-1" size={18} />
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <a href={`tel:${supplier.contact.phone}`} className="text-gray-700">
              {supplier.contact.phone}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FiGlobe className="text-gray-400 mt-1" size={18} />
          <div>
            <p className="text-sm text-gray-500">Website</p>
            <a
              href={`https://${supplier.contact.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF6600] hover:underline"
            >
              {supplier.contact.website}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FiMapPin className="text-gray-400 mt-1" size={18} />
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="text-gray-700">{supplier.location}</p>
          </div>
        </div>
      </div>

      {/* Social Media */}
      {Object.keys(supplier.socialMedia).length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <h4 className="font-medium mb-3">Connect on Social Media</h4>
          <div className="flex gap-3">
            {Object.entries(supplier.socialMedia).map(([platform, link]) => {
              const Icon = socialIcons[platform];
              return Icon ? (
                <a
                  key={platform}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#FF6600] hover:text-white transition"
                >
                  <Icon size={16} />
                </a>
              ) : null;
            })}
          </div>
        </div>
      )}

      {/* Contact form placeholder */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-2">
          Prefer to send a message directly?
        </p>
        <button className="bg-[#FF6600] text-white px-4 py-2 rounded-md text-sm hover:bg-[#e65c00]">
          Contact Supplier
        </button>
      </div>
    </div>
  );
};

export default SupplierContact;
