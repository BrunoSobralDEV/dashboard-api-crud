import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";

export function RandomDogs() {
  const [randomUsers, setRandomUsers] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [imgResponse, setImgResponse] = useState('');
  

  useEffect(() => {
    const downloadImage = async (url: string) => {
      const imageBlob = await fetchHttpCats(url);
      const imageBase64 = URL.createObjectURL(imageBlob);
    
      setImgResponse(imageBase64)
    }

    async function fetchHttpCats(url: string) {
      const response = await fetch(url);
      const data = await response.text()
      console.log(data)
      return data
    }
    downloadImage('https://random.dog/')    
  }, [])

  // if(isLoading) return <Loading />

  return (
    <div>
      <h1>Random Dogs</h1>
      <img id='img'src={imgResponse} alt="" />
    </div>
  )
}