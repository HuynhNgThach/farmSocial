import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import NavBar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
function HomePage() {
  const isNoneMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <Box>
      <NavBar />
      <Box
        width={"100%"}
        padding="2rem 6%"
        display={isNoneMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent={"space-between"}
      >
        <Box flexBasis={isNoneMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        {!isNoneMobileScreens && (
          <Box
            flexBasis={isNoneMobileScreens ? "26%" : undefined}
            mt={isNoneMobileScreens ? undefined : "2rem"}
          >
            <AdvertWidget></AdvertWidget>
            <Box m="2rem 0" />
            <FriendListWidget userId={_id}></FriendListWidget>
          </Box>
        )}
        <Box
          flexBasis={isNoneMobileScreens ? "42%" : undefined}
          mt={isNoneMobileScreens ? undefined : "2rem"}
          overflow="hidden"
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNoneMobileScreens && (
          <Box flexBasis={"26%"}>
            <AdvertWidget></AdvertWidget>
            <Box m="2rem 0" />
            <FriendListWidget userId={_id}></FriendListWidget>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default HomePage;
