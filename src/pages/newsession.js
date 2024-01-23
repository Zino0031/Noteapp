import React, { useState } from 'react';
import CreateSessionForm from '@/components/Host/CreateSessionForm';
import Hostinfo from '@/containers/Hostinfo';


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
