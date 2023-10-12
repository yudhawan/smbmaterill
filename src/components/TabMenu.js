import {PlusIcon,ClipboardIcon, RefreshIcon,} from '@heroicons/react/outline'
import {useNavigate, useLocation} from 'react-router-dom'
function TabMenu() {
    const navigate = useNavigate()
    const {pathname} = useLocation()
  return (
    <div className='fixed bottom-0 left-0 w-full h-16 py-3 px-6 border-t border-gray-400 bg-white flex justify-between '>
        <div className='flex flex-col justify-center items-center cursor-pointer' onClick={()=>navigate('/')}>
            <PlusIcon className={`w-8 h-8 ${(pathname==="/")?'text-indigo-500':'text-gray-500'}`} />
            <p className={`text-sm ${(pathname==="/")?'text-indigo-500':'text-gray-500'} select-none`}>Inventaris</p>
        </div>
        <div className='flex flex-col justify-center items-center cursor-pointer' onClick={()=>navigate('/maintenance')}>
            <RefreshIcon className={`w-5 h-5 ${(pathname==="/maintenance")?'text-indigo-500':'text-gray-500'}`} />
            <p className={`text-sm ${(pathname==="/maintenance")?'text-indigo-500':'text-gray-500'} select-none`}>Maintenance</p>
        </div>
        <div className='flex flex-col justify-center items-center cursor-pointer' onClick={()=>navigate('/myinventaris')}>
            <ClipboardIcon className={`w-5 h-5 ${(pathname==="/myinventaris")?'text-indigo-500':'text-gray-500'}`} />
            <p className={`text-sm ${(pathname==="/myinventaris")?'text-indigo-500':'text-gray-500'} select-none`}>My Inventaris</p>
        </div>
    </div>
  )
}

export default TabMenu