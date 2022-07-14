import  express  from "express";
import { v4 as uuidv4} from 'uuid';

const router=express.Router();
let users=[{
    firstname:"john",
    lastname:"doe",
    age:"25"
},
{
    firstname:"adam",
    lastname:"eve",
    age:30
}
]

//all routes in here are starting from /users only therefore we put / only
router.get('/',(req,res)=>{
   
// res.write("hello from /users");
res.send(users)
})


router.post('/',(req,res)=>{
    const user=req.body;
const userId=uuidv4();
const userWithId={...user, id:userId};

users.push(userWithId);
res.send(`User with name ${user.firstname} added\n`);
})

router.get('/:id',(req,res)=>{
    const {id}=req.params;
   const foundUser= users.find((user)=>user.id===id)
    res.send(foundUser);
})

router.delete('/:id',(req,res)=>{
    const {id}=req.params;
    users=users.filter((user)=> user.id!=id)
    res.send(`user with id ${id} deleted`) 
})


router.patch('/:id',(req,res)=>{
    const {id}=req.params;
    let {firstname, lastname, age}=req.body;
    const userToBeUpdated=users.find((user)=>user.id==id);
    
    if(firstname)
    {
        userToBeUpdated.firstname=firstname;
    }
    if(lastname)
    {
        userToBeUpdated.lastname=lastname;
    }
    if(age)
    {
        userToBeUpdated.age=age;
    }
    res.send(`user with ${id} updated`)
})


export default router;