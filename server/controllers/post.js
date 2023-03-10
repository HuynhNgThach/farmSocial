import Post from "../models/Post.js";
import User from "../models/User.js";

//create
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePaths, backgroundStyle } = req.body;
    console.log("userId", userId);
    const user = await User.findById(userId);

    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePaths,
      likes: {},
      comments: [],
      style: backgroundStyle,
    });
    await newPost.save();
    const posts = await Post.find();
    console.log("asdfasf", posts);
    res.status(201).json(posts);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
//read
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);

    const isLike = post.likes.get(userId);

    if (isLike) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    console.log("post", post);
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      {
        new: true,
      }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
