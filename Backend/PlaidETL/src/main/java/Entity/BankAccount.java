package Entity;

public class BankAccount {

    private String accountNum;
    private String acctHolderName;

    public BankAccount(String accountNum, String acctHolderName){
        this.accountNum=accountNum;
        this.acctHolderName=acctHolderName;
    }

    public String getAccountNum() {
        return accountNum;
    }

    public void setAccountNum(String accountNum) {
        this.accountNum = accountNum;
    }

    public String getAcctHolderName() {
        return acctHolderName;
    }

    public void setAcctHolderName(String acctHolderName) {
        this.acctHolderName = acctHolderName;
    }
}
