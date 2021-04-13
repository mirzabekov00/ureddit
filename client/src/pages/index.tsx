import { withUrqlClient } from "next-urql";
import React from "react";
import { NavBar } from "../components/NavBar";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "./../generated/graphql";
import NextLink from "next/link";
import { Button, Link } from "@chakra-ui/react";
import { Layout } from "../components/Layout";

const Index = () => {
  const [{ data }] = usePostsQuery({
    variables: {
      limit: 10,
    },
  });
  return (
    <Layout variant="regular">
      <NextLink href="/create-post">
        <Button>create post</Button>
      </NextLink>
      {!data ? (
        <div>loading...</div>
      ) : (
        data.posts.map((post) => <div key={post.id}>{post.title}</div>)
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
