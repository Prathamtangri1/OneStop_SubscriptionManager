package Entity;

public class Transaction {

    private String txnId;
    private String txnDate;
    private String accountID;
    private String category;
    private float txnAmount;
    private String merchantName;
    private String description;
    private String activeId;

    public Transaction(String txnId, String txnDate, String accountID, String category, float txnAmount, String merchantName,  String description, String activeId) {
        this.merchantName = merchantName;
        this.accountID = accountID;
        this.txnDate = txnDate;
        this.txnAmount = txnAmount;
        this.txnId = txnId;
        this.category = category;
        this.description = description;
        this.activeId = activeId;
    }

    public String getMerchantName() {
        return merchantName;
    }

    public void setMerchantName(String merchantName) {
        this.merchantName = merchantName;
    }

    public String getAccountID() {
        return accountID;
    }

    public void setAccountID(String accountID) {
        this.accountID = accountID;
    }

    public String getTxnDate() {
        return txnDate;
    }

    public void setTxnDate(String txnDate) {
        this.txnDate = txnDate;
    }

    public float getTxnAmount() {
        return txnAmount;
    }

    public void setTxnAmount(float txnAmount) {
        this.txnAmount = txnAmount;
    }

    public String getTxnId() {
        return txnId;
    }

    public void setTxnId(String txnId) {
        this.txnId = txnId;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getActiveId() {
        return activeId;
    }

    public void setActiveId(String activeId) {
        this.activeId = activeId;
    }
}
