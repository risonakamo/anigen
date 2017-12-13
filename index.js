window.onload=main;

function main()
{
    var username="risona";

    alistReq(`{MediaListCollection(userName:"${username}",type:ANIME){statusLists{media{title{romaji},startDate{year},season,coverImage{large}}},customLists{media{title{romaji},startDate{year},season,coverImage{large}}}}}`,
    (d)=>{
        console.log(d);
    });
}

function alistReq(query,callback)
{
    var r=new XMLHttpRequest();
    r.open("POST","https://graphql.anilist.co");

    r.onreadystatechange=()=>{
        if (r.readyState==4)
        {
            callback(JSON.parse(r.response));
        }
    }

    r.setRequestHeader("content-type","application/json");
    r.send(JSON.stringify({query:query}));
}