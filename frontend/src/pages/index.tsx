import { api } from "@/api/axiosInstance";
import { useEffect } from "react";


export default function Home() {
  useEffect(() => {
    const callAPI = async () => {
      try {
        const response = await api.get('http://localhost:5000/users')
        console.log('response', response)
        // const data = await response.json()
        // console.log(data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    callAPI()
  }, [])
  return (
    <>

    </>
  );
}