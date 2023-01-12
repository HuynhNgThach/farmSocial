import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const resp = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await resp.json();
    dispatch(setPosts({ posts: data }));
  };
  const getUserPosts = async () => {
    const resp = await fetch(`http://localhost:3001/${userId}/posts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await resp.json();
    dispatch(setPosts({ posts: data }));
  };
  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);
  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          location,
          description,
          picturePath,
          userPicturePath,
          likes,
          comments,
          style,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            location={location}
            description={description}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            style={style}
          />
        )
      )}
    </>
  );
};
export default PostsWidget;
