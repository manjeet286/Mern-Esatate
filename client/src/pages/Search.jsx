import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ListingItem from '../Components/ListingItem';
function Search() {
  const [sidebardata ,setSidebarData]=useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  })
  const [loading ,setLoading]= useState(false);
  const [listing ,setListings]= useState([]);
  const [showMore, setShowMore]=useState(false)
    console.log(listing);
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');
    if (
        searchTermFromUrl ||
        typeFromUrl ||
        parkingFromUrl ||
        furnishedFromUrl ||
        offerFromUrl ||
        sortFromUrl ||
        orderFromUrl
      ) {
        setSidebarData({
          searchTerm: searchTermFromUrl || '',
          type: typeFromUrl || 'all',
          parking: parkingFromUrl === 'true' ? true : false,
          furnished: furnishedFromUrl === 'true' ? true : false,
          offer: offerFromUrl === 'true' ? true : false,
          sort: sortFromUrl || 'created_at',
          order: orderFromUrl || 'desc',
        })
    }

     const fetchListings= async()=>{
              setLoading(true);
              setShowMore(false);
              const searchQuery= urlParams.toString();
              const res= await fetch(`/api/listing/get?${searchQuery}`)
              const data= await res.json();
              if(data.length>8)
              {
                setShowMore(true)
              }
              else{
                 setShowMore(false)
              }
              setListings(data);
              setLoading(false);


     }
     fetchListings();
  },[window.location.search])

  const navigate= useNavigate();
   const handleChange=(e)=>{
        if(e.target.id==='all'|| e.target.id=='rent' || e.target.id=='sale')
        {
             setSidebarData({...sidebardata,type:e.target.id})

        }
        if(e.target.id==='searchTerm')
        {
            setSidebarData({...sidebardata ,searchTerm:e.target.value})
        }
        if(e.target.id==='parking' || e.target.id=='furnished' || e.target.id==='offer')
        {
              setSidebarData({...sidebardata ,[e.target.id]:e.target.checked || e.target.checked==='true' ? true:false})
        }
             if(e.target.id==='sort_order')
             {
                 const sort= e.target.value.split('_')[0]|| 'created_at';
                 const order= e.target.value.split('_')[1]|| 'desc';
                 setSidebarData({...sidebardata ,sort ,order})
             }
   }
   console.log(sidebardata)
   const handleSubmit=(e)=>{
    e.preventDefault();
      const urlParams= new URLSearchParams();
      urlParams.set('searchTerm' , sidebardata.searchTerm)
      urlParams.set('type' ,sidebardata.type);
      urlParams.set('parking', sidebardata.parking);
      urlParams.set('furnished', sidebardata.furnished);
      urlParams.set('offer', sidebardata.offer);
      urlParams.set('sort', sidebardata.sort);
      urlParams.set('order', sidebardata.order);
      const searchQuery= urlParams.toString();
      navigate(`/search?${searchQuery}`)

   }
   const onShowMoreClick=async()=>{
    const numberOfListing= listing.length;
    const startIndex= numberOfListing
    const urlParams= new URLSearchParams(location.search);
    urlParams.set('startIndex' ,startIndex);

    const searchQuery= urlParams.toString();
    const res=await fetch(`/api/listing/get?${searchQuery}`)
    const data= res.json();
    if(data.length<9)
    {
       setShowMore(false);
    }
    setListings([...listing, ...data]);
  
   }
  
    return (
    <div className='flex flex-col md:flex-row'>
      <div className=' p-7 border-b-2 md:border-r-2 md:min-h-screen'>
         <form  onSubmit={handleSubmit}   action="" className='flex flex-col gap-8'>
            <div className='flex items-center gap-2 '>
                <label className='whitespace-nowrap' >Search Term</label>
                <input type="text"
                 id='searchTerm'
                 placeholder='Search..'
                 value={sidebardata.searchTerm}
                 onChange={handleChange}
                 className='border rounded-lg p-3 w-full' />
            </div>
            <div className='flex gap-2 flex-wrap items-center'>
                <label className='font-semibold' >Type:</label>
                <div className='flex gap-2'>
                    <input type="checkbox" id="all"  onChange={handleChange}  checked={sidebardata.type==='all'} className='w-5'/>
                    <span>Rent & Sale</span>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox" id="sale"  onChange={handleChange}  checked={sidebardata.type==='sale'} className='w-5'/>
                    <span> Sale</span>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox" id="rent"onChange={handleChange}  checked={sidebardata.type==='rent'}  className='w-5'/>
                    <span>Rent </span>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox" id="offer" onChange={handleChange}  checked={sidebardata.offer}  className='w-5'/>
                    <span>offer</span>
                </div>
                
            </div>
            <div className='flex gap-2 flex-wrap items-center'>
                <label className='font-semibold' >Amenties:</label>
                <div className='flex gap-2'>
                    <input type="checkbox" id="parking"  onChange={handleChange}  checked={sidebardata.parking} className='w-5'/>
                    <span>Parking</span>
                </div>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox" id="furnished"  onChange={handleChange}  checked={sidebardata.furnished}   className='w-5'/>
                    <span> Furnishred</span>
                </div>
                <div className='flex items-center gap-2'>
                     <label  className='font-semibold'>Sort:</label>
                     <select  id="sort_order" onChange={handleChange} defaultValue={'created_at_desc'} className='border rounded-lg p-3'>
                        <option value='regularPrice_desc'>Price high to low</option>
                        <option   value='regularPrice_asc'>Price low to high</option>
                        <option  value='created_desc'>lLatest</option>
                        <option value='created_asc'>Older</option>
                     </select>
                </div>
                
              <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Search</button>
         </form>
      </div>
      <div className=' flex-1'>
         <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing Results</h1>
         <div className='p-7 flex flex-wrap gap-4'>
             {!loading &&  listing.length===0 && (
               <p className='text-xl text-slate-700 '>No Listing Found</p>
             )}
             {loading && (
               <p className='text-xl text-slate-700 text-center w-full'>Lading</p>
             )}
             {
               !loading && listing && listing.map((listing)=>(
                    <ListingItem key={listing._id} listing={listing}/>
               ))
             }
             {showMore && (
              <button onClick={
                 onShowMoreClickz
              }
               className='text-green-700 hover:underline p-7 text-center w-full'
              >
                Show More
              </button>
             )}
         </div>
      </div>
    </div>
  )
}

export default Search

