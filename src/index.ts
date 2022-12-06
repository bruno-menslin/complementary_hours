import * as express from "express"
import { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { AppDataSource } from "./data-source"
import { router } from "./routes"

AppDataSource.initialize().then(async () => {

    const app = express()

    app.use(express.json())
    app.use(router)

    app.use(
        (err: Error, request: Request, response: Response, next: NextFunction) => {
            if (err instanceof Error) {
                return response.status(400).json({
                    error: err.message
                })
            }
            return response.status(500).json({
                error: "Internal Server Error"
            })
        }
    )

    app.listen(3000)

    console.log("Express server has started on port 3000.")
}).catch(error => console.log(error))
