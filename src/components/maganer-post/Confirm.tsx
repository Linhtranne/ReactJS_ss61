import React from 'react';

interface ConfirmationModalProps {
  postTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ postTitle, onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Xác nhận xóa</h2>
        <p>Bạn có chắc chắn muốn xóa bài viết "{postTitle}"?</p>
        <button onClick={onCancel}>Hủy</button>
        <button onClick={onConfirm}>Xóa</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
 