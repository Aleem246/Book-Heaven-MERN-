import React from "react"
import Hero from "/src/components/Home/Hero"
import RecentlyAddedBooks from "/src/components/Home/RecentlyAddedBooks"
import { Box } from "@chakra-ui/react";
const Home = () =>{
    return (
        <Box w={"100%"} maxW={'100%'}  >
            <Hero/>
            <RecentlyAddedBooks/>
        </Box>
    );
}
export default Home;