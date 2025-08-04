import { Box, Flex, SimpleGrid, Link as ChakraLink, Text, Button, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, 
  AlertDialog, MenuList, MenuButton, Menu, MenuItem } from '@chakra-ui/react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import { FaExternalLinkAlt } from "react-icons/fa";
import { CheckIcon, ChevronDownIcon } from '@chakra-ui/icons';

const AllOrders = () => {
  const [allorder , setAllorder] = useState();
  const [userData , setUserData] = useState();
  const [viewDetails , setViewDetails] = useState(false);
  const [loading , setLoading] = useState(true);

  const headers = {
    id : localStorage.getItem('id'),
    authentication : `Bearer ${localStorage.getItem('token')}`
  }

  const statusOptions = [
    'order placed',
    'out for delivery',
    'Delivered',
    'Canceled'
  ];
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:8081/api/v1/update-status/${orderId}`,
        { status: newStatus },
        { headers }
      );
      
      // Update local state
      setAllorder(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'order placed': return 'yellow.500';
      case 'Delivered': return 'green.500';
      case 'out for delivery': return 'blue.500';
      case 'Canceled': return 'red.500';
      default: return 'gray.500';
    }
  };

  

  useEffect(()=>{
    window.scrollTo(0, 0);
      const fetch = async()=>{
          try{
            const response = await axios.get('http://localhost:8081/api/v1/get-all-orders', {headers});
            setAllorder(response.data.data);
            // console.log(response.data.data);
          }catch(err){
            console.log(err);
          }
      }
      fetch();
  },[])
  const handleGetUserDetails = async(userId)=>{
    try{
      const response = await axios.get(`http://localhost:8081/api/v1/get-user-info/${userId}` , {headers});
      setUserData(response.data.data);
      setViewDetails(true);
    }catch(err){
      console.log(err);
    }finally{
      setLoading(false);
    }
  }

  
  
  return (
    <>
      {!allorder && 
      <Flex w = "100%" minH="100%" justify={'center'} align={'center'}>
        <Loader/>
      </Flex>
      }
      {
        (allorder && allorder.length === 0) && 
        <Flex w = "100%" minH="100%" justify={'center'} align={'center'}>
          <Box>No Order Found</Box>
        </Flex>
      }
      {
        (allorder && allorder.length > 0) && 
        <Box p={4} maxW="1200px" mx="auto"  bg='yellow.50'>
          <Box>
            <Text fontSize={'4xl'} fontWeight={'bold'}p={2} mb={2}>All Orders</Text>
          </Box>
      <SimpleGrid columns={{ base: 3, md: 6 }} bg='blackAlpha.300' p={4} spacing={4} alignItems="center">
        {/* Header Row */}
        <Text fontWeight="bold" >Book</Text>
        <Text fontWeight="bold" display={{ base: 'none', md: 'block' }}></Text>
        <Text fontWeight="bold" display={{ base: 'none', md: 'block' }}>User</Text>
        <Text fontWeight="bold" display={{ base: 'none', md: 'block' }}>Price</Text>
        <Text  fontWeight="bold" ml={3}>Status</Text>
        <Text fontWeight="bold" textAlign={'center'}>Profile</Text>
      </SimpleGrid>
        {/* Order Items */}
        {allorder.map((order, index) => (
          // key={index}
            <SimpleGrid  mt={4} p={2} key={index} _hover={{textDecoration:'none' ,color:'none'}}
            columns={{ base: 3, md: 6 }} spacing={4}  alignItems="center"  bg='blackAlpha.400'>
              <Box gridColumn={{ base : 'span 1' , md:'span 2'}}  >
                <Text fontWeight="medium" fontSize={{ base: 'sm', md: 'md' }} >{order.book?.title || "N/A"}</Text>
              </Box>
            
              <Box  display={{ base: 'none', md: 'block' }} >

                <Text  color="black" fontSize={{ base: 'sm', md: 'md' }} noOfLines={2}>
                  {order.user?.username}
                </Text>
              </Box>
              

              <Box   display={{ base: 'none', md: 'block' }} >
                <Text fontWeight="semibold" fontSize="md" color="black">₹{order.book?.price || order.total || "N/A"}</Text>
              </Box>

              {/* //oreder status  */}
              <Box>
                <Menu>
                  <MenuButton 
                    as={Button} 
                    colorScheme={getStatusColor(order.status).split('.')[0]}
                    variant="ghost"
                    textTransform="capitalize"
                  >
                    {order.status}
                    <ChevronDownIcon boxSize={6}/>
                  </MenuButton>
                  <MenuList>
                    {statusOptions.map(option => (
                      <MenuItem 
                        key={option}
                        onClick={() => handleStatusUpdate(order._id, option)}
                        textTransform="capitalize"
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </Box>

              <AlertDialog
                 isOpen={viewDetails}     
                  onClose={() => setViewDetails(false)}
                  motionPreset="none"
                  >
                    <AlertDialogOverlay bg="whiteAlpha.50" backdropFilter="blur(4px)">

                      <AlertDialogContent bg="rgba(255, 255, 255, 0.92)">
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                          User Details
                                          
                        </AlertDialogHeader>
                        <AlertDialogCloseButton />
                        {
                          loading && 
                          <AlertDialogBody>
                              <Loader/>
                          </AlertDialogBody>
                        }
                          <AlertDialogBody>
                            <strong>User Name : </strong>
                          {userData?.username}
                            </AlertDialogBody>
                          <AlertDialogBody>
                           <strong>
                             Email :   </strong>
                            {userData?.email}
                          </AlertDialogBody>
                          <AlertDialogBody>
                            <strong>
                                Address :  </strong>
                            {userData?.address}
                          </AlertDialogBody>
                        
                     </AlertDialogContent>
                    </AlertDialogOverlay>
              </AlertDialog>

              <Flex justify={'center'} >
                <Text  fontWeight="semibold" fontSize='md' color="black" >
                
                  <FaExternalLinkAlt onClick={() => {
                    handleGetUserDetails(order.user?._id)
                  }}/>
                </Text>
              </Flex>
            </SimpleGrid>
          
        ))}
      
    </Box>
      }
    </>
  )
}

export default AllOrders