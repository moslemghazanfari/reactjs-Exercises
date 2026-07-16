//create table
const createtable=(row,col)=>{
  
  const divtable=document.getElementById("continertable");
  const table=document.createElement("table");
  /* if(table in document.body.childNodes)
    document.body.removeChild(table); */
  const thead=document.createElement("thead");
  const tbody=document.createElement("tbody");
  let tr=document.createElement("tr");
  let td;
  let div;
  for(let i=1;i<=col;i++){
    td=document.createElement("td");
    div=document.createElement("div");
    div.textContent="COLUMN";
    td.appendChild(div);
    div=document.createElement("div");
    div.textContent=i;
    //td=document.createElement("td");
    td.appendChild(div);
    tr.appendChild(td);
  }
  thead.appendChild(tr);
  table.appendChild(thead);
  for (let i = 1; i <= row; i++) {
    tr=document.createElement("tr");
    for (let j = 1; j <= col; j++) {
      td=document.createElement("td");
      td.textContent=`${i},${j}`;
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody); 
  divtable.replaceChildren(table);
}

const [rowcount,columncount,create]=document.querySelectorAll("input");
create.addEventListener("click",()=>
  createtable(parseInt(rowcount.value),parseInt(columncount.value)));