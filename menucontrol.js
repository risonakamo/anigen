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
            this.seasonButtons[2].classList.add("selected");
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
            this.getResult();
        });
    }

    getResult()
    {
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

        console.log(this.userEntry.value,this.yearEntry.value,seasonChoice,languageChoice);
    }
}