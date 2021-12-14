import { InputAdornment, TextField } from "@mui/material"
import SearchIcon from '@mui/icons-material/SearchOutlined'

function SearchBar(){
    return ( 
        <TextField 
            style={{display: 'none'}}
            variant={'filled'} 
            label={'search'}
            margin={'normal'}
            fullWidth
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon/>
                    </InputAdornment>
                )
            }}
        /> 
    )   
}
export default SearchBar