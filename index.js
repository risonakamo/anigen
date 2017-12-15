window.onload=main;

function main()
{
    var username="Risona";
    var e_showboxes=document.querySelector(".showboxes");

    alistReq(`{MediaListCollection(userName:"${username}",type:ANIME){statusLists{media{title{native},startDate{year,month,day},season,coverImage{large},genres,format}},customLists{media{title{native},startDate{year,month,day},season,coverImage{large},genres,format}}}}`,
    (d)=>{
        var data=seasonYearFilter(d,2017,"FALL");
        genShowBoxes(data);
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
                if (currentShow.season==season && currentShow.startDate.year==year && !seen.has(currentShow.title.native))
                {
                    seen.add(currentShow.title.native);
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

//give it single show object
function genShowBox(data)
{
    var genreString="";
    var genres=data.genres;

    for (var x=0,l=genres.length;x<l;x++)
    {
        genreString+=`<span>${genres[x]}</span> `;
    }

    var formatString=data.format;

    if (formatString=="TV_SHORT")
    {
        formatString="SHORT";
    }

    genreString+=`<span class="format">${formatString}</span>`;

    var title=data.title.native;

    var startDate=data.startDate;

    //see showbox-string.html for expanded
    return [`<div class="showbox"><img src="${data.coverImage.large}"><div class="text"><p class="title">${title}</p><p class="info genres">${genreString}</p><p class="info">${startDate.month}/${startDate.day}</p></div></div>`,
        new Date(startDate.year,startDate.month-1,startDate.day).getDay()];
}

//give it full showboxes html and actual day as a string
function wrapdayBox(showboxesString,dayString)
{
    return `<div class="daybox"><div class="day-label">${dayString}</div>${showboxesString}</div>`;
}

//give it array of show objects
function genShowBoxes(data)
{
    var dayString=["日","月","火","水","木","金","土"];
    var days=["","","","","","",""];
    var daybox;

    var e_showboxes=document.querySelector(".showboxes");

    for (var x=0,l=data.length;x<l;x++)
    {
        daybox=genShowBox(data[x]);
        days[daybox[1]]+=daybox[0];
    }

    for (var x=0;x<7;x++)
    {
        if (days[x])
        {
            e_showboxes.insertAdjacentHTML("beforeend",wrapdayBox(days[x],dayString[x]));
        }
    }
}