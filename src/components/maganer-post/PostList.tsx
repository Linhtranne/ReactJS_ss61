import React from 'react';
import { Post } from './PostManager';

interface PostListProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
  onBlock: (post: Post) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onEdit, onDelete, onBlock }) => {
  return (
    <table className="post-list">
      <thead>
        <tr>
          <th>STT</th>
          <th>Tiêu đề</th>
          <th>Hình ảnh</th>
          <th>Ngày viết</th>
          <th>Trạng thái</th>
          <th>Chức năng</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post, index) => (
          <tr key={post.id}>
            <td>{index + 1}</td>
            <td>{post.title}</td>
            <td><img src={post.image} alt={post.title} style={{ width: '50px' }} /></td>
            <td>{post.date}</td>
            <td>{post.status}</td>
            <td>
              <button onClick={() => onEdit(post)}>Sửa</button>
              <button onClick={() => onDelete(post)}>Xóa</button>
              <button onClick={() => onBlock(post)}>{post.blocked ? 'Bỏ chặn' : 'Chặn'}</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PostList;
