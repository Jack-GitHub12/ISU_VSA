'use client'

import { useState, useEffect } from 'react'
import { Users, UserPlus, Search, Edit2, Trash2, Mail } from 'lucide-react'

interface Member {
  id: string
  name: string
  email: string
  year: string
  major: string
  joinDate: string
  status: 'active' | 'inactive'
}

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddMember, setShowAddMember] = useState(false)
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    year: '',
    major: ''
  })

  // Load members from localStorage
  useEffect(() => {
    const storedMembers = localStorage.getItem('vsa-members')
    if (storedMembers) {
      setMembers(JSON.parse(storedMembers))
    } else {
      // Sample data
      const sampleMembers: Member[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@iastate.edu',
          year: 'Junior',
          major: 'Computer Science',
          joinDate: '2023-09-01',
          status: 'active'
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane.smith@iastate.edu',
          year: 'Sophomore',
          major: 'Business',
          joinDate: '2023-09-15',
          status: 'active'
        }
      ]
      setMembers(sampleMembers)
      localStorage.setItem('vsa-members', JSON.stringify(sampleMembers))
    }
  }, [])

  const handleAddMember = () => {
    const member: Member = {
      id: Date.now().toString(),
      name: newMember.name,
      email: newMember.email,
      year: newMember.year,
      major: newMember.major,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active'
    }

    const updatedMembers = [...members, member]
    setMembers(updatedMembers)
    localStorage.setItem('vsa-members', JSON.stringify(updatedMembers))

    setNewMember({ name: '', email: '', year: '', major: '' })
    setShowAddMember(false)
  }

  const handleDeleteMember = (id: string) => {
    if (confirm('Are you sure you want to delete this member?')) {
      const updatedMembers = members.filter(m => m.id !== id)
      setMembers(updatedMembers)
      localStorage.setItem('vsa-members', JSON.stringify(updatedMembers))
    }
  }

  const handleToggleStatus = (id: string) => {
    const updatedMembers = members.map(m =>
      m.id === id
        ? { ...m, status: m.status === 'active' ? 'inactive' : 'active' as 'active' | 'inactive' }
        : m
    )
    setMembers(updatedMembers)
    localStorage.setItem('vsa-members', JSON.stringify(updatedMembers))
  }

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.major.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-cardinal mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Member Management</h1>
            </div>
            <button
              onClick={() => setShowAddMember(true)}
              className="flex items-center px-4 py-2 bg-cardinal text-white rounded-lg hover:bg-cardinal-dark transition-colors"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Add Member
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Major
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers.map(member => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{member.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Mail className="w-4 h-4 mr-1" />
                      {member.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.major}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleStatus(member.id)}
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        member.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {member.status}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteMember(member.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t">
          <p className="text-sm text-gray-500">
            Total: {filteredMembers.length} member{filteredMembers.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Add New Member</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
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
                  Email
                </label>
                <input
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <select
                  value={newMember.year}
                  onChange={(e) => setNewMember({ ...newMember, year: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                  required
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
                  required
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddMember(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMember}
                className="px-4 py-2 bg-cardinal text-white rounded-lg hover:bg-cardinal-dark transition-colors"
              >
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}