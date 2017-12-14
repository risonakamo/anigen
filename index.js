window.onload=main;

function main()
{
    var username="risona";
    var e_showboxes=document.querySelector(".showboxes");

    alistReq(`{MediaListCollection(userName:"${username}",type:ANIME){statusLists{media{title{romaji},startDate{year,month,day},season,coverImage{large},genres}},customLists{media{title{romaji},startDate{year,month,day},season,coverImage{large},genres}}}}`,
    (d)=>{
        var data=seasonYearFilter(d,2018,"WINTER");
        console.log(data);
        e_showboxes.insertAdjacentHTML("beforeend",genShowBox(data[0]));
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

function genShowBox(data)
{
    var genreString="";
    var ta=data.genres;

    for (var x=0,l=ta.length;x<l;x++)
    {
        genres.push(`<span>ta[x]</span> `);
    }

    var title=data.title.romaji;

    var startDate=data.startDate;
    var dayday=new Date(startDate.year,startDate.month-1,startDate.day).getDay();

    //see showbox-string.html for expanded
    return `<div class="showbox"><img src="${data.coverImage.large}"><div class="text"><p class="title">${title}</p><p class="info genres">${genreString}</p><p class="info">${startDate.month}/${startDate.day}</p></div></div>`;
}