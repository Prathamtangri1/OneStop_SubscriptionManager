import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
const useStyles = makeStyles(styles);

export default function Subscriptions() {
    const classes = useStyles();
    return(
        <div>
            <GridContainer>
                <Card>
                    <CardHeader color="warning" stats icon>
                    <CardIcon color="danger">
                        <Icon>ondemand_video</Icon>
                    </CardIcon>
                    </CardHeader>
                    <CardBody>
                    <h2 className={classes.cardBody}>
                        Netflix
                    </h2>
                    <h4 className={classes.cardTitle}><small>$</small>15.99</h4>
                    <h4 className={classes.cardTitle}>Next payment in: 5 days</h4>
                    <p className={classes.cardCategory}>The company's primary business is its subscription-based streaming service which offers online streaming of a library of films and television series, including those produced in-house. As of April 2020, Netflix had over 193 million paid subscriptions worldwide, including 73 million in the United States.</p>
                    <p className={classes.cardCategory}>Category: Entertainment</p>
                    </CardBody>
                    <CardFooter stats>
                        <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                            <Button>Change Plan</Button>
                            <Button>Schedule Next Payment</Button>
                            <Button>Go to website</Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader color="info" stats icon>
                        <CardIcon color="success">
                        <Icon>import_contacts</Icon>
                        </CardIcon>
                    </CardHeader>
                    <CardBody>
                    <h2 className={classes.cardBody}>
                        Medium
                    </h2>
                    <h4 className={classes.cardTitle}><small>$</small>5</h4>
                    <h4 className={classes.cardTitle}>Next payment in: 16 days</h4>
                    <p className={classes.cardCategory}>Medium is an open platform where readers find dynamic thinking, and where expert and undiscovered voices can share their writing on any topic.</p>
                    <p className={classes.cardCategory}>Category: Productivity</p>
                    </CardBody>
                    <CardFooter stats>
                        <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                        <Button>Change Plan</Button>
                            <Button>Schedule Next Payment</Button>
                            <Button>Go to website</Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader color="info" stats icon>
                        <CardIcon color="info">
                            <Icon>shop</Icon>
                        </CardIcon>
                    </CardHeader>
                    <CardBody>
                    <h2 className={classes.cardBody}>
                        Prime
                    </h2>
                    <h4 className={classes.cardTitle}><small>$</small>12.99</h4>
                    <h4 className={classes.cardTitle}>Next payment in: 22 days</h4>
                    <p className={classes.cardCategory}>Exclusive deals at Whole Foods Market and 5% back with the Amazon Prime ... Watch what you love with award-winning Amazon Originals, movies and TV</p>
                    <p className={classes.cardCategory}>Category: Shopping/General</p>
                    </CardBody>
                    <CardFooter stats>
                        <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                        <Button>Change Plan</Button>
                            <Button>Schedule Next Payment</Button>
                            <Button>Go to website</Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader color="info" stats icon>
                        <CardIcon color="success">
                            <Icon>music_note</Icon>
                        </CardIcon>
                    </CardHeader>
                    <CardBody>
                    <h2 className={classes.cardBody}>
                        Spotify
                    </h2>
                    <h4 className={classes.cardTitle}><small>$</small>9.99</h4>
                    <h4 className={classes.cardTitle}>Next payment in: 28 days</h4>
                    <p className={classes.cardCategory}>Spotify is a digital music service that gives you access to millions of songs.</p>
                    <p className={classes.cardCategory}>Category: Music</p>
                    </CardBody>
                    <CardFooter stats>
                        <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                        <Button>Change Plan</Button>
                            <Button>Schedule Next Payment</Button>
                            <Button>Go to website</Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader color="info" stats icon>
                        <CardIcon color="primary">
                            <Icon>ondemand_video</Icon>
                        </CardIcon>
                    </CardHeader>
                    <CardBody>
                    <h2 className={classes.cardBody}>
                        HBO Now
                    </h2>
                    <h4 className={classes.cardTitle}><small>$</small>139.99</h4>
                    <h4 className={classes.cardTitle}>Next payment in: 312 days</h4>
                    <p className={classes.cardCategory}>With the HBO® app, enjoy instant and unlimited access to every episode of every season of the best HBO shows, movies, comedy, sports, and documentaries</p>
                    <p className={classes.cardCategory}>Category: Entertainment</p>
                    </CardBody>
                    <CardFooter stats>
                        <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                        <Button>Change Plan</Button>
                            <Button>Schedule Next Payment</Button>
                            <Button>Go to website</Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
            </GridContainer>
        </div>
    );
}

// ["1", "Netflix", "15.99", "28", "07/2016"],
//       ["2", "HBO", "14.99", "28", "02/2020"],
//       ["3", "Prime", "12.99", "312", "05/2015"],
//       ["4", "Medium", "5", "28", "10/2018"],
//       ["5", "Spotify", "9.99", "28", "11/2019"],