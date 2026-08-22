import { Post } from '../models/Post.js';

export const getPosts = async (req, res) => {
  try {
    const { search, sortBy } = req.query;
    
    let query = {};
    if (search) {
      query.content = { $regex: search, $options: 'i' };
    }

    let sort = { createdAt: -1 };
    if (sortBy === 'upvotes') {
      sort = { upvotes: -1, createdAt: -1 };
    }

    const posts = await Post.find(query).sort(sort);
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    // For demo purposes, we are grabbing the user data from req.user if it exists, otherwise defaulting
    const authorName = req.user?.name || 'Alex Explorer';
    const authorAvatar = req.user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const newPost = await Post.create({
      _id: `post_${Date.now()}`,
      content,
      authorName,
      authorAvatar,
      upvotes: 0,
      comments: []
    });

    res.status(201).json({ post: newPost, message: 'Post created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

export const upvotePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(
      id,
      { $inc: { upvotes: 1 } },
      { new: true }
    );
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.status(200).json({ post, message: 'Upvoted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upvote post' });
  }
};

export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    
    const authorName = req.user?.name || 'Alex Explorer';
    const authorAvatar = req.user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';

    if (!content) {
      return res.status(400).json({ error: 'Comment content is required' });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const newComment = {
      _id: `comment_${Date.now()}`,
      content,
      authorName,
      authorAvatar
    };

    post.comments.push(newComment);
    await post.save();

    res.status(201).json({ post, message: 'Comment added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};
