"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Card from "../components/generic/Card"
import Input from "../components/generic/Input"
import Button from "../components/generic/Button"
import api from "../api"
import { FiMail, FiLock, FiArrowLeft, FiAlertCircle } from "react-icons/fi"
import { motion } from "framer-motion"
import { useAuth } from "../contexts/AuthContext.tsx"

const Login: React.FC = () => {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    })
    const [errors, setErrors] = useState({
        username: "",
        password: "",
        general: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCredentials((prev) => ({ ...prev, [name]: value }))
        // Clear error when typing
        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [name]: "", general: "" }))
        }
    }

    const validate = (): boolean => {
        const newErrors = {
            username: "",
            password: "",
            general: "",
        }
        let isValid = true

        if (!credentials.username.trim()) {
            newErrors.username = "Email é obrigatório"
            isValid = false
        } else if (!/^\S+@\S+\.\S+$/.test(credentials.username)) {
            newErrors.username = "Email inválido"
            isValid = false
        }

        if (!credentials.password) {
            newErrors.password = "Senha é obrigatória"
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        if (validate()) {
            try {
                const response = await api.post("/auth/login", credentials)

                if (response.status === 200) {
                    login(response.data.token)
                }
            } catch (error: any) {
                if (error.response?.status === 401) {
                    setErrors({
                        ...errors,
                        general: "Credenciais inválidas. Verifique seu email e senha.",
                    })
                } else {
                    setErrors({
                        ...errors,
                        general: "Erro ao fazer login. Tente novamente mais tarde.",
                    })
                    console.error("Erro inesperado:", error)
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
                            onClick={() => navigate(-1)}
                            className="flex items-center mb-4 px-4 py-2 bg-white/10 text-white border border-white/20 rounded-lg text-sm font-medium
                               hover:bg-white/20 hover:border-white/30
                               focus:outline-none focus:ring-2 focus:ring-white/30
                               transition-all duration-200 ease-in-out backdrop-blur-sm"
                        >
                            <FiArrowLeft className="mr-2" />
                            Voltar
                        </button>
                        <h2 className="text-3xl font-bold text-center">Bem-vindo de volta</h2>
                        <p className="text-center text-blue-100 mt-2">
                            Novo por aqui?{" "}
                            <button
                                onClick={() => navigate("/cadastro")}
                                className="inline-block px-4 py-2 ml-2 bg-white text-blue-600 rounded-lg text-sm font-medium
                                   hover:bg-blue-50 hover:text-blue-700
                                   focus:outline-none focus:ring-2 focus:ring-white/30
                                   transition-all duration-200 ease-in-out"
                            >
                                Crie uma conta
                            </button>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {errors.general && (
                            <div className="flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-50">
                                <FiAlertCircle className="flex-shrink-0 mr-3 text-red-500 text-lg" />
                                <span>{errors.general}</span>
                            </div>
                        )}

                        <Input
                            label="Email"
                            type="email"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            error={errors.username}
                            icon={<FiMail className="text-gray-400" />}
                            placeholder="seu@email.com"
                        />

                        <Input
                            label="Senha"
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            error={errors.password}
                            icon={<FiLock className="text-gray-400" />}
                            placeholder="Digite sua senha"
                        />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 focus:ring-2 border-gray-300 rounded transition-colors"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Lembrar de mim
                                </label>
                            </div>

                            <button
                                type="button"
                                onClick={() => navigate("/recuperar-senha")}
                                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                            >
                                Esqueceu sua senha?
                            </button>
                        </div>

                        <div className="pt-2">
                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full py-3 font-medium rounded-lg"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                    <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                      <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                      ></circle>
                      <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Entrando...
                  </span>
                                ) : (
                                    "Entrar"
                                )}
                            </Button>
                        </div>
                    </form>
                </Card>
            </motion.div>
        </div>
    )
}

export default Login
