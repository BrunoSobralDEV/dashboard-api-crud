import { useEffect, useState } from "react"
import Select, { OptionProps } from 'react-select';

export function Http() {
  const [statusCode, setStatusCode] = useState('');
  const [imgResponse, setImgResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const codes = [
    100,101,102,103,
    200,201,202,203,204,206,
    300,301,302,303,304,305,307,308,
    400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,420,421,422,423,424,425,426,429,431,444,450,451,497,498,499,
    500,501,502,503,504,506,507,508,509,510,511,521,522,523,525,599,
    999
  ]

  useEffect(() => {
    const downloadImage = async (url: string) => {
      const imageBlob = await fetchHttpCats(url);
      const imageBase64 = URL.createObjectURL(imageBlob);
    
      setImgResponse(imageBase64)
    }

    async function fetchHttpCats(url: string) {
      const response = await fetch(`${url}${statusCode}`);
      const data = await response.blob()
      return data
    }
    downloadImage('https://http.cat/')
    
  },[statusCode])

  return (
    <div className="vh-100">
      <h1>Http Page - API HTTPCat</h1>
      <Select
        isLoading={isLoading}
        options={codes.map( code => {return {value: code, label: code}})}
        onChange={(option: any) => setStatusCode(option.label)} 
      />
      <img id='img'src={imgResponse} alt="" />
    </div>
  )
}