import React, { useEffect, useState } from 'react';
import { getAllHouseworks, deleteHouseworkById, createHousework, updateHouseworkById } from './houseworkApi';
import HouseworkForm, { Housework } from './houseworkForm';
import "./housework.css"


const HouseworkList: React.FC = () => {
  const [houseworks, setHouseworks] = useState<Housework[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [houseworkToDelete, setHouseworkToDelete] = useState<Housework | null>(null);
  const [houseworkToEdit, setHouseworkToEdit] = useState<Housework | null>(null);

  useEffect(() => {
    fetchHouseworks();
  }, []);

  const fetchHouseworks = async () => {
    try {
      const data = await getAllHouseworks();
      setHouseworks(data);
    } catch (error) {
      console.error('Error fetching houseworks:', error);
    }
  };

  const handleDelete = async () => {
    if (houseworkToDelete) {
      try {
        await deleteHouseworkById(houseworkToDelete.id);
        setShowModal(false);
        setHouseworkToDelete(null);
        fetchHouseworks();
      } catch (error) {
        console.error('Error deleting housework:', error);
      }
    }
  };

  const handleAdd = async (housework: Housework) => {
    try {
      await createHousework(housework);
      setShowForm(false);
      fetchHouseworks();
    } catch (error) {
      console.error('Error creating housework:', error);
    }
  };

  const handleUpdate = async (housework: Housework) => {
    try {
      await updateHouseworkById(housework.id, housework);
      setShowForm(false);
      fetchHouseworks();
    } catch (error) {
      console.error('Error updating housework:', error);
    }
  };

  return (
    <div className="housework-manager">
      <h1>Quản lý công việc</h1>
      <button onClick={() => { setHouseworkToEdit(null); setShowForm(true); }}>Thêm công việc</button>
      <div className="housework-filters">
        <button>Tất cả</button>
        <button>Hoàn thành</button>
        <button>Đang thực hiện</button>
      </div>
      <ul className="housework-list">
        {houseworks.map(housework => (
          <li key={housework.id} className={housework.status ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={housework.status}
              onChange={() => handleUpdate({ ...housework, status: !housework.status })}
            />
            {housework.name}
            <button onClick={() => { setHouseworkToEdit(housework); setShowForm(true); }}>🖊️</button>
            <button onClick={() => { setHouseworkToDelete(housework); setShowModal(true); }}>🗑️</button>
          </li>
        ))}
      </ul>

      {showModal && houseworkToDelete && (
        <div className="modal">
          <div className="modal-content">
            <h2>Xác nhận xóa</h2>
            <p>Bạn có chắc chắn muốn xóa công việc "{houseworkToDelete.name}"?</p>
            <button onClick={() => setShowModal(false)}>Hủy</button>
            <button onClick={handleDelete}>Xóa</button>
          </div>
        </div>
      )}

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>{houseworkToEdit ? 'Sửa công việc' : 'Thêm công việc'}</h2>
            <HouseworkForm addHousework={handleAdd} updateHousework={handleUpdate} housework={houseworkToEdit} />
            <button onClick={() => setShowForm(false)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HouseworkList;
