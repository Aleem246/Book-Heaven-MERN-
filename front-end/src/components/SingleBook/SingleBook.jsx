    import React, { useState,useEffect} from 'react'
    import { Box, Heading, Image, Spinner, Flex, Text ,Stack, Center, Link as ChakraLink , useToast, Button, IconButton} from '@chakra-ui/react'
    import axios from 'axios';
    import { useNavigate, useParams , Link} from 'react-router-dom';
    import { FaArrowLeft, FaDeleteLeft, FaRegHeart } from "react-icons/fa6";
    import {
     AlertDialog,AlertDialogBody,
     AlertDialogFooter,AlertDialogHeader,AlertDialogContent,AlertDialogOverlay,
  AlertDialogCloseButton,
      } from '@chakra-ui/react'
import { useRef } from 'react'
    import { FaCartArrowDown, FaRegEdit } from "react-icons/fa";
    import { MdDelete } from "react-icons/md";
  import { RiShoppingCartLine } from "react-icons/ri";
  import { useSelector } from 'react-redux';

    const SingleBook = ()=>{
        const [data, setData] = useState(null);
        const [isOpen , setIsOpen] = useState(false);
        const[loading , setLoading] = useState(true);
        const {id : bookId} = useParams();
        const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
        const role = useSelector((state)=>state.auth.role);
        const toast = useToast();
        const Navigate = useNavigate();
        useEffect(()=>{
          window.scrollTo(0, 0);
            const fetch = async()=>{
                try{
                   
                    const response = await axios.get(`http://localhost:8081/api/v1/get-book/${bookId}`);
                    setData(response.data.data);
                }catch(err){
                    console.log(err);
                }finally{
                    setLoading(false);
                }
            }
            fetch();
        },[])

        const headers = {
          userid : localStorage.getItem('id'),
          authentication : `Bearer ${localStorage.getItem('token')}`
  
        }
        const headersforuser = {
          id : localStorage.getItem('id'),
          authentication : `Bearer ${localStorage.getItem('token')}`,
          bookid : bookId
        }

        const handleFavourite = async()=>{
           
            try{

              const response = await axios.put(`http://localhost:8081/api/v1/add-fav`, {}, {headers: headersforuser});
              // (response.data.message) && alert(response.data.message);
              toast({
                title: response.data.message,
                status: 'success',
                duration: 5000,
                position:'top',
                isClosable: true,
              })
            }
          catch(err){
            console.log(err);
          }
        }

      
        
        const handleCart = async()=>{
           const fetch = async()=>{
            try{

              const response = await axios.put(`http://localhost:8081/api/v1/add-to-cart`, {}, {headers : headersforuser});
          
              toast({
                title: response.data.message,
                status: 'success',
                duration: 5000,
                position:'top',
                isClosable: true,
              })
            }catch(err){
              console.log(err);
            }
           }
           fetch();
        }
       
        
        const handleDelete = async()=>{
           try{
              const response = await axios.delete('http://localhost:8081/api/v1/delete-book' ,  {headers, data : {bookId}});
              // console.log(response);
              toast({
                title: response.data.message,
                status: 'success',
                duration: 5000,
                position:'top',
                isClosable: true,
              })
              Navigate('/all-books');
            }catch(err){
             toast({
               title: err.response,
               status: 'error', 
               duration: 5000,
               position:'top',
               isClosable: true,
             })
            console.log(err);
           }
        }

        return(
      
          <Box p={4} w={'100%'}  minH="95vh"  >
           
           
            
            <Flex 
              direction={{ base: 'column', md: 'row' }} 
              gap={{ base: 4, lg: 8 }}

              bg="white" mx="auto"
              py={4}
              h="80%"
              px={{ base: 4, md: 8 }}
              borderRadius="xl"
              
              boxShadow="lg"
            >
              {/* <IconButton
        icon={<FaArrowLeft />}
        colorScheme="yellow"
        onClick={() => window.history.back()}
      /> */}
              {/* Book Image Section */}
              
              <Box 
                w={{ base: '100%', md: '50%' }}
             bg='yellow.50'
              display={'flex'}
              
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              h={'80vh'}
              >
                
            
                {loading ? (
                  <Center height="100%">
                    <Stack spacing={4}>
                      <Spinner size="xl" color="brown.500" />
                      <Text fontSize="xl" color="brown.800">Loading book cover...</Text>
                    </Stack>
                  </Center>
                ) : (
                  <>
                  {/* image box  */}
                  <Flex w={'100%'} justify={'flex-start'} >
                    <Button 
                            size={'lg'}
                            leftIcon={<FaArrowLeft />}
                            onClick={() => window.history.back()}
                            variant="outline">
                               Back
                    </Button>

                  </Flex>
                  <Box width="60%"  height={'90%'} p={4} bg={'yellow.100'} >

                  

                    <Image 
                    src={data.url}  alt={data.title} w="100%" h="80%"
                    borderRadius={"lg"} objectFit="cover" />

                    <Flex justify="center" gap={4} mt={8} width="100%">
                  {isLoggedIn && role === "user" && (
                    <>
                      <Button 
                        leftIcon={<FaRegHeart />} 
                        colorScheme="red"
                        variant="outline"
                        onClick={handleFavourite}
                        width="45%"
                      >
                        Favorite
                      </Button>
                      <Button 
                        leftIcon={<FaCartArrowDown />}
                        colorScheme="yellow"
                        onClick={handleCart}
                        width="45%"
                      >
                        Add to Cart
                      </Button>
                    </>
                  )}
                  {isLoggedIn && role === "admin" && (
                    <>
                      <Button
                        as={Link}
                        to={`/edit/${bookId}`}
                        leftIcon={<FaRegEdit />}
                        colorScheme="blue"
                        width="45%"
                      >
                        Edit
                      </Button>
                      <Button
                        leftIcon={<MdDelete />}
                        colorScheme="red"
                        onClick={() => setIsOpen(true)}
                        width="45%"
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </Flex>
                  
                  {/* //conforming to delete */}
                  <AlertDialog
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                    >
                      <AlertDialogOverlay>
                        <AlertDialogContent>
                          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Book
                          </AlertDialogHeader>
                          <AlertDialogCloseButton />
                          <AlertDialogBody>
                            Are you sure you want to delete "{data?.title}"? This action cannot be undone.
                          </AlertDialogBody>
                          <AlertDialogFooter>
                            <Button  onClick={() => setIsOpen(false)}>
                              Cancel
                            </Button>
                            <Button colorScheme='red' onClick={handleDelete} ml={3}>
                              Delete
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                  </AlertDialog>

                  
                    </Box>
                </>
                )}
              </Box>

              {/* Book Details Section */}
              <Box 
                w={{base: '100%', md: '50%'}}
                p={{ base: 4, lg: 8 }}
              //   h="600px"
                bg="yellow.50"
              
              >
                {loading ? (
                  <Center height="100%">
                    <Stack spacing={4}>
                      <Spinner size="xl" color="pink.500" />
                      <Text fontSize="xl" color="pink.800">Loading details...</Text>
                    </Stack>
                  </Center>
                ) : (
                  <Stack spacing={6} >
                    <Heading as="h1" size="2xl" color="brown.800">{data.title}</Heading>
                    
                    <Box>
                      <Text fontSize="xl" fontWeight="bold" color="brown.700">Author:</Text>
                      <Text fontSize="xl">{data.author}</Text>
                    </Box>
                    
                    <Box>
                      <Text fontSize="xl" fontWeight="bold" color="brown.700">Language:</Text>
                      <Text fontSize="xl">{data.lang}</Text>
                    </Box>
                    
                    <Box>
                      <Text fontSize="xl" fontWeight="bold" color="brown.700">Price:</Text>
                      <Text fontSize="xl">${data.price.toFixed(2)}</Text>
                    </Box>
                    
                    <Box>
                      <Text fontSize="xl" fontWeight="bold" color="brown.700">Description:</Text>
                      <Text fontSize="lg" p={{base: 0, md: 4}} textAlign="justify">{data.desc}</Text>
                      
                    </Box>
                  </Stack>
                )}
              </Box>
            </Flex>
          </Box>
          
        )
    }
    export default SingleBook