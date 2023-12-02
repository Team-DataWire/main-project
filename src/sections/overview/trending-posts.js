import React from 'react';
import ReactDOM from 'react-dom';
import { format } from "date-fns";
import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Collapse
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';

const statusMap = {
  pending: "warning",
  delivered: "success",
  refunded: "error",
};

//Trending posts table
export const TrendingPosts = (props) => {
  const { orders = [], sx } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <Card sx={sx}>
      <CardHeader title="Trending Posts" />
        <Box sx={sx}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Category</TableCell>
                <TableCell>Title</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => {
                return (
                <>
                  <TableRow
                    hover 
                    key = {order.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => setOpen(open===index ? -1 : index)}
                      >
                        {open===index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </IconButton>
                    </TableCell>   
                    <TableCell sx = {{textAlign: 'left'}} >{order.category}</TableCell>
                    <TableCell>{order.title}</TableCell>
                  </TableRow>
                  <TableRow> 
                      <TableCell
                        colSpan={5}
                        sx = {{paddingBottom:0, paddingTop: 0}}
                      >
                        <Collapse 
                        in={open===index} 
                        timeout="auto" 
                        unmountOnExit>
                          <Box 
                            sx = {{width: "100%"}} 
                            minHeight = {65}
                          >
                            {order.body}
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                </>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      <Divider />
    </Card>
  );
};

TrendingPosts.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object,
};
