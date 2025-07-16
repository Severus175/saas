import React, { useEffect, useState } from 'react'
import { Gem, Sparkles } from 'lucide-react'
import { Protect, useAuth } from '@clerk/clerk-react'
import CreationItem from '../components/CreationItem'
import axios from 'axios'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const Dashboard = () => {
  const [creations, setCreations] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState(null)
  const { getToken } = useAuth()

  const getDashboardData = async () => {
    try {
      const token = await getToken()
      if (!token) return

      const { data } = await axios.get('/api/user/get-user-creations', {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (data.success) {
        setCreations(data.creations)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getDashboardData()
  }, [])

  return (
    <div className='h-full overflow-y-scroll p-6 bg-black text-white'>

      {/* Summary Cards */}
      <div className='flex justify-start gap-4 flex-wrap'>

        {/* Total Creations Card */}
        <div className='flex justify-between items-center w-72 p-4 px-6 bg-[#111111] rounded-xl border border-purple-500/30 shadow-[0_0_12px_#8e37eb30]'>
          <div className='text-gray-300'>
            <p className='text-sm'>Total Creations</p>
            <h2 className='text-xl font-semibold'>{creations.length}</h2>
          </div>
          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center'>
            <Sparkles className='w-5 text-white' />
          </div>
        </div>

        {/* Active Plan Card */}
        <div className='flex justify-between items-center w-72 p-4 px-6 bg-[#111111] rounded-xl border border-pink-500/30 shadow-[0_0_12px_#e754c430]'>
          <div className='text-gray-300'>
            <p className='text-sm'>Active Plan</p>
            <h2 className='text-xl font-semibold'>
              <Protect plan='premium' fallback='Free'>Premium</Protect>
            </h2>
          </div>
          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center'>
            <Gem className='w-5 text-white' />
          </div>
        </div>
      </div>

      {/* Recent Creations */}
      {loading ? (
        <div className='flex justify-center items-center h-3/4'>
          <div className='animate-spin rounded-full h-11 w-11 border-4 border-purple-500 border-t-transparent'></div>
        </div>
      ) : (
        <div className='space-y-4 mt-6 max-w-5xl'>
          <p className='text-gray-300 font-medium mb-4'>Recent Creations</p>
          {creations.map((item) => (
            <CreationItem
              key={item.id}
              item={item}
              expanded={expandedId === item.id}
              onExpand={() =>
                setExpandedId(expandedId === item.id ? null : item.id)
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard
