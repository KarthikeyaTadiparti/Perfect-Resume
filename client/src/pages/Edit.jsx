import React from "react";
import Create from "./Create";

function Edit() {
    return (
        <Create
            resumeData={{
                firstName: "Karthikeya",
                lastName: "Tadiparti",
                email: "kartikeyatadiparti@gmail.com",
                mobile: "8919305582",
                geo: {
                    city: "Visakhapatnam",
                    country: "India",
                },
            }}
        />
    );
}

export default Edit;
