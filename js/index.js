window.onload=main;

var menucontrol;
var currentColour;

function main()
{
    menucontrol=new _menuControl;
    randomColour();
}

function loadData(username,year,season,language=0)
{
    if (language)
    {
        language="romaji";
    }

    else
    {
        language="native";
    }

    alistReq(`{MediaListCollection(userName:"${username}",type:ANIME){statusLists{media{title{${language}},startDate{year,month,day},season,coverImage{large},genres,format,siteUrl}},customLists{media{title{${language}},startDate{year,month,day},season,coverImage{large},genres,format,siteUrl}}}}`,
    (d)=>{
        var data=seasonYearFilter(d,year,season,language);
        genShowBoxes(data,username,season,year);
        menucontrol.getZoneWide();
    });
}

//callback is data usable by seasonYearFilter()
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
function seasonYearFilter(data,year,season,language)
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
                currentShow.title=currentShow.title[language];
                if (currentShow.season==season && currentShow.startDate.year==year && !seen.has(currentShow.title))
                {
                    seen.add(currentShow.title);
                    res.push(currentShow);
                }
            }
        }
    }

    return res;
}

function chartShot()
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

    var title=data.title;

    var startDate=data.startDate;

    //see showbox-string.html for expanded
    //returns [the html result,day index (starts from 0)]
    return [`<div class="showbox"><a href="${data.siteUrl}"><img src="${data.coverImage.large}"></a><div class="text"><p class="title">${title}</p><p class="info genres" style="color:${currentColour}">${genreString}</p><p class="info">${startDate.month}/${startDate.day}</p></div></div>`,
        new Date(startDate.year,startDate.month-1,startDate.day).getDay()];
}

//give it full showboxes html and actual day as a string
function wrapdayBox(showboxesString,dayString)
{
    return `<div class="daybox"><div class="day-label" style="color:${currentColour}">${dayString}</div>${showboxesString}</div>`;
}

//main gen function
//give it array of show objects
function genShowBoxes(data,username,season,year)
{
    var dayString=["日","月","火","水","木","金","土"];
    var days=["","","","","","",""];
    var daybox;
    season={FALL:"秋",WINTER:"冬",SUMMER:"夏",SPRING:"春"}[season];

    var e_showboxes=document.querySelector(".showboxes");

    //showbox starts with logobox, see logobox.html
    e_showboxes.innerHTML=`<div class="logobox"><img src="ag-logo.png"><div class="text-side"><div class="chart-info"><span class="season">${season}</span>${year}アニメ</div><div class="user">【${username}】</div></div></div>`;

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

//its in a function so i can call it whenever i want
function randomColour()
{
    currentColour=changeColour("#"+new tinycolor(`hsv(${randint(0,359)},${randint(40,100)},${randint(70,90)})`).toHex());
    menucontrol.showboxZone.style.backgroundColor=currentColour;
}

//change colour theme to given colour
function changeColour(colour)
{
    console.log(colour);
    document.styleSheets[0].rules[0].style.backgroundColor=colour;
    document.styleSheets[0].rules[1].style.color=colour;
    return colour;
}

function randint(min,max)
{
    return Math.floor(Math.random()*(max-min+1))+min;
}