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
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { SeverityPill } from "src/components/severity-pill";

const statusMap = {
  pending: "warning",
  succeed: "success",
  refunded: "error",
};

export const OverviewLatestOrders = (props) => {
  const { orders, sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Latest Orders" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell sortDirection="desc">Payment Date</TableCell>
                <TableCell>Book Date From</TableCell>
                <TableCell>Book Date To</TableCell>
                <TableCell>Payment Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                return (
                  <TableRow hover key={order.orderId}>
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>{order.firstName + " " + order.lastName}</TableCell>
                    <TableCell>{format(order.paymentStart.toDate(), "dd/MM/yyyy")}</TableCell>
                    <TableCell>{format(order.bookStart.toDate(), "dd/MM/yyyy")}</TableCell>
                    <TableCell>{format(order.bookEnd.toDate(), "dd/MM/yyyy")}</TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[order.lastOrderStatus.toLowerCase()]}>
                        {order.lastOrderStatus}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object,
};
