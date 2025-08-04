import axios from 'axios';
import { Box, Button, Flex, Heading, Stack, Text, Textarea, useToast } from '@chakra-ui/react';
import React, { useState , useEffect } from 'react'
import Loader from '../Loader/Loader';
const Settings = () => {
  const [value, setValue] = useState();
  
  const headers = {
      authentication : `Bearer ${localStorage.getItem('token')}`,
      id : localStorage.getItem('id')
  }
  const handleChange = (e)=>{
      const {name , value} = e.target;
      setValue(prev =>({...prev, [name]:value}));
  }
  const toast = useToast();
  const updateAddress = async(e)=>{
      e.preventDefault();
    const response = await axios.put("http://localhost:8081/api/v1/update-address" , value , {headers});
    toast({
      title: response.data.message,
      status: 'success',
      duration: 5000,
      position:'top',
      isClosable: true,
    })
      // console.log(response.data.message);
  }
  useEffect(()=>{
    window.scrollTo(0, 0);
      const fetch = async()=>{
          const response = await axios.get("http://localhost:8081/api/v1/get-user-info" , {headers});
          
          setValue(response.data.data);
          
      }
      fetch();
  },[])

  return (
    
    <>
      {!value ? (
  <Flex 
    w="100%" h="100%" 
    align="center" 
    justify="center"
    bg="gray.50"
  >
    <Loader size="xl" color="yellow.500" />
  </Flex>  
) : (
          <Box 
            maxW="800px" mx="auto" 
            p={8} bg="white"
            borderRadius="lg" boxShadow="lg"
          >
            <Heading 
              as="h2" size="xl" 
              mb={8} color="yellow.700"
              borderBottom="2px solid"
              borderColor="yellow.700"
              pb={2}
            >
              Account Settings
            </Heading>

            <Stack spacing={6}>
              <Box>
                <Text fontSize="lg" fontWeight="bold" color="gray.500">Username :</Text>
                <Text fontSize="2xl" color="gray.800">{value.username}</Text>
              </Box>

              <Box>
                <Text fontSize="lg" fontWeight="bold" color="gray.500">Email : </Text>
                <Text fontSize="2xl" color="gray.800">{value.email}</Text>
              </Box>

              <Box>
                <Text fontSize="lg" fontWeight="bold" color="gray.500" mb={2}>
                  Address
                </Text>
                <Textarea
                  rows={4}
                  name="address"
                  value={value.address}
                  onChange={handleChange}
                  fontSize="lg"
                  borderColor="gray.300"
                  _hover={{ borderColor: "yellow.400" }}
                  _focus={{ 
                    borderColor: "yellow.500",
                    boxShadow: "0 0 0 1px yellow.500"
                  }}
                />
              </Box>

              <Button
                colorScheme="yellow"
                size="lg"
                onClick={updateAddress}
                mt={4}
               
              >
                Update Address
              </Button>
            </Stack>
          </Box>
        )}
    </>
  )
}

export default Settings