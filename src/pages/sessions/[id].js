import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

const SessionPage = () => {

const router = useRouter();
const { id } = router.query;


const session = useSelector((state) => state.sessions.find((s) => s.code === id));




if (!session) {
  
    return <div>Session not found</div>;
}

return (
    <div>

    <h1>{session.name}</h1>
    <p>{session.description}</p>

    </div> 
    )};

export default SessionPage;