import React, { useState, useEffect } from 'react';
import { useContent } from '../../contexts/ContentContext';
import { useAdmin } from '../../hooks/useAdmin';

const EditableText = ({ 
  contentKey, 
  defaultValue = '', 
  className = '', 
  tag: Tag = 'span',
  placeholder = 'Clicca per modificare...',
  multiline = false
}) => {
  const [isClient, setIsClient] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  // Assicurati che il componente sia montato lato client
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Usa il context solo lato client
  let getContent, updateContent, isAdmin;
  try {
    const contentContext = useContent();
    const adminContext = useAdmin();
    getContent = contentContext.getContent;
    updateContent = contentContext.updateContent;
    isAdmin = adminContext.isAdmin;
  } catch (error) {
    // Durante SSR o se il context non è disponibile
    getContent = () => defaultValue;
    updateContent = async () => ({ success: false });
    isAdmin = false;
  }

  const content = isClient ? getContent(contentKey, defaultValue) : defaultValue;

  const handleEdit = () => {
    if (!isAdmin) return;
    setEditValue(content);
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const success = await updateContent(contentKey, editValue);
    if (success) {
      setIsEditing(false);
    }
    setIsSaving(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing && isAdmin) {
    const InputComponent = multiline ? 'textarea' : 'input';
    return (
      <InputComponent
        type={multiline ? undefined : 'text'}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={`${className} border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        placeholder={placeholder}
        autoFocus
        disabled={isSaving}
        style={multiline ? { minHeight: '60px', resize: 'vertical' } : {}}
      />
    );
  }

  return (
    <Tag 
      className={`${className} ${isAdmin ? 'cursor-pointer hover:bg-gray-100 rounded px-1' : ''}`}
      onClick={handleEdit}
      title={isAdmin ? 'Clicca per modificare' : undefined}
    >
      {content || placeholder}
      {isSaving && <span className="ml-2 text-sm text-gray-500">Salvando...</span>}
    </Tag>
  );
};

export default EditableText;