import React, { useState, useEffect } from 'react';
import { Post } from './PostManager';
import './manager.css';

interface PostFormProps {
  addPost: (post: Post) => void;
  updatePost: (post: Post) => void;
  post: Post | null;
  setShowForm: (show: boolean) => void;
}

const PostForm: React.FC<PostFormProps> = ({ addPost, updatePost, post, setShowForm }) => {
  const [formData, setFormData] = useState<Omit<Post, 'id' | 'date'>>({
    title: '',
    image: '',
    content: '',
    status: 'Nháp',
    blocked: false
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        image: post.image,
        content: post.content,
        status: post.status,
        blocked: post.blocked
      });
    }
  }, [post]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split('T')[0];
    if (post) {
      updatePost({ ...formData, id: post.id, date: post.date });
      setShowForm(false);
    } else {
      addPost({ ...formData, id: Date.now(), date: currentDate });
    }
    setFormData({
      title: '',
      image: '',
      content: '',
      status: 'Nháp',
      blocked: false
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="btn-close" onClick={() => setShowForm(false)}>×</button>
        <h2>{post ? 'Cập nhật bài viết' : 'Thêm mới bài viết'}</h2>
        <form onSubmit={handleSubmit} className="post-input">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Tên bài viết"
            required
          />
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Hình ảnh"
            required
          />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Nội dung"
            required
          />
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Nháp">Nháp</option>
            <option value="Xuất bản">Xuất bản</option>
          </select>
          <button type="submit">{post ? 'Cập nhật' : 'Xuất bản'}</button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
