import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './AddSchool.css';

function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('address', data.address);
    formData.append('city', data.city);
    formData.append('state', data.state);
    formData.append('contact', data.contact);
    formData.append('email_id', data.email_id);
    formData.append('image', data.image[0]);

    try {
      const response = await axios.post('http://localhost:5000/api/schools', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(response.data.message);
      reset();
    } catch (error) {
      console.error('There was an error adding the school!', error);
      alert(error.response?.data?.error || 'Failed to add school.');
    }
  };

  return (
    <div className="add-school-container">
      <h1>Add a New School</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="school-form">
        
        <div className="form-group">
          <label>School Name</label>
          <input 
            {...register('name', { required: 'School name is required' })} 
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label>Address</label>
          <input 
            {...register('address', { required: 'Address is required' })} 
          />
          {errors.address && <p className="error">{errors.address.message}</p>}
        </div>

        <div className="form-group">
          <label>City</label>
          <input 
            {...register('city', { required: 'City is required' })} 
          />
          {errors.city && <p className="error">{errors.city.message}</p>}
        </div>

        <div className="form-group">
          <label>State</label>
          <input 
            {...register('state', { required: 'State is required' })} 
          />
          {errors.state && <p className="error">{errors.state.message}</p>}
        </div>

        <div className="form-group">
          <label>Contact Number</label>
          <input 
            type="number"
            {...register('contact', { 
              required: 'Contact number is required',
              pattern: {
                value: /^\d{10}$/,
                message: 'Please enter a valid 10-digit phone number'
              }
            })} 
          />
          {errors.contact && <p className="error">{errors.contact.message}</p>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input 
            type="email"
            {...register('email_id', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email address'
              }
            })} 
          />
          {errors.email_id && <p className="error">{errors.email_id.message}</p>}
        </div>

        <div className="form-group">
          <label>School Image</label>
          <input 
            type="file"
            accept="image/*"
            {...register('image', { required: 'Please upload an image' })} 
          />
          {errors.image && <p className="error">{errors.image.message}</p>}
        </div>

        <button type="submit" className="submit-btn">Add School</button>
      </form>
    </div>
  );
}

export default AddSchool;