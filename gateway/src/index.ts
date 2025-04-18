import express, {Request, Response} from "express";
import proxy from "express-http-proxy";

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/user", proxy("http://nginx"));
app.use("/product", proxy("http://product-service:3001"));

app.get("/",(req: Request, res: Response) => {
    res.status(200).json({message: "Invento Gateway"});
})

app.listen(PORT, ()=> {
    console.log(`Invento Gateway Listening at: http://localhost:${PORT}`);
});
