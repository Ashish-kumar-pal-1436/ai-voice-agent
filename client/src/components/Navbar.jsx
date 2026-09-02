
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import {FiLogOut} from 'react-icons/fi'
import { ServerUrl } from '../App'
import axios from 'axios'
import toast from 'react-hot-toast'

const Navbar = ({user, setUser}) => {
    const navigate = useNavigate()
    const handleLogout = async () =>{
         try {
             await axios.get(ServerUrl + "/api/auth/logout", {withCredentials: true})
             setUser(null)
             toast.success("Logout Successfully")
             navigate('/login')
         } catch (error) {
            toast.error("Logout Failed")
            console.log(error)
         }
    }
  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
              <div onClick={()=>navigate('/')}  className="flex items-center gap-2.5" >
                 <img src={logo} alt="logo" className='h-9 w-auto object-contain' />
                 <h1 className='font-bold text-xl text-gray-700 leading-none'>
                    Sunday{' '}
                     <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-emerald-500'>
                        AI
                     </span>
                 </h1>
              </div>
            
            {user && <div className='hidden md:flex items-center gap-3'>
                 <button onClick={()=>navigate('/builder')} className='px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-emerald-500 text-white text-sm font-medium shadow-md hover:scale-[1.02] transition-all cursor-pointer'>Builder</button>
                 <button onClick={()=>navigate('/billing')} className='px-4 py-2 rounded-xl border border-orange-100 bg-white text-gray-700 text-sm font-medium hover:border-purple-300 transition-al cursor-pointer' >Billing</button>
                 <div className='flex items-center gap-3 px-4 py-2 rounded-2xl bg-white border border-orange-100 shadow-sm'>
                    <div className='w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-emerald-500 flex items-center justify-center shrink-0'>
                       <span className='text-white text-sm font-bold'>
                         {user?.name.charAt(0).toUpperCase()}
                       </span>
                    </div>

                    <div className='max-w-[140px]'>
                      <p className='text-sm font-semibold text-gray-800 truncate'>{user.name}</p>
                      <p className='text-xs text-gray-400 truncate'>{user.email}</p>
                    </div> 

                    <button onClick={handleLogout} className='ml-1 text-gray-400 hover:text-red-500 transition-colors cursor-pointer'><FiLogOut size={18} /></button>
                 </div>
            </div> }

      </div>
    </div>
  )
}

export default Navbar