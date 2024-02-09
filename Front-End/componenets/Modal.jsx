import React, { useState } from 'react';
import axios from 'axios';
import './Modal.css';

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
    const [formState, setFormState] = useState(
        defaultValue || {
            name: '',
            email: '',
            number: '',
            message: '',
        }
    );

    const [errors, setErrors] = useState('');


    const validateForm = () => {
        if (formState.name && formState.email && formState.number && formState.message) {
            setErrors('');
            return true;
        } else {
            let errorFields = [];
            for (const [Key, value] of Object.entries(formState)) {
                if (!value) {
                    errorFields.push(Key);
                }
            }
            setErrors(errorFields.join(','));
            return false;
        }
    };

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/demo', formState, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = response.data;
            console.log(data);
            onSubmit(formState);
            closeModal();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div
            className='modal-container'
            onClick={(e) => {
                if (e.target.className === 'modal-container') closeModal();
            }}
        >
            <div className='modal'>
                <form>
                    <div className='form-group '>
                        <label htmlFor='name'>Name</label>
                        <input name='name' value={formState.name} onChange={handleChange} />
                    </div>
                    <div className='form-group '>
                        <label htmlFor='email'>Email</label>
                        <input name='email' value={formState.email} onChange={handleChange} />
                    </div>
                    <div className='form-group '>
                        <label htmlFor='number'>Number</label>
                        <input type='number' name='number' value={formState.number} onChange={handleChange} />
                    </div>
                    <div className='form-group '>
                        <label htmlFor='message'>Message</label>
                        <textarea name='message' value={formState.message} onChange={handleChange} />
                    </div>
                    <div>
                        {errors && <div className='error'>{`Please Include : ${errors}`}</div>}
                        <button className='btn ' type='submit' onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
