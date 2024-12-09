import React, { useState, useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginEmployee } from '../../store/features/authEmployee';
import { checkAuthAndNavigate } from './../../customs/global/manageLocalStorage';
import { unwrapResult } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';

const AnnouncementPage = () => {

    return(
    <h2>Hello World</h2>


    )
  
}

export default AnnouncementPage