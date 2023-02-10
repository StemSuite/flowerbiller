import { Outlet } from "react-router-dom";
import SimpleSidebar from "../components/Sidebar";
import {Flex, Grid, GridItem, Spacer } from "@chakra-ui/react";
import AccountButton from "../components/buttons/AccountButton";

export default function SidebarLayout() {
    return (
    <Grid
        templateColumns='repeat(6, 1fr)'
    >
        <GridItem 
            as="aside" 
            colSpan={{base: 6, md: 1}}
            bg="green.400" 
            minHeight={{md: "100vh" }}
            p="25px">
            <SimpleSidebar />
        </GridItem>
        <GridItem as="main" colSpan={{base: 6, md: 5}} p="2px">
            <Flex>
                <span></span>
                <Spacer />
                <AccountButton/>
            </Flex>
            <Outlet/>
        </GridItem>
    </Grid>
)}