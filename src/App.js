import React, {useState, useEffect} from 'react';
import ImageCard from './components/imageCard';
import ImageSearch from './components/imageSearch';



function App() {

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`)
      .then(res => res.json())
      .then(data => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch(err => console.err(err));
  },[term])

  return (
    <>
    <div className="container mx-auto">
      {isLoading 
      ? 
      <h1 className="text-6xl"> LOADING... </h1>
      :  
      <>

        <ImageSearch searchText = {(text) => setTerm(text)} />

        {!isLoading && images.length > 0 ?  
        <div className="grid grid-cols-3 gap-4">
          {images.map(image => (
            <ImageCard key={image.id} image={image}/>
          ))}
        </div> 
        : 'empty search again '}
      </>
      
      }
      
      
    </div>
    </>
  );
}

export default App;
