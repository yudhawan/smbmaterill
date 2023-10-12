import { useEffect, useState, useRef } from 'react'
import {TrashIcon} from '@heroicons/react/outline'
import {useDispatch, useSelector} from 'react-redux'
import {getData,deleteData} from '../features/dataSlice'
function MyInventaris() {
  const dispatch = useDispatch()
  const {data} = useSelector(state=>state.data)
  useEffect(()=>{
    dispatch(getData())
  },[])
  return (
    <div  className='flex flex-col space-y-1 lg:space-y-3 w-full h-screen py-2 px-4 lg:px-14 lg:py-4'>
      {
        data.map((item,index)=>{
          const date = new Date(item.createAt).toISOString().substring(0,10)
          return(
            <div key={index+1} className='rounded-lg p-3 w-80 h-32 bg-slate-100 border border-gray-200 flex justify-start flex-col space-y-1'>
              <div className='flex justify-between'>
                <p className='text-gray-700 font-semibold'>{item.nama_barang}</p>
                <div className='p-1 rounded-md bg-rose-500 h-fit cursor-pointer' onClick={()=>dispatch(deleteData(item.id))}><TrashIcon className='w-4 h-4 text-white' /></div>
              </div>
              {/* <p className='text-green-600 text-xs'>{item.nomor_kendaraan}</p> */}
              {/* <p className='text-gray-700  text-sm'>Perawatan setiap {item.periode_waktu+' '+item.periode} sekali pada tanggal {item.waktu_perawatan}</p> */}
              <div className='flex justify-between'>
                <p className='text-xs text-gray-400'>created date {date}</p>
                <>
                {
                  (item.baik)?<div className='flex items-center space-x-1'><div className='w-3 h-3 rounded-full bg-green-600 '></div><p className='text-gray-400 uppercase text-xs rounded-lg'>Baik ({item.baik})</p></div>:
                  (item.rusak_ringan)?<div className='flex items-center space-x-1'><div className='w-3 h-3 rounded-full bg-blue-600 t'></div><p className='ext-wgray-400 uppercase text-xs rounded-lg'>Rusak Ringan ({item.rusak_ringan})</p></div>:
                  (item.rusak_berat)?<div className='flex items-center space-x-1'><div className='w-3 h-3 rounded-full bg-indigo-600'></div><p className=' text-gray-400 uppercase text-xs rounded-lg'>Rusak Berat ({item.rusak_berat})</p></div>:
                  <div className='flex items-center space-x-1'><div className='w-3 h-3 rounded-full bg-rose-600'></div><p className=' text-gray-400 uppercase text-xs rounded-lg'>{item.status}</p></div>
                }
                </>
              </div>
            </div>
          )}
        )
      }
    </div>
  )
}

export default MyInventaris