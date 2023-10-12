import {LocationMarkerIcon} from '@heroicons/react/outline'
import { useEffect, useState, useRef } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getData,maintenance} from '../features/dataSlice'
let MAPBOX_TOKEN = "pk.eyJ1IjoieXVkaGF3YW4iLCJhIjoiY2wxa2cxZ3h2MDBnNDNqangzaHFuNXpwNyJ9.-NB1Dw2GlDb11fnUD3ZQng"
function AddPost() {
    const dispatch = useDispatch()
    const focus = useRef(null)
    const nmr = useSelector(state=>state.data)
    const {user} = useSelector(state=>state.auth)
    
    const [data,setdata] = useState({
      nomor_kendaraan:'',
      nama_kegiatan:'',
      lokasi:'',
      keterangan:'',
      status:'',
      lokasi:'',
      latitude:null,
      longitude:null,
      userId:user?.id,
    })
    
    const [validation,setvalidation] = useState('')
    const [autofill,setautofill] = useState('')
    function cekValidation(){
      if(data.nomor_kendaraan==="") return setvalidation('Nomor Kendaraan cannot be empty')
      if(data.nama_kegiatan==="") return setvalidation('Nama Kegiatan cannot be empty')
      if(data.lokasi==="") return setvalidation('Location cannot be empty')
      if(data.keterangan==="") return setvalidation('Keterangan cannot be empty')
      if(data.status==="") return setvalidation('Status cannot be empty')
      setvalidation('')
      return submit()
    }
    function submit(){
      // setdata({...data,userId: user.id})
      dispatch(maintenance(data))
      setvalidation('')
      setautofill('')
      setdata({
        nomor_kendaraan:'',
        nama_kegiatan:'',
        lokasi:'',
        keterangan:'',
        status:'',
        lokasi:'',
        latitude:null,
        longitude:null,
        userId:user?.id,
      })
    }
    function getMyLocation(){
      navigator.geolocation.getCurrentPosition(position => {
        setdata(prev=>({...prev,latitude:position.coords.latitude}))
        setdata(prev=>({...prev,longitude:position.coords.longitude}))
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${data.longitude},${data.latitude}.json?types=locality&access_token=${MAPBOX_TOKEN}`)
        .then(res=>res.json())
        .then(loc=> setdata({...data,lokasi:loc.features[0]?.place_name}))
      })
    }
    useEffect(() => {
      dispatch(getData())
      navigator.geolocation.getCurrentPosition(position => {
        setdata(prev=>({...prev,latitude:position.coords.latitude}))
        setdata(prev=>({...prev,longitude:position.coords.longitude}))
      })
      
    },[])
  return (
    <div  className='w-full h-full flex flex-col overflow-y-auto items-center'>
      {(data.latitude===null && data.longitude===null)?<>
      <p>Kamu tidak bisa membuat laporan tanpa menunjukan lokasimu</p>
      <button className='bg-green-500 py-1 px-2 w-fit text-white' onClick={()=>getMyLocation()}>Lokasi Saya</button>
      </>:
      <div className='flex-col w-full py-2 space-y-2'>
        <div className='relative w-full h-fit'>
          <div className='py-1 px-2 border border-gray-400 rounded-md w-80'>
            <input ref={focus} type='text' placeholder='Nomor Kendaraan' className='outline-none w-full' value={data.nomor_kendaraan} onChange={(e)=>{
              setdata({...data, nomor_kendaraan:e.target.value})
              setautofill(e.target.value)
              }} />
          </div>
          {autofill?<div className='bg-white absolute top-8 w-80 max-h-40 left-0 flex-col p-2 divide-y border-r border-b border-l rounded-md border-gray-400'>
            {nmr.data?.filter(val => val.nomor_kendaraan.toLowerCase().includes(data.nomor_kendaraan.toLowerCase())).map((val,index)=>
              <p key={index+1} className='text-xs text-gray-600 rounded-sm pl-2 py-1 hover:bg-gray-100 cursor-pointer font-semibold' onClick={()=>{
                setdata({...data, nomor_kendaraan:val.nomor_kendaraan})
                setautofill('')
              }}>{val.nomor_kendaraan}</p>
            )}
          </div>:<></>}
        </div>
        <div className='py-1 px-2 border border-gray-400 rounded-md w-80'>
          <textarea type='text' placeholder='Nama Kegiatan' className='outline-none w-full' value={data.nama_kegiatan} onChange={(e)=>setdata({...data, nama_kegiatan:e.target.value})} />
        </div>
        <div className='flex space-x-1 items-center border border-gray-400 px-2 py-1 rounded-md w-80' onClick={()=>getMyLocation()}>
          <LocationMarkerIcon className='w-6 h-6 text-blue-400'/>
          <p className='text-gray-400 line-clamp-1'>{data.lokasi?data.lokasi:<>Lokasi saya?</>}</p>
        </div>
        <div className='py-1 px-2 border border-gray-400 rounded-md w-80'>
          <textarea type='text' placeholder='Keterangan...' className='outline-none w-full' value={data.keterangan} onChange={(e)=>setdata({...data, keterangan:e.target.value})} />
        </div>
        <div className='flex space-x-1 w-60 border boder-indigo-300 rounded-sm p-2'>
            <select className='w-full' value={data.status} onChange={(e)=> setdata({...data, status: e.target.value})}>
                <option>Pilih Status</option>
                <option value='baik'>Baik</option>
                <option value='rusak ringan'>Rusak Ringan</option>
                <option value='rusak sedang'>Rusak Sedang</option>
                <option value='rusak berat'>Rusak Berat</option>
            </select>
        </div>
        {validation&&<p className='text-red-500 text-sm'>{validation}</p>}
        <button className='bg-green-500 text-white py-1 px-3 w-fit rounded-md' onClick={cekValidation}>Update</button>
      </div>}
    </div>
  )
}

export default AddPost