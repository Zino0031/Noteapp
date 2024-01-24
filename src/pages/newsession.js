import React, { useState } from 'react';
import CreateSessionForm from '@/components/Host/CreateSessionForm';
import Hostinfo from '@/containers/Hostinfo';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Newsession = () => {
  const [showCreateSession, setShowCreateSession] = useState(true);

  const handleConfirmCreate = () => {
    setShowCreateSession(false);
  };

  const handleEditSession = () => {
    setShowCreateSession(true);
  };

  return (
    <div>
      {showCreateSession ? (
        <CreateSessionForm setShowCreateSession={setShowCreateSession} />
      ) : (
        <Hostinfo />
      )}
    </div>
  );
};

export default Newsession;

export async function getStaticProps({ locale }) {
  return {
      props: {
          ...(await serverSideTranslations(locale, ["host"])),
      },
  };
}