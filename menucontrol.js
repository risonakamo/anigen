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

        this.defaultInputs();
        this.initButtons();
    }

    defaultInputs()
    {
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

        this.submit.addEventListener("click",()=>{
            this.sendResult();
        });

        this.userEntry.addEventListener("keydown",(e)=>{
            if (e.key=="Enter")
            {
                this.sendResult();
            }
        });

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
            language:languageChoice
        };
    }

    sendResult()
    {
        var result=this.getResult();

        if (result)
        {
            loadData(result.username,result.year,result.season,result.language);
        }
    }

    getZoneWide()
    {
        this.showboxZoneControl.value=this.showboxZone.offsetWidth;
        this.showboxHeight.innerHTML=this.showboxZone.offsetHeight+"px";
    }
}