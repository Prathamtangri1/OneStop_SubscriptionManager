import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import "../../assets/css/style.css"
// const useStyles = makeStyles(styles);

export default function AccountDetails() {
    // const classes = useStyles();
    return(
        <div id="app" class="connected-view">
            <div class="item-overview" style={{display: "none"}}>
                <div class="item-overview__column">
                <h3 class="item-overview__heading">item_id</h3>
                <p class="item-overview__id" id="item_id">san.asjsansakjsakjasjksajkas</p>
                </div>
                <div class="item-overview__column">
                <h3 class="item-overview__heading">access_token</h3>
                <p class="item-overview__id" id="access_token">••••••••hsakjsl</p>
                </div>
                <div style={{clear: "both"}}></div>
            </div>

            <p>Here you can make all of the following API requests:</p>

            <div class="box">
                <h3 class="box__heading">Products</h3>

                {/* <!-- Auth --> */}
                <div class="item-data-row">
                <div class="item-data-row__left">
                    <div class="item-data-row__request-type">post</div>
                </div>
                <div class="item-data-row__center">
                    <div class="item-data-row__nicename">Auth</div>
                    <div class="item-data-row__endpoint">/auth/get</div>
                    <div class="item-data-row__description">Retrieve account and routing numbers for checking and savings accounts.</div>
                </div>
                <div class="item-data-row__right">
                    <button id="get-auth-btn" class="button button--is-small button--is-default button--is-full-width">Send request</button>
                </div>
                <div class="item-data-row__response">
                    <table><tbody id="get-auth-data"></tbody></table>
                </div>
                </div>

                {/* <!--Transactions --> */}
                <div class="item-data-row">
                <div class="item-data-row__left">
                    <div class="item-data-row__request-type">post</div>
                </div>
                <div class="item-data-row__center">
                    <div class="item-data-row__nicename">Transactions</div>
                    <div class="item-data-row__endpoint">/transactions/get</div>
                    <div class="item-data-row__description">Retrieve transactions for credit and depository accounts.</div>
                </div>
                <div class="item-data-row__right">
                    <button id="get-transactions-btn" class="button button--is-small button--is-default button--is-full-width">Send request</button>
                </div>
                <div class="item-data-row__response">
                    <table><tbody id="get-transactions-data"></tbody></table>
                </div>
                </div>

                {/* <!-- Identity --> */}
                <div class="item-data-row">
                <div class="item-data-row__left">
                    <div class="item-data-row__request-type">post</div>
                </div>
                <div class="item-data-row__center">
                    <div class="item-data-row__nicename">Identity</div>
                    <div class="item-data-row__endpoint">/identity/get</div>
                    <div class="item-data-row__description">Retrieve Identity information on file with the bank. Reduce fraud by comparing user-submitted data to validate identity.</div>
                </div>
                <div class="item-data-row__right">
                    <button id="get-identity-btn" class="button button--is-small button--is-default button--is-full-width">Send request</button>
                </div>
                <div class="item-data-row__response">
                    <table><tbody id="get-identity-data"></tbody></table>
                </div>
                </div>

                {/* <!-- Balance --> */}
                <div class="item-data-row">
                <div class="item-data-row__left">
                    <div class="item-data-row__request-type">post</div>
                </div>
                <div class="item-data-row__center">
                    <div class="item-data-row__nicename">Balance</div>
                    <div class="item-data-row__endpoint">/accounts/balance/get</div>
                    <div class="item-data-row__description">Check balances in real time to prevent non-sufficient funds fees.</div>
                </div>
                <div class="item-data-row__right">
                    <button id="get-balance-btn" class="button button--is-small button--is-default button--is-full-width">Send request</button>
                </div>
                <div class="item-data-row__response">
                    <table><tbody id="get-balance-data"></tbody></table>
                </div>
                </div>

                {/* <!-- Assets (hidden unless 'assets' is included in the product list) --> */}
                <div id='assets' class="item-data-row" style={{display:"none"}}>
                <div class="item-data-row__left">
                    <div class="item-data-row__request-type">post</div>
                </div>
                <div class="item-data-row__center">
                    <div class="item-data-row__nicename">Assets</div>
                    <div class="item-data-row__endpoint">/asset_report/*</div>
                    <div class="item-data-row__description">Create a point-in-time snapshot of a user's assets.</div>
                </div>

                <div class="item-data-row__right">
                    <button id="get-assets-btn" class="button button--is-small button--is-default button--is-full-width">Send request</button>

                    <a id="download-assets-pdf-btn" class="button button--is-small button--is-primary button--is-full-width" style={{display: "none", margin: "10px 0px"}}>Download as PDF</a>
                </div>

                <div class="item-data-row__response">
                    <table><tbody id="get-assets-data"></tbody></table>
                </div>
                </div>

                {/* <!-- Holdings --> */}
                <div class="item-data-row">
                <div class="item-data-row__left">
                    <div class="item-data-row__request-type">post</div>
                </div>
                <div class="item-data-row__center">
                    <div class="item-data-row__nicename">Holdings</div>
                    <div class="item-data-row__endpoint">/investments/holdings/get</div>
                    <div class="item-data-row__description">Retrieve investment holdings on file with the bank, brokerage, or investment institution. Analyze over-exposure to market segments.</div>
                </div>
                <div class="item-data-row__right">
                    <button id="get-holdings-btn" class="button button--is-small button--is-default button--is-full-width">Send request</button>
                </div>
                <div class="item-data-row__response">
                    <table><tbody id="get-holdings-data"></tbody></table>
                </div>
                </div>

                {/* <!-- Investment Transactions --> */}
                <div class="item-data-row">
                <div class="item-data-row__left">
                    <div class="item-data-row__request-type">post</div>
                </div>
                <div class="item-data-row__center">
                    <div class="item-data-row__nicename">Investment Transactions</div>
                    <div class="item-data-row__endpoint">/investments/transactions/get</div>
                    <div class="item-data-row__description">Retrieve investment transactions to analyze cash flow and trading performance.</div>
                </div>
                <div class="item-data-row__right">
                    <button id="get-investment-transactions-btn" class="button button--is-small button--is-default button--is-full-width">Send request</button>
                </div>
                <div class="item-data-row__response">
                    <table><tbody id="get-investment-transactions-data"></tbody></table>
                </div>
                </div>

                {/* <!-- UK Payment Initiation (hidden unless 'payment_initiation' is included in the product list) --> */}
                <div class="payment_initiation item-data-row" style={{display:"none"}}>
                <div class="item-data-row__left">
                    <div class="item-data-row__request-type">post</div>
                </div>
                <div class="item-data-row__center">
                    <div class="item-data-row__nicename">Payment Initiation</div>
                    <div class="item-data-row__endpoint">/payment_initiation/payment/get</div>
                    <div class="item-data-row__description">Retrieve payment initiation status for the payment you just initiated.</div>
                </div>

                <div class="item-data-row__right">
                    <button id="get-payment-btn" class="button button--is-small button--is-default button--is-full-width">Send request</button>
                </div>

                <div class="item-data-row__response">
                    <table><tbody id="get-payment-data"></tbody></table>
                </div>
                </div>

            </div>

            <div class="box">
                <h3 class="box__heading">Item management</h3>

                <div class="item-data-row">
                <div class="item-data-row__left">
                    <div class="item-data-row__request-type">post</div>
                </div>
                <div class="item-data-row__center">
                    <div class="item-data-row__endpoint">/item/get</div>
                    <div class="item-data-row__description">Retrieve information about an Item, like the institution, billed products, available products, and webhook information.</div>
                </div>

                <div class="item-data-row__right">
                    <button id="get-item-btn" class="button button--is-small button--is-default button--is-full-width">Send request</button>
                </div>

                <div class="item-data-row__response">
                    <table><tbody id="get-item-data"></tbody></table>
                </div>
                </div>

                <div class="item-data-row">
                <div class="item-data-row__left">
                    <div class="item-data-row__request-type">post</div>
                </div>
                <div class="item-data-row__center">
                    <div class="item-data-row__endpoint">/accounts/get</div>
                    <div class="item-data-row__description">Retrieve high-level information about all accounts associated with an Item.</div>
                </div>

                <div class="item-data-row__right">
                    <button id="get-accounts-btn" class="button button--is-small button--is-default button--is-full-width">Send request</button>
                </div>

                <div class="item-data-row__response">
                    <table><tbody id="get-accounts-data"></tbody></table>
                </div>
                </div>
            </div>
        </div>
    );
}