import * as React from "react";
import LanguageSwitcher from "./LanguageSwitcher";


export default function Layout({ children }) {
    return (
        <>
        <div className="bg-red-600">
      <LanguageSwitcher />
        </div>
            {children}
        </>
    );
}