import { Commentaire } from "./commentaire";
import { Population } from "./population";

export class Region {
    public id!: number;
    public image!: string;
    public nomregion!: string;
    public coderegion!: string;
    public activité!: string;
    public langue!: string;
    public date!: Date;
    public description!: string;
    public superficie!: string;
    public commentaires!: Commentaire[];
    public populations!: Population[];
}
