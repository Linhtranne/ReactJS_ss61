import React, { useState, useEffect } from 'react';
import PostForm from './PostForm';
import PostList from './PostList';
import ConfirmationModal from './Confirm';
import { getAllPosts, deletePostById, createPost, updatePostById } from './PostApi';
import './manager.css';

export interface Post {
  id: number;
  title: string;
  image: string;
  content: string;
  date: string;
  status: string;
  blocked: boolean;
}

const PostManager: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getAllPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (post: Post) => {
    try {
      await createPost(post);
      setShowForm(false);
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleUpdate = async (post: Post) => {
    try {
      await updatePostById(post.id, post);
      setShowForm(false);
      fetchPosts();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDelete = async () => {
    if (postToDelete) {
      try {
        await deletePostById(postToDelete.id);
        setShowModal(false);
        setPostToDelete(null);
        fetchPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleEdit = (post: Post) => {
    setPostToEdit(post);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setPostToEdit(null);
    setShowForm(true);
  };

  const handleBlock = async (post: Post) => {
    try {
      const updatedPost = { ...post, blocked: !post.blocked };
      await updatePostById(post.id, updatedPost);
      fetchPosts();
    } catch (error) {
      console.error('Error blocking post:', error);
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="post-manager">
      <h1>Quản lý bài viết</h1>
      <input
        type="text"
        placeholder="Tìm kiếm bài viết"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleAddNew}>Thêm mới bài viết</button>
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <PostList
          posts={filteredPosts}
          onEdit={handleEdit}
          onDelete={(post) => { setPostToDelete(post); setShowModal(true); }}
          onBlock={handleBlock}
        />
      )}
      {showForm && (
        <PostForm
          addPost={handleAdd}
          updatePost={handleUpdate}
          post={postToEdit}
          setShowForm={setShowForm}
        />
      )}
      {showModal && postToDelete && (
        <ConfirmationModal
          postTitle={postToDelete.title}
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default PostManager;
