import React from "react"
import Hero from "../components/Home/Hero.jsx"
import RecentlyAddedBooks from "../components/Home/RecentlyAddedBooks.jsx"
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