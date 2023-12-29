import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const BasicForm = () => {
    const {
      values,
      handleBlur,
      handleChange,
    } = useFormik({
      initialValues: {
        Title: "",
        Description: "",
        Type: "",
        Start_Date: "",
        End_Date: "",
      },
    });
    const navigate = useNavigate();
  
    return (
      <form  autoComplete="off">
        <label htmlFor="Title">Title</label>
        <input
          value={values.Title}
          onChange={handleChange}
          id="Title"
          type="text"
          placeholder="Enter the Title of Goal"
          onBlur={handleBlur}
          required
        />
        <label htmlFor="Description">Description</label>
        <textarea
          rows="5"
          value={values.Description}
          onChange={handleChange}
          id="Description"
          type="text"
          placeholder="Enter the Description"
          onBlur={handleBlur}
          required
        />
        <label htmlFor="Type">Type</label>
        <input
          value={values.Type}
          onChange={handleChange}
          id="Type"
          type="text"
          placeholder="Enter the Type"
          onBlur={handleBlur}
          required
        />
        <label htmlFor="Start_Date">Start Date</label>
        <input
          id="Start_Date"
          type="date"
          placeholder="Enter the Start Date"
          value={values.Start_Date}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        <label htmlFor="End_Date">End Date</label>
        <input
          id="End_Date"
          type="date"
          placeholder="Enter the End Date"
          value={values.End_Date}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        <button className="submitButton" type="submit">
          Submit
        </button>
        <button className="cancelButton" type="submit" variant="success" onClick={()=>navigate('/Dashboard')}>
          Cancel
        </button>
      </form>
    );
  };

  export default BasicForm;