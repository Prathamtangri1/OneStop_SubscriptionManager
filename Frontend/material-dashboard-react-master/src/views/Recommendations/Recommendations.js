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

export default function Recommendations() {
    const classes = useStyles();
    return(
        <div>
            <GridContainer>
                <Card>
                    <CardHeader color="warning" stats icon>
                    <CardIcon color="success">
                        <Icon>ondemand_video</Icon>
                    </CardIcon>
                    </CardHeader>
                    <CardBody>
                    <h2 className={classes.cardBody}>
                        Hulu
                    </h2>
                    <h4 className={classes.cardTitle}><small>$</small>15.99</h4>
                    <h4 className={classes.cardTitle}>Payment monthly</h4>
                    <p className={classes.cardCategory}>Watch TV shows and movies online. Stream TV episodes of Grey's Anatomy, This Is Us, Bob's Burgers, Brooklyn Nine-Nine, Empire, SNL, and popular movies ...</p>
                    <p className={classes.cardCategory}>Category: Entertainment</p>
                    </CardBody>
                    <CardFooter stats>
                        <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                            <Button>Upgrade Plan</Button>
                            <Button>Schedule Next Payment</Button>
                            <Button>Go to website</Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader color="info" stats icon>
                        <CardIcon color="danger">
                        <Icon>whatshot</Icon>
                        </CardIcon>
                    </CardHeader>
                    <CardBody>
                    <h2 className={classes.cardBody}>
                        Tinder
                    </h2>
                    <h4 className={classes.cardTitle}><small>$</small>99.99</h4>
                    <h4 className={classes.cardTitle}>Payment yearly</h4>
                    <p className={classes.cardCategory}>With 43 billion matches to date, Tinder® is the world's most popular dating app, making it the place to meet new people.</p>
                    <p className={classes.cardCategory}>Category: Dating</p>
                    </CardBody>
                    <CardFooter stats>
                        <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                            <Button>Upgrade Plan</Button>
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
                        Blue Apron
                    </h2>
                    <h4 className={classes.cardTitle}><small>$</small>12.99</h4>
                    <h4 className={classes.cardTitle}>Payment weekly</h4>
                    <p className={classes.cardCategory}>Blue Apron makes cooking fun and easy. We'll provide you with all the ingredients that you need to make a delicious meal in exactly the right proportions.</p>
                    <p className={classes.cardCategory}>Category: Food</p>
                    </CardBody>
                    <CardFooter stats>
                        <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                            <Button>Upgrade Plan</Button>
                            <Button>Schedule Next Payment</Button>
                            <Button>Go to website</Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader color="info" stats icon>
                        <CardIcon color="warning">
                            <Icon>emoji_nature</Icon>
                        </CardIcon>
                    </CardHeader>
                    <CardBody>
                    <h2 className={classes.cardBody}>
                        Bumble
                    </h2>
                    <h4 className={classes.cardTitle}><small>$</small>9.99</h4>
                    <h4 className={classes.cardTitle}>Payment monthly</h4>
                    <p className={classes.cardCategory}>Bumble has changed the way people date, find friends, and the perception of meeting online, for the better. Women make the first move. On iPhone + Android.</p>
                    <p className={classes.cardCategory}>Category: Dating</p>
                    </CardBody>
                    <CardFooter stats>
                        <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                            <Button>Upgrade Plan</Button>
                            <Button>Schedule Next Payment</Button>
                            <Button>Go to website</Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader color="info" stats icon>
                        <CardIcon color="rose">
                            <Icon>ondemand_video</Icon>
                        </CardIcon>
                    </CardHeader>
                    <CardBody>
                    <h2 className={classes.cardBody}>
                        Peacock
                    </h2>
                    <h4 className={classes.cardTitle}><small>$</small>139.99</h4>
                    <h4 className={classes.cardTitle}>Payment half-yearly</h4>
                    <p className={classes.cardCategory}>Here's what you get with Peacock: Instant access to hundreds of movies from major Hollywood studios such as Universal, DreamWorks Animation, and Focus Features. Thousands of hours of iconic TV shows, including full seasons of buzzworthy faves, bingeworthy classics, and current-season NBC hits.</p>
                    <p className={classes.cardCategory}>Category: Entertainment</p>
                    </CardBody>
                    <CardFooter stats>
                        <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                            <Button>Upgrade Plan</Button>
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