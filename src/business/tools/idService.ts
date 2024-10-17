import {Service} from "typedi";

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