'use client'

import { useState, useEffect } from 'react'
import { Users, UserPlus, Search, Edit2, Trash2, Upload, Save, X } from 'lucide-react'
import Image from 'next/image'
import { db } from '@/lib/firebase'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore'

interface BoardMember {
  id: string
  name: string
  role: string
  major: string
  year: string
  email: string
  image: string
  bio: string
  order: number
}

const defaultRoles = [
  'President',
  'Vice President',
  'Secretary',
  'Treasurer',
  'Cultural Chair',
  'Social Chair',
  'PR Chair',
  'Webmaster',
  'Fundraising Chair',
  'Sports Chair'
]

export default function AdminBoardPage() {
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddMember, setShowAddMember] = useState(false)
  const [editingMember, setEditingMember] = useState<BoardMember | null>(null)
  const [loading, setLoading] = useState(true)
  const [newMember, setNewMember] = useState<Partial<BoardMember>>({
    name: '',
    role: '',
    major: '',
    year: '',
    email: '',
    bio: '',
    image: '/images/default-avatar.png'
  })
  const [customRole, setCustomRole] = useState('')
  const [imagePreview, setImagePreview] = useState<string>('')

  // Load board members from Firestore
  useEffect(() => {
    loadBoardMembers()
  }, [])

  const loadBoardMembers = async () => {
    try {
      setLoading(true)
      const q = query(collection(db, 'boardMembers'), orderBy('order', 'asc'))
      const querySnapshot = await getDocs(q)
      const members: BoardMember[] = []

      querySnapshot.forEach((doc) => {
        members.push({ id: doc.id, ...doc.data() } as BoardMember)
      })

      setBoardMembers(members)
    } catch (error) {
      console.error('Error loading board members:', error)
      // Fallback to localStorage if Firestore fails
      const storedBoard = localStorage.getItem('vsa-board-members')
      if (storedBoard) {
        setBoardMembers(JSON.parse(storedBoard))
      }
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        setImagePreview(base64)
        if (isEdit && editingMember) {
          setEditingMember({ ...editingMember, image: base64 })
        } else {
          setNewMember({ ...newMember, image: base64 })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddMember = async () => {
    try {
      const memberData = {
        name: newMember.name || '',
        role: customRole || newMember.role || '',
        major: newMember.major || '',
        year: newMember.year || '',
        email: newMember.email || '',
        bio: newMember.bio || '',
        image: newMember.image || '/images/default-avatar.png',
        order: boardMembers.length + 1
      }

      await addDoc(collection(db, 'boardMembers'), memberData)

      // Reset form
      setNewMember({
        name: '',
        role: '',
        major: '',
        year: '',
        email: '',
        bio: '',
        image: '/images/default-avatar.png'
      })
      setCustomRole('')
      setImagePreview('')
      setShowAddMember(false)

      // Reload board members
      await loadBoardMembers()
    } catch (error) {
      console.error('Error adding board member:', error)
      alert('Failed to add board member. Please try again.')
    }
  }

  const handleUpdateMember = async () => {
    if (!editingMember) return

    try {
      const memberRef = doc(db, 'boardMembers', editingMember.id)
      const { id, ...memberData } = editingMember
      await updateDoc(memberRef, memberData)

      setEditingMember(null)
      setImagePreview('')

      // Reload board members
      await loadBoardMembers()
    } catch (error) {
      console.error('Error updating board member:', error)
      alert('Failed to update board member. Please try again.')
    }
  }

  const handleDeleteMember = async (id: string) => {
    if (confirm('Are you sure you want to remove this board member?')) {
      try {
        await deleteDoc(doc(db, 'boardMembers', id))
        await loadBoardMembers()
      } catch (error) {
        console.error('Error deleting board member:', error)
        alert('Failed to delete board member. Please try again.')
      }
    }
  }

  const handleMoveUp = async (index: number) => {
    if (index === 0) return

    try {
      const newMembers = [...boardMembers]
      const temp = newMembers[index]
      newMembers[index] = newMembers[index - 1]
      newMembers[index - 1] = temp

      // Update order in Firestore
      for (let i = 0; i < newMembers.length; i++) {
        const memberRef = doc(db, 'boardMembers', newMembers[i].id)
        await updateDoc(memberRef, { order: i + 1 })
      }

      await loadBoardMembers()
    } catch (error) {
      console.error('Error reordering:', error)
    }
  }

  const handleMoveDown = async (index: number) => {
    if (index === boardMembers.length - 1) return

    try {
      const newMembers = [...boardMembers]
      const temp = newMembers[index]
      newMembers[index] = newMembers[index + 1]
      newMembers[index + 1] = temp

      // Update order in Firestore
      for (let i = 0; i < newMembers.length; i++) {
        const memberRef = doc(db, 'boardMembers', newMembers[i].id)
        await updateDoc(memberRef, { order: i + 1 })
      }

      await loadBoardMembers()
    } catch (error) {
      console.error('Error reordering:', error)
    }
  }

  const filteredMembers = boardMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cardinal mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading board members...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-cardinal mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Executive Board Management</h1>
            </div>
            <button
              onClick={() => setShowAddMember(true)}
              className="flex items-center px-4 py-2 bg-cardinal text-white rounded-lg hover:bg-cardinal-dark transition-colors"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Add Board Member
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search board members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
            />
          </div>
        </div>

        <div className="p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredMembers.sort((a, b) => a.order - b.order).map((member, index) => (
              <div key={member.id} className="bg-gray-50 rounded-lg p-4 relative">
                <div className="flex items-start space-x-4">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    {member.image && member.image !== '/images/default-avatar.png' ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-full h-full rounded-lg bg-gray-200 flex items-center justify-center">
                        <Users className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-cardinal font-medium">{member.role}</p>
                    <p className="text-xs text-gray-500">{member.year} - {member.major}</p>
                    <p className="text-xs text-gray-500 truncate">{member.email}</p>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{member.bio}</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Move Up"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => handleMoveDown(index)}
                      disabled={index === filteredMembers.length - 1}
                      className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Move Down"
                    >
                      ↓
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingMember(member)
                        setImagePreview(member.image)
                      }}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteMember(member.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t">
          <p className="text-sm text-gray-500">
            Total: {filteredMembers.length} board member{filteredMembers.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Add New Board Member</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Users className="w-10 h-10 text-gray-400" />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, false)}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-cardinal file:text-white
                      hover:file:bg-cardinal-dark"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role *
                </label>
                <select
                  value={newMember.role}
                  onChange={(e) => {
                    setNewMember({ ...newMember, role: e.target.value })
                    setCustomRole('')
                  }}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                >
                  <option value="">Select a role</option>
                  {defaultRoles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                  <option value="custom">Custom Role</option>
                </select>
                {newMember.role === 'custom' && (
                  <input
                    type="text"
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                    placeholder="Enter custom role"
                    className="mt-2 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                  />
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <select
                    value={newMember.year}
                    onChange={(e) => setNewMember({ ...newMember, year: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                  >
                    <option value="">Select Year</option>
                    <option value="Freshman">Freshman</option>
                    <option value="Sophomore">Sophomore</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                    <option value="Graduate">Graduate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Major
                  </label>
                  <input
                    type="text"
                    value={newMember.major}
                    onChange={(e) => setNewMember({ ...newMember, major: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  value={newMember.bio}
                  onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                  placeholder="Brief description or bio..."
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowAddMember(false)
                  setImagePreview('')
                  setCustomRole('')
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMember}
                className="px-4 py-2 bg-cardinal text-white rounded-lg hover:bg-cardinal-dark transition-colors"
              >
                Add Board Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {editingMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Edit Board Member</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Users className="w-10 h-10 text-gray-400" />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, true)}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-cardinal file:text-white
                      hover:file:bg-cardinal-dark"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={editingMember.name}
                    onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={editingMember.email}
                    onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role *
                </label>
                <input
                  type="text"
                  value={editingMember.role}
                  onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                  placeholder="Enter role (e.g., President, Vice President, or custom role)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <select
                    value={editingMember.year}
                    onChange={(e) => setEditingMember({ ...editingMember, year: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                  >
                    <option value="">Select Year</option>
                    <option value="Freshman">Freshman</option>
                    <option value="Sophomore">Sophomore</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                    <option value="Graduate">Graduate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Major
                  </label>
                  <input
                    type="text"
                    value={editingMember.major}
                    onChange={(e) => setEditingMember({ ...editingMember, major: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  value={editingMember.bio}
                  onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                  placeholder="Brief description or bio..."
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setEditingMember(null)
                  setImagePreview('')
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateMember}
                className="px-4 py-2 bg-cardinal text-white rounded-lg hover:bg-cardinal-dark transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
