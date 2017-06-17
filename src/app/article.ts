interface ArticleJson{
    title:string,
    url:string
    votes:string,
    publishedAt:string,
    description:string,
    author:string
}


export class Article {
    public publishAt : Date

    //conversion json object to class by passing constructor
    static fromJson(json:ArticleJson):Article{
        let article = Object.create(Article.prototype);
        return Object.assign(article,json,{
            votes: json.votes?json.votes:0,
            publishAt:json.publishedAt?new Date(json.publishedAt):new Date()
        })
    }
    

    constructor( 
        public title:string,
        public description:string,
        public urlToImage: string,
        public votes?:number,
        
    ){
        this.votes = this.votes || 0;
        this.publishAt =  new Date();
    }


    public upVote(){
        this.votes = this.votes + 1;
    }
     public downVote(){
        this.votes = this.votes - 1;
    }
}
