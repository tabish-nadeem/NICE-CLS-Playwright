import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();

app.use(cors());

app.listen(process.env.PORT, () => {
  console.info(`Server up and running on PORT ${process.env.PORT}`);
});
const baseUrl = 'https://jsonplaceholder.typicode.com'

app.get('/:env',async (req,res)=>{
  console.log(req.params);
  console.log(req.query);

  const subUrl = getSubUrl(req.params.env);

  const response = await axios.get(`${baseUrl}/${subUrl}`);
  const data = await response.data;
  const statusCode = response.status;
  // return data;
  res.json(data).sendStatus(statusCode);

})
// dev === users
const getSubUrl = (param:string):string => {
  if(param === process.env.DEV){
    return 'users';
  }else if(param === process.env.STAGE){
    return 'postss';
  }else{
    return 'todos';
  }
}