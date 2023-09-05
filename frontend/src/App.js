import React from 'react'
function App() {
  return (
    <>  
        <div className='container d-flex justify-content-center mt-4'>
          <div className='rounded border border-dark'>
            <form className='d-flex  p-2  mx-sm-3'>
              <div className='me-2'>  
                <input 
                type="text"
                placeholder='Name' className='form-control'/>
              </div>
              <div className='me-2'>
                <input 
                type="text"
                placeholder='Roll no.' className='form-control'/>
              </div>
              <div className='form-group mx-sm-3 mb-2 d-flex'>
                <button className='btn btn-outline-success me-2'>Find</button>
                <button className='btn btn-outline-dark'>Add</button>
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
                  <tr>
                    <td>Student name</td>
                    <td>Student roll</td>
                    <td>
                      <div className='form-group mx-sm-3 mb-2 d-flex'>
                      <button className='btn btn-success me-2'>Edit</button>
                      <button className='btn btn-danger '>Delete</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </>
  );
}

export default App;
