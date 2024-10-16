import {Service} from "typedi";

/*
export class Id{
    private readonly idService= Container.get(IdService);
    private readonly _id: string;

    constructor(id: string){
        this.idService.registerId(id);
        this._id = id;

    }

    public get id(){
        return this._id;
    }

}
*/

@Service()
export class IdService {
    private maxId: number = 0;

    public registerId(id: string){
        const _id = parseInt(id);
        if (_id && _id > this.maxId){
            this.maxId = _id;
        }

    }

    public getNewId(){
        return (++this.maxId).toString();
    }
}