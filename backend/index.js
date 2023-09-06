//require express,mongoose,cors
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 4000;

//connecting our database
mongoose.connect('mongodb+srv://premyesh32:Premscluster@cluster0.efdrxlu.mongodb.net/student',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB is connected"))
.catch((err) => console.log(err));

const studentSchema = new mongoose.Schema({
    name: {type:String},
    rollno: {type:Number, unique:true},
});

const Student = mongoose.model('student',studentSchema);

//Create a new student
app.post('/', async(req,res)=>{
    const newStudent = req.body;
    try{
        const createdStudent = await Student.create(newStudent);
        res.status(201).json({message: 'Student added successfully'});

    }catch(error){
        console.error('Failed to add!',error);
        res.status(500).json('Error!');
    }
})

//Read all the students
app.get('/', async(req,res)=>{
    try{
        const allStudents = await Student.find();
        res.status(200).json(allStudents);
    } catch{
        console.error('Error! ',error);
        res.status(500).json('Error!');
    }
})

//Delete a student
app.delete('/:id',async(req,res)=>{
    try{
        const Id = req.params.id;
        const deleteDatails = await Student.deleteOne({_id: Id});
        res.status(200).send({message:"Deleted successfully!"});
    } catch(error){
        res.status(500).send("Error: ",error);
    }
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})