class _menuControl()
{
    _menuControl();

    int loaded;

    /*-- left menu elements --*/
    element block1;
    element userEntry;
    element yearEntry;
    element seasonButtons;
    element languageButtons;
    element submit;

    /*-- show box elements --*/
    element showboxZone;
    element showboxZoneControl;
    element outputZone;

    /*-- initialisation --*/
    void initButtons();
    void defaultInputs();
    int lastloadLoad(); //if succeeded, returns 1

    /*-- result output --*/
    void sendResult(); //actually sends result to main
    object getResult(); //helper, makes result object
}