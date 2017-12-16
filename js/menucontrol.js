class _menuControl
{
    constructor()
    {
        var block1=document.querySelector(".block-1");

        this.userEntry=block1.querySelector(".user-id");
        this.yearEntry=block1.querySelector(".year-box");

        this.seasonButtons=block1.querySelectorAll(".season span");
        this.languageButtons=block1.querySelectorAll(".language span");

        this.submit=block1.querySelector(".submit");

        this.showboxZone=document.querySelector(".showboxes");
        var block2=document.querySelector(".output-control");
        this.showboxZoneControl=block2.querySelector(".wide-control");
        this.showboxHeight=block2.querySelector(".height-control");
        this.outputZone=block2.querySelector(".output");

        this.defaultInputs();
        this.initButtons();
    }

    defaultInputs()
    {
        if (this.lastloadLoad())
        {
            return;
        }

        var curDate=new Date();
        this.yearEntry.value=curDate.getFullYear();

        var month=curDate.getMonth();

        if (month==11 || month==0 || month==1)
        {
            this.seasonButtons[3].classList.add("selected");
        }

        else if (month>=2 && month<=4)
        {
            this.seasonButtons[0].classList.add("selected");
        }

        else if (month>=5 && month<=7)
        {
            this.seasonButtons[1].classList.add("selected");
        }

        else
        {
            this.seasonButtons[2].classList.add("selected");
        }
    }

    initButtons()
    {
        //season button selection
        for (var x=0;x<4;x++)
        {
            this.seasonButtons[x].addEventListener("click",(e)=>{

                for (var x=0;x<4;x++)
                {
                    this.seasonButtons[x].classList.remove("selected");
                }

                e.currentTarget.classList.add("selected");
            });
        }

        //language selection
        for (var x=0;x<2;x++)
        {
            this.languageButtons[x].addEventListener("click",(e)=>{

                for (var x=0;x<2;x++)
                {
                    this.languageButtons[x].classList.remove("selected");
                }

                e.currentTarget.classList.add("selected");
            });
        }

        //submit button
        this.submit.addEventListener("click",()=>{
            this.sendResult();
        });

        //user id field enter
        this.userEntry.addEventListener("keydown",(e)=>{
            if (e.key=="Enter")
            {
                this.sendResult();
            }
        });

        //width control mousewheel
        var controlValue;
        this.showboxZoneControl.addEventListener("wheel",(e)=>{
            e.preventDefault();

            if (!this.showboxZoneControl.value)
            {
                return;
            }

            controlValue=parseInt(this.showboxZoneControl.value);

            if (e.deltaY<0)
            {
                controlValue+=20;
            }

            else
            {
                controlValue-=20;
            }

            this.showboxZoneControl.value=controlValue;
            this.showboxZone.style.width=e.currentTarget.value+"px";
            this.showboxHeight.innerHTML=this.showboxZone.offsetHeight+"px";
        });

        //clicking on output zone
        this.outputZone.addEventListener("click",(e)=>{
            if (this.loaded)
            {
                this.outputZone.innerHTML="";

                this.showboxZone.parentElement.scrollTop=0;
                this.showboxZone.parentElement.scrollLeft=0;

                html2canvas(this.showboxZone,{
                    allowTaint:true
                }).then((c)=>{
                    this.outputZone.appendChild(c);

                    if (c.width>c.height)
                    {
                        c.classList.add("tall");
                    }

                    else
                    {
                        c.classList.remove("tall");
                    }
                });
            }
        });
    }

    getResult()
    {
        var year=this.yearEntry.value;

        var seasonChoice;
        var languageChoice;

        for (var x=0;x<4;x++)
        {
            if (this.seasonButtons[x].classList.contains("selected"))
            {
                seasonChoice=x;
            }
        }

        for (var x=0;x<2;x++)
        {
            if (this.languageButtons[x].classList.contains("selected"))
            {
                languageChoice=x;
            }
        }

        return {
            username:this.userEntry.value,
            year:this.yearEntry.value,
            season:["SPRING","SUMMER","FALL","WINTER"][seasonChoice],
            seasonNum:seasonChoice,
            language:languageChoice
        };
    }

    sendResult()
    {
        var result=this.getResult();

        if (result)
        {
            this.loaded=1;
            loadData(result.username,result.year,result.season,result.language);
            window.localStorage.setItem("lastload",JSON.stringify(result));
        }
    }

    getZoneWide()
    {
        this.showboxZoneControl.value=this.showboxZone.offsetWidth;
        this.showboxHeight.innerHTML=this.showboxZone.offsetHeight+"px";
    }

    lastloadLoad()
    {
        var lastload=JSON.parse(window.localStorage.getItem("lastload"));

        if (!lastload)
        {
            return 0;
        }

        this.userEntry.value=lastload.username;
        this.yearEntry.value=lastload.year;
        this.seasonButtons[lastload.seasonNum].classList.add("selected");
        this.languageButtons[lastload.language].classList.add("selected");

        return 1;
    }
}