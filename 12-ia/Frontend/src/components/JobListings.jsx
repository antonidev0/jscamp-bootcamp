import { JobCard } from "./JobCard.jsx";

export default function JobListings({ jobs }) {
 
     if (jobs.length === 0) {
       return (
         <div className="no-jobs">
           <p>No hay trabajos disponibles en este momento.</p>
         </div>
       );
     }
    return (
      <>
        <h2 style={{ textAlign: "center" }}>Resultados de búsqueda</h2>
        <div className="jobs-listings">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </>
    );
}