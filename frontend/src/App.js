import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  //fetch all student details
  const [students, setStudents] = useState('');

  useEffect(()=>{
    fetchStudents();
  },[]);

  const fetchStudents = () =>{
    axios.get('http://localhost:4000/')
    .then((response)=>{
      setStudents(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  //-------------------------------------------
  
  //Create
  const [inputData,setInputdata] = useState({
    name:'',
    rollno:'',
  });

  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
      await axios.post('http://localhost:4000/',inputData);
      toast.success('Added Data successfully');
      fetchStudents();
    }catch(error){
      console.error('Error: ',error);
      toast.error('Failed to Add!');
    }
  }

  const handleChange = (event) =>{
    const { name , value } = event.target;
    setInputdata({
      ...inputData,
      [name]:value,
    });
  };
  //--------------------------------------

  //Delete
  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/${id}`)
    .then(()=>{
      toast.success('Deleted data successfully!');
      fetchStudents();
    })
    .catch(()=>{
      toast.error("Failed to Delete!");
    })
  }

  return (
    <>  
        <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
        <div className='container d-flex justify-content-center mt-4'>
          <div className='rounded border border-dark'>
            <form className='d-flex  p-2  mx-sm-3' onSubmit={handleSubmit}>
              <div className='me-2'>  
                <input 
                type="text"
                placeholder='Name' className='form-control'
                name='name'
                value={inputData.name}
                onChange={handleChange}/>
              </div>
              <div className='me-2'>
                <input 
                type="text"
                placeholder='Roll no.' className='form-control'
                name='rollno'
                value={inputData.rollno}
                onChange={handleChange}/>
              </div>
              <div className='form-group mx-sm-3 mb-2 d-flex'>
                <button className='btn btn-outline-success me-2'>Find</button>
                <button className='btn btn-outline-dark' type='submit'>Add</button>
              </div>
            </form>
            <div className='d-flex m-2'>
              <table className='table table-dark table-bordered'>
                <thead>
                  <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Roll no.</th>
                    <th scope='col'>Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {!students?(
                    <p>No students</p>
                  ):(
                    <>
                      {students.map((data)=>(
                        <tr key={data.id}>
                            <td>{data.name}</td>
                            <td>{data.rollno}</td>
                          <td>
                            <div className='form-group mx-sm-3 mb-2 d-flex'>
                            <button className='btn btn-success me-2'>Edit</button>
                            <button className='btn btn-danger' 
                            onClick={()=> handleDelete(data._id)}>Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))

                      }
                    </>
                  )
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </>
  );
}

export default App;
