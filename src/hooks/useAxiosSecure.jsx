import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL: 'https://job-portal-server-for-recruiter-part3-phi.vercel.app',
    withCredentials: true
  });

  const useAxiosSecure = () => {
    const {signOutUser}=useAuth();
    const navigate = useNavigate();
    
    useEffect(()=>{
        axiosInstance.interceptors.response.use(response=>{

            return response;
        }, error=>{
            if(error.status === 401 || error.status == 403){

                console.log('need to logout user');
                signOutUser()
                .then(()=>{
                    console.log('logout user');
                    navigate('/signIn');
                })
                .catch(error=>{
                    console.log(error);
                })
            }
            console.log('error caught in interceptors', error);
            return Promise.reject(error);
        })
    },[])
    return axiosInstance;
};

export default useAxiosSecure;