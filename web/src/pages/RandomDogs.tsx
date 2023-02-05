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
  }, [])


  return (
    <div className="w-30">
      <div className="card mb-4 rounded-3 shadow-sm">
        <div className="card-header py-3">
          <h4 className="my-0 fw-normal">Random Dogs</h4>
        </div>
        <div className="card-body">
          <div style={{height: "300px", marginBottom: "10px"}}>
            {isLoading && <Loading />}
            {!isLoading && <img id='img'src={imgResponse} alt="" style={{height:"100%"}}/>}

          </div>
          <button type="button" className="w-100 btn btn-lg btn-outline-primary" onClick={fetchRandomDogs}>{isLoading?"Loading...":"Próxima"}</button>
        </div>
      </div>
    </div>
  )
}