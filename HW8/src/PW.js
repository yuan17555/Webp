import TextField from '@mui/material/TextField';

function PW(){
    return(
        <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
        />
    );
}

export default PW;