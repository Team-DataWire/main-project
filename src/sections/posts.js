import React, { Fragment } from "react";
import PropTypes from "prop-types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Collapse,
  TableContainer
} from "@mui/material";

/*Component for Unresolved and Trending Posts Table*/
export const Posts = (props) => {
  const { posts = [], sx, title } = props; /*props = data to display, sx prop (style functions), title of table*/
  const [open, setOpen] = React.useState(-1); /*useState hook used for drop down rows, initially set to -1 so no post body is showing*/

  return (
    <Card sx={sx}>
      <CardHeader title={title}/>
      <Box sx={sx}>
        <TableContainer sx={{height: 300}}> 
          <Table sx={{height: "max-content"}}>
            <TableHead>
              {/*Top row showing which row is category, title, and date*/}
              <TableRow>
                <TableCell width="5%"></TableCell>
                < TableCell align="left">Category</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell aligh="left">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post, index) => { /*Renders the row/rows for each of the posts, index is unique for each post and set 0-9*/
                return (  
                  <Fragment key={index}> {/*uses a fragment to return multiple elements for each row, the general info and the drop-down row if open*/}
                    <TableRow hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell>
                        <IconButton size="small" onClick={() => setOpen(open === index ? -1 : index)}> 
                        {/*if clicked when open=-1, set open=index and change button to upward arrow, do opposite when open=index and change button to downward arrow*/}
                          {open === index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} 
                        </IconButton>
                      </TableCell> 
                        {/*displaying category, name of post, and when it was posted */}
                      <TableCell sx={{ textAlign: "left" }}>{post.category}</TableCell>
                      <TableCell>{post.title}</TableCell>
                      <TableCell>{(new Date(post.publishedAt)).toDateString()}</TableCell>
                    </TableRow>
                    <TableRow> 
                      <TableCell colSpan={5} sx={{ paddingBottom: 0, paddingTop: 0 }}> {/*Table Cell collapses if open state is true for the index*/}
                        {/*if clicked when open=-1, set open=index and display post info in dropdown, do opposite when open=index and collapse row displaying post*/}
                        <Collapse in={open === index} timeout="auto" unmountOnExit> 
                          <Box sx={{ width: "100%" }} minHeight={65} m={2}>
                            {post.body}
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Card>
  );
};

Posts.prototype = {
  posts: PropTypes.array,
  sx: PropTypes.object,
};
