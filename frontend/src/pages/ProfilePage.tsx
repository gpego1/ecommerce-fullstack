"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Card from "../components/generic/Card"
import Input from "../components/generic/Input"
import Button from "../components/generic/Button"
import {
    FiUser,
    FiMail,
    FiPhone,
    FiKey,
    FiLink2,
    FiTrash2,
    FiEdit3,
    FiCamera,
    FiArrowLeft,
} from "react-icons/fi"

import { motion } from "framer-motion"

interface UserData {
    name: string
    email: string
    phone: string
    bio: string
    avatar?: string
    joinDate: string
}

const formatDateTime = (dateStr: string) => {
    if (!dateStr) return ""
    const [datePart, timePart] = dateStr.split(" ")
    if (!datePart || !timePart) return ""

    const [day, month, year] = datePart.split("/").map(Number)
    const [hours, minutes] = timePart.split(":").map(Number)

    const date = new Date(year, month - 1, day, hours, minutes)
    return `${String(day).padStart(2,"0")}/${String(month).padStart(2,"0")}/${year} ${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}`
}


const ProfilePage: React.FC = () => {
    const navigate = useNavigate()
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState<UserData>({
        name: "",
        email: "",
        phone: "",
        bio: "",
        avatar: "",
        joinDate: "",
    })

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login")
            return
        }

        fetch("/auth/users/me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Error to search for user info.")
                return res.json()
            })
            .then((data) => {
                setFormData({
                    name: data.name,
                    email: data.username,
                    phone: data.phone || "",
                    bio: data.bio || "",
                    avatar: data.avatar,
                    joinDate: formatDateTime(data.registerDate || ""),
                })
            })
            .catch((err) => {
                console.error(err)
                localStorage.removeItem("token")
                navigate("/login")
            })
    }, [navigate])

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSave = () => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login")
            return
        }
        fetch("/auth/users/me", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: formData.name,
                username: formData.email,
                phone: formData.phone,
                bio: formData.bio,
                avatar: formData.avatar,
            }),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Error to save profile.")
                return res.json()
            })
            .then((updatedUser) => {
                setFormData({
                    name: updatedUser.name,
                    email: updatedUser.username,
                    phone: updatedUser.phone || "",
                    bio: updatedUser.bio || "",
                    avatar: updatedUser.avatar,
                    joinDate: formatDateTime(updatedUser.registerDate),
                })
                setIsEditing(false)
            })
            .catch((e) => {
                console.error(e)
                alert("Error to update profile.")
            })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                    <div className="flex items-center gap-4">
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
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-2xl font-bold border-2 border-white/20">
                                {formData.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </div>
                            <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center hover:bg-blue-50 transition-colors">
                                <FiCamera className="w-3 h-3" />
                            </button>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">{formData.name}</h1>
                            <p className="text-blue-100 mt-1">Membro desde {formData.joinDate}</p>
                        </div>
                    </div>
                </div>

                {/* Personal Information Card */}
                <div className="p-6 space-y-6">
                    <Card className="bg-white rounded-xl shadow-2xl overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                        <FiUser className="text-blue-600" />
                                        Informações Pessoais
                                    </h3>
                                    <p className="text-gray-600 mt-1">Gerencie suas informações básicas de perfil</p>
                                </div>
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium
                                   hover:bg-blue-700
                                   focus:outline-none focus:ring-2 focus:ring-blue-500
                                   transition-all duration-200 ease-in-out"
                                >
                                    <FiEdit3 className="inline mr-2" />
                                    {isEditing ? "Cancelar" : "Editar"}
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        {isEditing ? (
                                            <Input
                                                label="Nome completo"
                                                name="name"
                                                value={formData.name}
                                                onChange={(e) => handleInputChange("name", e.target.value)}
                                                icon={<FiUser className="text-gray-400" />}
                                            />
                                        ) : (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Nome completo</label>
                                                <p className="text-gray-900 font-medium">{formData.name}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        {isEditing ? (
                                            <Input
                                                label="Email"
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange("email", e.target.value)}
                                                icon={<FiMail className="text-gray-400" />}
                                            />
                                        ) : (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                                <div className="flex items-center gap-2">
                                                    <FiMail className="text-gray-400" />
                                                    <p className="text-gray-900">{formData.email}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        {isEditing ? (
                                            <Input
                                                label="Telefone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                                icon={<FiPhone className="text-gray-400" />}
                                            />
                                        ) : (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                                                <div className="flex items-center gap-2">
                                                    <FiPhone className="text-gray-400" />
                                                    <p className="text-gray-900">{formData.phone}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    {isEditing ? (
                                        <Input
                                            label="Biografia"
                                            name="bio"
                                            value={formData.bio}
                                            onChange={(e) => handleInputChange("bio", e.target.value)}
                                            icon={<FiUser className="text-gray-400" />}
                                        />
                                    ) : (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Biografia</label>
                                            <p className="text-gray-900">{formData.bio}</p>
                                        </div>
                                    )}
                                </div>

                                {isEditing && (
                                    <div className="flex gap-3 pt-4">
                                        <Button onClick={handleSave} variant="primary" className="px-6 py-2 font-medium rounded-lg">
                                            Salvar alterações
                                        </Button>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium
                                       hover:bg-gray-50 hover:border-gray-400
                                       focus:outline-none focus:ring-2 focus:ring-blue-500
                                       transition-all duration-200 ease-in-out"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                </div>
            </motion.div>
        </div>
    )
}

export default ProfilePage
