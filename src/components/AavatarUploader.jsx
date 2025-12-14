/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAvatar } from '../../RTK/profileSlice';

export default function AvatarUploader() {
  const dispatch = useDispatch();
  const avatar = useSelector((state) => state.avatar.avatar || null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      dispatch(setAvatar(event.target.result));
    };

    reader.readAsDataURL(file);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
      {avatar ? (
        <img
          src={avatar}
          alt="avatar preview"
          style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: '50%' }}
        />
      ) : (
        <div
          style={{
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: '#eee',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666',
            fontSize: 14,
          }}
        >
          Пусто
        </div>
      )}

      <label htmlFor="upload-photo" style={{ cursor: 'pointer' }}>
        Загрузить фото
      </label>

      <input
        id="upload-photo"
        name="photo"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
}
