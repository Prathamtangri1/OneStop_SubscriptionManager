import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

// import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="danger">
                <Icon>ondemand_video</Icon>
              </CardIcon>
              <h3 className={classes.cardBody}>
                Netflix
              </h3>
              <h4 className={classes.cardTitle}><small>$</small>15.99</h4>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                In 5 days
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="success">
              <Icon>import_contacts</Icon>
              </CardIcon>
                    
              <h3 className={classes.cardBody}>
                Medium
              </h3>
              <h4 className={classes.cardTitle}><small>$</small>5</h4>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                  In 16 days
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>shop</Icon>
              </CardIcon>
              <h3 className={classes.cardBody}>
                Prime
              </h3>
              <h4 className={classes.cardTitle}><small>$</small>12.99</h4>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                In 22 days
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                  <Icon>music_note</Icon>
              </CardIcon>
              <h3 className={classes.cardBody}>
                Spotify
              </h3>
              <h4 className={classes.cardTitle}><small>$</small>9.99</h4>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                  In 28 days
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Line"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Payments Made</h4>
              <p className={classes.cardCategory}>Last Year</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Data retrieved a few seconds ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Bar"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Amount spent category wise</h4>
              <p className={classes.cardCategory}>Last Year
                
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Data retrieved a few seconds ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Number of subscriptions per month</h4>
              <p className={classes.cardCategory}>Last year</p>
            </CardBody>
            <CardFooter chart>
            <div className={classes.stats}>
                <AccessTime /> Data retrieved a few seconds ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
