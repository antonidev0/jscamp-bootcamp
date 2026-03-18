import { useParams } from "react-router"

export function JobDetail() {
    const { id } = useParams();

    return (
        <> 
          <h1>Job Detail</h1> 
        </>
    )
}