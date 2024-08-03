import React, { useEffect, useState } from 'react'
import { fireStore ,auth,fireStorage} from '../config/firebase-config'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

export default function Movies(props) {
    const {updatedtitle,handleChange}=props;
    const [movieName,setMovieName]=useState("");
    const [releaseYear,setReleaseYear] = useState(0);
    const [isOscarWinner,setIsOscarWinner]=useState(false);
    const [movieList,setMovieList]=useState([]);
    
    const [uploadFile,setFileUpload]=useState(null);
    

    const movieCollectionRef=collection(fireStore,"movies");
    const getMovies = async()=>{
        try{
        const data = await getDocs(movieCollectionRef);
        const FilteredData=data.docs.map((doc)=>{
          return(
            {
                id:doc.id,
                ...doc.data()
            }
          )
        });
        setMovieList(FilteredData);
    }catch(err){console.error(err);}
    }

    useEffect(()=>{
        getMovies(); // eslint-disable-next-line
        },[]);

    const addMovie=async()=>{
        try{
            await addDoc(movieCollectionRef,{name:movieName,releaseYear:releaseYear,OscarAward:isOscarWinner,userId:auth?.currentUser?.uid});
            getMovies();
        }catch(err){console.error(err);}
    };
    const deleteMovie=async(id)=>{
        try{
            const movieDoc = await doc(movieCollectionRef,id);
            await deleteDoc(movieDoc);
            getMovies();
        }catch(err){console.error(err);}
    };
    const updateTitle=async(id)=>{
        try {
            const movieDoc = await doc(movieCollectionRef,id);
            await updateDoc(movieDoc,{name:updatedtitle});
            getMovies();
        } catch (error) {
            console.error(error);
        }
    };

    const UploadFile= async()=>{
    try{
      const storageFolderref = ref(fireStorage,`ProjectFiles/${uploadFile.name}`);
      if(!uploadFile) {return;}
      await uploadBytes(storageFolderref,uploadFile);}
      catch(err){console.error(err);}
    };
  return (
    <div>
      <input type="text" placeholder='movie name...' value={movieName} onChange={(e)=>{setMovieName(e.target.value)}}/>
      <input type="number" placeholder='release year...' value={releaseYear} onChange={(e)=>{setReleaseYear(Number(e.target.value))}}/>
      <input type='checkbox' checked={isOscarWinner} onChange={e=>setIsOscarWinner(e.target.checked)}/>
      <button onClick={addMovie}>Add Movie</button>
      {movieList.map((movie)=>{
        return <div key={movie.id}>
            <h2 style={{color:movie.OscarAward?"green":"red"}}>{movie.name}</h2>
            <p>{movie.releaseYear}</p>
            <button onClick={()=>{deleteMovie(movie.id)}}> Delete Movie</button>
            <input placeholder="New title..." onChange={handleChange}/>
            <button onClick={()=>{updateTitle(movie.id)}}> Update title</button>
        </div>
      })}

      <div>
        <input type="file" onChange={e=>setFileUpload(e.target.files[0])}/>
        <button onClick={UploadFile}>Upload File</button>
      </div>
    </div>
  )
}
