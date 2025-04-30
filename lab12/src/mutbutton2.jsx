import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const changeText = (event) => {
    console.log(event.target)
    event.target.innerText = event.target.innerText + " 被點了";
  };

const Mutbutton2 = (nums) => {
    var output=[];
    output.push( <IconButton color="primary" aria-label="add to shopping cart"><AddShoppingCartIcon /></IconButton>)
    return output;
  };

  export default Mutbutton2