"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Card from "../components/generic/Card"
import Input from "../components/generic/Input"
import Button from "../components/generic/Button"
import type { Customer } from "../types/types"
import api from "../api"
import { FiUser, FiMail, FiLock, FiPhone, FiArrowLeft } from "react-icons/fi"
import { motion } from "framer-motion"

const CustomerRegistration: React.FC = () => {
    const navigate = useNavigate()
    const [customer, setCustomer] = useState<Customer>({
        name: "",
        username: "",
        password: "",
        phone: "",
        bio: "",
        registerDate: "",
        lastUpdateDate: "",
    })
    const [errors, setErrors] = useState<Partial<Customer>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setCustomer((prev) => ({ ...prev, [name]: value }))
        if (errors[name as keyof Customer]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }))
        }
    }

    // Função para formatar data no padrão dd/MM/yyyy HH:mm:ss
    const formatDate = (date: Date) => {
        const pad = (n: number) => n.toString().padStart(2, "0")
        return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
    }

    const validate = (): boolean => {
        const newErrors: Partial<Customer> = {}

        if (!customer.name.trim()) newErrors.name = "Nome é obrigatório"
        if (!customer.username.trim()) {
            newErrors.username = "Email é obrigatório"
        } else if (!/^\S+@\S+\.\S+$/.test(customer.username)) {
            newErrors.username = "Email inválido"
        }
        if (!customer.password) {
            newErrors.password = "Senha é obrigatória"
        } else if (customer.password.length < 6) {
            newErrors.password = "Senha deve ter pelo menos 6 caracteres"
        }

        if (!customer.phone.trim()) {
            newErrors.phone = "Telefone é obrigatório"
        } else if (!/^\d{10,11}$/.test(customer.phone)) {
            newErrors.phone = "Telefone inválido. Apenas números (10-11 dígitos)."
        }

        if (customer.bio && customer.bio.length > 200) {
            newErrors.bio = "Biografia deve ter no máximo 200 caracteres"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        if (validate()) {
            try {
                const now = formatDate(new Date())
                const payload = {
                    ...customer,
                    registerDate: now,
                    lastUpdateDate: now,
                }

                const response = await api.post("/auth/register", payload)

                if (response.status >= 200 && response.status < 300) {
                    setTimeout(() => {
                        navigate("/login", { state: { registrationSuccess: true } })
                    }, 1500)
                }
            } catch (error: any) {
                if (error.response?.data) {
                    setErrors(error.response.data)
                } else {
                    console.error("Erro inesperado:", error)
                    setErrors({
                        username: "Erro ao cadastrar. Tente novamente.",
                    })
                }
            } finally {
                setIsSubmitting(false)
            }
        } else {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="bg-white rounded-xl shadow-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                        <button
                            onClick={() => navigate("/")}
                            className="flex items-center mb-4 px-4 py-2 bg-white/10 text-white border border-white/20 rounded-lg text-sm font-medium
                               hover:bg-white/20 hover:border-white/30
                               focus:outline-none focus:ring-2 focus:ring-white/30
                               transition-all duration-200 ease-in-out backdrop-blur-sm"
                        >
                            <FiArrowLeft className="mr-2" />
                            Voltar
                        </button>
                        <h2 className="text-3xl font-bold text-center">Crie sua conta</h2>
                        <p className="text-center text-blue-100 mt-2">
                            Já tem uma conta?{" "}
                            <button
                                onClick={() => navigate("/login")}
                                className="inline-block px-4 py-2 ml-2 bg-white text-blue-600 rounded-lg text-sm font-medium
                                   hover:bg-blue-50 hover:text-blue-700
                                   focus:outline-none focus:ring-2 focus:ring-white/30
                                   transition-all duration-200 ease-in-out"
                            >
                                Faça login
                            </button>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <Input
                            label="Nome completo"
                            name="name"
                            value={customer.name}
                            onChange={handleChange}
                            error={errors.name}
                            icon={<FiUser className="text-gray-400" />}
                            placeholder="Digite seu nome completo"
                        />

                        <Input
                            label="Email"
                            type="email"
                            name="username"
                            value={customer.username}
                            onChange={handleChange}
                            error={errors.username}
                            icon={<FiMail className="text-gray-400" />}
                            placeholder="seu@email.com"
                        />

                        <Input
                            label="Senha"
                            type="password"
                            name="password"
                            value={customer.password}
                            onChange={handleChange}
                            error={errors.password}
                            icon={<FiLock className="text-gray-400" />}
                            placeholder="Mínimo 6 caracteres"
                        />

                        <Input
                            label="Telefone"
                            name="phone"
                            value={customer.phone}
                            onChange={handleChange}
                            error={errors.phone}
                            icon={<FiPhone className="text-gray-400" />}
                            placeholder="Apenas números, 10-11 dígitos"
                        />

                        <Input
                            label="Biografia"
                            name="bio"
                            value={customer.bio}
                            onChange={handleChange}
                            error={errors.bio}
                            placeholder="Conte um pouco sobre você (opcional, até 200 caracteres)"
                        />

                        <div className="pt-4">
                            <Button
                                type="submit"
                                variant="primary"
                                className="cursor-pointer w-full py-3 font-medium rounded-lg"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Cadastrando..." : "Cadastrar"}
                            </Button>
                        </div>

                        <div className="text-center text-sm text-gray-500">
                            Ao se cadastrar, você concorda com nossos{" "}
                            <button className="text-blue-600 hover:underline font-medium">Termos de Serviço</button> e{" "}
                            <button className="text-blue-600 hover:underline font-medium">Política de Privacidade</button>.
                        </div>
                    </form>
                </Card>
            </motion.div>
        </div>
    )
}

export default CustomerRegistration
