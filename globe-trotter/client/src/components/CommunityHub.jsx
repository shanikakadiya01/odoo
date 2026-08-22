import React, { useState, useEffect } from 'react';
import { Search, Heart, MessageSquare, Plus, Clock, Filter, AlertCircle, TrendingUp, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getCommunityPosts, createCommunityPost, upvoteCommunityPost, commentOnCommunityPost } from '../services/api';

export const CommunityHub = () => {
  const { user, openAuth } = useAuth();
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' or 'upvotes'
  
  const [newPostContent, setNewPostContent] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  
  const [expandedComments, setExpandedComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [submittingComment, setSubmittingComment] = useState(false);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await getCommunityPosts(searchQuery, sortBy);
      setPosts(data);
    } catch (err) {
      console.error('Failed to load community posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Debounce search slightly
    const timer = setTimeout(() => {
      loadPosts();
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery, sortBy]);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!user) {
      openAuth('login');
      return;
    }
    if (!newPostContent.trim()) return;
    
    setIsCreating(true);
    try {
      const created = await createCommunityPost(newPostContent);
      if (created) {
        setPosts([created, ...posts]);
        setNewPostContent('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpvote = async (postId) => {
    if (!user) {
      openAuth('login');
      return;
    }
    
    // Optimistic UI update
    setPosts(posts.map(p => p._id === postId ? { ...p, upvotes: p.upvotes + 1 } : p));
    
    try {
      await upvoteCommunityPost(postId);
    } catch (err) {
      // Revert on failure
      setPosts(posts.map(p => p._id === postId ? { ...p, upvotes: p.upvotes - 1 } : p));
    }
  };

  const toggleComments = (postId) => {
    setExpandedComments({
      ...expandedComments,
      [postId]: !expandedComments[postId]
    });
  };

  const handleCommentSubmit = async (postId, e) => {
    e.preventDefault();
    if (!user) {
      openAuth('login');
      return;
    }
    
    const content = commentInputs[postId];
    if (!content || !content.trim()) return;
    
    setSubmittingComment(true);
    try {
      const updatedPost = await commentOnCommunityPost(postId, content);
      if (updatedPost) {
        setPosts(posts.map(p => p._id === postId ? updatedPost : p));
        setCommentInputs({ ...commentInputs, [postId]: '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingComment(false);
    }
  };

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <section className="community-section">
      <div className="container">
        {/* Header */}
        <div className="community-header">
          <div>
            <div className="badge badge-violet mb-2">Connect & Share</div>
            <h1 className="community-title">
              Traveler <span className="gradient-text-sunset">Community Hub</span>
            </h1>
            <p className="community-subtitle">
              Ask for itinerary feedback, share hidden gems, and connect with fellow explorers.
            </p>
          </div>
        </div>

        <div className="community-layout">
          {/* Main Feed Column */}
          <div className="community-feed-column">
            
            {/* Create Post Box */}
            <div className="create-post-box glass-panel">
              <form onSubmit={handleCreatePost}>
                <div className="create-post-header">
                  <img 
                    src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'} 
                    alt="avatar" 
                    className="create-post-avatar"
                  />
                  <textarea 
                    className="create-post-input"
                    placeholder="Share your travel plans, ask for recommendations, or post tips..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="create-post-footer">
                  <button type="submit" className="btn btn-primary" disabled={isCreating || !newPostContent.trim()}>
                    <Plus size={16} />
                    <span>Post to Community</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Posts Feed */}
            {loading ? (
              <div className="feed-loading-state">
                {[1, 2, 3].map(n => (
                  <div key={n} className="skeleton-post glass-panel" />
                ))}
              </div>
            ) : posts.length > 0 ? (
              <div className="posts-list">
                {posts.map(post => (
                  <div key={post._id} className="post-card glass-panel">
                    <div className="post-header">
                      <div className="post-author-info">
                        <img src={post.authorAvatar} alt={post.authorName} className="post-avatar" />
                        <div>
                          <h4 className="post-author-name">{post.authorName}</h4>
                          <span className="post-time"><Clock size={12} /> {timeAgo(post.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="post-content">
                      {post.content.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                    
                    <div className="post-actions">
                      <button className="post-action-btn" onClick={() => handleUpvote(post._id)}>
                        <Heart size={18} className={post.upvotes > 0 ? 'text-coral' : ''} />
                        <span className={post.upvotes > 0 ? 'text-coral font-bold' : ''}>{post.upvotes || 'Upvote'}</span>
                      </button>
                      
                      <button className="post-action-btn" onClick={() => toggleComments(post._id)}>
                        <MessageSquare size={18} />
                        <span>{post.comments?.length || 0} Comments</span>
                      </button>
                    </div>

                    {/* Expandable Comments Section */}
                    {expandedComments[post._id] && (
                      <div className="comments-section">
                        {post.comments && post.comments.length > 0 ? (
                          <div className="comments-list">
                            {post.comments.map(comment => (
                              <div key={comment._id} className="comment-item">
                                <img src={comment.authorAvatar} alt={comment.authorName} className="comment-avatar" />
                                <div className="comment-body">
                                  <div className="comment-header">
                                    <span className="comment-author">{comment.authorName}</span>
                                    <span className="comment-time">{timeAgo(comment.createdAt)}</span>
                                  </div>
                                  <p className="comment-content">{comment.content}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="no-comments-hint">No comments yet. Be the first to share your thoughts!</p>
                        )}
                        
                        <form className="add-comment-box" onSubmit={(e) => handleCommentSubmit(post._id, e)}>
                          <img 
                            src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'} 
                            alt="avatar" 
                            className="comment-avatar"
                          />
                          <div className="comment-input-wrap">
                            <input 
                              type="text" 
                              className="comment-input" 
                              placeholder="Write a comment..."
                              value={commentInputs[post._id] || ''}
                              onChange={(e) => setCommentInputs({ ...commentInputs, [post._id]: e.target.value })}
                            />
                            <button 
                              type="submit" 
                              className="comment-submit-btn" 
                              disabled={!commentInputs[post._id]?.trim() || submittingComment}
                            >
                              <Send size={16} />
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-posts-state glass-panel">
                <AlertCircle size={40} className="text-violet animate-float" />
                <h3>No posts found</h3>
                <p>Try adjusting your search criteria or create a new post to start the conversation.</p>
                <button className="btn btn-outline mt-3" onClick={() => setSearchQuery('')}>Clear Search</button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="community-sidebar">
            <div className="sidebar-widget glass-panel">
              <h3 className="widget-title">Search & Filter</h3>
              
              <div className="search-bar">
                <Search size={16} className="search-icon" />
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Search discussions..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="filter-group">
                <label className="filter-label"><Filter size={14} /> Sort By</label>
                <div className="sort-buttons">
                  <button 
                    className={`sort-btn ${sortBy === 'newest' ? 'active' : ''}`}
                    onClick={() => setSortBy('newest')}
                  >
                    <Clock size={14} /> Newest
                  </button>
                  <button 
                    className={`sort-btn ${sortBy === 'upvotes' ? 'active' : ''}`}
                    onClick={() => setSortBy('upvotes')}
                  >
                    <TrendingUp size={14} /> Top Upvoted
                  </button>
                </div>
              </div>
            </div>

            <div className="sidebar-widget glass-panel rules-widget">
              <h3 className="widget-title">Community Guidelines</h3>
              <ul className="rules-list">
                <li>Be respectful and kind to fellow travelers.</li>
                <li>Share specific details when asking for itinerary reviews.</li>
                <li>Avoid self-promotion or spam.</li>
                <li>Help others by sharing local hidden gems!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .community-section {
          padding: 40px 0 80px 0;
        }
        .community-header {
          margin-bottom: 36px;
        }
        .community-title {
          font-size: 2.4rem;
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 6px;
          color: var(--text-primary);
        }
        .community-subtitle {
          font-size: 1rem;
          color: var(--text-secondary);
        }
        .community-layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 32px;
          align-items: start;
        }
        .create-post-box {
          padding: 24px;
          margin-bottom: 24px;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-md);
        }
        .create-post-header {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
        }
        .create-post-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
        }
        .create-post-input {
          flex: 1;
          font-family: var(--font-body);
          font-size: 1rem;
          color: var(--text-primary);
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 12px 16px;
          outline: none;
          resize: vertical;
          transition: border-color var(--transition-fast);
        }
        .create-post-input:focus {
          border-color: var(--accent-violet);
          background: #ffffff;
        }
        .create-post-footer {
          display: flex;
          justify-content: flex-end;
        }
        .posts-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .post-card {
          padding: 24px;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-sm);
        }
        .post-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }
        .post-author-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .post-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          object-fit: cover;
        }
        .post-author-name {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .post-time {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 2px;
        }
        .post-content {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .post-content p {
          margin-bottom: 8px;
        }
        .post-content p:last-child {
          margin-bottom: 0;
        }
        .post-actions {
          display: flex;
          gap: 16px;
          padding-top: 16px;
          border-top: 1px solid var(--border-subtle);
        }
        .post-action-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: color var(--transition-fast);
        }
        .post-action-btn:hover {
          color: var(--text-primary);
        }
        .font-bold {
          font-weight: 800;
        }
        
        /* Comments Section */
        .comments-section {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px dashed var(--border-subtle);
        }
        .comments-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 20px;
        }
        .comment-item {
          display: flex;
          gap: 12px;
        }
        .comment-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
        }
        .comment-body {
          flex: 1;
          background: var(--bg-secondary);
          padding: 12px 16px;
          border-radius: 0 16px 16px 16px;
        }
        .comment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }
        .comment-author {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .comment-time {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .comment-content {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .no-comments-hint {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-style: italic;
          margin-bottom: 20px;
        }
        .add-comment-box {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .comment-input-wrap {
          flex: 1;
          display: flex;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          overflow: hidden;
          padding: 2px 4px 2px 16px;
        }
        .comment-input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          font-size: 0.9rem;
        }
        .comment-submit-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background: #0284c7;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .comment-submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        /* Sidebar */
        .sidebar-widget {
          padding: 24px;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-sm);
          margin-bottom: 24px;
        }
        .widget-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 16px;
        }
        .search-bar {
          position: relative;
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }
        .search-icon {
          position: absolute;
          left: 12px;
          color: var(--text-muted);
        }
        .search-input {
          width: 100%;
          padding: 10px 12px 10px 36px;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          background: var(--bg-secondary);
          outline: none;
          font-size: 0.9rem;
          transition: border-color var(--transition-fast);
        }
        .search-input:focus {
          border-color: var(--accent-violet);
          background: #ffffff;
        }
        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .filter-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .sort-buttons {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .sort-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background: transparent;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .sort-btn:hover {
          background: var(--bg-secondary);
        }
        .sort-btn.active {
          background: #ede9fe;
          color: #7c3aed;
          border-color: #c4b5fd;
        }
        
        .rules-list {
          list-style-type: disc;
          padding-left: 20px;
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.6;
        }
        .rules-list li {
          margin-bottom: 8px;
        }

        .no-posts-state {
          padding: 60px 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          border: 1px dashed var(--border-subtle);
          background: #ffffff;
        }
        .skeleton-post {
          height: 180px;
          border-radius: var(--radius-lg);
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          animation: pulseSkeleton 1.5s ease-in-out infinite;
          margin-bottom: 20px;
        }
        @media (max-width: 900px) {
          .community-layout {
            grid-template-columns: 1fr;
          }
          .community-sidebar {
            order: -1;
          }
        }
      `}</style>
    </section>
  );
};
