import React, { useState,useRef } from "react";
import {
    TextField,
    Button,
    Container,
    Typography,
    InputAdornment,
    Box,
    Paper,
    FormControl,
    MenuItem,
    Select, Grid,
    
    InputLabel, Autocomplete
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import IconButton from '@mui/material/IconButton';
import FileCopyIcon from '@mui/icons-material/FileCopy';

function Create() {

    const [age, setAge] = React.useState('');


    const theme = createTheme({
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiInputBase-input': {
                            fontSize: '12px', // Change font size
                            padding: '6px 12px', // Change padding
                        },
                        '& .MuiInputLabel-root': {
                            fontSize: '16px', // Change label font size
                        },
                    },
                },
            },
        },
    });

    const handleChange = (e) => {
        setAge(e.target.value);
    };
    // const [name, setName] = useState('');
    // const [age, setAge] = useState('');
    // const [email, setEmail] = useState('');
    // const [errorMessage, setErrorMessage] = useState('');
    // const [successMessage, setSuccessMessage] = useState('');
    // const [showToast, setShowToast] = useState(false);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!name || !age || !email) {
    //         setErrorMessage("All fields are required.");
    //         setShowToast(true);
    //         return;
    //     }
    //     try {
    //         const response = await axios.post(`${BASE_URL}/crud`, {
    //             name: name,
    //             age: age,
    //             email: email
    //         });
    //         console.log("Data sent successfully:", response.data);
    //         setSuccessMessage("Data saved successfully.");
    //         setShowToast(true);
    //         // Clear form fields after successful submission
    //         setName('');
    //         setAge('');
    //         setEmail('');
    //         setErrorMessage('');
    //     } catch (error) {
    //         console.error("Error sending data:", error);
    //     }
    // };

    const [value, setValue] = useState(null);
    const options = [
        { value: 0, label: 'Select' },
        { value: 10, label: 'Ten' },
        { value: 20, label: 'Twenty' },
        { value: 30, label: 'Thirty' }
    ];
    const handleChange1 = (event, newValue) => {
        setValue(newValue);
    };
const textFieldRef = useRef(null);

  const handleCopy = () => {
    if (textFieldRef.current) {
      textFieldRef.current.select();
      document.execCommand('copy');
    }
  };
    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    minHeight: "100vh",
                    background: "#EEF2F6",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Paper elevation={5}>
                    <Container component="main" maxWidth="xs" sx={{ m: 4 }}>
                        <Typography component="h1" variant="h4" color="primary" sx={{ textAlign: 'center' }} gutterBottom>
                            <strong>Sign in</strong>
                        </Typography>
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                        size="small"
                                        autoComplete="username"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <PersonIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        size="small"
                                        autoComplete="current-password"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <KeyIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth margin="normal" size="small">
                                        <Select
                                            value={age}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={0}>Select</MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                {/* <Grid item xs={12}>
                                    <Autocomplete
                                        options={options}
                                        value={value}
                                        size="small"
                                        getOptionDisabled={(option) => option === timeSlots[0] || option === timeSlots[2]}
                                        onChange={handleChange1}
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => <TextField {...params} label="Select" />}
                                    />
                                </Grid> */}
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        style={{ margin: "24px 0px 16px" }}
                                    >
                                        Sign In
                                    </Button>
                                </Grid>
                                <TextField
                                    inputRef={textFieldRef}
                                    label="Disabled TextField"
                                    disabled
                                    value="Some value to be copied"
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton onClick={handleCopy} aria-label="copy">
                                                <FileCopyIcon />
                                                
                                            </IconButton>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Box>
                    </Container>
                </Paper>
            </Box>

        </>


        // <Box
        //     sx={{
        //         width: "100%",
        //         minHeight: "100vh",
        //         background: "#EEF2F6",
        //         display: "flex",
        //         justifyContent: "center",
        //         alignItems: "center",
        //     }}
        // >
        //     <Paper elevation={5}>
        //         <Container component="main" maxWidth="xs" sx={{ m: 4 }}>
        //             <Typography component="h1" variant="h4" color="primary" sx={{ textAlign: 'center' }} >
        //                 <strong>Sign in</strong>
        //             </Typography>
        //             <Box>

        //                 <TextField
        //                     variant="outlined"
        //                     margin="normal"
        //                     fullWidth
        //                     id="username"
        //                     label="Username"
        //                     name="username"
        //                     size="small"
        //                     autoComplete="username"

        //                     InputProps={{
        //                         endAdornment: (
        //                             <InputAdornment position="end">
        //                                 <PersonIcon />
        //                             </InputAdornment>
        //                         ),
        //                     }}
        //                 />

        //                 <TextField
        //                     variant="outlined"
        //                     margin="normal"
        //                     fullWidth
        //                     name="password"
        //                     label="Password"
        //                     type="password"
        //                     id="password"
        //                     size="small"
        //                     autoComplete="current-password"
        //                     InputProps={{
        //                         endAdornment: (
        //                             <InputAdornment position="end">
        //                                 <KeyIcon />
        //                             </InputAdornment>
        //                         ),
        //                     }}
        //                 />

        //                 <FormControl
        //                     fullWidth
        //                     margin="normal"
        //                     size="small">
        //                     <Select
        //                         value={age}

        //                         onChange={handleChange}
        //                     >
        //                         {/* <MenuItem value="0">
        //                                 <em>None</em>
        //                             </MenuItem> */}
        //                         <MenuItem value={0}>Select</MenuItem>
        //                         <MenuItem value={10}>Ten</MenuItem>
        //                         <MenuItem value={20}>Twenty</MenuItem>
        //                         <MenuItem value={30}>Thirty</MenuItem>
        //                     </Select>
        //                 </FormControl>

        //                 <Autocomplete
        //                     options={options}
        //                     value={value}
        //                     size="small"
        //                     getOptionDisabled={(option) =>
        //                         option === timeSlots[0] || option === timeSlots[2]
        //                     }
        //                     onChange={handleChange1}
        //                     getOptionLabel={(option) => option.label}
        //                     renderInput={(params) =>
        //                         <TextField {...params}
        //                             label="Select"
        //                         />}
        //                 />

        //                 <Button
        //                     type="submit"
        //                     fullWidth
        //                     variant="contained"
        //                     color="primary"
        //                     style={{ margin: "24px 0px 16px" }}
        //                 >
        //                     Sign In
        //                 </Button>

        //             </Box>
        //         </Container>
        //     </Paper>
        // </Box>
    );
}

export default Create;
