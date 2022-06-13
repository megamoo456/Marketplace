import {
  Container,
  Row,
  OverlayTrigger,
  Tooltip,
  Col,
} from "react-bootstrap";
import "../components/Siders/SearchSider.css";
import "../components/Categories/Categories.css";
import "../components/ProductCard/ProductCard.css";
import {
  BsFillPlusCircleFill,
} from "react-icons/bs";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import BlogBanner from "../components/BlogBanner/BlogBanner";
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect , useState} from 'react';
import { getArticles, getBlogs } from '../services/blogData';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { getUser, getUserById, getUserRole } from "../services/userData";
import ArticleCard from "../components/ArticleCard/ArticleCard";
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';


function getStyles(blogs, personName, theme) {
 
  return {
    fontWeight:
      personName.indexOf(blogs) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Blog() {
  var style = { 
    marginTop: '15px',
};
function search(blogs) {
  return blogs.filter((item) => {
/*
// in here we check if our region is equal to our c state
// if it's equal to then only return the items that match
// if not return All the articles
*/
  if (item.blogr == filterParam) {
      return searchParam.some((newItem) => {
        return (
          item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(q.toLowerCase()) > -1
                   );
               });
           } else if (filterParam == "All") {
               return searchParam.some((newItem) => {
                   return (
                       item[newItem]
                           .toString()
                           .toLowerCase()
                           .indexOf(q.toLowerCase()) > -1
                   );
               });
           }
       });
   }
   const [q, setQ] = useState("");
   const [searchParam] = useState(["title", "tags", "blogr", "addedAt"]);
  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState();
  const [articles, setArticles] = useState([]);
  const [blogs, setBlogs]= useState([])
  const [isSelected, setIsSelected]= useState(false);
  const [filterParam, setFilterParam] = useState(["All"]);
  useEffect (()=> {
       getArticles()
    .then((res) => {
      setArticles(res)
    })
    .catch((err) => console.log(err));
    getBlogs()
    .then((res) => {
      console.log(res)
      setBlogs(res)
    })
    .catch((err) => console.log(err));
    getUser()
    .then((x) => {
      console.log(x.user._id)
      getUserRole(x.user._id)
        .then((res) => {
          console.log(res[0]);
          setRoles(res[0]);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));

    console.log(isSelected)
  },[isSelected])
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const [bdate, setBdate] = useState(new Date('2014-08-18T21:11:54'));

  const handleChangeD = (newValue) => {
    setBdate(newValue);
  };
  return (
    <>
     <BlogBanner/>
      <Container id="CBlog">
      <Row>
      <aside className="col-lg-2 col-md-4">
      <h3>Search</h3>
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '20ch' },
      }}
      noValidate
      autoComplete="off"
    >
      
      <TextField id="standard-basic" label="Articles" variant="standard" 
        placeholder="Search for..."
        value={q}
        /*
        // set the value of our useState q
        //  anytime the user types in the search box
        */
        onChange={(e) => setQ(e.target.value) } />
    </Box>

      <FormControl sx={{ m: 1, width: 200 }}>

        <InputLabel id="demo-multiple-blogs-label">Categories</InputLabel>
        <Select
          labelId="demo-multiple-blogs-label"
          id="demo-multiple-blogs"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Categories" />}
          
        >
          {blogs.map((blogs) => (
       
            <MenuItem
              key={blogs}
              value={blogs}
              style={getStyles(blogs, personName, theme)}
              onClick={(e) =>{setFilterParam(blogs.title)              }} 

            >
              {blogs.title}
            </MenuItem>
     
          ))}
        </Select>
        &nbsp;&nbsp;
        <LocalizationProvider dateAdapter={AdapterDateFns}>
{/*       <Stack spacing={3}>
     <DesktopDatePicker
          label="Date"
          inputFormat="MM/dd/yyyy"
          value={bdate}
          onChange={handleChangeD}
          renderInput={(params) => <TextField {...params} />}
        /> 
 
      </Stack> */}
    </LocalizationProvider>
      </FormControl>
     
      </aside>
      <div className="container row-lg-8 row-md-16">
        
    {roles.includes('canCreateArticle') ? ( <Link
          id="addArticle"
          to="/add-article"
          >
           <OverlayTrigger
           key="bottom"
           placement="bottom"
           overlay={
             <Tooltip id={`tooltip-bottom`}>
               <strong>Add</strong> a sell.
             </Tooltip>
           }
         >
           <BsFillPlusCircleFill />
         </OverlayTrigger>
         </Link> ):('') }
        {isSelected ? (       
      ''
        ):( 
          <InfiniteScroll
            dataLength={articles.length}
            hasMore={() => {
              if (articles.length > 0) {
                return true;
              }
              return false;
            }}
            className="row infinitescroll"
          >
        {search(articles).map((x) => (
          <Col xs={12} md={6} lg={3} key={x._id} style={style} >
                  <ArticleCard params={x} />
                </Col>
        ))}
        </InfiniteScroll>
        )}
     </div>
      {/*       {products
             
              .map((x) => (
                <Col xs={12} md={6} lg={3} key={x._id.toString()}>
                  <ProductCard params={x} item={x} />
                </Col>
              ))} */}
      
     </Row>
      </Container>
    </>
  );
}

export default Blog;
