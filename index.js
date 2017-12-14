window.onload=main;

function main()
{
    var username="risona";

    // alistReq(`{MediaListCollection(userName:"${username}",type:ANIME){statusLists{media{title{romaji},startDate{year,month,day},season,coverImage{large},genres}},customLists{media{title{romaji},startDate{year,month,day},season,coverImage{large},genres}}}}`,
    // (d)=>{
    //     console.log(seasonYearFilter(d,2018,"WINTER"));
    // });
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

//give it direct data from alistreq
function seasonYearFilter(data,year,season)
{
    data=data.data.MediaListCollection;
    var res=[];
    var seen=new Set();

    //speed
    var currentArray;
    var currentShow;

    for (var x in data)
    {
        for (var y in data[x])
        {
            currentArray=data[x][y];
            for (var z=0,l=currentArray.length;z<l;z++)
            {
                currentShow=currentArray[z].media;
                if (currentShow.season==season && currentShow.startDate.year==year && !seen.has(currentShow.title.romaji))
                {
                    seen.add(currentShow.title.romaji);
                    res.push(currentShow);
                }
            }
        }
    }

    return res;
}

function shotTest()
{
    html2canvas(document.querySelector(".showboxes"),{
        allowTaint:true
    }).then((c)=>{
        document.querySelector(".output").appendChild(c);
    });
}