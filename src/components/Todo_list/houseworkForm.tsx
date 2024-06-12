import React, { useState, useEffect } from 'react';
import "./housework.css"

export interface Housework {
  id: number;
  name: string;
  status: boolean;
}

interface HouseworkFormProps {
  addHousework: (housework: Housework) => void;
  updateHousework: (housework: Housework) => void;
  housework: Housework | null;
}

const HouseworkForm: React.FC<HouseworkFormProps> = ({ addHousework, updateHousework, housework }) => {
  const [formData, setFormData] = useState<Omit<Housework, 'id'>>({
    name: '',
    status: false
  });

  useEffect(() => {
    if (housework) {
      setFormData({
        name: housework.name,
        status: housework.status
      });
    }
  }, [housework]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (housework) {
      updateHousework({ ...formData, id: housework.id });
    } else {
      addHousework({ ...formData, id: Date.now() });
    }
    setFormData({
      name: '',
      status: false
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Tên công việc"
        required
      />
      <label>
        <input
          type="checkbox"
          name="status"
          checked={formData.status}
          onChange={handleChange}
        />
        Hoàn thành
      </label>
      <button type="submit">{housework ? 'Cập nhật công việc' : 'Thêm công việc'}</button>
    </form>
  );
};

export default HouseworkForm;
