import * as React from "react";
import LanguageSwitcher from "./LanguageSwitcher";


export default function Layout({ children }) {
    return (
        <>
      <LanguageSwitcher />
            {children}
        </>
    );
}