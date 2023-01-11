/* eslint-disable react-hooks/exhaustive-deps */

import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, useTheme, Typography, Divider } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const resp = await fetch(`http://localhost:3001/user/${userId}`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await resp.json();
    setUser(data);
  };
  useEffect(() => {
    getUser();
  }, []);
  if (!user) return null;
  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;
  return (
    <WidgetWrapper>
      {/* first row */}
      <FlexBetween
        gap={"0.5rem"}
        pb="1.5rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap={"1rem"}>
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover ": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>
      <Divider />
      {/* second row */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        {/*<Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>*/}
      </Box>
      <Divider />
      {/* third row */}
      <Box p="1rem 0">
        <FlexBetween mb={"0.5rem"}>
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight={500}>
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impression of your post</Typography>
          <Typography color={main} fontWeight={500}>
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>
      <Divider />
      {/* fourth row */}
      <Box p="1rem 0">
        <Typography fontSize={"1rem"} color={main} fontWeight={500} mb="1rem">
          Social profiles
        </Typography>
        <FlexBetween gap={"1rem"} mb="0.5rem">
          <FlexBetween gap={"1rem"}>
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}> Social network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap={"1rem"}>
          <FlexBetween gap={"1rem"}>
            <img src="../assets/linkedin.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}> Network platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};
export default UserWidget;
