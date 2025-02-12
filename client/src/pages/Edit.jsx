import React, { useEffect } from "react";
import Create from "./Create";
import { useParams } from "react-router-dom";

function Edit() {
    let {id} = useParams();
    console.log("id : "+id);
    return (
        
        <Create
            // resumeData={{
            //     firstName: "Karthikeya",
            //     lastName: "Tadiparti",
            //     email: "kartikeyatadiparti@gmail.com",
            //     mobile: "8919305582",
            //     geo: {
            //         city: "Visakhapatnam",
            //         country: "India",
            //     },
            // }}
        />
    );
}

export default Edit;
