import express,  {NextFunction, Request, Response, json} from 'express'
import noteRouter from './Routes/note.router'

const app = express()

app.use(json())

app.use("/notes", noteRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction)=>{
    res.json({
        message: error.message
    })
})

let port:number = 4100;

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`); 
})
