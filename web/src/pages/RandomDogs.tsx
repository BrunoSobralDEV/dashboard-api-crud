import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";

export function RandomDogs() {
  const [isLoading, setIsLoading] = useState(true);
  const [imgResponse, setImgResponse] = useState('');
  

  async function fetchRandomDogs() {
    const response = await fetch(`https://random.dog/woof.json?filter=mp4,webm`);
    const data: {fileSizeBytes: number, url: string } = await response.json();
    setImgResponse(data.url);
    setIsLoading(false)
    console.log(data.url);
    console.log(imgResponse)
  }

  useEffect(() => {

    fetchRandomDogs()
    // const downloadImage = async (url: string) => {
    //   const imageBlob = await fetchHttpCats(url);
    //   const data = await imageBlob.json()
    //   // const imageBase64 = URL.createObjectURL(imageBlob);
    //   setImgResponse(data)
    // }

    // async function fetchHttpCats(url: string) {
    //   const response = await fetch(url);
    //   const data = await response.text()
    //   // console.log(data)
    //   return data
    // }
    // downloadImage('https://random.dog/woof.json')    
  }, [])


  return (
    <div>
      <h1>Random Dogs</h1>
      <div style={{height: "300px", marginBottom: "10px"}}>
        {isLoading && <Loading />}
        {!isLoading && <img id='img'src={imgResponse} alt="" style={{height:"100%"}}/>}

      </div>
      <button onClick={fetchRandomDogs}>{isLoading?"Loading...":"Refresh"}</button>
    </div>
  )
}