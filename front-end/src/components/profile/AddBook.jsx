import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Textarea, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
    const [bookdata , setBookdata] = useState({
        url: '',
        title:'',
        author : '',
        price : '',
        lang : '',
        desc : ''
    });
    const [loading , setLoading] = useState(true);
    const Toast = useToast();
    const Navigate = useNavigate();
    const headers = {
        authentication : `Bearer ${localStorage.getItem('token')}`,
        id : localStorage.getItem('id')
    }
    const handleChange = (e)=>{
        const {name , value} = e.target;
        setBookdata({...bookdata , [name] : value});
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
    
        const post = async ()=>{
            try{
                const response = await axios.post("http://localhost:8081/api/v1/add-book",bookdata,{headers});
                Toast({
                    title: response.data.message,
                    status: 'success',
                    duration: 5000,
                    position:'top',
                    isClosable: true,
                })
                Navigate('/all-books');
            }catch(Err){
                console.log(Err);
            }finally{
                setLoading(false);
            }
        }
        post();
    }
     
  return (
   <Flex  align='center' justify={'center'} bg='gray.50'>
        <Box w='100%' maxW='2xl' p={8} borderWidth={1} borderRadius='lg' bg='white'>
            <Heading as={'h1'} size={'xl'} textAlign={'center'}>Add a Book</Heading>
            <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                    <FormControl id="image" isRequired>
                    <FormLabel>Image</FormLabel>
                    <Input 
                        type="text" name="url" isRequired 
                        onChange={handleChange}
                        value={bookdata.url} placeholder="URL of image" 
                        focusBorderColor="blue.500"
                    />
                    </FormControl>

                    <FormControl id="title" isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input type="text" name='title' isRequired onChange={handleChange}
                    value={bookdata.title} placeholder="title" focusBorderColor="blue.500"
                    />
                    </FormControl>

                    <FormControl id="author" isRequired>
                    <FormLabel>Author</FormLabel>
                    <Input type="text" name='author' isRequired onChange={handleChange}
                    value={bookdata.author} placeholder="author" focusBorderColor="blue.500"
                    />
                    </FormControl>

                    <FormControl id="price" isRequired>
                    <FormLabel>Price</FormLabel>
                    <Input type="number" name='price' isRequired onChange={handleChange}
                    value={bookdata.price} placeholder="price" focusBorderColor="blue.500"
                    />
                    </FormControl>

                    <FormControl id="lang" isRequired>
                    <FormLabel>Language</FormLabel>
                    <Input type="text" name='lang' isRequired onChange={handleChange}
                    value={bookdata.lang} placeholder="language" focusBorderColor="blue.500"
                    />
                    </FormControl>

                    <FormControl id="desc" isRequired>
                    <FormLabel>Description</FormLabel>
                    <Textarea type="text" name='desc' cols={30} rows={5} isRequired onChange={handleChange}
                    value={bookdata.desc} placeholder="description" focusBorderColor="blue.500"
                    >
                        </Textarea>
                    </FormControl>
                    

                    <Button
                    type="submit"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                    bg: 'blue.500',
                    }}
                    >
                    Add
                    </Button>
                </Stack>
            </form>
        </Box>

   </Flex>

  )
}

export default AddBook