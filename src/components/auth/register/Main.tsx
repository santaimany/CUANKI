import React from 'react';
import AuthLayout from '../AuthLayout';
import RegisterForm from './RegisterForm';

const Main = () => {
    return (
        <AuthLayout>
            <RegisterForm />
        </AuthLayout>
    );
}

export default Main;