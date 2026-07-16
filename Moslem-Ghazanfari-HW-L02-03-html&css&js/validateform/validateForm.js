const hasUppercaseCHAR=(str)=>{
  for (const char of str) {
    if(char.codePointAt(0)>=65 && char.codePointAt(0)<=90)
      return true;
  }
  return false;
}
const hasLowercaseCHAR=(str)=>{
  for (const char of str) {
    if(char.codePointAt(0)>=97 && char.codePointAt(0)<=122)
      return true;
  }
  return false;
}
const hasNumberCHAR=(str)=>{
  for (const char of str) {
    if(char.codePointAt(0)>=48 && char.codePointAt(0)<=57)
      return true;
  }
  return false;
}
const clearStatus=()=>{
  user.className="";
  password.className=""
  status.textContent="";
}
const form=document.getElementById("form");
const [user,password]=form.querySelectorAll("input");
const status=document.getElementById("status");
const usererr=document.createElement("p");
const passworderr=document.createElement("p");
const success=document.createElement("p");
usererr.textContent="Username must be at least 5 characters long.";
passworderr.textContent="Password must contain at least one uppercase letter, one lowercase letter, and one number.";
success.textContent="Form submitted successfully!";

form.addEventListener("submit",(event)=>{
event.preventDefault();
  clearStatus();
  status.className="success";
if(user.value.length<5){
  user.className="error";
  status.className="error";
  status.appendChild(usererr);
}
if(!(hasUppercaseCHAR(password.value)&&hasLowercaseCHAR(password.value)&&hasNumberCHAR(password.value))){
  password.className="error";
  status.className="error";
  status.appendChild(passworderr);
}
if(status.className==="success")
  status.appendChild(success);
})
form.addEventListener("reset",()=>clearStatus());

