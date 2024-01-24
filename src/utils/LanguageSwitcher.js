import { useRouter } from "next/router";
import React, { useState } from "react";
import { useTranslation } from "next-i18next";

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation("navbar");

  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const router = useRouter();

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (locale) => {
    onLanguageChange(locale);
    router.push(router.asPath, router.asPath, { locale });
    setIsOpen(false);
  };

  const onLanguageChange = (languageChange) => {
    setSelectedLanguage(languageChange);
    setIsOpen(false);
    i18n.changeLanguage(languageChange);
  };

  return (
    <div className="absolute top-0 right-0 px-10 mt-2 text-left bg-blue-400">
      <div>
        <button
          type="button"
          className="flex items-center space-x-2 text-white font-semibold focus:outline-none  mt-10 bg-red-500  px-4 py-1 rounded-md "
          onClick={handleDropdownToggle}
        >
          <span>{selectedLanguage === "en" ? "English" : "العربية"}</span>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-10 mt-1 w-24 rounded-md shadow-lg bg-red-500 text-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="none">
            <button
              className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              role="menuitem"
              onClick={() => changeLanguage("en")}
            >
              English
            </button>

            <button
              className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              role="menuitem"
              onClick={() => changeLanguage("ar")}
            >
              العربية
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
