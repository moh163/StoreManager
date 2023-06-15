import { DatabaseService } from "@app/services/database.service";
import { HTTP_STATUS_CODES } from "@common/const";
import { Router } from "express";
import { Service } from "typedi";

@Service()
export class DatabaseController {
    router: Router;
    constructor(private databaseService: DatabaseService,) {
        this.configureRouter();
        databaseService.connect();
    }
    destructor() {
        this.databaseService.closeConnection();
    }
    configureRouter() {
        this.router = Router();

        this.router.get('/categories', async (req, res) => {
           await this.databaseService.getCategorie().then((categories) => {
                res.json(categories).status(HTTP_STATUS_CODES.OK)
            }).catch((err) => { 
                console.log(err);
                res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
            });
        });

        this.router.post('/categories', async (req, res) => {
            await this.databaseService.addCategorie(req.body).then(() => {
                res.sendStatus(HTTP_STATUS_CODES.CREATED);
            }).catch((err) => {
                console.log(err);
                if(err.message === 'La catégorie existe déjà'){
                    res.sendStatus(HTTP_STATUS_CODES.CONFLICT);
                }else{
                res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
                }
            });
        });

        this.router.post('/items', async (req, res) => {
            await this.databaseService.addItem(req.body).then(() => {
                res.sendStatus(HTTP_STATUS_CODES.CREATED);
            }).catch((err) => {
                console.log(err);
                if(err.message === 'L\'item existe déjà'){
                    res.sendStatus(HTTP_STATUS_CODES.CONFLICT);
                }else{
                res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
                }
            });
        });

        this.router.get('/items/:catName', async (req, res) => {
            await this.databaseService.getItemByCat(req.params.catName).then((items) => {
                res.json(items).status(HTTP_STATUS_CODES.OK)
            }).catch((err) => { 
                console.log(err);
                res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
            });

        });



    }
}