import React from "react";
import axios from 'axios';
import $ from 'jquery';
import "../../assets/css/style.css"

export default function AccountDetails() {
    function getBalanceData() {
        axios.get('http://localhost:8000/api/balance')
        .then(data => {
            data = data.data;
            console.log(data);
            $('#get-balance-data').slideUp(function() {
                if (data.error != null) {
                  displayError(this, data.error);
                  return;
                }
                var html = '<tr><td><strong>Name</strong></td><td><strong>Balance</strong></td><td><strong>Subtype</strong></td><td><strong>Mask</strong></td></tr>';
                data.accounts.forEach(function(account, idx) {
                  html += '<tr>';
                  html += '<td>' + account.name + '</td>';
                  html += '<td>$' + (account.balances.available != null ? account.balances.available : account.balances.current) + '</td>'
                  html += '<td>' + account.subtype + '</td>';
                  html += '<td>' + account.mask + '</td>';
                  html += '</tr>';
                });
      
                $(this).html(html).slideDown();
              });
        });
    }

    function getTransactionData() {
        axios.get('http://localhost:8000/api/transactions')
        .then(data => {
            data = data.data;
            console.log(data);
            if (data.error != null && data.error.error_code != null) {
                // Format the error
                var errorHtml = '<div class="inner"><p>' +
                 '<strong>' + data.error.error_code + ':</strong> ' +
                 (data.error.display_message == null ? data.error.error_message : data.error.display_message)  + '</p></div>';
      
                if (data.error.error_code === 'PRODUCT_NOT_READY') {
                  // Add additional context for `PRODUCT_NOT_READY` errors
                  errorHtml += '<div class="inner"><p>Note: The PRODUCT_NOT_READY ' +
                   'error is returned when a request to retrieve Transaction data ' +
                   'is made before Plaid finishes the <a href="https://plaid.com/' +
                   'docs/quickstart/#transaction-data-with-webhooks">initial ' +
                   'transaction pull.</a></p></div>';
                }
                // Render the error
                $('#get-transactions-data').slideUp(function() {
                  $(this).slideUp(function() {
                    $(this).html(errorHtml).slideDown();
                  });
                });
                return;
              }
              $('#get-transactions-data').slideUp(function () {
                var html = '<tr><td><strong>Name</strong></td><td><strong>Amount</strong></td><td><strong>Date</strong></td></tr>';
                data.transactions.forEach(function (txn, idx) {
                  html += '<tr>';
                  html += '<td>' + txn.name + '</td>';
                  html += '<td>$' + txn.amount + '</td>';
                  html += '<td>' + txn.date + '</td>';
                  html += '</tr>';
                });
      
                $(this).slideUp(function () {
                  $(this).html(html).slideDown();
                });
            });
        });
    }


    function displayError(element, error) {
        var html = `
          <div class="alert alert-danger">
            <p><strong>Error Code:</strong> ${error.error_code}</p>
            <p><strong>Error Type:</strong> ${error.error_type}</p>
            <p><strong>Error Message:</strong> ${error.display_message == null ? error.error_message : error.display_message}</p>
            <div>Check out our <a href="https://plaid.com/docs/#errors-overview">errors documentation</a> for more information.</div>
          </div>`;
        $(element).html(html).slideDown();
      }

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
                    <button id="get-transactions-btn" class="button button--is-small button--is-default button--is-full-width" onClick={() => getTransactionData()}>Send request</button>
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
                    <button id="get-balance-btn" class="button button--is-small button--is-default button--is-full-width" onClick={() => getBalanceData()}>Send request</button>
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