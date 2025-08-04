import { Box, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/profile/Sidebar'
import { useEffect } from 'react'
import axios from 'axios'
import Loader from '../components/Loader/Loader'

const Profile = () => {
  const [data , setData] = useState();
  const headers = {
    authentication : `Bearer ${localStorage.getItem('token')}`,
    id : localStorage.getItem('id')
  }
    useEffect(()=>{
        const fetch = async()=>{
          try{

            const response = await axios.get(  `${import.meta.env.VITE_API_URL}/api/v1/get-user-info` , {headers});
            
            setData(response.data.data);
          
        }catch(err){
          console.log(err.message);
        }
      }
        fetch();
    },[])


  return (
   
    
     
        <Flex  px={{ base: 2, md: 10 }} direction={{ base: 'column', md: 'row' }} 
          py={{ base: 4, md: 6 }} minH={'100vh'}>

          
            
              <>
                <Box w={{ base: '100%', md: '20%' }} bg='yellow.100' p={2}>
                  <Sidebar data={data}/>
                </Box>
                <Box w={{ base: '100%', md: '80%' }} bg="blackAlpha.200" p={2}>
                  <Outlet />
                  {
                    (!data && !localStorage.getItem('token')) && (
                      <Flex w = "100%" minH="100%" justify={'center'} align={'center'}>
                        <Loader />
                      </Flex>
                    )
                  }
                  
                </Box>
              </>
            
          
        </Flex>
     
    
    )
}

export default Profile