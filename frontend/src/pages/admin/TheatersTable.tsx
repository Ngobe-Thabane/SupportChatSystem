import { useEffect, useState } from "react";
import Table from "./Table";
import { getTheaterList } from "../../lib/GetMovies";
import type { Thater } from "../../interfaces/Theater.interface";

const TheatersTable = () => {

  const [theaters, setTheaters] = useState<Array<Thater>>([]);
	useEffect(()=>{
		const theatersList = async ()=>{
			const thaterList = await getTheaterList();
			setTheaters(thaterList);
		}
	theatersList();
	})

  return (
    <Table
      headers={["Name", "Location", "Actions"]}
      data={theaters.map((t) => [t.name, t.location,
				<div className="space-x-2" key={t.theater_id}>
          <button  className="text-blue-600 hover:underline">
            Edit
          </button>
          <button  className="text-red-600 hover:underline">
            Delete
          </button>
        </div>
			])}
    />
  );
};

export default TheatersTable;
