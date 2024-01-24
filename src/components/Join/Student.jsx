import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import ActionButton from '@/components/Join/Buttons/ActionButton';
import InputButton from '@/components/Join/Buttons/InputButton';

const Student = () => {
const router = useRouter();
const { id } = router.query;


const session = useSelector((state) => state.sessions.find((s) => s.code === id));
const Buttons  = session.selectedButtons





return (
<div className='flex flex-col gap-3 justify-center items-center'>
   {Buttons.map((btn, index) => {
            if (btn === 'Comment' || btn === 'Question') {
              return <InputButton key={index} type={btn} />;
            } else if (btn === "Aha!" || btn === "I'm lost" || btn === 'Reference') {
              return <ActionButton key={index} action={btn} />;
            }
            return null;
          })}   
          </div> 
    )
}

export default Student;