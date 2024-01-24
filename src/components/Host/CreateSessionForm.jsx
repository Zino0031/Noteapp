import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSession } from '@/redux/appSlice';
import PreviewModal from './PreviewModal';
import ButtonList from './ButtonList';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

const CreateSessionForm = ({ setShowCreateSession }) => {
  const { t } = useTranslation('host');

  const dispatch = useDispatch();
  const [selectedButtonList, setSelectedButtonList] = useState('standardButtons');
  const [sessionData, setSessionData] = useState({
    name: '',
    description: '',
    selectedButtons: [],
  });
  const [previewData, setPreviewData] = useState(null);
  const [isPreviewModalOpen, setPreviewModalOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const handleButtonClick = (action) => {
    if (selectedButtonList === 'standardButtons') {
      setSessionData({
        ...sessionData,
        selectedButtons: ['Question', `I'm lost`, 'Aha!', 'Reference', 'Comment'],
      });
      return;
    }
   

    const updatedButtons = sessionData.selectedButtons.includes(action)
      ? sessionData.selectedButtons.filter((btn) => btn !== action)
      : [...sessionData.selectedButtons, action];

    setSessionData({
      ...sessionData,
      selectedButtons: updatedButtons,
    });
  };
  const isFormValid = sessionData.name.trim() !== '' && sessionData.description.trim() !== '';
  const handleCreateSession = async () => {
    try {
      if (!isFormValid) {
        toast.error('Please fill out all the required fields.');
        return;
      }
      const code = generateCode();
      const pin = generatePin();

      const buttonsToDispatch =
        selectedButtonList === 'standardButtons'
          ? ['Question', `I'm lost`, 'Aha!', 'Reference', 'Comment']
          : sessionData.selectedButtons;

      const previewData = {
        ...sessionData,
        code,
        pin,
        selectedButtons: buttonsToDispatch,
      };

      setPreviewData(previewData);
      setPreviewModalOpen(true);
      setFormError('');
    } catch (error) {
      console.error('Error creating session:', error.message);
    }
  };

  const handleEditSession = () => {
    setPreviewModalOpen(false);
  };

  const handleConfirmCreate = async () => {
    await dispatch(createSession(previewData));
    setPreviewModalOpen(false);
    setShowCreateSession(false)
    setSessionData({
      name: '',
      description: '',
      selectedButtons: [],
    });
  };

  const generateCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const codeLength = 6;
    let code = '';
    for (let i = 0; i < codeLength; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  const generatePin = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 ">
      <label className="block mb-4">

        <input
          type="text"
          required
          placeholder={t('namePlaceholder')}
          value={sessionData.name}
          onChange={(e) => setSessionData({ ...sessionData, name: e.target.value })}
          className="block w-full mt-1 p-2 border rounded-md"
        />
      </label>
      <label className="block mb-4">
        <textarea
          placeholder={t('descriptionPlaceholder')}
          required
          value={sessionData.description}
          onChange={(e) => setSessionData({ ...sessionData, description: e.target.value })}
          className="block w-full mt-1 p-2 border rounded-md"
        />
      </label>

      <label className="block mb-4">
        <select
          value={selectedButtonList}
          onChange={(e) => {
            setSelectedButtonList(e.target.value);
            setSessionData({
              ...sessionData,
              [e.target.value]: [],
            });
          }}
          className="block w-full mt-1 p-2 border rounded-md"
        >
          <option value="standardButtons">{t('standardButtons')}</option>
          <option value="favoriteButtons">{t('favoriteButtons')}</option>
        </select>
      </label>

      <ButtonList
        selectedButtonList={selectedButtonList}
        handleButtonClick={handleButtonClick}
      />
<div className='justify-center items-center flex flex-col'>

      <button
        onClick={handleCreateSession}
      
        className=" mt-4 p-2 bg-[#01A1E4] text-white rounded-md cursor-pointer hover:bg-[#1184b6]"
        >
      {t('previewSessionButton')}
      </button>
      <ToastContainer />
          </div>

      {isPreviewModalOpen && (
        <PreviewModal
          previewData={previewData}
          handleEditSession={handleEditSession}
          handleConfirmCreate={handleConfirmCreate}
        />
      )}
    </div>
  );
};

export default CreateSessionForm;
