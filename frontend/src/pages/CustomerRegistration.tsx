import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/generic/Card';
import Input from '../components/generic/Input';
import Button from '../components/generic/Button';
import type { Customer } from '../types/types';

const CustomerRegistration: React.FC = () => {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState<Customer>({
        name: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<Partial<Customer>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomer(prev => ({ ...prev, [name]: value }));
    };

    const validate = (): boolean => {
        const newErrors: Partial<Customer> = {};

        if (!customer.name.trim()) newErrors.name = 'Nome é obrigatório';
        if (!customer.email.trim()) {
            newErrors.email = 'Email é obrigatório';
        } else if (!/^\S+@\S+\.\S+$/.test(customer.email)) {
            newErrors.email = 'Email inválido';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validate()) {
            // Aqui você faria a chamada à API para salvar o cliente
            console.log('Cliente cadastrado:', customer);
            alert('Cliente cadastrado com sucesso!');
            navigate('/');
        }
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <Card className="max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-center">Cadastro de Cliente</h2>
                <form onSubmit={handleSubmit}>
                    <Input
                        label="Nome completo"
                        name="name"
                        value={customer.name}
                        onChange={handleChange}
                        error={errors.name}
                    />
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={customer.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                    <Input
                        label="Senha"
                        name="password"
                        value={customer.password}
                        onChange={handleChange}
                        error={errors.password}
                    />
                    <div className="mt-6">
                        <Button type="submit" variant="primary" className="w-full">
                            Cadastrar
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default CustomerRegistration;