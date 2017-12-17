void main();

void loadData(); //uses alistreq to do work

/*-- alist data helpers --*/
void alistReq(string query,function callback(object)); //make a general alistreq
[showObject,..] seasonYearFilter(object data,int year,string season); //filter an alistreq

void genShowBoxes([showObject,..] data);

[string,int] genShowBox(object data);
string wrapdayBox(string showboxesString,string dayString);

void chartShot();

void randomColour();
void changeColour();

int randint(int min,int max);