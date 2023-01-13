import {
  ChatBubbleOutlineOutlined,
  ChatBubbleOutlineRounded,
  ShareOutlined,
} from "@mui/icons-material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import {
  Box,
  Divider,
  Icon,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPost } from "state";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";

const PostWidget = ({
  postId,
  postUserId,
  name,
  location,
  description,
  picturePaths,
  userPicturePath,
  likes,
  comments,
  style,
}) => {
  const [isComments, setIsComments] = useState(false);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const postLike = async () => {
    const resp = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await resp.json();
    dispatch(setPost({ post: updatedPost }));
  };
  const SlideImg = styled(Swiper)({
    ".swiper-button-prev": {
      color: palette.neutral.dark,
      "&::after": {
        fontSize: "20px",
        fontWeight: "700",
      },
    },
    ".swiper-button-next": {
      color: palette.neutral.dark,
      "&::after": {
        fontSize: "20px",
        fontWeight: "700",
      },
    },
    ".swiper-pagination-bullet": {
      backgroundColor: palette.primary.light,
    },
  });
  return (
    <WidgetWrapper sx={{ mt: "1.5rem" }}>
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      {style ? (
        <Box
          sx={{
            backgroundImage: style,
            minHeight: "250px",
            borderRadius: "0.75rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: "1rem",
          }}
        >
          <Typography
            color={main}
            sx={{
              mt: "1rem",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.25rem",
              wordBreak: "break-word",
            }}
          >
            {description}
          </Typography>
        </Box>
      ) : (
        <Typography
          color={main}
          sx={{ mt: "1rem", fontSize: "1.25rem", wordBreak: "break-word" }}
        >
          {description}
        </Typography>
      )}

      {picturePaths &&
        (picturePaths.lengths === 1 ? (
          <img
            src={`http://localhost:3001/assets/${picturePaths[0]}`}
            width={"100%"}
            height="auto"
            alt=""
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          />
        ) : (
          <Box sx={{}}>
            <SlideImg
              pagination={true}
              navigation={true}
              modules={[Pagination, Navigation]}
            >
              {picturePaths.map((pic, k) => (
                <SwiperSlide key={k}>
                  <div style={{ width: "100%", height: "300px" }}>
                    <img
                      src={`http://localhost:3001/assets/${pic}`}
                      style={{
                        borderRadius: "0.75rem",
                        marginTop: "0.75rem",
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        objectPosition: "center",
                      }}
                      alt=""
                    />
                  </div>
                </SwiperSlide>
              ))}
            </SlideImg>
          </Box>
        ))}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.1rem">
            <IconButton onClick={postLike}>
              {isLiked ? (
                <FavoriteOutlinedIcon sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlinedIcon />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.1rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineRounded />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={i}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
              <Divider />
            </Box>
          ))}
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
