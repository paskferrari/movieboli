import React, { useState } from 'react';
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
  const { getContent, updateContent } = useContent();
  const { isAdmin } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const content = getContent(contentKey, defaultValue);

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

  if (isEditing) {
    const InputComponent = multiline ? 'textarea' : 'input';
    return (
      <div className="relative inline-block w-full">
        <InputComponent
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className={`${className} border-2 border-blue-500 bg-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300`}
          placeholder={placeholder}
          autoFocus
          disabled={isSaving}
          rows={multiline ? 3 : undefined}
          style={{ minWidth: '200px' }} // Assicura una larghezza minima
        />
        {isSaving && (
          <div className="absolute top-0 right-0 p-1">
            <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Tag 
      className={`${className} ${isAdmin ? 'relative cursor-pointer transition-all duration-200 hover:bg-opacity-10 hover:bg-yellow-400 hover:shadow-sm rounded px-1' : ''}`}
      onClick={handleEdit}
      title={isAdmin ? 'Clicca per modificare' : undefined}
    >
      {content || placeholder}
      {isAdmin && (
        <span className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </span>
      )}
    </Tag>
  );
};

export default EditableText;