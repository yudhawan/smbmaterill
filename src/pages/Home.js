import React, { useEffect, useRef, useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {addData} from '../features/dataSlice'
function Home() {
    const dispatch = useDispatch()
    const {msg,isLoading ,error} = useSelector(state=>state.data)
    const {user} = useSelector(state=>state.auth)
    const [inventaris,setinventaris] = useState({
        kategori:null,
        nama_barang:null,
        jumlah_barang:0,
        baik: 0,
        rusak_ringan:0,
        rusak_berat:0,
        // periode_waktu:null,
        userId: user?.id
    })
    const [image,setimage] = useState(null)
    const [validation,setvalidation] = useState('')
    const img = useRef(null)
    const date = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
    const [picture,setpicture]=useState(null)
    function handleSubmit(){
        // if(image===null) return setvalidation('Please enter a the form')
        if(inventaris.kategori===null) return setvalidation('Please enter a the form')
        if(inventaris.nama_barang===null) return setvalidation('Please enter a the form')
        if(inventaris.jumlah_barang===0) return setvalidation('Please enter a the form')
        if(inventaris.baik===0) return setvalidation('Please enter a the form')
        if(inventaris.rusak_ringan===0) return setvalidation('Please enter a the form')
        if(inventaris.rusak_berat===0) return setvalidation('Please enter a the form')
        setvalidation('')
        return submit()
    }
    const submit = () => {
        dispatch(addData({image:image, data: inventaris}))
        // setinventaris({
        //     nama_barang:'',
        //     nomor_kendaraan:'',
        //     status:'',
        //     tahun_pengadaan: '',
        //     rusak_ringan:null,
        //     periode:'',
        //     periode_waktu:null,
        //     userId: user?.id
        // })
        // setimage(null)
        // setpicture(null)
        // setvalidation('')
    }
    useEffect(() => {
        
    },[])
  return (
    <div className='flex flex-col space-y-2 lg:space-y-3 w-full h-screen p-2 lg:px-14 lg:py-4'>
        <div className='flex space-x-1 w-60 border boder-indigo-300 rounded-sm p-2'>
            <select className='w-full' value={inventaris.kategori} onChange={(e)=> setinventaris({...inventaris, kategori: e.target.value})}>
                <option>Pilih Categories</option>
                <option value='pal' className='uppercase'>pal</option>
                <option value='hub' className='uppercase'>hub</option>
                <option value='kes' className='uppercase'>kes</option>
                <option value='paska' className='uppercase'>paska</option>
                <option value='freewall' className='uppercase'>freewall</option>
                <option value='dakibu' className='uppercase'>dakibu</option>
                <option value='satwa' className='uppercase'>satwa</option>
                <option value='zeni' className='uppercase'>zeni</option>
            </select>
        </div>
        <div className='w-60 p-2 rounded-md border border-gray-400'>
            <input type="text" placeholder='Nama Barang/Inventaris' className='outline-none w-full' value={inventaris.nama_barang} onChange={(e)=> setinventaris({...inventaris, nama_barang:e.target.value})} />
        </div>
        <div className='w-60 p-2 rounded-md border border-gray-400'>
            <input type="number" placeholder='Jumlah Kendaraan/Inventaris' className='outline-none w-full' value={inventaris.jumlah_barang} onChange={(e)=> setinventaris({...inventaris, jumlah_barang:parseInt(e.target.value)})} />
        </div>
        <div className='w-60 p-2 rounded-md border border-gray-400'>
            <input type="number" min='1' placeholder='Keadaan Baik' className='outline-none w-full' value={inventaris.baik} onChange={(e)=> setinventaris({...inventaris, baik: parseInt(e.target.value)})} />
        </div>
        <div className='w-60 p-2 rounded-md border border-gray-400'>
            <input type="number" min='1' placeholder='Keadaan Rusak Ringan' className='outline-none w-full' value={inventaris.rusak_ringan} onChange={(e)=> setinventaris({...inventaris, rusak_ringan: parseInt(e.target.value)})} />
        </div>
        <div className='w-60 p-2 rounded-md border border-gray-400'>
            <input type="number" min='1' placeholder='Keadaan Rusak Berat' className='outline-none w-full' value={inventaris.rusak_berat} onChange={(e)=> setinventaris({...inventaris, rusak_berat: parseInt(e.target.value)})} />
        </div>
        {/* <div className='flex space-x-1 w-60 border boder-indigo-300 rounded-sm p-2'>
            <select className='w-full' value={inventaris.status} onChange={(e)=> setinventaris({...inventaris, status: e.target.value})}>
                <option>Pilih Status</option>
                <option value='baik'>Baik</option>
                <option value='rusak ringan'>Rusak Ringan</option>
                <option value='rusak sedang'>Rusak Sedang</option>
                <option value='rusak berat'>Rusak Berat</option>
            </select>
        </div> */}
        {/* <input ref={img} hidden type="file" accept='image/*' onChange={(e)=>{
            let pic = URL.createObjectURL(e.target.files[0])
            setpicture(pic)
            setimage(e.target.files[0])
        }} />
        <div className='flex-col space-y-1'>
            <p className='text-gray-600 text-sm'>Masukan Foto Kendaraan</p>
            {picture?<div className='w-32 h-24 rounded-sm border border-indigo-300'><img src={picture} className="w-full h-full bg-cover rounded-sm" onClick={()=> img.current.click()} /></div>
            :<div className='w-32 h-24 rounded-md border border-indigo-300 bg-gray-300 flex justify-center items-center cursor-pointer' onClick={()=> img.current.click()}>
                <p className='text-gray-500 text-2xl'>Empty</p>
            </div>}
        </div>
        <div className='flex-col space-y-1'>
            <p className='text-gray-600 text-sm'>Tanggal Perawatan</p>
            <div className='flex space-x-1 w-60 border boder-indigo-300 rounded-sm p-2'>
                <select className='w-full' value={inventaris.rusak_ringan} onChange={(e)=>setinventaris({...inventaris, rusak_ringan:e.target.value})}>
                    <option>Pilih Tanggal</option>
                    {date.map(val => <option key={val+1} value={val}>{val}</option>)}
                </select>
            </div>
            {inventaris.rusak_ringan&&<div className='flex space-x-1 w-60 border boder-indigo-300 rounded-sm p-2'>
                <select className='w-full' value={inventaris.periode} onChange={(e)=>setinventaris({...inventaris, periode:e.target.value})}>
                    <option>Pilih Periode</option>
                    <option value='mingguan'>Mingguan</option>
                    <option value='bulanan'>Bulanan</option>
                </select>
            </div>}
            {inventaris.periode&&<div className='w-60 p-2 rounded-md border border-gray-400'>
                <input type="number" min='1' placeholder='Masukan Angka' className='outline-none w-full' value={inventaris.periode_waktu} onChange={(e)=> setinventaris({...inventaris, periode_waktu: e.target.value})} />
            </div>}

        </div> */}
        {inventaris.periode_waktu&&<div className='w-60 h-auto'><p className='text-gray-700 font-bold text-xs'>Perawatan setiap {inventaris.periode_waktu+' '+inventaris.periode} sekali pada tanggal {inventaris.rusak_ringan}</p></div>}
        <button className='text-white bg-green-600 px-2 py-1 rounded-md w-fit' onClick={handleSubmit}>{isLoading?<>Loading...</>:<>Submit</>}</button>
        {validation&&<p className='text-red-600'>{validation}</p>}
        {error&&<p className='text-red-600'>{error}</p>}
    </div>
  )
}

export default Home