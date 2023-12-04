import React, { Fragment } from "react";
import PropTypes from "prop-types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Collapse,
  TableContainer
} from "@mui/material";

const statusMap = {
  pending: "warning",
  delivered: "success",
  refunded: "error",
};

//Trending posts table
export const TrendingPosts = (props) => {
  const { posts = [], sx, title } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <Card sx={sx}>
      <CardHeader title={title} />
      <Box sx={sx}>
      <TableContainer sx={{height: 300}}> 
        <Table sx={{height: "max-content"}}>
          <TableHead>
            <TableRow>
              <TableCell width="5%"></TableCell>
              <TableCell align="left">Category</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell aligh="left">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post, index) => {
              return (
                <Fragment key={index}>
                  <TableRow hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell>
                      <IconButton size="small" onClick={() => setOpen(open === index ? -1 : index)}>
                        {open === index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </IconButton>
                    </TableCell>
                    <TableCell sx={{ textAlign: "left" }}>{post.category}</TableCell>
                    <TableCell>{post.title}</TableCell>
                    <TableCell>{(new Date(post.publishedAt)).toDateString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={5} sx={{ paddingBottom: 0, paddingTop: 0 }}>
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
      <Divider />
    </Card>
  );
};

TrendingPosts.prototype = {
  posts: PropTypes.array,
  sx: PropTypes.object,
};
