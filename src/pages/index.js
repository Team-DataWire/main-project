import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const now = new Date();

const Page = () => (
  <>
    <Head>
      <title>
        Overview | Devias Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            md={12}
            lg={8}
          >
            <OverviewLatestOrders
              orders={[
                {
                  id: 'f69f88012978187a6c12897f',
                  category: 'Homework 1',
                  title: "Title",
                  body: "abcabacacacacac abcabacacacacac abcabacacacacac abcabacacacacac"
                },
                {
                  id: '9eaa1c7dd4433f413c308ce2',
                  category: 'Homework 2',
                  title: "Title",
                  body: "abcabacacacacac abcabacacacacac abcabacacacacac abcabacacacacac"
                },
                {
                  id: '01a5230c811bd04996ce7c13',
                  category: 'Homework 3',
                  title: "Title",
                  body: "abcabacacacacac abcabacacacacac abcabacacacacac abcabacacacacac"
                },
                {
                  id: '1f4e1bd0a87cea23cdb83d18',
                  category: 'Homework 4',
                  title: "Title",
                  body: "abcabacacacacac abcabacacacacac abcabacacacacac abcabacacacacac"
                },
                {
                  id: '9f974f239d29ede969367103',
                  category: 'Homework 5',
                  title: "Title",
                  body: "abcabacacacacac abcabacacacacac abcabacacacacac abcabacacacacac"
                },
                {
                  id: 'ffc83c1560ec2f66a1c05596',
                  category: 'Homework 6',
                  title: "Title",
                  body: "abcabacacacacac abcabacacacacac abcabacacacacac abcabacacacacac"
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={12}
            lg={8}
          >
            <OverviewLatestOrders
              orders={[
                {
                  id: 'f69f88012978187a6c12897f',
                  category: 'Homework 1',
                  title: "Title",
                  body: "abcabacacacacac abcabacacacacac abcabacacacacac abcabacacacacac"
                },
                {
                  id: '9eaa1c7dd4433f413c308ce2',
                  category: 'Homework 2',
                  title: "Title",
                  body: "abcabacacacacac abcabacacacacac abcabacacacacac abcabacacacacac"
                },
                {
                  id: '01a5230c811bd04996ce7c13',
                  category: 'Homework 3',
                  title: "Title",
                  body: "abcabacacacacac abcabacacacacac abcabacacacacac abcabacacacacac"
                },
                {
                  id: '1f4e1bd0a87cea23cdb83d18',
                  category: 'Homework 4',
                  title: "Title",
                  body: "abcabacacacacac abcabacacacacac abcabacacacacac abcabacacacacac"
                },
                {
                  id: '9f974f239d29ede969367103',
                  category: 'Homework 5',
                  title: "Title",
                  body: "abcabacacacacac abcabacacacacac abcabacacacacac abcabacacacacac"
                },
                {
                  id: 'ffc83c1560ec2f66a1c05596',
                  category: 'Homework 6',
                  title: "Title",
                  body: "abcabacacacacac abcabacacacacac abcabacacacacac abcabacacacacac"
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewLatestProducts
              products={[
                {
                  id: '5ece2c077e39da27658aa8a9',
                  image: '/assets/products/trophy',
                  name: 'Rattigan',
                  updatedAt: subDays(subHours(now, 6), 2).getTime(),
                  num_posts: 5987,
                },
                {
                  id: '5ece2c0d16f70bff2cf86cd8',
                  image: '/assets/products/silver',
                  name: 'Marius',
                  updatedAt: subDays(subHours(now, 8), 2).getTime(),
                  num_posts: 3901,
                },
                {
                  id: 'b393ce1b09c1254c3a92c827',
                  image: '/assets/products/bronze',
                  name: 'Parvini',
                  updatedAt: subDays(subHours(now, 1), 1).getTime(),
                  num_posts: 1619,
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            lg={8}
          >
            <OverviewSales
              chartSeries={[
                {
                  name: 'Data',
                  data: [18, 16, 5, 8, 3, 14]
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
