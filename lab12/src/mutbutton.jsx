import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const changeText = (event) => {
    console.log(event.target)
    event.target.innerText = event.target.innerText + " 被點了";
  };

  const Mutbutton = (num) => {
    var output=[];
    for (let i=1;i<=num+1;++i)
    output.push(<Button variant="contained" color="primary" onClick={changeText}>第{i}個按鈕</Button>)
    return output;
  };

  

  export default Mutbutton
  