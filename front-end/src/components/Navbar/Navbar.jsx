import React, { useState } from "react"
import {Link, NavLink} from "react-router-dom"
import {useSelector} from "react-redux"

import { FaBookJournalWhills } from "react-icons/fa6";
import {CloseIcon, HamburgerIcon} from "@chakra-ui/icons"
import {Flex , Spacer ,  Text, Link as ChakraLink, Box, Image, useBreakpointValue, 
    IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerBody, VStack,
    Heading} from "@chakra-ui/react"
const Navbar  = () => {
    const links = [{
        title : "Home",
        path : "/"
    },
    {
        title : "All Books",
        path : "/all-books"
    },
    {
        title : "Cart",
        path : "/cart"
    },
    {
        title : "Profile",
        path : "/profile"
    },
    {
        title : "Admin Profile",
        path : "/profile"
    }
];
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
    const role = useSelector((state)=>(state.auth.role));
    if(isLoggedIn===false){
        links.splice(2,3);
    }

    if(isLoggedIn && role === "admin"){
        links.splice(2,2);
    }
    if(isLoggedIn && role === "user"){
        links.splice(4,1);
    }

    const isMobile = useBreakpointValue({base : true , md : false});
    const [isOpen , setIsOpen] = useState(false);

    const renderLinks = ()=>{
            return (

            <>  
            {
                links.map((link) => (
                    <ChakraLink color='yellow.600'
                        key={link.title} as={NavLink} to={link.path} 
                        
                        fontSize="xl" _hover={{ textDecoration: "none", color: "yellow.900" }}
                        _activeLink={{ textDecoration: "none", color: "yellow.900"}}>
                                        {link.title}
                    </ChakraLink>
                ))
            }{

            
                !isLoggedIn && (
                    <>
                            <ChakraLink as={NavLink} to="/log-in" fontSize="xl" color='yellow.600' _hover={{ textDecoration: "none" , color:"yellow.900"}} _activeLink={{ textDecoration: "none" , color:"yellow.900"}}>Login</ChakraLink>
                            <ChakraLink as={NavLink} to="/sign-up" fontSize="xl" color='yellow.600'  _hover={{ textDecoration: "none" , color:"yellow.900"}} _activeLink={{ textDecoration: "none" , color:"yellow.900"}}>Signup</ChakraLink>
                    </>
                )
            }
            </>
            )
        
           
    }

    

    return (
        <Box w='100%' maxW={'100%'} position={'sticky'} top={0} zIndex={'sticky'}>

            <Flex as = "header" align = "center" justify = "space-between" p={{base:2 , md:4}}   bg="yellow.50"   borderBottom="2px solid" borderBottomColor={'yellow.500'}  color="white">
                    <ChakraLink as={Link} ml={8} to="/" display="flex" gap={2} color="yellow.600" _hover={{ textDecoration: "none"}}>
                    
                      
                      <Heading as="h3" size="lg" color="yellow.600">
                                  <Flex align="center">
                                    
                                    <FaBookJournalWhills />
                                    Book Heaven
                                  </Flex>
                                </Heading>
                             
                
                       
                    </ChakraLink>

                    <Spacer/>
                    {(!isMobile)&& (

                        <Flex as="nav" gap={10}  align="center" px={{base:2 , md:6}} mr={8} >
                            { renderLinks()}
                        </Flex>
                    )}

                    {
                        (isMobile) && (
                            <IconButton
                                    aria-label="Toggle navigation" icon={isOpen ? <CloseIcon /> : <HamburgerIcon/>}
                                    colorScheme="blackAlpha" color="white"
                                    onClick={() => setIsOpen(!isOpen)} mr={2}
                                    
                                    
                            />
                        )
                    }
                    {/* Mobile drawer  */}
                    {
                        (isMobile) && (
                                <Drawer
                                isOpen={isOpen}
                                placement="left"
                                onClose={() => setIsOpen(false)}
                                >
                                    <DrawerOverlay />
                                    <DrawerContent bg="black" borderBottomWidth="1px" borderColor="yellow.500">
                                        <DrawerBody>
                                        <VStack spacing={4} py={4} color="white">
                                            {renderLinks(true)}
                                        </VStack>
                                        </DrawerBody>
                                    </DrawerContent>
                                </Drawer>
                    )}
                    
                    
            </Flex>

       </Box>
    );

}
export default Navbar;
