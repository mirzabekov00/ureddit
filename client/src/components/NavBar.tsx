import React from "react";
import { Box, Flex, Link } from "@chakra-ui/layout";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "./../generated/graphql";
import { Button } from "@chakra-ui/button";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  let body = null;

  if (fetching) {
    body = "loading...";
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr="5">login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link mr="5">register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box mr="5">{data.me.username}</Box>
        <Button
          isLoading={logoutFetching}
          onClick={() => logout()}
          variant="link"
        >
          logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex position="sticky" top={0} zIndex={1} bg="twitter.100" p={4}>
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};
