import jobsData from "../data.json";
import { JobCard } from "./JobCard.jsx";

export default function JobListings() {

    console.log(jobsData,"aeeeeeeeeeeeee"); 
    
    return (
      <>
        <h2 style={{ textAlign: "center" }}>Resultados de búsqueda</h2>
        <div className="jobs-listings">
          {jobsData.map((job) => (
            <JobCard job={job} />
          ))}
        </div>
      </>
    );
}