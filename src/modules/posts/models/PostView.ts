export interface PostView{
    _id? : string;
    user : string;
    text : string;
    image : string;
    name : string;
    avatar : string;
    likes : [
        {
            _id? : string;
            user : string;
        }
    ],
    comments : [
        {
            _id? : string;
            user : string;
            text : string;
            name : string;
            avatar : string;
            date : string;
        }
    ],
    createdAt? : string;
    updatedAt? : string;
}