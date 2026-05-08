import { useEffect } from "react";


export default function Home() {
  useEffect(() => {
    const callAPI = async () => {
      try {
        const response = await fetch('http://localhost:5000/users')
        const data = await response.json()
        console.log(data)
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
